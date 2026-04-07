import React, { useState, useEffect } from "react";
import axios from "axios";

function UserPage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [issues, setIssues] = useState([]);
  const [priority, setPriority] = useState("low");

  const fetchIssues = async () => {
    const res = await axios.get("http://localhost:5001/api/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const submitIssue = async (e) => {
    e.preventDefault();

    console.log("SENDING DATA:", {
    title,
    description,
    location,
    priority
  });
  
  await axios.post("http://localhost:5001/api/issues", {
    title,
    description,
    location,
    priority
  });

    fetchIssues();

    setTitle("");
    setDescription("");
    setLocation("");
  };

  return (

    <div className="container mt-5">

      {/* 🔹 Header with Logout */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Report Campus Issue</h2>

        <button
          className="btn btn-secondary"
          onClick={() => window.location.href = "/"}
        >
          Logout
        </button>
      </div>

      {/* 🔹 Form */}
      <div className="card p-4 shadow">

        <form onSubmit={submitIssue}>

          <input
            className="form-control mb-3"
            placeholder="Issue Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            required
          />

          <select
          className="form-control mb-3"
          value={priority}
          onChange={(e)=>{
            console.log("SELECTED:", e.target.value);
            setPriority(e.target.value);
          }}
          >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          </select>

          <button className="btn btn-primary w-100">
            Submit Issue
          </button>

        </form>

      </div>

      {/* 🔹 Issues List */}
      <h3 className="mt-5">Reported Issues</h3>

      {issues.map(issue => (
        <div className="card mt-3 p-3 shadow" key={issue._id}>

          <h5>{issue.title}</h5>

          <p>{issue.description}</p>

          <p><b>Location:</b> {issue.location}</p>

          <p><b>Priority:</b> {issue.priority}</p>

          <p><b>Status:</b> {issue.status}</p>

          <p>
            <b>Reported At:</b> {new Date(issue.createdAt).toLocaleString()}
          </p>

        </div>
      ))}

    </div>

  );
}

export default UserPage;