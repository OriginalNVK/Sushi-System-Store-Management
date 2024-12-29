USE SUSHISTORE_MANAGEMENT
Go

select EmployeeName,EmployeeGender,EmployeeBirth,BranchName 
from EMPLOYEE e
join BRANCH b on b.BranchID = e.BranchID
where EmployeePhone Like '1%'
group by EmployeeName,EmployeeGender,EmployeeBirth,BranchName 

CREATE NONCLUSTERED INDEX IX_Employee
ON EMPLOYEE(EmployeePhone) 
INCLUDE(EmployeeName,EmployeeGender,EmployeeBirth,BranchID)

DROP INDEX IX_Employee ON EMPLOYEE;

select* from EMPLOYEE
where DepartmentID = 1

UPDATE EMPLOYEE
SET Salary = NULL;
WITH SalaryByDepartment AS (
    SELECT 
        DepartmentID,
		BranchID,
        MIN(EmployeeID) AS RepresentativeEmployee, 
        FLOOR(8000000 + (15000000 - 8000000) * (DepartmentID % 100) / 99.0) AS Salary 
    FROM [SUSHISTORE_MANAGEMENT].[dbo].[EMPLOYEE]
    GROUP BY DepartmentID,BranchID
)
UPDATE E
SET Salary = S.Salary
FROM [SUSHISTORE_MANAGEMENT].[dbo].[EMPLOYEE] E
JOIN SalaryByDepartment S
ON E.DepartmentID = S.DepartmentID
where e.BranchID = s.BranchID

select * from DEPARTMENT

select* from BRANCH

select* from ORDER_DIRECTORY

CREATE NONCLUSTERED INDEX IX_QL 
ON EMPLOYEE(DepartmentID) 
include (EmployeeName)

DROP INDEX IX_QL 
ON EMPLOYEE

--Lấy danh sách khách hàng lập thẻ từ ngày bất kì --> nay

select cus.CustomerName,cus.CustomerPhone
from CUSTOMER cus
join CARD_CUSTOMER cc on cc.CardID = cus.CardID
where year(cc.CardEstablishDate) = 2023

drop index index_date on CARD_CUSTOMER

create nonclustered index index_date
on CARD_CUSTOMER(CardEstablishDate)
----------------------------------------------------
--select* from CARD_CUSTOMER
--select* from EMPLOYEE

--DROP index IX_DISH_DishName on DISH

--select d.DishID,d.DishName,sum(oda.AmountDish) as Tong
--from DISH d
--join ORDER_DISH_AMOUNT oda on oda.DishID = d.DishID
--join ORDER_DIRECTORY od on od.OrderID = oda.OrderID
--group by d.DishID, d.DishName


select* from DISH

---------------------------------------------------------
--Lấy danh sách khách hàng có số điểm cao nhất trong thẻ 
select cus.CustomerName, cus.CustomerGender, CustomerPhone,cc.CardType
from CUSTOMER cus
inner join CARD_CUSTOMER cc on cc.CardID = cus.CardID
where cc.Score >= all( select card.score from CARD_CUSTOMER card)


CREATE NONCLUSTERED INDEX cardtype
ON CARD_CUSTOMER(Cardtype)
CREATE NONCLUSTERED INDEX score_index
ON CARD_CUSTOMER(Score)


drop INDEX score_index
ON CARD_CUSTOMER

CREATE NONCLUSTERED INDEX idx_cardtype_covering
ON CARD_CUSTOMER(CardType)
INCLUDE (EmployeeID, CardID);
-----------------------------------
--Lấy danh sách nhân viên làm việc tại chi nhánh ở Hà Nội
SELECT e.EmployeeID, e.EmployeeName, e.EmployeeBirth, e.EmployeeGender, e.Salary, e.EmployeeAddress, e.EmployeePhone, b.BranchName, b.BranchAddress
FROM EMPLOYEE e
JOIN BRANCH b ON e.BranchID = b.BranchID
WHERE b.BranchAddress like N'%Hà Nội'

create NONCLUSTERED INDEX index_branch on EMPLOYEE(BranchID) 
include (EmployeeName, EmployeeBirth, EmployeeGender, Salary, EmployeeAddress,EmployeePhone)

drop INDEX index_branch
ON EMPLOYEE
----------------------------------------------------------------------------------

