import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ReportIssue from "./pages/ReportIssue";
import IssueList from "./pages/IssueList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ maxWidth: 900, margin: "20px auto", padding: 10 }}>
        <Routes>
          <Route path="/" element={<ReportIssue />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/issues" element={<IssueList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
