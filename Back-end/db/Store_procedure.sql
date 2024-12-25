USE SUSHISTORE_MANAGEMENT
GO
---------------------------------------------------------------------------------
-- GET DATA FROM OrderDirectory, OrderOnline, Dish, OrderDishAmount
CREATE PROCEDURE GetOrderOnline
AS
BEGIN
    SELECT
        OD.OrderID,
        OO.BranchID,
        OD.EmployeeID,
        OD.NumberTable,
        OD.CardID,
        OO.AmountCustomer,
        D.DishName,
        ODA.AmountDish,
        OO.DateOrder,
        OO.TimeOrder
    FROM
        ORDER_DIRECTORY OD
        INNER JOIN ORDER_ONLINE OO ON OD.OrderID = OO.OnOrderID
        INNER JOIN ORDER_DISH_AMOUNT ODA ON OD.OrderID = ODA.OrderID
        INNER JOIN DISH D ON ODA.DishID = D.DishID
        INNER JOIN CARD_CUSTOMER CC ON OD.CardID = CC.CardID
    ORDER BY OO.DateOrder, OO.TimeOrder;
END;
GO

-- POST ORDER ONLINE
CREATE PROCEDURE AddNewOrderOnline
    @OrderID INT,
    @BranchID INT,
    @EmployeeID INT,
    @NumberTable INT,
    @CardID INT,
    @AmountCustomer INT,
    @DishName NVARCHAR(255),
    @AmountDish INT,
    @DateOrder DATE,
    @TimeOrder TIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Check if OrderID already exists
        IF EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
        BEGIN
			THROW 50010, 'OrderID already exists in the system.', 1;
			THROW 50010, 'OrderID already exists in the system.', 1;
        END

        -- Validate BranchID
        IF NOT EXISTS (SELECT 1
    FROM BRANCH
    WHERE BranchID = @BranchID)
        BEGIN
            THROW 50011, 'Branch does not exist.', 1;
        END

    -- Validate EmployeeID
    IF NOT EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
        BEGIN
    THROW 50012, 'Employee does not exist.', 1;
END

-- Validate CardID
IF NOT EXISTS (SELECT 1
FROM CARD_CUSTOMER
WHERE CardID = @CardID)
        BEGIN
THROW 50013, 'Customer does not exist.', 1;
END

-- Validate Amounts
IF @AmountCustomer <= 0
        BEGIN
THROW 50014, 'AmountCustomer must be greater than 0.', 1;
END
IF @AmountDish <= 0
        BEGIN
THROW 50015, 'AmountDish must be greater than 0.', 1;
END

-- Get DishID from DishName
DECLARE @DishID INT;
SELECT @DishID = DishID
FROM DISH
WHERE DishName = @DishName;

IF @DishID IS NULL
        BEGIN
THROW 50016, 'Dish does not exist in the system.', 1;
END

-- Insert into ORDER_DIRECTORY
INSERT INTO ORDER_DIRECTORY
    (OrderID, EmployeeID, NumberTable, CardID)
VALUES
    (@OrderID, @EmployeeID, @NumberTable, @CardID);

-- Insert into ORDER_ONLINE
INSERT INTO ORDER_ONLINE
    (OnOrderID, BranchID, DateOrder, TimeOrder, AmountCustomer)
VALUES
    (@OrderID, @BranchID, @DateOrder, @TimeOrder, @AmountCustomer);

-- Insert into ORDER_DISH_AMOUNT
INSERT INTO ORDER_DISH_AMOUNT
    (OrderID, DishID, AmountDish)
VALUES
    (@OrderID, @DishID, @AmountDish);

PRINT 'Order added successfully!';
COMMIT TRANSACTION;
END TRY
    BEGIN CATCH
PRINT 'Error occurred while adding the order: ' + ERROR_MESSAGE();
ROLLBACK TRANSACTION;
END CATCH
END;
GO

-- DELETE ORDER ONLINE
CREATE PROCEDURE DeleteOrderOnline
    @OrderID INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Validate if OrderID exists
        IF NOT EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
        BEGIN
            THROW 50020, 'Order does not exist.', 1;
        END

        -- Delete from ORDER_DISH_AMOUNT
        DELETE FROM ORDER_DISH_AMOUNT WHERE OrderID = @OrderID;

        -- Delete from ORDER_ONLINE
        DELETE FROM ORDER_ONLINE WHERE OnOrderID = @OrderID;

        -- Delete from ORDER_DIRECTORY
        DELETE FROM ORDER_DIRECTORY WHERE OrderID = @OrderID;

        PRINT 'Order deleted successfully!';
        COMMIT TRANSACTION;
    END
    TRY
    BEGIN CATCH
    PRINT 'Error occurred while deleting the order: ' + ERROR_MESSAGE();
    ROLLBACK TRANSACTION;
    END CATCH
END;
GO

-- PUT ORDER ONLINE
CREATE PROCEDURE UpdateOrderOnline
    @OrderID INT,
    @BranchID INT,
    @EmployeeID INT,
    @NumberTable INT,
    @CardID INT,
    @AmountCustomer INT,
    @DishName NVARCHAR(255),
    @AmountDish INT,
    @DateOrder DATE,
    @TimeOrder TIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Validate Order and other IDs
        IF NOT EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
        BEGIN
            THROW 50021, 'Order does not exist.', 1;
        END
        IF NOT EXISTS (SELECT 1
    FROM BRANCH
    WHERE BranchID = @BranchID)
        BEGIN
            THROW 50022, 'Branch does not exist.', 1;
        END
    IF NOT EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
        BEGIN
    THROW 50023, 'Employee does not exist.', 1;
END
IF NOT EXISTS (SELECT 1
FROM CARD_CUSTOMER
WHERE CardID = @CardID)
        BEGIN
THROW 50024, 'Customer does not exist.', 1;
END

-- Get DishID
DECLARE @DishID INT;
SELECT @DishID = DishID
FROM DISH
WHERE DishName = @DishName;

IF @DishID IS NULL
        BEGIN
THROW 50025, 'Dish does not exist.', 1;
END

-- Update ORDER_DIRECTORY
UPDATE ORDER_DIRECTORY
        SET EmployeeID = @EmployeeID, NumberTable = @NumberTable, CardID = @CardID
        WHERE OrderID = @OrderID;

-- Update ORDER_ONLINE
UPDATE ORDER_ONLINE
        SET BranchID = @BranchID, AmountCustomer = @AmountCustomer, DateOrder = @DateOrder, TimeOrder = @TimeOrder
        WHERE OnOrderID = @OrderID;

-- Update or Insert ORDER_DISH_AMOUNT
IF EXISTS (SELECT 1
FROM ORDER_DISH_AMOUNT
WHERE OrderID = @OrderID AND DishID = @DishID)
        BEGIN
    UPDATE ORDER_DISH_AMOUNT
            SET AmountDish = @AmountDish
            WHERE OrderID = @OrderID AND DishID = @DishID;
END
        ELSE
        BEGIN
    INSERT INTO ORDER_DISH_AMOUNT
        (OrderID, DishID, AmountDish)
    VALUES
        (@OrderID, @DishID, @AmountDish);
END

PRINT 'Order updated successfully!';
COMMIT TRANSACTION;
END TRY
    BEGIN CATCH
PRINT 'Error occurred while updating the order: ' + ERROR_MESSAGE();
ROLLBACK TRANSACTION;
END CATCH
END;
GO
--GET DATA FROM OrderDirectory, OrderOnline, Dish, OrderDishAmount
CREATE PROCEDURE GetOrderOffline
AS
BEGIN
    -- Truy vấn dữ liệu từ các bảng OrderDirectory, OrderOnline, Dish và OrderDishAmount
    SELECT
        OD.OrderID,
        OD.EmployeeID,
        OD.NumberTable,
        OD.CardID,
        D.DishName,
        ODA.AmountDish,
        OOF.OrderEstablishDate
    FROM
        ORDER_DIRECTORY OD
        INNER JOIN ORDER_OFFLINE OOF ON OD.OrderID = OOF.OffOrderID
        INNER JOIN ORDER_DISH_AMOUNT ODA ON OD.OrderID = ODA.OrderID
        INNER JOIN DISH D ON ODA.DishID = D.DishID
        INNER JOIN CARD_CUSTOMER CC ON OD.CardID = CC.CardID
    ORDER BY OOF.OrderEstablishDate
