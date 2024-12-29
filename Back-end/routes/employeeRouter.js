const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getEmployeesBranch);
router.get('/:EmployeeID', employeeController.getEmployee);
router.post('/', employeeController.addNewEmployee);
router.put('/:EmployeeID', employeeController.updateEmployee);
router.delete('/:EmployeeID', employeeController.deleteEmployee);
router.get("/branch/:BranchID", employeeController.getAllEmployeeByBranchID);

module.exports = router;