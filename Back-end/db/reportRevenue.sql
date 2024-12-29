USE SUSHISTORE_MANAGEMENT2
GO
--reportOverviewByDate
CREATE PROCEDURE GetRevenueOverviewByDate
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

EXEC GetRevenueOverviewByDate @PayDate = '2024-12-25';

GO
--reportDetailByDate
CREATE PROCEDURE GetReportDetailByDate
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

EXEC GetReportDetailByDate @PayDate = '2024-12-25';

GO

--reportOverviewByMonth
CREATE PROCEDURE GetReportOverviewByMonth
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
EXEC GetReportOverviewByMonth @Month = 12, @Year = 2024;
GO

--reportDetailByMonth
CREATE PROCEDURE GetReportDetailByMonth
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
EXEC GetReportDetailByMonth @Month = 12, @Year = 2024;
GO

--reportOverviewByQuarter
CREATE PROCEDURE GetReportOverviewByQuarter
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
EXEC GetReportOverviewByQuarter @Quarter = 4, @Year = 2024;
GO

--reportDetailByQuarter

CREATE PROCEDURE GetReportDetailByQuarter
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
EXEC GetReportDetailByQuarter @Quarter = 4, @Year = 2024;
GO

--reportOverviewByYear
CREATE PROCEDURE GetReportOverviewByYear
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
EXEC GetReportOverviewByYear @Year = 2024;
GO
--reportDetailByYear
CREATE PROCEDURE GetReportDetailByYear
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
EXEC GetReportDetailByYear @Year = 2024;


