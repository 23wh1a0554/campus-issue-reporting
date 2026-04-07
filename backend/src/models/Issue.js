const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Issue", issueSchema);