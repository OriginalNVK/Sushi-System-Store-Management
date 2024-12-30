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
        .execute('GetEmployeeByID');  
    return result.recordset[0]; // Trả về bản ghi đầu tiên nếu có
};

const addEmployee = async (Employee) => {
    const { EmployeeName, EmployeeBirth, EmployeeGender, EntryDate, DepartmentName, BranchName, EmployeeAddress, EmployeePhone } = Employee;
    const pool = await connectToDB();
    await pool.request()
        .input('EmployeeName', sql.NVarChar, EmployeeName)
        .input('EmployeeBirth', sql.Date, EmployeeBirth)
        .input('EmployeeGender', sql.NVarChar, EmployeeGender)
        .input('EntryDate', sql.Date, EntryDate)
        .input('DepartmentName', sql.NVarChar, DepartmentName)
        .input('BranchName', sql.NVarChar, BranchName)
        .input('EmployeeAddress', sql.NVarChar, EmployeeAddress)
        .input('EmployeePhone', sql.NVarChar, EmployeePhone)
        .query('EXEC New_Employee @EmployeeName, @EmployeeBirth, @EmployeeGender, @EntryDate, @DepartmentName, @BranchName, @EmployeeAddress, @EmployeePhone');
};

const updateEmployee = async (EmployeeID, employeeData) => {
    try {
        console.log('Updating employee with data:', { EmployeeID, ...employeeData }); // Log dữ liệu đầu vào
        const pool = await connectToDB();
        await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('EmployeeName', sql.NVarChar, employeeData.EmployeeName)
            .input('EmployeeBirth', sql.Date, employeeData.EmployeeBirth)
            .input('EmployeeGender', sql.NVarChar, employeeData.EmployeeGender)
            .input('Salary', sql.Decimal, employeeData.Salary)
            .input('EntryDate', sql.Date, employeeData.EntryDate)
            .input('LeaveDate', sql.Date, employeeData.LeaveDate)
            .input('DepartmentID', sql.Int, employeeData.DepartmentID)
            .input('BranchID', sql.Int, employeeData.BranchID)
            .input('EmployeeAddress', sql.NVarChar, employeeData.EmployeeAddress)
            .input('EmployeePhone', sql.NVarChar, employeeData.EmployeePhone)
            .query('EXEC Update_Employee @EmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, @LeaveDate, @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone');
        console.log('Employee update query executed successfully'); // Log khi query thành công
    } catch (error) {
        console.error('Error in updateEmployee:', error.message); // Log lỗi
        throw error;
    }
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