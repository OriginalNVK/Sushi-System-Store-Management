const express = require("express");
const router = express.Router();
const { getAllCustomersController } = require("../controllers/customerController"); // Đảm bảo gọi đúng hàm

router.get("/customers", getAllCustomersController); // Gọi hàm đúng

module.exports = router;
