import React, { useState, useEffect } from 'react';
import Decorate from '../components/Decorate';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBranches, deleteBranch } from '../service/Services';
import { useNavigate } from 'react-router-dom';

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBranches = async () => {
      const data = await getBranches();
      setBranches(data);
    };

    loadBranches();
  }, []); // Added dependency array to prevent infinite re-renders

  const handleEditBranch = async (branchID) => {
    navigate(`/branch/${branchID}`);
  };

  const handleDeleteBranch = async (branchID) => {
    if (!window.confirm(`Are you sure you want to delete branch ${branchID}?`)) {
      return;
    }

    const response = await deleteBranch(branchID);
    if (response.ok) {
      setBranches((prevBranches) =>
        prevBranches.filter((branch) => branch.BranchID !== branchID)
      );
    } else {
      alert("Failed to delete branch");
      const message = await response.text();
      console.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6 items-center">
          <p className="text-yellow text-4xl font-play py-2 font-bold">LIST BRANCH</p>
          <Decorate />
        </div>
        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
          <thead className="table-header-group md:text-xl text-lg text-white">
            <tr className="table-row">
              <th className="table-cell border h-12 bg-red border-black">No</th>
              <th className="table-cell border h-12 bg-red border-black">Branch Name</th>
              <th className="table-cell border h-12 bg-red border-black">Address</th>
              <th className="table-cell border h-12 bg-red border-black">Open Hour</th>
              <th className="table-cell border h-12 bg-red border-black">Close Hour</th>
              <th className="table-cell border h-12 bg-red border-black">Phone Number</th>
              <th className="table-cell border h-12 bg-red border-black">Car Parking</th>
              <th className="table-cell border h-12 bg-red border-black">Motor Parking</th>
              <th className="table-cell border h-12 bg-red border-black">Delivery Service</th>
              <th className="table-cell border h-12 bg-red border-black">Area Name</th>
              <th className="table-cell border h-12 bg-red border-black">Manager Name</th>
              <th className="table-cell border h-12 bg-red border-black">Actions</th>
            </tr>
          </thead>
          <tbody className="md:text-lg text-base">
            {branches.map((branch, index) => (
              <tr key={branch.BranchID}>
                <td className="border p-1">{index + 1}</td>
                <td className="border px-1">{branch.BranchName}</td>
                <td className="border px-1">{branch.BranchAddress}</td>
                <td className="border px-1">{branch.OpenHour}</td>
                <td className="border px-1">{branch.CloseHour}</td>
                <td className="border px-1">{branch.PhoneNumber.trim()}</td>
                <td className="border px-1">{branch.HasCarParking}</td>
                <td className="border px-1">{branch.HasMotorParking}</td>
                <td className="border px-1">{branch.HasDeliveryService}</td>
                <td className="border px-1">{branch.AreaName || "N/A"}</td>
                <td className="border px-1">{branch.ManagerName || "N/A"}</td>
                <td className="border p-1">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                      onClick={() => handleEditBranch(branch.BranchID)}
                    >
                      ✏️
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteBranch(branch.BranchID)}
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

export default Branch;
