import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">MissingHelp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/report-missing">Report Missing</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/request-help">Request Help</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/found-person">Found Person</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/admin">Admin Panel</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
