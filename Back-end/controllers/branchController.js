const connectToDB = require("../db/dbConfig");
const sql = require("mssql");

const getBranches = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query("SELECT * FROM BRANCH");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching branches:", err);
    res.status(500).json({ error: "An error occurred while fetching branches" });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params; // Lấy BranchID từ tham số URL

    // Kết nối tới cơ sở dữ liệu
    const pool = await connectToDB();

    // Xóa chi nhánh bằng cách gọi câu lệnh SQL DELETE
    const result = await pool.request()
      .input("BranchID", sql.Int, id)
      .query("DELETE FROM BRANCH WHERE BranchID = @BranchID");

    // Kiểm tra xem chi nhánh có được xóa không
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.status(200).json({ message: `Branch with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting branch:", err);
    res.status(500).json({ error: "An error occurred while deleting the branch" });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params; // Lấy BranchID từ URL
    const {
      BranchName,
      BranchAddress,
      OpenHour,
      CloseHour,
      PhoneNumber,
      HasCarParking,
      HasMotorParking,
      AreaID,
      ManagerID,
      HasDeliveryService,
    } = req.body; // Lấy dữ liệu từ body của request

    // Kiểm tra dữ liệu đầu vào
    if (!BranchName || !BranchAddress || !OpenHour || !CloseHour || !PhoneNumber || !HasCarParking || !HasMotorParking || !AreaID || !ManagerID || !HasDeliveryService) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Định dạng giờ
    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
    };

    const formattedOpenHour = formatTime(OpenHour);
    const formattedCloseHour = formatTime(CloseHour);

    // Kiểm tra các giá trị boolean trong cột
    const validYesNoFields = [HasCarParking, HasMotorParking, HasDeliveryService].every((field) =>
      ["YES", "NO"].includes(field.toUpperCase())
    );

    if (!validYesNoFields) {
      return res.status(400).json({
        error: "HasCarParking, HasMotorParking, and HasDeliveryService must be either 'YES' or 'NO'",
      });
    }

    const pool = await connectToDB();

    // Kiểm tra xem BranchID có tồn tại không
    const checkResult = await pool.request()
      .input("BranchID", sql.Int, id)
      .query("SELECT * FROM BRANCH WHERE BranchID = @BranchID");

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Thực hiện cập nhật thông tin
    await pool.request()
      .input("BranchID", sql.Int, id)
      .input("BranchName", sql.NVarChar(255), BranchName)
      .input("BranchAddress", sql.NVarChar(255), BranchAddress)
      .input("OpenHour", sql.VarChar, formattedOpenHour)
      .input("CloseHour", sql.VarChar, formattedCloseHour)
      .input("PhoneNumber", sql.Char(15), PhoneNumber)
      .input("HasCarParking", sql.VarChar(10), HasCarParking.toUpperCase())
      .input("HasMotorParking", sql.VarChar(10), HasMotorParking.toUpperCase())
      .input("AreaID", sql.Int, AreaID)
      .input("ManagerID", sql.Int, ManagerID)
      .input("HasDeliveryService", sql.VarChar(10), HasDeliveryService.toUpperCase())
      .query(
        `UPDATE BRANCH
         SET BranchName = @BranchName,
             BranchAddress = @BranchAddress,
             OpenHour = @OpenHour,
             CloseHour = @CloseHour,
             PhoneNumber = @PhoneNumber,
             HasCarParking = @HasCarParking,
             HasMotorParking = @HasMotorParking,
             AreaID = @AreaID,
             ManagerID = @ManagerID,
             HasDeliveryService = @HasDeliveryService
         WHERE BranchID = @BranchID`
      );

    res.status(200).json({
      message: `Branch with ID ${id} updated successfully`,
    });
  } catch (err) {
    console.error("Error updating branch:", err);
    res.status(500).json({
      error: "An error occurred while updating the branch",
    });
  }
};

module.exports = { getBranches, deleteBranch, updateBranch};