END;
GO

-- POST ORDER OFFLINE
CREATE PROCEDURE AddNewOfflineOrder
    @OrderID INT,
    @EmployeeID INT,
    @NumberTable INT,
    @CardID INT,
    @DishName NVARCHAR(255),
    @AmountDish INT,
    @OrderEstablishDate Date
AS
BEGIN
    BEGIN TRY
		BEGIN TRANSACTION 
        -- Bước 1: Kiểm tra xem EmployeeID đã tồn tại trong bảng EMPLOYEE chưa
        IF NOT EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
        BEGIN
            THROW 50001, 'Nhân viên không tồn tại trong hệ thống.', 1;
        END
		-- Bước 2: Kiểm tra xem CardID đã tồn tại trong bảng CARD_CUSTOMER chưa
        IF NOT EXISTS (SELECT 1
    FROM CARD_CUSTOMER
    WHERE CardID = @CardID)
        BEGIN
            THROW 50001, 'Khách hàng không tồn tại trong hệ thống.', 1;
        END
    -- Bước 3: Thêm thông tin vào bảng ORDER_DIRECTORY
    INSERT INTO ORDER_DIRECTORY
        (OrderID, EmployeeID, NumberTable, CardID)
    VALUES
        (@OrderID, @EmployeeID, @NumberTable, @CardID);

    -- Bước 4: Lấy DishID từ tên món ăn
    DECLARE @DishID INT;
    SELECT @DishID = DishID
    FROM DISH
    WHERE DishName = @DishName;

    -- Kiểm tra nếu món ăn không tồn tại trong bảng DISH
    IF @DishID IS NULL
        BEGIN
    THROW 50002, 'Món ăn không tồn tại trong hệ thống.', 1;
END

-- Bước 5: Thêm thông tin vào bảng ORDER_OFFLINE (đơn hàng Offline)
INSERT INTO ORDER_OFFLINE
    (OffOrderID, OrderEstablishDate)
VALUES
    (@OrderID, @OrderEstablishDate);

-- Bước 6: Thêm thông tin vào bảng ORDER_DISH_AMOUNT (số lượng món ăn trong đơn)
INSERT INTO ORDER_DISH_AMOUNT
    (OrderID, DishID, AmountDish)
VALUES
    (@OrderID, @DishID, @AmountDish);

-- Thông báo thành công
PRINT 'Thêm đơn hàng thành công!';
COMMIT TRANSACTION;
END TRY
    BEGIN CATCH
-- Xử lý lỗi nếu có
PRINT 'Đã xảy ra lỗi khi thêm đơn hàng: ' + ERROR_MESSAGE();
ROLLBACK TRANSACTION;
-- rollback nếu có lỗi
END CATCH
END;
GO

-- DELETE ORDER OFFLINE
CREATE OR ALTER PROCEDURE DeleteOrderOffline
CREATE OR ALTER PROCEDURE DeleteOrderOffline
    @OrderID INT
-- Nhận giá trị OrderID cần xóa
AS
BEGIN
    -- Kiểm tra xem OrderID có tồn tại trong ORDER_DIRECTORY không
    IF NOT EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
    BEGIN
        RAISERROR('Order không tồn tại.', 16, 1);
        RETURN;
    END

    -- Xóa thông tin từ ORDER_DISH_AMOUNT (các món ăn liên quan đến đơn hàng)
    DELETE FROM ORDER_DISH_AMOUNT WHERE OrderID = @OrderID;

    -- Xóa thông tin từ ORDER_OFFLINE 
    DELETE FROM ORDER_OFFLINE WHERE OffOrderID = @OrderID;

    -- Xóa thông tin từ ORDER_DIRECTORY (đơn hàng chính)
    DELETE FROM ORDER_DIRECTORY WHERE OrderID = @OrderID;

    PRINT 'Đơn hàng đã được xóa thành công!';
END;
GO

-- PUT ORDER OFFLINE
CREATE PROCEDURE UpdateOrderOffline
    @OrderID INT,
    @EmployeeID INT,
    @NumberTable INT,
    @CardID INT,
    @DishName NVARCHAR(255),
    @AmountDish INT,
    @OrderEstablishDate Date

