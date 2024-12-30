const sql = require("mssql");
const connectToDB = require("../db/dbConfig");

const report = {
    async getOverviewReportRevenueByDate(branchID) {
    const pool = await connectToDB();
    const result = await pool
      .request()
        .input("BranchID", sql.Int, branchID)
      .execute("GetRevenueOverviewByDate");
    return result.recordset;
  },

  async getOverviewReportRevenueByMonth(branchID) {
    const pool = await connectToDB();
    const result = await pool
      .request()
        .input("BranchID", sql.Int, branchID)
      .execute("GetReportOverviewByMonth");
    return result.recordset;
  },
  async getOverviewReportRevenueByQuarter(branchID) {
    const pool = await connectToDB();
    const result = await pool
      .request()
        .input("BranchID", sql.Int, branchID)
      .execute("GetReportOverviewByQuarter");
    return result.recordset;
  },
  async getOverviewReportRevenueByYear(branchID) {
    const pool = await connectToDB();
    const result = await pool
      .request()
      .input("BranchID", sql.Int, branchID)
      .execute("GetReportOverviewByYear");
    return result.recordset;
    },
  
    async getReportRevenueDetailByDate(date, branchID) {
        const pool = await connectToDB();
        const result = await pool
          .request()
            .input("PayDate", sql.Date, date)
            .input("BranchID", sql.Int, branchID)
            .execute("GetReportDetailByDate");
        return result.recordsets;
    },

    async getReportRevenueDetailByMonth(month, year, branchID) {
        const pool = await connectToDB();
        const result = await pool
          .request()
          .input("Month", sql.Int, month)
            .input("Year", sql.Int, year)
            .input("BranchID", sql.Int, branchID)
          .execute("GetReportDetailByMonth");
        return result.recordsets;
    },

    async getReportRevenueDetailByQuarter(quarter, year, branchID) {
        const pool = await connectToDB();
        const result = await pool
          .request()
          .input("Quarter", sql.Int, quarter)
            .input("Year", sql.Int, year)
            .input("BranchID", sql.Int, branchID)
            .execute("GetReportDetailByQuarter");
        return result.recordsets;
    },

    async getReportRevenueDetailByYear(year, branchID) {
        const pool = await connectToDB();
        const result = await pool
          .request()
            .input("Year", sql.Int, year)
            .input("BranchID", sql.Int, branchID)
            .execute("GetReportDetailByYear");
        return result.recordsets;
    }
};

module.exports = report;