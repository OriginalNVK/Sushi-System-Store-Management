const express = require("express");
const { 
  getInvoicesController, 
  addInvoiceController, 
  deleteInvoiceController, 
  updateInvoiceController 
} = require("../controllers/invoiceController");

const router = express.Router();

router.get("/", getInvoicesController);
router.post("/", addInvoiceController);
router.delete("/:id", deleteInvoiceController);
router.put("/:id", updateInvoiceController);

module.exports = router;
