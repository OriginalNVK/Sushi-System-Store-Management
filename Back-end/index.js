const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const customerRouter = require("./routes/customerRouter");
const cardCustomerRouter = require("./routes/cardCustomerRouter");

app.use(express.json());
app.use(cors());

// Route cho khách hàng
app.use("/api/customers", customerRouter);

// Route cho thẻ khách hàng
app.use("/api/cards", cardCustomerRouter);

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});