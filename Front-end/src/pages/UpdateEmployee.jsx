import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Decorate from '../components/Decorate';
import Footer from '../components/Footer';

const UpdateEmployee = () => {
  const { id } = useParams(); // Lấy ID từ URL
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

  const navigate = useNavigate(); // Để điều hướng sau khi cập nhật

  // 4.2. Lấy Dữ Liệu Nhân Viên
  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data); // Cập nhật state với dữ liệu nhân viên
      } else {
        alert('Failed to fetch employee data');
      }
    };
  
    fetchEmployee();
  }, [id]);

  // 4.3. Xử Lý Thay Đổi Trường Nhập Liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // 4.4. Xử Lý Gửi Form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    const response = await fetch(`http://localhost:3000/api/employees/${employee.EmployeeID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee), // Gửi dữ liệu nhân viên đã cập nhật
    });

    if (response.ok) {
      alert('Employee updated successfully!');
      navigate('/employee'); // Điều hướng về trang danh sách nhân viên
    } else {
      alert('Failed to update employee');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center py-6">
        <div className="flex flex-col items-center pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold">UPDATE EMPLOYEE</p>
          <Decorate />
        </div>
        <form className="w-8/12 bg-gray-100 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Name:</label>
            <input
              type="text"
              name="EmployeeName"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter name"
              value={employee.EmployeeName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Birthdate:</label>
            <input
              type="date"
              name="EmployeeBirth"
              className="border rounded-md px-3 py-2 w-full"
              value={employee.EmployeeBirth}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Gender:</label>
            <select
              name="EmployeeGender"
              className="border rounded-md px-3 py-2 w-full"
              value={employee.EmployeeGender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Salary:</label>
            <input
              type="number"
              name="Salary"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter salary"
              value={employee.Salary}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Entry Date:</label>
            <input
              type="date"
              name="EntryDate"
              className="border rounded-md px-3 py-2 w-full"
              value={employee.EntryDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Leave Date:</label>
            <input
              type="date"
              name="LeaveDate"
              className="border rounded-md px-3 py-2 w-full"
              value={employee.LeaveDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Department ID:</label>
            <input
              type="number"
              name="DepartmentID"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Department ID"
              value={employee.DepartmentID}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Branch ID:</label>
            <input
              type="number"
              name="BranchID"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter Branch ID"
              value={employee.BranchID}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Address:</label>
            <input
              type="text"
              name="EmployeeAddress"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter address"
              value={employee.EmployeeAddress}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Phone:</label>
            <input
              type="text"
              name="EmployeePhone"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter phone number"
              value={employee.EmployeePhone}
              onChange={handleChange}
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