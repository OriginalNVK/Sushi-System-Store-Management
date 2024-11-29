USE SUSHISTORE_MANAGEMENT
GO

--Them nhan vien
CREATE PROC New_Employee
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
    INSERT INTO EMPLOYEE (
        EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, 
        DepartmentID, BranchID, EmployeeAddress, EmployeePhone
    )
    VALUES (
        @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, 
        @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone
    );
END;
GO

--Cap nhat thong tin nhan vien
CREATE PROCEDURE Update_Employee
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
CREATE PROCEDURE Delete_Employee
    @EmployeeID INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM EMPLOYEE WHERE EmployeeID = @EmployeeID)
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
CREATE PROCEDURE AddNewDish
    @BranchID INT,
    @DirectoryName NVARCHAR(255),
    @DishName NVARCHAR(255),
    @Price INT
AS
BEGIN
    DECLARE @DirectoryID INT;
    IF NOT EXISTS (SELECT 1 FROM DIRECTORY WHERE DirectoryName = @DirectoryName)
    BEGIN
        INSERT INTO DIRECTORY (DirectoryName) VALUES (@DirectoryName);
        SET @DirectoryID = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID FROM DIRECTORY WHERE DirectoryName = @DirectoryName;
    END
    DECLARE @DishID INT;
    IF NOT EXISTS (SELECT 1 FROM DISH WHERE DishName = @DishName)
    BEGIN
        INSERT INTO DISH (DishName, Price)
        VALUES (@DishName, @Price);
        SET @DishID = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        SELECT @DishID = DishID FROM DISH WHERE DishName = @DishName;
    END
    IF NOT EXISTS (SELECT 1 FROM DIRECTORY_DISH WHERE DirectoryID = @DirectoryID AND DishID = @DishID)
    BEGIN
        INSERT INTO DIRECTORY_DISH (DirectoryID, DishID)
        VALUES (@DirectoryID, @DishID);
    END
    IF NOT EXISTS (SELECT 1 FROM MENU_DIRECTORY WHERE BranchID = @BranchID AND DirectoryID = @DirectoryID)
    BEGIN
        INSERT INTO MENU_DIRECTORY (BranchID, DirectoryID)
        VALUES (@BranchID, @DirectoryID);
    END
END;
GO

--Xoa mon an
CREATE PROCEDURE DeleteDish
    @DishID INT
AS
BEGIN
    DELETE FROM DISH WHERE DishID = @DishID;
END;
GO

--Cap nhat mon
CREATE PROCEDURE Update_Dish
    @DishID INT,                  -- ID c?a món c?n c?p nh?t
    @NewDishName NVARCHAR(255),   -- Tên món m?i
    @NewPrice INT,                -- Giá m?i
    @BranchID INT,                -- Chi nhánh m?i
    @DirectoryName NVARCHAR(255)  -- Tên m?c m?i
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Ki?m tra món ?n có t?n t?i hay không
        IF NOT EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID)
        BEGIN
            PRINT 'Dish not found!';
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- C?p nh?t thông tin món ?n trong b?ng DISH
        UPDATE DISH
        SET DishName = @NewDishName, Price = @NewPrice
        WHERE DishID = @DishID;

        -- Ki?m tra Directory có t?n t?i trong Branch không
        DECLARE @DirectoryID INT;
        SELECT @DirectoryID = MD.DirectoryID
        FROM MENU_DIRECTORY MD
        INNER JOIN DIRECTORY D ON MD.DirectoryID = D.DirectoryID
        WHERE MD.BranchID = @BranchID AND D.DirectoryName = @DirectoryName;

        IF @DirectoryID IS NULL
        BEGIN
            -- Thêm m?c m?i n?u ch?a t?n t?i
            INSERT INTO DIRECTORY (DirectoryName)
            VALUES (@DirectoryName);

            SET @DirectoryID = SCOPE_IDENTITY();

            -- Liên k?t m?c m?i v?i chi nhánh
            INSERT INTO MENU_DIRECTORY (BranchID, DirectoryID)
            VALUES (@BranchID, @DirectoryID);
        END

        -- C?p nh?t m?i liên k?t món ?n v?i m?c m?i trong DIRECTORY_DISH
        DELETE FROM DIRECTORY_DISH WHERE DishID = @DishID;

        INSERT INTO DIRECTORY_DISH (DirectoryID, DishID)
        VALUES (@DirectoryID, @DishID);

        COMMIT TRANSACTION;
        PRINT 'Dish updated successfully.';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Error occurred while updating dish.';
    END CATCH
END;
GO


