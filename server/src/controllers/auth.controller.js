const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const ms = require('ms');
const User = require('../models/User');

const signToken = (res, user, status) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: ms(process.env.JWT_EXPIRES_IN || '7d'),
  });
  return res.status(status).json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

exports.register = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation error', errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }
      user = await User.create({ name, email, password });
      return signToken(res, user, 201);
    } catch (err) {
      return next(err);
    }
  },
];

exports.login = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation error', errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      return signToken(res, user, 200);
    } catch (err) {
      return next(err);
    }
  },
];

exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ success: true });
};

exports.getMe = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
