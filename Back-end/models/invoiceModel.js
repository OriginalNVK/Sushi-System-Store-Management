const sql = require("mssql");
const config = require("../db/dbConfig");

// Lấy danh sách hóa đơn cùng thông tin khách hàng
const getInvoicesWithCustomer = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT 
                ROW_NUMBER() OVER (ORDER BY i.InvoiceID) AS [No.], -- Số thứ tự
                c.CustomerName AS [Customer name],                -- Tên khách hàng
                i.DiscountMoney AS [Discount money],              -- Tiền giảm giá
                i.TotalMoney + i.DiscountMoney AS [Sub total],    -- Tổng tiền trước giảm giá
                i.TotalMoney AS [Total Money]                     -- Tổng tiền sau giảm giá
            FROM 
                INVOICE i
            JOIN 
                CUSTOMER c ON i.CardID = c.CardID;                -- Kết nối hóa đơn với khách hàngg
        `);
        return result.recordset;
    } catch (err) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", err);
        throw err;
    }
};

module.exports = {
    getInvoicesWithCustomer
};