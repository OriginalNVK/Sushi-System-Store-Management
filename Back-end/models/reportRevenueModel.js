// models/revenueModel.js

const { poolPromise } = require('../db/dbConfig');

async function executeProcedure(procedureName, params) {
  const pool = await poolPromise;
  const request = pool.request();
  for (const key in params) {
    request.input(key, params[key]);
  }
  const result = await request.execute(procedureName);
  return result.recordset;
}

exports.getRevenueOverviewByDate = async (PayDate) => {
  return await executeProcedure('GetRevenueOverviewByDate', { PayDate });
};

exports.getReportDetailByDate = async (PayDate) => {
  return await executeProcedure('GetReportDetailByDate', { PayDate });
};

exports.getRevenueOverviewByMonth = async (Month, Year) => {
  return await executeProcedure('GetReportOverviewByMonth', { Month, Year });
};

exports.getReportDetailByMonth = async (Month, Year) => {
  return await executeProcedure('GetReportDetailByMonth', { Month, Year });
};

exports.getRevenueOverviewByQuarter = async (Quarter, Year) => {
  return await executeProcedure('GetReportOverviewByQuarter', { Quarter, Year });
};

exports.getReportDetailByQuarter = async (Quarter, Year) => {
  return await executeProcedure('GetReportDetailByQuarter', { Quarter, Year });
};

exports.getRevenueOverviewByYear = async (Year) => {
  return await executeProcedure('GetReportOverviewByYear', { Year });
};

exports.getReportDetailByYear = async (Year) => {
  return await executeProcedure('GetReportDetailByYear', { Year });
};