USE SUSHISTORE_MANAGEMENT
Go

select EmployeeName,EmployeeGender,EmployeeBirth,BranchName 
from EMPLOYEE e
join BRANCH b on b.BranchID = e.BranchID
where EmployeePhone Like '1%'
group by EmployeeName,EmployeeGender,EmployeeBirth,BranchName 

CREATE NONCLUSTERED INDEX IX_Employee
ON EMPLOYEE(BranchID,EmployeePhone) 
INCLUDE(EmployeeName,EmployeeGender,EmployeeBirth)

CREATE NONCLUSTERED INDEX IX_DISH_DishName 
ON DISH(DishName)
INCLUDE (Price);

DROP INDEX IX_Employee ON EMPLOYEE;