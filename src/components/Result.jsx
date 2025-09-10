import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "https://marksheet-harsh.onrender.com";

const Result = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    maths: "",
    science: "",
    english: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const axiosInstance = axios.create({
    baseURL,
  });

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/marksheet/marksheets");
      const data = (res.data.data || res.data.students || res.data || []).map(
        (s) => ({
          roll: s.rollno,
          name: s.name,
          marks: {
            maths: s.maths,
            science: s.science,
            english: s.english,
          },
        })
      );
      setStudents(data);
    } catch (err) {
      if (err.response) {
        console.error("Backend Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Frontend Error:", err.message);
      }
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch students."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change for form
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Calculate total marks
  const calculateTotal = (marks) =>
    (parseInt(marks.maths) || 0) +
    (parseInt(marks.science) || 0) +
    (parseInt(marks.english) || 0);

  // Add student
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      rollno: parseInt(formData.roll),
      name: formData.name,
      maths: parseInt(formData.maths),
      science: parseInt(formData.science),
      english: parseInt(formData.english),
    };

    try {
      await axiosInstance.post("/marksheet/marksheets", studentData);
      fetchStudents();
      setFormData({
        roll: "",
        name: "",
        maths: "",
        science: "",
        english: "",
      });
      setError("");
    } catch (err) {
      if (err.response) {
        console.error("Backend Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Frontend Error:", err.message);
      }
      setError(
        err.response?.data?.message || err.message || "Failed to save student."
      );
    }
  };

  // Open edit modal
  const handleEdit = async (student) => {
    setIsEdit(true);
    setError("");
    try {
      const res = await axiosInstance.get(
        `/marksheet/marksheets/${student.roll}`
      );
      const s = res.data;
      setFormData({
        roll: s.roll,
        name: s.name,
        maths: s.marks.maths,
        science: s.marks.science,
        english: s.marks.english,
      });
    } catch {
      setFormData({
        roll: student.roll,
        name: student.name,
        maths: student.marks.maths,
        science: student.marks.science,
        english: student.marks.english,
      });
    }
    setEditModalOpen(true);
  };

  // Update student from modal
  const handleUpdate = async (e) => {
    e.preventDefault();
    const studentData = {
      rollno: parseInt(formData.roll),
      name: formData.name,
      maths: parseInt(formData.maths),
      science: parseInt(formData.science),
      english: parseInt(formData.english),
    };

    try {
      await axiosInstance.put(
        `/marksheet/marksheets/${formData.roll}`,
        studentData
      );
      fetchStudents();
      setIsEdit(false);
      setEditModalOpen(false);
      setFormData({
        roll: "",
        name: "",
        maths: "",
        science: "",
        english: "",
      });
      setError("");
    } catch (err) {
      if (err.response) {
        console.error("Backend Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Frontend Error:", err.message);
      }
      setError(
        err.response?.data?.message || err.message || "Failed to update student."
      );
    }
  };

  // Delete student (DELETE)
  const handleDelete = async (roll) => {
    setError("");
    try {
      await axiosInstance.delete(`/marksheet/marksheets/${roll}`);
      fetchStudents();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to delete student."
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Marksheet</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-3 mt-4">
        <h5>Add Student</h5>
        <form className="row g-2" onSubmit={handleSubmit}>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="roll"
              placeholder="Roll"
              value={formData.roll}
              onChange={handleChange}
              required
              disabled={isEdit}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="maths"
              placeholder="Maths"
              value={formData.maths}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="science"
              placeholder="Science"
              value={formData.science}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="english"
              placeholder="English"
              value={formData.english}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
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
                <h4 className="modal-title fw-bold">Edit Student</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setEditModalOpen(false);
                    setIsEdit(false);
                    setFormData({
                      roll: "",
                      name: "",
                      maths: "",
                      science: "",
                      english: "",
                    });
                  }}
                ></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="row g-2">
                    <div className="col-md-2">
                      <input
                        type="text"
                        className="form-control"
                        name="roll"
                        placeholder="Roll"
                        value={formData.roll}
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        name="maths"
                        placeholder="Maths"
                        value={formData.maths}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        name="science"
                        placeholder="Science"
                        value={formData.science}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        name="english"
                        placeholder="English"
                        value={formData.english}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditModalOpen(false);
                      setIsEdit(false);
                      setFormData({
                        roll: "",
                        name: "",
                        maths: "",
                        science: "",
                        english: "",
                      });
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table table-bordered table-striped text-center mt-4">
        <thead className="table-dark">
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Maths</th>
            <th>Science</th>
            <th>English</th>
            <th>Total</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const total = calculateTotal(s.marks);
            const result = total >= 120 ? "Pass" : "Fail";
            return (
              <tr key={s.roll}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.marks.maths}</td>
                <td>{s.marks.science}</td>
                <td>{s.marks.english}</td>
                <td>{total}</td>
                <td
                  className={result === "Pass" ? "text-success" : "text-danger"}
                >
                  {result}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(s.roll)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Result;