import React, { useState } from "react";
import { requestHelp } from "../api/helpAPI";
import "../styles/HelpRequest.css";

const HelpRequest = () => {
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState(""); // Changed 'message' to 'reason'
  const [responseMessage, setResponseMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const helpData = { location, reason }; // Use `reason` instead of `message`
    const response = await requestHelp(helpData);

    if (response.success) {
      setResponseMessage({
        type: "success",
        text: "Help request submitted successfully!",
      });
      setLocation("");
      setReason(""); // Clear `reason` after successful submission
    } else {
      setResponseMessage({ type: "danger", text: response.error });
    }
  };

  const handleAutoFillLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            if (data && data.display_name) {
              setLocation(data.display_name); // Real address like 'Indiranagar, Bengaluru, Karnataka...'
            } else {
              setLocation(`Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
            }
          } catch (error) {
            setResponseMessage({
              type: "danger",
              text: "Unable to get address. Please enter it manually.",
            });
          }
        },
        (error) => {
          setResponseMessage({
            type: "danger",
            text: "Location access denied or unavailable.",
          });
        }
      );
    } else {
      setResponseMessage({
        type: "danger",
        text: "Geolocation is not supported by your browser.",
      });
    }
  };

  return (
    <div className="help-page-wrapper">
      <div className="help-request-container">
        <h2>Request Emergency Help</h2>

        {responseMessage && (
          <div className={`alert alert-${responseMessage.type}`} role="alert">
            {responseMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group location-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter your location"
            />
            <button
              type="button"
              className="autofill-btn"
              onClick={handleAutoFillLocation}
            >
              Use My Location
            </button>
          </div>

          <div className="form-group">
            <label>Reason</label> {/* Changed from Message to Reason */}
            <textarea
              className="form-control"
              rows="3"
              value={reason} // Bind to `reason` instead of `message`
              onChange={(e) => setReason(e.target.value)} // Update state for reason
              required
              placeholder="Describe the emergency reason"
            />
          </div>
          <button type="submit" className="btn-submit">
            Submit Help Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpRequest;
