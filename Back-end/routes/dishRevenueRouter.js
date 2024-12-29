const express = require("express");
const { updateDishRevenue } = require("../controllers/dishRevenueController");

const router = express.Router();

router.post("/update-dish-revenue", updateDishRevenue);

module.exports = router;