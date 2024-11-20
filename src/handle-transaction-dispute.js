const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');
const sharetribeSdk = require('sharetribe-flex-sdk');

const { types } = sharetribeSdk;
const { UUID } = types;

const {
  SHARETRIBE_FLEX_INTEGRATION_CLIENT_ID,
  SHARETRIBE_FLEX_INTEGRATION_CLIENT_SECRET,
  BOND_AMOUNT_FEE,
} = process.env;

const integrationSdk = sharetribeIntegrationSdk.createInstance({
  clientId: SHARETRIBE_FLEX_INTEGRATION_CLIENT_ID,
  clientSecret: SHARETRIBE_FLEX_INTEGRATION_CLIENT_SECRET,
});

const BASE_BOND_AMOUNT = BOND_AMOUNT_FEE * 100; // 200 dollars to cents

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

const myDecipher = decipher('paymentIntent');

const getAllTransactions = async () => {
  let totalPages;
  let page = 1;
  let perPage = 100;
  let totalTransactions = [];

  while (!totalPages || totalPages >= page) {
    const transactions = await integrationSdk.transactions.query(
      {
        page,
        perPage,
        include: ['customer'],
      },
      {
        expand: true,
      }
    );

    const data = transactions.data.data;
    totalTransactions = totalTransactions.concat(data);

    page++;
    totalPages = transactions.data.meta.totalPages;
  }

  return totalTransactions;
};

const getBondLineItem = lineItems => lineItems.find(({ code }) => code === 'line-item/bond');

const handleTransactionDispute = async () => {
  try {
    const transactions = await getAllTransactions();

    const disputeTransactions = transactions.filter(({ attributes }) => {
      const { lineItems, metadata, transitions } = attributes;
      const bond = getBondLineItem(lineItems);
      return (
        bond &&
        !!transitions.find(
          ({ transition }) =>
            transition === 'transition/admin-complete' && !metadata.disputeComplete
        )
      );
    });

    const completeTransactions = transactions.filter(({ attributes }) => {
      const { lineItems, metadata, transitions } = attributes;
      const bond = getBondLineItem(lineItems);

      return (
        bond &&
        !!transitions.find(
          ({ transition }) => transition === 'transition/complete' && !metadata.disputeComplete
        )
      );
    });

    // Create refund or change customer depends on admin decision
    for (let i = 0; i < disputeTransactions.length; i++) {
      const tx = disputeTransactions[i];
      const disputeAmount = tx.attributes.metadata.disputeAmount;
      const paymentIntent = tx.attributes.metadata.token;
      const customerId = tx.relationships.customer.data.id.uuid;
      const cus = await integrationSdk.users.show({ id: customerId });
      const stripeCustomer = cus.data.data.attributes.profile.privateData.stripeCustomer.id;
      const paymentMethod = cus.data.data.attributes.profile.privateData.stripePaymentMethod.id;

      const deCryptedPaymentIntentId = myDecipher(paymentIntent);

      let result;
      if (disputeAmount && Number(disputeAmount) > BASE_BOND_AMOUNT) {
        const pi = await stripe.paymentIntents.create({
          amount: disputeAmount * 100 - BASE_BOND_AMOUNT,
          currency: 'usd',
          customer: stripeCustomer,
          payment_method: paymentMethod,
          payment_method_types: ['card', 'transfer'],
          capture_method: 'automatic',
          confirm: true,
          shipping_address_collection: {
            allowed_countries: ['CA', 'US'],
          },
        });

        result = pi;
      } else {
        const refund = await stripe.refunds.create({
          amount: BASE_BOND_AMOUNT - disputeAmount * 100,
          payment_intent: deCryptedPaymentIntentId,
        });

        result = refund;
      }

      await integrationSdk.transactions.updateMetadata({
        id: new UUID(tx.id.uuid),
        metadata: {
          disputeComplete: true,
          stripeDisputeActionId: result?.id,
        },
      });
    }

    // Create refund to customer after provider inaction
    for (let i = 0; i < completeTransactions.length; i++) {
      const tx = completeTransactions[i];
      const bond = tx.attributes.lineItems.find(({ code }) => code === 'line-item/bond');
      const disputeAmount = bond.lineTotal.amount;
      const paymentIntent = tx.attributes.metadata?.token;
      const deCryptedPaymentIntentId = myDecipher(paymentIntent);

      const refund = await stripe.refunds.create({
        amount: disputeAmount,
        payment_intent: deCryptedPaymentIntentId,
      });

      await integrationSdk.transactions.updateMetadata({
        id: new UUID(tx.id.uuid),
        metadata: {
          disputeComplete: true,
          stripeDisputeActionId: refund?.id,
        },
      });
    }
  } catch (e) {
    console.log('handleTransactionDispute', e);
  }
};

handleTransactionDispute();
