CREATE DATABASE SUSHISTORE_MANAGEMENT
GO

USE SUSHISTORE_MANAGEMENT
GO

CREATE TABLE AREA (
    AreaID INT PRIMARY KEY,
    AreaName NVARCHAR(255)
);
GO

CREATE TABLE QUALITY (
    BranchID INT,
    AreaID INT,
	CardID INT,
    ServicePoints INT,
    LocationPoints INT,
    FoodPoints INT,
    PricePoints INT,
    SpacePoint INT,
    Comment NVARCHAR(255),
    PRIMARY KEY (BranchID, AreaID)
);
GO

CREATE TABLE BRANCH (
    BranchID INT PRIMARY KEY,
    BranchName NVARCHAR(255),
    BranchAddress NVARCHAR(255),
    OpenHour TIME,
    CloseHour TIME,
    PhoneNumber CHAR(15),
    HasCarParking VARCHAR(10) CHECK (HasCarParking IN ('YES', 'NO')),
    HasMotorParking VARCHAR(10) CHECK (HasMotorParking IN ('YES', 'NO')),
    AreaID INT,
    ManagerID INT,
    HasDeliveryService VARCHAR(10) CHECK (HasDeliveryService IN ('YES', 'NO'))
);
GO

CREATE TABLE MENU_DIRECTORY (
    BranchID INT,
    DirectoryID INT,
    PRIMARY KEY (BranchID, DirectoryID)
);
GO

CREATE TABLE DIRECTORY (
    DirectoryID INT PRIMARY KEY,
    DirectoryName NVARCHAR(255)
);
GO

CREATE TABLE DIRECTORY_DISH (
    DirectoryID INT,
    DishID INT,
    PRIMARY KEY (DirectoryID, DishID)
);
GO

CREATE TABLE DEPARTMENT (
    DepartmentID INT PRIMARY KEY,
    DepartmentName NVARCHAR(255),
    BranchID INT
);
GO

CREATE TABLE EMPLOYEE (
    EmployeeID INT PRIMARY KEY,
    EmployeeName NVARCHAR(255),
    EmployeeBirth DATE,
    EmployeeGender NVARCHAR(10),
    Salary INT CHECK (Salary > 0),
    EntryDate DATE,
    LeaveDate DATE,
    DepartmentID INT NOT NULL,
    BranchID INT,
    EmployeeAddress NVARCHAR(255),
    EmployeePhone CHAR(15)
);
GO

CREATE TABLE EMPLOYEE_HISTORY (
    EmployeeID INT,
    BranchID INT,
    EntryDate DATE,
    LeaveDate DATE,
    PRIMARY KEY (EmployeeID, BranchID, EntryDate),
    CHECK (EntryDate < LeaveDate)
);
GO

CREATE TABLE CARD_CUSTOMER (
    CardID INT PRIMARY KEY,
    CardEstablishDate DATE,
    EmployeeID INT,
    Score INT CHECK(Score >=0),
    CardType NVARCHAR(100) CHECK (CardType in (N'member', N'silver', N'golden'))
)
GO

CREATE TABLE CUSTOMER (
    CardID INT PRIMARY KEY,
    CustomerName NVARCHAR(255),
    CustomerEmail NVARCHAR(255),
    CustomerGender NVARCHAR(10) CHECK (CustomerGender IN ('male', 'female', 'other')),
    CustomerPhone CHAR(15),
    CCCD CHAR(12)
);
GO

CREATE TABLE ORDER_DIRECTORY (
    OrderID INT PRIMARY KEY,
    EmployeeID INT,
    NumberTable INT,
    CardID INT
);
GO

CREATE TABLE ORDER_ONLINE (
    OnOrderID INT PRIMARY KEY,
    BranchID INT,
    DateOrder DATE,
    TimeOrder TIME,
    AmountCustomer INT,
    Note NVARCHAR(255)
);
GO

CREATE TABLE ORDER_DISH_AMOUNT (
    OrderID INT,
    DishID INT,
    AmountDish INT CHECK (AmountDish > 0),
    PRIMARY KEY (OrderID, DishID)
);
GO

CREATE TABLE DISH (
    DishID INT PRIMARY KEY,
    DishName NVARCHAR(255),
    Price INT
);
GO

CREATE TABLE INVOICE (
    InvoiceID INT PRIMARY KEY,
    CardID INT,
    TotalMoney INT CHECK(TotalMoney >= 0),
    DiscountMoney INT CHECK(DiscountMoney >= 0),
    PaymentDate DATE,
    OrderID INT
);
GO

CREATE TABLE ORDER_OFFLINE (
    OffOrderID INT PRIMARY KEY,
    OrderEstablishDate DATE
);
GO

CREATE TABLE RevenueByDate (
    RevenueDate DATE PRIMARY KEY,
    TotalRevenue INT
);
GO

CREATE TABLE RevenueByMonth (
    RevenueMonth INT,
	RevenueYear INT,
    TotalRevenue INT,
	PRIMARY KEY (REVENUEMONTH, REVENUEYEAR)
);
GO