--Lấy danh sách khách hàng lập thẻ từ ngày bất kì --> nay 
----Lấy danh sách nhân viên làm việc tại chi nhánh ở Hà Nội
--Quản lí nhân sự ( thêm nhân viên + update lịch sử làm việc)

select* from EMPLOYEE_HISTORY

select* from EMPLOYEE

EXEC New_Employee 
    @EmployeeID = 100001,
    @EmployeeName = N'Nguyen Van A',
    @EmployeeBirth = '1990-01-01',
    @EmployeeGender = N'Male',
    @Salary = 15000000,
    @EntryDate = '2024-01-01',
    @DepartmentID = 2,
    @BranchID = 3,
    @EmployeeAddress = N'123 Nguyen Trai, Hanoi',
    @EmployeePhone = '0987654321';

select* from EMPLOYEE_HISTORY

CREATE OR ALTER PROCEDURE AddEmployeeHistory
    @EmployeeID INT,
    @BranchID INT,
    @EntryDate DATE,
    @LeaveDate DATE
AS
BEGIN
    INSERT INTO EMPLOYEE_HISTORY (EmployeeID, BranchID, EntryDate, LeaveDate)
    VALUES (@EmployeeID, @BranchID, @EntryDate, @LeaveDate);
END;
GO
--Quản lí món ăn (Thêm,sửa,xóa món ăn)
--Đặt món tại nhà hàng

EXEC AddEmployeeHistory 
    @EmployeeID = 100001, 
    @BranchID = 1, 
    @EntryDate = '2023-01-01', 
    @LeaveDate = '2023-12-31';

SELECT * 
FROM EMPLOYEE_HISTORY
WHERE BranchID = 1;

select* from DIRECTORY_DISH

EXEC AddNewDish 
    @BranchID = 1, 
    @DirectoryName = N'Drinks',
    @DishID = 100020,
    @DishName = N'Bánh trứng',
    @Price = 25000;

EXEC Update_Dish
	@BranchID =1, @DirectoryName = N'Drinks', @DishID = 100020, @NewDishName = N'Kho chiu',@NewPrice= 100000;

drop index nonindex on ORDER_OFFLINE
create nonclustered index nonindex on ORDER_OFFLINE(OrderEstablishDate)

select* from ORDER_DIRECTORY

ALTER TABLE ORDER_DIRECTORY ADD BranchID INT;

ALTER TABLE ORDER_DIRECTORY
ADD CONSTRAINT FK_BranchID
FOREIGN KEY (BranchID)
REFERENCES BRANCH(BranchID);

UPDATE ORDER_DIRECTORY
SET BranchID = (ABS(CHECKSUM(NEWID())) % 15) + 1;


SELECT 
    MONTH(INVOICE.PaymentDate) AS RevenueMonth, 
    YEAR(INVOICE.PaymentDate) AS RevenueYear,
    SUM(INVOICE.TotalMoney - INVOICE.DiscountMoney) AS MonthlyRevenue
FROM INVOICE
JOIN ORDER_DIRECTORY ON INVOICE.OrderID = ORDER_DIRECTORY.OrderID
WHERE ORDER_DIRECTORY.BranchID = 1 and Year(INVOICE.PaymentDate) = 2023-- Thay @BranchID bằng ID của chi nhánh cần thống kê
GROUP BY 
    YEAR(INVOICE.PaymentDate), 
    MONTH(INVOICE.PaymentDate)
ORDER BY
    RevenueYear, 
    RevenueMonth;

select* from INVOICE

--Quản lí khach hang & the thanh vien 

--Khach Hang thanh toan-> tich diem cho the
SELECT
    INVOICE.InvoiceID, 
    INVOICE.PaymentDate, 
    INVOICE.TotalMoney, 
    INVOICE.DiscountMoney, 
    (INVOICE.TotalMoney - INVOICE.DiscountMoney) AS FinalAmount
FROM INVOICE
JOIN CUSTOMER ON INVOICE.CardID = CUSTOMER.CardID
WHERE CUSTOMER.CardID = 5
ORDER BY INVOICE.PaymentDate DESC;
--
SELECT CUSTOMER.CustomerName, CUSTOMER.CustomerPhone, CARD_CUSTOMER.CardType, CARD_CUSTOMER.Score
FROM CUSTOMER
JOIN CARD_CUSTOMER ON CUSTOMER.CardID = CARD_CUSTOMER.CardID;

