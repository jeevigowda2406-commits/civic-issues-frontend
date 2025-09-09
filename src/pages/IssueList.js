import React, { useEffect, useState } from "react";
import api from "../services/api";

function IssueCard({ issue }) {
  return (
    <div style={{border:"1px solid #ddd", padding:12, marginBottom:10, borderRadius:6}}>
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <p><b>Status:</b> {issue.status}</p>
      {issue.location && <p><b>Location:</b> {issue.location.lat ? `${issue.location.lat.toFixed(5)}, ${issue.location.lng.toFixed(5)}` : issue.location}</p>}
      {issue.image_url && (
        <div style={{marginTop:8}}>
          {/* supports both dataURI (base64) and regular URLs */}
          <img src={issue.image_url} alt="issue" style={{maxWidth: "100%", maxHeight: 300}} />
        </div>
      )}
      <small style={{color:"#666"}}>Reported by: {issue.reporter || "unknown"}</small>
    </div>
  )
}

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchIssues() {
    setLoading(true);
    try {
      const res = await api.get("/issues");
      setIssues(res.data || []);
    } catch (e) {
      alert("Failed to fetch issues: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIssues();
    // poll every 10s while page is open to show updates:
    const t = setInterval(fetchIssues, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <h2>Reported Issues</h2>
      {loading && <div>Loading...</div>}
      {!loading && issues.length === 0 && <div>No issues yet. Be the first to report!</div>}
      {issues.map(i => <IssueCard key={i.id} issue={i} />)}
    </div>
  );
}
