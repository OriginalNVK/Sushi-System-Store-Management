const express = require('express');
var router = express.Router();
const sql = require('mssql');
var config = require('../config.js');
const moment = require('moment');

router.get('/api/dish/:DishID', async (req, res) => {
    const { DishID } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('DishID', sql.Int, EmployeeID)  // Định nghĩa tham số EmployeeID
            .query('SELECT * FROM DISH WHERE DishID = @DishID');  // Sử dụng tham số trong câu lệnh SQL

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Dish not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//API thêm món ăn
router.post('/api/add-new-dish', async (req, res) => {
    const { BranchID, DirectoryName,DishID , DishName, Price } = req.body;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('BranchID', sql.Int, BranchID)
            .input('DirectoryName', sql.NVarChar, DirectoryName)
            .input('DishID', sql.Int, DishID)
            .input('DishName', sql.NVarChar, DishName)
            .input('Price', sql.Decimal, Price)
            .query('EXEC AddNewDish @BranchID, @DirectoryName,@DishID, @DishName, @Price');
        
        res.status(200).json({ message: 'Dish added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API xóa món ăn
router.delete('/api/delete-dish/:DishID', async (req, res) => {
    const { DishID } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('DishID', sql.Int, DishID)
            .query('EXEC DeleteDish @DishID');
        
        res.status(200).json({ message: 'Dish deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API cập nhật món ăn
router.put('/api/update-dish/:DishID', async (req, res) => {
    const { BranchID, DirectoryName, DishID, NewDishName, NewPrice,  } = req.body;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('BranchID', sql.Int, BranchID)
            .input('DirectoryName', sql.NVarChar, DirectoryName)
            .input('DishID', sql.Int, DishID)
            .input('NewDishName', sql.NVarChar, NewDishName)
            .input('NewPrice', sql.Int, NewPrice)
            .query('EXEC Update_Dish @BranchID, @DirectoryName, @DishID, @NewDishName, @NewPrice');
        
        res.status(200).json({ message: 'Dish updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/api/add-branch', async (req, res) => {
    const {
        BranchID,
        BranchName,
        BranchAddress,
        OpenHour,
        CloseHour,
        PhoneNumber,
        HasCarParking,
        HasMotorParking,
        AreaID,
        ManagerID,
        HasDeliveryService
    } = req.body;

    try {
        const formattedOpenHour = moment(OpenHour, 'HH:mm:ss').format('HH:mm:ss');
        const formattedCloseHour = moment(CloseHour, 'HH:mm:ss').format('HH:mm:ss');

        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('BranchID', sql.Int, BranchID)
            .input('BranchName', sql.NVarChar, BranchName)
            .input('BranchAddress', sql.NVarChar, BranchAddress)
            .input('OpenHour', sql.VarChar, OpenHour)
            .input('CloseHour', sql.VarChar, CloseHour)
            .input('PhoneNumber', sql.Char, PhoneNumber)
            .input('HasCarParking', sql.VarChar, HasCarParking)
            .input('HasMotorParking', sql.VarChar, HasMotorParking)
            .input('AreaID', sql.Int, AreaID)
            .input('ManagerID', sql.Int, ManagerID)
            .input('HasDeliveryService', sql.VarChar, HasDeliveryService)
            .execute('AddBranch'); // Gọi stored procedure

        res.status(200).json({ message: 'Branch added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;