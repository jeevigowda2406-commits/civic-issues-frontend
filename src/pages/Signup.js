import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSignup() {
    if (!email || !password) {
      alert("Please fill email and password");
      return;
    }
    const users = JSON.parse(localStorage.getItem("civic_users") || "[]");
    if (users.find((u) => u.email === email)) {
      alert("User already exists, please login");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("civic_users", JSON.stringify(users));
    alert("Signup success. Please login.");
    nav("/login");
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{width:"100%", padding:8}} />
      <br/><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{width:"100%", padding:8}} />
      <br/><br/>
      <button onClick={handleSignup} style={{padding:"8px 16px"}}>Create account</button>
    </div>
  );
}
