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

// Phương thức GET: Lấy dữ liệu đơn hàng offline
const getOrderOffline = async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().execute('GetOrderOffline'); 
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
};

// Phương thức POST: Thêm đơn hàng offline mới
const postOrderOffline = async (req, res) => {
    try {
        const { OrderID, EmployeeID, NumberTable, DishName, AmountDish, OrderEstablishDate} = req.body;
        const pool = await connectDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('NumberTable', sql.Int, NumberTable)
            .input('DishName', sql.NVarChar, DishName)
            .input('AmountDish', sql.Int, AmountDish)
            .input('OrderEstablishDate', sql.NVarChar, OrderEstablishDate)
            .execute('AddNewOfflineOrder');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi thêm đơn hàng: ' + err.message);
    }
};

// Phương thức PUT: Cập nhật thông tin đơn hàng offline
const putOrderOffline = async (req, res) => {
    try {
        const { OrderID, EmployeeID, NumberTable, DishName, AmountDish, OrderEstablishDate } = req.body;
        const pool = await connectDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('NumberTable', sql.Int, NumberTable)
            .input('DishName', sql.NVarChar, DishName)
            .input('AmountDish', sql.Int, AmountDish)
            .input('OrderEstablishDate', sql.NVarChar, OrderEstablishDate)
            .execute('UpdateOrderOffline');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi cập nhật đơn hàng: ' + err.message);
    }
};

// Phương thức DELETE: Xóa đơn hàng offline
const deleteOrderOffline = async (req, res) => {
    try {
        const { OrderID } = req.params;
        const pool = await connectDB();
        const result = await pool.request()
            .input('OrderID', sql.Int, OrderID)
            .execute('DeleteOrderOffline'); // Gọi stored procedure DELETE_ORDER_OFFLINE
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Lỗi khi xóa đơn hàng: ' + err.message);
    }
};

module.exports = {
    getOrderOffline,
    postOrderOffline,
    putOrderOffline,
    deleteOrderOffline
};
