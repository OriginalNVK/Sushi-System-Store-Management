﻿USE SUSHISTORE_MANAGEMENT
GO
---------------------------------------------------------------------------------
-- GET DATA FROM OrderDirectory, OrderOnline, Dish, OrderDishAmount
CREATE OR ALTER PROCEDURE GetOnlineOrder
CREATE OR ALTER PROCEDURE GetOnlineOrder
AS
BEGIN
    SELECT 
        OD.OrderID, 
        OD.BranchID, 
        OD.EmployeeID, 
        OD.NumberTable,
        OD.CardID,
        OO.AmountCustomer,
        D.DishName,
        ODA.AmountDish,
        OO.DateOrder,
        OO.AmountCustomer,
        D.DishName,
        ODA.AmountDish,
        OO.DateOrder,
        OO.TimeOrder
    FROM
    FROM
        ORDER_DIRECTORY OD
        INNER JOIN ORDER_ONLINE OO ON OD.OrderID = OO.OnOrderID
        INNER JOIN ORDER_DISH_AMOUNT ODA ON OD.OrderID = ODA.OrderID
        INNER JOIN DISH D ON ODA.DishID = D.DishID
        INNER JOIN CARD_CUSTOMER CC ON OD.CardID = CC.CardID
        INNER JOIN ORDER_ONLINE OO ON OD.OrderID = OO.OnOrderID
        INNER JOIN ORDER_DISH_AMOUNT ODA ON OD.OrderID = ODA.OrderID
        INNER JOIN DISH D ON ODA.DishID = D.DishID
        INNER JOIN CARD_CUSTOMER CC ON OD.CardID = CC.CardID
    ORDER BY OO.DateOrder, OO.TimeOrder;
END;
GO


--Drop procedure GetOrderOnlinePendingOverview
--Go

CREATE OR ALTER PROCEDURE GetOrderOnlinePendingOverview
CREATE OR ALTER PROCEDURE GetOrderOnlinePendingOverview
	@BranchID INT
AS
BEGIN
	SELECT 
        OD.OrderID, 
        OD.BranchID, 
        C.CUSTOMERNAME,
        OO.DateOrder, 
        OO.TimeOrder
    FROM 
        ORDER_DIRECTORY OD
    INNER JOIN ORDER_ONLINE OO ON OD.OrderID = OO.OnOrderID
    INNER JOIN CUSTOMER C ON OD.CardID = C.CardID
	WHERE OD.EmployeeID IS NULL AND OD.BranchID = @BranchID
    ORDER BY OO.DateOrder, OO.TimeOrder;
END;
GO 

--DROP procedure GetOrderOnlinePendingDetail
--DROP procedure GetOrderOnlinePendingDetail

CREATE OR ALTER PROCEDURE GetOrderPendingDetail
CREATE OR ALTER PROCEDURE GetOrderPendingDetail
    @ORDERID INT
AS
BEGIN
    -- Check if the ORDERID belongs to an Order Online
    IF EXISTS (
        SELECT 1
        FROM ORDER_DIRECTORY OD
        INNER JOIN ORDER_ONLINE OO ON OD.OrderID = OO.OnOrderID
        WHERE OD.OrderID = @ORDERID
    )
    BEGIN
        -- Retrieve Order Online details
        SELECT 
            OD.OrderID, 
            OD.NumberTable,
            OO.AmountCustomer, 
            D.DishName, 
            ODA.AmountDish
        FROM 
            ORDER_DIRECTORY OD
        INNER JOIN ORDER_ONLINE OO ON OD.OrderID = OO.OnOrderID
        INNER JOIN ORDER_DISH_AMOUNT ODA ON OD.OrderID = ODA.OrderID
        INNER JOIN DISH D ON ODA.DishID = D.DishID
        WHERE OD.OrderID = @ORDERID;
    END

    -- Check if the ORDERID belongs to an Order Offline
    ELSE IF EXISTS (
        SELECT 1
        FROM ORDER_DIRECTORY OD
        INNER JOIN ORDER_OFFLINE OO ON OD.OrderID = OO.OffOrderID
        WHERE OD.OrderID = @ORDERID
    )
    BEGIN
        -- Retrieve Order Offline details
        SELECT 
            OD.OrderID, 
            D.DishName, 
            ODA.AmountDish
        FROM 
            ORDER_DIRECTORY OD
        INNER JOIN ORDER_OFFLINE OO ON OD.OrderID = OO.OffOrderID
        INNER JOIN ORDER_DISH_AMOUNT ODA ON OD.OrderID = ODA.OrderID
        INNER JOIN DISH D ON ODA.DishID = D.DishID
        WHERE OD.OrderID = @ORDERID;
    END
END;
GO

CREATE OR ALTER PROCEDURE AddNewOnlineOrder
    @BranchID INT,
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
        DECLARE @OrderID INT;
        SELECT @OrderID = ISNULL(MAX(OrderID), 0) + 1 FROM ORDER_DIRECTORY;
        -- Kiểm tra tồn tại của BranchID, EmployeeID, CardID, DishName
        IF NOT EXISTS (SELECT 1 FROM BRANCH WHERE BranchID = @BranchID)
            THROW 50011, 'Branch does not exist.', 1;

        IF @CardID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
            THROW 50013, 'Customer does not exist.', 1;

        DECLARE @DishID INT;
        SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;

        IF @DishID IS NULL
            THROW 50016, 'Dish does not exist.', 1;

        -- Insert into ORDER_DIRECTORY
        INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID, BranchID)
        VALUES (@OrderID,NULL, @NumberTable, @CardID, @BranchID);
        VALUES (@OrderID,NULL, @NumberTable, @CardID, @BranchID);

        -- Insert into ORDER_ONLINE
        INSERT INTO ORDER_ONLINE (OnOrderID, DateOrder, TimeOrder, AmountCustomer)
        VALUES (@OrderID, @DateOrder, @TimeOrder, @AmountCustomer);

        -- Thêm dữ liệu vào ORDER_DISH_AMOUNT
        INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
        VALUES (@OrderID, @DishID, @AmountDish);

        PRINT 'Order added successfully!';
        COMMIT TRANSACTION;

        RETURN @OrderID; -- Trả về OrderID vừa tạo
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while adding the order: ' + ERROR_MESSAGE();
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- DELETE ORDER ONLINE
CREATE OR ALTER PROCEDURE DeleteOrderOnline
CREATE OR ALTER PROCEDURE DeleteOrderOnline
    @OrderID INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Validate if OrderID exists
        IF NOT EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
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
    END
    TRY
    BEGIN CATCH
    PRINT 'Error occurred while deleting the order: ' + ERROR_MESSAGE();
    ROLLBACK TRANSACTION;
    PRINT 'Error occurred while deleting the order: ' + ERROR_MESSAGE();
    ROLLBACK TRANSACTION;
    END CATCH
