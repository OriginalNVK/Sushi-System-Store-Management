const sql = require('mssql');
const connectToDB = require('../db/dbConfig.js'); 

const OrderOffline = {
    async getAllOrders() {
        try {
            const pool = await connectToDB(); 
            const result = await pool.request().execute('GetOfflineOrder'); 
            return result.recordset;
        } catch (error) {
            throw new Error('Lỗi khi lấy tất cả đơn hàng offline: ' + error.message);
        }
    },

    async getOrderOfflinePendingOverview(branchID) {
        try {
            const pool = await connectToDB();
            const result = await pool
              .request()
              .input("BranchID", sql.Int, branchID)
                .execute("GetOrderOfflinePendingOverview");
            return result.recordset;
        }
        catch (error) {
            throw new Error('Lỗi khi lấy tất cả đơn hàng offline chờ xác nhận: ' + error.message);
        }
    },
    
    async addOrder(orderData) {
        try {
            const pool = await connectToDB(); ;
            const result = await pool.request()
                .input('EmployeeID', sql.Int, orderData.EmployeeID)
                .input('NumberTable', sql.Int, orderData.NumberTable)
                .input('CardID', sql.Int, orderData.CardID)
                .input('BranchID', sql.Int, orderData.BranchID)
                .input('DishNames', sql.NVarChar, orderData.DishNames)
                .input('DishAmounts', sql.NVarChar, orderData.DishAmounts)
                .input('OrderEstablishDate', sql.NVarChar, orderData.OrderEstablishDate)
                .execute('AddNewOfflineOrder');
            return result.recordset;
        } catch (error) {
            throw new Error('Lỗi khi thêm đơn hàng offline: ' + error.message);
        }
    },
    
    async deleteOrder(orderID) {
        try {
            const pool = await connectToDB(); 
            await pool.request()
                .input('OrderID', sql.Int, orderID)
                .execute('DeleteOfflineOrder'); 
        } catch (error) {
            throw new Error('Lỗi khi xóa đơn hàng offline: ' + error.message);
        }
    }
};

module.exports = OrderOffline;