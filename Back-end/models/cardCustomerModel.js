const connectToDB = require("../db/dbConfig");
const sql = require("mssql");

// Lấy tất cả thẻ khách hàng
const getAllCardCustomers = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query("SELECT * FROM CARD_CUSTOMER");
  return result.recordset;
};

// Lấy thẻ khách hàng theo ID
const getCardCustomerById = async (cardID) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("CardID", sql.Int, cardID)
    .query("SELECT * FROM CARD_CUSTOMER WHERE CardID = @CardID");

  if (result.recordset.length === 0) {
    return null; // Card not found
  }

  return result.recordset[0];
};

// Thêm thẻ khách hàng
const createCardCustomer = async (cardCustomer) => {
  const pool = await connectToDB();
  await pool.request()
    .input("CardID", sql.Int, cardCustomer.CardID)
    .input("CardEstablishDate", sql.Date, cardCustomer.CardEstablishDate)
    .input("EmployeeID", sql.Int, cardCustomer.EmployeeID)
    .input("Score", sql.Int, cardCustomer.Score)
    .input("CardType", sql.NVarChar(255), cardCustomer.CardType)
    .query(
      `INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType) 
       VALUES (@CardID, @CardEstablishDate, @EmployeeID, @Score, @CardType)`
    );
};

// Xóa thẻ khách hàng
const deleteCardCustomer = async (cardID) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("CardID", sql.Int, cardID)
    .query("DELETE FROM CARD_CUSTOMER WHERE CardID = @CardID");

  return result.rowsAffected[0] > 0; // Return true if a row was deleted
};

// Cập nhật thẻ khách hàng
const updateCardCustomer = async (id, data) => {
  const {
    CardEstablishDate,
    EmployeeID,
    Score,
    CardType
  } = data;

  const pool = await connectToDB();

  const checkResult = await pool.request()
    .input("CardID", sql.Int, id)
    .query("SELECT * FROM CARD_CUSTOMER WHERE CardID = @CardID");

  if (checkResult.recordset.length === 0) {
    return false; // Card not found
  }

  await pool.request()
    .input("CardID", sql.Int, id)
    .input("CardEstablishDate", sql.Date, CardEstablishDate)
    .input("EmployeeID", sql.Int, EmployeeID)
    .input("Score", sql.Int, Score)
    .input("CardType", sql.NVarChar(255), CardType)
    .query(
      `UPDATE CARD_CUSTOMER 
       SET CardEstablishDate = @CardEstablishDate, 
           EmployeeID = @EmployeeID, 
           Score = @Score, 
           CardType = @CardType 
       WHERE CardID = @CardID`
    );

  return true; // Update successful
};

module.exports = {
  getAllCardCustomers,
  getCardCustomerById,
  createCardCustomer,
  deleteCardCustomer,
  updateCardCustomer
};
