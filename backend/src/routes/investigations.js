const express = require('express');
const router = express.Router();

// TODO: Implement investigation routes
// GET /api/investigations - List investigations
// POST /api/investigations - Create investigation
// GET /api/investigations/:id - Get investigation details
// PUT /api/investigations/:id - Update investigation
// DELETE /api/investigations/:id - Delete investigation
// POST /api/investigations/:id/link - Link investigations
// POST /api/investigations/:id/merge - Merge investigations
// GET /api/investigations/:id/timeline - Get investigation timeline
// GET /api/investigations/:id/tasks - Get investigation tasks

router.get('/', (req, res) => {
  res.json({ message: 'List investigations - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create investigation - TODO' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get investigation - TODO' });
});

module.exports = router;
