const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [50, 'Username must be less than or equal to 50 characters'],
      unique: true, // Ensure that username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure that email is unique
      trim: true,
      lowercase: true, // Automatically converts email to lowercase
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'],
    },
  },
  { timestamps: true }
);


// Method to generate JWT
userSchema.methods.generateJWT = function () {
  const payload = { id: this._id, email: this.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
