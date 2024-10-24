const User = require('../models/User');

// Fetch Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching profile' });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const { name, location, age, height, weight, profilePicture } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, location, age, height, weight, profilePicture },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error updating profile' });
  }
};
