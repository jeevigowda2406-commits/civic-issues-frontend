import React from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold text-gray-800 flex items-center gap-2">
          <img src="/indian-emblem.png" alt="Emblem" className="h-14" />
          Authority Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-xl"
        >
          Logout
        </button>
      </header>

      <p className="text-2xl mb-6">Welcome, {user?.email}</p>

      {/* Other dashboard features remain the same */}
    </div>
  );
}

export default Dashboard;
