// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const baseURL = "https://api2-ddd4.onrender.com/api";

// const Country = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [cityName, setCityName] = useState("");
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   // Fetch countries, states, cities
//   const fetchAll = async () => {
//     try {
//       const [c, s, ci] = await Promise.all([
//         axios.get(`${baseURL}/countries`),
//         axios.get(`${baseURL}/states`),
//         axios.get(`${baseURL}/cities`),
//       ]);
//       setCountries(Array.isArray(c.data) ? c.data : c.data.data || []);
//       setStates(Array.isArray(s.data) ? s.data : s.data.data || []);
//       setCities(Array.isArray(ci.data) ? ci.data : ci.data.data || []);
//     } catch {
//       setError("Failed to fetch data");
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   // Filter states by selected country
//   const filteredStates = states.filter(
//     (s) => s.countryId === selectedCountry
//   );

//   // Add city handler
//   const handleAddCity = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     if (!cityName || !selectedCountry || !selectedState) {
//       setError("Please fill all fields.");
//       return;
//     }
//     try {
//       await axios.post(`${baseURL}/cities`, {
//         name: cityName,
//         stateId: selectedState,
//       });
//       setCityName("");
//       setSuccess("City added successfully!");
//       fetchAll();
//     } catch {
//       setError("Failed to add city.");
//     }
//   };

//   // Get country/state name by id
//   const getCountryName = (id) =>
//     countries.find((c) => c._id === id)?.name || "-";
//   const getStateName = (id) =>
//     states.find((s) => s._id === id)?.name || "-";

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-center fw-bold">Location Management System</h2>
//       <h4 className="fw-bold mb-3">All Locations</h4>
//       <table className="table table-bordered">
//         <thead>
//           <tr className="table-primary text-center">
//             <th>Country</th>
//             <th>State</th>
//             <th>City</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cities.length === 0 && (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No data
//               </td>
//             </tr>
//           )}
//           {cities.map((city) => (
//             <tr key={city._id}>
//               <td>{getCountryName(states.find(s => s._id === city.stateId)?.countryId)}</td>
//               <td>{getStateName(city.stateId)}</td>
//               <td>{city.name}</td>
//               <td>
//                 <button className="btn btn-warning btn-sm me-2">Edit</button>
//                 <button className="btn btn-danger btn-sm">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h4 className="fw-bold mt-4 mb-3">Add New Location</h4>
//       <form className="mb-3" onSubmit={handleAddCity}>
//         <div className="mb-2 fw-semibold">Location Type:</div>
//         <select className="form-select mb-3" disabled>
//           <option>City</option>
//         </select>
//         {success && (
//           <div className="alert alert-success py-2">{success}</div>
//         )}
//         {error && (
//           <div className="alert alert-danger py-2">{error}</div>
//         )}
//         <div className="mb-3">
//           <label className="form-label fw-semibold">City Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter city name"
//             value={cityName}
//             onChange={(e) => setCityName(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label fw-semibold">Country:</label>
//           <select
//             className="form-select"
//             value={selectedCountry}
//             onChange={(e) => {
//               setSelectedCountry(e.target.value);
//               setSelectedState("");
//             }}
//           >
//             <option value="">Select Country</option>
//             {countries.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label fw-semibold">State:</label>
//           <select
//             className="form-select"
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             disabled={!selectedCountry}
//           >
//             <option value="">Select State</option>
//             {filteredStates.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button className="btn btn-primary" type="submit">
//           Add City
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Country;