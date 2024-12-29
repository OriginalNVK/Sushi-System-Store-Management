const sql = require("mssql");

const config = {
  user: "sa",
  password: "1303",
  server: "DESKTOP-EKEQ0IF\\SQLEXPRESS",
  database: "SUSHISTORE_MANAGEMENT",
  options: {
    enableArithAbort: true,
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true // Change to true for local dev / self-signed certs
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
