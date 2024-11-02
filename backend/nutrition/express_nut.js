const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Nutrition } = require("./db_nut");
const { userExists } = require("./auth_nut");
const app = express();
const port = 5020;

app.use(cors());
app.use(bodyParser.json());

app.post("/items", userExists, async (req, res) => {
    try {
        const { email, date, name, cal, protein, carbs, fat } = req.body;
        const existingNutrition = await Nutrition.findOne({ email });
        if (existingNutrition) {
            const dateIndex = existingNutrition.food.findIndex(entry => entry.date === date);
            if (dateIndex !== -1) {
                existingNutrition.food[dateIndex].items.push({ name, cal, protein, carbs, fat });
            } else {
                existingNutrition.food.push({
                    date,
                    items: [{ name, cal, protein, carbs, fat }]
                });
            }
            await existingNutrition.save();
            res.status(200).json({ message: "Nutrition log updated successfully" });
        } else {
            const newNutrition = new Nutrition({
                email,
                food: [{
                    date,
                    items: [{ name, cal, protein, carbs, fat }]
                }]
            });
            await newNutrition.save();
            res.status(201).json({ message: "Nutrition logged successfully" });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/items", async (req, res) => {
    try {
        const email = req.query.email;
        const nutritionData = await Nutrition.findOne({ email });
        if (nutritionData) {
            res.status(200).json({ items: nutritionData.food });
        } else {
            res.status(200).json({ items: [] });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
