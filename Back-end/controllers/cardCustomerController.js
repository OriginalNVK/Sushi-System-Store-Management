const db = require("../db/dbConfig");

// Lấy tất cả thẻthẻ
exports.getAllCards = (req, res) => {
  const query = "SELECT * FROM CARD_CUSTOMER";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Lấy thẻ theo IDID
exports.getCardById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM CARD_CUSTOMER WHERE CardID = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

// Tạo thẻ mới
exports.createCard = (req, res) => {
  const { CardID, CardEstablishDate, EmployeeID, Score, CardType } = req.body;
  const query = "INSERT INTO CARD_CUSTOMER SET ?";
  const newCard = { CardID, CardEstablishDate, EmployeeID, Score, CardType };

  db.query(query, newCard, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Card created", id: result.insertId });
  });
};

// Cập nhật thẻ
exports.updateCard = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const query = "UPDATE CARD_CUSTOMER SET ? WHERE CardID = ?";
  db.query(query, [updates, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Card updated successfully" });
  });
};

// Xóa thẻ
exports.deleteCard = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM CARD_CUSTOMER WHERE CardID = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Card deleted successfully" });
  });
};