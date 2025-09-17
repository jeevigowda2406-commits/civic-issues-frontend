import React, { useState } from "react";
import "./ReportIssue.css";

function ReportIssue() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Issue submitted:\n" + description + "\n" + location);
    // Later: send data to backend API
  };

  return (
    <div className="report-issue">
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default ReportIssue;
