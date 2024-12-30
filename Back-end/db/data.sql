USE SUSHISTORE_MANAGEMENT
GO

-- Thêm 3 khu vực vào bảng AREA
INSERT INTO AREA (AreaID, AreaName)
VALUES
(1, 'Khu vực miền Bắc'),
(2, 'Khu vực miền Nam'),
(3, 'Khu vực miền Trung');


-- Thêm 3 chi nhánh vào bảng BRANCH
INSERT INTO BRANCH (BranchID, BranchName, BranchAddress, OpenHour, CloseHour, PhoneNumber, HasCarParking, HasMotorParking, AreaID, ManagerID, HasDeliveryService)
VALUES
(1, 'Chi nhánh Hà Nội', 'Hà Nội, Việt Nam', '08:00', '22:00', '0981234567', 'YES', 'YES', 1, NULL, 'YES'),
(2, 'Chi nhánh Hồ Chí Minh', 'Hồ Chí Minh, Việt Nam', '08:00', '22:00', '0912345678', 'YES', 'NO', 2, NULL, 'NO'),
(3, 'Chi nhánh Đà Nẵng', 'Đà Nẵng, Việt Nam', '08:00', '22:00', '0933456789', 'NO', 'YES', 3, NULL, 'YES');

-- Thêm 3 phòng ban vào bảng DEPARTMENT
INSERT INTO DEPARTMENT (DepartmentID, DepartmentName, BranchID)
VALUES
(1, 'Kinh doanh', 1),
(2, 'Nhân sự', 1),
(3, 'Marketing', 2);

-- Thêm 3 nhân viên vào bảng EMPLOYEE
INSERT INTO EMPLOYEE (EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone)
VALUES
(1, 'Nguyễn Văn A', '1990-05-01', 'male', 5000000, '2020-01-01', NULL, 1, 1, 'Hà Nội', '0987654321'),
(2, 'Trần Thị B', '1985-03-12', 'female', 6000000, '2019-06-15', NULL, 2, 1, 'Hồ Chí Minh', '0912345678'),
(3, 'Lê Minh C', '1992-09-23', 'male', 5500000, '2021-04-10', NULL, 3, 2, 'Đà Nẵng', '0909876543');

-- Thêm 3 dữ liệu mẫu vào bảng CARD_CUSTOMER
INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType)
VALUES 
    (1, '2023-01-15', 1, 100, N'member'), 
    (2, '2023-06-20', 2, 500, N'silver'), 
    (3, '2022-12-25', 3, 1000, N'golden');


-- Dữ liệu mẫu cho ORDER_DIRECTORY:
INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID, BranchID)
VALUES
(1, NULL, 5, 1, 1),
(2, NULL, 2, 2, 2),
(3, NULL, 7, 3, 3),
(4, NULL, 10, 1, 1),
(5, NULL, 5, 1, 2),   
(6, NULL, 8, 3, 3);   

-- Thêm 3 món ăn vào bảng DISH
INSERT INTO DISH (DishID, DishName, Price)
VALUES
(1, 'Món Sushi Cá Hồi', 150000),
(2, 'Món Sushi Cá Ngừ', 120000),
(3, 'Món Sashimi', 180000);

-- Thêm 3 đơn hàng vào bảng ORDER_ONLINE
INSERT INTO ORDER_ONLINE (OnOrderID, DateOrder, TimeOrder, AmountCustomer, Note)
VALUES
(1, '2024-11-29', '12:30', 4, 'Đặt món cho 4 người tại chi nhánh Hà Nội'),
(2, '2024-11-29', '18:00', 2, 'Đặt món cho 2 người tại chi nhánh Hồ Chí Minh'),
(3, '2024-11-29', '20:15', 3, 'Đặt món cho 3 người tại chi nhánh Đà Nẵng');

-- Thêm 3 đơn hàng offline vào bảng ORDER_OFFLINE
INSERT INTO ORDER_OFFLINE (OffOrderID, OrderEstablishDate)
VALUES
(4, '2024-11-29'), 
(5, '2024-11-28'), 
(6, '2024-11-27');  

-- Thêm 3 món ăn vào bảng ORDER_DISH_AMOUNT
INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
VALUES
(1, 1, 2),  
(1, 2, 1),  
(2, 3, 3), 
(3, 1, 1),
(3, 2, 2), 
(4, 3, 5),
(5, 3, 2),
(4, 2, 10),
(6, 3, 4),
(6, 1, 3)

