// Users Routes / auth: host + /api/auth + /router path

const { Router } = require('express');
const { check } = require('express-validator');
const { inputsValidator } = require('../middlewares/inputsValidator');
const { createUser, LoginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
  '/new',
  // middleWares
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    // custom middleware
    inputsValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    inputsValidator,
  ],
  LoginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
