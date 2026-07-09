const express = require('express');
const router = express.Router();

// TODO: Implement person routes
// GET /api/persons - Search persons
// POST /api/persons - Create person
// GET /api/persons/:id - Get person details
// PUT /api/persons/:id - Update person
// DELETE /api/persons/:id - Delete person
// POST /api/persons/:id/merge - Merge person records
// GET /api/persons/:id/investigations - Get related investigations

router.get('/', (req, res) => {
  res.json({ message: 'Search persons - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create person - TODO' });
});

module.exports = router;
