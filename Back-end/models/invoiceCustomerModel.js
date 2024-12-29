const sql = require("mssql");
const config = require("../db/dbConfig");

const getInvoiceCustomer = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT 
                ROW_NUMBER() OVER (ORDER BY i.InvoiceID) AS [No.],
                c.CustomerName AS [Customer name],
                i.DiscountMoney AS [Discount money],
                i.TotalMoney + i.DiscountMoney AS [Sub total],
                i.TotalMoney AS [Total Money]
            FROM 
                INVOICE i
            JOIN 
                CUSTOMER c ON i.CardID = c.CardID;
        `);
        return result.recordset;
    } catch (error) {
        console.error("Error fetching invoice customers:", error);
        throw error;
    }
};

module.exports = { getInvoiceCustomer };