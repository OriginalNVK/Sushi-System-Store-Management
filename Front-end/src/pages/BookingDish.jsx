import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Decorate from "../components/Decorate";

const BookingDish = () => {
  const [branchID, setBranchID] = useState(1); // Giả định BranchID là 1 (có thể lấy từ API)
  const [amountCustomer, setAmountCustomer] = useState(null); // Để null nếu không cần
  const [dishName, setDishName] = useState("");
  const [dishAmount, setDishAmount] = useState(1);
  const [dishes, setDishes] = useState([]);
  const [orderDate, setOrderDate] = useState(null); // Để null
  const [orderTime, setOrderTime] = useState(null); // Để null

  const handleAddDish = () => {
    if (!dishName.trim() || dishAmount <= 0) {
      alert("Please enter a valid dish name and quantity.");
      return;
    }

    // Thêm món ăn vào danh sách
    setDishes((prevDishes) => [
      ...prevDishes,
      { dishName: dishName.trim(), dishAmount: dishAmount },
    ]);

    // Reset input
    setDishName("");
    setDishAmount(1);
  };

  const handleBooking = async () => {
    if (dishes.length === 0) {
      alert("Your order is empty. Please add dishes.");
      return;
    }

    // Dữ liệu gửi đến API
    const orderData = {
      BranchID: branchID,
      AmountCustomer: amountCustomer,
      DateOrder: orderDate,
      TimeOrder: orderTime,
      dishes,
    };

    try {
      const response = await fetch("http://localhost:3000/api/order-online/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order booked successfully!");
        setDishes([]); // Xóa danh sách món ăn sau khi đặt hàng thành công
      } else {
        const error = await response.text();
        alert("Failed to book the order: " + error);
      }
    } catch (err) {
      console.error("Error booking order:", err);
      alert("Failed to connect to the server.");
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

        {/* BranchID (cố định hoặc nhập) */}
        <div className="w-full max-w-lg mb-4">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Branch ID
          </label>
          <input
            type="number"
            value={branchID}
            onChange={(e) => setBranchID(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter Branch ID"
          />
        </div>

        {/* Dish Input */}
        <div className="w-full max-w-lg">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Enter Dish Name
          </label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter dish name"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          />

          {/* Dish Amount */}
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={dishAmount}
            onChange={(e) => setDishAmount(Math.max(1, parseInt(e.target.value)))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          />

          {/* Add Dish Button */}
          <button
            onClick={handleAddDish}
            className="w-full bg-green text-white text-lg p-2 rounded-lg hover:opacity-80 transition-all duration-300"
          >
            + Add Dish
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full max-w-lg mt-8">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          {dishes.length > 0 ? (
            <ul className="border border-gray-300 rounded-lg p-4">
              {dishes.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{item.dishName}</span>
                  <span>Qty: {item.dishAmount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your order is empty.</p>
          )}
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          className="w-full max-w-xs bg-yellow text-white text-lg p-3 rounded-lg mt-6 hover:opacity-80 transition-all duration-300"
        >
          Book Now
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDish;
