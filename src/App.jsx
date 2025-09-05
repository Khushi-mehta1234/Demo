import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ForgotPassword from "./components/ForgotPassword.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegistrationForm from "./components/RegistaerationForm.jsx"; 
import UserProfile from "./components/UserProfile.jsx";
import Navbar from "./components/Navbar.jsx";
import Country from "./components/country.jsx";
import Result from "./components/Result.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Navbar" element={<Navbar />} />
      <Route path="/RegistrationForm" element={<RegistrationForm />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Country" element={<Country />} />
    </Routes>
  );
}

export default App;
