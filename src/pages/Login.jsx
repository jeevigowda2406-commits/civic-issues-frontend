import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-10 w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Authority Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl text-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold text-lg"
        >
          Login
        </button>
        <p className="mt-4 text-lg text-center">
          No account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
