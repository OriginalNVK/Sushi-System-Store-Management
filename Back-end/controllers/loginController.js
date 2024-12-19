const { loginUser } = require("../models/loginModels");

const handleLogin = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required" });
  }

  const result = await loginUser(phone, password);

  if (result.success) {
    return res.status(200).json({ message: "Login successful", user: result.user });
  } else {
    return res.status(401).json(result);
  }
};

module.exports = { handleLogin };
