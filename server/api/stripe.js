const stripe = require('stripe');
const sharetribeSdk = require('sharetribe-flex-sdk');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const Stripe = stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const { getSdk, getISdk } = require('../api-util/sdk');

const integrationSdk = getISdk();

const { types } = sharetribeSdk;
const { UUID } = types;

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text =>
    text
      .split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
};

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded =>
    encoded
      .match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
};

const myCipher = cipher('paymentIntent');
const myDecipher = decipher('paymentIntent');

const methods = {
  createStripeCustomer: async (req, res) => {
    const { email, paymentMethod } = req.body;
    const sdk = getSdk(req, res);
    try {
      const customer =
        email &&
        (await Stripe.customers.create({
          email,
          payment_method: paymentMethod.id,
        }));

      const currentUser =
        customer &&
        customer.id &&
        (await sdk.currentUser.updateProfile({
          privateData: {
            stripeCustomer: customer,
            stripePaymentMethod: paymentMethod,
          },
        }));

      return res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send({ attached: !!currentUser })
        .end();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  createPaymentMethod: async (req, res) => {
    const { customerId, paymentMethod, email } = req.body;

    try {
      const pMethod = await Stripe.paymentMethods.retrieve(paymentMethod);

      if (pMethod) {
        const sdk = getSdk(req, res);
        await sdk.currentUser.updateProfile({
          privateData: {
            stripePaymentMethod: pMethod,
          },
        });
      } else {
        const attachPaymentMethod =
        customerId &&
        paymentMethod &&
        (await Stripe.paymentMethods.attach(paymentMethod, { customer: customerId }));

        const sdk = getSdk(req, res);
        await sdk.currentUser.updateProfile({
          privateData: {
            stripePaymentMethod: attachPaymentMethod,
          },
        });
      }

      const customer = await Stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      });

      return res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send({ payment: 'SUCCESS' })
        .end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },
  deletePaymentMethod: async (req, res) => {
    const { paymentMethodId } = req.body;
    const paymentMethod = await Stripe.paymentMethods.detach(paymentMethodId);
    return res
      .status(200)
      .set('Content-Type', 'application/transit+json')
      .send({ paymentMethod })
      .end();
  },
  retrievePaymentMethod: async (req, res) => {
    const { customerId } = req.body;
    const cardData =
      customerId &&
      (await Stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      }));

    const card = cardData && cardData.data && cardData.data[0] && cardData.data[0].id;
    return res
      .status(200)
      .set('Content-Type', 'application/transit+json')
      .send({ hasCard: !!card })
      .end();
  },
  createPaymentIntent: async (req, res) => {
    const {
      stripeCustomer,
      paymentMethod,
      totalPrice,
      instantBooking = false,
      providerCommission,
    } = req.body;
    try {
      const paymentIntent =
        stripeCustomer &&
        paymentMethod &&
        (await Stripe.paymentIntents.create({
          amount: totalPrice,
          currency: 'usd',
          customer: stripeCustomer,
          payment_method: paymentMethod,
          payment_method_types: ['card'],
          capture_method: instantBooking ? 'automatic' : 'manual',
          confirm: true,
          application_fee_amount: providerCommission,
        }));
      return res
        .status(200)
        .json({
          payment: 'SUCCESS',
          paymentIntent: paymentIntent && paymentIntent.id && myCipher(paymentIntent.id),
        })
        .end();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  capturePaymentIntent: async (req, res) => {
    // const { pi } = req.body;
    try {
      // await Stripe.paymentIntents.capture(pi);
      return res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send({ payment: 'SUCCESS' })
        .end();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  initiateRefund: async (req, res) => {
    const { paymentIntentId, transition, id, amount, charge } = req.body;
    const finalAmount = Math.round(amount);
    const deCryptedPaymentIntentId = myDecipher(paymentIntentId);
    try {
      const sdk = getSdk(req, res);

      if (amount) {
        await Stripe.refunds.create({
          payment_intent: deCryptedPaymentIntentId,
          amount: finalAmount,
        });
      }

      if (transition && charge) {
        await sdk.transactions.transition({
          id,
          transition,
          params: {
            protectedData: { providerCharge: charge },
          },
        });
      }
      return res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send({ success: true })
        .end();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  createCharge: async (req, res) => {
    const {
      amount,
      currency,
      stripeCustomer,
      paymentMethod,
      transition,
      id,
      dropOffExceed,
    } = req.body;

    try {
      const sdk = getSdk(req, res);
      const charge = await Stripe.paymentIntents.create({
        amount,
        currency: currency || 'usd',
        customer: stripeCustomer,
        payment_method: paymentMethod,
        payment_method_types: ['card'],
        capture_method: 'automatic',
        confirm: true,
      });

      if (charge && dropOffExceed) {
        await integrationSdk.transactions.updateMetadata({
          id: new UUID(id),
          metadata: {
            dropOffExceedCharge: {
              id: charge.id,
              amount,
            },
          },
        });
      }

      if (charge && transition) {
        await sdk.transactions.transition({
          id,
          transition,
          params: {
            protectedData: {
              chargedDetails: charge,
            },
          },
        });
      }
      return res.status(200).json({ charge });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  handlePaymentSuccess: async (req, res) => {
    const { paymentId } = req.query;
    
    try {
      // Read the stored payment data
      const tempDir = path.join(__dirname, 'temp_payments');
      const filePath = path.join(tempDir, `${paymentId}.json`);
      
      if (!fs.existsSync(filePath)) {
        return res.redirect(`${process.env.REACT_APP_CANONICAL_ROOT_URL}/checkout?error=payment-not-found`);
      }
  
      const paymentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Verify payment status with Stripe
      const session = await stripe.checkout.sessions.retrieve(paymentData.sessionId);
      
      if (session.payment_status === 'paid') {
        // Clean up the temporary file
        fs.unlinkSync(filePath);
        
        // Redirect to the order success page with the payment ID
        return res.redirect(`${process.env.REACT_APP_CANONICAL_ROOT_URL}/order/success/${paymentId}`);
      } else {
        return res.redirect(`${process.env.REACT_APP_CANONICAL_ROOT_URL}/checkout?error=payment-failed`);
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
      return res.redirect(`${process.env.REACT_APP_CANONICAL_ROOT_URL}/checkout?error=server-error`);
    }
  }
};

module.exports = methods;