END;
GO

-- PUT ORDER ONLINE
CREATE OR ALTER PROCEDURE UpdateOrderOnline
CREATE OR ALTER PROCEDURE UpdateOrderOnline
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
        IF NOT EXISTS (SELECT 1
    FROM ORDER_DIRECTORY
    WHERE OrderID = @OrderID)
        BEGIN
            THROW 50021, 'Order does not exist.', 1;
        END
        IF NOT EXISTS (SELECT 1
    FROM BRANCH
    WHERE BranchID = @BranchID)
        IF NOT EXISTS (SELECT 1
    FROM BRANCH
    WHERE BranchID = @BranchID)
        BEGIN
            THROW 50022, 'Branch does not exist.', 1;
        END
    IF NOT EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
    IF NOT EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
        BEGIN
    THROW 50023, 'Employee does not exist.', 1;
END
IF NOT EXISTS (SELECT 1
FROM CARD_CUSTOMER
WHERE CardID = @CardID)
    THROW 50023, 'Employee does not exist.', 1;
END
IF NOT EXISTS (SELECT 1
FROM CARD_CUSTOMER
WHERE CardID = @CardID)
        BEGIN
THROW 50024, 'Customer does not exist.', 1;
END
THROW 50024, 'Customer does not exist.', 1;
END

-- Get DishID
DECLARE @DishID INT;
SELECT @DishID = DishID
FROM DISH
WHERE DishName = @DishName;
-- Get DishID
DECLARE @DishID INT;
SELECT @DishID = DishID
FROM DISH
WHERE DishName = @DishName;

IF @DishID IS NULL
IF @DishID IS NULL
        BEGIN
THROW 50025, 'Dish does not exist.', 1;
END
THROW 50025, 'Dish does not exist.', 1;
END

        -- Update ORDER_DIRECTORY
        UPDATE ORDER_DIRECTORY
        SET EmployeeID = @EmployeeID, NumberTable = @NumberTable, CardID = @CardID, BranchID = @BranchID
        WHERE OrderID = @OrderID;

        -- Update ORDER_ONLINE
        UPDATE ORDER_ONLINE
        SET AmountCustomer = @AmountCustomer, DateOrder = @DateOrder, TimeOrder = @TimeOrder
        WHERE OnOrderID = @OrderID;

-- Update or Insert ORDER_DISH_AMOUNT
IF EXISTS (SELECT 1
FROM ORDER_DISH_AMOUNT
WHERE OrderID = @OrderID AND DishID = @DishID)
-- Update or Insert ORDER_DISH_AMOUNT
IF EXISTS (SELECT 1
FROM ORDER_DISH_AMOUNT
WHERE OrderID = @OrderID AND DishID = @DishID)
        BEGIN
    UPDATE ORDER_DISH_AMOUNT
    UPDATE ORDER_DISH_AMOUNT
            SET AmountDish = @AmountDish
            WHERE OrderID = @OrderID AND DishID = @DishID;
END
END
        ELSE
        BEGIN
    INSERT INTO ORDER_DISH_AMOUNT
        (OrderID, DishID, AmountDish)
    VALUES
        (@OrderID, @DishID, @AmountDish);
END
    INSERT INTO ORDER_DISH_AMOUNT
        (OrderID, DishID, AmountDish)
    VALUES
        (@OrderID, @DishID, @AmountDish);
END

PRINT 'Order updated successfully!';
COMMIT TRANSACTION;
END TRY
PRINT 'Order updated successfully!';
COMMIT TRANSACTION;
END TRY
    BEGIN CATCH
PRINT 'Error occurred while updating the order: ' + ERROR_MESSAGE();
ROLLBACK TRANSACTION;
END CATCH
PRINT 'Error occurred while updating the order: ' + ERROR_MESSAGE();
ROLLBACK TRANSACTION;
END CATCH
END;
GO


-- POST ORDER OFFLINE
CREATE OR ALTER PROCEDURE AddNewOfflineOrder
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
       IF NOT EXISTS (SELECT 1 FROM EMPLOYEE WHERE EmployeeID = @EmployeeID)
       BEGIN
           THROW 50001, 'Nhân viên không tồn tại trong hệ thống.', 1;
       END
		-- Bước 2: Kiểm tra xem CardID đã tồn tại trong bảng CARD_CUSTOMER chưa
       IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
       BEGIN
           THROW 50001, 'Khách hàng không tồn tại trong hệ thống.', 1;
       END
       -- Bước 3: Thêm thông tin vào bảng ORDER_DIRECTORY
       INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
       VALUES (@OrderID, @EmployeeID, @NumberTable, @CardID);


