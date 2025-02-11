const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { products } = req.body;

    // todo: Handle the case where the products array is empty
    if (products?.length === 0) {
      return res.status(400).json({ error: "Missing required product data" });
    }

    // todo: Please verify the product data from the database before creating the payment intent
    const lineItems = products?.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}sucess`,
      cancel_url: `${process.env.FRONTEND_URL}cancel`,
    });

    res.status(200).json({ sessionId: session.id });
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
