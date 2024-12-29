const {addInvoice} = require("../models/invoiceModels");
const sql = require("mssql");
const connectToDB = require("../db/dbConfig"); // Hàm connectToDB sẽ đảm nhận việc kết nối đến DB

const OrderOnline = {
  // Lấy tất cả đơn hàng
  async getAllOrders() {
    const pool = await connectToDB();
    const result = await pool.request().execute("GetOrderOnline");
    return result.recordset;
  },

  // Lấy tóm tắt đơn hàng chưa xác nhận
  async getOrderOnlinePendingOverview(branchID) {
    const pool = await connectToDB();
    const result = await pool
      .request()
      .input("BranchID", sql.Int, branchID)
      .execute("GetOrderOnlinePendingOverview");
    return result.recordset;
  },

  // Lấy chi tiết đơn hàng chưa xác nhận theo ID
  async getOrderOnlinePendingDetail(orderID) {
    const pool = await connectToDB();
    try {
      const result = await pool
        .request()
        .input("OrderID", sql.Int, orderID)
        .execute("GetOrderOnlinePendingDetail");

      // Kiểm tra nếu không có dữ liệu trả về
      if (result.recordset.length === 0) {
        return null; // Trả về null hoặc thông báo phù hợp nếu không có dữ liệu
      }

      // Lấy các thông tin chung từ bản ghi đầu tiên
      const { OrderID, NumberTable, AmountCustomer } = result.recordset[0];

      // Nhóm các món ăn (DishName và AmountDish) vào mảng DetailDishs
      const DetailDishs = result.recordset.map((row) => ({
        DishName: row.DishName,
        AmountDish: row.AmountDish,
      }));

      // Tạo đối tượng chi tiết đơn hàng
      const detail = {
        OrderID: OrderID,
        NumberTable: NumberTable,
        AmountCustomer: AmountCustomer,
        DetailDishs: DetailDishs,
      };

      return detail; // Trả về dữ liệu đã định dạng
    } catch (error) {
      console.error("Error fetching order detail:", error);
      throw new Error("Unable to fetch order detail.");
    } finally {
      if (pool) {
        pool.close(); // Đảm bảo đóng kết nối
      }
    }
  },

  // Thêm đơn hàng mới
  async addOrder(orderData) {
        const pool = await connectToDB(); 
        const dishes = orderData.dishes;
        for (let i = 0; i < dishes.length; i++)
        {
            const result = await pool
              .request()
              .input("BranchID", sql.Int, orderData.BranchID)
              .input("NumberTable", sql.Int, orderData.NumberTable)
              .input("CardID", sql.Int, orderData.CardID)
              .input("AmountCustomer", sql.Int, orderData.AmountCustomer)
              .input("DishName", sql.NVarChar, dishes[i].dishName)
              .input("AmountDish", sql.Int, parseInt(dishes[i].dishAmount))
              .input("DateOrder", sql.Date, orderData.DateOrder)
              .input("TimeOrder", sql.Time, orderData.TimeOrder)
                .execute("AddNewOnlineOrder"); 
        }
        
        return;
    },

  // Cập nhật đơn hàng
  async updateOrder(orderID, employeeID) {
    const pool = await connectToDB(); // Kết nối đến cơ sở dữ liệu
    try {
      const result = await pool
        .request()
        .input("OrderID", sql.Int, orderID)
        .input("EmployeeID", sql.Int, employeeID).query(`
        UPDATE ORDER_DIRECTORY 
        SET EmployeeID = @EmployeeID 
        WHERE OrderID = @OrderID
      `);

      const getInfoForInvoice = await pool
        .request()
        .input("OrderID", sql.Int, orderID)
        .execute("GetInfoForInvoice");

      if (getInfoForInvoice.recordset.length === 0) {
        return { success: false, message: "Order not found" };
      }

      const { CARDID, TOTALMONEY } = getInfoForInvoice.recordset[0];
      const infoForInvoice = {
        CardID: CARDID,
        TotalMoney: TOTALMONEY,
        DiscountMoney: 0,
        PaymentDate: null,
        OrderID: orderID,
      };

      const addInvoiceResult = await addInvoice(infoForInvoice);
      if (!addInvoiceResult) {
        return { success: false, message: "Error creating invoice" };
      }

      // Kiểm tra số dòng được cập nhật
      if (result.rowsAffected[0] === 0) {
        return { success: false, message: "Order not found or update failed" };
      }

      return { success: true, message: "Order updated successfully" };
    } catch (error) {
      console.error("Error updating order:", error);
      return {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      };
    } finally {
      if (pool) pool.close(); // Đảm bảo đóng kết nối sau khi thực hiện
    }
  },

  // Xóa đơn hàng
  async deleteOrder(orderID) {
    const pool = await connectToDB();
    const result = await pool
      .request()
      .input("OrderID", sql.Int, orderID)
      .execute("DeleteOrder");
    return result.recordset;
  },
};

module.exports = OrderOnline;
