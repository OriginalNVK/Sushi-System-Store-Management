const sql = require("mssql");
const connectToDB = require("../db/dbConfig");

const loginUser = async (phone, password) => {
  let pool;
  try {
    // Establish database connection
    pool = await connectToDB();

    // Step 1: Verify user credentials in the userWeb table
    const query = `
      SELECT userPhone, password, role 
      FROM userWeb 
      WHERE userPhone = @phone AND password = @password
    `;
    const result = await pool
      .request()
      .input("phone", sql.Char(15), phone)
      .input("password", sql.NVarChar(255), password)
      .query(query);

    // If no user is found, return an error
    if (result.recordset.length === 0) {
      return { success: false, error: "Phone number or password is incorrect" };
    }

    // Extract user information
    const user = result.recordset[0];

    // Step 2: Fetch employee's BranchID if the user is an employee
    let branchId = null;
    let employeeId = null;
    if (user.role !== "customer") {
      const query2 = `
        SELECT BranchID, EmployeeID 
        FROM EMPLOYEE 
        WHERE EmployeePhone = @phone
      `;
      const result2 = await pool
        .request()
        .input("phone", sql.Char(15), phone)
        .query(query2);

      // If the user is not found in the employee table, handle accordingly
      if (result2.recordset.length > 0) {
        branchId = result2.recordset[0].BranchID;
        employeeId = result2.recordset[0].EmployeeID;
      }
    }

    // Return success with user details
    return {
      success: true,
      user: {
        userId: user.userPhone,
        role: user.role,
        branchID: branchId, // This will be null for customers
        employeeID: employeeId, // This will be null for customers
      },
    };
  } catch (err) {
    // Log and return internal server error
    console.error("Database error:", err);
    return { success: false, error: "Internal Server Error" };
  } finally {
    // Close the database connection pool
    if (pool) await pool.close();
  }
};

module.exports = { loginUser };
