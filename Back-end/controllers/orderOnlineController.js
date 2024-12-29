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

const getOrderPendingDetail = async (req, res) => {
    const orderID = req.params.OrderID;
    try {
        const order = await orderOnlineModel.getOrderPendingDetail(orderID);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).send('Lỗi khi lấy dữ liệu: ' + err.message);
    }
}

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
        res.status(204).send(); 
    } catch (err) {
        res.status(500).send('Lỗi khi xóa đơn hàng: ' + err.message);
    }
};

module.exports = {
    getOrderOnline,
    getOrderOnlinePendingOverview,
    getOrderPendingDetail,
    postOrderOnline,
    putOrderOnline,
    deleteOrderOnline
};