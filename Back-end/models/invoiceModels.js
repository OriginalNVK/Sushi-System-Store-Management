const connectToDB = require("../db/dbConfig");
const sql = require("mssql");

const getInvoices = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query("SELECT * FROM INVOICE");
  return result.recordset;
};

const getInvoiceUnpaidByBranchID = async (branchID) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("BranchID", sql.Int, branchID)
    .execute("GetInvoiceUnpaidByBranchID");
  
  return result.recordset;
}

const getInvoiceDetail = async (invoiceID) => {
  const pool = await connectToDB();
  const result = await pool
    .request()
    .input("INVOICEID", sql.Int, invoiceID)
    .execute("GetInvoiceDetail");
  
  const dishDetail = result.recordset.map((dish) => {
    return {
      dishName: dish.DishName,
      quantity: dish.QUANTITY,
      amount: dish.AMOUNT,
    };
  })
  
  const detail = {
    invoiceId: result.recordset[0].INVOICEID,
    invoiceDate: result.recordset[0].PaymentDate,
    totalMoney: result.recordset[0].TotalMoney,
    discountMoney: result.recordset[0].DiscountMoney,
    customerName: result.recordset[0].CustomerName,
    customerEmail: result.recordset[0].CustomerEmail,
    dishDetail: dishDetail,
  };
  
  return detail;  
}
const addInvoice = async (invoiceData) => {
  const { CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID } =
    invoiceData;

  const pool = await connectToDB();
  try {
    // Lấy giá trị InvoiceID lớn nhất hiện tại
    const maxInvoiceIDResult = await pool.request().query(`
      SELECT ISNULL(MAX(InvoiceID), 0) + 1 AS NewInvoiceID FROM INVOICE
    `);

    // Tính toán InvoiceID mới
    const newInvoiceID = maxInvoiceIDResult.recordset[0].NewInvoiceID;

    // Thực hiện thêm hóa đơn mới
    const result = await pool
      .request()
      .input("InvoiceID", sql.Int, newInvoiceID) // Sử dụng InvoiceID mới
      .input("CardID", sql.Int, CardID)
      .input("TotalMoney", sql.Decimal(18, 2), TotalMoney)
      .input("DiscountMoney", sql.Decimal(18, 2), DiscountMoney)
      .input("PaymentDate", sql.Date, PaymentDate)
      .input("OrderID", sql.Int, OrderID).query(`
        INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID)
        VALUES (@InvoiceID, @CardID, @TotalMoney, @DiscountMoney, @PaymentDate, @OrderID)
      `);

    return {
      success: true,
      message: "Invoice added successfully",
      rowsAffected: result.rowsAffected,
      newInvoiceID,
    };
  } catch (error) {
    console.error("Error adding invoice:", error);
    return {
      success: false,
      message: "Internal Server Error",
      error: error.message,
    };
  } finally {
    if (pool) pool.close(); // Đảm bảo đóng kết nối
  }
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

const updateInvoiceById = async (id, date) => {

  const pool = await connectToDB();
    try {
      const result = await pool
        .request()
        .input("InvoiceID", sql.Int, id)
        .input("paymentDate", sql.Date, date).query(`
        UPDATE INVOICE 
        SET PaymentDate = @paymentDate 
        WHERE InvoiceID = @InvoiceID
      `);
      return { success: true, message: "Invoice updated successfully" };
  }
  catch (error) {
    console.error("Error during updateInvoice request:", error);
    return { success: false, error: error.message || "Network error" };
  }
};

module.exports = {
  getInvoices,
  getInvoiceUnpaidByBranchID,
  getInvoiceDetail,
  addInvoice,
  deleteInvoiceById,
  updateInvoiceById,
};
