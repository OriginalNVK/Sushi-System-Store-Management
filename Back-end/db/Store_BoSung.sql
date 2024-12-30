﻿USE SUSHISTORE_MANAGEMENT
GO

---Lay ds nv theo branch cho kich ban 1 
CREATE OR ALTER PROCEDURE GetEmployeesByBranchID
    @BranchID INT
AS
BEGIN
    SELECT 
        e.EmployeeID, 
        e.EmployeeName, 
        e.EmployeeBirth, 
        e.EmployeeGender, 
        e.Salary, 
        e.EntryDate, 
        e.LeaveDate, 
        d.DepartmentName, 
        e.BranchID, 
        e.EmployeeAddress, 
        e.EmployeePhone
    FROM 
        EMPLOYEE e
    JOIN 
        BRANCH b ON b.BranchID = e.BranchID
    JOIN 
        DEPARTMENT d ON d.DepartmentID = e.DepartmentID
    WHERE 
        d.DepartmentName != 'Quản lý' 
        AND b.BranchID = @BranchID;
END;
GO

CREATE OR ALTER PROCEDURE GetCustomersByBranchID (
    @BranchID INT
)
AS
BEGIN
    SELECT 
        c.CustomerName, 
        c.CustomerEmail, 
        c.CustomerGender, 
        c.CustomerPhone, 
        c.CCCD
    FROM CUSTOMER c
    JOIN CARD_CUSTOMER cc ON c.CardID = cc.CardID
    JOIN ORDER_DIRECTORY od ON od.CardID = cc.CardID
    JOIN BRANCH b ON b.BranchID = od.BranchID
    WHERE b.BranchID = @BranchID
    GROUP BY c.CustomerName, c.CustomerEmail, c.CustomerGender, c.CustomerPhone, c.CCCD;
END;
GO


--Update lich su chuyen cong tac nv
CREATE OR ALTER PROCEDURE TransferEmployee
    @EmployeeID INT,            -- ID của nhân viên cần chuyển
    @OldBranchID INT,           -- Chi nhánh hiện tại
    @NewBranchID INT,           -- Chi nhánh mới
    @TransferDate DATE          -- Ngày chuyển chi nhánh
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Kiểm tra xem nhân viên có tồn tại trong chi nhánh cũ hay không
        IF NOT EXISTS (
            SELECT 1 
            FROM EMPLOYEE 
            WHERE EmployeeID = @EmployeeID AND BranchID = @OldBranchID
        )
        BEGIN
            THROW 50001, 'Employee does not exist in the specified branch.', 1;
        END
        
        -- Cập nhật LeaveDate cho lịch sử chi nhánh cũ
        UPDATE EMPLOYEE_HISTORY
        SET LeaveDate = @TransferDate
        WHERE EmployeeID = @EmployeeID AND BranchID = @OldBranchID AND LeaveDate IS NULL;

        -- Thêm bản ghi lịch sử mới cho chi nhánh mới
        INSERT INTO EMPLOYEE_HISTORY (EmployeeID, BranchID, EntryDate, LeaveDate)
        VALUES (@EmployeeID, @NewBranchID, @TransferDate, NULL);

        -- Cập nhật chi nhánh mới trong bảng EMPLOYEE
        UPDATE EMPLOYEE
        SET BranchID = @NewBranchID
        WHERE EmployeeID = @EmployeeID;

        -- Xác nhận giao dịch
        COMMIT TRANSACTION;
        PRINT 'Employee transferred successfully.';
    END TRY
    BEGIN CATCH
        -- Hủy giao dịch nếu có lỗi
        ROLLBACK TRANSACTION;
        PRINT 'An error occurred during the transfer process.';
        THROW;
    END CATCH
END;
GO
----------------------------------------------
--Lay ds mon an thuoc Branch
CREATE OR ALTER PROCEDURE GetActiveDishesByBranchID (
    @BranchID INT
)
AS
BEGIN
    SELECT 
        mnd.DirectoryName,
        d.DishName, 
        d.Price
    FROM DISH d
    JOIN MENU_DIRECTORY_DISH mnd ON mnd.DishID = d.DishID
    JOIN BRANCH b ON b.BranchID = mnd.BranchID
    WHERE mnd.StatusDish = 'YES' AND b.BranchID = @BranchID
    ORDER BY mnd.DirectoryName, d.DishName, d.Price;
END
GO

CREATE PROCEDURE GetEmployeeByID(@EmployeeID INT)
AS
BEGIN
    SELECT *
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID;
END