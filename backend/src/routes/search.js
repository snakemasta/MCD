const express = require('express');
const router = express.Router();

// TODO: Implement global search routes
// GET /api/search - Universal search across all entities
// GET /api/search/investigations - Search investigations
// GET /api/search/persons - Search persons
// GET /api/search/evidence - Search evidence
// GET /api/search/vehicles - Search vehicles

router.get('/', (req, res) => {
  const { q, type, page = 1, limit = 20 } = req.query;
  res.json({ message: 'Global search - TODO', query: q, type });
});

module.exports = router;
