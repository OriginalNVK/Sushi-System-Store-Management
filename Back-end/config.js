const express = require('express');

const config = {
    user: "sa",
    password: "123456",
    server: "LAPTOP-S3VQSE6D\\SQLEXPRESS",
    database: "SUSHISTORE_MANAGEMENT_MAIN_1999",
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    port: 1433
};

module.exports = config;