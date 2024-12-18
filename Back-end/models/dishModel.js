const sql = require('mssql');
const config = require('../db/dbConfig');

const getDishById = async (DishID) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('DishID', sql.Int, DishID)
        .query('SELECT * FROM DISH WHERE DishID = @DishID');
    return result.recordset[0]; // Trả về món ăn đầu tiên nếu có
};

const addDish = async (BranchID, DirectoryName, DishID, DishName, Price) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('BranchID', sql.Int, BranchID)
        .input('DirectoryName', sql.NVarChar, DirectoryName)
        .input('DishID', sql.Int, DishID)
        .input('DishName', sql.NVarChar, DishName)
        .input('Price', sql.Decimal, Price)
        .query('EXEC AddNewDish @BranchID, @DirectoryName, @DishID, @DishName, @Price');
};

const deleteDishById = async (DishID) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('DishID', sql.Int, DishID)
        .query('EXEC DeleteDish @DishID');
};

const updateDish = async (BranchID, DirectoryName, DishID, NewDishName, NewPrice) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('BranchID', sql.Int, BranchID)
        .input('DirectoryName', sql.NVarChar, DirectoryName)
        .input('DishID', sql.Int, DishID)
        .input('NewDishName', sql.NVarChar, NewDishName)
        .input('NewPrice', sql.Decimal, NewPrice)
        .query('EXEC Update_Dish @BranchID, @DirectoryName, @DishID, @NewDishName, @NewPrice');
};

module.exports = {
    getDishById,
    addDish,
    deleteDishById,
    updateDish
};