const connectToDB = require("../db/dbConfig");
const sql = require("mssql");

const getBranchesModel = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query("SELECT * FROM BRANCH");
  return result.recordset;
};

const deleteBranchModel = async (id) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input("BranchID", sql.Int, id)
    .query("DELETE FROM BRANCH WHERE BranchID = @BranchID");
  
  return result.rowsAffected[0] > 0; // Return true if a row was deleted
};

const updateBranchModel = async (id, data) => {
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
  } = data;

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
  };

  const formattedOpenHour = formatTime(OpenHour);
  const formattedCloseHour = formatTime(CloseHour);

  const validYesNoFields = [HasCarParking, HasMotorParking, HasDeliveryService].every((field) =>
    ["YES", "NO"].includes(field.toUpperCase())
  );

  if (!validYesNoFields) {
    throw new Error("HasCarParking, HasMotorParking, and HasDeliveryService must be either 'YES' or 'NO'");
  }

  const pool = await connectToDB();

  const checkResult = await pool.request()
    .input("BranchID", sql.Int, id)
    .query("SELECT * FROM BRANCH WHERE BranchID = @BranchID");

  if (checkResult.recordset.length === 0) {
    return false; // Branch not found
  }

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

  return true; // Update successful
};

module.exports = { getBranchesModel, deleteBranchModel, updateBranchModel };
