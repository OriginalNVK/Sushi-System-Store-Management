const express = require('express');
const cors = require('cors');
const orderOnlineRouter = require('./routes/orderOnlineRouter');
const orderOfflineRouter = require('./routes/orderOfflineRouter');

const app = express();

app.use(cors());
app.use(express.json()); // Xử lý dữ liệu JSON từ client

// Định nghĩa các route cho đơn hàng online và offline
app.use('/api/order-online', orderOnlineRouter);
app.use('/api/order-offline', orderOfflineRouter);

app.listen(3000, () => {
    console.log("Server đang chạy trên cổng 3000");
});
