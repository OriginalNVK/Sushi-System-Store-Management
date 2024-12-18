const connectToDB = require("../db/dbConfig"); // Ensure you have a valid DB connection config
const sql = require("mssql");

const getAllOrdersModel = async () => {
  const pool = await connectToDB();
  const result = await pool.request().execute("GetOrderOffline"); // Replace with the correct stored procedure name if needed
  return result.recordset;
};

const addOrderModel = async (orderData) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("OrderID", sql.Int, orderData.OrderID)
    .input("EmployeeID", sql.Int, orderData.EmployeeID)
    .input("NumberTable", sql.Int, orderData.NumberTable)
    .input("DishName", sql.NVarChar(255), orderData.DishName)
    .input("AmountDish", sql.Int, orderData.AmountDish)
    .input("OrderEstablishDate", sql.NVarChar(255), orderData.OrderEstablishDate)
    .execute("AddNewOfflineOrder"); // Replace with the correct stored procedure name if needed
  return result.recordset;
};

const updateOrderModel = async (orderID, orderData) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("OrderID", sql.Int, orderID)
    .input("EmployeeID", sql.Int, orderData.EmployeeID)
    .input("NumberTable", sql.Int, orderData.NumberTable)
    .input("DishName", sql.NVarChar(255), orderData.DishName)
    .input("AmountDish", sql.Int, orderData.AmountDish)
    .input("OrderEstablishDate", sql.NVarChar(255), orderData.OrderEstablishDate)
    .execute("UpdateOrderOffline"); // Replace with the correct stored procedure name if needed
  return result.recordset;
};

const deleteOrderModel = async (orderID) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("OrderID", sql.Int, orderID)
    .execute("DeleteOrderOffline"); // Replace with the correct stored procedure name if needed
  return result.rowsAffected[0] > 0; // Return true if the row was deleted
};

module.exports = {
  getAllOrdersModel,
  addOrderModel,
  updateOrderModel,
  deleteOrderModel,
};
