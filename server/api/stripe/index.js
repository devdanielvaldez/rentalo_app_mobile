const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const moment = require('moment');
const { handleError, getTrustedSdk } = require('../../api-util/sdk');

exports.createRecipientAccount = async (req, res) => {
  const {
    country,
    accountToken,
    bankAccountToken,
    businessProfileMCC,
    businessProfileURL,
    userId,
    email,
    userAgent,
    ip,
    currency,
    accountType,
  } = req.body;

  try {
    const time = moment.utc().valueOf();

    const account = await stripe.accounts.create({
      country: country,
      type: 'custom',
      capabilities: {
        transfers: {
          requested: true,
        },
      },
      email: email,
      business_type: accountType,
      default_currency: currency,
      external_account: bankAccountToken,
      tos_acceptance: {
        date: Math.floor(time / 1000),
        ip: ip,
        user_agent: userAgent,
        service_agreement: 'recipient',
      },
      // Parameter 'tos_acceptance' cannot be used in conjunction with an account token.
      // To set this field create a token with the desired changes.
      // Pass the token with 'account_token' in a request without setting 'tos_acceptance'.
      // account_token: accountToken,
      business_profile: {
        mcc: businessProfileMCC,
        url: businessProfileURL,
      },
      metadata: {
        'sharetribe-user-id': userId,
        'sharetribe-platform': 'sharetribe',
      },
      settings: {
        payouts: {
          schedule: {
            interval: 'manual',
          },
        },
      },
    });

    const sdk = await getTrustedSdk(req);

    sdk.currentUser.updateProfile({
      protectedData: {
        stripeAccountId: account.id,
      },
    });

    return res.status(200).send(account);
  } catch (e) {
    console.log(e);
    handleError(res, e);
  }
};

exports.updateRecipientAccount = async (req, res) => {
  const { accountId, ...params } = req.body;

  try {
    const account = await stripe.accounts.update(accountId, {
      ...params,
    });
    return res.status(200).send(account);
  } catch (e) {
    console.log(e);
    handleError(res, e);
  }
};

exports.getRecipientAccount = async (req, res) => {
  const { id } = req.body;

  try {
    const account = await stripe.accounts.retrieve(id);

    return res.status(200).send(account);
  } catch (e) {
    console.log(e);
    handleError(res, e);
  }
};

exports.createRecipientAccountLink = async (req, res) => {
  const { accountId, refreshUrl, returnUrl, type } = req.body;
  try {
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: type,
      collection_options: {
        fields: 'currently_due',
      },
    });

    return res.status(200).send(link);
  } catch (e) {
    console.log(e);
    handleError(res, e);
  }
};
