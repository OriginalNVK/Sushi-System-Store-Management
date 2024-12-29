const sql = require("mssql");
const connectToDB = require("../db/dbConfig");

const registerUser = async ({
  fullName,
  email,
  password,
  cccd,
  phone,
  gender,
}) => {
  let pool;
  let transaction;
  try {
    // Get the connection pool
    pool = await connectToDB();

    // Start a transaction
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Query to find the maximum CARDID
    const maxCardIDQuery = `SELECT MAX(CARDID) AS MAXCARDID FROM CARD_CUSTOMER`;
    const result = await transaction.request().query(maxCardIDQuery);

    const newCardId = result.recordset[0].MAXCARDID
      ? result.recordset[0].MAXCARDID + 1
      : 1;

    // Insert user into USERWEB table
    const userQuery = `INSERT INTO USERWEB (userPhone, password, role) VALUES (@phone, @password, 'customer')`;
    await transaction
      .request()
      .input("phone", sql.VarChar, phone)
      .input("password", sql.VarChar, password)
      .query(userQuery);

    // Insert a new card into CARD_CUSTOMER table
    const cardQuery = `INSERT INTO CARD_CUSTOMER (CARDID, CardEstablishDate, EmployeeID, Score, CardType)
            VALUES (@newCardId, GETDATE(), NULL, 0, 'member')`;
    await transaction
      .request()
      .input("newCardId", sql.Int, newCardId)
      .query(cardQuery);

    // Insert customer details into CUSTOMER table
    const customerQuery = `INSERT INTO CUSTOMER (customerPhone, CustomerName, CustomerEmail, CustomerGender, CCCD, CardID)
            VALUES (@phone, @fullName, @email, @gender, @cccd, @newCardId)`;
    await transaction
      .request()
      .input("phone", sql.VarChar, phone)
      .input("fullName", sql.VarChar, fullName)
      .input("email", sql.VarChar, email)
      .input("gender", sql.VarChar, gender)
      .input("cccd", sql.VarChar, cccd)
      .input("newCardId", sql.Int, newCardId)
      .query(customerQuery);

    // Commit transaction
    await transaction.commit();

    return { success: true, message: "User registered successfully" };
  } catch (err) {
    if (transaction) {
      await transaction.rollback(); // Rollback on error
    }
    console.error("Error during registration:", err); // Log error for debugging
    return {
      success: false,
      message: "Internal Server Error",
      error: err.message,
    };
  } finally {
    if (pool) {
      pool.close(); // Close the pool after query execution
    }
  }
};

module.exports = { registerUser };
