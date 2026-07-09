const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
require('dotenv').config();

const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');

// Import routes
const investigationRoutes = require('./routes/investigations');
const evidenceRoutes = require('./routes/evidence');
const personRoutes = require('./routes/persons');
const warrantRoutes = require('./routes/warrants');
const boloRoutes = require('./routes/bolos');
const interviewRoutes = require('./routes/interviews');
const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API version
app.get('/api/version', (req, res) => {
  res.json({ version: '1.0.0', name: 'MCD Platform API' });
});

// Auth routes (no auth required)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/investigations', authMiddleware, investigationRoutes);
app.use('/api/evidence', authMiddleware, evidenceRoutes);
app.use('/api/persons', authMiddleware, personRoutes);
app.use('/api/warrants', authMiddleware, warrantRoutes);
app.use('/api/bolos', authMiddleware, boloRoutes);
app.use('/api/interviews', authMiddleware, interviewRoutes);
app.use('/api/search', authMiddleware, searchRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(`MCD Backend API server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
