const { registerUser } = require("../models/registerModels");

const handleRegister = async (req, res) => {
    const { fullName, email, password, confirmPassword, cccd, phone, gender } = req.body;
    
    if(password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const result = await registerUser({ fullName, email, password, cccd, phone, gender });

        if(result.success) {
            return res.status(201).json({ message: "User registered successfully" });
        }
        else {
            return res.status(500).json(result);
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { handleRegister };