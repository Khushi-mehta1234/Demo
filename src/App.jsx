import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import StudentData from "./components/StudentData.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Navbar from "./components/Navbar.jsx";
import Country from "./components/country.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/registration-form" element={<RegistrationForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/student-data" element={<StudentData />} />
      <Route path='/country' element = {<Country/>}/>
    </Routes>
  );
}

export default App;
