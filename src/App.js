import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ReportIssue from "./pages/ReportIssue";
import ReportedIssues from "./pages/ReportedIssues";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" || false
  );
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser("");
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">
            <img src="/gov-logo.png" alt="Indian Government" className="gov-logo" />
            Civic Issues Portal
          </div>
          <div className="nav-links">
            {!isLoggedIn && <Link to="/signup">Signup</Link>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {isLoggedIn && <Link to="/report">Report Issue</Link>}
            {isLoggedIn && <Link to="/issues">My Issues</Link>}
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/report" />
              ) : (
                <Signup setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/report" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
              )
            }
          />
          <Route
            path="/report"
            element={
              isLoggedIn ? (
                <ReportIssue currentUser={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/issues"
            element={
              isLoggedIn ? (
                <ReportedIssues currentUser={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/report" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
