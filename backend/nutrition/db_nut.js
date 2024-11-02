const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Rahul:fitlogRA@db.manv7.mongodb.net/fl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const nutritionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    food: [
        {
            date: {
                type: String,
                required: true,
            },
            items: [
                {
                    name:{
                        type: String,
                        required: true,
                    },
                    cal :{
                        type: Number,
                        required: true,
                    },
                    protein :{
                        type: Number,
                        required: true,
                    },
                    carbs :{
                        type: Number,
                        required: true,
                    },
                    fat :{
                        type: Number,
                        required: true,
                    },
                    
                }
            ]
        },
    ],
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);
module.exports = { Nutrition };
