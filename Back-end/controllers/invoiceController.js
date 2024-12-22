const invoiceModel = require("../models/invoiceModel");

// Lấy danh sách hóa đơn cùng thông tin khách hàng
const getInvoicesWithCustomer = async (req, res) => {
    try {
        const invoices = await invoiceModel.getInvoicesWithCustomer();
        res.status(200).json({ invoices });
    } catch (err) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", err);
        res.status(500).send("Đã xảy ra lỗi khi lấy danh sách hóa đơn.");
    }
};

module.exports = {
    getInvoicesWithCustomer
};