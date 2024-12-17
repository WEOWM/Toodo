const express = require("express");
const mongoose = require("mongoose");
const authrouter = require("./routes/auth");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON payloads

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully...");
  })
  .catch((err) => {
    console.error("MongoDB connection errore:", err.message);
    process.exit(1);
  });
// Example GET route for the browser
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API!</h1>");
});

app.use("/auth", authrouter)


app.listen(PORT, () => {

  console.log(`Server is running on ${PORT}`);

});