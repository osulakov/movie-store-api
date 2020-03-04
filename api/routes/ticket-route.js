const express = require('express');
const router = express.Router();

const TicketController = require('../controllers/ticket-controller');

const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, TicketController.getAllTickets);

module.exports = router;