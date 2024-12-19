const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const verifyToken = require("../Middleware/auth");

const router = express.Router();

// Sign-Up Route
router.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Trim and validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check for existing user
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const newUser = new User({
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT
    const token = newUser.generateJWT();
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error("Error during signup:", err.message, err.stack);
    res.status(500).json({ message: "Server error during signup" });
  }
});

router.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateJWT();
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during signin:", err.message, err.stack);
    res.status(500).json({ message: "Server error during signin" });
  }
});

// Verify Token Endpoint
router.get("/verify-token", verifyToken, (req, res) => {
  try {
      // If the middleware doesn't throw an error, the token is valid
      res.status(200).json({
          message: "Token is valid!",
          statusCode: 200,
          error: false,
          data: req.user, // Contains the decoded payload from the token
      });
  } catch (error) {
      res.status(500).json({
          message: "Internal Server Error!",
          statusCode: 500,
          error: true,
          data: null,
      });
  }
});


module.exports = router;
