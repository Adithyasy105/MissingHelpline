import React, { useState } from "react";
import { requestHelp } from "../api/helpAPI";
import "../styles/HelpRequest.css"; // Import styles

const HelpRequest = () => {
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const helpData = { location, message };
        const response = await requestHelp(helpData);

        if (response.success) {
            setResponseMessage({ type: "success", text: "Help request submitted successfully!" });
            setLocation("");
            setMessage("");
        } else {
            setResponseMessage({ type: "danger", text: response.error });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Request Emergency Help</h2>

            {responseMessage && (
                <div className={`alert alert-${responseMessage.type}`} role="alert">
                    {responseMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="help-form">
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Help Request</button>
            </form>
        </div>
    );
};

export default HelpRequest;
