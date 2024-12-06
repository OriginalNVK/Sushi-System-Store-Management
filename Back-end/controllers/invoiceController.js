const connectToDB = require("../db/dbConfig");
const sql = require("mssql");
const getInvoices = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query("SELECT * FROM INVOICE");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: "An error occurred while fetching invoices" });
  }
};

const addInvoice = async (req, res) => {
  try {
    // Lấy dữ liệu từ body của request
    const {
      CardID,
      TotalMoney,
      DiscountMoney,
      PaymentDate,
      OrderID,
      InvoiceID,
    } = req.body;

    // Kiểm tra và định dạng ngày tháng
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        return null;
      }
      return formattedDate.toISOString().split('T')[0]; // trả về định dạng YYYY-MM-DD
    };

    const formattedPaymentDate = formatDate(PaymentDate);

    if (!formattedPaymentDate) {
      return res.status(400).json({
        error: "PaymentDate must be a valid date format (YYYY-MM-DD)",
      });
    }

    // Kết nối tới cơ sở dữ liệu
    const pool = await connectToDB();

    // Câu lệnh SQL để thêm hóa đơn
    const sqlQuery = `
      INSERT INTO INVOICE (InvoiceID, CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID)
      VALUES (@InvoiceID, @CardID, @TotalMoney, @DiscountMoney, @PaymentDate, @OrderID)
    `;

    // Thực thi câu lệnh SQL
    const result = await pool.request()
      .input('InvoiceID', sql.Int, InvoiceID)
      .input('CardID', sql.Int, CardID)
      .input('TotalMoney', sql.Decimal(18, 2), TotalMoney)
      .input('DiscountMoney', sql.Decimal(18, 2), DiscountMoney)
      .input('PaymentDate', sql.Date, formattedPaymentDate)
      .input('OrderID', sql.Int, OrderID)
      .query(sqlQuery);

    // Nếu thêm thành công, trả về phản hồi
    res.status(200).json({
      message: "Invoice added successfully",
    });
  } catch (err) {
    // Trả về lỗi nếu có lỗi xảy ra
    res.status(500).json({
      error: err.message,
    });
  }
};

  // Hàm xóa hóa đơn
const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params; // Lấy InvoiceID từ URL

    const pool = await connectToDB();

    const checkResult = await pool.request()
      .input("InvoiceID", sql.Int, id)
      .query("SELECT * FROM INVOICE WHERE InvoiceID = @InvoiceID");

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    await pool.request()
      .input("InvoiceID", sql.Int, id)
      .query("DELETE FROM INVOICE WHERE InvoiceID = @InvoiceID");

    res.status(200).json({ message: `Invoice with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting invoice:", err);
    res.status(500).json({ error: "An error occurred while deleting the invoice" });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params; // Lấy InvoiceID từ URL
    const { CardID, TotalMoney, DiscountMoney, PaymentDate, OrderID } = req.body; // Lấy dữ liệu từ body

    // Kiểm tra dữ liệu đầu vào
    if (!CardID || !TotalMoney || !DiscountMoney || !PaymentDate || !OrderID) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Kiểm tra và định dạng ngày
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        return null;
      }
      return formattedDate.toISOString().split("T")[0]; // trả về định dạng YYYY-MM-DD
    };

    const formattedPaymentDate = formatDate(PaymentDate);

    if (!formattedPaymentDate) {
      return res.status(400).json({
        error: "PaymentDate must be a valid date format (YYYY-MM-DD)",
      });
    }

    const pool = await connectToDB();

    // Kiểm tra xem InvoiceID có tồn tại không
    const checkResult = await pool.request()
      .input("InvoiceID", sql.Int, id)
      .query("SELECT * FROM INVOICE WHERE InvoiceID = @InvoiceID");

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Thực hiện cập nhật thông tin
    await pool.request()
      .input("InvoiceID", sql.Int, id)
      .input("CardID", sql.Int, CardID)
      .input("TotalMoney", sql.Int, TotalMoney)
      .input("DiscountMoney", sql.Int, DiscountMoney)
      .input("PaymentDate", sql.Date, formattedPaymentDate)
      .input("OrderID", sql.Int, OrderID)
      .query(
        `UPDATE INVOICE
         SET CardID = @CardID,
             TotalMoney = @TotalMoney,
             DiscountMoney = @DiscountMoney,
             PaymentDate = @PaymentDate,
             OrderID = @OrderID
         WHERE InvoiceID = @InvoiceID`
      );

    res.status(200).json({
      message: `Invoice with ID ${id} updated successfully`,
    });
  } catch (err) {
    console.error("Error updating invoice:", err);
    res.status(500).json({
      error: "An error occurred while updating the invoice",
    });
  }
};


module.exports = { getInvoices, addInvoice, deleteInvoice, updateInvoice };
