const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const riderRoutes = require("./routes/rideRoutes");
const errorHandler = require("./Middlewear/errorHandler");

connectDB();
// Middleware setup
app.use(express.json()); // Using built-in body parser for JSON data
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/api/user", authRoutes);
app.use("/api/rider", riderRoutes);

// Error Handling Middleware
app.use(errorHandler);
// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
