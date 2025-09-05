

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const LoginForm = () => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

 
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/user-profile");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!phone || !password) {
//       setErrorMessage("Please enter both phone and password.");
//       return;
//     }

//     try {
//       const payload = { phone, password, role: "customer" };
//       const response = await axios.post(
//         "https://start-your-tour-harsh.onrender.com/user/loginAll",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const token =
//         response.data?.data?.token || response.data?.token || null;
//       const userId =
//         response.data?.data?.userId || response.data?.userId || null;

//       if (!token) {
//         setErrorMessage("Login failed: Token not received.");
//         return;
//       }

//       localStorage.setItem("token", token);
//       alert(`Login Successful! Your User ID: ${userId}`);
//       setErrorMessage("");
//       navigate("/user-profile"); // redirect to navbar page
//     } catch (error) {
//       console.error("Login error:", error);
//       if (error.response?.data?.message) {
//         setErrorMessage(error.response.data.message);
//       } else if (error.request) {
//         setErrorMessage("Network error. Please check your connection.");
//       } else {
//         setErrorMessage("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <div className="card p-4 shadow border-0" style={{ maxWidth: "600px", width: "100%" }}>
//         <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

//         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label text-muted">Phone Number</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-phone"></i>
//               </span>
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 pattern="[0-9]{10}"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label text-muted">Password</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-lock"></i>
//               </span>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary w-100 mt-3 fw-semibold">
//               <i className="fas fa-sign-in-alt me-2"></i>Login
//             </button>
//           </div>
//         </form>

//         <p className="text-center mt-3 text-muted small">
//           <Link to="/forgot-password" className="text-decoration-none">
//             Forgot Password?
//           </Link>
//         </p>

//         <p className="text-center mt-3 text-muted small">
//           Don't have an account?{" "}
//           <Link to="/registrationForm" className="text-decoration-none">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

























import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user-profile");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone || !password) {
      setErrorMessage("Please enter both phone and password.");
      return;
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow border-0"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

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
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 fw-semibold"
            >
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </button>
          </div>
        </form>

        <p className="text-center mt-3 text-muted small">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </p>

        <p className="text-center mt-3 text-muted small">
          Don't have an account?{" "}
          <Link to="/registrationForm" className="text-decoration-none">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
