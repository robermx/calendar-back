const { validationResult } = require('express-validator');

const inputsValidator = (req, res, next) => {
  // error management
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  inputsValidator,
};
