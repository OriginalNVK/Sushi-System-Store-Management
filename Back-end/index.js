const express = require("express");
const cors = require("cors");

const branchRoutes = require("./routes/branchRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const orderOfflineRouter = require('./routes/orderOfflineRouter');
const orderOnlineRouter = require('./routes/orderOnlineRouter');
const dishRouter = require('./routes/dishRouter');
const employeeRouter = require('./routes/employeeRouter');
const customerRoutes = require("./routes/customerRouter");
const cardCustomerRouter = require("./routes/cardCustomerRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const departmentRouter = require("./routes/departmentRouter");
const reportRouter = require("./routes/reportRouter");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api/branch", branchRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/order-offline", orderOfflineRouter);
app.use("/api/order-online", orderOnlineRouter);
app.use("/api/dishes", dishRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/customers", customerRoutes);
app.use("/api/cards", cardCustomerRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/departments", departmentRouter);  
app.use("/api/report", reportRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
