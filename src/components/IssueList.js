import React from "react";
import axios from "axios";

export default function IssueList({ issues, setIssues }) {
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/issues/${id}`, { status: newStatus });
      setIssues((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>All Issues</h3>
      {issues.map((i) => (
        <div key={i.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <h4>{i.title}</h4>
          <p>{i.description}</p>
          <p>Status: {i.status}</p>
          <select
            value={i.status}
            onChange={(e) => updateStatus(i.id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
}
