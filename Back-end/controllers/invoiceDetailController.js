const invoiceDetailModel = require("../models/invoiceDetailModel");

// Lấy chi tiết hóa đơn cùng danh sách món ăn
const getInvoiceDetails = async (req, res) => {
    try {
        const invoiceDetails = await invoiceDetailModel.getInvoiceDetails();
        res.status(200).json({ invoiceDetails });
    } catch (err) {
        console.error("Lỗi khi lấy chi tiết hóa đơn:", err);
        res.status(500).send("Đã xảy ra lỗi khi lấy chi tiết hóa đơn.");
    }
};

module.exports = {
    getInvoiceDetails
};