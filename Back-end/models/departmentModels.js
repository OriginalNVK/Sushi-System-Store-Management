const connectToDB = require("../db/dbConfig");
const sql = require("mssql");

const getDepartmentModel = async () => {
    const pool = await connectToDB();
    const result = await pool.request().query(`
        SELECT DISTINCT DepartmentName FROM DEPARTMENT
    `);
    return result.recordset
}

module.exports = {getDepartmentModel}
