const sql = require("mssql");
const config = require("../db/dbConfig");

// Lấy tất cả Card_Customer
const getAllCardCustomers = async () => {
    try {
        let pool = await sql.connect(config);
        let cards = await pool.request().query("SELECT * FROM CARD_CUSTOMER");
        return cards.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy tất cả Card_Customer:", err);
        throw err;
    }
};

// Lấy Card_Customer theo ID
const getCardCustomerById = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        let card = await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("SELECT * FROM CARD_CUSTOMER WHERE CardID = @CardID");
        return card.recordset[0];
    } catch (err) {
        console.error("Lỗi khi lấy Card_Customer theo ID:", err);
        throw err;
    }
};

// Thêm mới Card_Customer
const createCardCustomer = async (cardCustomer) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("CardID", sql.Int, cardCustomer.CardID)
            .input("CardEstablishDate", sql.Date, cardCustomer.CardEstablishDate)
            .input("EmployeeID", sql.Int, cardCustomer.EmployeeID)
            .input("Score", sql.Int, cardCustomer.Score)
            .input("CardType", sql.NVarChar, cardCustomer.CardType)
            .query(`INSERT INTO CARD_CUSTOMER (CardID, CardEstablishDate, EmployeeID, Score, CardType) 
                    VALUES (@CardID, @CardEstablishDate, @EmployeeID, @Score, @CardType)`);
    } catch (err) {
        console.error("Lỗi khi thêm mới Card_Customer:", err);
        throw err;
    }
};

// Xóa Card_Customer
const deleteCardCustomer = async (cardID) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input("CardID", sql.Int, cardID)
            .query("DELETE FROM CARD_CUSTOMER WHERE CardID = @CardID");
    } catch (err) {
        console.error("Lỗi khi xóa Card_Customer:", err);
        throw err;
    }
};

module.exports = {
    getAllCardCustomers,
    getCardCustomerById,
    createCardCustomer,
    deleteCardCustomer
};