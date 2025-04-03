import React, { useState } from "react";
import { loginUser } from "../api/authAPI"; // Ensure this file exists
import { useNavigate } from "react-router-dom"; // For redirection
import "../styles/Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Redirect hook

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        const response = await loginUser(email, password);

        if (response.success) {
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
            setMessage("✅ Login Successful!");
            
            setTimeout(() => {
                navigate("/"); // Redirect to home
            }, 1000);
        } else {
            setMessage(`❌ ${response.error}`);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h2 className="text-center">Login</h2>
                {message && <p className="text-center text-danger">{message}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
