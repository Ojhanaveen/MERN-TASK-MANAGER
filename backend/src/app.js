require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error.middleware");

const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes"); // ✅ ADD THIS

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);   // ✅ ADD THIS
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Task Manager API Running...");
});

// Error Handler (MUST BE LAST)
app.use(errorHandler);  // ✅ MOVE THIS TO LAST

// Start Server
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});