AS
BEGIN
    -- Bắt đầu giao dịch để đảm bảo tính toàn vẹn dữ liệu
    BEGIN TRANSACTION;

    BEGIN TRY
	        -- 1️⃣ Kiểm tra sự tồn tại của OrderID trong ORDER_DIRECTORY
        IF NOT EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
        BEGIN
            THROW 50001, 'Đơn hàng không tồn tại!', 1;
        END

        -- Kiểm tra sự tồn tại của OnOrderID trong ORDER_ONLINE
        IF NOT EXISTS (SELECT 1
    FROM ORDER_OFFLINE
    WHERE OffOrderID = @OrderID)
        BEGIN
            THROW 50002, 'Đơn hàng offline không tồn tại!', 1;
        END

    -- Kiểm tra sự tồn tại của EmployeeID trong bảng Employee
    IF NOT EXISTS (SELECT 1
    FROM Employee
    WHERE EmployeeID = @EmployeeID)
        BEGIN
    THROW 50003, 'Nhân viên không tồn tại!', 1;
END
-- Kiểm tra sự tồn tại của CardID trong bảng CARD_CUSTOMER 
IF NOT EXISTS (SELECT 1
FROM CARD_CUSTOMER
WHERE CardID = @CardID)
        BEGIN
THROW 50004, 'Khách hàng không tồn tại trong hệ thống.', 1;
END
-- Cập nhật thông tin đơn hàng trong bảng ORDER_OFFLINE
UPDATE ORDER_OFFLINE
        SET 
			OrderEstablishDate = @OrderEstablishDate
        WHERE OffOrderID = @OrderID;

-- Cập nhật thông tin bàn và nhân viên trong bảng ORDER_DIRECTORY
UPDATE ORDER_DIRECTORY
        SET 
            EmployeeID = @EmployeeID,
            NumberTable = @NumberTable,
			CardID = @CardID
        WHERE OrderID = @OrderID;

-- Cập nhật số lượng món ăn trong bảng ORDER_DISH_AMOUNT
-- Cần lấy DishID dựa trên tên món ăn
DECLARE @DishID INT;

SELECT @DishID = DishID
FROM DISH
WHERE DishName = @DishName;

IF @DishID IS NOT NULL
        BEGIN
    -- Kiểm tra xem món ăn đã tồn tại trong đơn hàng hay chưa, nếu có thì cập nhật, nếu chưa thì thêm mới
    IF EXISTS (SELECT 1
    FROM ORDER_DISH_AMOUNT
    WHERE OrderID = @OrderID AND DishID = @DishID)
            BEGIN
        UPDATE ORDER_DISH_AMOUNT
                SET AmountDish = @AmountDish
                WHERE OrderID = @OrderID AND DishID = @DishID;
    END
            ELSE
            BEGIN
        INSERT INTO ORDER_DISH_AMOUNT
            (OrderID, DishID, AmountDish)
        VALUES
            (@OrderID, @DishID, @AmountDish);
    END
END
        ELSE
        BEGIN
THROW 50005, 'Món ăn không tồn tại!', 1;
END

-- Cam kết giao dịch
COMMIT TRANSACTION;
PRINT 'Cập nhật đơn hàng thành công!';
END TRY
    BEGIN CATCH
-- Nếu có lỗi, hủy giao dịch và thông báo lỗi
ROLLBACK TRANSACTION;
PRINT 'Có lỗi trong quá trình cập nhật đơn hàng!';
THROW;
END CATCH
END;
GO
--===================================================================================================================
CREATE OR ALTER PROC New_Employee
    @EmployeeID INT,
    @EmployeeName NVARCHAR(255),
    @EmployeeBirth DATE,
    @EmployeeGender NVARCHAR(10),
    @Salary INT,
    @EntryDate DATE,
    @DepartmentID INT,
    @BranchID INT,
    @EmployeeAddress NVARCHAR(255),
    @EmployeePhone CHAR(15)
AS
BEGIN
    INSERT INTO EMPLOYEE
        (
        EmployeeID,EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate,
        DepartmentID, BranchID, EmployeeAddress, EmployeePhone
        )
    VALUES
        (
            @EmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate,
            @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone
    );
