import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDishes, bookOrder } from '../service/Services'; // Assuming these APIs exist.
import Decorate from '../components/Decorate';

const BookingDish = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDishID, setSelectedDishID] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState([]);
  const [cardID, setCardID] = useState(null);

  // Fetch dishes from API on component mount
  useEffect(() => {
    const loadDishes = async () => {
      const data = await getDishes();
      setDishes(data);
    };

    loadDishes();

    // Mock CardID retrieval (replace with real customer CardID logic)
    const mockCardID = 1234; // Replace with actual card fetching logic
    setCardID(mockCardID);
  }, []);

  const handleAddDish = () => {
    if (!selectedDishID || quantity <= 0) {
      alert('Please select a valid dish and quantity.');
      return;
    }

    const selectedDish = dishes.find((dish) => dish.DishID === selectedDishID);

    // Add dish to the order
    setOrder((prevOrder) => [
      ...prevOrder,
      { DishID: selectedDishID, DishName: selectedDish.DishName, Quantity: quantity },
    ]);

    // Reset selection and quantity
    setSelectedDishID('');
    setQuantity(1);
  };

  const handleBooking = async () => {
    if (order.length === 0) {
      alert('Your order is empty. Please add dishes.');
      return;
    }

    if (!cardID) {
      alert('Unable to identify your CardID.');
      return;
    }

    const response = await bookOrder({ cardID, order });

    if (response.ok) {
      alert('Order booked successfully!');
      setOrder([]); // Clear the order after booking
    } else {
      alert('Failed to book the order.');
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

        {/* Dish Selection */}
        <div className="w-full max-w-lg">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Select Dish
          </label>
          <select
            value={selectedDishID}
            onChange={(e) => setSelectedDishID(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          >
            <option value="" disabled>
              Choose a dish
            </option>
            {dishes.map((dish) => (
              <option key={dish.DishID} value={dish.DishID}>
                {dish.DishName} - {dish.Price}$
              </option>
            ))}
          </select>

          {/* Quantity */}
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
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
          {order.length > 0 ? (
            <ul className="border border-gray-300 rounded-lg p-4">
              {order.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{item.DishName}</span>
                  <span>Qty: {item.Quantity}</span>
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
