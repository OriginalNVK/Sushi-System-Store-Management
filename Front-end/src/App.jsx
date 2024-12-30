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
import Invoice from "./pages/Invoice";
import InvoiceDetails from "./pages/InvoiceDetails";
import AddEmployee from "./pages/AddEmployee";
import OrderOnlinePage from "./pages/OrderOnlinePage";
import OrderOfflinePage from "./pages/OrderOfflinePage";
import OrderDetailPage from "./pages/OrderDetailPage"; 
import OrderOverview from "./pages/OrderOverview";
import UpdateEmployee from "./pages/UpdateEmployee";

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
        <Route path="/invoices" element={<Invoice />} />
        <Route path="/invoice/detail/:id" element={<InvoiceDetails />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/order-overview" element={<OrderOverview />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/order-offline" element={<OrderOfflinePage />} />
        <Route path="/order/detail/:id" element={<OrderDetailPage />} />
        <Route path="/employee/:id" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
