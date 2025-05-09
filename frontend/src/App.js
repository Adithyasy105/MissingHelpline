import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportMissing from "./pages/ReportMissing";
import HelpRequest from "./pages/HelpRequest";
import FoundPerson from "./pages/FoundPerson";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import bgImage from "./assets/bg.jpg"; // ✅ import background image

function App() {
  useEffect(() => {
    // ✅ Apply background on mount
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.transition = "background 0.5s ease-in-out";

    // ✅ Cleanup on unmount
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="main-content flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/report-missing"
              element={
                <ProtectedRoute>
                  <ReportMissing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-help"
              element={
                <ProtectedRoute>
                  <HelpRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/found-person"
              element={
                <ProtectedRoute>
                  <FoundPerson />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
