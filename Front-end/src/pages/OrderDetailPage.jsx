import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Header from "../components/Header";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import { updateOrder } from "../service/Services";
import { getOrderPendingDetail } from "../service/Services";

const OrderDetailPage = () => {
  const { id } = useParams(); // Get "id" from the route "/order/detail/:id"
  const [orderDetail, setOrderDetail] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadData = async (orderID) => {
      try {
        const data = await getOrderPendingDetail(orderID);
        setOrderDetail(data);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };
    if (id) {
      loadData(id); // Call API with id from URL
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium">Loading order details...</p>
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium">No order details found.</p>
      </div>
    );
    }
    
    const handleConfirm = async () => {
            const employeeID = localStorage.getItem('EmployeeID');
            const result = await updateOrder(id, employeeID);
            if (result.success) {
                alert("Order confirmed successfully");
                window.location.reload();
            } else {
                alert("Failed to confirm order");
            }
        }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center py-6">
        <div className="flex flex-col items-center pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold">
            DETAIL ORDER {id}
          </p>
          <Decorate />
        </div>
      </div>
      <div className="p-4 rounded-md shadow-lg bg-white flex flex-col items-center mx-auto w-full md:w-2/3 lg:w-1/2 mb-8">
        <div className="mb-2 w-full p-4">
          <h2 className="text-2xl font-play text-center mb-4 font-bold text-green">Reserve Table</h2>
          <div className="text-center text-xl flex items-center justify-between mx-28">
            <p>
              <strong>Number of Tables:</strong> {orderDetail.NumberTable}
            </p>
            <p>
              <strong>Amount of Customers:</strong> {orderDetail.AmountCustomer}
            </p>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-play text-center mb-4 font-bold text-green">Reserve Dish</h2>
          {orderDetail.DetailDishs && orderDetail.DetailDishs.length > 0 ? (
            <ul className="list-disc pl-5 text-xl">
              {orderDetail.DetailDishs.map((dish, index) => (
                <li key={index} className="mb-2 flex justify-between items-center mx-32 font-play">
                  <p>
                    <strong>Dish Name:</strong> {dish.DishName}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {dish.AmountDish}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No dishes reserved.</p>
          )}
              </div>
              <button className="bg-green text-white border font-play font-bold text-lg py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-green transition-all mt-4"
              onClick={handleConfirm}>
                  Confirm Order
                </button>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
