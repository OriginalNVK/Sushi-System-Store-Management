const express = require("express");
const router = express.Router();
const { fetchInvoiceCustomerDetails } = require("../controllers/invoiceCustomerDetailController");

router.get("/", fetchInvoiceCustomerDetails);

module.exports = router;