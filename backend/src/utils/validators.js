/**
 * Validation utilities
 */
const Joi = require('joi');

const validationSchemas = {
  createInvestigation: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    case_type: Joi.string().required(),
    priority: Joi.string().valid('low', 'medium', 'high', 'critical').optional(),
    location: Joi.string().optional(),
    assigned_to: Joi.string().uuid().optional(),
    supervisor_id: Joi.string().uuid().optional(),
  }),

  createPerson: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    date_of_birth: Joi.date().optional(),
    gender: Joi.string().optional(),
    race: Joi.string().optional(),
    distinguishing_marks: Joi.string().optional(),
    primary_address: Joi.string().optional(),
    officer_notes: Joi.string().optional(),
  }),

  addEvidence: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    category: Joi.string().valid('physical', 'digital', 'document', 'media', 'biological', 'forensic').required(),
    status: Joi.string().optional(),
  }),
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message,
          details: error.details,
        },
      });
    }

    req.validatedBody = value;
    next();
  };
};

module.exports = { validationSchemas, validate };
