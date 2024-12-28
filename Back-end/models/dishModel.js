const sql = require('mssql');
const connectToDB = require('../db/dbConfig');

const getAllDishes = async () => {
    const pool = await connectToDB();
    const result = await pool.request().query(`
        SELECT mnd.DirectoryName, d.DishName, d.Price
        FROM DISH d
        JOIN MENU_DIRECTORY_DISH mnd ON mnd.DishID = d.DishID
        JOIN BRANCH b ON b.BranchID = mnd.BranchID
        WHERE mnd.StatusDish = 'YES' AND b.BranchID = 1
        ORDER BY mnd.DirectoryName, d.DishName, d.Price
    `);

    // Process the data to group by DirectoryName
    const groupedData = result.recordset.reduce((acc, item) => {
        const { DirectoryName, DishName, Price } = item;
        // Find if the DirectoryName already exists
        let directory = acc.find(group => group.DirectoryName === DirectoryName);
        if (!directory) {
            // If not, create a new directory group
            directory = { DirectoryName, Dishes: [] };
            acc.push(directory);
        }
        // Add the dish to the directory's Dishes array
        directory.Dishes.push({ DishName, Price });
        return acc;
    }, []);
    return groupedData; // Return the grouped data
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