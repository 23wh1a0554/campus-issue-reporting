const express = require("express");
const router = express.Router();

const issueController = require("../controllers/issueController");

// 🔍 DEBUG (IMPORTANT)
console.log("Controller:", issueController);

// Routes
router.post("/", issueController.createIssue);
router.get("/", issueController.getIssues);
router.put("/:id", issueController.updateIssueStatus);
router.delete("/:id", issueController.deleteIssue);

module.exports = router;