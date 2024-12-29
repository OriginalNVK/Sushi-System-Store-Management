  import React, { useState, useEffect } from "react";
  import Header from "../components/Header";
  import Decorate from "../components/Decorate";
  import Footer from "../components/Footer";
  import { getDepartments, createEmployee, getBranches } from "../service/Services";

  const AddEmployee = () => {
    // State for form fields
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("Male"); // Default to "Male"
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [department, setDepartment] = useState("HR"); // Default to "HR"
    const [departments, setDepartments] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState("");

    // Fetch departments from backend
    useEffect(() => {
      const fetData2 = async () => {
        const data = await getBranches();
        setBranches(data);
      }
      fetData2();
      const fetData = async () => {
        const data = await getDepartments();
        setDepartments(data);
      };
      fetData();
    });

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent page reload

      // Validate inputs
      if (!name || !birthdate) {
        alert("Please fill in all required fields.");
        return;
      }

      // Send data to backend or handle it as needed
      const newEmployee = {
        EmployeeName: name,
        EmployeeBirth: birthdate,
        EmployeeGender: gender,
        EmployeePhone: phone,
        EmployeeAddress: address,
        DepartmentName: department,
      };

      const response = createEmployee(newEmployee);

      const data = response.json();

      if (response.ok)
      {
        alert("Employee added successfully!");
        console.log(data);

        // Clear the form after submission
        setName("");
        setBirthdate("");
        setGender("Male");
        setPhone("");
        setAddress("");
        setDepartment("HR");
      }

      

      alert("Employee added successfully!");
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
                {branches.map((branch) => (
                  <option value={branch}>{branch}</option>
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
                {departments.map((depart) => (
                  <option value={depart}>{depart}</option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="border font-play font-bold bg-green text-white px-6 py-2 rounded-lg hover:bg-white hover:text-green transition-all duration-300"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  };

  export default AddEmployee;
