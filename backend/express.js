const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { User } = require("./db");
const { userValidation, userExists, userExistsSignIn } = require("./auth");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", userValidation, userExists, async (req, res) => {
  const { username, email, password, loc = null, age = null, height = null, weight = null } = req.body;
  try {
    const user = await User.create({ username, email, password,loc,age,height,weight });
    res.status(201).json({
      message: "User created successfully",
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "An error occurred during signup." });
  }
});

// Basic login route
app.post("/login", userValidation, userExistsSignIn, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });

    if (user) {
      return res.status(200).json({
        message: "Welcome",
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Login error:", err); // Log error to the console
    res.status(500).json({ error: "An error occurred during login." });
  }
});

// Basic update route
app.put("/update", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Example update; adjust filter criteria and update options as needed
    const updatedUser = await User.updateOne({ email }, { password });

    if (updatedUser.modifiedCount > 0) {
      res.status(200).json({
        message: "User updated successfully",
        email: email,
      });
    } else {
      res.status(404).json({ message: "User not found or no changes made" });
    }
  } catch (err) {
    console.error("Update error:", err); // Log error to the console
    res.status(500).json({ error: "An error occurred during update." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});