SELECT CUSTOMER.CustomerName, INVOICE.PaymentDate, INVOICE.TotalMoney, INVOICE.DiscountMoney
FROM INVOICE
JOIN CUSTOMER ON INVOICE.CardID = CUSTOMER.CardID
WHERE CUSTOMER.CustomerPhone = '0695197066';

SELECT CUSTOMER.CustomerName, SUM(INVOICE.TotalMoney) AS TotalSpent
FROM INVOICE
JOIN CUSTOMER ON INVOICE.CardID = CUSTOMER.CardID
GROUP BY CUSTOMER.CustomerName
HAVING SUM(INVOICE.TotalMoney) > 1000000;





SELECT D.DishName, D.Price 
FROM DISH D
JOIN DIRECTORY_DISH DD ON D.DishID = DD.DishID
JOIN MENU_DIRECTORY MD ON DD.DirectoryID = MD.DirectoryID
WHERE MD.BranchID = 1;

select* from EMPLOYEE_HISTORY

SELECT EH.EmployeeID, E.EmployeeName, EH.BranchID, EH.EntryDate, EH.LeaveDate 
FROM EMPLOYEE_HISTORY EH
JOIN EMPLOYEE E ON EH.EmployeeID = E.EmployeeID
WHERE EH.EmployeeID = 84;

SELECT D.DishName, SUM(ODA.AmountDish) AS TotalOrders 
FROM DISH D
JOIN ORDER_DISH_AMOUNT ODA ON D.DishID = ODA.DishID
JOIN ORDER_DIRECTORY OD ON ODA.OrderID = OD.OrderID
WHERE OD.BranchID = 1
GROUP BY D.DishName
ORDER BY TotalOrders DESC;


CREATE PROCEDURE GetCustomerPaymentsByBranchAndDate
    @BranchID INT,             -- ID chi nhánh cần tra cứu
    @StartDate DATE,           -- Ngày bắt đầu
    @EndDate DATE              -- Ngày kết thúc
AS
BEGIN
    -- Liệt kê danh sách khách hàng đã đến chi nhánh và lịch sử thanh toán của họ trong khoảng thời gian cụ thể
    SELECT 
        CUSTOMER.CustomerName, 
        CUSTOMER.CustomerPhone,  
        INVOICE.PaymentDate, 
        INVOICE.TotalMoney, 
        INVOICE.DiscountMoney, 
        INVOICE.TotalMoney - INVOICE.DiscountMoney AS FinalAmount
    FROM 
        CUSTOMER
    JOIN 
        ORDER_DIRECTORY ON CUSTOMER.CardID = ORDER_DIRECTORY.CardID
    JOIN 
        INVOICE ON ORDER_DIRECTORY.OrderID = INVOICE.OrderID
    WHERE 
        ORDER_DIRECTORY.BranchID = @BranchID
        AND INVOICE.PaymentDate BETWEEN @StartDate AND @EndDate
    ORDER BY 
        INVOICE.PaymentDate DESC; -- Sắp xếp theo ngày hóa đơn giảm dần
END;

EXEC GetCustomerPaymentsByBranchAndDate 
    @BranchID = 1,            -- Ví dụ: chi nhánh có ID là 1
    @StartDate = '2022-01-01', -- Ngày bắt đầu (ví dụ: 1 tháng 1, 2024)
    @EndDate = '2022-12-31';   -- Ngày kết thúc (ví dụ: 31 tháng 12, 2024)

select* from ORDER_DIRECTORY

SELECT TOP 10 
    C.CustomerName, 
    C.CustomerPhone, 
    SUM(I.TotalMoney) AS TotalSpent
FROM 
    INVOICE I
JOIN 
    CARD_CUSTOMER CC ON I.CardID = CC.CardID
JOIN 
    CUSTOMER C ON CC.CardID = C.CardID
JOIN 
    ORDER_DIRECTORY OD ON I.OrderID = OD.OrderID
WHERE 
    OD.BranchID = 1 
GROUP BY 
    C.CustomerName, C.CustomerPhone
ORDER BY 
    TotalSpent DESC;


SELECT 
    c.CustomerName,
    c.CustomerEmail,
    c.CustomerPhone,
    c.CCCD,
    q.BranchID,
    q.ServicePoints,
    q.FoodPoints,
    q.Comment
FROM 
    QUALITY q
JOIN 
    CUSTOMER c 
ON 
    q.CardID = c.CardID
WHERE 
    q.BranchID = 1 
    AND (q.ServicePoints < 3 OR q.FoodPoints < 3);


