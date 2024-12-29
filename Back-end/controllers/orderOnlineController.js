const orderOnlineModel = require('../models/orderOnlineModel');

const getOrderOnline = async (req, res) => {
    try {
        const orders = await orderOnlineModel.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
};

const getOrderOnlinePendingOverview = async (req, res) => {
    try {
        const branchID = req.params.BranchID;
        const orders = await orderOnlineModel.getOrderOnlinePendingOverview(branchID);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const getOrderOnlinePendingDetail = async (req, res) => {
    const orderID = req.params.OrderID;
    try {
        const order = await orderOnlineModel.getOrderOnlinePendingDetail(orderID);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

const postOrderOnline = async (req, res) => {
    try {
        const newOrder = await orderOnlineModel.addOrder(req.body);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).send('Lỗi khi thêm đơn hàng: ' + err.message);
    }
};

const putOrderOnline = async (req, res) => {
  const { OrderID, EmployeeID } = req.body; // Giả sử OrderID và EmployeeID được gửi trong body
  // Kiểm tra dữ liệu đầu vào
  if (!OrderID || !EmployeeID) {
    return res.status(400).json({
      success: false,
      message: "OrderID và EmployeeID là bắt buộc.",
    });
  }

  try {
    const updatedOrder = await orderOnlineModel.updateOrder(
      OrderID,
      EmployeeID
    );

    if (updatedOrder.success) {
      return res.status(200).json({
        success: true,
        message: "Cập nhật đơn hàng thành công.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Đơn hàng không tồn tại hoặc cập nhật thất bại.",
      });
    }
  } catch (err) {
    console.error("Lỗi khi cập nhật đơn hàng:", err);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ: " + err.message,
    });
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
    getOrderOnlinePendingOverview,
    getOrderOnlinePendingDetail,
    postOrderOnline,
    putOrderOnline,
    deleteOrderOnline
};