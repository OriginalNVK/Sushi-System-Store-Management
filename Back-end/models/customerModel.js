const sql = require("mssql");
const config = require("../db/dbConfig");

// Lấy tất cả Customer
const getAllCustomers = async () => {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query("SELECT * FROM CUSTOMER");
        return customers.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy tất cả Customer:", err);
        throw err;
    }
};

// Lấy Customer theo ID
const getCustomerById = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("SELECT * FROM CUSTOMER WHERE CardID = @CardID");
        return customer.recordset[0];
    } catch (err) {
        console.error("Lỗi khi lấy Customer theo ID:", err);
        throw err;
    }
};

// Thêm mới Customer
const createCustomer = async (customer) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("CardID", sql.Int, customer.CardID)
            .input("CustomerName", sql.NVarChar, customer.CustomerName)
            .input("CustomerEmail", sql.NVarChar, customer.CustomerEmail)
            .input("CustomerGender", sql.NVarChar, customer.CustomerGender)
            .input("CustomerPhone", sql.Char, customer.CustomerPhone)
            .input("CCCD", sql.Char, customer.CCCD)
            .query(`INSERT INTO CUSTOMER (CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD) 
                    VALUES (@CardID, @CustomerName, @CustomerEmail, @CustomerGender, @CustomerPhone, @CCCD)`);
    } catch (err) {
        console.error("Lỗi khi thêm mới Customer:", err);
        throw err;
    }
};

// Cập nhật Customer
const updateCustomer = async (cardID, customer) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("CardID", sql.Int, cardID)
            .input("CustomerName", sql.NVarChar, customer.CustomerName)
            .input("CustomerEmail", sql.NVarChar, customer.CustomerEmail)
            .query(`UPDATE CUSTOMER 
                    SET CustomerName = @CustomerName, CustomerEmail = @CustomerEmail 
                    WHERE CardID = @CardID`);
    } catch (err) {
        console.error("Lỗi khi cập nhật Customer:", err);
        throw err;
    }
};

// Xóa Customer
const deleteCustomer = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("DELETE FROM CUSTOMER WHERE CardID = @CardID");
    } catch (err) {
        console.error("Lỗi khi xóa Customer:", err);
        throw err;
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};