CREATE TABLE RevenueByQuarter (
    RevenueYear INT,
    RevenueQuarter INT,
    TotalRevenue INT,
    PRIMARY KEY (RevenueYear, RevenueQuarter)
);
GO

CREATE TABLE RevenueByYear (
    RevenueYear INT PRIMARY KEY,
    TotalRevenue INT
);
GO

CREATE TABLE userWeb (
    userPhone CHAR(15) PRIMARY KEY,
    password NVARCHAR(255),
    role NVARCHAR(50) CHECK (role IN ('customer', 'employee', 'manager branch', 'manager company'))
);
GO

ALTER TABLE QUALITY
ADD CONSTRAINT FK_Quality_Area FOREIGN KEY (AreaID) REFERENCES AREA(AreaID),
    CONSTRAINT FK_Quality_Branch FOREIGN KEY (BranchID) REFERENCES BRANCH(BranchID),
	CONSTRAINT FK_Quality_CardCustomer FOREIGN KEY (CardID) REFERENCES CARD_CUSTOMER(CardID);
GO

ALTER TABLE BRANCH
ADD CONSTRAINT FK_Branch_Area FOREIGN KEY (AreaID) REFERENCES AREA(AreaID),
    CONSTRAINT FK_Branch_Manager FOREIGN KEY (ManagerID) REFERENCES EMPLOYEE(EmployeeID);
GO

ALTER TABLE MENU_DIRECTORY
ADD CONSTRAINT FK_MenuDirectory_Branch FOREIGN KEY (BranchID) REFERENCES BRANCH(BranchID),
    CONSTRAINT FK_MenuDirectory_Directory FOREIGN KEY (DirectoryID) REFERENCES DIRECTORY(DirectoryID);
GO

ALTER TABLE DIRECTORY_DISH
ADD CONSTRAINT FK_DirectoryDish_Directory FOREIGN KEY (DirectoryID) REFERENCES DIRECTORY(DirectoryID),
    CONSTRAINT FK_DirectoryDish_Dish FOREIGN KEY (DishID) REFERENCES DISH(DishID);
GO

ALTER TABLE DEPARTMENT
ADD CONSTRAINT FK_Department_Branch FOREIGN KEY (BranchID) REFERENCES BRANCH(BranchID);
GO

ALTER TABLE EMPLOYEE
ADD CONSTRAINT FK_Employee_Department FOREIGN KEY (DepartmentID) REFERENCES DEPARTMENT(DepartmentID),
    CONSTRAINT FK_Employee_Branch FOREIGN KEY (BranchID) REFERENCES BRANCH(BranchID);
GO

ALTER TABLE EMPLOYEE_HISTORY
ADD CONSTRAINT FK_EmployeeHistory_Branch FOREIGN KEY (BranchID) REFERENCES BRANCH(BranchID),
    CONSTRAINT FK_EmployeeHistory_Employee FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEE(EmployeeID);
GO

ALTER TABLE CARD_CUSTOMER
ADD CONSTRAINT FK_CardCustomer_Employee FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEE(EmployeeID);
GO

ALTER TABLE CUSTOMER
ADD CONSTRAINT FK_Customer_Card FOREIGN KEY (CardID) REFERENCES CARD_CUSTOMER(CardID);
GO

ALTER TABLE ORDER_DIRECTORY
ADD CONSTRAINT FK_OrderDirectory_Employee FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEE(EmployeeID),
    CONSTRAINT FK_OrderDirectory_CardCustomer FOREIGN KEY (CardID) REFERENCES CARD_CUSTOMER(CardID);
GO

ALTER TABLE ORDER_ONLINE
ADD CONSTRAINT FK_OrderOnline_Branch FOREIGN KEY (BranchID) REFERENCES BRANCH(BranchID);
GO

ALTER TABLE ORDER_DISH_AMOUNT
ADD CONSTRAINT FK_OrderDishAmount_Order FOREIGN KEY (OrderID) REFERENCES ORDER_DIRECTORY(OrderID),
    CONSTRAINT FK_OrderDishAmount_Dish FOREIGN KEY (DishID) REFERENCES DISH(DishID);
GO

ALTER TABLE INVOICE
ADD CONSTRAINT FK_Invoice_CardID FOREIGN KEY (CardID) REFERENCES Card_Customer(CardID),
    CONSTRAINT FK_Invoice_Order FOREIGN KEY (OrderID) REFERENCES ORDER_DIRECTORY(OrderID);
GO

ALTER TABLE ORDER_OFFLINE
ADD CONSTRAINT FK_OfflineOrder FOREIGN KEY (OffOrderID) REFERENCES ORDER_DIRECTORY(OrderID);
GO

ALTER TABLE ORDER_ONLINE
ADD CONSTRAINT FK_OrderOnline_OrderDirectory FOREIGN KEY (OnOrderID) REFERENCES ORDER_DIRECTORY(OrderID);
GO
