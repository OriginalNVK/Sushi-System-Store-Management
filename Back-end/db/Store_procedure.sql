USE SUSHISTORE_MANAGEMENT1
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
        IF EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
        BEGIN
			THROW 50010, 'OrderID already exists in the system.', 1;
        END

        -- Validate BranchID
        IF NOT EXISTS (SELECT 1 FROM BRANCH WHERE BranchID = @BranchID)
        BEGIN
            THROW 50011, 'Branch does not exist.', 1;
        END

        -- Validate EmployeeID
        IF NOT EXISTS (SELECT 1 FROM EMPLOYEE WHERE EmployeeID = @EmployeeID)
        BEGIN
            THROW 50012, 'Employee does not exist.', 1;
        END

        -- Validate CardID
        IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
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
        SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;

        IF @DishID IS NULL
        BEGIN
            THROW 50016, 'Dish does not exist in the system.', 1;
        END

        -- Insert into ORDER_DIRECTORY
        INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
        VALUES (@OrderID, @EmployeeID, @NumberTable, @CardID);

        -- Insert into ORDER_ONLINE
        INSERT INTO ORDER_ONLINE (OnOrderID, BranchID, DateOrder, TimeOrder, AmountCustomer)
        VALUES (@OrderID, @BranchID, @DateOrder, @TimeOrder, @AmountCustomer);

        -- Insert into ORDER_DISH_AMOUNT
        INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
        VALUES (@OrderID, @DishID, @AmountDish);

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
        IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
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
    END TRY
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
        IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
        BEGIN
            THROW 50021, 'Order does not exist.', 1;
        END
        IF NOT EXISTS (SELECT 1 FROM BRANCH WHERE BranchID = @BranchID)
        BEGIN
            THROW 50022, 'Branch does not exist.', 1;
        END
        IF NOT EXISTS (SELECT 1 FROM EMPLOYEE WHERE EmployeeID = @EmployeeID)
        BEGIN
            THROW 50023, 'Employee does not exist.', 1;
        END
        IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
        BEGIN
            THROW 50024, 'Customer does not exist.', 1;
        END

        -- Get DishID
        DECLARE @DishID INT;
        SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;

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

        -- Kiểm tra nếu món ăn không tồn tại trong bảng DISH
        IF @DishID IS NULL
        BEGIN
            THROW 50002, 'Món ăn không tồn tại trong hệ thống.', 1;
        END

        -- Bước 5: Thêm thông tin vào bảng ORDER_OFFLINE (đơn hàng Offline)
        INSERT INTO ORDER_OFFLINE (OffOrderID, OrderEstablishDate)
        VALUES (@OrderID, @OrderEstablishDate);

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
        IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
        BEGIN
            THROW 50001, 'Đơn hàng không tồn tại!', 1;
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