-- POST ORDER OFFLINE
CREATE OR ALTER PROCEDURE AddNewOfflineOrder
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
       IF NOT EXISTS (SELECT 1 FROM EMPLOYEE WHERE EmployeeID = @EmployeeID)
       BEGIN
           THROW 50001, 'Nhân viên không tồn tại trong hệ thống.', 1;
       END
		-- Bước 2: Kiểm tra xem CardID đã tồn tại trong bảng CARD_CUSTOMER chưa
       IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
       BEGIN
           THROW 50001, 'Khách hàng không tồn tại trong hệ thống.', 1;
       END
       -- Bước 3: Thêm thông tin vào bảng ORDER_DIRECTORY
       INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
       VALUES (@OrderID, @EmployeeID, @NumberTable, @CardID);

       -- Bước 4: Lấy DishID từ tên món ăn
       DECLARE @DishID INT;
       SELECT @DishID = DishID 
       FROM DISH
       WHERE DishName = @DishName;
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
       -- Kiểm tra nếu món ăn không tồn tại trong bảng DISH
       IF @DishID IS NULL
       BEGIN
           THROW 50002, 'Món ăn không tồn tại trong hệ thống.', 1;
       END

       -- Bước 5: Thêm thông tin vào bảng ORDER_OFFLINE (đơn hàng Offline)
       INSERT INTO ORDER_OFFLINE (OffOrderID, OrderEstablishDate)
       VALUES (@OrderID, @OrderEstablishDate);
       -- Bước 5: Thêm thông tin vào bảng ORDER_OFFLINE (đơn hàng Offline)
       INSERT INTO ORDER_OFFLINE (OffOrderID, OrderEstablishDate)
       VALUES (@OrderID, @OrderEstablishDate);

       -- Bước 6: Thêm thông tin vào bảng ORDER_DISH_AMOUNT (số lượng món ăn trong đơn)
       INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
       VALUES (@OrderID, @DishID, @AmountDish);
       -- Bước 6: Thêm thông tin vào bảng ORDER_DISH_AMOUNT (số lượng món ăn trong đơn)
       INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
       VALUES (@OrderID, @DishID, @AmountDish);

       -- Thông báo thành công
       PRINT 'Thêm đơn hàng thành công!';
		COMMIT TRANSACTION;
   END TRY
   BEGIN CATCH
       -- Xử lý lỗi nếu có
       PRINT 'Đã xảy ra lỗi khi thêm đơn hàng: ' + ERROR_MESSAGE();
       ROLLBACK TRANSACTION;  -- rollback nếu có lỗi
   END CATCH
END;
GO
       -- Thông báo thành công
       PRINT 'Thêm đơn hàng thành công!';
		COMMIT TRANSACTION;
   END TRY
   BEGIN CATCH
       -- Xử lý lỗi nếu có
       PRINT 'Đã xảy ra lỗi khi thêm đơn hàng: ' + ERROR_MESSAGE();
       ROLLBACK TRANSACTION;  -- rollback nếu có lỗi
   END CATCH
END;
GO

-- DELETE ORDER OFFLINE
CREATE OR ALTER PROCEDURE DeleteOrderOffline
   @OrderID INT  -- Nhận giá trị OrderID cần xóa
AS
BEGIN
   -- Kiểm tra xem OrderID có tồn tại trong ORDER_DIRECTORY không
   IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
   BEGIN
       RAISERROR('Order không tồn tại.', 16, 1);
       RETURN;
   END
-- DELETE ORDER OFFLINE
CREATE OR ALTER PROCEDURE DeleteOrderOffline
   @OrderID INT  -- Nhận giá trị OrderID cần xóa
AS
BEGIN
   -- Kiểm tra xem OrderID có tồn tại trong ORDER_DIRECTORY không
   IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
   BEGIN
       RAISERROR('Order không tồn tại.', 16, 1);
       RETURN;
   END

   -- Xóa thông tin từ ORDER_DISH_AMOUNT (các món ăn liên quan đến đơn hàng)
   DELETE FROM ORDER_DISH_AMOUNT WHERE OrderID = @OrderID;
   -- Xóa thông tin từ ORDER_DISH_AMOUNT (các món ăn liên quan đến đơn hàng)
   DELETE FROM ORDER_DISH_AMOUNT WHERE OrderID = @OrderID;

   -- Xóa thông tin từ ORDER_OFFLINE 
   DELETE FROM ORDER_OFFLINE WHERE OffOrderID = @OrderID;
   -- Xóa thông tin từ ORDER_OFFLINE 
   DELETE FROM ORDER_OFFLINE WHERE OffOrderID = @OrderID;

   -- Xóa thông tin từ ORDER_DIRECTORY (đơn hàng chính)
   DELETE FROM ORDER_DIRECTORY WHERE OrderID = @OrderID;
   -- Xóa thông tin từ ORDER_DIRECTORY (đơn hàng chính)
   DELETE FROM ORDER_DIRECTORY WHERE OrderID = @OrderID;

   PRINT 'Đơn hàng đã được xóa thành công!';
END;
GO
   PRINT 'Đơn hàng đã được xóa thành công!';
END;
GO

-- PUT ORDER OFFLINE
CREATE OR ALTER PROCEDURE UpdateOrderOffline
   @OrderID INT,               
   @EmployeeID INT,          
   @NumberTable INT,     
	@CardID INT,
   @DishName NVARCHAR(255),    
   @AmountDish INT,          
	@OrderEstablishDate Date
