const sql = require("mssql");
const config = require("../config/dbConfig");

const updateDishRevenueInDB = async (invoiceId) => {
  try {
    
    const pool = await sql.connect(config);

    await pool.request()
      .input("INVOICEID", sql.Int, invoiceId)
      .execute("UPDATEDISHREVENUE");

    return { success: true, message: "Dish revenue updated successfully!" };
  } catch (error) {
    console.error("Database Error:", error.message);
    return { success: false, message: "Failed to update dish revenue", error: error.message };
  }
};

module.exports = { updateDishRevenueInDB };