import React from 'react'
import { useNavigate } from 'react-router-dom' 
import Header from '../components/Header'
import Footer from '../components/Footer'
import Decorate from '../components/Decorate'

const OrderOverview = () => {

    const navigate = useNavigate();

    const handleOrderOnline = () => navigate("/order-online");
    const handleOrderOffline = () => navigate("/order-offline");

  return (
      <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6 items-center">
          <p className="text-yellow text-4xl font-play py-2 font-bold">ORDER OVERVIEW</p>
          <Decorate />
        </div>
        <button
          onClick={handleOrderOnline}
          className="w-full max-w-xs border rounded-full border-green border-[3px] bg-green text-white text-xl p-3 m-3 hover:bg-white hover:text-green transition-all duration-300"
        >
          Order Online
        </button>
        <button
          onClick={handleOrderOffline}
          className="w-full max-w-xs border rounded-full border-red border-[3px] bg-red text-white text-xl p-3 m-3 hover:bg-white hover:text-red transition-all duration-300"
        >
          Order Offline
        </button>   
      </div>
      <Footer />
    </div>
  )
}

export default OrderOverview;
