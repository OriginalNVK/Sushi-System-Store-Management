const express = require('express');
var router = express.Router();
const sql = require('mssql');
var config = require('../config.js');

router.get('/area/:AreaID', async function (req, res) {
    try {
        const { AreaID } = req.params; // Lấy AreaID từ URL
        const pool = await sql.connect(config); // Kết nối cơ sở dữ liệu

        // Sử dụng tham số hóa đúng cách
        const result = await pool.request()
            .input('AreaID', sql.Int, AreaID) // Định nghĩa tham số AreaID
            .query("SELECT * FROM AREA WHERE AreaID = @AreaID");

        return res.json(result.recordset); // Trả về kết quả truy vấn
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "An error occurred" });
    }
});

router.get('/api/employee/:EmployeeID', async (req, res) => {
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
});

// API thêm nhân viên
router.post('/api/new-employee', async (req, res) => {
    const { EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = req.body;

    try {
        const result = await sql.request()
            .input('EmployeeName', sql.NVarChar, EmployeeName)
            .input('EmployeeBirth', sql.Date, EmployeeBirth)
            .input('EmployeeGender', sql.NVarChar, EmployeeGender)
            .input('Salary', sql.Decimal, Salary)
            .input('EntryDate', sql.Date, EntryDate)
            .input('DepartmentID', sql.Int, DepartmentID)
            .input('BranchID', sql.Int, BranchID)
            .input('EmployeeAddress', sql.NVarChar, EmployeeAddress)
            .input('EmployeePhone', sql.NVarChar, EmployeePhone)
            .query('EXEC New_Employee @EmployeeName, @EmployeeBirth, @EmployeeGender, @Salary, @EntryDate, @DepartmentID, @BranchID, @EmployeeAddress, @EmployeePhone');
        
        res.status(200).json({ message: 'Employee added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API cập nhật thông tin nhân viên
router.put('/api/update-employee', async (req, res) => {
    const { EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = req.body;

    try {
        const result = await sql.request()
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
});

// API xóa nhân viên
router.delete('/api/delete-employee/:EmployeeID', async (req, res) => {
    const { EmployeeID } = req.params;

    try {
        const result = await sql.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .query('EXEC Delete_Employee @EmployeeID');
        
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/api/dish/:DishID', async (req, res) => {
    const { DishID } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('DishID', sql.Int, DishID)  // Định nghĩa tham số DishID
            .query('SELECT * FROM DISH WHERE DishID = @DishID');  // Sử dụng tham số trong câu lệnh SQL

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]); // Trả về thông tin món ăn
        } else {
            res.status(404).json({ message: 'Dish not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message }); // Xử lý lỗi nếu có
    }
});

module.exports = router;