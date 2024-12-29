const jwt = require("jsonwebtoken");
const { loginUser } = require("../models/loginModels");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const handleLogin = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required" });
  }

  const result = await loginUser(phone, password);

  if (result.success) {
    const payload = {
      userId: result.user.userId, // Corrected here
      role: result.user.role,
      branchID: result.user.branchID, // Corrected to use result.user
      employeeID: result.user.employeeID, // Corrected to use result.user
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: result.user,
    });
  } else {
    return res.status(401).json(result);
  }
};

module.exports = { handleLogin };
