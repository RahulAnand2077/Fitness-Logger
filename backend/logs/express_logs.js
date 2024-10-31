const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Workout } = require("./db_logs");
const { userExists } = require("./auth_logs");

const app = express();
const port = 5010;

app.use(cors());
app.use(bodyParser.json());

app.post("/logs", userExists, async (req, res) => {
    try {
        const { email, date, log } = req.body;

        const existingWorkout = await Workout.findOne({ email });

        if (existingWorkout) {
            const dateEntry = existingWorkout.log.find(entry => entry.date === date);

            if (dateEntry) {
                dateEntry.logs.push(log);
            } else {
                existingWorkout.log.push({ date, logs: [log] });
            }
            
            await existingWorkout.save();
            res.status(200).json({ message: "Workout log updated successfully" });
        } else {
            const newWorkout = new Workout({
                email,
                log: [{ date, logs: [log] }]
            });
            await newWorkout.save();
            res.status(201).json({ message: "Workout logged successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
