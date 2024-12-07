import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedback from "./pages/Feedback";
import HomeClient from "./pages/HomeClient";
import Introduction from "./pages/Introduction";
import LoginPage from "./pages/LoginPage";
import MenuDish from "./pages/MenuDish";
import RegisterPage from "./pages/RegisterPage";
import ReserveTable from "./pages/ReserveTable";
import React from "react";

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
      </Routes>
    </Router>
  );
};

export default App;
