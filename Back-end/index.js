const express = require("express");
const cors = require("cors");

const branchRoutes = require("./routes/branchRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const orderOfflineRouter = require('./routes/orderOfflineRouter');
const orderOnlineRouter = require('./routes/orderOnlineRouter');
const dishRouter = require('./routes/dishRouter.js');
const employeeRouter = require('./routes/employeeRouter.js');
const customerRoutes = require("./routes/customerRouter");
const cardCustomerRouter = require("./routes/cardCustomerRouter");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/branch", branchRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/api/order-offline", orderOfflineRouter);
app.use("/api/order-online", orderOnlineRouter);
app.use("/dishes", dishRouter);
app.use("/employees", employeeRouter);
app.use("/api/customers", customerRoutes);
app.use("/api/cards", cardCustomerRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
