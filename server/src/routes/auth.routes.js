const express = require('express');
const { register, login, logout, getMe } = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, getMe);

module.exports = router;
