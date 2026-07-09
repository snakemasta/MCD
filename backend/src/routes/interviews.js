const express = require('express');
const router = express.Router();

// TODO: Implement interview routes
// GET /api/interviews - List interviews
// POST /api/interviews - Create interview
// GET /api/interviews/:id - Get interview details
// PUT /api/interviews/:id - Update interview
// POST /api/interviews/:id/follow-up - Add follow-up questions

router.get('/', (req, res) => {
  res.json({ message: 'List interviews - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create interview - TODO' });
});

module.exports = router;
