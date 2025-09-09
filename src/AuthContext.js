import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("civic_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function login(userObj) {
    localStorage.setItem("civic_user", JSON.stringify(userObj));
    setUser(userObj);
  }
  function logout() {
    localStorage.removeItem("civic_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
