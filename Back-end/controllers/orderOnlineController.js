const sql = require('mssql');
const config = require('../config');

// Kết nối đến cơ sở dữ liệu
const connectDB = async () => {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (err) {
        throw new Error('Kết nối DB thất bại: ' + err.message);
    }
};

// Phương thức GET: Lấy dữ liệu đơn hàng online
const getOrderOnline = async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().execute('GetOrderOnline'); // Gọi stored procedure GET_ORDER_ONLINE
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
};

// Phương thức POST: Thêm đơn hàng online mới
const postOrderOnline = async (req, res) => {
    try {
        const { OrderID, BranchID, EmployeeID, NumberTable, AmountCustomer, DishName, AmountDish, DateOrder, TimeOrder } = req.body;
        const pool = await connectDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .input('BranchID', sql.Int, BranchID)
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('NumberTable', sql.Int, NumberTable)
            .input('AmountCustomer', sql.Int, AmountCustomer)
            .input('DishName', sql.NVarChar, DishName)
            .input('AmountDish', sql.Int, AmountDish)
            .input('DateOrder', sql.NVarChar, DateOrder)
            .input('TimeOrder', sql.NVarChar, TimeOrder)
            .execute('AddNewOrder10');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi thêm đơn hàng: ' + err.message);
    }
};

// Phương thức PUT: Cập nhật thông tin đơn hàng online
const putOrderOnline = async (req, res) => {
    try {
        const { OrderID, BranchID, EmployeeID, NumberTable, AmountCustomer, DishName, AmountDish, DateOrder, TimeOrder} = req.body;
        const pool = await connectDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .input('BranchID', sql.Int, BranchID)
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('NumberTable', sql.Int, NumberTable)
            .input('AmountCustomer', sql.Int, AmountCustomer)
            .input('DishName', sql.NVarChar, DishName)
            .input('AmountDish', sql.Int, AmountDish)
            .input('DateOrder', sql.NVarChar, DateOrder)
            .input('TimeOrder', sql.NVarChar, TimeOrder)
            .execute('UpdateOrder'); // Gọi stored procedure UPDATE_ORDER_ONLINE
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi cập nhật đơn hàng: ' + err.message);
    }
};

// Phương thức DELETE: Xóa đơn hàng online
const deleteOrderOnline = async (req, res) => {
    try {
        const { OrderID } = req.params;
        const pool = await connectDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .execute('DeleteOrder'); 
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi xóa đơn hàng: ' + err.message);
    }
};

module.exports = {
    getOrderOnline,
    postOrderOnline,
    putOrderOnline,
    deleteOrderOnline
};