-- PUT ORDER OFFLINE
CREATE OR ALTER PROCEDURE UpdateOrderOffline
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
AS
BEGIN
   -- Bắt đầu giao dịch để đảm bảo tính toàn vẹn dữ liệu
   BEGIN TRANSACTION;

   BEGIN TRY
	        -- 1️⃣ Kiểm tra sự tồn tại của OrderID trong ORDER_DIRECTORY
       IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
       BEGIN
           THROW 50001, 'Đơn hàng không tồn tại!', 1;
       END
   BEGIN TRY
	        -- 1️⃣ Kiểm tra sự tồn tại của OrderID trong ORDER_DIRECTORY
       IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
       BEGIN
           THROW 50001, 'Đơn hàng không tồn tại!', 1;
       END

       -- Kiểm tra sự tồn tại của OnOrderID trong ORDER_ONLINE
       IF NOT EXISTS (SELECT 1 FROM ORDER_OFFLINE WHERE OffOrderID = @OrderID)
       BEGIN
           THROW 50002, 'Đơn hàng offline không tồn tại!', 1;
       END
       -- Kiểm tra sự tồn tại của OnOrderID trong ORDER_ONLINE
       IF NOT EXISTS (SELECT 1 FROM ORDER_OFFLINE WHERE OffOrderID = @OrderID)
       BEGIN
           THROW 50002, 'Đơn hàng offline không tồn tại!', 1;
       END

       -- Kiểm tra sự tồn tại của EmployeeID trong bảng Employee
       IF NOT EXISTS (SELECT 1 FROM Employee WHERE EmployeeID = @EmployeeID)
       BEGIN
           THROW 50003, 'Nhân viên không tồn tại!', 1;
       END
		-- Kiểm tra sự tồn tại của CardID trong bảng CARD_CUSTOMER 
       IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
       BEGIN
           THROW 50004, 'Khách hàng không tồn tại trong hệ thống.', 1;
       END
       -- Cập nhật thông tin đơn hàng trong bảng ORDER_OFFLINE
       UPDATE ORDER_OFFLINE
       SET 
			OrderEstablishDate = @OrderEstablishDate
       WHERE OffOrderID = @OrderID;
       -- Kiểm tra sự tồn tại của EmployeeID trong bảng Employee
       IF NOT EXISTS (SELECT 1 FROM Employee WHERE EmployeeID = @EmployeeID)
       BEGIN
           THROW 50003, 'Nhân viên không tồn tại!', 1;
       END
		-- Kiểm tra sự tồn tại của CardID trong bảng CARD_CUSTOMER 
       IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
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
       -- Cập nhật số lượng món ăn trong bảng ORDER_DISH_AMOUNT
       -- Cần lấy DishID dựa trên tên món ăn
       DECLARE @DishID INT;

       SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;
       SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;

       IF @DishID IS NOT NULL
       BEGIN
           -- Kiểm tra xem món ăn đã tồn tại trong đơn hàng hay chưa, nếu có thì cập nhật, nếu chưa thì thêm mới
           IF EXISTS (SELECT 1 FROM ORDER_DISH_AMOUNT WHERE OrderID = @OrderID AND DishID = @DishID)
           BEGIN
               UPDATE ORDER_DISH_AMOUNT
               SET AmountDish = @AmountDish
               WHERE OrderID = @OrderID AND DishID = @DishID;
           END
           ELSE
           BEGIN
               INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
               VALUES (@OrderID, @DishID, @AmountDish);
           END
       END
       ELSE
       BEGIN
           THROW 50005, 'Món ăn không tồn tại!', 1;
       END
       IF @DishID IS NOT NULL
       BEGIN
           -- Kiểm tra xem món ăn đã tồn tại trong đơn hàng hay chưa, nếu có thì cập nhật, nếu chưa thì thêm mới
           IF EXISTS (SELECT 1 FROM ORDER_DISH_AMOUNT WHERE OrderID = @OrderID AND DishID = @DishID)
           BEGIN
               UPDATE ORDER_DISH_AMOUNT
               SET AmountDish = @AmountDish
               WHERE OrderID = @OrderID AND DishID = @DishID;
           END
           ELSE
           BEGIN
               INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
               VALUES (@OrderID, @DishID, @AmountDish);
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
    @EmployeeID INT,
    @EmployeeName NVARCHAR(255),
    @EmployeeBirth DATE,
    @EmployeeGender NVARCHAR(10),
    @EntryDate DATE,
    @DepartmentName NVARCHAR(255),
    @BranchName NVARCHAR(255),
    @EmployeeAddress NVARCHAR(255),
    @EmployeePhone NVARCHAR(20)
