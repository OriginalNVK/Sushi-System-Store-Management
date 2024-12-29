USE SUSHISTORE_MANAGEMENT

CREATE PROCEDURE AddNewOrder
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

GO

--thêm hóa đơn nhưng chưa thêm ngày trả tiền
CREATE PROCEDURE AddNewInvoice
    @OrderID INT,
    @TotalMoney INT,
    @DiscountMoney INT,
    @CustomerName NVARCHAR(255) -- Tên khách hàng
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION 

        -- Bước 1: Kiểm tra nếu OrderID đã tồn tại trong bảng ORDER_DIRECTORY
        IF NOT EXISTS (SELECT 1 FROM ORDER_DIRECTORY WHERE OrderID = @OrderID)
        BEGIN
            THROW 60010, 'Đơn hàng không tồn tại trong hệ thống.', 1;
        END

        -- Bước 2: Lấy thông tin liên quan từ bảng ORDER_DIRECTORY
        DECLARE @CardID INT;

        -- Lấy CardID từ ORDER_DIRECTORY
        SELECT @CardID = CardID FROM ORDER_DIRECTORY WHERE OrderID = @OrderID;

        -- Kiểm tra nếu CardID không tồn tại
        IF @CardID IS NULL
        BEGIN
            THROW 60011, 'Không tìm thấy khách hàng liên quan đến đơn hàng.', 1;
        END

        -- Bước 3: Cập nhật hoặc thêm CustomerName vào bảng CUSTOMER nếu chưa tồn tại
        IF NOT EXISTS (SELECT 1 FROM CUSTOMER WHERE CardID = @CardID)
        BEGIN
            INSERT INTO CUSTOMER (CardID, CustomerName)
            VALUES (@CardID, @CustomerName);
        END
        ELSE
        BEGIN
            UPDATE CUSTOMER
            SET CustomerName = @CustomerName
            WHERE CardID = @CardID;
        END

        -- Bước 4: Thêm thông tin vào bảng INVOICE
        INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, OrderID)
        VALUES ((SELECT ISNULL(MAX(InvoiceID), 0) + 1 FROM INVOICE), @CardID, @TotalMoney, @DiscountMoney, @OrderID);

        -- Thông báo thành công
        PRINT 'Thêm hóa đơn và cập nhật tên khách hàng thành công!';

        -- Cam kết giao dịch
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        PRINT 'Đã xảy ra lỗi khi thêm hóa đơn: ' + ERROR_MESSAGE();
        ROLLBACK TRANSACTION;  -- rollback nếu có lỗi
    END CATCH
END
GO
drop procedure AddNewInvoice
--sau đó nếu xuất hóa đơn thì cập nhật ngày trả tiền
CREATE PROCEDURE UpdatePaymentDate
    @InvoiceID INT,
    @PaymentDate DATE
AS
BEGIN
    BEGIN TRY
        -- Bắt đầu giao dịch
        BEGIN TRANSACTION;

        -- Kiểm tra nếu InvoiceID tồn tại trong bảng INVOICE
        IF NOT EXISTS (SELECT 1 FROM INVOICE WHERE InvoiceID = @InvoiceID)
        BEGIN
            THROW 70010, 'Hóa đơn không tồn tại trong hệ thống.', 1;
        END

        -- Cập nhật PaymentDate cho hóa đơn
        UPDATE INVOICE
        SET PaymentDate = @PaymentDate
        WHERE InvoiceID = @InvoiceID;

        -- Thông báo thành công
        PRINT 'Cập nhật ngày thanh toán thành công!';

        -- Cam kết giao dịch
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi nếu có
        PRINT 'Đã xảy ra lỗi khi cập nhật ngày thanh toán: ' + ERROR_MESSAGE();
        ROLLBACK TRANSACTION;  -- rollback nếu có lỗi
    END CATCH
END
GO

CREATE PROCEDURE InsertRevenueByDate
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

CREATE PROCEDURE InsertRevenueByMonth
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

CREATE PROCEDURE InsertRevenueByQuarter
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

CREATE PROCEDURE InsertRevenueByYear
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
CREATE PROCEDURE CalRevenueByDay (@InputDate DATE)
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
CREATE PROCEDURE CalRevenueByMonth (@InputMonth INT, @InputYear INT)
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
CREATE PROCEDURE CalRevenueByQuarter (@InputQuarter INT, @InputYear INT)
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
CREATE PROCEDURE CalRevenueByYear (@InputYear INT)
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

-- viết api get 
SELECT 
    ROW_NUMBER() OVER (ORDER BY i.InvoiceID) AS [No.], -- Số thứ tự
    c.CustomerName AS [Customer name],                -- Tên khách hàng
    i.DiscountMoney AS [Discount money],              -- Tiền giảm giá
    i.TotalMoney + i.DiscountMoney AS [Sub total],    -- Tổng tiền trước giảm giá
    i.TotalMoney AS [Total Money]                     -- Tổng tiền sau giảm giá
FROM 
    INVOICE i
JOIN 
    CUSTOMER c ON i.CardID = c.CardID;                -- Kết nối hóa đơn với khách hàng

GO
--viết api get 
SELECT 
    i.InvoiceID AS [Invoice Number],             -- Mã hóa đơn
    FORMAT(i.PaymentDate, 'dd-MM-yyyy') AS [Date], -- Ngày thanh toán
    c.CustomerName AS [Billed to],               -- Tên khách hàng
    c.CustomerPhone AS [Phone],                 -- Số điện thoại khách hàng
    ROW_NUMBER() OVER (PARTITION BY i.InvoiceID ORDER BY d.DishID) AS [NO], -- Số thứ tự món ăn
    d.DishName AS [Dish Name],                  -- Tên món ăn
    oda.AmountDish AS [Quantity],               -- Số lượng món ăn
    d.Price * oda.AmountDish AS [Amount],       -- Thành tiền cho mỗi món
    (SELECT SUM(d.Price * oda.AmountDish)
     FROM ORDER_DISH_AMOUNT oda
     JOIN DISH d ON oda.DishID = d.DishID
     WHERE oda.OrderID = i.OrderID) AS [Subtotal], -- Tổng tiền trước giảm giá
    i.DiscountMoney AS [Discount],              -- Số tiền giảm giá
    i.TotalMoney AS [Total]                     -- Tổng tiền sau giảm giá
FROM 
    INVOICE i
JOIN 
    CUSTOMER c ON i.CardID = c.CardID            -- Kết nối hóa đơn với khách hàng
JOIN 
    ORDER_DISH_AMOUNT oda ON i.OrderID = oda.OrderID -- Kết nối hóa đơn với món ăn trong đơn hàng
JOIN 
    DISH d ON oda.DishID = d.DishID;            -- Kết nối món ăn trong đơn hàng với bảng món ăn
