import React, { useState } from "react";
import Header from "../components/Header";
import Decorate from "../components/Decorate";

const AddEmployee = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("Male"); // Default to "Male"

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
      name,
      birthdate,
      gender,
    };

    console.log("New Employee Data:", newEmployee);

    // Clear the form after submission
    setName("");
    setBirthdate("");
    setGender("Male");

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
    </div>
  );
};

export default AddEmployee;
