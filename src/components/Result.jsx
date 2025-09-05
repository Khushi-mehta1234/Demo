import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Result = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "abc",
      roll: "1",
      marks: { JAVA: 85, PHP: 70, JAVASCRIPT: 80 },
    },
    {
      id: 2,
      name: "def",
      roll: "2",
      marks: { JAVA: 95, PHP: 80, JAVASCRIPT: 50 },
    },
    {
      id: 3,
      name: "ghi",
      roll: "3",
      marks: { JAVA: 55, PHP: 10, JAVASCRIPT: 30 },
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    roll: "",
    JAVA: "",
    PHP: "",
    JAVASCRIPT: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateTotal = (marks) =>
    Object.values(marks).reduce((a, b) => a + b, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id: isEdit ? formData.id : Date.now(),
      name: formData.name,
      roll: formData.roll,
      marks: {
        JAVA: parseInt(formData.JAVA),
        PHP: parseInt(formData.PHP),
        JAVASCRIPT: parseInt(formData.JAVASCRIPT),
      },
    };

    if (isEdit) {
      setStudents(students.map((s) => (s.id === formData.id ? newData : s)));
      setIsEdit(false);
    } else {
      setStudents([...students, newData]);
    }

    setFormData({
      id: null,
      name: "",
      roll: "",
      JAVA: "",
      PHP: "",
      JAVASCRIPT: "",
    });
  };

  const handleEdit = (s) => {
    setIsEdit(true);
    setFormData({ id: s.id, name: s.name, roll: s.roll, ...s.marks });
  };

  const handleDelete = (id) => setStudents(students.filter((s) => s.id !== id));

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Marksheet</h2>

      {/* Form */}
      <div className="card p-3 mt-4">
        <h5>{isEdit ? "Edit Student" : "Add Student"}</h5>
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
              name="JAVA"
              placeholder="JAVA"
              value={formData.JAVA}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="PHP"
              placeholder="PHP"
              value={formData.PHP}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="JAVASCRIPT"
              placeholder="JS"
              value={formData.JAVASCRIPT}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>JAVA</th>
            <th>PHP</th>
            <th>JS</th>
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
              <tr key={s.id}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.marks.JAVA}</td>
                <td>{s.marks.PHP}</td>
                <td>{s.marks.JAVASCRIPT}</td>
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
                    onClick={() => handleDelete(s.id)}
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
