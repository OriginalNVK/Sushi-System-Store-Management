import React, { useState } from "react";

const ReserveTableForm = () => {
  const [formData, setFormData] = useState({
    BranchID: 1,
    EmployeeID: 1, 
    NumberTable: 1,
    CardID: 2, 
    AmountCustomer: 1,
    DishName: "",
    AmountDish: 1,
    DateOrder: new Date("2022-12-12").toISOString(), // ISO format for DateOrder
    TimeOrder: new Date(`1970-01-01T${"00:12"}:00Z`).toISOString(), // ISO format for TimeOrder
  });

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReserve = async () => {
    // Chuyển đổi dữ liệu `DateOrder` và `TimeOrder` thành định dạng ISO 8601
    const transformedData = {
      ...formData,
      DateOrder: new Date(`${formData.DateOrder}T00:00:00.000Z`).toISOString(), // Thêm thời gian mặc định T00:00:00
      TimeOrder: new Date(`1970-01-01T${formData.TimeOrder}:00.000Z`).toISOString(), // Gắn ngày giả định cho TimeOrder
    };
  
    console.log("Transformed Payload:", transformedData); // Log dữ liệu gửi đi để debug
  
    try {
      // Gửi dữ liệu đến backend
      const response = await fetch("http://localhost:3000/api/order-online", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
  
      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        alert(`Error: ${response.status} ${response.statusText}`);
        return;
      }
  
      const result = await response.json();
      console.log("Response JSON from backend:", result); // Log phản hồi từ backend
  
      if (result.Status === "Success") {
        alert("Reservation successful!");
      } else {
        alert(`Error: ${result.ErrorMessage}`);
      }
    } catch (error) {
      console.error("Error during reservation request:", error);
      alert("Network error or invalid response from server. Please try again.");
    }
  };
  
  
  

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Chọn chi nhánh */}
        <select
          name="BranchID"
          className="p-3 border border-gray-300 rounded"
          value={formData.BranchID}
          onChange={handleChange}
        >
          <option value="1">Branch 01</option>
          <option value="2">Branch 02</option>
          <option value="3">Branch 03</option>
        </select>
        {/* Số bàn */}
        <input
          type="number"
          name="NumberTable"
          placeholder="Number of Tables"
          className="p-3 border border-gray-300 rounded"
          value={formData.NumberTable}
          onChange={handleChange}
        />
      </div>
      {/* Số lượng khách */}
      <input
        type="number"
        name="AmountCustomer"
        placeholder="Amount of Customers"
        className="p-3 border border-gray-300 rounded"
        value={formData.AmountCustomer}
        onChange={handleChange}
      />
      {/* Ngày và giờ */}
        <div className="grid grid-cols-2 gap-4">
        {/* Ngày đặt bàn */}
        <input
          type="date"
          name="DateOrder"
          value={formData.DateOrder}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        />
        {/* Giờ đặt bàn */}
        <input
          type="time"
          name="TimeOrder"
          value={formData.TimeOrder}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded"
        />
      </div>

      {/* Tên món ăn */}
      <input
        type="text"
        name="DishName"
        placeholder="Dish Name"
        className="p-3 border border-gray-300 rounded"
        value={formData.DishName}
        onChange={handleChange}
      />
      {/* Số lượng món ăn */}
      <input
        type="number"
        name="AmountDish"
        placeholder="Amount of Dish"
        className="p-3 border border-gray-300 rounded"
        value={formData.AmountDish}
        onChange={handleChange}
      />
      {/* Ghi chú */}
      <textarea
        name="notes"
        placeholder="Notes (Optional)"
        rows={3}
        className="p-3 border border-gray-300 rounded resize-none"
        onChange={handleChange}
      ></textarea>
      {/* Nút đặt bàn */}
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
