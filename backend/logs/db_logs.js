const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Rahul:fitlogRA@db.manv7.mongodb.net/fl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const workoutSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    log: [
        {
            date: {
                type: String,
                required: true,
            },
            logs: [
                {
                    type: String,
                    required: true,
                }
            ]
        },
    ],
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = { Workout };
