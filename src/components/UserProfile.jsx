import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () =>{
  const [formData, setFormData] = useState({
    name:'',
    phone:'',
    email_address:'',
    gender:'',
    city:'',
    state:'',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(()=>{
  const token = localStorage.getItem("token");
  if(!token){
    setError("No token found, please log in.");
    setLoading(false);
    return;
  }

  axios
      .get("https://start-your-tour-harsh.onrender.com/user/userprofile",{
        headers: {
          Authorization: `${token}`},
      })
      .then((res) => {
        const user = res.data.data && res.data.data[0];
        const details = user && user.user_details && user.user_details[0];
        setFormData({
          name: details?.name || '',
            phone: user?.phone?.toString() || "",
            email_address: details?.email_address || "",
          gender: details?.gender || "",
          city: details?.city || "",
          state: details?.state || "", 
        });
         setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile. Please login again.");
        setLoading(false);
      });
  }, []);

// for changes

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // Handle form submit
    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please login first.");
      return;
    }
    try {
      const res = await axios.put(
        "https://start-your-tour-harsh.onrender.com/user/changeprofile/",
        formData,
        { headers: { Authorization: ` ${token}` } }
      );
      setFormData(res.data.updatedUser || res.data.data || res.data);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      setMessage("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  // View mode
  if (!isEditing)
    return (
      <div className="container mt-5">
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
          <h2 className="text-center text-primary mb-4">User Profile</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <p>
            <b>Name:</b> {formData.name}
          </p>
          <p>
            <b>Phone:</b> {formData.phone}
          </p>
          <p>
            <b>Email:</b> {formData.email_address}
          </p>
         
          <p>
            <b>Gender:</b> {formData.gender}
          </p>
          <p>
            <b>City:</b> {formData.city}
          </p>
          <p>
            <b>State:</b> {formData.state}
          </p>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
 return(
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
        <h2 className="text-center text-primary mb-4">Edit Profile</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              className="form-control"
              type="email"
              required
            />
          </div>
         
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
 <button
            type="submit"
            className="btn btn-success w-100 mt-3"
          >
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
      </div>
    </div>
  );
};

export default UserProfile;


