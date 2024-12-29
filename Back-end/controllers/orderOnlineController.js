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
        const { BranchID, NumberTable, CardID, AmountCustomer, DateOrder, TimeOrder, dishes } = req.body;

        if (!dishes || dishes.length === 0) {
            return res.status(400).json({
                Status: "Error",
                ErrorMessage: "Danh sách món ăn không được để trống.",
            });
        }

        const newOrder = await orderOnlineModel.addOrder({
            BranchID,
            NumberTable,
            CardID,
            AmountCustomer,
            DateOrder,
            TimeOrder,
            dishes: dishes
        });
        res.status(201).json({
            Status: "Success",
        });
    } catch (err) {
        res.status(500).json({
            Status: "Error",
            ErrorMessage: "Lỗi khi thêm đơn hàng: " + err.message,
        });
    }
};

const putOrderOnline = async (req, res) => {
    const orderID = req.body.OrderID; 
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
        res.status(204).send(); 
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