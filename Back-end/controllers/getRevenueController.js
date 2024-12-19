const revenueModel = require("../models/getRevenueModel");

// Lấy doanh thu theo ngày
const getRevenueByDay = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).send("Vui lòng cung cấp ngày hợp lệ.");
        }
        const revenue = await revenueModel.getRevenueByDay(date);
        res.status(200).json({ revenue });
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo ngày:", err);
        res.status(500).send("Đã xảy ra lỗi khi lấy doanh thu theo ngày.");
    }
};

// Lấy doanh thu theo tháng
const getRevenueByMonth = async (req, res) => {
    try {
        const { year, month } = req.query;
        if (!year || !month) {
            return res.status(400).send("Vui lòng cung cấp năm và tháng hợp lệ.");
        }
        const revenue = await revenueModel.getRevenueByMonth(year, month);
        res.status(200).json({ revenue });
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo tháng:", err);
        res.status(500).send("Đã xảy ra lỗi khi lấy doanh thu theo tháng.");
    }
};

// Lấy doanh thu theo năm
const getRevenueByYear = async (req, res) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).send("Vui lòng cung cấp năm hợp lệ.");
        }
        const revenue = await revenueModel.getRevenueByYear(year);
        res.status(200).json({ revenue });
    } catch (err) {
        console.error("Lỗi khi lấy doanh thu theo năm:", err);
        res.status(500).send("Đã xảy ra lỗi khi lấy doanh thu theo năm.");
    }
};

module.exports = {
    getRevenueByDay,
    getRevenueByMonth,
    getRevenueByYear
};