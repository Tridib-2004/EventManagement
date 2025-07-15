const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/userControler');

router.post('/', createUser);

module.exports = router;