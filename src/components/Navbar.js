import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <nav style={{
      background: "#0b74de",
      color: "white",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <Link to="/" style={{ color: "white", marginRight: 12, textDecoration: "none" }}>Report</Link>
        <Link to="/issues" style={{ color: "white", textDecoration: "none" }}>Issues</Link>
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>{user.email}</span>
            <button onClick={handleLogout} style={{ padding: "6px 10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" style={{ color: "white", marginRight: 12, textDecoration: "none" }}>Signup</Link>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
