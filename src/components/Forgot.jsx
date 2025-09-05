import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Forgot = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://start-your-tour-harsh.onrender.com/user/send-otp",
        { phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message || "OTP sent successfully! Check your mobile."
      );
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Failed to send OTP. Please try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setMessage("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow border-0"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Forgot Password
        </h3>
        {message && <div className="alert alert-success">{message}</div>}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3 fw-semibold"
          >
            <i className="fas fa-paper-plane me-2"></i>Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
