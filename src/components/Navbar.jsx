import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login if not logged in
    } else {
      setUser({ name: (user), avatar: "./images/1.jpg" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-0">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>

          <div
            className="d-flex justify-content-end gap-3 p-2 rounded"
            style={{ background: "linear-gradient(90deg, #0d6efd, #0a58ca)" }}
          >
            <a
              href="Result"
              className="text-light fw-semibold px-3 py-2 rounded"
              style={{ textDecoration: "none", transition: "0.3s" }}
            >
              Result
            </a>
            <a
              href="Country"
              className="text-light fw-semibold px-3 py-2 rounded"
              style={{ textDecoration: "none", transition: "0.3s" }}
            >
              Location
            </a>
             <a
              href="Product"
              className="text-light fw-semibold px-3 py-2 rounded"
              style={{ textDecoration: "none", transition: "0.3s" }}
            >
              Product
            </a>
          </div>

          <div className="d-flex ms-auto align-items-center">
            {user && (
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <img
                    src={user.avatar}
                    alt="User"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </a>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    dropdownOpen ? "show" : ""
                  }`}
                >
                  <li>
                    <Link className="dropdown-item" to="/UserProfile">
                      View Profile
                    </Link>
                  </li>
                  
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h1>Welcome!</h1>
       
      </div>
    </>
  );
};

export default Navbar;
