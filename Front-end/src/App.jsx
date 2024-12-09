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
      </Routes>
    </Router>
  );
};

export default App;
