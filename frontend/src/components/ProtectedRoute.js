import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");  // Check if auth token exists
};

// Function to get the user role from localStorage
const getUserRole = () => {
    return localStorage.getItem("role");  // Get the role directly from localStorage
};

// Protected Route: Ensures only authenticated users can access certain pages
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [loading, setLoading] = useState(true); // Loading state

    // On component mount, set loading to false to stop loading animation/spinner
    useEffect(() => {
        setLoading(false);  
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // You can return a loading spinner or a message
    }

    // If not authenticated, redirect to login page
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // If admin-only page, check if the user is an admin
    if (adminOnly && getUserRole() !== "admin") {
        return <Navigate to="/" replace />;  // Redirect to home page or another page
    }

    // If authenticated and role matches, render the children (content of the route)
    return children;
};

export default ProtectedRoute;
