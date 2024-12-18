const express = require("express");
const router = express.Router();
const { 
  getAllCustomersController, 
  getCustomerByIdController, 
  createCustomerController, 
  updateCustomerController, 
  deleteCustomerController 
} = require("../controllers/customerController");

// Lấy danh sách khách hàng
router.get("/", getAllCustomersController);

// Lấy khách hàng theo ID
router.get("/:id", getCustomerByIdController);

// Thêm khách hàng mới
router.post("/", createCustomerController);

// Cập nhật thông tin khách hàng
router.put("/:id", updateCustomerController);

// Xóa khách hàng
router.delete("/:id", deleteCustomerController);

module.exports = router;
