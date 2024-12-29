const express = require("express");
const { 
  getInvoicesController, 
  addInvoiceController, 
  deleteInvoiceController, 
  updateInvoiceController,
  getInvoicesByBranchIDController,
  getInvoiceDetailController,
} = require("../controllers/invoiceController");

const router = express.Router();

router.get("/", getInvoicesController);
router.get("/branch/:branchID", getInvoicesByBranchIDController);
router.get("/detail/:invoiceID", getInvoiceDetailController);
router.post("/", addInvoiceController);
router.delete("/:id", deleteInvoiceController);
router.put("/:id", updateInvoiceController);

module.exports = router;
