import React, { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

export default function ReportIssue() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);
  const [uploading, setUploading] = useState(false);
  const nav = useNavigate();

  async function pickLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by browser. Enter location manually.");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      alert(`Location captured: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
    }, (err) => {
      alert("Could not get location: " + err.message);
    });
  }

  async function handleSubmit() {
    if (!title || !desc) {
      alert("Please enter title and description");
      return;
    }

    setUploading(true);
    let imageData = null;
    try {
      imageData = await fileToBase64(file); // data:image/png;base64,...
    } catch (e) {
      console.error(e);
      alert("Failed to read image");
    }

    const payload = {
      title,
      description: desc,
      image_url: imageData || "",
      location: location || null,
      reporter: user?.email ?? "anonymous"
    };

    try {
      await api.post("/issues", payload);
      alert("Issue reported successfully");
      nav("/issues");
    } catch (err) {
      console.error(err);
      alert("Error reporting issue: " + (err?.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h2>Report a Civic Issue</h2>

      <div style={{ marginBottom: 10 }}>
        <label>Title</label><br/>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{width:"100%", padding:8}} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Description</label><br/>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} style={{width:"100%", padding:8}} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Photo (optional)</label><br/>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        {file && <div style={{marginTop:8}}><img src={URL.createObjectURL(file)} alt="preview" style={{maxWidth:200}}/></div>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <button onClick={pickLocation} style={{padding:"6px 10px"}}>Capture my GPS location</button>
        {location && <div style={{marginTop:8}}>Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}</div>}
      </div>

      <div>
        <button onClick={handleSubmit} disabled={uploading} style={{padding:"8px 16px"}}>
          {uploading ? "Submitting..." : "Submit Issue"}
        </button>
      </div>
    </div>
  );
}
