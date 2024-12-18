const { getAllCustomers } = require("../models/customerModel");

// Lấy danh sách khách hàng
const getAllCustomersController = async (req, res) => {
  try {
    const customers = await getAllCustomers(); // Gọi từ model
    res.json(customers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getAllCustomersController };
