const express = require('express');
const router = express.Router();
const reportRevenueController = require('../controllers/reportRevenueController');

// Tổng quan doanh thu theo ngày
router.post('/overview/date', reportRevenueController.getRevenueOverviewByDate);

// Chi tiết doanh thu theo ngày
router.post('/detail/date', reportRevenueController.getReportDetailByDate);

// Tổng quan doanh thu theo tháng
router.post('/overview/month', reportRevenueController.getRevenueOverviewByMonth);

// Chi tiết doanh thu theo tháng
router.post('/detail/month', reportRevenueController.getReportDetailByMonth);

// Tổng quan doanh thu theo quý
router.post('/overview/quarter', reportRevenueController.getRevenueOverviewByQuarter);

// Chi tiết doanh thu theo quý
router.post('/detail/quarter', reportRevenueController.getReportDetailByQuarter);

// Tổng quan doanh thu theo năm
router.post('/overview/year', reportRevenueController.getRevenueOverviewByYear);

// Chi tiết doanh thu theo năm
router.post('/detail/year', reportRevenueController.getReportDetailByYear);

module.exports = router;
