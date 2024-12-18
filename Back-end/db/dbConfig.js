const sql = require("mssql");

const config = {
  user: "sa",
  password: "27072004",
  server: "ORIGINALNVK\SQLEXPRESS",
  database: "SUSHISTORE_MANAGEMENT",
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: 1433,
};

const connectToDB = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};

module.exports = connectToDB;
