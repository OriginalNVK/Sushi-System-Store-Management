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
        const {EmployeeID, NumberTable, CardID, BranchID, dishes, OrderEstablishDate } = req.body;

        if (!dishes || dishes.length === 0) {
            return res.status(400).json({
                Status: "Error",
                ErrorMessage: "Danh sách món ăn không được để trống.",
            });
        }

        const dishNames = dishes.map((dish) => dish.dishName).join(",");
        const dishAmounts = dishes.map((dish) => dish.dishAmount).join(",");

        const newOrder = await orderOfflineModel.addOrder({
            EmployeeID, 
            NumberTable, 
            CardID, 
            BranchID, 
            DishNames: dishNames,
            DishAmounts: dishAmounts,
            OrderEstablishDate
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

const putOrderOffline = async (req, res) => {
    const orderID = req.body.OrderID; 
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