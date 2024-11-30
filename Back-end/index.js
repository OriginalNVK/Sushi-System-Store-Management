const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const employeeRouter = require('./router/employeeRouter.js');
const dishRouter = require('./router/dishRouter.js');

const app = express();
app.use(cors());

app.use('', employeeRouter);
app.use('', dishRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
