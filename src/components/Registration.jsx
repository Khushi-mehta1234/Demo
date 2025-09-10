import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email_address: "",
    password: "",
    gender: "",
    city: "",
    state: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email_address ||
      !formData.password ||
      !formData.gender ||
      !formData.city ||
      !formData.state
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://start-your-tour-harsh.onrender.com/user",
        formData
      );
      if (response.status === 201 || response.status === 200) {
        setMessage("Registration successful! ");
        setErrorMessage("");
        localStorage.setItem("token", response.data.token);
        handleReset();
      } else {
        setErrorMessage("Registration failed. Please try again.");
        setMessage("");
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
      setMessage("");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email_address: "",
      password: "",
      gender: "",
      city: "",
      state: "",
    });
    setMessage("");
    setErrorMessage("");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-4">User Registration</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              placeholder="10-digit number"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="d-block">Gender</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>

          {/* City */}
          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* State */}
          <div className="mb-3">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-4 pt-3">
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "210px" }}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              style={{ width: "210px" }}
            >
              Reset
            </button>
          </div>

          <p className="text-center mt-3 text-muted small">
            Already registered?{" "}
            <Link to="/" className="text-decoration-none">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
