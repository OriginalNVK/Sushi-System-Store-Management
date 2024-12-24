const { getInvoiceCustomerDetails } = require("../models/invoiceCustomerDetailModel");

const fetchInvoiceCustomerDetails = async (req, res) => {
    try {
        const data = await getInvoiceCustomerDetails();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch invoice customer details." });
    }
};

module.exports = { fetchInvoiceCustomerDetails };