AS
BEGIN
    INSERT INTO EMPLOYEE
        (
        EmployeeID,EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate,
    INSERT INTO EMPLOYEE
    (
        EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate,
        DepartmentID, BranchID, EmployeeAddress, EmployeePhone
        )
    VALUES
        (
            @EmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate,
            @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone
        )
    VALUES
    (
        @NewEmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate,
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
    IF EXISTS (SELECT 1
    FROM EMPLOYEE
    WHERE EmployeeID = @EmployeeID)
    BEGIN
        -- Cập nhật các trường khóa ngoại liên kết với EmployeeID trong các bảng liên quan
        UPDATE CARD_CUSTOMER SET EmployeeID = NULL WHERE EmployeeID = @EmployeeID;
        UPDATE BRANCH SET ManagerID = NULL WHERE ManagerID = @EmployeeID;
        UPDATE EMPLOYEE_HISTORY SET EmployeeID = NULL WHERE EmployeeID = @EmployeeID;
        UPDATE ORDER_DIRECTORY SET EmployeeID = NULL WHERE EmployeeID = @EmployeeID;
        
        -- Xóa nhân viên khỏi bảng EMPLOYEE
        -- Cập nhật các trường khóa ngoại liên kết với EmployeeID trong các bảng liên quan
        UPDATE CARD_CUSTOMER SET EmployeeID = NULL WHERE EmployeeID = @EmployeeID;
        UPDATE BRANCH SET ManagerID = NULL WHERE ManagerID = @EmployeeID;
        UPDATE EMPLOYEE_HISTORY SET EmployeeID = NULL WHERE EmployeeID = @EmployeeID;
        UPDATE ORDER_DIRECTORY SET EmployeeID = NULL WHERE EmployeeID = @EmployeeID;
        
        -- Xóa nhân viên khỏi bảng EMPLOYEE
        DELETE FROM EMPLOYEE WHERE EmployeeID = @EmployeeID;
        
        PRINT 'Employee deleted successfully, and foreign keys updated.';
        
        PRINT 'Employee deleted successfully, and foreign keys updated.';
    END
    ELSE
    BEGIN
        PRINT 'Employee not found.';
    END
END;
GO

CREATE OR ALTER PROCEDURE AddNewDish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishID INT,
    @DishName NVARCHAR(255),
    @Price INT,
    @StatusDish NVARCHAR(10) -- Trạng thái món (YES/NO)
AS
BEGIN
    DECLARE @DirectoryID INT;

    -- Kiểm tra hoặc thêm mới Directory
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName)
    BEGIN
        SET @DirectoryID = ISNULL((SELECT MAX(DirectoryID) + 1 FROM MENU_DIRECTORY_DISH), 1);
        INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
        VALUES (@BranchID, @DirectoryID, @DirectoryName, NULL, NULL);
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName;
    END;

    -- Kiểm tra hoặc thêm mới Dish
    IF NOT EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID)
    BEGIN
        INSERT INTO DISH (DishID, DishName, Price) VALUES (@DishID, @DishName, @Price);
    END;

    -- Thêm món vào MENU_DIRECTORY_DISH nếu chưa tồn tại
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY_DISH WHERE BranchID = @BranchID AND DirectoryID = @DirectoryID AND DishID = @DishID)
    BEGIN
        INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
        VALUES (@BranchID, @DirectoryID, @DirectoryName, @DishID, @StatusDish);
    END;
END;
GO

-- Stored Procedure: DeleteDish
CREATE OR ALTER PROCEDURE DeleteDish
    @DishID INT
AS
BEGIN
    -- Xóa liên kết món ăn từ MENU_DIRECTORY_DISH
    DELETE FROM MENU_DIRECTORY_DISH WHERE DishID = @DishID;

    -- Xóa món ăn từ bảng DISH
    DELETE FROM DISH WHERE DishID = @DishID;
END;
GO
CREATE OR ALTER PROCEDURE AddNewDish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishID INT,
    @DishName NVARCHAR(255),
    @Price INT,
    @StatusDish NVARCHAR(10) -- Trạng thái món (YES/NO)
AS
BEGIN
    DECLARE @DirectoryID INT;

    -- Kiểm tra hoặc thêm mới Directory
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName)
    BEGIN
        SET @DirectoryID = ISNULL((SELECT MAX(DirectoryID) + 1 FROM MENU_DIRECTORY_DISH), 1);
        INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
        VALUES (@BranchID, @DirectoryID, @DirectoryName, NULL, NULL);
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName;
    END;

    -- Kiểm tra hoặc thêm mới Dish
    IF NOT EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID)
    BEGIN
        INSERT INTO DISH (DishID, DishName, Price) VALUES (@DishID, @DishName, @Price);
    END;

    -- Thêm món vào MENU_DIRECTORY_DISH nếu chưa tồn tại
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY_DISH WHERE BranchID = @BranchID AND DirectoryID = @DirectoryID AND DishID = @DishID)
    BEGIN
        INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
        VALUES (@BranchID, @DirectoryID, @DirectoryName, @DishID, @StatusDish);
    END;
END;
GO

-- Stored Procedure: DeleteDish
CREATE OR ALTER PROCEDURE DeleteDish
    @DishID INT
AS
BEGIN
    -- Xóa liên kết món ăn từ MENU_DIRECTORY_DISH
    DELETE FROM MENU_DIRECTORY_DISH WHERE DishID = @DishID;

    -- Xóa món ăn từ bảng DISH
    DELETE FROM DISH WHERE DishID = @DishID;
END;
GO

-- Stored Procedure: Update_Dish
CREATE OR ALTER PROCEDURE Update_Dish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishID INT,
    @NewDishName NVARCHAR(255),
    @NewPrice INT,
    @NewStatusDish NVARCHAR(10)
AS
BEGIN
    -- Kiểm tra và cập nhật thông tin món ăn
    IF EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID)
    BEGIN
        UPDATE DISH SET DishName = @NewDishName, Price = @NewPrice WHERE DishID = @DishID;
    END
    ELSE
    BEGIN
        PRINT 'Dish not found!';
        RETURN;
    END;

    -- Kiểm tra hoặc thêm mới Directory
    DECLARE @DirectoryID INT;
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName)
    BEGIN
        SET @DirectoryID = ISNULL((SELECT MAX(DirectoryID) + 1 FROM MENU_DIRECTORY_DISH), 1);
        INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
        VALUES (@BranchID, @DirectoryID, @DirectoryName, NULL, NULL);
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName;
    END;

    -- Cập nhật liên kết món ăn
    DELETE FROM MENU_DIRECTORY_DISH WHERE DishID = @DishID AND BranchID = @BranchID;
    INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
    VALUES (@BranchID, @DirectoryID, @DirectoryName, @DishID, @NewStatusDish);
END;
GO

-- Stored Procedure: Update_Dish
CREATE OR ALTER PROCEDURE Update_Dish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishID INT,
    @NewDishName NVARCHAR(255),
    @NewPrice INT,
    @NewStatusDish NVARCHAR(10)
