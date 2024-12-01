const express = require("express");
const { getInvoices, addInvoice, deleteInvoice, updateInvoice } = require("../controllers/invoiceController");

const router = express.Router();

router.get("/", getInvoices);
router.post("/",addInvoice);
router.delete("/:id", deleteInvoice);
router.put("/:id", updateInvoice);
module.exports = router;
