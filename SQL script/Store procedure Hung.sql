USE SUSHISTORE_MANAGEMENT
GO

select* from EMPLOYEE 
select* from DISH
select* from DIRECTORY_DISH
--Them nhan vien
CREATE PROC New_Employee
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
    INSERT INTO EMPLOYEE (
        EmployeeID,EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, 
        DepartmentID, BranchID, EmployeeAddress, EmployeePhone
    )
    VALUES (
        @EmployeeID,@EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, 
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
    @DishID INT, -- Thêm DishID vào tham số đầu vào
    @DishName NVARCHAR(255),
    @Price INT
AS
BEGIN
    DECLARE @DirectoryID INT;
    -- Kiểm tra nếu Directory không tồn tại, nếu không tồn tại thì thêm mới và lấy DirectoryID
    IF NOT EXISTS (SELECT 1 FROM DIRECTORY WHERE DirectoryName = @DirectoryName)
    BEGIN
        INSERT INTO DIRECTORY (DirectoryName) VALUES (@DirectoryName);
        SET @DirectoryID = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        SELECT @DirectoryID = DirectoryID FROM DIRECTORY WHERE DirectoryName = @DirectoryName;
    END

    -- Kiểm tra nếu Dish không tồn tại, nếu không thì thêm mới và lấy DishID
    DECLARE @NewDishID INT;
    IF NOT EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID) -- Kiểm tra DishID
    BEGIN
        INSERT INTO DISH (DishID, DishName, Price)
        VALUES (@DishID, @DishName, @Price);  -- Chèn Dish với DishID
        SET @NewDishID = @DishID;  -- Đặt DishID mới
    END
    ELSE
    BEGIN
        SELECT @NewDishID = DishID FROM DISH WHERE DishID = @DishID;
    END

    -- Thêm vào DIRECTORY_DISH nếu chưa tồn tại mối quan hệ giữa Directory và Dish
    IF NOT EXISTS (SELECT 1 FROM DIRECTORY_DISH WHERE DirectoryID = @DirectoryID AND DishID = @NewDishID)
    BEGIN
        INSERT INTO DIRECTORY_DISH (DirectoryID, DishID)
        VALUES (@DirectoryID, @NewDishID);
    END

    -- Thêm vào MENU_DIRECTORY nếu chưa tồn tại mối quan hệ giữa Branch và Directory
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
	@BranchID INT,
	@DirectoryName NVARCHAR(255),
    @DishID INT,                  -- ID của món cần cập nhật
    @NewDishName NVARCHAR(255),   -- Tên món mới
    @NewPrice INT              -- Giá mới
AS
BEGIN
    -- Kiểm tra món ăn có tồn tại hay không
    IF NOT EXISTS (SELECT 1 FROM DISH WHERE DishID = @DishID)
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
        INSERT INTO DIRECTORY (DirectoryName)
        VALUES (@DirectoryName);

        SET @DirectoryID = SCOPE_IDENTITY();

        -- Liên kết mục mới với chi nhánh
        INSERT INTO MENU_DIRECTORY (BranchID, DirectoryID)
        VALUES (@BranchID, @DirectoryID);
    END

    -- Cập nhật mối liên kết món ăn với mục mới trong DIRECTORY_DISH
    DELETE FROM DIRECTORY_DISH WHERE DishID = @DishID;

    INSERT INTO DIRECTORY_DISH (DirectoryID, DishID)
    VALUES (@DirectoryID, @DishID);

    PRINT 'Dish updated successfully.';
END;
GO



