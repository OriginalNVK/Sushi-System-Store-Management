import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import { getDepartments, createEmployee, getBranches } from "../service/Services";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("Male"); // Default to "Male"
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState(""); // Default to none
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  // Fetch departments and branches from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchData = await getBranches();
        setBranches(branchData || []); // Ensure branches is an array
        const departmentData = await getDepartments();
        setDepartments(departmentData || []); // Ensure departments is an array
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load branches or departments.");
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    if (!name || !birthdate || !branch || !department) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }
  
    const newEmployee = {
      EmployeeName: name,
      EmployeeBirth: birthdate,
      EmployeeGender: gender,
      EmployeePhone: phone,
      EmployeeAddress: address,
      DepartmentName: department,
      BranchName: branch,
      EntryDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
    };
  
    try {
      const response = await createEmployee(newEmployee);
  
      if (!response) {
        throw new Error("No response from server");
      }
  
      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message || "Employee added successfully!");
        console.log("Employee added:", responseData);
  
        // Clear the form
        setName("");
        setBirthdate("");
        setGender("Male");
        setPhone("");
        setAddress("");
        setDepartment("");
        setBranch("");
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message || `Failed to add employee: Error ${response.status}`;
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert(error.message || "An error occurred while adding the employee.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold">
            ADD EMPLOYEE
          </p>
          <Decorate />
        </div>
        <form
          className="w-8/12 bg-gray-100 p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Name:</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Birthdate:</label>
            <input
              type="date"
              className="border rounded-md px-3 py-2 w-full"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Gender:</label>
            <select
              className="border rounded-md px-3 py-2 w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Phone Number:</label>
            <input
              type="number"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Address:</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Branch:</label>
            <select
              className="border rounded-md px-3 py-2 w-full"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="" disabled>Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.BranchName} value={branch.BranchName}>
                  {branch.BranchName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Department:</label>
            <select
              className="border rounded-md px-3 py-2 w-full"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="" disabled>Select a department</option>
              {departments.map((depart) => (
                <option key={depart.DepartmentName} value={depart.DepartmentName}>
                  {depart.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="border font-play font-bold bg-green text-white px-6 py-2 rounded-lg hover:bg-white hover:text-green transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddEmployee;
