const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const { 
    price,
    stripeCustomer,
    vehicleName,
    image,
    values,
    returnUrl
  } = req.body;

  // return console.log(values, returnUrl);

  const formatPrice = (price) => {
    const priceStr = price.toString();
    if (priceStr.length === 2) {
      return `0.${priceStr}`;
    } else if (priceStr.length === 3) {
      return `${priceStr.slice(0, 1)}.${priceStr.slice(1)}`;
    } else if (priceStr.length === 4) {
      return `${priceStr.slice(0, 2)}.${priceStr.slice(2)}`;
    } else if (priceStr.length === 5) {
      return `${priceStr.slice(0, 3)}.${priceStr.slice(3)}`;
    } else if (priceStr.length === 6) {
      return `${priceStr.slice(0, 4)}.${priceStr.slice(4)}`;
    } else {
      return priceStr;
    }
    return priceStr;
  };

  try {
    const paymentId = crypto.randomUUID();

    const formattedPrice = parseFloat(formatPrice(price));
    const paymentMethods = ['card', 'cashapp', 'klarna', 'link'];
    if (formattedPrice > 50) {
      paymentMethods.push('affirm');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      saved_payment_method_options: {
        payment_method_save: 'enabled',
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: vehicleName,
              description: `Rentalo`,
              images: [image],
            },
            unit_amount: Math.round(formattedPrice * 100)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer: stripeCustomer,
      success_url: `${process.env.REACT_APP_CANONICAL_ROOT_URL}${returnUrl}?initialMessage=${values.initialMessage}&paymentId=${paymentId}&status=success`,
      cancel_url: `${process.env.REACT_APP_CANONICAL_ROOT_URL}/checkout?status=cancel`
    });

    const paymentData = {
      paymentId,
      sessionId: session.id,
      status: 'pending',
      price: formattedPrice,
      stripeCustomer,
      vehicleName,
      created_at: new Date().toISOString()
    };

    const tempDir = path.join(__dirname, 'temp_payments');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, `${paymentId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(paymentData, null, 2));

    res.json({ paymentId, url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
