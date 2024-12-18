const invoiceModel = require("../models/invoiceModels");

const getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceModel.getAllInvoices();
    res.json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: "An error occurred while fetching invoices" });
  }
};

const addInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    // Kiểm tra và định dạng ngày
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        return null;
      }
      return formattedDate.toISOString().split("T")[0];
    };

    invoiceData.PaymentDate = formatDate(invoiceData.PaymentDate);
    if (!invoiceData.PaymentDate) {
      return res.status(400).json({
        error: "PaymentDate must be a valid date format (YYYY-MM-DD)",
      });
    }

    const result = await invoiceModel.addInvoice(invoiceData);
    res.status(200).json({ message: "Invoice added successfully" });
  } catch (err) {
    console.error("Error adding invoice:", err);
    res.status(500).json({ error: "An error occurred while adding the invoice" });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await invoiceModel.deleteInvoiceById(id);

    if (!result) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json({ message: `Invoice with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting invoice:", err);
    res.status(500).json({ error: "An error occurred while deleting the invoice" });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceData = req.body;

    // Kiểm tra và định dạng ngày
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        return null;
      }
      return formattedDate.toISOString().split("T")[0];
    };

    invoiceData.PaymentDate = formatDate(invoiceData.PaymentDate);
    if (!invoiceData.PaymentDate) {
      return res.status(400).json({
        error: "PaymentDate must be a valid date format (YYYY-MM-DD)",
      });
    }

    const result = await invoiceModel.updateInvoiceById(id, invoiceData);
    if (!result) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json({ message: `Invoice with ID ${id} updated successfully` });
  } catch (err) {
    console.error("Error updating invoice:", err);
    res.status(500).json({ error: "An error occurred while updating the invoice" });
  }
};

module.exports = { getInvoices, addInvoice, deleteInvoice, updateInvoice };
