const { updateDishRevenueInDB } = require("../models/dishRevenueModel");

const updateDishRevenue = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice ID is required" });
    }

    const result = await updateDishRevenueInDB(invoiceId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(500).json({ message: result.message, error: result.error });
    }
  } catch (error) {
    console.error("Error in controller:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { updateDishRevenue };