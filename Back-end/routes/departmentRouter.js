const express = require("express");
const router = express.Router();
const { getDepartmentController } = require("../controllers/departmentController");

router.get('/', getDepartmentController);

module.exports = router;