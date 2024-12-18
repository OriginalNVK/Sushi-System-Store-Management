const sql = require("mssql");
const config = require("../db/dbConfig");

// Lấy tất cả thẻ khách hàng
const getAllCardCustomers = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM CARD_CUSTOMER");
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy tất cả thẻ khách hàng:", err.message);
        throw new Error("Không thể lấy danh sách thẻ khách hàng.");
    }
};

// Lấy thẻ khách hàng theo ID
const getCardCustomerById = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("SELECT * FROM CARD_CUSTOMER WHERE CardID = @CardID");

        if (result.recordset.length === 0) {
            throw new Error(`Không tìm thấy thẻ khách hàng với ID: ${cardID}`);
        }

        return result.recordset[0];
    } catch (err) {
        console.error(`Lỗi khi lấy thẻ khách hàng có ID ${cardID}:`, err.message);
        throw err;
    }
};

// Thêm thẻ khách hàng
const createCardCustomer = async (cardCustomer) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("CardID", sql.Int, cardCustomer.CardID)
            .input("CardEstablishDate", sql.Date, cardCustomer.CardEstablishDate)
            .input("EmployeeID", sql.Int, cardCustomer.EmployeeID)
            .input("Score", sql.Int, cardCustomer.Score)
            .input("CardType", sql.NVarChar, cardCustomer.CardType)
            .query(`
                INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType)
                VALUES (@CardID, @CardEstablishDate, @EmployeeID, @Score, @CardType)
            `);
    } catch (err) {
        console.error("Lỗi khi thêm mới thẻ khách hàng:", err.message);
        throw new Error("Không thể thêm mới thẻ khách hàng.");
    }
};

// Xóa thẻ khách hàng
const deleteCardCustomer = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("DELETE FROM CARD_CUSTOMER WHERE CardID = @CardID");

        if (result.rowsAffected[0] === 0) {
            throw new Error(`Không tìm thấy thẻ khách hàng để xóa với ID: ${cardID}`);
        }
    } catch (err) {
        console.error(`Lỗi khi xóa thẻ khách hàng có ID ${cardID}:`, err.message);
        throw err;
    }
};

module.exports = {
    getAllCardCustomers,
    getCardCustomerById,
    createCardCustomer,
    deleteCardCustomer
};
