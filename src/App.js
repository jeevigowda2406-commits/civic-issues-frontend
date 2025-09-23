import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import emblem from "./assets/emblem.png";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <header>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={emblem} alt="Indian Emblem" />
          <h1>Municipal Authority Dashboard</h1>
        </div>
        <nav>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>Welcome, {user}</span>
              <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: "white", marginRight: "15px" }}>Login</Link>
              <Link to="/signup" style={{ color: "white" }}>Signup</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;

