const express = require('express');
const router = express.Router();

// TODO: Implement auth routes
// POST /api/auth/login - User login
// POST /api/auth/register - User registration (admin only)
// POST /api/auth/refresh - Refresh JWT token
// POST /api/auth/logout - User logout
// GET /api/auth/me - Get current user profile

router.post('/login', (req, res) => {
  res.json({ message: 'Login - TODO' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Register - TODO' });
});

router.post('/refresh', (req, res) => {
  res.json({ message: 'Refresh token - TODO' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'Get current user - TODO' });
});

module.exports = router;
