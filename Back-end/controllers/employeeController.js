const employeeModel = require('../models/employeeModel');

const getAllEmployeeByBranchID = async (req, res) => {
  const { BranchID } = req.params;
  try {
    const employees = await employeeModel.getAllEmployeeByBranchID(BranchID);
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees" });
  }
};

const getEmployee = async (req, res) => {
    const { EmployeeID } = req.params;

    try {
        const employee = await employeeModel.getEmployeeById(EmployeeID);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addNewEmployee = async (req, res) => {
    const employee = req.body;
    try {
        await employeeModel.addEmployee(employee);
        res.status(200).json({ message: 'Employee added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateEmployee = async (req, res) => {
    const { EmployeeID } = req.params;
    const employeeData = req.body;

    console.log('Received update request:', { EmployeeID, employeeData }); // Log request nhận được

    try {
        await employeeModel.updateEmployee(EmployeeID, employeeData);
        console.log('Employee updated successfully'); // Log khi update thành công
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (err) {
        console.error('Error in updateEmployee controller:', err.message); // Log lỗi từ controller
        res.status(500).json({ error: err.message });
    }
};


const deleteEmployee = async (req, res) => {
    const { EmployeeID } = req.params;

    try {
        await employeeModel.deleteEmployeeById(EmployeeID);
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
  getAllEmployeeByBranchID,
  getEmployee,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};