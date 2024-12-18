const { getAllOrders, addOrder, updateOrder, deleteOrder } = require('../models/orderOnlineModel');

const getOrderOnline = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching online orders:", err);
    res.status(500).json({ error: "An error occurred while fetching online orders" });
  }
};

const postOrderOnline = async (req, res) => {
  try {
    const newOrder = await addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error adding new order:", err);
    res.status(500).json({ error: "An error occurred while adding the order" });
  }
};

const putOrderOnline = async (req, res) => {
  const { OrderID } = req.body; // Giả sử OrderID được gửi trong body
  try {
    if (!OrderID) {
      return res.status(400).json({ error: "OrderID is required" });
    }

    const updatedOrder = await updateOrder(OrderID, req.body);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: `Order with ID ${OrderID} updated successfully` });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "An error occurred while updating the order" });
  }
};

const deleteOrderOnline = async (req, res) => {
  const { OrderID } = req.params;
  try {
    if (!OrderID) {
      return res.status(400).json({ error: "OrderID is required" });
    }

    const result = await deleteOrder(OrderID);

    if (!result) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: `Order with ID ${OrderID} deleted successfully` });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "An error occurred while deleting the order" });
  }
};

module.exports = { getOrderOnline, postOrderOnline, putOrderOnline, deleteOrderOnline };
