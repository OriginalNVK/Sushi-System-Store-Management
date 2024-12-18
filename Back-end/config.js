const sql = require("mssql");

const config = {
  user: "sa",                // Tên người dùng SQL Server
  password: "your_password", // Mật khẩu cho SQL Server
  server: "localhost",       // Tên máy chủ SQL Server
  database: "SUSHISTORE_MANAGEMENT", // Tên cơ sở dữ liệu
  options: {
    encrypt: false,          // Nếu dùng Azure thì đặt true
    trustServerCertificate: true, // Đặt true nếu dùng SSL tự ký
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Kết nối SQL Server thành công!");
    return pool;
  })
  .catch(err => {
    console.log("Kết nối SQL Server thất bại!", err);
  });

module.exports = { sql, poolPromise };