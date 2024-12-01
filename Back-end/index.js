const express = require("express");
const cors = require("cors");

const branchRoutes = require("./routes/branchRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
