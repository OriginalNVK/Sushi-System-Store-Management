const sql = require('mssql');
const connectToDB = require('../db/dbConfig');

const getAllEmployeeByBranchID = async (BranchID) => {
    const pool = await connectToDB();
    const result = await pool.request().input('BranchID', BranchID).query(`EXEC GetEmployeesByBranchID @BranchID`);
    return result.recordset; // Trả về bản ghi đầu tiên nếu có
}

const getEmployeeById = async (EmployeeID) => {
    const pool = await connectToDB();
    const result = await pool.request()
        .input('EmployeeID', sql.Int, EmployeeID)
        .query('SELECT * FROM EMPLOYEE WHERE EmployeeID = @EmployeeID');
    return result.recordset[0]; // Trả về bản ghi đầu tiên nếu có
};

const addEmployee = async (Employee) => {
    const { EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = Employee;
    const pool = await connectToDB();
    await pool.request()
        .input('EmployeeID', sql.Int, EmployeeID)
        .input('EmployeeName', sql.NVarChar, EmployeeName)
        .input('EmployeeBirth', sql.Date, EmployeeBirth)
        .input('EmployeeGender', sql.NVarChar, EmployeeGender)
        .input('Salary', sql.Decimal, Salary)
        .input('EntryDate', sql.Date, EntryDate)
        .input('DepartmentID', sql.Int, DepartmentID)
        .input('BranchID', sql.Int, BranchID)
        .input('EmployeeAddress', sql.NVarChar, EmployeeAddress)
        .input('EmployeePhone', sql.NVarChar, EmployeePhone)
        .query('EXEC New_Employee @EmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone');
};

const updateEmployee = async (Employee) => {
    const { EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = Employee;
    const pool = await connectToDB();
    await pool.request()
        .input('EmployeeID', sql.Int, EmployeeID)
        .input('EmployeeName', sql.NVarChar, EmployeeName)
        .input('EmployeeBirth', sql.Date, EmployeeBirth)
        .input('EmployeeGender', sql.NVarChar, EmployeeGender)
        .input('Salary', sql.Decimal, Salary)
        .input('EntryDate', sql.Date, EntryDate)
        .input('LeaveDate', sql.Date, LeaveDate)
        .input('DepartmentID', sql.Int, DepartmentID)
        .input('BranchID', sql.Int, BranchID)
        .input('EmployeeAddress', sql.NVarChar, EmployeeAddress)
        .input('EmployeePhone', sql.NVarChar, EmployeePhone)
        .query('EXEC Update_Employee @EmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, @LeaveDate, @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone');
};

const deleteEmployeeById = async (EmployeeID) => {
    const pool = await connectToDB();
    await pool.request()
        .input('EmployeeID', sql.Int, EmployeeID)
        .query('EXEC Delete_Employee @EmployeeID');
};

module.exports = {
    getAllEmployeeByBranchID,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployeeById
};