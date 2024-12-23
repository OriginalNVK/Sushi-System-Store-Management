const connectToDB = require("../utils/connectToDB");
const sql = require("mssql");

const getDepartmentModel = async () => {
    const pool = await connectToDB();
    const result = await pool.request().query(`
        SELECT 
            DepartmentName,
        FROM 
            DEPARTMENT;
    `);
}