const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/getRevenueController");

// Route lấy doanh thu theo ngày
router.get("/day", revenueController.getRevenueByDay);

// Route lấy doanh thu theo tháng
router.get("/month", revenueController.getRevenueByMonth);

// Route lấy doanh thu theo năm
router.get("/year", revenueController.getRevenueByYear);

module.exports = router;