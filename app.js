require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const Routes = require("./routes/index");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB
connectDB();

// Health route
app.get("/health", (req, res) => {
  console.log("Health is good");
  res.send("Health is good");
});
app.use("/api", Routes);

// Custom 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
