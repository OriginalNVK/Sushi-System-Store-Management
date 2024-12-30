Use SUSHISTORE_MANAGEMENT
go

--Kich ban 1 in danh sach nv theo branch
EXEC GetEmployeesByBranchID @BranchID = 1; 
create nonclustered index INDEX_EMPLOYEE_BRANCH on EMPLOYEE(BranchID)
include (EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, EmployeeAddress, EmployeePhone)
---------------------------------------
--Kich ban 2 in ds mon an theo branch 
select mnd.DirectoryName,d.DishName, d.Price
from DISH d
join MENU_DIRECTORY_DISH mnd on mnd.DishID = d.DishID
join BRANCH b on b.BranchID = mnd.BranchID
where mnd.StatusDish = 'YES' and b.BranchID = 1
Order by mnd.DirectoryName,d.DishName, d.Price


create nonclustered index INDEX_MDD_D on MENU_DIRECTORY_DISH(BranchID,StatusDish) include(DirectoryName)
drop index INDEX_MDD_D on MENU_DIRECTORY_DISH
----------------------------------------
--Kich ban 3 Lấy ds khách hàng tới branch 
EXEC GetCustomersByBranchID @BranchID = 1
create nonclustered index INDEX_OD_BRANCH on ORDER_DIRECTORY(BranchID) include(CardID)
drop index INDEX_INVOICE_BRANCH on ORDER_DIRECTORY
-----------------------------------------
