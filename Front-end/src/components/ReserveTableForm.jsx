import React, { useState, useEffect } from "react";
import { getBranches } from "../service/Services";  

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Lấy phần yyyy-MM-dd
};

const formatTime = (time) => {
  const d = new Date(time);
  return d.toISOString().split('T')[0] + "T" + d.toTimeString().slice(0, 8); // Lấy phần yyyy-MM-ddTHH:mm:ss
};

const ReserveTableForm = () => {
  const [branch, setBranch] = useState([]);
  const [formData, setFormData] = useState({
    BranchID: 1,
    NumberTable: 1,
    CardID: 2,
    AmountCustomer: 1,
    DateOrder: formatDate(new Date()), // Sử dụng formatDate để đảm bảo đúng định dạng yyyy-MM-dd
    TimeOrder: formatTime(new Date()), // Sử dụng formatTime để đảm bảo đúng định dạng HH:mm
    dishes: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await getBranches();
      setBranch(data); // Lưu thông tin chi nhánh vào state
    };
    loadData();
  }, []);

  const [currentDish, setCurrentDish] = useState({
    dishName: "",
    dishAmount: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDishChange = (e) => {
    const { name, value } = e.target;
    setCurrentDish({ ...currentDish, [name]: value });
  };

  const handleAddDish = () => {
    setFormData({
      ...formData,
      dishes: [...formData.dishes, { ...currentDish }],
    });
    setCurrentDish({ dishName: "", dishAmount: 1 });
  };

  const handleReserve = async () => {
    const transformedData = {
      ...formData,
      DateOrder: `${formData.DateOrder}T00:00:00.000Z`, // Thêm thời gian mặc định cho ngày
      TimeOrder: `${formData.DateOrder}T${formData.TimeOrder}:00.000Z`, // Giữ nguyên định dạng HH:mm
    };

    console.log(transformedData); 
  
    try {
      const response = await fetch("http://localhost:3000/api/order-online", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
  
      if (!response.ok) {
        alert(`Error: ${response.status} ${response.statusText}`);
        return;
      }
  
      const result = await response.json();
      if (result.Status === "Success") {
        alert("Reservation successful!");
      } else {
        alert(`Error: ${result.ErrorMessage}`);
      }
    } catch (error) {
      alert("Network error or invalid response from server. Please try again.");
    }
  };  

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <select 
          name="BranchID" 
          className="p-3 border border-gray-300 rounded" 
          value={formData.BranchID}  // Liên kết với BranchID trong formData
          onChange={handleChange}
        >
          {branch.map((branchItem) => (
            <option key={branchItem.BranchID} value={branchItem.BranchID}>
              {branchItem.BranchName}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="NumberTable"
          placeholder="Number of Tables"
          className="p-3 border border-gray-300 rounded"
          value={formData.NumberTable}
          onChange={handleChange}
        />
      </div>
      
      <input
        type="number"
        name="AmountCustomer"
        placeholder="Amount of Customers"
        className="p-3 border border-gray-300 rounded"
        value={formData.AmountCustomer}
        onChange={handleChange}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="DateOrder"
          value={formData.DateOrder} // Giá trị luôn ở định dạng yyyy-MM-dd
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        />

        {/* Giờ đặt bàn */}
        <input
          type="time"
          name="TimeOrder"
          value={formData.TimeOrder} // Giá trị luôn ở định dạng HH:mm
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold">Add Dishes</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="dishName"
            placeholder="Dish Name"
            className="p-3 border border-gray-300 rounded"
            value={currentDish.dishName}
            onChange={handleDishChange}
          />
          <input
            type="number"
            name="dishAmount"
            placeholder="Amount of Dish"
            className="p-3 border border-gray-300 rounded"
            value={currentDish.dishAmount}
            onChange={handleDishChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2 hover:opacity-80"
          onClick={handleAddDish}
        >
          Add Dish
        </button>
      </div>

      <div>
        <h3 className="text-lg font-bold">Dishes List</h3>
        <ul>
          {formData.dishes.map((dish, index) => (
            <li key={index}>
              {dish.dishName} - {dish.dishAmount}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-yellow text-white p-3 rounded hover:opacity-90"
        onClick={handleReserve}
      >
        Reserve Now
      </button>
    </div>
  );
};

export default ReserveTableForm;
