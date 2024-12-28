const sql = require("mssql");
const config = require("../db/dbConfig");

// Thống kê doanh thu theo ngày
const getRevenueByDay = async (date) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("InputDate", sql.Date, date)
            .execute("CalRevenueByDay");
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo ngày:", err);
        throw err;
    }
};

// Thống kê doanh thu theo tháng
const getRevenueByMonth = async (month, year) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("InputMonth", sql.Int, month)
            .input("InputYear", sql.Int, year)
            .execute("CalRevenueByMonth");
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo tháng:", err);
        throw err;
    }
};

// Thống kê doanh thu theo quý
const getRevenueByQuarter = async (quarter, year) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("InputQuarter", sql.Int, quarter)
            .input("InputYear", sql.Int, year)
            .execute("CalRevenueByQuarter");
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo quý:", err);
        throw err;
    }
};

// Thống kê doanh thu theo năm
const getRevenueByYear = async (year) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("InputYear", sql.Int, year)
            .execute("CalRevenueByYear");
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo năm:", err);
        throw err;
    }
};

module.exports = {
    getRevenueByDay,
    getRevenueByMonth,
    getRevenueByQuarter,
    getRevenueByYear
};