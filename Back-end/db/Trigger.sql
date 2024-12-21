USE SUSHISTORE_MANAGEMENT
GO

CREATE TRIGGER TRG_Salary_Same_Department
ON EMPLOYEE
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem có nhân viên nào trong cùng department có mức lương khác nhau không
    IF EXISTS (
        SELECT 1
        FROM EMPLOYEE e1
        JOIN EMPLOYEE e2
            ON e1.DepartmentID = e2.DepartmentID
           AND e1.Salary <> e2.Salary
    )
    BEGIN
        RAISERROR ('Employees in the same department must have the same salary.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE TRIGGER TRG_Ensure_Manager_In_Branch
ON BRANCH
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra ManagerID có thuộc BranchID hay không
    IF EXISTS (
        SELECT 1
        FROM BRANCH b
        LEFT JOIN EMPLOYEE e
        ON b.ManagerID = e.EmployeeID
        WHERE b.ManagerID IS NOT NULL 
          AND b.BranchID <> e.BranchID
    )
    BEGIN
        RAISERROR ('The manager must be an employee of the same branch.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

-- Trigger + Điểm cho khách hàng
CREATE TRIGGER trg_UpdateCustomerScore
ON INVOICE
AFTER INSERT
AS
BEGIN
    UPDATE CARD_CUSTOMER
    SET Score = Score + (INSERTED.TotalMoney - INSERTED.DiscountMoney) / 100000
    FROM CARD_CUSTOMER
    INNER JOIN INSERTED ON CARD_CUSTOMER.CardID = INSERTED.CardID;
END;


-- Trigger Nâng cấp loại thẻ khách hàng
CREATE OR ALTER TRIGGER trg_UpgradeCardType
ON INVOICE
AFTER INSERT, UPDATE
AS
BEGIN
    -- Tính tổng tiêu dùng tích lũy của khách hàng
    WITH TotalSpent AS (
        SELECT 
            c.CardID,
            SUM(i.TotalMoney - i.DiscountMoney) AS TotalSpent,
            MAX(c.CardEstablishDate) AS CardEstablishDate
        FROM 
            INVOICE i
        JOIN 
            CARD_CUSTOMER c ON i.CardID = c.CardID
        GROUP BY 
            c.CardID
    )
    UPDATE CARD_CUSTOMER
    SET CardType = 
        CASE 
            WHEN TotalSpent >= 10000000 AND CardType = N'member' THEN N'silver'
            WHEN TotalSpent >= 10000000 
                 AND CardType = N'silver' 
                 AND DATEDIFF(YEAR, CardEstablishDate, GETDATE()) <= 1 THEN N'golden'
            ELSE CardType -- Không thay đổi nếu không đạt điều kiện
        END
    FROM TotalSpent
    WHERE CARD_CUSTOMER.CardID = TotalSpent.CardID;
END;
GO

-- Trigger Duy trì hạng thẻ của khách hàng
CREATE OR ALTER TRIGGER trg_MaintainCardType
ON INVOICE
AFTER INSERT, UPDATE
AS
BEGIN
    -- Tính tổng tiêu dùng trong vòng 1 năm
    WITH TotalSpentLastYear AS (
        SELECT 
            c.CardID,
            SUM(i.TotalMoney - i.DiscountMoney) AS TotalSpentLastYear
        FROM 
            INVOICE i
        JOIN 
            CARD_CUSTOMER c ON i.CardID = c.CardID
        WHERE 
            i.PaymentDate >= DATEADD(YEAR, -1, GETDATE()) -- Chỉ trong vòng 1 năm
        GROUP BY 
            c.CardID
    )
    UPDATE CARD_CUSTOMER
    SET CardType = 
        CASE 
            WHEN CardType = N'golden' AND TotalSpentLastYear < 10000000 THEN N'silver'
            WHEN CardType = N'silver' AND TotalSpentLastYear < 5000000 THEN N'member'
            ELSE CardType -- Không thay đổi nếu thỏa mãn điều kiện
        END
    FROM TotalSpentLastYear
    WHERE CARD_CUSTOMER.CardID = TotalSpentLastYear.CardID;
END;
GO