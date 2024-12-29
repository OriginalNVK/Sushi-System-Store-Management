const sql = require('mssql');
const connectToDB = require('../db/dbConfig.js'); 

const OrderOnline = {
    async getAllOrders() {
        const pool = await connectToDB(); 
        const result = await pool.request().execute('GetOnlineOrder'); 
        return result.recordset;
    },
    async addOrder(orderData) {
        const pool = await connectToDB(); 
        const dishes = orderData.dishes;
        for (let i = 0; i < dishes.length; i++)
        {
            const result = await pool
              .request()
              .input("BranchID", sql.Int, orderData.BranchID)
              .input("NumberTable", sql.Int, orderData.NumberTable)
              .input("CardID", sql.Int, orderData.CardID)
              .input("AmountCustomer", sql.Int, orderData.AmountCustomer)
              .input("DishName", sql.NVarChar, dishes[i].dishName)
              .input("AmountDish", sql.Int, parseInt(dishes[i].dishAmount))
              .input("DateOrder", sql.Date, orderData.DateOrder)
              .input("TimeOrder", sql.Time, orderData.TimeOrder)
                .execute("AddNewOnlineOrder"); 
        }
        
        return;
    },
    async updateOrder(orderID, orderData) {
        const pool = await connectToDB(); 
        const result = await pool.request()
            .input('OrderID', sql.Int, orderID)
            .input('EmployeeID', sql.Int, orderData.EmployeeID)
            .execute('UpdateOnlineOrder'); 
        return result.recordset;
    },
    async deleteOrder(orderID) {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, orderID)
            .execute('DeleteOnlineOrder'); 
        return result.recordset;
    }
};

module.exports = OrderOnline;