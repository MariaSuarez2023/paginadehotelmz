const express = require('express');
const router = express.Router();
const { createReservation } = require('../controllers/mailController');

router.post('/', createReservation);

module.exports = router;