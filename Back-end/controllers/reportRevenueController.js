const revenueModel = require('../models/revenueModel');

// Tổng quan doanh thu theo ngày
exports.getRevenueOverviewByDate = async (req, res) => {
  try {
    const { PayDate } = req.body;
    const data = await revenueModel.getRevenueOverviewByDate(PayDate);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Chi tiết doanh thu theo ngày
exports.getReportDetailByDate = async (req, res) => {
  try {
    const { PayDate } = req.body;
    const data = await revenueModel.getReportDetailByDate(PayDate);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Tổng quan doanh thu theo tháng
exports.getRevenueOverviewByMonth = async (req, res) => {
  try {
    const { Month, Year } = req.body;
    const data = await revenueModel.getRevenueOverviewByMonth(Month, Year);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Chi tiết doanh thu theo tháng
exports.getReportDetailByMonth = async (req, res) => {
  try {
    const { Month, Year } = req.body;
    const data = await revenueModel.getReportDetailByMonth(Month, Year);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Tổng quan doanh thu theo quý
exports.getRevenueOverviewByQuarter = async (req, res) => {
  try {
    const { Quarter, Year } = req.body;
    const data = await revenueModel.getRevenueOverviewByQuarter(Quarter, Year);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Chi tiết doanh thu theo quý
exports.getReportDetailByQuarter = async (req, res) => {
  try {
    const { Quarter, Year } = req.body;
    const data = await revenueModel.getReportDetailByQuarter(Quarter, Year);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Tổng quan doanh thu theo năm
exports.getRevenueOverviewByYear = async (req, res) => {
  try {
    const { Year } = req.body;
    const data = await revenueModel.getRevenueOverviewByYear(Year);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Chi tiết doanh thu theo năm
exports.getReportDetailByYear = async (req, res) => {
  try {
    const { Year } = req.body;
    const data = await revenueModel.getReportDetailByYear(Year);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};