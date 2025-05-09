import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { getAllReports } from "../api/reportAPI";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        const result = await getAllReports();
        if (result.success) {
            setReports(result.data);
        } else {
            console.error("Error fetching reports:", result.error);
        }
    };

    const handleViewMore = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

    const handleFoundPersonRedirect = (reportId) => {
        window.location.href = `/found-person?reportId=${reportId}`;
    };

    return (
        <div className="page-transition">
            <div className="container home-container">
                <h1 className="text-center mb-3">Welcome to the Missing Person Help System</h1>
                <p className="text-center mb-5">This platform helps people report and find missing individuals.</p>
                <p className="text-center mb-5">
                    The Missing Person Help System is a community-driven platform aimed at helping families and authorities locate missing individuals.
                    Users can report missing persons, view reports, and update found person details. Administrators manage reported cases and update statuses.
                    By connecting users and officials through a centralized system, it ensures faster communication and better tracking of missing persons.
                </p>

                <h3 className="text-center mb-4">How It Works</h3>
                <p className="text-justify">
                    The system allows users to report missing persons by providing details such as name, last seen location, contact number, and a photo.
                    Once reported, the case appears on the platform for community awareness. If someone finds a missing person, they can update the report as "Found."
                    Administrators oversee and manage all reports to maintain accurate and up-to-date information.
                </p>

                <div className="row home-stats mb-5">
                    <div className="col-md-4 mb-3">
                        <div className="stat-card">
                            <h2>5000+</h2>
                            <p>Missing Reports</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="stat-card">
                            <h2>3000+</h2>
                            <p>Found Persons</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="stat-card">
                            <h2>200+</h2>
                            <p>Active Cases</p>
                        </div>
                    </div>
                </div>

                <h2 className="mb-4">Reported Missing Persons</h2>
                <div className="row">
                    {reports.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No missing person reports found.</p>
                        </div>
                    ) : (
                        reports.map((report) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={report.id}>
                                <div className="card h-100 shadow-sm">
                                    {report.photo ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${report.photo}`}
                                            alt="Missing Person"
                                            className="img-fluid rounded-top"
                                            style={{ height: "200px", objectFit: "cover", width: "100%" }}
                                            onError={(e) => e.target.style.display = "none"}
                                        />
                                    ) : (
                                        <div className="text-center text-muted p-3">No photo available</div>
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{report.personName}</h5>
                                        <p><strong>ID:</strong> {report.id}</p>
                                        <p><strong>Last Seen:</strong> {report.lastSeenLocation}</p>
                                        <p><strong>Contact:</strong> {report.contactPhone}</p>
                                        <Button variant="primary" className="mt-auto" onClick={() => handleViewMore(report)}>View More</Button>
                                        <Button variant="success" className="mt-2" onClick={() => handleFoundPersonRedirect(report.id)}>Found Person</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Missing Person Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedReport && (
                            <div>
                                {selectedReport.photo && (
                                    <img
                                        src={`http://localhost:5000/uploads/${selectedReport.photo}`}
                                        alt="Missing Person"
                                        className="img-fluid mb-3"
                                        style={{ height: "300px", objectFit: "cover", width: "100%" }}
                                    />
                                )}
                                <p><strong>Name:</strong> {selectedReport.personName}</p>
                                <p><strong>ID:</strong> {selectedReport.id}</p>
                                <p><strong>Last Seen:</strong> {selectedReport.lastSeenLocation}</p>
                                <p><strong>Age:</strong> {selectedReport.age}</p>
                                <p><strong>Gender:</strong> {selectedReport.gender}</p>
                                <p><strong>Contact Phone:</strong> {selectedReport.contactPhone}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Home;
