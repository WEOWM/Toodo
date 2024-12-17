const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const router = express.Router();

// Sign-Up Route
router.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Trim input to avoid extra spaces
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate input
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const newUser = new User({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword });
    await newUser.save();

    // Generate JWT
    const token = newUser.generateJWT();

    // Send response
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Sign-In Route
router.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trim input to avoid extra spaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    console.log("trimmedPassword",trimmedPassword);
    

    // Validate input
    if (!trimmedEmail || !trimmedPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user.password);

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password); 
    // const isMatch = trimmedPassword === user.password ; // Correct password comparison
    console.log("match", isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = user.generateJWT();

    // Send response
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
