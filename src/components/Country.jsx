import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "https://api2-ddd4.onrender.com/api";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [type, setType] = useState(""); // "country" | "state" | "city"
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [editCountry, setEditCountry] = useState(null); // { _id, name }
  const [editCountryName, setEditCountryName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all data
  const fetchAll = async () => {
    try {
      const [c, s, ci] = await Promise.all([
        axios.get(`${baseURL}/countries`),
        axios.get(`${baseURL}/states`),
        axios.get(`${baseURL}/cities`),
      ]);
      setCountries(Array.isArray(c.data) ? c.data : c.data.data || []);
      setStates(Array.isArray(s.data) ? s.data : s.data.data || []);
      setCities(Array.isArray(ci.data) ? ci.data : ci.data.data || []);
    } catch (err) {
      setError("Failed to fetch data");
      setTimeout(() => setError(""), 2000);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Table helpers
  const getCountryName = (id) =>
    countries.find((c) => c._id === id)?.name || "-";
  const getStateName = (id) =>
    states.find((s) => s._id === id)?.name || "-";

  // Add handlers
  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (type === "country") {
        if (!countryName.trim()) return setError("Enter country name");
        await axios.post(`${baseURL}/countries`, { name: countryName.trim() });
        setCountryName("");
        setSuccess("Country added successfully!");
      } else if (type === "state") {
        if (!stateName.trim() || !selectedCountry)
          return setError("Select country and enter state name");
        await axios.post(`${baseURL}/states`, {
          name: stateName.trim(),
          countryId: selectedCountry,
        });
        setStateName("");
        setSelectedCountry("");
        setSuccess("State added successfully!");
      } else if (type === "city") {
        if (!cityName.trim() || !selectedCountry || !selectedState)
          return setError("Select country, state and enter city name");
        await axios.post(`${baseURL}/cities`, {
          name: cityName.trim(),
          stateId: selectedState,
        });
        setCityName("");
        setSelectedCountry("");
        setSelectedState("");
        setSuccess("City added successfully!");
      }
      fetchAll();
    } catch (err) {
      if (err.response && (err.response.data.message || err.response.data.error)) {
        setError(err.response.data.message || err.response.data.error);
      } else {
        setError("Failed to add " + type);
      }
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  // Edit Country
  const handleEditCountry = (country) => {
    setEditCountry(country);
    setEditCountryName(country.name);
    setModalOpen(true);
  };

  // Update country API call
  const handleUpdateCountry = async (e) => {
    e.preventDefault();
    if (!editCountryName.trim()) {
      setError("Enter country name");
      return;
    }
    try {
      await axios.put(`${baseURL}/countries/${editCountry._id}`, {
        name: editCountryName.trim(),
      });
      setModalOpen(false);
      setEditCountry(null);
      setEditCountryName("");
      fetchAll();
      setSuccess("Country updated successfully!");
    } catch (err) {
      if (err.response && (err.response.data.message || err.response.data.error)) {
        setError(err.response.data.message || err.response.data.error);
      } else {
        setError("Failed to update country");
      }
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  // Delete handlers with dependency check
  const handleDeleteCountry = async (countryId) => {
    setError("");
    setSuccess("");
    // Check for states/cities under this country
    const hasStates = states.some((s) => s.countryId === countryId);
    const hasCities = cities.some((c) => {
      const state = states.find((s) => s._id === c.stateId);
      return state && state.countryId === countryId;
    });
    if (hasCities) {
      setError("Please delete all cities under this country first.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (hasStates) {
      setError("Please delete all states under this country first.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    try {
      await axios.delete(`${baseURL}/countries/${countryId}`);
      setSuccess("Country deleted successfully!");
      fetchAll();
    } catch (err) {
      if (err.response && (err.response.data.message || err.response.data.error)) {
        setError(err.response.data.message || err.response.data.error);
      } else {
        setError("Failed to delete country");
      }
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  const handleDeleteState = async (stateId) => {
    setError("");
    setSuccess("");
    // Check for cities under this state
    const hasCities = cities.some((c) => c.stateId === stateId);
    if (hasCities) {
      setError("Please delete all cities under this state first.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    try {
      await axios.delete(`${baseURL}/states/${stateId}`);
      setSuccess("State deleted successfully!");
      fetchAll();
    } catch (err) {
      if (err.response && (err.response.data.message || err.response.data.error)) {
        setError(err.response.data.message || err.response.data.error);
      } else {
        setError("Failed to delete state");
      }
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  const handleDeleteCity = async (cityId) => {
    setError("");
    setSuccess("");
    try {
      await axios.delete(`${baseURL}/cities/${cityId}`);
      setSuccess("City deleted successfully!");
      fetchAll();
    } catch (err) {
      if (err.response && (err.response.data.message || err.response.data.error)) {
        setError(err.response.data.message || err.response.data.error);
      } else {
        setError("Failed to delete city");
      }
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  // Reset form when type changes
  useEffect(() => {
    setCountryName("");
    setStateName("");
    setCityName("");
    setSelectedCountry("");
    setSelectedState("");
    setSuccess("");
    setError("");
  }, [type]);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">Location Management System</h2>
      <h4 className="fw-bold mb-3 text-center">All Locations</h4>
      <table className="table table-bordered">
        <thead>
          <tr className="table-primary text-center">
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No data
              </td>
            </tr>
          )}
          {countries.map((country) => {
            const countryStates = states.filter(
              (s) => s.countryId === country._id
            );
            if (countryStates.length === 0) {
              return (
                <tr key={country._id}>
                  <td>{country.name}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditCountry(country)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteCountry(country._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
            return countryStates.map((state, i) => {
              const stateCities = cities.filter((c) => c.stateId === state._id);
              if (stateCities.length === 0) {
                return (
                  <tr key={country._id + state._id}>
                    <td>{i === 0 ? country.name : ""}</td>
                    <td>{state.name}</td>
                    <td>-</td>
                    <td>
                      {i === 0 && (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditCountry(country)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDeleteCountry(country._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <button className="btn btn-info btn-sm me-2">Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteState(state._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
              return stateCities.map((city, j) => (
                <tr key={country._id + state._id + city._id}>
                  <td>{i === 0 && j === 0 ? country.name : ""}</td>
                  <td>{j === 0 ? state.name : ""}</td>
                  <td>{city.name}</td>
                  <td>
                    {i === 0 && j === 0 && (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditCountry(country)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDeleteCountry(country._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {j === 0 && (
                      <>
                        <button className="btn btn-info btn-sm me-2">Edit</button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDeleteState(state._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <button className="btn btn-primary btn-sm me-2">Edit</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteCity(city._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ));
            });
          })}
        </tbody>
      </table>

      {/* Edit Country Modal */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.4)",
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title fw-bold">Edit Country</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setModalOpen(false);
                    setEditCountry(null);
                    setEditCountryName("");
                  }}
                ></button>
              </div>
              <form onSubmit={handleUpdateCountry}>
                <div className="modal-body">
                  <label className="form-label fw-semibold">Country Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editCountryName}
                    onChange={(e) => setEditCountryName(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setModalOpen(false);
                      setEditCountry(null);
                      setEditCountryName("");
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Country
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h4 className="fw-bold mt-4 mb-3 text-center">Add New Location</h4>
      <div className="mb-2 fw-semibold">Location Type:</div>
      <select
        className="form-select mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="country">Country</option>
        <option value="state">State</option>
        <option value="city">City</option>
      </select>
      {success && <div className="alert alert-success py-2">{success}</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* Dynamic Form */}
      {type === "country" && (
        <form className="mb-3" onSubmit={handleAdd}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Country Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country name"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Country
          </button>
        </form>
      )}

      {type === "state" && (
        <form className="mb-3" onSubmit={handleAdd}>
          <div className="mb-3">
            <label className="form-label fw-semibold">State Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter state name"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Country:</label>
            <select
              className="form-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Add State
          </button>
        </form>
      )}

      {type === "city" && (
        <form className="mb-3" onSubmit={handleAdd}>
          <div className="mb-3">
            <label className="form-label fw-semibold">City Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Country:</label>
            <select
              className="form-select"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState("");
              }}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">State:</label>
            <select
              className="form-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states
                .filter((s) => s.countryId === selectedCountry)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Add City
          </button>
        </form>
      )}
    </div>
  );
};

export default Country;
















