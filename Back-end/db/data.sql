USE SUSHISTORE_MANAGEMENT
GO
-- ADD SAMPLE DATA
-- Thêm tài khoản người dùng
INSERT INTO userWeb(userPhone, password, role)
VALUES ('0123321123', '123', 'customer');

-- Thêm tài khoản nhân viên quản lý chi nhánh 
INSERT INTO userWeb(userPhone, password, role)
VALUES ('0321321321', '123', 'manager branch');

-- Thêm tài khoản nhân viên quản lý công ty 
INSERT INTO userWeb(userPhone, password, role)
VALUES ('0321123321', '123', 'manager company');

-- Thêm tài khoản nhân viên
INSERT INTO userWeb(userPhone, password, role)
VALUES ('0123123123', '123', 'employee');


-- 1. AREA (No foreign key dependencies)
INSERT INTO AREA (AreaID, AreaName) VALUES
(1, N'Downtown'),
(2, N'Uptown'),
(3, N'Midtown'),
(4, N'Suburbs'),
(5, N'Rural');

-- 2. DISH (No foreign key dependencies)
INSERT INTO DISH (DishID, DishName, Price) VALUES
(1, N'Pizza', 150000),
(2, N'Burger', 80000),
(3, N'Pasta', 120000),
(4, N'Salad', 60000),
(5, N'Steak', 200000);

-- 3. BRANCH (Depends on AREA; ManagerID set to NULL initially)
INSERT INTO BRANCH (BranchID, BranchName, BranchAddress, OpenHour, CloseHour, PhoneNumber, HasCarParking, HasMotorParking, AreaID, ManagerID, HasDeliveryService) VALUES
(1, N'Branch A', N'123 Main St', '08:00:00', '22:00:00', '1234567890', 'YES', 'YES', 1, NULL, 'YES'),
(2, N'Branch B', N'456 Oak Ave', '09:00:00', '23:00:00', '0987654321', 'NO', 'YES', 2, NULL, 'NO'),
(3, N'Branch C', N'789 Pine Rd', '07:00:00', '21:00:00', '1122334455', 'YES', 'NO', 3, NULL, 'YES'),
(4, N'Branch D', N'101 Maple Dr', '08:30:00', '22:30:00', '6677889900', 'YES', 'YES', 4, NULL, 'YES'),
(5, N'Branch E', N'202 Birch Ln', '09:00:00', '20:00:00', '2233445566', 'NO', 'NO', 5, NULL, 'NO');

-- 4. DEPARTMENT (Depends on BRANCH)
INSERT INTO DEPARTMENT (DepartmentID, DepartmentName, BranchID) VALUES
(1, N'Kitchen', 1),
(2, N'Service', 1),
(3, N'Kitchen', 2),
(4, N'Service', 2),
(5, N'Management', 3);

-- 5. EMPLOYEE (Depends on DEPARTMENT and BRANCH; now includes valid DepartmentID and BranchID)
INSERT INTO EMPLOYEE (EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone) VALUES
(1, N'John Doe', '1990-05-15', 'Male', 50000, '2023-01-01', NULL, 1, 1, N'123 Elm St', '5551112222'),
(2, N'Jane Smith', '1985-08-20', 'Female', 60000, '2022-06-01', NULL, 2, 1, N'456 Pine St', '5553334444'),
(3, N'Mike Johnson', '1992-03-10', 'Male', 45000, '2023-03-15', NULL, 3, 2, N'789 Oak St', '5555556666'),
(4, N'Emily Davis', '1988-11-25', 'Female', 55000, '2021-09-01', NULL, 4, 2, N'101 Cedar St', '5557778888'),
(5, N'Robert Brown', '1980-07-30', 'Male', 70000, '2020-01-01', NULL, 5, 3, N'202 Birch St', '5559990000');

-- 6. Update BRANCH to set ManagerID (now that EMPLOYEE exists)
UPDATE BRANCH SET ManagerID = 1 WHERE BranchID = 1;
UPDATE BRANCH SET ManagerID = 2 WHERE BranchID = 2;
UPDATE BRANCH SET ManagerID = 3 WHERE BranchID = 3;
UPDATE BRANCH SET ManagerID = 4 WHERE BranchID = 4;
UPDATE BRANCH SET ManagerID = 5 WHERE BranchID = 5;

-- 7. EMPLOYEE_HISTORY (Depends on EMPLOYEE and BRANCH)
INSERT INTO EMPLOYEE_HISTORY (EmployeeID, BranchID, EntryDate, LeaveDate) VALUES
(1, 1, '2023-01-01', NULL),
(2, 1, '2022-06-01', NULL),
(3, 2, '2023-03-15', NULL),
(4, 2, '2021-09-01', NULL),
(5, 3, '2020-01-01', NULL);

-- 8. CARD_CUSTOMER (Depends on EMPLOYEE)
INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType) VALUES
(1, '2023-01-10', 1, 100, N'member'),
(2, '2023-02-15', 2, 200, N'silver'),
(3, '2023-03-20', 3, 300, N'golden'),
(4, '2023-04-25', 4, 150, N'member'),
(5, '2023-05-30', 5, 250, N'silver');

