import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportIssue() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIssue = { description, location, image, status: "Pending", user: currentUser };

    const issues = JSON.parse(localStorage.getItem("issues")) || [];
    issues.push(newIssue);
    localStorage.setItem("issues", JSON.stringify(issues));

    alert("Issue reported!");
    setDescription("");
    setLocation("");
    setImage(null);
    navigate("/reported");
  };

  return (
    <div className="form-container">
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
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" style={{ width: "100%", maxHeight: "200px", marginTop: "10px", objectFit: "cover" }} />}
        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default ReportIssue;
