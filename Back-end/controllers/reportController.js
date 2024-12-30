const reportModels  = require('../models/reportModels');

const getReportOverviewRevenueByDate = async (req, res) => {
    try {
        const {branchid} = req.params; // 30-12-2024
        const report = await reportModels.getOverviewReportRevenueByDate(branchid);
        res.status(200).json(report);
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportOverviewRevenueByMonth = async (req, res) => {
    try {
        const {branchid } = req.params;
        const report = await reportModels.getOverviewReportRevenueByMonth(branchid);

        res.status(200).json(report);
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportOverviewRevenueByQuarter = async (req, res) => {
    try {
        const {branchid } = req.params;
        const report = await reportModels.getOverviewReportRevenueByQuarter(branchid);

        res.status(200).json(report);
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportOverviewRevenueByYear = async (req, res) => {
    try {
        const {branchid } = req.params;
        const report = await reportModels.getOverviewReportRevenueByYear(branchid);

        res.status(200).json(report);
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportRevenueDetailByDate = async (req, res) => {
    try {
        const { date, branchid } = req.params;
        const [day, month, year] = date.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day + 1);
        const [summaryData, detailData] =
            await reportModels.getReportRevenueDetailByDate(parsedDate, branchid);
        res.status(200).json(
            {
                summaryData,
                dishDetails: detailData
            });
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportRevenueDetailByMonth = async (req, res) => {
    try {
        const { month, year, branchid } = req.params;
        const [summaryData, detailData] =
          await reportModels.getReportRevenueDetailByMonth(month, year, branchid);

        res.status(200).json({
          summaryData,
          dishDetails: detailData,
        });
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportRevenueDetailByQuarter = async (req, res) => {
    try {
        const { quarter, year, branchid } = req.params;
        const [summaryData, detailData] =
          await reportModels.getReportRevenueDetailByQuarter(quarter, year, branchid);

        res.status(200).json({
          summaryData,
          dishDetails: detailData,
        });
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getReportRevenueDetailByYear = async (req, res) => {
    try {
        const { year, branchid } = req.params;
        const [summaryData, detailData] =
          await reportModels.getReportRevenueDetailByYear(year, branchid);

        res.status(200).json({
          summaryData,
          dishDetails: detailData,
        });
    }
    catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

module.exports = {
    getReportOverviewRevenueByDate,
    getReportOverviewRevenueByMonth,
    getReportOverviewRevenueByQuarter,
    getReportOverviewRevenueByYear,
    getReportRevenueDetailByDate,
    getReportRevenueDetailByMonth,
    getReportRevenueDetailByQuarter,
    getReportRevenueDetailByYear
};