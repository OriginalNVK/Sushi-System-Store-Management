import React from 'react'
import { useNavigate } from 'react-router-dom' 
import Header from '../components/Header'
import Footer from '../components/Footer'
import Decorate from '../components/Decorate'

const Booking = () => {

    const navigate = useNavigate();

    const handleReserveTable = () => navigate("/reserve");
    const handleBookingDish = () => navigate("/bookingdish");

  return (
      <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6 items-center">
          <p className="text-yellow text-4xl font-play py-2 font-bold">BOOKING</p>
          <Decorate />
              </div>
           <button
          onClick={handleReserveTable}
          className="w-full max-w-xs border rounded-full border-green border-[3px] bg-green text-white text-xl p-3 m-3 hover:bg-white hover:text-green transition-all duration-300"
        >
          Reserve Table
        </button>
        <button
          onClick={handleBookingDish}
          className="w-full max-w-xs border rounded-full border-red border-[3px] bg-red text-white text-xl p-3 m-3 hover:bg-white hover:text-red transition-all duration-300"
        >
          Booking Dish
        </button>   
      </div>
      <Footer/>
    </div>
  )
}

export default Booking