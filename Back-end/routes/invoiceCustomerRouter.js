const express = require("express");
const router = express.Router();
const { fetchInvoiceCustomer } = require("../controllers/invoiceCustomerController");

router.get("/", fetchInvoiceCustomer);

module.exports = router;