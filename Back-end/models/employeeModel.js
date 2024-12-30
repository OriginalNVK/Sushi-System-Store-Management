const sql = require('mssql');
const connectToDB = require('../db/dbConfig');

const getAllEmployee = async () => {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM EMPLOYEE');
    return result.recordset; // Trả về bản ghi đầu tiên nếu có
};

const getAllEmployeeByBranchID = async (BranchID) => {
    const pool = await connectToDB();
    const result = await pool.request().input('BranchID', BranchID).query('SELECT * FROM EMPLOYEE WHERE BranchID = @BranchID');
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
    getAllEmployee,
    getAllEmployeeByBranchID,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployeeById
};