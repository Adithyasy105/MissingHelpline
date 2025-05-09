import React, { useEffect, useState } from "react";
import { getAllFoundPersons, createFoundPerson } from "../api/foundPersonAPI";
import "../styles/foundperson.css";

const FoundPerson = () => {
  const [foundPersons, setFoundPersons] = useState([]);
  const [formData, setFormData] = useState({
    reportId: "",
    place: "",
    message: "",
    contactPhone: "",
    photo: null,
    status: "pending",
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const token = localStorage.getItem("authToken");
  const loggedInUserId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchFoundPersons = async () => {
      const response = await getAllFoundPersons();

      // Check if response.data is an array and success is true
      if (response.success && Array.isArray(response.data)) {
        // Remove the filtering logic based on logged-in user
        setFoundPersons(response.data);
      } else {
        setResponseMessage({
          type: "danger",
          text: response.error || "Failed to fetch found persons",
        });
      }
    };

    fetchFoundPersons();

    // Check if there's a reportId in the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const reportIdFromURL = urlParams.get("reportId");
    if (reportIdFromURL) {
      setFormData((prevData) => ({
        ...prevData,
        reportId: reportIdFromURL,
      }));
    }
  }, [loggedInUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setResponseMessage({
        type: "danger",
        text: "You must be logged in to report a found person.",
      });
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("place", formData.place);
    formDataToSubmit.append("message", formData.message);
    formDataToSubmit.append("contactPhone", formData.contactPhone);
    if (formData.photo) {
      formDataToSubmit.append("photo", formData.photo);
    }

    // If there's a reportId, add it to the form data
    if (formData.reportId && formData.reportId.trim() !== "") {
      formDataToSubmit.append("reportId", formData.reportId.trim());
    }

    const response = await createFoundPerson(formDataToSubmit, token);

    if (response.success) {
      setResponseMessage({
        type: "success",
        text: "Found person report submitted successfully!",
      });
      // Clear form data after submission
      setFormData({
        reportId: "",
        place: "",
        message: "",
        contactPhone: "",
        photo: null,
        status: "pending",
      });
    } else {
      setResponseMessage({ type: "danger", text: response.error });
    }
  };

  return (
    <div className="report-container">
      <h2>Found Person Reports</h2>

      {responseMessage && (
        <div className={`alert alert-${responseMessage.type}`} role="alert">
          {responseMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="found-person-form">
        <div className="form-group">
          <label>Place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            required
            placeholder="Enter the place"
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="Enter the message"
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            required
            placeholder="Enter contact phone number"
          />
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input type="file" name="photo" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Report ID (Optional)</label>
          <input
            type="text"
            name="reportId"
            value={formData.reportId}
            onChange={handleInputChange}
            placeholder="Enter report ID if matched"
          />
          <small className="form-text text-muted">
            (Optional) If this person matches a missing report, enter the Report ID.
          </small>
        </div>

        <button type="submit" className="btn-submit">
          Report Found Person
        </button>
      </form>

      <div className="found-person-list">
        {foundPersons.length > 0 ? (
          foundPersons.map((person) => (
            <div key={person._id} className="found-person-item">
              <h3>{person.place}</h3>
              <p>{person.message}</p>
              {isAdmin || person.status !== "pending" ? (
                <p>Status: {person.status}</p>
              ) : (
                <p>Status: Pending</p>
              )}
            </div>
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default FoundPerson;
