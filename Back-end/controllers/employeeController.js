const sql = require('mssql');
var config = require('../config.js');

const getEmployee = async (req, res) => {
    const { EmployeeID } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)  // Định nghĩa tham số EmployeeID
            .query('SELECT * FROM EMPLOYEE WHERE EmployeeID = @EmployeeID');  // Sử dụng tham số trong câu lệnh SQL

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Employee not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// API thêm nhân viên
const addNewEmployee = async (req, res) => {
    const { EmployeeID,EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('EmployeeName', sql.NVarChar, EmployeeName)
            .input('EmployeeBirth', sql.Date, EmployeeBirth)
            .input('EmployeeGender', sql.NVarChar, EmployeeGender)
            .input('Salary', sql.Int, Salary)
            .input('EntryDate', sql.Date, EntryDate)
            .input('DepartmentID', sql.Int, DepartmentID)
            .input('BranchID', sql.Int, BranchID)
            .input('EmployeeAddress', sql.NVarChar, EmployeeAddress)
            .input('EmployeePhone', sql.NVarChar, EmployeePhone)
            .query('EXEC New_Employee @EmployeeID, @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone');
        
        res.status(200).json({ message: 'Employee added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// API cập nhật thông tin nhân viên
const updateEmployee = async (req, res) => {
    const { EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
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
        
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// API xóa nhân viên
const deleteEmployee = async (req, res) => {
    const { EmployeeID } = req.params;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .query('EXEC Delete_Employee @EmployeeID');
        
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEmployee,
    addNewEmployee,
    updateEmployee,
    deleteEmployee
};