import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {

  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchIssues = async () => {
    const res = await axios.get("http://localhost:5001/api/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5001/api/issues/${id}`, { status });
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    await axios.delete(`http://localhost:5001/api/issues/${id}`);
    fetchIssues();
  };

  return (

    <div className="container mt-5">

      {/* 🔹 Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Issue Management</h2>

        <button
          className="btn btn-secondary"
          onClick={() => window.location.href = "/"}
        >
          Logout
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        className="form-control mb-3"
        placeholder="Search issues..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      {/* 🎯 Filter */}
      <select
        className="form-control mb-3"
        value={filter}
        onChange={(e)=>setFilter(e.target.value)}
      >
        <option value="all">All Issues</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      {/* 📊 Dashboard */}
      <div className="row mb-4">

        <div className="col">
          <div className="card p-3 shadow">
            <h5>Total Issues</h5>
            <h3>{issues.length}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 shadow">
            <h5>Pending</h5>
            <h3>{issues.filter(i=>i.status==="pending").length}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 shadow">
            <h5>In Progress</h5>
            <h3>{issues.filter(i=>i.status==="in-progress").length}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 shadow">
            <h5>Resolved</h5>
            <h3>{issues.filter(i=>i.status==="resolved").length}</h3>
          </div>
        </div>

      </div>

      {/* 🔹 Issues List */}
      {
        issues
        .filter(issue =>
          issue.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter(issue =>
          filter === "all" ? true : issue.status === filter
        )
        .map(issue => (

        <div className="card p-3 mb-3 shadow" key={issue._id}>

          <h5>{issue.title}</h5>

          <p>{issue.description}</p>

          <p><b>Location:</b> {issue.location}</p>

          {/* ✅ Priority Added */}
          <p><b>Priority:</b> {issue.priority}</p>

          <p><b>Status:</b> {issue.status}</p>

          <p>
            <b>Reported At:</b> {new Date(issue.createdAt).toLocaleString()}
          </p>

          {/* 🔹 Action Buttons */}
          <div className="mt-2">

            <button
              className="btn btn-warning me-2"
              onClick={() => updateStatus(issue._id, "in-progress")}
            >
              In Progress
            </button>

            <button
              className="btn btn-success me-2"
              onClick={() => updateStatus(issue._id, "resolved")}
            >
              Resolved
            </button>

            <button
              className="btn btn-danger"
              onClick={() => deleteIssue(issue._id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>

  );

}

export default AdminPage;