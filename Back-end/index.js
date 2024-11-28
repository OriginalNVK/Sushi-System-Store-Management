const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
    user: "sa",
    password: "1303",
    server: "DESKTOP-EKEQ0IF\\SQLEXPRESS",
    database: "QUANLINHAHANGSUSHI",
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    port: 1433
};

app.get('/', (req, res) => {
    return res.json("Hi, I am back");
});

app.get('/area', async function (req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM AREA");
        return res.json(result.recordset);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "An error occurred" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
