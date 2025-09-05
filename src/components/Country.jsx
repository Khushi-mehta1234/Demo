import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Data = {
  India: {
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
  },
  
};

const Country =() =>{
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const countries = Object.keys(Data);
  const states = country ? Object.keys(Data[country]) : [];
  const cities = country && state ? Data[country][state] : [];

  return (
    <div className="container-fluid  d-flex align-items-center justify-content-center bg-gradient  bg-opacity-10">
      <div className="card shadow-lg border-0 rounded-4 p-5 w-75">
        <h3 className="mb-4 fw-bold text-primary d-flex align-items-center">
          Select Your Location
        </h3>

        <div className="row g-4">
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Country
            </label>
            <select
              className="form-select border-primary shadow-sm"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setState("");
                setCity("");
              }}
            >
              <option value=""> Select country</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              State
            </label>
            <select
              className="form-select border-success shadow-sm"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity("");
              }}
              disabled={!country}
            >
              <option value=""> Select state</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              City
            </label>
            <select
              className="form-select border-info shadow-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
            >
              <option value=""> Select city</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {(country || state || city) && (
          <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200 text-gray-700">
            <p className="font-semibold text-lg mb-2">Your Selection:</p>
            <p>
              {" "}
              Country:{" "}
              <span className="font-medium text-blue-700">
                {country || "-"}
              </span>
            </p>
            <p>
              {" "}
              State:{" "}
              <span className="font-medium text-blue-700">{state || "-"}</span>
            </p>
            <p>
              {" "}
              City:{" "}
              <span className="font-medium text-blue-700">{city || "-"}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Country;
