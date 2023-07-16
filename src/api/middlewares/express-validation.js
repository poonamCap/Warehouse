const { body, validationResult } = require('express-validator');

const validateCreateProductRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price.amount').isNumeric().withMessage('Price amount must be numeric'),
  body('price.currency').isString().withMessage('Price currency must be a string'),
  body('stock').notEmpty().withMessage('Stock is required'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCreateProductRequest,
  validateRequest,
};