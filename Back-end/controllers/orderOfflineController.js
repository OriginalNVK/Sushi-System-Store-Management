const orderOfflineModel = require('../models/orderOfflineModel');

const getOrderOffline = async (req, res) => {
    try {
        const orders = await orderOfflineModel.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
};

const postOrderOffline = async (req, res) => {
    try {
        const newOrder = await orderOfflineModel.addOrder(req.body);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).send('Lỗi khi thêm đơn hàng: ' + err.message);
    }
};

const putOrderOffline = async (req, res) => {
    const orderID = req.body.OrderID; // Giả sử OrderID được gửi trong body
    try {
        const updatedOrder = await orderOfflineModel.updateOrder(orderID, req.body);
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).send('Lỗi khi cập nhật đơn hàng: ' + err.message);
    }
};

const deleteOrderOffline = async (req, res) => {
    const orderID = req.params.OrderID;
    try {
        await orderOfflineModel.deleteOrder(orderID);
        res.status(204).send(); // Trả về 204 No Content
    } catch (err) {
        res.status(500).send('Lỗi khi xóa đơn hàng: ' + err.message);
    }
};

module.exports = {
    getOrderOffline,
    postOrderOffline,
    putOrderOffline,
    deleteOrderOffline
};