const express = require("express");
const cors = require("cors"); // ✅ ADD THIS
const connectDB = require("./config/db");

const app = express();

connectDB();

// ✅ MIDDLEWARES
app.use(cors());              // 🔥 VERY IMPORTANT
app.use(express.json());

/* Import Routes */
const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");

/* Use Routes */
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Campus Issue Reporting API Running");
});

/* Start Server */
app.listen(5001, () => {
  console.log("Server running on port 5001");
});