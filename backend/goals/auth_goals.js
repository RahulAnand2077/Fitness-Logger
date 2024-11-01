const { User } = require("../db");

const userExists = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { userExists };
