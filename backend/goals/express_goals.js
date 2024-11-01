const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { userExists } = require("./auth_goals");
const { Goals } = require("./db_goals");

const app = express();
const port = 5015;

app.use(cors());
app.use(bodyParser.json());

app.post("/goals", userExists, async (req, res) => {
    try {
        const { email, date, water, sleep } = req.body;

        const existingGoals = await Goals.findOne({ email });

        if (existingGoals) {
            const dateEntry = existingGoals.goal.find(entry => entry.date === date);

            if (dateEntry) {
                // Update the existing water and sleep data for the day
                dateEntry.goals[0] = { water, sleep };
            } else {
                // Add new entry for the day
                existingGoals.goal.push({ date, goals: [{ water, sleep }] });
            }
            
            await existingGoals.save();
            res.status(200).json({ message: "Goals updated successfully" });
        } else {
            // Create new goals document if none exists
            const newGoal = new Goals({
                email,
                goal: [{ date, goals: [{ water, sleep }] }]
            });
            await newGoal.save();
            res.status(201).json({ message: "Goals logged successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/goals", async (req, res) => {
    try {
        const email = req.query.email;
        const goalData = await Goals.findOne({ email });

        if (goalData) {
            res.status(200).json({ goals: goalData.goal });
        } else {
            res.status(200).json({ goals: [] });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
