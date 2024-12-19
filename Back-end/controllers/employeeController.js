const employeeModel = require('../models/employeeModel');

const getAllEmployees = async (req, res) => {
    try {
      const employee = await employeeModel.getAllEmployee();
      res.json(employee);
    } catch (err) {
      console.error("Error fetching employee:", err);
      res.status(500).json({ error: "An error occurred while fetching employee" });
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
    const employee = req.body;

    try {
        await employeeModel.updateEmployee(employee);
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (err) {
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
    getAllEmployees,
    getEmployee,
    addNewEmployee,
    updateEmployee,
    deleteEmployee
};