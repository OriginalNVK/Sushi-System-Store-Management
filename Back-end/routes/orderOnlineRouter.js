const express = require("express");
const {
  getOrderOnline,
  postOrderOnline,
  putOrderOnline,
  deleteOrderOnline,
} = require("../controllers/orderOnlineController");

const router = express.Router();

// Define routes for online orders
router.get("/", getOrderOnline); // Fetch all orders
router.post("/", postOrderOnline); // Create a new order
router.put("/:OrderID", putOrderOnline); // Update an existing order
router.delete("/:OrderID", deleteOrderOnline); // Delete an order

module.exports = router;
