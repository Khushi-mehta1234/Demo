import React from "react";
import "./App.css";
import { Route, Routes,  useLocation  } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Forgot from "./components/Forgot.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx"; 
import UserProfile from "./components/UserProfile.jsx";
import Navbar from "./components/Navbar.jsx";
import Country from "./components/Country.jsx";
import Result from "./components/Result.jsx";
import Product from "./components/Product.jsx";

function App() {

  const location = useLocation();
  const hideNavbar =
  location.pathname === "/" ||
  location.pathname === "/Registration" ||
  location.pathname === "/Forgot";

  return (
    <>
   {!hideNavbar && <Navbar />}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/Forgot" element={<Forgot />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Country" element={<Country />} />
      <Route path="/Product" element={<Product/>} />
    </Routes>
    </>
  );
}

export default App;
