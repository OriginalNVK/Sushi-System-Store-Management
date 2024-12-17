const express = require("express");
const app = express();
const customerRoutes = require("./routes/customerRoutes");

app.use(express.json());

// Dùng route cho khách hàng
app.use("/api", customerRoutes);

// Cổng chạy server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
