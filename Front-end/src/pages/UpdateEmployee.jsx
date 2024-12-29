import React, { useState } from 'react';
import Header from '../components/Header';
import Decorate from '../components/Decorate';
import Footer from '../components/Footer';

const UpdateEmployee = () => {
  // State for the form fields
  const [employee, setEmployee] = useState({
    EmployeeID: '',
    EmployeeName: '',
    EmployeeBirth: '',
    EmployeeGender: '',
    Salary: '',
    EntryDate: '',
    LeaveDate: '',
    DepartmentID: '',
    BranchID: '',
    EmployeeAddress: '',
    EmployeePhone: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the update operation (e.g., send data to the API)
    console.log('Updated Employee:', employee);
    alert('Employee information has been updated successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center py-6">
        <p className="text-yellow text-4xl font-play py-2 font-bold">
          UPDATE EMPLOYEE
        </p>
        <Decorate />
      </div>
      <div className="flex flex-col items-center">
        <form
          className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Employee Name
            </label>
            <input
              type="text"
              name="EmployeeName"
              value={employee.EmployeeName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Employee Birth
            </label>
            <input
              type="date"
              name="EmployeeBirth"
              value={employee.EmployeeBirth}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              name="EmployeeGender"
              value={employee.EmployeeGender}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Salary
            </label>
            <input
              type="number"
              name="Salary"
              value={employee.Salary}
              onChange={handleChange}
              required
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Entry Date
            </label>
            <input
              type="date"
              name="EntryDate"
              value={employee.EntryDate}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Leave Date
            </label>
            <input
              type="date"
              name="LeaveDate"
              value={employee.LeaveDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department ID
            </label>
            <input
              type="number"
              name="DepartmentID"
              value={employee.DepartmentID}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Branch ID
            </label>
            <input
              type="number"
              name="BranchID"
              value={employee.BranchID}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="EmployeeAddress"
              value={employee.EmployeeAddress}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              name="EmployeePhone"
              value={employee.EmployeePhone}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Employee
            </button>
          </div>
        </form>
          </div>
          <Footer />
    </div>
  );
};

export default UpdateEmployee;
