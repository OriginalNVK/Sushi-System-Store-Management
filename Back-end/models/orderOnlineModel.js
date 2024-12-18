const connectToDB = require("../db/dbConfig"); // Ensure you have a valid DB connection config
const sql = require("mssql");

const getAllOrdersModel = async () => {
  const pool = await connectToDB();
  const result = await pool.request().execute("GetOrderOnline"); // Replace with the correct stored procedure name if needed
  return result.recordset;
};

const addOrderModel = async (orderData) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("OrderID", sql.Int, orderData.OrderID)
    .input("BranchID", sql.Int, orderData.BranchID)
    .input("EmployeeID", sql.Int, orderData.EmployeeID)
    .input("NumberTable", sql.Int, orderData.NumberTable)
    .input("AmountCustomer", sql.Int, orderData.AmountCustomer)
    .input("DishName", sql.NVarChar(255), orderData.DishName)
    .input("AmountDish", sql.Int, orderData.AmountDish)
    .input("DateOrder", sql.NVarChar(255), orderData.DateOrder)
    .input("TimeOrder", sql.NVarChar(255), orderData.TimeOrder)
    .execute("AddNewOrder10"); // Replace with the correct stored procedure name if needed
  return result.recordset;
};

const updateOrderModel = async (orderID, orderData) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("OrderID", sql.Int, orderID)
    .input("BranchID", sql.Int, orderData.BranchID)
    .input("EmployeeID", sql.Int, orderData.EmployeeID)
    .input("NumberTable", sql.Int, orderData.NumberTable)
    .input("AmountCustomer", sql.Int, orderData.AmountCustomer)
    .input("DishName", sql.NVarChar(255), orderData.DishName)
    .input("AmountDish", sql.Int, orderData.AmountDish)
    .input("DateOrder", sql.NVarChar(255), orderData.DateOrder)
    .input("TimeOrder", sql.NVarChar(255), orderData.TimeOrder)
    .execute("UpdateOrderOnline"); // Replace with the correct stored procedure name if needed
  return result.recordset;
};

const deleteOrderModel = async (orderID) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("OrderID", sql.Int, orderID)
    .execute("DeleteOrderOnline"); // Replace with the correct stored procedure name if needed
  return result.rowsAffected[0] > 0; // Return true if the row was deleted
};

module.exports = {
  getAllOrdersModel,
  addOrderModel,
  updateOrderModel,
  deleteOrderModel,
};
