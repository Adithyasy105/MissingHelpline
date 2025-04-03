import React from "react";
import { Navigate } from "react-router-dom";

// Function to check if user is logged in
const isAuthenticated = () => {
    return !!localStorage.getItem("authToken"); // Check if auth token exists
};

// Function to get user role
const getUserRole = () => {
    return localStorage.getItem("role"); // Get role from localStorage
};

// ✅ Ensure only admins can access admin routes
const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    }

    if (adminOnly && getUserRole() !== "admin") {
        return <Navigate to="/" replace />; // Redirect if not admin
    }

    return children;
};

export default ProtectedRoute;
