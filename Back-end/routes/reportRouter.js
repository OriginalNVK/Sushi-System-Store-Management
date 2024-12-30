const express = require('express');
const router = express.Router();
const {
  getReportOverviewRevenueByDate,
  getReportOverviewRevenueByMonth,
  getReportOverviewRevenueByQuarter,
  getReportOverviewRevenueByYear,
  getReportRevenueDetailByDate,
  getReportRevenueDetailByMonth,
  getReportRevenueDetailByQuarter,
  getReportRevenueDetailByYear,
} = require("../controllers/reportController");

router.get("/date/:branchid", getReportOverviewRevenueByDate);
router.get("/month/:branchid", getReportOverviewRevenueByMonth);
router.get("/quarter/:branchid",
  getReportOverviewRevenueByQuarter
);
router.get("/year/:branchid", getReportOverviewRevenueByYear);
router.get("/detail/date/:date/:branchid", getReportRevenueDetailByDate);
router.get(
  "/detail/month/:month/:year/:branchid",
  getReportRevenueDetailByMonth
);
router.get(
  "/detail/quarter/:quarter/:year/:branchid",
  getReportRevenueDetailByQuarter
);
router.get("/detail/year/:year/:branchid", getReportRevenueDetailByYear);

module.exports = router;