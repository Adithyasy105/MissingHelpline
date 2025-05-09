import React, { useState } from "react";
import { createReport } from "../api/reportAPI";
import "../styles/ReportMissing.css";

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

    const token = localStorage.getItem("authToken");
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
      // Reset all fields including file input
      setFormData({
        personName: "",
        age: "",
        gender: "",
        lastSeenLocation: "",
        contactPhone: "",
        photo: null,
      });
      // Reset file input manually
      document.getElementById("photoInput").value = "";
    } else {
      setMessage({ type: "danger", text: result.error });
    }
  };

  return (
    <div className="report-container">
      <h2>Report a Missing Person</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="personName">Full Name</label>
          <input
            type="text"
            id="personName"
            name="personName"
            value={formData.personName}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
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

        <div className="form-group">
          <label htmlFor="lastSeenLocation">Last Seen Location</label>
          <input
            type="text"
            id="lastSeenLocation"
            name="lastSeenLocation"
            value={formData.lastSeenLocation}
            onChange={handleChange}
            required
            placeholder="Enter last seen location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            placeholder="Enter contact number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photoInput">Upload Photo</label>
          <input
            type="file"
            id="photoInput"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportMissing;
