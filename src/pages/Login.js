import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  function handleLogin() {
    const users = JSON.parse(localStorage.getItem("civic_users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert("Invalid credentials. If new, please signup.");
      return;
    }
    login({ email });
    nav("/");
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{width:"100%", padding:8}}/>
      <br/><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{width:"100%", padding:8}}/>
      <br/><br/>
      <button onClick={handleLogin} style={{padding:"8px 16px"}}>Login</button>
    </div>
  );
}
