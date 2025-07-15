const express = require('express');
const router = express.Router();
const event = require('../controllers/eventControler.js');
const resister=require('../controllers/resistrationControler.js');
const wrapAsync = require('../utils/wrapAsync.js');
router.post('/',wrapAsync(event.createEvent));
router.get('/:id', wrapAsync(event.getEventDetails));
router.post('/:id/register', wrapAsync(resister.registerUser));
router.delete('/:id/cancel', wrapAsync(resister.cancelRegistration));
router.get('/', wrapAsync(event.getUpcomingEvents));
router.get('/:id/stats', wrapAsync(event.getEventStats));

module.exports = router;