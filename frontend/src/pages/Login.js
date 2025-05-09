import React, { useState } from "react";
import { loginUser } from "../api/authAPI"; // Assuming you have an API function to login
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Admin credentials for verification (if you use specific credentials for admin)
    const ADMIN_EMAIL = "admin4@example.com";  // Replace with the admin email
    const ADMIN_PASSWORD = "adminpassword";  // Replace with the admin password

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset message before login attempt

        // Call the login API to authenticate the user
        const response = await loginUser(email, password);

        if (response.success) {
            // Assume the response contains the user data (id, name, email, role)
            const userData = response.data.user;
            let role = userData.role || "user";  // Default to "user" if no role is provided

            // If it's the admin credentials, assign "admin" role (optional)
            if (userData.email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                role = "admin";
            }

            // Store the auth token and user data (with role) in localStorage
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("role", role); // Store role (admin or user)
            localStorage.setItem("user", JSON.stringify({ ...userData, role }));

            // Make sure the role is correctly stored
            console.log("Stored user data in localStorage:", localStorage.getItem("user"));

            setMessage("✅ Login Successful!");
            setTimeout(() => navigate("/"), 1000); // Redirect after success
        } else {
            setMessage(`❌ ${response.error}`);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2 className="text-center mb-3">Login</h2>
                {message && <div className="text-danger text-center mb-2">{message}</div>}
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
                <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                <div className="text-end small">
                    Not registered? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
