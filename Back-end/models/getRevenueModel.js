const sql = require("mssql");
const config = require("../db/dbConfig");

// Lấy doanh thu theo ngày
const getRevenueByDay = async (date) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("Date", sql.Date, date)
            .query(`
                SELECT SUM(TotalAmount) AS Revenue
                FROM ORDERS
                WHERE CONVERT(DATE, OrderDate) = @Date
            `);
        return result.recordset[0];
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo ngày:", err);
        throw err;
    }
};

// Lấy doanh thu theo tháng
const getRevenueByMonth = async (year, month) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("Year", sql.Int, year)
            .input("Month", sql.Int, month)
            .query(`
                SELECT SUM(TotalAmount) AS Revenue
                FROM ORDERS
                WHERE YEAR(OrderDate) = @Year AND MONTH(OrderDate) = @Month
            `);
        return result.recordset[0];
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo tháng:", err);
        throw err;
    }
};

// Lấy doanh thu theo năm
const getRevenueByYear = async (year) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("Year", sql.Int, year)
            .query(`
                SELECT SUM(TotalAmount) AS Revenue
                FROM ORDERS
                WHERE YEAR(OrderDate) = @Year
            `);
        return result.recordset[0];
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo năm:", err);
        throw err;
    }
};

module.exports = {
    getRevenueByDay,
    getRevenueByMonth,
    getRevenueByYear
};