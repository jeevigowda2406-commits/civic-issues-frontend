import React from "react";

export default function Filters({ filter, setFilter }) {
  return (
    <div>
      <h3>Filter Issues:</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
}
