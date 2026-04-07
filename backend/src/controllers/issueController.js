const Issue = require("../models/Issue");

/* ===============================
   CREATE ISSUE
================================= */
exports.createIssue = async (req, res) => {
  try {
    const { title, description, location, priority } = req.body;

    console.log("REQ BODY:", req.body); // debug (you can remove later)

    const issue = new Issue({
      title,
      description,
      location,
      priority: priority ? priority.toLowerCase() : "low" // ✅ FIXED
    });

    await issue.save();

    res.status(201).json({
      message: "Issue reported successfully",
      issue
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};


/* ===============================
   GET ALL ISSUES
================================= */
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 }); // latest first
    res.json(issues);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};


/* ===============================
   UPDATE ISSUE STATUS
================================= */
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({
        message: "Issue not found"
      });
    }

    res.json({
      message: "Issue status updated successfully",
      issue: updatedIssue
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};


/* ===============================
   DELETE ISSUE
================================= */
exports.deleteIssue = async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

    if (!deletedIssue) {
      return res.status(404).json({
        message: "Issue not found"
      });
    }

    res.json({
      message: "Issue deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};