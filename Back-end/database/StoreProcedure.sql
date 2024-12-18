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
---------------------------------------------------------------------------------
-- GET DATA FROM OrderDirectory, OrderOnline, Dish, OrderDishAmount
CREATE PROCEDURE GetOrderOnline
AS
BEGIN
    -- Truy vấn dữ liệu từ các bảng OrderDirectory, OrderOnline, Dish và OrderDishAmount
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
    ORDER BY OO.DateOrder, OO.TimeOrder; -- Sắp xếp theo ngày và giờ đặt hàng
END;
GO
EXEC GetOrderOnline;

-- POST ORDER ONLINE
CREATE PROCEDURE AddNewOrder10
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
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION 
        
        -- Bước 1: Kiểm tra nếu OrderID đã tồn tại
        IF EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
        BEGIN
            THROW 50010, 'Mã đơn hàng đã tồn tại trong hệ thống.', 1;
        END
        
        -- Bước 2: Kiểm tra sự tồn tại của BranchID trong bảng BRANCH
        IF NOT EXISTS (SELECT 1 FROM BRANCH WHERE BranchID = @BranchID)
        BEGIN
            THROW 50011, 'Chi nhánh không tồn tại trong hệ thống.', 1;
        END

        -- Bước 3: Kiểm tra sự tồn tại của EmployeeID trong bảng EMPLOYEE
        IF NOT EXISTS (SELECT 1 FROM EMPLOYEE WHERE EmployeeID = @EmployeeID)
        BEGIN
            THROW 50012, 'Nhân viên không tồn tại trong hệ thống.', 1;
        END

        -- Bước 4: Kiểm tra sự tồn tại của CardID trong bảng CARD_CUSTOMER
        IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
        BEGIN
            THROW 50013, 'Khách hàng không tồn tại trong hệ thống.', 1;
        END
        
        -- Bước 5: Kiểm tra giá trị của AmountCustomer và AmountDish
        IF @AmountCustomer <= 0
        BEGIN
            THROW 50014, 'Số lượng khách phải lớn hơn 0.', 1;
        END

        IF @AmountDish <= 0
        BEGIN
            THROW 50015, 'Số lượng món ăn phải lớn hơn 0.', 1;
        END

        -- Bước 6: Lấy DishID từ tên món ăn
        DECLARE @DishID INT;
        SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;

        -- Kiểm tra nếu món ăn không tồn tại trong bảng DISH
        IF @DishID IS NULL
        BEGIN
            THROW 50016, 'Món ăn không tồn tại trong hệ thống.', 1;
        END

        -- Bước 7: Thêm thông tin vào bảng ORDER_DIRECTORY (Thêm CardID)
        INSERT INTO ORDER_DIRECTORY (OrderID, EmployeeID, NumberTable, CardID)
        VALUES (@OrderID, @EmployeeID, @NumberTable, @CardID);

        -- Bước 8: Thêm thông tin vào bảng ORDER_ONLINE
        INSERT INTO ORDER_ONLINE (OnOrderID, BranchID, DateOrder, TimeOrder, AmountCustomer)
        VALUES (@OrderID, @BranchID, @DateOrder, @TimeOrder, @AmountCustomer);

        -- Bước 9: Thêm thông tin vào bảng ORDER_DISH_AMOUNT
        INSERT INTO ORDER_DISH_AMOUNT (OrderID, DishID, AmountDish)
        VALUES (@OrderID, @DishID, @AmountDish);

        -- Thông báo thành công
        PRINT 'Thêm đơn hàng thành công!';
        
        -- Cam kết giao dịch
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        PRINT 'Đã xảy ra lỗi khi thêm đơn hàng: ' + ERROR_MESSAGE();
        ROLLBACK TRANSACTION;  -- rollback nếu có lỗi
    END CATCH
END


EXEC AddNewOrder10
    @OrderID = 12, 
    @BranchID = 1, 
    @EmployeeID = 1, 
    @NumberTable = 5, 
	@CardID = 2,
    @AmountCustomer = 3, 
    @DishName = 'Món Sushi Cá Hồi', 
    @AmountDish = 2,
    @DateOrder = '2024-11-30',
    @TimeOrder = '19:30';

