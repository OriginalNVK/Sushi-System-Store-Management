const orderOnlineModel = require('../models/orderOnlineModel');

const getOrderOnline = async (req, res) => {
    try {
        const orders = await orderOnlineModel.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
};

const postOrderOnline = async (req, res) => {
    try {
        const newOrder = await orderOnlineModel.addOrder(req.body);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).send('Lỗi khi thêm đơn hàng: ' + err.message);
    }
};

const putOrderOnline = async (req, res) => {
    const orderID = req.body.OrderID; // Giả sử OrderID được gửi trong body
    try {
        const updatedOrder = await orderOnlineModel.updateOrder(orderID, req.body);
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).send('Lỗi khi cập nhật đơn hàng: ' + err.message);
    }
};

const deleteOrderOnline = async (req, res) => {
    const orderID = req.params.OrderID;
    try {
        await orderOnlineModel.deleteOrder(orderID);
        res.status(204).send(); // Trả về 204 No Content
    } catch (err) {
        res.status(500).send('Lỗi khi xóa đơn hàng: ' + err.message);
    }
};

module.exports = {
    getOrderOnline,
    postOrderOnline,
    putOrderOnline,
    deleteOrderOnline
};