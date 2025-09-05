// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UserProfile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email_address: "",
//     password: "",
//     gender: "",
//     city: "",
//     state: "",
//     photo: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [message, setMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No token found. Redirecting to login...");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "https://start-your-tour-harsh.onrender.com/user/userprofile",
//           {
//             headers: { Authorization: ` ${token}` },
//           }
//         );

//         const userDetails = response.data?.data?.[0]?.user_details?.[0];

//         if (userDetails) {
//           setProfile({
//             name: userDetails.name,
//             email_address: userDetails.email_address,
//             password: userDetails.password,
//             gender: userDetails.gender,
//             city: userDetails.city,
//             state: userDetails.state,
//             photo: userDetails.photo,
//           });
//           setErrorMessage("");
//         } else {
//           setErrorMessage("User details are missing.");
//         }
//       } catch (error) {
//         console.error(" Error fetching profile:", error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         } else {
//           setErrorMessage("Failed to fetch profile. Please try again later.");
//         }
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", profile.name);
//       formData.append("email_address", profile.email_address);
//       formData.append("gender", profile.gender);
//       formData.append("city", profile.city);
//       formData.append("state", profile.state);

//       if (selectedFile) {
//         formData.append("photo", selectedFile);
//       }

//       const response = await axios.put(
//         "https://start-your-tour-harsh.onrender.com/user/changeprofile/",
//         formData,
//         {
//           headers: {
//             Authorization: ` ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage(response.data.message || "Profile updated successfully!");
//       setErrorMessage("");
//       setIsEditing(false);

//       // ✅ Refresh page after successful update
//       window.location.reload();

//     } catch (error) {
//       console.error("❌ Error updating profile:", error);
//       setMessage("");
//       setErrorMessage(
//         error.response?.data?.message || "Failed to update profile. Please try again."
//       );
//     }
//   };

//   const renderProfileInfo = () => (
//     <>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email Address:</strong> {profile.email_address}</p>
//       <p><strong>Gender:</strong> {profile.gender}</p>
//       <p><strong>City:</strong> {profile.city}</p>
//       <p><strong>State:</strong> {profile.state}</p>

//       <p><strong>Photo:</strong></p>
//       {profile.photo ? (
//         <img
//           src={profile.photo}
//           alt="Profile"
//           width="160"
//           height="150"
//           style={{
//             borderRadius: "50%",
//             marginBottom: "10px",
//             marginLeft: "20px",
//           }}
//         />
//       ) : (
//         <p>No photo uploaded</p>
//       )}

//       <button
//         className="btn btn-primary w-100 mt-3"
//         onClick={() => setIsEditing(true)}
//       >
//         Edit Profile
//       </button>
//     </>
//   );

//   const renderProfileForm = () => (
//     <form onSubmit={handleSubmit}>
//       {[
//         { label: "Name", name: "name", type: "text" },
//         { label: "Email Address", name: "email_address", type: "email" },
//         { label: "City", name: "city", type: "text" },
//         { label: "State", name: "state", type: "text" },
//       ].map(({ label, name, type }) => (
//         <div className="mb-3" key={name}>
//           <label className="form-label">{label}</label>
//           <input
//             type={type}
//             className="form-control"
//             name={name}
//             value={profile[name]}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       ))}

//       <div className="mb-3" key="photo">
//         <label className="form-label">Profile Photo</label>
//         <input
//           type="file"
//           className="form-control"
//           name="photo"
//           accept="image/*"
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//         />
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Gender</label>
//         <select
//           className="form-select"
//           name="gender"
//           value={profile.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//       </div>

//       <button type="submit" className="btn btn-success w-100 mt-3">
//         Save Changes
//       </button>
//       <button
//         type="button"
//         className="btn btn-secondary w-100 mt-2"
//         onClick={() => setIsEditing(false)}
//       >
//         Cancel
//       </button>
//     </form>
//   );

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
//         <h2 className="text-center text-primary mb-4">User Profile</h2>

//         {message && <div className="alert alert-success">{message}</div>}
//         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

//         {!isEditing ? renderProfileInfo() : renderProfileForm()}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;










import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email_address: "",
    gender: "",
    city: "",
    state: "",
    photo: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load profile from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let photoUrl = profile.photo;
    if (selectedFile) {
      photoUrl = URL.createObjectURL(selectedFile); // temporary local preview
    }

    const updatedProfile = { ...profile, photo: photoUrl };

    // save to localStorage
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setMessage("Profile updated successfully!");
    setIsEditing(false);
  };

  const renderProfileInfo = () => (
    <>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email Address:</strong> {profile.email_address}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>City:</strong> {profile.city}</p>
      <p><strong>State:</strong> {profile.state}</p>

      <p><strong>Photo:</strong></p>
      {profile.photo ? (
        <img
          src={profile.photo}
          alt="Profile"
          width="160"
          height="150"
          style={{
            borderRadius: "50%",
            marginBottom: "10px",
            marginLeft: "20px",
          }}
        />
      ) : (
        <p>No photo uploaded</p>
      )}

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
    </>
  );

  const renderProfileForm = () => (
    <form onSubmit={handleSubmit}>
      {[ 
        { label: "Name", name: "name", type: "text" },
        { label: "Email Address", name: "email_address", type: "email" },
        { label: "City", name: "city", type: "text" },
        { label: "State", name: "state", type: "text" },
      ].map(({ label, name, type }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">{label}</label>
          <input
            type={type}
            className="form-control"
            name={name}
            value={profile[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <div className="mb-3" key="photo">
        <label className="form-label">Profile Photo</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <select
          className="form-select"
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success w-100 mt-3">
        Save Changes
      </button>
      <button
        type="button"
        className="btn btn-secondary w-100 mt-2"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </form>
  );

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-4">User Profile</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {!isEditing ? renderProfileInfo() : renderProfileForm()}
      </div>
    </div>
  );
};

export default UserProfile;
