const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/:EmployeeID', employeeController.getEmployee);
router.post('/new-employee', employeeController.addNewEmployee);
router.put('/update-employee/:EmployeeID', employeeController.updateEmployee);
router.delete('/delete-employee/:EmployeeID', employeeController.deleteEmployee);

module.exports = router;