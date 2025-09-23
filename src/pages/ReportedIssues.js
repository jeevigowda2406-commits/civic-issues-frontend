import React from "react";

function ReportedIssues() {
  const currentUser = localStorage.getItem("currentUser");
  const issues = JSON.parse(localStorage.getItem("issues")) || [];
  const userIssues = issues.filter(issue => issue.user === currentUser);

  return (
    <div className="form-container">
      <h2>Reported Issues</h2>
      {userIssues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        <ul>
          {userIssues.map((issue, index) => (
            <li key={index} style={{ marginBottom: "20px", listStyle: "none" }}>
              <strong>{issue.description}</strong> <br />
              Location: {issue.location} <br />
              Status: {issue.status} <br />
              {issue.image && <img src={issue.image} alt="Reported Issue" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReportedIssues;
