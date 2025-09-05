

// import React, { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   // Dummy user data
//   const user = {
//     name: "John Doe",
//     avatar: "https://i.pravatar.cc/40" // random profile image
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-50">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="/">
//           MyApp
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={toggleMenu}
//           aria-controls="navbarNav"
//           aria-expanded={isMenuOpen}
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-center">
//             <li className="nav-item me-3">
//               <a className="nav-link" href="student-data">
//                 Result
//               </a>
//             </li>
//             <li className="nav-item me-3">
//               <a className="nav-link" href="location">
//                 Location
//               </a>
//             </li>

//             {/* User Profile Dropdown */}
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle d-flex align-items-center"
//                 href="#"
//                 role="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setIsMenuOpen(!isMenuOpen);
//                 }}
//               >
//                 <img
//                   src={user.avatar}
//                   alt="User"
//                   className="rounded-circle"
//                   width="40"
//                   height="40"
//                 />
//               </a>
//               <ul className={`dropdown-menu dropdown-menu-end ${isMenuOpen ? "show" : ""}`}>
//                 <li>
//                   <a className="dropdown-item" href="/user-profile">
//                     User Profile
//                   </a>
//                 </li>
               
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;














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
      setUser({ name: "John Doe", avatar: "./images/1.jpg" });
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
    href="student-data" 
    className="text-light fw-semibold px-3 py-2 rounded" 
    style={{ textDecoration: "none", transition: "0.3s" }}
  >
    Result
  </a>
  <a 
    href="location" 
    className="text-light fw-semibold px-3 py-2 rounded" 
    style={{ textDecoration: "none", transition: "0.3s" }}
  >
    Location
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
                <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item" to="/user-profile">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/edit-profile">
                      Edit Profile
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
        <h1>Welcome, {user?.name}!</h1>
        <p>This is your dashboard.</p>
      </div>
    </>
  );
};

export default Navbar;
