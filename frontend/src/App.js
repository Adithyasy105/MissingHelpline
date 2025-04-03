import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportMissing from "./pages/ReportMissing";
import HelpRequest from "./pages/HelpRequest";
import FoundPerson from "./pages/FoundPerson";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* ✅ Protected Routes - Only logged-in users can access these */}
                <Route 
                    path="/report-missing" 
                    element={<ProtectedRoute><ReportMissing /></ProtectedRoute>} 
                />
                <Route 
                    path="/request-help" 
                    element={<ProtectedRoute><HelpRequest /></ProtectedRoute>} 
                />
                <Route 
                    path="/found-person" 
                    element={<ProtectedRoute><FoundPerson /></ProtectedRoute>} 
                />

                {/* ✅ Admin Protected Route - Only admins can access */}
                <Route 
                    path="/admin" 
                    element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} 
                />
            </Routes>
        </Router>
    );
}

export default App;
