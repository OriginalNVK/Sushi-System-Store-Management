import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedback from "./pages/Feedback";
import HomeClient from "./pages/HomeClient";
import Introduction from "./pages/Introduction";
import LoginPage from "./pages/LoginPage";
import MenuDish from "./pages/MenuDish";
import RegisterPage from "./pages/RegisterPage";
import ReserveTable from "./pages/ReserveTable";
import React from "react";
import Employee from "./pages/Employee";
import Customer from "./pages/Customer";
import ReportOverview from "./pages/ReportOverview";
import Branch from "./pages/Branch";
import Booking from "./pages/Booking";
import BookingDish from "./pages/BookingDish";
import ReportByDate from "./pages/ReportByDate";
import ReportDetailByDate from "./pages/ReportDetailByDate";
import ReportByMonth from "./pages/ReportByMonth";
import ReportDetailByMonth from "./pages/ReportDetailByMonth";
import ReportByQuarter from "./pages/ReportByQuarter";
import ReportDetailByQuarter from "./pages/ReportDetailByQuarter";
import ReportByYear from "./pages/ReportByYear";
import ReportDetailByYear from "./pages/ReportDetailByYear";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/menu" element={<MenuDish />} />
        <Route path="/reserve" element={<ReserveTable />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/reports" element={<ReportOverview />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingdish" element={<BookingDish />} />
        <Route path="/reports/date" element={<ReportByDate />} />
        <Route path="/report-detail/25-12-2024" element={<ReportDetailByDate />} /> 
        <Route path="/reports/month" element={<ReportByMonth />} />
        <Route path="/report-detail/12-2024" element={<ReportDetailByMonth />} />
        <Route path="/reports/quarter" element={<ReportByQuarter />} />
        <Route path="/report-detail/4-2024" element={<ReportDetailByQuarter />} />
        <Route path="/reports/year" element={<ReportByYear />} />
        <Route path="/report-detail/2024" element={<ReportDetailByYear />} />
      </Routes>
    </Router>
  );
};

export default App;
