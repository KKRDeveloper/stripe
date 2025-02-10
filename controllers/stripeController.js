const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => { 
  try {
    const { amount, currency, paymentMethod } = req.body; 
    // Validate input
    if (!['card', 'paypal', 'bank_transfer'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method selected' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,  
      currency,
      payment_method_types: [paymentMethod], 
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentMethod: paymentMethod,
    });
  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
};

//  under devlopment
// exports.storePaymentResponse = async (req, res) => {
//   try {
//     const { paymentIntentId, status, amount, currency } = req.body;

//     if (!paymentIntentId || !status) {
//       return res.status(400).json({ error: 'Missing required payment data' });
//     }
 
//     const payment = new Payment({
//       paymentIntentId,
//       status,
//       amount,
//       currency,
//     });

//     await payment.save();

//     res.status(201).json({ message: 'Payment stored successfully', payment });
//   } catch (error) {
//     console.error('Store Payment Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };