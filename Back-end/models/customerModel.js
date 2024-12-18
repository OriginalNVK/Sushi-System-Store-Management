const sql = require("mssql");
const connectToDB = require("../db/dbConfig")

// Lấy tất cả khách hàng
const getAllCustomers = async () => {
    try {
        const pool = await connectToDB();
        if (!pool) {
            throw new Error("Không thể kết nối với cơ sở dữ liệu");
        }
        let result = await pool.request().query("SELECT * FROM CUSTOMER");
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy tất cả khách hàng:", err.message);
        throw new Error("Không thể lấy danh sách khách hàng.");
    }
};

// Lấy khách hàng theo ID
const getCustomerById = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("SELECT * FROM CUSTOMER WHERE CardID = @CardID");

        if (result.recordset.length === 0) {
            throw new Error(`Không tìm thấy khách hàng với ID: ${cardID}`);
        }

        return result.recordset[0];
    } catch (err) {
        console.error(`Lỗi khi lấy khách hàng có ID ${cardID}:`, err.message);
        throw err;
    }
};

// Thêm mới khách hàng
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
            .query(`
                INSERT INTO CUSTOMER (CardID, CustomerName, CustomerEmail, CustomerGender, CustomerPhone, CCCD)
                VALUES (@CardID, @CustomerName, @CustomerEmail, @CustomerGender, @CustomerPhone, @CCCD)
            `);
    } catch (err) {
        console.error("Lỗi khi thêm mới khách hàng:", err.message);
        throw new Error("Không thể thêm mới khách hàng.");
    }
};

// Cập nhật khách hàng
const updateCustomer = async (cardID, customer) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("CardID", sql.Int, cardID)
            .input("CustomerName", sql.NVarChar, customer.CustomerName)
            .input("CustomerEmail", sql.NVarChar, customer.CustomerEmail)
            .query(`
                UPDATE CUSTOMER 
                SET CustomerName = @CustomerName, CustomerEmail = @CustomerEmail
                WHERE CardID = @CardID
            `);

        if (result.rowsAffected[0] === 0) {
            throw new Error(`Không tìm thấy khách hàng để cập nhật với ID: ${cardID}`);
        }
    } catch (err) {
        console.error(`Lỗi khi cập nhật khách hàng có ID ${cardID}:`, err.message);
        throw err;
    }
};

// Xóa khách hàng
const deleteCustomer = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("DELETE FROM CUSTOMER WHERE CardID = @CardID");

        if (result.rowsAffected[0] === 0) {
            throw new Error(`Không tìm thấy khách hàng để xóa với ID: ${cardID}`);
        }
    } catch (err) {
        console.error(`Lỗi khi xóa khách hàng có ID ${cardID}:`, err.message);
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