// Users Routes / events: host + /api/events + /router path
const Router = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/is-date');
const { inputsValidator } = require('../middlewares/inputsValidator');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const router = Router();
router.use(validateJWT);

// get events
router.get('/', getEvent);

// create event
router.post(
  '/',
  [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'start date is required').custom(isDate),
    check('end', 'end date is required').custom(isDate),
    inputsValidator,
  ],
  createEvent
);

// update event
router.put('/:id', updateEvent);

// delete event
router.delete('/:id', deleteEvent);

module.exports = router;
