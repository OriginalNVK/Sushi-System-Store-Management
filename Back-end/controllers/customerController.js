const { sql, poolPromise } = require("../db/dbConfig");

// Lấy danh sách khách hàng
const getAllCustomers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM CUSTOMER");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllCustomers };