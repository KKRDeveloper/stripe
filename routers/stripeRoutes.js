const express = require('express');
const { createPaymentIntent } = require('../controllers/stripeController');
const router = express.Router();

// Route to create payment intent
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
