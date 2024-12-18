USE SUSHISTORE_MANAGEMENT1
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
INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
VALUES
(1, 1, 5, 1),
(2, 2, 2, 2),
(3, 3, 7, 3),
(4, 1, 10, 1),
(5, 2, 5, 1),   
(6, 3, 8, 3);   

-- Thêm 3 món ăn vào bảng DISH
INSERT INTO DISH (DishID, DishName, Price)
VALUES
(1, 'Món Sushi Cá Hồi', 150000),
(2, 'Món Sushi Cá Ngừ', 120000),
(3, 'Món Sashimi', 180000);

-- Thêm 3 đơn hàng vào bảng ORDER_ONLINE
INSERT INTO ORDER_ONLINE (OnOrderID, BranchID, DateOrder, TimeOrder, AmountCustomer, Note)
VALUES
(1, 1, '2024-11-29', '12:30', 4, 'Đặt món cho 4 người tại chi nhánh Hà Nội'),
(2, 2, '2024-11-29', '18:00', 2, 'Đặt món cho 2 người tại chi nhánh Hồ Chí Minh'),
(3, 3, '2024-11-29', '20:15', 3, 'Đặt món cho 3 người tại chi nhánh Đà Nẵng');

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

	-- Thêm dữ liệu vào bảng CUSTOMER
INSERT INTO CUSTOMER (CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD) 
VALUES 
    (1, 'Nguyen Van A', 'nguyenvana@example.com', 'male', '0123456789', '123456789012'),
    (2, 'Tran Thi B', 'tranthib@example.com', 'female', '0987654321', '234567890123'),
    (3, 'Le Van C', 'levanc@example.com', 'male', '0912345678', '345678901234');



-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
---------------------------------------------DATA TEST REVENUE-----------------------------------------------------

INSERT INTO AREA (AreaID, AreaName)
VALUES 
    (1, 'Downtown Area'),
    (2, 'Uptown Area');

	

INSERT INTO BRANCH (BranchID, BranchName, BranchAddress, OpenHour, CloseHour, PhoneNumber, HasCarParking, HasMotorParking, AreaID, ManagerID, HasDeliveryService)
VALUES 
    (1, 'Downtown Branch', '123 Main St', '08:00', '22:00', '1234567890', 'YES', 'YES', 1, NULL, 'YES'),
    (2, 'Uptown Branch', '456 Central Ave', '09:00', '21:00', '0987654321', 'NO', 'YES', 2, NULL, 'NO');

	
INSERT INTO DEPARTMENT (DepartmentID, DepartmentName, BranchID)
VALUES 
    (1, 'Sales', 1),
    (2, 'Customer Service', 1),
    (3, 'Kitchen', 1),
    (4, 'Delivery', 1),
    (5, 'Management', 1);
	
INSERT INTO EMPLOYEE (EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone)
VALUES 
    (201, 'Alice Johnson', '1990-03-05', 'female', 50000, '2024-01-01', NULL, 1, 1, '123 Street A', '1234567890'),
    (202, 'Bob Smith', '1985-07-15', 'male', 55000, '2024-02-01', NULL, 1, 1, '456 Street B', '1234567891'),
    (203, 'Charlie Brown', '1992-11-23', 'male', 60000, '2024-03-01', NULL, 2, 1, '789 Street C', '1234567892'),
    (204, 'David Lee', '1995-06-30', 'male', 48000, '2024-04-01', NULL, 2, 1, '101 Street D', '1234567893'),
    (205, 'Eve White', '1998-08-08', 'female', 70000, '2024-05-01', NULL, 3, 1, '202 Street E', '1234567894'),
    (206, 'Frank Black', '1980-12-12', 'male', 75000, '2024-06-01', NULL, 3, 1, '303 Street F', '1234567895'),
    (207, 'Grace Green', '1991-09-09', 'female', 62000, '2024-07-01', NULL, 4, 1, '404 Street G', '1234567896'),
    (208, 'Hannah Adams', '1993-02-18', 'female', 56000, '2024-08-01', NULL, 4, 1, '505 Street H', '1234567897'),
    (209, 'Ian Wright', '1989-01-29', 'male', 80000, '2024-09-01', NULL, 5, 1, '606 Street I', '1234567898'),
    (210, 'Jack King', '1982-04-20', 'male', 72000, '2024-10-01', NULL, 5, 1, '707 Street J', '1234567899');
	
INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType)
VALUES 
    (101, '2024-01-01', 201, 100, N'member'),
    (102, '2024-02-01', 202, 200, N'silver'),
    (103, '2024-03-01', 203, 150, N'golden'),
    (104, '2024-04-01', 204, 300, N'member'),
    (105, '2024-05-01', 205, 400, N'silver'),
    (106, '2024-06-01', 206, 500, N'golden'),
    (107, '2024-07-01', 207, 250, N'member'),
    (108, '2024-08-01', 208, 180, N'silver'),
    (109, '2024-09-01', 209, 220, N'golden'),
    (110, '2024-10-01', 210, 300, N'member');


INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
VALUES 
    (1, 201, 5, 101),
    (2, 202, 3, 102),
    (3, 203, 2, 103),
    (4, 204, 1, 104),
    (5, 205, 4, 105);



INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID)
VALUES 
    (1, 101, 1000, 100, '2024-12-01', 1),
    (2, 102, 1500, 200, '2024-12-01', 2),
    (3, 103, 2000, 300, '2024-12-02', 3),
    (4, 104, 2500, 400, '2024-12-03', 4),
    (5, 105, 3000, 500, '2024-11-30', 5);

	INSERT INTO RevenueByDate (RevenueDate, TotalRevenue)
VALUES 
    ('2024-12-01', 2200), 
    ('2024-12-02', 1700), 
    ('2024-12-03', 2100), 
    ('2024-11-30', 2500), 
    ('2024-12-04', 10400), 
    ('2024-10-15', 4300), 
    ('2024-09-20', 11300);



---------------------------------------------DATA TEST REVENUE-----------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------