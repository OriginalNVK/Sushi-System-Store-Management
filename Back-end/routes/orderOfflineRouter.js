const express = require("express");
const {
  getOrderOffline,
  postOrderOffline,
  putOrderOffline,
  deleteOrderOffline,
} = require("../controllers/orderOfflineControllers");

const router = express.Router();

// Define routes for offline orders
router.get("/", getOrderOffline); // Fetch all orders
router.post("/", postOrderOffline); // Create a new order
router.put("/:OrderID", putOrderOffline); // Update an existing order
router.delete("/:OrderID", deleteOrderOffline); // Delete an order

module.exports = router;
