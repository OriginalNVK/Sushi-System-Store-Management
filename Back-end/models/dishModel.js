const sql = require('mssql');
const connectToDB = require('../db/dbConfig');

const getAllDishes = async () => {
    const pool = await connectToDB();
    const result = await pool.request()
        .query(`
      SELECT 
        mnd.DirectoryName,
        d.DishName, 
        d.Price
      FROM DISH d
      JOIN MENU_DIRECTORY_DISH mnd ON mnd.DishID = d.DishID
      WHERE mnd.StatusDish = 'YES'
      ORDER BY mnd.DirectoryName, d.DishName, d.Price;
    `);

    if (!result.recordset || result.recordset.length === 0) {
        console.log("No dishes found.");
        throw new Error("Không có món ăn nào được tìm thấy.");
    }

    return result.recordset;
};

const getDishById = async (DishID) => {
    const pool = await connectToDB();
    const result = await pool.request()
        .input('DishID', sql.Int, DishID)
        .query('SELECT * FROM DISH WHERE DishID = @DishID');
    return result.recordset[0]; // Trả về món ăn đầu tiên nếu có
};

const addDish = async (BranchID, DirectoryName, DishID, DishName, Price) => {
    const pool = await connectToDB();
    await pool.request()
        .input('BranchID', sql.Int, BranchID)
        .input('DirectoryName', sql.NVarChar, DirectoryName)
        .input('DishID', sql.Int, DishID)
        .input('DishName', sql.NVarChar, DishName)
        .input('Price', sql.Decimal, Price)
        .query('EXEC AddNewDish @BranchID, @DirectoryName, @DishID, @DishName, @Price');
};

const deleteDishById = async (DishID) => {
    const pool = await connectToDB();
    await pool.request()
        .input('DishID', sql.Int, DishID)
        .query('EXEC DeleteDish @DishID');
};

const updateDish = async (BranchID, DirectoryName, DishID, NewDishName, NewPrice) => {
    const pool = await connectToDB();
    await pool.request()
        .input('BranchID', sql.Int, BranchID)
        .input('DirectoryName', sql.NVarChar, DirectoryName)
        .input('DishID', sql.Int, DishID)
        .input('NewDishName', sql.NVarChar, NewDishName)
        .input('NewPrice', sql.Decimal, NewPrice)
        .query('EXEC Update_Dish @BranchID, @DirectoryName, @DishID, @NewDishName, @NewPrice');
};

module.exports = {
    getAllDishes,
    getDishById,
    addDish,
    deleteDishById,
    updateDish
};