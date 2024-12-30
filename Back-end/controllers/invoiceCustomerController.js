const { getInvoiceCustomer } = require("../models/invoiceCustomerModel");

const fetchInvoiceCustomer = async (req, res) => {
    try {
        const data = await getInvoiceCustomer();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch invoice customers." });
    }
};

module.exports = { fetchInvoiceCustomer };