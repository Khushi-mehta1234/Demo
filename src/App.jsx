import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Country from "./components/country";
import StudentData from "./components/studentData";
import ForgotPassword from "./components/ForgotPassowrd.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegistrationForm from "./components/RegistaerationForm";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />

              <Route path="/user-profile" element={<Navbar />} />
      <Route path="/registrationForm" element={<RegistrationForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/country" element={<Country/>} />
      <Route path="/student-data" element={<StudentData />} />
    </Routes>
   
  );
}

export default App;
