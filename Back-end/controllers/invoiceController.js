const {
  getInvoices,
  addInvoice,
  deleteInvoiceById,
  updateInvoiceById,
  getInvoiceUnpaidByBranchID,
  getInvoiceDetail
} = require("../models/invoiceModels");

// Lấy tất cả hóa đơn
const getInvoicesController = async (req, res) => {
  try {
    const invoices = await getInvoices(); // Gọi phương thức từ models
    res.json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: "An error occurred while fetching invoices" });
  }
};

const getInvoicesByBranchIDController = async (req, res) => {
  try {
    const { branchID } = req.params;
    const invoices = await getInvoiceUnpaidByBranchID(branchID); // Gọi phương thức từ models
    res.status(200).json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: "An error occurred while fetching invoices" });
  }
}

const getInvoiceDetailController = async (req, res) => {  
  try {
    const { invoiceID } = req.params;
    const invoiceDetail = await getInvoiceDetail(invoiceID); // Gọi phương thức từ models
    res.status(200).json(invoiceDetail);
  }
  catch (err) {
    console.error("Error fetching invoice detail:", err);
    res.status(500).json({ error: "An error occurred while fetching invoice detail" });
  }
}

// Thêm hóa đơn mới
const addInvoiceController = async (req, res) => {
  try {
    const invoiceData = req.body;

    if (!invoiceData) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await addInvoice(invoiceData); // Gọi phương thức từ models
    res.status(201).json({ message: "Invoice added successfully", rowsAffected: result });
  } catch (err) {
    console.error("Error adding invoice:", err);
    res.status(500).json({ error: "An error occurred while adding the invoice" });
  }
};

// Cập nhật hóa đơn
const updateInvoiceController = async (req, res) => {
  try {
    const {paymentDate, invoiceID} = req.body;

    if (!invoiceID || !paymentDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const parsedDate = new Date(paymentDate);

    const result = await updateInvoiceById(invoiceID, parsedDate); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating invoice:", err);
    res.status(500).json({ error: "An error occurred while updating the invoice" });
  }
};

// Xóa hóa đơn
const deleteInvoiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteInvoiceById(id); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json({ message: `Invoice with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting invoice:", err);
    res.status(500).json({ error: "An error occurred while deleting the invoice" });
  }
};

module.exports = {
  getInvoicesController,
  getInvoicesByBranchIDController,
  addInvoiceController,
  updateInvoiceController,
  deleteInvoiceController,
  getInvoiceDetailController,
};
