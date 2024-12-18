const { sql, poolPromise } = require("../db/dbConfig");
const customerModel = require("../models/customerModel");

// Lấy danh sách khách hàng
const getAllCustomers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const pool = await poolPromise;
    const offset = (page - 1) * pageSize;
    const query = `SELECT * FROM CUSTOMER 
                   ORDER BY CardID 
                   OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllCustomers };
