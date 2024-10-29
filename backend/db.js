const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Rahul:fitlogRA@db.manv7.mongodb.net/fl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 1,
    },
    loc: {
        type: String,
        trim: true,
        minLength: 3,
    },
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
});

// const profileSchema = new mongoose.Schema({
    
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//     },
    
// });

const User = mongoose.model("User", userSchema);
// const Profile = mongoose.model("Profile", profileSchema);

module.exports = { User };
