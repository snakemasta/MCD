const express = require('express');
const router = express.Router();

// TODO: Implement warrant routes
// GET /api/warrants - List warrants
// POST /api/warrants - Create warrant
// GET /api/warrants/:id - Get warrant details
// PUT /api/warrants/:id - Update warrant
// POST /api/warrants/:id/approve - Approve warrant
// POST /api/warrants/:id/serve - Mark warrant as served
// POST /api/warrants/:id/return - Return warrant

router.get('/', (req, res) => {
  res.json({ message: 'List warrants - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create warrant - TODO' });
});

module.exports = router;
