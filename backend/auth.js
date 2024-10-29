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

    // Uncomment if passwords are hashed
    // const match = await bcrypt.compare(password, user.password);
    const match = password === user.password; // For plain-text comparison
    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    req.user = user; // Attach user data to request
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const userValidationSignIn = (req, res, next) => {
//     try {
//         zod.object({
//             email: zod.string().email(),
//             password: zod.string().min(6),
//         }).parse(req.body);
//         next();
//     } catch (err) {
//         res.status(400).json({
//             msg: "Invalid input",
//             error: err.errors,
//         });
//     }
// };

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ msg: "Unauthorized" });
//     }
//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.userID = decoded.userID;
//         next();
//     } catch (err) {
//         res.status(403).json({ msg: "Token invalid or expired" });
//     }
// };

module.exports = {
  userValidation,
  userExists,
  userExistsSignIn,
  // userValidationSignIn,
  // authMiddleware,
};