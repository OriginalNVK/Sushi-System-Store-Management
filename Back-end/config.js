const express = require('express');

const config = {
    user: "sa",
    password: "123456",
    server: "LAPTOP-S3VQSE6D\\SQLEXPRESS",
    database: "SUSHISTORE_MANAGEMENT",
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    port: 1433
};

module.exports = config;