import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { getReports } from "../api/reportAPI"; // Import API function

const Home = () => {
    const [reports, setReports] = useState([]); // State to store reports

    // Fetch reports when the component loads
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            console.log("Fetching from API: http://localhost:5000/api/reports/all"); // Log API endpoint
            const response = await getReports();
            console.log("Full API Response:", response);
            console.log("API Data:", response.data);
            setReports(response.data); // Update state
        } catch (error) {
            console.error("Error fetching reports:", error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div className="container mt-4">
            <h1 className="text-center">Welcome to Missing Person Help System</h1>
            <p className="text-center">This platform helps people report and find missing individuals.</p>

            {/* Statistics Section */}
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card stats-card">
                        <h3>5000+</h3>
                        <p>Missing Reports</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card stats-card">
                        <h3>3000+</h3>
                        <p>Found Persons</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card stats-card">
                        <h3>200+</h3>
                        <p>Active Cases</p>
                    </div>
                </div>
            </div>

            {/* Missing Persons Showcase */}
            <h2 className="mt-5">Missing Persons</h2>
            <div className="row">
                {reports.length === 0 ? (
                    <p>No missing person reports found.</p>
                ) : (
                    reports.map((report) => (
                        <div className="col-md-3" key={report.id}>
                            <div className="card">
                                <img 
                                    src={report.photo ? `http://localhost:5000/uploads/${report.photo}` : "default-image.jpg"} 
                                    className="card-img-top" 
                                    alt={report.personName} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{report.personName}</h5>
                                    <p>ID: {report.id}</p>
                                    <p>Last Seen: {report.lastSeenLocation}</p>
                                    <p>Contact: {report.contactPhone}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
