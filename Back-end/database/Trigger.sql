USE SUSHISTORE_MANAGEMENT
GO

CREATE TRIGGER TRG_Salary_Same_Department
ON EMPLOYEE
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem có nhân viên nào trong cùng department có mức lương khác nhau không
    IF EXISTS (
        SELECT 1
        FROM EMPLOYEE e1
        JOIN EMPLOYEE e2
            ON e1.DepartmentID = e2.DepartmentID
           AND e1.Salary <> e2.Salary
    )
    BEGIN
        RAISERROR ('Employees in the same department must have the same salary.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO

CREATE TRIGGER TRG_Ensure_Manager_In_Branch
ON BRANCH
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra ManagerID có thuộc BranchID hay không
    IF EXISTS (
        SELECT 1
        FROM BRANCH b
        LEFT JOIN EMPLOYEE e
        ON b.ManagerID = e.EmployeeID
        WHERE b.ManagerID IS NOT NULL 
          AND b.BranchID <> e.BranchID
    )
    BEGIN
        RAISERROR ('The manager must be an employee of the same branch.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO
