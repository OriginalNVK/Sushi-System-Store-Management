const sql = require('mssql');
const config = require('../config'); // Đảm bảo bạn có tệp config cho kết nối DB

const OrderOnline = {
    async getAllOrders() {
        const pool = await sql.connect(config);
        const result = await pool.request().execute('GetOrderOnline'); // Thay đổi tên thủ tục nếu cần
        return result.recordset;
    },
    async addOrder(orderData) {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('OrderID', sql.Int, orderData.OrderID)
            .input('BranchID', sql.Int, orderData.BranchID)
            .input('EmployeeID', sql.Int, orderData.EmployeeID)
            .input('NumberTable', sql.Int, orderData.NumberTable)
            .input('CardID', sql.Int, orderData.CardID)
            .input('AmountCustomer', sql.Int, orderData.AmountCustomer)
            .input('DishName', sql.NVarChar, orderData.DishName)
            .input('AmountDish', sql.Int, orderData.AmountDish)
            .input('DateOrder', sql.NVarChar, orderData.DateOrder)
            .input('TimeOrder', sql.NVarChar, orderData.TimeOrder)
            .execute('AddNewOrder10'); // Thay đổi tên thủ tục nếu cần
        return result.recordset;
    },
    async updateOrder(orderID, orderData) {
        const pool = await sql.connect(config);
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
            .execute('UpdateOrder'); // Thay đổi tên thủ tục nếu cần
        return result.recordset;
    },
    async deleteOrder(orderID) {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('OrderID', sql.Int, orderID)
            .execute('DeleteOrder'); // Thay đổi tên thủ tục nếu cần
        return result.recordset;
    }
};

module.exports = OrderOnline;