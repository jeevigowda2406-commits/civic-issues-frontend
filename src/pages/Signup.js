import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && password) {
      setUser(username); 
      navigate("/");
    } else {
      alert("Fill in all fields");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Choose Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Choose Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
