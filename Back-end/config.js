const express = require('express');

const config = {
    user: "sa",
    password: "1303",
    server: "DESKTOP-EKEQ0IF\\SQLEXPRESS",
    database: "SUSHISTORE_MANAGEMENT",
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    port: 1433
};

module.exports = config;