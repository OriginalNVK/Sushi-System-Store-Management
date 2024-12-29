import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import if using routing
import Decorate from '../components/Decorate';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReportOverview = () => {
  const navigate = useNavigate(); // For navigation

  // Define navigation or action handlers
  const handleReportByDate = () => navigate('/reports/date');
  const handleReportByMonth = () => navigate('/reports/month');
  const handleReportByQuarter = () => navigate('/reports/quarter');
  const handleReportByYear = () => navigate('/reports/year');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6 items-center">
          <p className="text-yellow text-4xl font-play py-2 font-bold">
            REPORT OVERVIEW
          </p>
          <Decorate />
        </div>
        {/* Buttons for different reports */}
        <button
          onClick={handleReportByDate}
          className="w-full max-w-xs border rounded-full border-green border-[3px] bg-green text-white text-xl p-3 m-3 hover:bg-white hover:text-green transition-all duration-300"
        >
          Report Revenue By Date
        </button>
        <button
          onClick={handleReportByMonth}
          className="w-full max-w-xs border rounded-full border-red border-[3px] bg-red text-white text-xl p-3 m-3 hover:bg-white hover:text-red transition-all duration-300"
        >
          Report Revenue By Month
        </button>
        <button
          onClick={handleReportByQuarter}
          className="w-full max-w-xs border rounded-full border-[#673AB7] border-[3px] bg-[#673AB7] text-white text-xl p-3 m-3 hover:bg-white hover:text-[#673AB7] transition-all duration-300"
        >
          Report Revenue By Quarter
        </button>
        <button
          onClick={handleReportByYear}
          className="w-full max-w-xs border rounded-full border-yellow border-[3px] bg-yellow text-white text-xl p-3 m-3 hover:bg-white hover:text-yellow transition-all duration-300"
        >
          Report Revenue By Year
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ReportOverview;
