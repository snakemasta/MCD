const express = require('express');
const router = express.Router();

// TODO: Implement evidence routes
// POST /api/evidence - Add evidence
// GET /api/evidence - List evidence
// GET /api/evidence/:id - Get evidence details
// PUT /api/evidence/:id - Update evidence
// DELETE /api/evidence/:id - Delete evidence
// POST /api/evidence/:id/custody - Update chain of custody

router.get('/', (req, res) => {
  res.json({ message: 'List evidence - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Add evidence - TODO' });
});

module.exports = router;
