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