-- Thêm dữ liệu vào bảng INVOICE
--INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID) 
--VALUES 
--    (1, NULL, 1000, NULL, '2024-01-10', NULL),
--    (2, NULL, 2000, NULL, '2024-01-11', NULL),
--    (3, NULL, 3000, NULL, '2024-01-12', NULL),
--    (4, NULL, 4000, NULL, '2024-01-13', NULL),
--    (5, NULL, 5000, NULL, '2024-01-14', NULL),
--    (6, NULL, 6000, NULL, '2024-01-15', NULL),
--    (7, NULL, 7000, NULL, '2024-01-16', NULL),
--    (8, NULL, 8000, NULL, '2024-01-17', NULL),
--    (9, NULL, 9000, NULL, '2024-01-18', NULL),
--    (10, NULL, 10000, NULL, '2024-01-19', NULL);

	-- Thêm dữ liệu vào bảng CUSTOMER
INSERT INTO CUSTOMER (CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD) 
VALUES 
    (1, 'Nguyen Van A', 'nguyenvana@example.com', 'male', '0123456789', '123456789012'),
    (2, 'Tran Thi B', 'tranthib@example.com', 'female', '0987654321', '234567890123'),
    (3, 'Le Van C', 'levanc@example.com', 'male', '0912345678', '345678901234');

-- Thêm nhân viên mới vào bảng EMPLOYEE
INSERT INTO EMPLOYEE (EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone)
VALUES
(4, 'Hoàng Văn D', '1988-08-15', 'male', 5000000, '2018-11-10', NULL, 1, 2, 'Hồ Chí Minh', '0976543210'),
(5, 'Phạm Thị E', '1995-04-20', 'female', 6000000, '2021-02-01', NULL, 2, 3, 'Đà Nẵng', '0932123456'),
(6, 'Đỗ Minh F', '1993-07-07', 'male', 5500000, '2020-09-12', NULL, 3, 2, 'Hà Nội', '0923456789'),
(7, 'Nguyễn Thanh G', '1991-12-25', 'male', 5000000, '2019-03-18', NULL, 1, 3, 'Đà Nẵng', '0981237890'),
(8, 'Trần Thùy H', '1987-06-30', 'female', 6000000, '2017-05-20', NULL, 2, 1, 'Hà Nội', '0916789012');

-- Cập nhật chi nhánh để thêm nhân viên quản lý
UPDATE BRANCH
SET ManagerID = 1
WHERE BranchID = 1;

UPDATE BRANCH
SET ManagerID = 4
WHERE BranchID = 2;

UPDATE BRANCH
SET ManagerID = 5
WHERE BranchID = 3;

INSERT INTO userWeb (userPhone, password, role)
VALUES
('0981234567', '123', 'manager branch'),
('0976543210', '123', 'manager branch'),
('0932123456', '123', 'manager branch')

-- Thêm nhân viên còn lại với role là 'employee'
INSERT INTO userWeb (userPhone, password, role)
VALUES
('0909876543', '123', 'employee'),
('0923456789', '123', 'employee'),
('0981237890', '123', 'employee'),
('0916789012', '123', 'employee');

-- Thêm khách hàng với role là 'customer'
INSERT INTO userWeb (userPhone, password, role)
VALUES
('0123456789', '123', 'customer'),
('0987654321', '123', 'customer'),
('0912345678', '123', 'customer');

INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID, BranchID)
VALUES 
    (11, NULL, 5, 1, 3);  -- NULL cho EmployeeID
GO

INSERT INTO ORDER_ONLINE (OnOrderID, DateOrder, TimeOrder, AmountCustomer, Note)
VALUES 
    (11, '2024-12-28', '14:30:00', 3, 'Order for delivery');
GO

INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
VALUES 
    (11, 1, 2),  
    (11, 2, 1);  
GO

INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID, BranchID)
VALUES 
    (14, NULL, 5, 1, 3);  -- NULL cho EmployeeID
GO

INSERT INTO ORDER_ONLINE (OnOrderID, DateOrder, TimeOrder, AmountCustomer, Note)
VALUES 
    (14, '2024-12-28', '14:30:00', 3, 'Order for delivery');
GO

INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
VALUES 
    (14, 1, 2),  
    (14, 2, 1);  
GO

-- Bảng không phụ thuộc
DELETE FROM DISHREVENUE;
DELETE FROM RevenueByYear;
DELETE FROM RevenueByQuarter;
DELETE FROM RevenueByMonth;
DELETE FROM RevenueByDate;
DELETE FROM ORDER_ONLINE;
DELETE FROM ORDER_OFFLINE;
DELETE FROM ORDER_DISH_AMOUNT;
DELETE FROM INVOICE;
DELETE FROM ORDER_DIRECTORY;
DELETE FROM CUSTOMER;
DELETE FROM CARD_CUSTOMER;
DELETE FROM EMPLOYEE_HISTORY;
DELETE FROM EMPLOYEE;
DELETE FROM DEPARTMENT;
DELETE FROM MENU_DIRECTORY_DISH;
DELETE FROM QUALITY;
DELETE FROM BRANCH;
DELETE FROM DISH;
DELETE FROM AREA;

-- Xóa userWeb nếu không liên quan tới các bảng khác
DELETE FROM userWeb;

select* from RevenueByDate