END;
GO

--Cap nhat thong tin nhan vien
CREATE OR ALTER PROCEDURE Update_Employee
    @EmployeeID INT,
    @EmployeeName NVARCHAR(255),
    @EmployeeBirth DATE,
    @EmployeeGender NVARCHAR(10),
    @Salary INT,
    @EntryDate DATE,
    @LeaveDate DATE,
    @DepartmentID INT,
    @BranchID INT,
    @EmployeeAddress NVARCHAR(255),
    @EmployeePhone CHAR(15)
AS
BEGIN
    UPDATE EMPLOYEE
    SET 
        EmployeeName = @EmployeeName,
        EmployeeBirth = @EmployeeBirth,
        EmployeeGender = @EmployeeGender,
        Salary = @Salary,
        EntryDate = @EntryDate,
        LeaveDate = @LeaveDate,
        DepartmentID = @DepartmentID,
        BranchID = @BranchID,
        EmployeeAddress = @EmployeeAddress,
        EmployeePhone = @EmployeePhone
    WHERE EmployeeID = @EmployeeID;
END;
GO

--Xoa nhan vien
CREATE OR ALTER PROCEDURE Delete_Employee
    @EmployeeID INT
AS
BEGIN
    IF EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
    BEGIN
        DELETE FROM EMPLOYEE WHERE EmployeeID = @EmployeeID;
        PRINT 'Employee deleted successfully.';
    END
    ELSE
    BEGIN
        PRINT 'Employee not found.';
    END
END;
GO

--Them mon an
CREATE OR ALTER PROCEDURE AddNewDish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishID INT,
    -- Thêm DishID vào tham số đầu vào
    @DishName NVARCHAR(255),
    @Price INT
AS
BEGIN
    DECLARE @DirectoryID INT;
    -- Kiểm tra nếu Directory không tồn tại, nếu không tồn tại thì thêm mới và lấy DirectoryID
    IF NOT EXISTS (SELECT 1
    FROM DIRECTORY
    WHERE DirectoryName = @DirectoryName)
    BEGIN
        INSERT INTO DIRECTORY
            (DirectoryName)
        VALUES
            (@DirectoryName);
        SET @DirectoryID = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID
        FROM DIRECTORY
        WHERE DirectoryName = @DirectoryName;
    END

    -- Kiểm tra nếu Dish không tồn tại, nếu không thì thêm mới và lấy DishID
    DECLARE @NewDishID INT;
    IF NOT EXISTS (SELECT 1
    FROM DISH
    WHERE DishID = @DishID) -- Kiểm tra DishID
    BEGIN
        INSERT INTO DISH
            (DishID, DishName, Price)
        VALUES
            (@DishID, @DishName, @Price);
        -- Chèn Dish với DishID
        SET @NewDishID = @DishID;
    -- Đặt DishID mới
    END
    ELSE
    BEGIN
        SELECT @NewDishID = DishID
        FROM DISH
        WHERE DishID = @DishID;
    END

    -- Thêm vào DIRECTORY_DISH nếu chưa tồn tại mối quan hệ giữa Directory và Dish
    IF NOT EXISTS (SELECT 1
    FROM DIRECTORY_DISH
    WHERE DirectoryID = @DirectoryID AND DishID = @NewDishID)
    BEGIN
        INSERT INTO DIRECTORY_DISH
            (DirectoryID, DishID)
        VALUES
            (@DirectoryID, @NewDishID);
    END

    -- Thêm vào MENU_DIRECTORY nếu chưa tồn tại mối quan hệ giữa Branch và Directory
    IF NOT EXISTS (SELECT 1
    FROM MENU_DIRECTORY
    WHERE BranchID = @BranchID AND DirectoryID = @DirectoryID)
    BEGIN
        INSERT INTO MENU_DIRECTORY
            (BranchID, DirectoryID)
        VALUES
            (@BranchID, @DirectoryID);
    END
END;
GO


--Xoa mon an
CREATE OR ALTER PROCEDURE DeleteDish
    @DishID INT
AS
BEGIN
    DELETE FROM DISH WHERE DishID = @DishID;
END;
GO

