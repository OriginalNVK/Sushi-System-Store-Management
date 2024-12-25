const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

// Route lấy doanh thu theo ngày, tháng, quý, nămnăm
router.get("/day", revenueController.getRevenueByDay);

router.get("/month", revenueController.getRevenueByMonth);

router.get("/quarter", revenueController.getRevenueByQuarter);

router.get("/year", revenueController.getRevenueByYear);

module.exports = router;