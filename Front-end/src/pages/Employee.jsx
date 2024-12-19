import { useEffect, useState } from "react";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getEmployees, deleteEmployee } from "../service/Services"; // Ensure `deleteEmployee` is imported
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    loadEmployees();
  }, []); // Added dependency array to prevent infinite re-rendering

  const handleEditEmployee = (employeeID) => {
    navigate(`/employee/${employeeID}`);
  };

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
        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
          <thead className="table-header-group md:text-xl text-lg text-white">
            <tr className="table-row">
              <th key="No" className="table-cell border h-12 bg-red border-black">
                No
              </th>
              <th className="table-cell border h-12 bg-red border-black">Name</th>
              <th className="table-cell border h-12 bg-red border-black">Birthdate</th>
              <th className="table-cell border h-12 bg-red border-black">Gender</th>
              <th className="table-cell border h-12 bg-red border-black">Mobile Phone</th>
              <th className="table-cell border h-12 bg-red border-black">Address</th>
              <th className="table-cell border h-12 bg-red border-black">BranchID</th>
              <th className="table-cell border h-12 bg-red border-black">DepartmentID</th>
              <th className="table-cell border h-12 bg-red border-black">Entry date</th>
              <th className="table-cell border h-12 bg-red border-black">Salary</th>
              <th className="table-cell border h-12 bg-red border-black">History Employee</th>
              <th className="table-cell border h-12 bg-red border-black">Actions</th>
            </tr>
          </thead>
          <tbody className="md:text-lg text-base">
            {employees.map((employee) => (
              <tr key={employee.EmployeeID}>
                <td className="border p-1">{employee.EmployeeID}</td>
                <td className="border px-1">{employee.EmployeeName}</td>
                <td className="border px-1">{employee.EmployeeBirth}</td>
                <td className="border px-1">{employee.EmployeeGender}</td>
                <td className="border px-1">{employee.EmployeePhone}</td>
                <td className="border px-1">{employee.EmployeeAddress}</td>
                <td className="border px-1">{employee.BranchID}</td>
                <td className="border px-1">{employee.DepartmentID}</td>
                <td className="border px-1">{employee.EntryDate}</td>
                <td className="border px-1">{employee.Salary}</td>
                <td className="border px-1">
                  <button
                    type="button"
                    className="border text-yellow px-2 py-1 rounded hover:opacity-80 text-center"
                  >
                    Check history
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
      </div>
      <Footer />
    </div>
  );
};

export default Employee;
