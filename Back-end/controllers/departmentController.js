const {
    getDepartmentModel
} = require("../models/departmentModels");

const getDepartmentController = async (req, res) => {
    try {
        const departments = await getDepartmentModel();
        res.json(departments);
    }
    catch(err) {
        console.error("Error fetching departments:", err);
        res.status(500).json({ error: "An error occurred while fetching departments" });
    }
}

module.exports = {
    getDepartmentController
}