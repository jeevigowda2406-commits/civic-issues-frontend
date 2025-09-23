import React, { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./Filters";
import IssueList from "./IssueList";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/issues"); // backend API
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredIssues =
    filter === "All" ? issues : issues.filter((i) => i.status === filter);

  // Pie chart data
  const pieData = [
    { name: "Pending", value: issues.filter((i) => i.status === "Pending").length },
    { name: "In Progress", value: issues.filter((i) => i.status === "In Progress").length },
    { name: "Resolved", value: issues.filter((i) => i.status === "Resolved").length },
  ];

  const COLORS = ["#FFBB28", "#0088FE", "#00C49F"];

  return (
    <div style={{ padding: "20px" }}>
      <Filters filter={filter} setFilter={setFilter} />
      <div style={{ display: "flex", gap: "50px", marginTop: "20px" }}>
        <div style={{ flex: 1 }}>
          <IssueList issues={filteredIssues} setIssues={setIssues} />
        </div>
        <div>
          <h3>Issue Status Overview</h3>
          <PieChart width={400} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
