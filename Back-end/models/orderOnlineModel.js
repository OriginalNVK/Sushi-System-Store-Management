const sql = require('mssql');
const connectToDB = require('../db/dbConfig'); 

const OrderOnline = {
    async getAllOrders() {
        const pool = await connectToDB(); 
        const result = await pool.request().execute('GetOrderOnline'); 
        return result.recordset;
    },
    async addOrder(orderData) {
        const pool = await connectToDB(); 
        const result = await pool.request()
            .input('BranchID', sql.Int, orderData.BranchID)
            .input('EmployeeID', sql.Int, orderData.EmployeeID)
            .input('NumberTable', sql.Int, orderData.NumberTable)
            .input('CardID', sql.Int, orderData.CardID)
            .input('AmountCustomer', sql.Int, orderData.AmountCustomer)
            .input('DishName', sql.NVarChar, orderData.DishName)
            .input('AmountDish', sql.Int, orderData.AmountDish)
            .input('DateOrder', sql.NVarChar, orderData.DateOrder)
            .input('TimeOrder', sql.NVarChar, orderData.TimeOrder)
            .execute('AddNewOrderOnline'); 
        return result.recordset;
    },
    async updateOrder(orderID, orderData) {
        const pool = await connectToDB(); 
        const result = await pool.request()
            .input('OrderID', sql.Int, orderID)
            .input('BranchID', sql.Int, orderData.BranchID)
            .input('EmployeeID', sql.Int, orderData.EmployeeID)
            .input('NumberTable', sql.Int, orderData.NumberTable)
            .input('CardID', sql.Int, orderData.CardID)
            .input('AmountCustomer', sql.Int, orderData.AmountCustomer)
            .input('DishName', sql.NVarChar, orderData.DishName)
            .input('AmountDish', sql.Int, orderData.AmountDish)
            .input('DateOrder', sql.NVarChar, orderData.DateOrder)
            .input('TimeOrder', sql.NVarChar, orderData.TimeOrder)
            .execute('UpdateOrderOnline'); 
        return result.recordset;
    },
    async deleteOrder(orderID) {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, orderID)
            .execute('DeleteOrderOnline'); 
        return result.recordset;
    }
};

module.exports = OrderOnline;