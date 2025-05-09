import React, { useState } from "react";
import { registerUser } from "../api/authAPI";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const response = await registerUser(name, email, password, "user");

        if (response.success) {
            setSuccess("✅ Registration successful! You can now log in.");
        } else {
            setError(`❌ ${response.error}`);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2 className="text-center mb-3">Register</h2>
                {error && <div className="text-danger text-center mb-2">{error}</div>}
                {success && <div className="text-success text-center mb-2">{success}</div>}
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-success w-100 mb-3">Register</button>
                <div className="text-end small">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
