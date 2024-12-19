const express = require("express");
const mongoose = require("mongoose");
const authrouter = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON payloads
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL,)
  .then(() => {
    console.log("MongoDB connected successfully...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Example GET route for the browser
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API!</h1>");
});

// Mount the auth routes
app.use("/auth", authrouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
