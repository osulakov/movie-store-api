const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payment-controller');

router.post('/', PaymentController.newPayment);

module.exports = router;