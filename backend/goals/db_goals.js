const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Rahul:fitlogRA@db.manv7.mongodb.net/fl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const goalsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    goal:[
            {
            date: {
                type: String,
                required: true,
            },
            goals:[
                {
                    water:{
                        type:Number,
                        required:true,
                    },
                    sleep:{
                        type:Number,
                        required:true,
                    }
                }
            ]
        }   
    ]
});

const Goals = mongoose.model("Goals", goalsSchema);
module.exports = { Goals };