AS
BEGIN
    -- Kiểm tra và cập nhật thông tin món ăn
    IF EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID)
    BEGIN
        UPDATE DISH SET DishName = @NewDishName, Price = @NewPrice WHERE DishID = @DishID;
    END
    ELSE
    BEGIN
        PRINT 'Dish not found!';
        RETURN;
    END;

    -- Kiểm tra hoặc thêm mới Directory
    DECLARE @DirectoryID INT;
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName)
    BEGIN
        SET @DirectoryID = ISNULL((SELECT MAX(DirectoryID) + 1 FROM MENU_DIRECTORY_DISH), 1);
        INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
        VALUES (@BranchID, @DirectoryID, @DirectoryName, NULL, NULL);
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID FROM MENU_DIRECTORY_DISH WHERE DirectoryName = @DirectoryName;
    END;

    -- Cập nhật liên kết món ăn
    DELETE FROM MENU_DIRECTORY_DISH WHERE DishID = @DishID AND BranchID = @BranchID;
    INSERT INTO MENU_DIRECTORY_DISH (BranchID, DirectoryID, DirectoryName, DishID, StatusDish)
    VALUES (@BranchID, @DirectoryID, @DirectoryName, @DishID, @NewStatusDish);
END;
GO


CREATE OR ALTER PROCEDURE GetInfoForInvoice
CREATE OR ALTER PROCEDURE GetInfoForInvoice
	@ORDERID INT
AS
BEGIN
	SELECT OD.CARDID, SUM(D.PRICE * ODA.AMOUNTDISH) AS TOTALMONEY FROM ORDER_DIRECTORY OD JOIN ORDER_DISH_AMOUNT ODA
	ON OD.OrderID = ODA.OrderID JOIN DISH D 
	ON ODA.DishID = D.DishID
	WHERE OD.OrderID = @ORDERID
	GROUP BY OD.CARDID
END
GO

CREATE OR ALTER PROCEDURE GetInvoiceUnpaidByBranchID
CREATE OR ALTER PROCEDURE GetInvoiceUnpaidByBranchID
	@BranchID INT
AS
BEGIN
	SELECT  I.INVOICEID, C.CustomerName, I.DiscountMoney, I.TotalMoney
	FROM INVOICE I JOIN ORDER_DIRECTORY OD 
	ON I.ORDERID = OD.ORDERID JOIN CUSTOMER C
	ON I.CARDID = C.CARDID 
	WHERE OD.BranchID = @BranchID AND I.PaymentDate IS NULL
END 
GO

CREATE OR ALTER PROCEDURE GetInvoiceDetail
CREATE OR ALTER PROCEDURE GetInvoiceDetail
	@INVOICEID INT
AS
BEGIN
	SELECT I.INVOICEID, I.PaymentDate, C.CustomerName, C.CustomerEmail, I.TotalMoney, I.DiscountMoney,
	D.DishName, ODA.AmountDish AS QUANTITY, SUM(D.PRICE * ODA.AmountDish) AS AMOUNT
	FROM INVOICE I JOIN ORDER_DIRECTORY OD 
	ON I.ORDERID = OD.ORDERID JOIN CUSTOMER C
	ON OD.CardID = C.CardID JOIN ORDER_DISH_AMOUNT ODA
	ON OD.OrderID = ODA.OrderID JOIN DISH D
	ON ODA.DishID = D.DishID
	WHERE 
        I.INVOICEID = @INVOICEID 
    GROUP BY 
        I.INVOICEID, 
        I.PaymentDate, 
        C.CustomerName, 
        C.CustomerEmail, 
        I.TotalMoney, 
        I.DiscountMoney,
        D.DishName,
		ODA.AmountDish
END
GO

--EXEC GetInvoiceDetail 1
--EXEC GetInvoiceDetail 1
--===============================================================================================================================

----------------------REVENUE PROC----------------------------------------------------------------------------------------------
CREATE OR ALTER PROCEDURE InsertRevenueByDate
CREATE OR ALTER PROCEDURE InsertRevenueByDate
AS
BEGIN
    INSERT INTO RevenueByDate (RevenueDate, TotalRevenue)
    SELECT 
        PaymentDate AS RevenueDate, 
        SUM(TotalMoney - DiscountMoney) AS TotalRevenue
    FROM 
        INVOICE
    GROUP BY 
        PaymentDate;
END;
GO

CREATE OR ALTER PROCEDURE InsertRevenueByMonth
CREATE OR ALTER PROCEDURE InsertRevenueByMonth
AS
BEGIN
    INSERT INTO RevenueByMonth (RevenueMonth, RevenueYear, TotalRevenue)
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

GO
CREATE OR ALTER PROCEDURE InsertRevenueByQuarter
CREATE OR ALTER PROCEDURE InsertRevenueByQuarter
AS
BEGIN
    INSERT INTO RevenueByQuarter (RevenueQuarter, RevenueYear, TotalRevenue)
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

CREATE OR ALTER PROCEDURE InsertRevenueByYear
CREATE OR ALTER PROCEDURE InsertRevenueByYear
AS
BEGIN
    INSERT INTO RevenueByYear (RevenueYear, TotalRevenue)
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

-- Procedure to calculate revenue by day
CREATE OR ALTER PROCEDURE CalRevenueByDay (@InputDate DATE)
CREATE OR ALTER PROCEDURE CalRevenueByDay (@InputDate DATE)
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
CREATE OR ALTER PROCEDURE CalRevenueByMonth (@InputMonth INT, @InputYear INT)
CREATE OR ALTER PROCEDURE CalRevenueByMonth (@InputMonth INT, @InputYear INT)
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
CREATE OR ALTER PROCEDURE CalRevenueByQuarter (@InputQuarter INT, @InputYear INT)
CREATE OR ALTER PROCEDURE CalRevenueByQuarter (@InputQuarter INT, @InputYear INT)
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
CREATE OR ALTER PROCEDURE CalRevenueByYear (@InputYear INT)
CREATE OR ALTER PROCEDURE CalRevenueByYear (@InputYear INT)
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

