const express = require('express');
const router = express.Router();

// TODO: Implement BOLO routes
// GET /api/bolos - List BOLOs
// POST /api/bolos - Create BOLO
// GET /api/bolos/:id - Get BOLO details
// PUT /api/bolos/:id - Update BOLO
// DELETE /api/bolos/:id - Delete BOLO
// POST /api/bolos/:id/acknowledge - Acknowledge BOLO receipt

router.get('/', (req, res) => {
  res.json({ message: 'List BOLOs - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create BOLO - TODO' });
});

module.exports = router;
