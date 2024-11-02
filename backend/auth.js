const zod = require("zod");
const { User } = require("./db");

const userValidation = (req, res, next) => {
  try {
    zod
      .object({
        username: zod.string().min(3),
        email: zod.string().email(),
        password: zod.string().min(6),
      })
      .parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      msg: "Invalid input",
      error: err.errors,
    });
  }
};

const userExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userExistsSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const match = password === user.password; 
    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  userValidation,
  userExists,
  userExistsSignIn,
};