-- 9. CUSTOMER (Depends on CARD_CUSTOMER)
INSERT INTO CUSTOMER (CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD) VALUES
(1, N'Alice Green', N'alice@example.com', 'female', '1112223333', '123456789012'),
(2, N'Bob White', N'bob@example.com', 'male', '4445556666', '234567890123'),
(3, N'Charlie Black', N'charlie@example.com', 'male', '7778889999', '345678901234'),
(4, N'Diana Blue', N'diana@example.com', 'female', '2223334444', '456789012345'),
(5, N'Eve Red', N'eve@example.com', 'other', '5556667777', '567890123456');

-- 10. QUALITY (Depends on BRANCH, AREA, and CARD_CUSTOMER)
INSERT INTO QUALITY (BranchID, AreaID, CardID, ServicePoints, LocationPoints, FoodPoints, PricePoints, SpacePoint, Comment) VALUES
(1, 1, 1, 8, 7, 9, 6, 8, N'Great service!'),
(2, 2, 2, 7, 8, 6, 7, 7, N'Nice ambiance'),
(3, 3, 3, 9, 9, 8, 8, 9, N'Excellent experience'),
(4, 4, 4, 6, 7, 7, 6, 6, N'Good food'),
(5, 5, 5, 8, 8, 9, 7, 8, N'Will come again');

-- 11. MENU_DIRECTORY_DISH (Depends on BRANCH and DISH)
INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish) VALUES
(1, 1, N'Main Course', 1, 'YES'),
(1, 1, N'Main Course', 2, 'YES'),
(2, 2, N'Appetizers', 3, 'YES'),
(3, 3, N'Desserts', 4, 'NO'),
(4, 4, N'Main Course', 5, 'YES');

-- 12. ORDER_DIRECTORY (Depends on EMPLOYEE and CARD_CUSTOMER)
INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID) VALUES
(1, 1, 5, 1),
(2, 2, 3, 2),
(3, 3, 7, 3),
(4, 4, 2, 4),
(5, 5, 1, 5);

-- 13. ORDER_ONLINE (Depends on ORDER_DIRECTORY and BRANCH)
INSERT INTO ORDER_ONLINE (OnOrderID, BranchID, DateOrder, TimeOrder, AmountCustomer, Note) VALUES
(1, 1, '2025-05-01', '12:00:00', 2, N'Fast delivery'),
(2, 2, '2025-05-02', '13:00:00', 4, N'No onions'),
(3, 3, '2025-05-03', '14:00:00', 1, N'Extra sauce'),
(4, 4, '2025-05-04', '15:00:00', 3, N'Quick service'),
(5, 5, '2025-05-05', '16:00:00', 2, N'Vegetarian');

-- 14. ORDER_OFFLINE (Depends on ORDER_DIRECTORY and BRANCH)
INSERT INTO ORDER_OFFLINE (OffOrderID, BranchID, OrderEstablishDate) VALUES
(1, 1, '2025-05-01'),
(2, 2, '2025-05-02'),
(3, 3, '2025-05-03'),
(4, 4, '2025-05-04'),
(5, 5, '2025-05-05');

-- 15. ORDER_DISH_AMOUNT (Depends on ORDER_DIRECTORY and DISH)
INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3),
(4, 4, 2),
(5, 5, 1);

-- 16. INVOICE (Depends on CARD_CUSTOMER, ORDER_DIRECTORY, and BRANCH)
INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID, BranchID) VALUES
(1, 1, 300000, 30000, '2025-05-01', 1, 1),
(2, 2, 80000, 0, '2025-05-02', 2, 2),
(3, 3, 360000, 36000, '2025-05-03', 3, 3),
(4, 4, 120000, 0, '2025-05-04', 4, 4),
(5, 5, 200000, 20000, '2025-05-05', 5, 5);

-- 17. RevenueByDate (Depends on BRANCH)
INSERT INTO RevenueByDate (RevenueDate, BranchID, TotalRevenue) VALUES
('2025-05-01', 1, 300000),
('2025-05-02', 2, 80000),
('2025-05-03', 3, 360000),
('2025-05-04', 4, 120000),
('2025-05-05', 5, 200000);

-- 18. RevenueByMonth (Depends on BRANCH)
INSERT INTO RevenueByMonth (RevenueMonth, RevenueYear, BranchID, TotalRevenue) VALUES
(5, 2025, 1, 1500000),
(5, 2025, 2, 400000),
(5, 2025, 3, 1800000),
(5, 2025, 4, 600000),
(5, 2025, 5, 1000000);

-- 19. RevenueByQuarter (Depends on BRANCH)
INSERT INTO RevenueByQuarter (RevenueYear, RevenueQuarter, BranchID, TotalRevenue) VALUES
(2025, 2, 1, 4500000),
(2025, 2, 2, 1200000),
(2025, 2, 3, 5400000),
(2025, 2, 4, 1800000),
(2025, 2, 5, 3000000);

-- 20. RevenueByYear (Depends on BRANCH)
INSERT INTO RevenueByYear (RevenueYear, BranchID, TotalRevenue) VALUES
(2025, 1, 18000000),
(2025, 2, 4800000),
(2025, 3, 21600000),
(2025, 4, 7200000),
(2025, 5, 12000000);

-- 21. DISHREVENUE (Depends on BRANCH and DISH)
INSERT INTO DISHREVENUE (BranchID, DishID, PayDate, Revenue) VALUES
(1, 1, '2025-05-01', 300000),
(2, 2, '2025-05-02', 80000),
(3, 3, '2025-05-03', 360000),
(4, 4, '2025-05-04', 120000),
(5, 5, '2025-05-05', 200000);