--Cap nhat mon
CREATE PROCEDURE Update_Dish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishID INT,
    -- ID của món cần cập nhật
    @NewDishName NVARCHAR(255),
    -- Tên món mới
    @NewPrice INT
-- Giá mới
AS
BEGIN
    -- Kiểm tra món ăn có tồn tại hay không
    IF NOT EXISTS (SELECT 1
    FROM DISH
    WHERE DishID = @DishID)
    BEGIN
        PRINT 'Dish not found!';
        RETURN;
    END

    -- Cập nhật thông tin món ăn trong bảng DISH
    UPDATE DISH
    SET DishName = @NewDishName, Price = @NewPrice
    WHERE DishID = @DishID;

    -- Kiểm tra Directory có tồn tại trong Branch không
    DECLARE @DirectoryID INT;
    SELECT @DirectoryID = MD.DirectoryID
    FROM MENU_DIRECTORY MD
        INNER JOIN DIRECTORY D ON MD.DirectoryID = D.DirectoryID
    WHERE MD.BranchID = @BranchID AND D.DirectoryName = @DirectoryName;

    IF @DirectoryID IS NULL
    BEGIN
        -- Thêm mục mới nếu chưa tồn tại
        INSERT INTO DIRECTORY
            (DirectoryName)
        VALUES
            (@DirectoryName);

        SET @DirectoryID = SCOPE_IDENTITY();

        -- Liên kết mục mới với chi nhánh
        INSERT INTO MENU_DIRECTORY
            (BranchID, DirectoryID)
        VALUES
            (@BranchID, @DirectoryID);
    END

    -- Cập nhật mối liên kết món ăn với mục mới trong DIRECTORY_DISH
    DELETE FROM DIRECTORY_DISH WHERE DishID = @DishID;

    INSERT INTO DIRECTORY_DISH
        (DirectoryID, DishID)
    VALUES
        (@DirectoryID, @DishID);

    PRINT 'Dish updated successfully.';
END;
GO
--===============================================================================================================================

----------------------REVENUE PROC----------------------------------------------------------------------------------------------
CREATE PROCEDURE InsertRevenueByDate
AS
BEGIN
    INSERT INTO RevenueByDate
        (RevenueDate, TotalRevenue)
    SELECT
        PaymentDate AS RevenueDate,
        SUM(TotalMoney - DiscountMoney) AS TotalRevenue
    FROM
        INVOICE
    GROUP BY 
        PaymentDate;
END;
GO
--EXEC InsertRevenueByDate;

-----------------------------------------------------------------
GO
CREATE PROCEDURE InsertRevenueByMontht
AS
BEGIN
    INSERT INTO RevenueByMonth
        (RevenueMonth, RevenueYear, TotalRevenue)
    SELECT
        MONTH(RevenueDate) AS RevenueMonth,
        YEAR(RevenueDate) AS RevenueYear,
        SUM(TotalRevenue) AS TotalRevenue
    FROM
        RevenueByDate
    GROUP BY 
        MONTH(RevenueDate), YEAR(RevenueDate)
    HAVING SUM(TotalRevenue) > 0;
END;
GO

--EXEC InsertRevenueByMonth

GO
CREATE PROCEDURE InsertRevenueByQuarter
AS
BEGIN
    INSERT INTO RevenueByQuarter
        (RevenueQuarter, RevenueYear, TotalRevenue)
    SELECT
        CEILING(MONTH(RevenueDate) / 3.0) AS RevenueQuarter,
        YEAR(RevenueDate) AS RevenueYear,
        SUM(TotalRevenue) AS TotalRevenue
    FROM
        RevenueByDate
    GROUP BY 
        CEILING(MONTH(RevenueDate) / 3.0), YEAR(RevenueDate)
    HAVING SUM(TotalRevenue) > 0;
END;
GO

--EXEC InsertRevenueByQuarter


CREATE PROCEDURE InsertRevenueByYear
AS
BEGIN
    INSERT INTO RevenueByYear
        (RevenueYear, TotalRevenue)
    SELECT
        YEAR(RevenueDate) AS RevenueYear,
        SUM(TotalRevenue) AS TotalRevenue
    FROM
        RevenueByDate
    GROUP BY 
        YEAR(RevenueDate)
    HAVING SUM(TotalRevenue) > 0;
END;
GO

--EXEC InsertRevenueByYear


-- Procedure to calculate revenue by day
CREATE PROCEDURE CalRevenueByDay
    (@InputDate DATE)
AS
BEGIN
    SELECT
        RevenueDate AS [Date],
        TotalRevenue AS [Total Revenue]
    FROM
        RevenueByDate
    WHERE 
        RevenueDate = @InputDate;
END;
GO

-- Procedure to calculate revenue by month
CREATE PROCEDURE CalRevenueByMonth
    (@InputMonth INT,
    @InputYear INT)
AS
BEGIN
    SELECT
        RevenueMonth AS [Month],
        RevenueYear AS [Year],
        TotalRevenue AS [Total Revenue]
    FROM
        RevenueByMonth
    WHERE 
        RevenueMonth = @InputMonth AND RevenueYear = @InputYear;
END;
GO

-- Procedure to calculate revenue by quarter
CREATE PROCEDURE CalRevenueByQuarter
    (@InputQuarter INT,
    @InputYear INT)
AS
BEGIN
    SELECT
        RevenueQuarter AS [Quarter],
        RevenueYear AS [Year],
        TotalRevenue AS [Total Revenue]
    FROM
        RevenueByQuarter
    WHERE 
        RevenueQuarter = @InputQuarter AND RevenueYear = @InputYear;
END;
GO

-- Procedure to calculate revenue by year
CREATE PROCEDURE CalRevenueByYear
    (@InputYear INT)
AS
BEGIN
    SELECT
        RevenueYear AS [Year],
        TotalRevenue AS [Total Revenue]
    FROM
        RevenueByYear
    WHERE 
        RevenueYear = @InputYear;
END;
GO

--EXEC CalRevenueByDay @InputDate = '2024-11-30';
--EXEC CalRevenueByMonth @InputMonth = 12, @InputYear = 2024;
--EXEC CalRevenueByQuarter @InputQuarter = 4, @InputYear = 2024;
--EXEC CalRevenueByYear @InputYear = 2024;

----------------------REVENUE PROC----------------------------------------------------------------------------------------------

CREATE PROCEDURE UPDATEDISHREVENUE
    @INVOICEID INT -- Tham số ID hóa đơn
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu transaction để đảm bảo tính nhất quán dữ liệu
        BEGIN TRANSACTION;

        -- Xử lý: Duyệt từng bản ghi để thực hiện chèn hoặc cập nhật
        MERGE DISHREVENUE AS DR
        USING (
            SELECT 
                COALESCE(OL.BRANCHID, OFL.BRANCHID) AS BRANCHID,
                D.DISHID,
                I.PAYMENTDATE AS PAYDATE,
                O.AMOUNTDISH * D.PRICE AS NEW_REVENUE
            FROM INVOICE I
            JOIN ORDER_DISH_AMOUNT O ON I.ORDERID = O.ORDERID
            JOIN DISH D ON O.DISHID = D.DISHID
            LEFT JOIN ORDER_ONLINE OL ON I.ORDERID = OL.OnOrderID
            LEFT JOIN ORDER_OFFLINE OFL ON I.ORDERID = OFL.OffOrderID
            WHERE I.INVOICEID = @INVOICEID
        ) AS SourceData
        ON DR.BRANCHID = SourceData.BRANCHID 
           AND DR.DISHID = SourceData.DISHID 
           AND DR.PAYDATE = SourceData.PAYDATE
        WHEN MATCHED THEN
            -- Nếu đã tồn tại, cập nhật REVENUE
            UPDATE SET DR.REVENUE = DR.REVENUE + SourceData.NEW_REVENUE
        WHEN NOT MATCHED THEN
            -- Nếu chưa tồn tại, thêm bản ghi mới
            INSERT (BRANCHID, DISHID, PAYDATE, REVENUE)
            VALUES (SourceData.BRANCHID, SourceData.DISHID, SourceData.PAYDATE, SourceData.NEW_REVENUE);

        -- Commit transaction nếu không có lỗi
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback transaction nếu có lỗi
        ROLLBACK TRANSACTION;

        -- Ném lỗi ra ngoài
        THROW;
    END CATCH
END;
GO
