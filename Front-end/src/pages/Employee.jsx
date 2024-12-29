import { useEffect, useState } from "react";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  getEmployees,
  deleteEmployee,
  getEmployeeByBranchID,
} from "../service/Services"; // Ensure `deleteEmployee` is imported
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [searchEmployee, setSearchEmployee] = useState(""); // Tìm kiếm nhân viên
  const [employees, setEmployees] = useState([]); // Danh sách nhân viên sau khi lọc
  const [allEmployees, setAllEmployees] = useState([]); // Danh sách tất cả nhân viên
  const [departments, setDepartments] = useState([]); // Danh sách phòng ban
  const [filterDepartment, setFilterDepartment] = useState("all"); // Bộ lọc phòng ban
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const employeesPerPage = 10; // Số dòng mỗi trang
  const navigate = useNavigate();

  // Tải danh sách nhân viên ban đầu
  useEffect(() => {
    const branchID = localStorage.getItem("BranchID");
    const loadEmployees = async () => {
      const data = await getEmployeeByBranchID(branchID);
      setEmployees(data);
      setAllEmployees(data);
    };

    loadEmployees();
  }, []);

  // Lấy nhân viên của trang hiện tại
  const startIndex = (currentPage - 1) * employeesPerPage;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + employeesPerPage
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Hàm tạo danh sách nút phân trang
  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page === "...") return; // Không làm gì nếu bấm "..."
    setCurrentPage(page);
  };

  // Xử lý chỉnh sửa nhân viên
  const handleEditEmployee = (employeeID) => {
    navigate(`/employee/${employeeID}`);
  };

  // Xử lý xóa nhân viên
  const handleDeleteEmployee = async (employeeID) => {
    if (!window.confirm(`Are you sure you want to delete employee ${employeeID}?`)) {
      return;
    }

    try {
      const response = await deleteEmployee(employeeID);
      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.EmployeeID !== employeeID)
        );
      } else {
        alert("Failed to delete employee");
        const message = await response.text();
        console.error(message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Tìm kiếm và lọc nhân viên
  const searchEmployees = () => {
    let filtered = allEmployees;

    if (searchEmployee) {
      filtered = filtered.filter((employee) =>
        employee.EmployeeName.toLowerCase().includes(searchEmployee.toLowerCase())
      );
    }

    if (filterDepartment !== "all") {
      filtered = filtered.filter(
        (employee) =>
          employee.DepartmentName &&
          employee.DepartmentName.toLowerCase() === filterDepartment.toLowerCase()
      );
    }

    setEmployees(filtered);
    setCurrentPage(1); // Reset về trang đầu
  };

  useEffect(() => {
    searchEmployees();
  }, [searchEmployee, filterDepartment]);

  const handleReset = async () => {
    setSearchEmployee("");
    setFilterDepartment("all");
    setEmployees(allEmployees); // Khôi phục danh sách nhân viên ban đầu
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold ">
            LIST EMPLOYEE
          </p>
          <Decorate />
        </div>
        <div className="flex items-center justify-between pb-4 w-8/12">
          <button
            className="border p-2 rounded-lg font-bold font-play text-xl bg-green text-white hover:bg-white hover:text-green transition-all duration-300"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </button>
          <div className="flex gap-2 lg:text-xl text-base font-play">
            <input
              type="text"
              placeholder="🔍 Employee Name"
              className="border rounded-md px-2 font-bold lg:w-52 w-[125px]"
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
            />
            <select
              className="border rounded-md font-bold px-2"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((department, index) => (
                <option key={index} value={department.toLowerCase()}>
                  {department}
                </option>
              ))}
            </select>
            <button
              className="border p-2 rounded-lg font-bold font-play bg-green text-white hover:bg-white hover:text-green transition-all duration-300"
              onClick={handleReset}
            >
              🔄 Reset
            </button>
          </div>
        </div>
        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
          <thead className="table-header-group md:text-xl text-lg text-white">
            <tr className="table-row">
              <th className="table-cell border h-12 bg-red border-black">No</th>
              <th className="table-cell border h-12 bg-red border-black">Name</th>
              <th className="table-cell border h-12 bg-red border-black">Birthdate</th>
              <th className="table-cell border h-12 bg-red border-black">Gender</th>
              <th className="table-cell border h-12 bg-red border-black">Mobile Phone</th>
              <th className="table-cell border h-12 bg-red border-black">Address</th>
              <th className="table-cell border h-12 bg-red border-black">Department</th>
              <th className="table-cell border h-12 bg-red border-black">Branch</th>
              <th className="table-cell border h-12 bg-red border-black">Entry Date</th>
              <th className="table-cell border h-12 bg-red border-black">Salary</th>
              <th className="table-cell border h-12 bg-red border-black">History</th>
              <th className="table-cell border h-12 bg-red border-black">Actions</th>
            </tr>
          </thead>
          <tbody className="md:text-lg text-base">
            {currentEmployees.map((employee, index) => (
              <tr key={employee.EmployeeID}>
                <td className="border p-1">{startIndex + index + 1}</td>
                <td className="border px-1">{employee.EmployeeName}</td>
                <td className="border px-1">{employee.EmployeeBirth}</td>
                <td className="border px-1">{employee.EmployeeGender}</td>
                <td className="border px-1">{employee.EmployeePhone}</td>
                <td className="border px-1">{employee.EmployeeAddress}</td>
                <td className="border px-1">{employee.DepartmentName}</td>
                <td className="border px-1">{employee.BranchID}</td>
                <td className="border px-1">{employee.EntryDate}</td>
                <td className="border px-1">{employee.Salary}</td>
                <td className="border px-1">
                  <button
                    type="button"
                    className="border text-yellow px-2 py-1 rounded hover:opacity-80 text-center"
                  >
                    Check History
                  </button>
                </td>
                <td className="border p-1">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                      onClick={() => handleEditEmployee(employee.EmployeeID)}
                    >
                      ✏️
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteEmployee(employee.EmployeeID)}
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Phân trang */}
        <div className="flex justify-center mt-4">
          {getPaginationNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 border ${
                currentPage === page
                  ? "bg-red text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Employee;