--reportOverviewByDate
CREATE OR ALTER PROCEDURE GetRevenueOverviewByDate
CREATE OR ALTER PROCEDURE GetRevenueOverviewByDate
    @PayDate DATE
AS
BEGIN
    -- Tắt chế độ thông báo số hàng bị ảnh hưởng
    SET NOCOUNT ON;

    SELECT 
        rbd.RevenueDate AS PayDate,
        rbd.TotalRevenue AS TotalRevenue,
        b.BranchName AS BranchName
    FROM 
        RevenueByDate rbd
    INNER JOIN 
        BRANCH b ON rbd.BranchID = b.BranchID
    WHERE 
        rbd.RevenueDate = @PayDate;
END;
GO

--EXEC GetRevenueOverviewByDate @PayDate = '2024-12-25';

--GO
--reportDetailByDate
CREATE OR ALTER PROCEDURE GetReportDetailByDate
CREATE OR ALTER PROCEDURE GetReportDetailByDate
    @PayDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng quan: Tổng doanh thu và tên chi nhánh
    SELECT 
        b.BranchName AS BranchName,
        CONVERT(VARCHAR, rbd.RevenueDate, 105) AS Date,
        SUM(rbd.TotalRevenue) AS TotalRevenue
    FROM 
        RevenueByDate rbd
    INNER JOIN 
        BRANCH b ON rbd.BranchID = b.BranchID
    WHERE 
        rbd.RevenueDate = @PayDate
    GROUP BY 
        b.BranchName, rbd.RevenueDate;

    -- Truy vấn chi tiết các món ăn
    SELECT 
        d.DishName AS DishName,
        dr.Revenue AS Revenue
    FROM 
        DISHREVENUE dr
    INNER JOIN 
        DISH d ON dr.DishID = d.DishID
    WHERE 
        dr.PayDate = @PayDate;
END;
GO

--EXEC GetReportDetailByDate @PayDate = '2024-12-25';

GO

--reportOverviewByMonth
CREATE OR ALTER PROCEDURE GetReportOverviewByMonth
CREATE OR ALTER PROCEDURE GetReportOverviewByMonth
    @Month INT,
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng doanh thu theo tháng và năm
    SELECT 
        RevenueMonth AS Month,
        RevenueYear AS Year,
        SUM(TotalRevenue) AS TotalRevenue
    FROM 
        RevenueByMonth
    WHERE 
        RevenueMonth = @Month AND RevenueYear = @Year
    GROUP BY 
        RevenueMonth, RevenueYear;
END;
GO
--EXEC GetReportOverviewByMonth @Month = 12, @Year = 2024;
GO

--reportDetailByMonth
CREATE OR ALTER PROCEDURE GetReportDetailByMonth
CREATE OR ALTER PROCEDURE GetReportDetailByMonth
    @Month INT,
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng doanh thu và tên chi nhánh
    SELECT 
        b.BranchName AS BranchName,
        SUM(rbm.TotalRevenue) AS TotalRevenue,
        @Month AS Month,
        @Year AS Year
    FROM 
        RevenueByMonth rbm
    INNER JOIN 
        BRANCH b ON rbm.BranchID = b.BranchID
    WHERE 
        rbm.RevenueMonth = @Month AND rbm.RevenueYear = @Year
    GROUP BY 
        b.BranchName;

    -- Truy vấn chi tiết doanh thu theo món ăn
    SELECT 
        d.DishName AS DishName,
        SUM(dr.Revenue) AS Revenue
    FROM 
        DISHREVENUE dr
    INNER JOIN 
        DISH d ON dr.DishID = d.DishID
    INNER JOIN 
        BRANCH b ON dr.BranchID = b.BranchID
    WHERE 
        MONTH(dr.PayDate) = @Month AND YEAR(dr.PayDate) = @Year
    GROUP BY 
        d.DishName;
END;
GO
--EXEC GetReportDetailByMonth @Month = 12, @Year = 2024;
GO

--reportOverviewByQuarter
CREATE OR ALTER PROCEDURE GetReportOverviewByQuarter
CREATE OR ALTER PROCEDURE GetReportOverviewByQuarter
    @Quarter INT,
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng doanh thu theo quý và năm
    SELECT 
        RevenueQuarter AS NumberOfQuarter,
        RevenueYear AS Year,
        SUM(TotalRevenue) AS TotalRevenue
    FROM 
        RevenueByQuarter
    WHERE 
        RevenueQuarter = @Quarter AND RevenueYear = @Year
    GROUP BY 
        RevenueQuarter, RevenueYear;
END;
GO
--EXEC GetReportOverviewByQuarter @Quarter = 4, @Year = 2024;
--GO

--reportDetailByQuarter

CREATE OR ALTER PROCEDURE GetReportDetailByQuarter
CREATE OR ALTER PROCEDURE GetReportDetailByQuarter
    @Quarter INT,
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng doanh thu và tên chi nhánh
    SELECT 
        b.BranchName AS BranchName,
        SUM(rbq.TotalRevenue) AS TotalRevenue,
        @Quarter AS NumberOfQuarter,
        @Year AS Year
    FROM 
        RevenueByQuarter rbq
    INNER JOIN 
        BRANCH b ON rbq.BranchID = b.BranchID
    WHERE 
        rbq.RevenueQuarter = @Quarter AND rbq.RevenueYear = @Year
    GROUP BY 
        b.BranchName;

    -- Truy vấn chi tiết doanh thu theo món ăn
    SELECT 
        d.DishName AS DishName,
        SUM(dr.Revenue) AS Revenue
    FROM 
        DISHREVENUE dr
    INNER JOIN 
        DISH d ON dr.DishID = d.DishID
    INNER JOIN 
        BRANCH b ON dr.BranchID = b.BranchID
    WHERE 
        DATEPART(QUARTER, dr.PayDate) = @Quarter AND YEAR(dr.PayDate) = @Year
    GROUP BY 
        d.DishName;
