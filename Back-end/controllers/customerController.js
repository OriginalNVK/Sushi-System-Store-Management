const { sql, poolPromise } = require("../db/dbConfig");
const customerModel = require("../models/customerModel");

// Lấy danh sách khách hàng
const getAllCustomers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const pool = await poolPromise;
    const offset = (page - 1) * pageSize;
    const query = `
      SELECT * FROM CUSTOMER 
      ORDER BY CardID 
      OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY
    `;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Thêm khách hàng mới
const createCustomer = async (req, res) => {
  const { CustomerID, CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD } = req.body;
  try {
    const pool = await poolPromise;
    const query = `
      INSERT INTO CUSTOMER (CustomerID, CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD)
      VALUES (@CustomerID, @CardID, @CustomerName, @CustomerEmail, @CustomerGender, @CustomerPhone, @CCCD)
    `;
    await pool.request()
      .input("CustomerID", sql.Int, CustomerID)
      .input("CardID", sql.Int, CardID)
      .input("CustomerName", sql.NVarChar, CustomerName)
      .input("CustomerEmail", sql.NVarChar, CustomerEmail)
      .input("CustomerGender", sql.NVarChar, CustomerGender)
      .input("CustomerPhone", sql.Char, CustomerPhone)
      .input("CCCD", sql.Char, CCCD)
      .query(query);

    res.status(201).send({ message: "Customer created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Cập nhật thông tin khách hàng
const updateCustomer = async (req, res) => {
  const { id } = req.params; // id là CustomerID
  const { CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD } = req.body;
  try {
    const pool = await poolPromise;
    const query = `
      UPDATE CUSTOMER
      SET CardID = @CardID,
          CustomerName = @CustomerName,
          CustomerEmail = @CustomerEmail,
          CustomerGender = @CustomerGender,
          CustomerPhone = @CustomerPhone,
          CCCD = @CCCD
      WHERE CustomerID = @CustomerID
    `;
    const result = await pool.request()
      .input("CustomerID", sql.Int, id)
      .input("CardID", sql.Int, CardID)
      .input("CustomerName", sql.NVarChar, CustomerName)
      .input("CustomerEmail", sql.NVarChar, CustomerEmail)
      .input("CustomerGender", sql.NVarChar, CustomerGender)
      .input("CustomerPhone", sql.Char, CustomerPhone)
      .input("CCCD", sql.Char, CCCD)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.send({ message: "Customer updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Xóa khách hàng (DELETE)
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const query = `
      DELETE FROM CUSTOMER
      WHERE CustomerID = @CustomerID
    `;
    const result = await pool.request()
      .input("CustomerID", sql.Int, id)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.send({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};