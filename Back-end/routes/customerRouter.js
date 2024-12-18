const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// Lấy danh sách khách hàng
router.get("/", getAllCustomers);

// Thêm khách hàng mới
router.post("/", createCustomer);

// Cập nhật thông tin khách hàng
router.put("/:id", updateCustomer);

// Xóa khách hàng
router.delete("/:id", deleteCustomer);

module.exports = router;