const sql = require("mssql");
const connectToDB = require("../db/dbConfig");

const loginUser = async (phone, password) => {
    let pool;
    try {
        pool = await connectToDB();

        const query = `SELECT * FROM USERWEB WHERE userPhone = @phone AND password = @password`;
        
        const result = await pool.request()
            .input('phone', sql.VarChar, phone)
            .input('password', sql.VarChar, password)
            .query(query);
        
        if(result.recordset.length === 0) {
            return { success: false, error: "Phone number or password is incorrect" };
        }

        const user = result.recordset[0];

        return { success: true, user };
    }
    catch(err) {
        console.error(err);
        return { success: false, error: "Internal Server Error" };
    } finally {
        if(pool)
        pool.close();
    }
}

module.exports = { loginUser };