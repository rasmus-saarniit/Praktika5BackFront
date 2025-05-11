const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Import User model from the models/index.js file

function generateToken(user) {
  return jwt.sign(
    {
      id: user.user_id, // Include `user_id` in the token payload
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Login function
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    console.log('User role:', user.role); // Debug log to verify the role

    const token = generateToken(user);

    // Use redirect URLs from environment or fallback
    const adminRedirect = process.env.ADMIN_REDIRECT || '/admin.html';
    const userRedirect = process.env.USER_REDIRECT || '/user.html';

    if (user.role === 'Admin') {
      res.json({ token, redirect: adminRedirect });
    } else if (user.role === 'User') {
      res.json({ token, redirect: userRedirect });
    } else {
      res.status(403).json({ message: 'Unauthorized role.' });
    }
  } catch (error) {
    next(error);
  }
}

// User registration
async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    if (password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters.' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
      role: role === 'Admin' ? 'Admin' : 'User',
    });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    next(error);
  }
}

// Export the login function and migration methods
module.exports = {
  login,
  register,
  async up(queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync('1234', 10);
    console.log('Hashed Password:', hashedPassword); // Debug log
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: hashedPassword, // Use the hashed password
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};