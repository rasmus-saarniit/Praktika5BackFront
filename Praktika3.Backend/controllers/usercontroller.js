const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID (admin only)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user (single definition)
exports.updateUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    // Validation
    if (email && (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))) {
      return res.status(400).json({ message: 'E-mail peab olema korrektne.' });
    }
    if (password && password.length < 4) {
      return res.status(400).json({ message: 'Parool peab olema vähemalt 4 tähemärki.' });
    }
    if (role && !['Admin', 'User'].includes(role)) {
      return res.status(400).json({ message: 'Roll (role) peab olema kas Admin või User.' });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: 'User updated', user: { user_id: user.user_id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

// Delete a user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

