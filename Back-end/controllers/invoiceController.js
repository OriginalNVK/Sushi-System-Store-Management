const { 
  getInvoices, 
  addInvoice, 
  deleteInvoiceById, 
  updateInvoiceById 
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
    const { id } = req.params;
    const invoiceData = req.body;

    if (!invoiceData) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await updateInvoiceById(id, invoiceData); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json({ message: `Invoice with ID ${id} updated successfully` });
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
  addInvoiceController, 
  updateInvoiceController, 
  deleteInvoiceController 
};
