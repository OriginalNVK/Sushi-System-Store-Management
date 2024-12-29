const employeeModel = require('../models/employeeModel');

  const getEmployeesBranch = async (req, res) => {
    try {
        // Giả sử `BranchID` được lưu trong session sau khi quản lý đăng nhập
        const { BranchID } = req.user; // Hoặc lấy từ token, session
        if (!BranchID) {
            return res.status(400).json({ error: 'BranchID is required' });
        }

        // Gọi hàm lấy danh sách nhân viên
        const employees = await employeeModel.getEmployeesByBranch(BranchID);

        res.status(200).json({ employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
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
    getEmployeesBranch,
    getEmployee,
    addNewEmployee,
    updateEmployee,
    deleteEmployee
};