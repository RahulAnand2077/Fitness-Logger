const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { User } = require("./db");
const { Goals } = require("./goals/db_goals");
const { Workout } = require("./logs/db_logs");
const { Nutrition } = require("./nutrition/db_nut");
const { userValidation, userExists } = require("./auth");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('frontend/public'));

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

app.post("/login", userValidation, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ username,email, password });
    if (user) {
      return res.status(200).json({
        message: "Welcome",
        username: user.username,
        email: user.email,
        loc: user.loc,
        age: user.age,
        height: user.height,
        weight: user.weight,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

app.put("/update", async (req, res) => {
  const { username, loc, age, height, weight} = req.body;
  try {
    const updatedUser = await User.updateOne({ username},{ loc, age, height, weight});
    if (updatedUser.modifiedCount > 0) {
      res.status(200).json({
        message: "User updated successfully",
      });
    } else {
      res.status(404).json({ message: "User not found or no changes made" });
    }
  } catch (err) {
    console.error("Update error:", err); 
    res.status(500).json({ error: "An error occurred during update." });
  }
});


app.delete("/delete", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required to delete user data" });
  }

  try {
    const deletedUser = await User.deleteOne({ email });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedWorkout = await Workout.deleteMany({ email });
    const deletedGoals = await Goals.deleteMany({ email });
    const deletedNutrition = await Nutrition.deleteMany({ email });

    res.status(200).json({
      message: "User and all related data deleted successfully",
      details: {
        userDeleted: deletedUser.deletedCount,
        workoutDeleted: deletedWorkout.deletedCount,
        goalDeleted: deletedGoals.deletedCount,
        nutritionDeleted: deletedNutrition.deletedCount,
      },
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "An error occurred during deletion." });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});