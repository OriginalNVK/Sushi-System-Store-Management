use SUSHISTORE_MANAGEMENT
GO

-- Insert data into AREA
INSERT INTO AREA (AreaID, AreaName)
VALUES 
    (1, N'North Area'),
    (2, N'South Area'),
    (3, N'East Area');
GO

-- Insert data into BRANCH
INSERT INTO BRANCH (BranchID, BranchName, BranchAddress, OpenHour, CloseHour, PhoneNumber, HasCarParking, HasMotorParking, AreaID, ManagerID, HasDeliveryService)
VALUES
    (1, N'Sushi North', N'123 North Street', '09:00:00', '22:00:00', '0123456789', 'YES', 'YES', 1, NULL, 'YES'),
    (2, N'Sushi South', N'456 South Avenue', '10:00:00', '23:00:00', '0987654321', 'NO', 'YES', 2, NULL, 'YES'),
    (3, N'Sushi East', N'789 East Boulevard', '08:00:00', '21:00:00', '0321654987', 'YES', 'NO', 3, NULL, 'NO');
GO

-- Insert data into DEPARTMENT
INSERT INTO DEPARTMENT (DepartmentID, DepartmentName, BranchID)
VALUES
    (1, N'Kitchen', 1),
    (2, N'Service', 1),
    (3, N'Delivery', 2),
    (4, N'Management', 3);
GO

-- Insert data into EMPLOYEE
-- Insert data into EMPLOYEE
INSERT INTO EMPLOYEE (EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone)
VALUES
    (1, N'Nguyen Van A', '1990-01-01', N'male', 12000000, '2023-01-01', NULL, 1, 1, N'123 Main Street', '0123456789'),
    (2, N'Tran Thi B', '1992-02-02', N'female', 12000000, '2023-02-01', NULL, 2, 1, N'456 Maple Avenue', '0987654321'),
    (3, N'Le Van C', '1985-03-03', N'male', 11000000, '2023-03-01', NULL, 3, 2, N'789 Elm Road', '0321654987'),
    (4, N'Pham Thi D', '1988-04-04', N'female', 13000000, '2023-04-01', NULL, 4, 3, N'321 Pine Street', '0912345678');
GO

-- Insert data into DISH
INSERT INTO DISH (DishID, DishName, Price)
VALUES
    (1, N'Salmon Sushi', 50000),
    (2, N'Tuna Roll', 40000),
    (3, N'California Roll', 45000),
    (4, N'Eel Roll', 60000),
    (5, N'Tempura', 70000);
GO

-- Insert data into CARD_CUSTOMER
-- Insert data into CARD_CUSTOMER
INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType)
VALUES
    (1, '2023-05-01', 1, 100, N'member'),
    (2, '2023-06-01', 2, 200, N'silver'),
    (3, '2023-07-01', 3, 300, N'golden'),
    (4, '2023-08-01', 4, 400, N'golden');
GO

-- Insert data into CUSTOMER
INSERT INTO CUSTOMER (CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD)
VALUES
    (1, N'Nguyen Anh', N'anh.nguyen@gmail.com', N'male', '0911223344', '012345678901'),
    (2, N'Tran Binh', N'binh.tran@gmail.com', N'female', '0933445566', '012345678902'),
    (3, N'Le Chi', N'chi.le@gmail.com', N'other', '0944556677', '012345678903'),
    (4, N'Pham Duong', N'duong.pham@gmail.com', N'male', '0955667788', '012345678904');
GO

-- Insert data into ORDER_DIRECTORY
-- Insert data into ORDER_DIRECTORY
INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
VALUES
    (1, 1, 3, 1),
    (2, 2, 4, 2),
    (3, 3, 5, 3),
    (4, 4, 6, 4);
GO

-- Insert data into ORDER_ONLINE
INSERT INTO ORDER_ONLINE (OnOrderID, BranchID, DateOrder, TimeOrder, AmountCustomer, Note)
VALUES
    (1, 1, '2023-10-01', '12:00:00', 2, N'Quick delivery'),
    (2, 2, '2023-10-02', '13:00:00', 3, N'Extra napkins'),
    (3, 3, '2023-10-03', '14:00:00', 4, N'No wasabi');
GO

-- Insert data into ORDER_DISH_AMOUNT
INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
VALUES
    (1, 1, 2),
    (1, 2, 1),
    (2, 3, 3),
    (3, 4, 2);
GO

-- Insert data into INVOICE
INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID)
VALUES
    (1, 1, 120000, 10000, '2023-11-01', 1),
    (2, 2, 150000, 20000, '2023-11-02', 2),
    (3, 3, 200000, 30000, '2023-11-03', 3);
GO

-- update manager ID
update branch 
set ManagerID = 1
where BranchID = 1


update branch 
set ManagerID = 3
where BranchID = 2

update branch 
set ManagerID = 4
where BranchID = 3
