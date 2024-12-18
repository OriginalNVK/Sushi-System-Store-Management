const express = require("express");
const router = express.Router();
const { getAllCustomers } = require("../controllers/customerController");

router.get("/", getAllCustomers);

module.exports = router;