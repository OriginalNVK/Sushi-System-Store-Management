const { 
  getAllCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} = require("../models/customerModel");

// Lấy tất cả khách hàng
const getAllCustomersController = async (req, res) => {
  const { BranchID } = req.params;
  try {
    const customers = await getAllCustomers(BranchID); // Gọi phương thức từ models
    res.json(customers);
  } catch (err) {
    console.error("Lỗi lấy khách hàng:", err);
    res.status(500).json({ error: "An error occurred while fetching customers", details: err.message });
  }
};

// Lấy khách hàng theo ID
const getCustomerByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerById(id); // Gọi phương thức từ models
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    console.error("Error fetching customer by ID:", err);
    res.status(500).json({ error: "An error occurred while fetching the customer" });
  }
};

// Tạo khách hàng mới
const createCustomerController = async (req, res) => {
  try {
    const { CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD } = req.body;
    if (!CardID || !CustomerName || !CustomerEmail || !CustomerGender || !CustomerPhone || !CCCD) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newCustomer = { CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD };
    const result = await createCustomer(newCustomer); // Gọi phương thức từ models
    res.status(201).json({ message: "Customer created successfully", id: result.insertId });
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ error: "An error occurred while creating the customer" });
  }
};

// Cập nhật thông tin khách hàng
const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    const customerData = req.body;
    if (!customerData) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await updateCustomer(id, customerData); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: `Customer with ID ${id} updated successfully` });
  } catch (err) {
    console.error("Error updating customer:", err);
    res.status(500).json({ error: "An error occurred while updating the customer" });
  }
};

// Xóa khách hàng
const deleteCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCustomer(id); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: `Customer with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting customer:", err);
    res.status(500).json({ error: "An error occurred while deleting the customer" });
  }
};

module.exports = { 
  getAllCustomersController, 
  getCustomerByIdController, 
  createCustomerController, 
  updateCustomerController, 
  deleteCustomerController 
};