--DELETE ORDER ONLINE
CREATE PROCEDURE DeleteOrder
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

    -- Xóa thông tin từ ORDER_ONLINE (đơn hàng online)
    DELETE FROM ORDER_ONLINE WHERE OnOrderID = @OrderID;

    -- Xóa thông tin từ ORDER_DIRECTORY (đơn hàng chính)
    DELETE FROM ORDER_DIRECTORY WHERE OrderID = @OrderID;

    PRINT 'Đơn hàng đã được xóa thành công!';
END;

EXEC DeleteOrder @OrderID = 11;

-- PUT ORDER ONLINE
CREATE PROCEDURE UpdateOrder
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
    -- Bắt đầu giao dịch để đảm bảo tính toàn vẹn dữ liệu
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Kiểm tra sự tồn tại của BranchID trong bảng Branch
        IF NOT EXISTS (SELECT 1 FROM Branch WHERE BranchID = @BranchID)
        BEGIN
            THROW 50001, 'Chi nhánh không tồn tại!', 1;
        END

        -- Kiểm tra sự tồn tại của EmployeeID trong bảng Employee
        IF NOT EXISTS (SELECT 1 FROM Employee WHERE EmployeeID = @EmployeeID)
        BEGIN
            THROW 50002, 'Nhân viên không tồn tại!', 1;
        END

		-- Kiểm tra sự tồn tại của CardID trong bảng CARD_CUSTOMER
        IF NOT EXISTS (SELECT 1 FROM CARD_CUSTOMER WHERE CardID = @CardID)
        BEGIN
            THROW 50003, 'Khách hàng không tồn tại trong hệ thống.', 1;
        END

		-- Kiểm tra sự tồn tại của OrderID trong ORDER_DIRECTORY
        IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
        BEGIN
            THROW 50004, 'Đơn hàng không tồn tại!', 1;
        END

        -- Kiểm tra sự tồn tại của OnOrderID trong ORDER_ONLINE
        IF NOT EXISTS (SELECT 1 FROM ORDER_ONLINE WHERE OnOrderID = @OrderID)
        BEGIN
            THROW 50005, 'Đơn hàng online không tồn tại!', 1;
        END

        -- Cập nhật thông tin đơn hàng trong bảng ORDER_ONLINE
        UPDATE ORDER_ONLINE
        SET 
            BranchID = @BranchID,
            AmountCustomer = @AmountCustomer,
            DateOrder = @DateOrder,
            TimeOrder = @TimeOrder
        WHERE OnOrderID = @OrderID;

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
            THROW 50006, 'Món ăn không tồn tại!', 1;
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

EXEC UpdateOrder
    @OrderID = 56, 
    @BranchID = 2, 
    @EmployeeID = 1, 
    @NumberTable = 6, 
    @AmountCustomer = 7,
	@CardID = 1,
    @DishName = 'Món Sushi Cá Hồi', 
    @AmountDish = 14,
    @DateOrder = '2024-11-30',
    @TimeOrder = '19:30';

EXEC GetOrderOnline
===============================================================================================================
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
EXEC GetOrderOffline

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
END

EXEC AddNewOfflineOrder
    @OrderID = 41,  
    @EmployeeID = 1, 
    @NumberTable = 5, 
	@CardID = 2,
    @DishName = 'Món Sushi Cá Hồi', 
    @AmountDish = 10,
    @OrderEstablishDate = '2024-11-30'


-- DELETE ORDER OFFLINE
CREATE PROCEDURE DeleteOrderOffline
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
EXEC DeleteOrderOffline @OrderID = 41;

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

EXEC UpdateOrderOffline
    @OrderID = 19, 
    @EmployeeID = 1, 
    @NumberTable = 5, 
	@CardID =1,
    @DishName = 'Món Sushi Cá Hồi', 
    @AmountDish = 100,
    @OrderEstablishDate = '2024-11-27'

