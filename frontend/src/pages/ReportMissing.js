import React, { useState } from "react";
import { createReport } from "../api/reportAPI";

const ReportMissing = () => {
  const [formData, setFormData] = useState({
    personName: "",
    age: "",
    gender: "",
    lastSeenLocation: "",
    contactPhone: "",
    photo: null,
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Get token from storage
    if (!token) {
      setMessage({ type: "danger", text: "Please log in to report." });
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    const result = await createReport(form, token);
    if (result.success) {
      setMessage({ type: "success", text: "Report submitted successfully!" });
      setFormData({
        personName: "",
        age: "",
        gender: "",
        lastSeenLocation: "",
        contactPhone: "",
        photo: null,
      });
    } else {
      setMessage({ type: "danger", text: result.error });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Report a Missing Person</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="personName"
            value={formData.personName}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="Enter age"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Last Seen Location</label>
          <input
            type="text"
            className="form-control"
            name="lastSeenLocation"
            value={formData.lastSeenLocation}
            onChange={handleChange}
            required
            placeholder="Enter last seen location"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Phone</label>
          <input
            type="text"
            className="form-control"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            placeholder="Enter contact number"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportMissing;
