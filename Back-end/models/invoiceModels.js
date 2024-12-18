const connectToDB = require("../db/dbConfig");
const sql = require("mssql");

const getInvoices = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query("SELECT * FROM INVOICE");
  return result.recordset;
};

const addInvoice = async (invoiceData) => {
  const {
    CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID, InvoiceID
  } = invoiceData;

  const pool = await connectToDB();
  const result = await pool.request()
    .input('InvoiceID', sql.Int, InvoiceID)
    .input('CardID', sql.Int, CardID)
    .input('TotalMoney', sql.Decimal(18, 2), TotalMoney)
    .input('DiscountMoney', sql.Decimal(18, 2), DiscountMoney)
    .input('PaymentDate', sql.Date, PaymentDate)
    .input('OrderID', sql.Int, OrderID)
    .query(`
      INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID)
      VALUES (@InvoiceID, @CardID, @TotalMoney, @DiscountMoney, @PaymentDate, @OrderID)
    `);

  return result.rowsAffected;
};

const deleteInvoiceById = async (id) => {
  const pool = await connectToDB();

  const checkResult = await pool.request()
    .input("InvoiceID", sql.Int, id)
    .query("SELECT * FROM INVOICE WHERE InvoiceID = @InvoiceID");

  if (checkResult.recordset.length === 0) {
    return null; // Không tìm thấy
  }

  await pool.request()
    .input("InvoiceID", sql.Int, id)
    .query("DELETE FROM INVOICE WHERE InvoiceID = @InvoiceID");

  return true; // Xóa thành công
};

const updateInvoiceById = async (id, invoiceData) => {
  const { CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID } = invoiceData;

  const pool = await connectToDB();

  const checkResult = await pool.request()
    .input("InvoiceID", sql.Int, id)
    .query("SELECT * FROM INVOICE WHERE InvoiceID = @InvoiceID");

  if (checkResult.recordset.length === 0) {
    return null; // Không tìm thấy
  }

  await pool.request()
    .input("InvoiceID", sql.Int, id)
    .input("CardID", sql.Int, CardID)
    .input("TotalMoney", sql.Decimal(18, 2), TotalMoney)
    .input("DiscountMoney", sql.Decimal(18, 2), DiscountMoney)
    .input("PaymentDate", sql.Date, PaymentDate)
    .input("OrderID", sql.Int, OrderID)
    .query(`
      UPDATE INVOICE
      SET CardID = @CardID,
          TotalMoney = @TotalMoney,
          DiscountMoney = @DiscountMoney,
          PaymentDate = @PaymentDate,
          OrderID = @OrderID
      WHERE InvoiceID = @InvoiceID
    `);

  return true; // Cập nhật thành công
};

module.exports = {
  getInvoices,
  addInvoice,
  deleteInvoiceById,
  updateInvoiceById,
};
