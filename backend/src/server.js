const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Issue = require("./models/Issue");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();


// POST API → Report Issue
app.post("/api/issues", async (req, res) => {
  try {

    const { title, description, location, priority } = req.body;

    console.log("REQ BODY:", req.body);

    const newIssue = new Issue({
      title,
      description,
      location,
      priority: priority || "low"
    });

    await newIssue.save();

    res.json({
      message: "Issue reported successfully",
      issue: newIssue
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// GET API → Fetch all issues
app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// PUT API → Update Issue Status
app.put("/api/issues/:id", async (req, res) => {
  try {

    const { status } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Issue status updated successfully",
      issue: updatedIssue
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE ISSUE
app.delete("/api/issues/:id", async (req, res) => {
  try {

    await Issue.findByIdAndDelete(req.params.id);

    res.json({
      message: "Issue deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Start Server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});