END;
GO
--EXEC GetReportDetailByQuarter @Quarter = 4, @Year = 2024;
--GO

--reportOverviewByYear
CREATE OR ALTER PROCEDURE GetReportOverviewByYear
CREATE OR ALTER PROCEDURE GetReportOverviewByYear
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng doanh thu theo năm
    SELECT 
        RevenueYear AS Year,
        SUM(TotalRevenue) AS TotalRevenue
    FROM 
        RevenueByYear
    WHERE 
        RevenueYear = @Year
    GROUP BY 
        RevenueYear;
END;
GO
--EXEC GetReportOverviewByYear @Year = 2024;
--GO
--reportDetailByYear
CREATE OR ALTER PROCEDURE GetReportDetailByYear
CREATE OR ALTER PROCEDURE GetReportDetailByYear
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Truy vấn tổng doanh thu và tên chi nhánh
    SELECT 
        b.BranchName AS BranchName,
        SUM(rby.TotalRevenue) AS TotalRevenue,
        @Year AS Year
    FROM 
        RevenueByYear rby
    INNER JOIN 
        BRANCH b ON rby.BranchID = b.BranchID
    WHERE 
        rby.RevenueYear = @Year
    GROUP BY 
        b.BranchName;

    -- Truy vấn chi tiết doanh thu theo món ăn
    SELECT 
        d.DishName AS DishName,
        SUM(dr.Revenue) AS Revenue
    FROM 
        DISHREVENUE dr
    INNER JOIN 
        DISH d ON dr.DishID = d.DishID
    INNER JOIN 
        BRANCH b ON dr.BranchID = b.BranchID
    WHERE 
        YEAR(dr.PayDate) = @Year
    GROUP BY 
        d.DishName;
END;
GO
--EXEC GetReportDetailByYear @Year = 2024;

-- ADD ORDER DISH
CREATE OR ALTER PROCEDURE PlaceOnlineOrder
CREATE OR ALTER PROCEDURE PlaceOnlineOrder
    @BranchID INT,
    @DishNames NVARCHAR(MAX),
    @DishAmounts NVARCHAR(MAX),
    @AmountCustomer INT = NULL,
    @DateOrder DATE = NULL,
    @TimeOrder TIME = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Tự động sinh OrderID
        DECLARE @OrderID INT;
        SELECT @OrderID = ISNULL(MAX(OrderID), 0) + 1 FROM ORDER_DIRECTORY;

        -- Kiểm tra sự tồn tại của BranchID
        IF NOT EXISTS (SELECT 1 FROM BRANCH WHERE BranchID = @BranchID)
            THROW 50001, N'Chi nhánh không tồn tại.', 1;

        -- Thêm thông tin vào bảng ORDER_DIRECTORY
        INSERT INTO ORDER_DIRECTORY (OrderID, BranchID, EmployeeID, NumberTable, CardID)
        VALUES (@OrderID, @BranchID, NULL, NULL, NULL); -- Các trường khác để NULL

        -- Thêm thông tin vào bảng ONLINE_ORDER
        INSERT INTO ORDER_ONLINE (OnOrderID, DateOrder, TimeOrder, AmountCustomer)
        VALUES (@OrderID, @DateOrder, @TimeOrder, @AmountCustomer);

        -- Xử lý danh sách món ăn và số lượng
        DECLARE @DishName NVARCHAR(255);
        DECLARE @DishAmount INT;
        DECLARE @DishID INT;

        -- Tách danh sách món ăn và số lượng
        DECLARE @DishNameTable TABLE (ID INT IDENTITY(1,1), DishName NVARCHAR(255));
        DECLARE @DishAmountTable TABLE (ID INT IDENTITY(1,1), DishAmount INT);

        INSERT INTO @DishNameTable (DishName)
        SELECT TRIM(VALUE) AS DishName FROM STRING_SPLIT(@DishNames, ',');

        INSERT INTO @DishAmountTable (DishAmount)
        SELECT CAST(VALUE AS INT) AS DishAmount FROM STRING_SPLIT(@DishAmounts, ',');

        -- Kiểm tra số lượng món ăn và số lượng tương ứng
        IF (SELECT COUNT(*) FROM @DishNameTable) != (SELECT COUNT(*) FROM @DishAmountTable)
            THROW 50002, N'Mismatch between dish names and amounts.', 1;

        -- Lặp qua từng món ăn để thêm vào ORDER_DISH_AMOUNT
        DECLARE @RowCount INT = (SELECT COUNT(*) FROM @DishNameTable);
        DECLARE @Index INT = 1;

        WHILE @Index <= @RowCount
        BEGIN
            SELECT @DishName = DishName FROM @DishNameTable WHERE ID = @Index;
            SELECT @DishAmount = DishAmount FROM @DishAmountTable WHERE ID = @Index;

            -- Lấy DishID từ DishName
            SELECT @DishID = DishID FROM DISH WHERE LTRIM(RTRIM(DishName)) = LTRIM(RTRIM(@DishName));

            -- Kiểm tra nếu món ăn không tồn tại
            IF @DishID IS NULL
                THROW 50003, N'Món ăn không tồn tại hoặc tên không khớp.', 1;

            -- Thêm thông tin vào ORDER_DISH_AMOUNT
            INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
            VALUES (@OrderID, @DishID, @DishAmount);

            SET @Index = @Index + 1;
        END;

        -- Cam kết giao dịch
        COMMIT TRANSACTION;
        PRINT N'Đặt đơn hàng thành công!';
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        ROLLBACK TRANSACTION;
        PRINT N'Đã xảy ra lỗi khi đặt đơn hàng: ' + ERROR_MESSAGE();
        THROW;
    END CATCH
END;
GO
