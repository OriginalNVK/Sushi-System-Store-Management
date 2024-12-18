const sql = require("mssql");

const config = {
  user: "sa",
  password: "12345",
  server: "TH11\\SQLEXPRESS",
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
