const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', err);

  // Default error response
  let statusCode = err.statusCode || 500;
  let errorResponse = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };

  // Validation error
  if (err.details) {
    statusCode = 422;
    errorResponse.error.code = 'VALIDATION_ERROR';
    errorResponse.error.details = err.details;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
