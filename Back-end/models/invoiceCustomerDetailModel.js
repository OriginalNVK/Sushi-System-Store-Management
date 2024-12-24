const sql = require("mssql");
const config = require("../db/dbConfig");

const getInvoiceCustomerDetails = async () => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT 
                i.InvoiceID AS [Invoice Number],
                FORMAT(i.PaymentDate, 'dd-MM-yyyy') AS [Date],
                c.CustomerName AS [Billed to],
                c.CustomerPhone AS [Phone],
                ROW_NUMBER() OVER (PARTITION BY i.InvoiceID ORDER BY d.DishID) AS [NO],
                d.DishName AS [Dish Name],
                oda.AmountDish AS [Quantity],
                d.Price * oda.AmountDish AS [Amount],
                (SELECT SUM(d.Price * oda.AmountDish)
                 FROM ORDER_DISH_AMOUNT oda
                 JOIN DISH d ON oda.DishID = d.DishID
                 WHERE oda.OrderID = i.OrderID) AS [Subtotal],
                i.DiscountMoney AS [Discount],
                i.TotalMoney AS [Total]
            FROM 
                INVOICE i
            JOIN 
                CUSTOMER c ON i.CardID = c.CardID
            JOIN 
                ORDER_DISH_AMOUNT oda ON i.OrderID = oda.OrderID
            JOIN 
                DISH d ON oda.DishID = d.DishID;
        `);
        return result.recordset;
    } catch (error) {
        console.error("Error fetching invoice customer details:", error);
        throw error;
    }
};

module.exports = { getInvoiceCustomerDetails };