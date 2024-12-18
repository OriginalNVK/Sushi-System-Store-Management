const { 
  getAllCardCustomers, 
  getCardCustomerById, 
  createCardCustomer, 
  deleteCardCustomer, 
  updateCardCustomer 
} = require("../models/cardCustomerModel");

// Lấy tất cả thẻ khách hàng
const getAllCards = async (req, res) => {
  try {
    const cards = await getAllCardCustomers(); // Gọi phương thức từ models
    res.json(cards);
  } catch (err) {
    console.error("Lỗi lấy thẻ khách hàng:", err);
    res.status(500).json({ error: "An error occurred while fetching cards", details: err.message });
  }
};

// Lấy thẻ theo ID
const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCardCustomerById(id); // Gọi phương thức từ models
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (err) {
    console.error("Error fetching card by ID:", err);
    res.status(500).json({ error: "An error occurred while fetching the card" });
  }
};

// Tạo thẻ mới
const createCard = async (req, res) => {
  try {
    const { CardID, CardEstablishDate, EmployeeID, Score, CardType } = req.body;
    if (!CardID || !CardEstablishDate || !EmployeeID || !Score || !CardType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newCard = { CardID, CardEstablishDate, EmployeeID, Score, CardType };
    const result = await createCardCustomer(newCard); // Gọi phương thức từ models
    res.status(201).json({ message: "Card created", id: result.insertId });
  } catch (err) {
    console.error("Error creating card:", err);
    res.status(500).json({ error: "An error occurred while creating the card" });
  }
};

// Cập nhật thẻ
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const cardData = req.body;
    if (!cardData) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await updateCardCustomer(id, cardData); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json({ message: `Card with ID ${id} updated successfully` });
  } catch (err) {
    console.error("Error updating card:", err);
    res.status(500).json({ error: "An error occurred while updating the card" });
  }
};

// Xóa thẻ
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCardCustomer(id); // Gọi phương thức từ models
    if (!result) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json({ message: `Card with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting card:", err);
    res.status(500).json({ error: "An error occurred while deleting the card" });
  }
};

module.exports = { getAllCards, getCardById, createCard, updateCard, deleteCard };
