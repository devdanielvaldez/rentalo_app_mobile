// These helpers are calling FTW's own server-side routes
// so, they are not directly calling Marketplace API or Integration API.
// You can find these api endpoints from 'server/api/...' directory

import { types as sdkTypes, transit } from './sdkLoader';
import config from '../config';
import Decimal from 'decimal.js';

export const apiBaseUrl = () => {
  const port = process.env.REACT_APP_DEV_API_SERVER_PORT;
  const useDevApiServer = process.env.NODE_ENV === 'development' && !!port;

  if (useDevApiServer) {
    return `http://localhost:${port}`;
  }
  return process.env.REACT_APP_CANONICAL_ROOT_URL;

  // Otherwise, use the same domain and port as the frontend
  // return `${window.location.origin}`;
};

// Check if user can be deleted and then delete the user. Endpoint logic
// must be modified to accommodate the transaction processes used in
// the marketplace.
export const deleteUserAccount = body => {
  return post('/api/delete-account', body);
};

// Application type handlers for JS SDK.
//
// NOTE: keep in sync with `typeHandlers` in `server/api-util/sdk.js`
export const typeHandlers = [
  // Use Decimal type instead of SDK's BigDecimal.
  {
    type: sdkTypes.BigDecimal,
    customType: Decimal,
    writer: v => new sdkTypes.BigDecimal(v.toString()),
    reader: v => new Decimal(v.value),
  },
];

const serialize = data => {
  return transit.write(data, { typeHandlers, verbose: config.sdk.transitVerbose });
};

const deserialize = str => {
  return transit.read(str, { typeHandlers });
};

export const post = (path, body) => {
  const url = `${apiBaseUrl()}${path}`;
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/transit+json',
    },
    body: serialize(body),
  };
  return window.fetch(url, options).then(res => {
    const contentTypeHeader = res.headers.get('Content-Type');
    const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : null;

    if (res.status >= 400) {
      return res.json().then(data => {
        let e = new Error();
        e = Object.assign(e, data);

        throw e;
      });
    }
    if (contentType === 'application/transit+json') {
      return res.text().then(deserialize);
    } else if (contentType === 'application/json') {
      return res.json();
    }
    return res.text();
  });
};

export const get = path => {
  const url = `${apiBaseUrl()}${path}`;
  const options = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/transit+json',
    },
  };
  return window.fetch(url, options).then(res => {
    const contentTypeHeader = res.headers.get('Content-Type');
    const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : null;

    if (res.status >= 400) {
      return res.json().then(data => {
        let e = new Error();
        e = Object.assign(e, data);

        throw e;
      });
    }
    if (contentType === 'application/transit+json') {
      return res.text().then(deserialize);
    } else if (contentType === 'application/json') {
      return res.json();
    }
    return res.text();
  });
};
// Fetch transaction line items from the local API endpoint.
//
// See `server/api/transaction-line-items.js` to see what data should
// be sent in the body.
export const transactionLineItems = body => {
  return post('/api/transaction-line-items', body);
};

// Initiate a privileged transaction.
//
// With privileged transitions, the transactions need to be created
// from the backend. This endpoint enables sending the booking data to
// the local backend, and passing that to the Marketplace API.
//
// See `server/api/initiate-privileged.js` to see what data should be
// sent in the body.
export const initiatePrivileged = body => {
  return post('/api/initiate-privileged', body);
};

export const initiateRefund = body => {
  return post('/api/initiate-payment-refund', body);
};
export const createCharge = body => {
  return post('/api/create-charge', body);
};

// Transition a transaction with a privileged transition.
//
// This is similar to the `initiatePrivileged` above. It will use the
// backend for the transition. The backend endpoint will add the
// payment line items to the transition params.
//
// See `server/api/transition-privileged.js` to see what data should
// be sent in the body.
export const transitionPrivileged = body => {
  return post('/api/transition-privileged', body);
};

// Create user with identity provider (e.g. Facebook or Google)
//
// If loginWithIdp api call fails and user can't authenticate to Flex with idp
// we will show option to create a new user with idp.
// For that user needs to confirm data fetched from the idp.
// After the confirmation, this endpoint is called to create a new user with confirmed data.
//
// See `server/api/auth/createUserWithIdp.js` to see what data should
// be sent in the body.
export const createUserWithIdp = body => {
  return post('/api/auth/create-user-with-idp', body);
};
export const checkAppleId = body => {
  return post('/api/check-apple-id', body);
};

export const createUserWithOpenIdp = body => {
  return post('/api/auth/create-user-with-open-idp', body);
};
export const loginUserWithOpenIdp = body => {
  return post('/api/auth/login-user-with-open-idp', body);
};
export const checkUserExistApi = body => {
  return post('/api/check-user-exists', body);
};

// Vehicle verfiy details Apii
export const vehicleDetailsVerify = body => {
  return post('/api/vehicle-details-verify', body);
};

export const vehicleMarketValueVerify = body => {
  return post('/api/vehicle-market-value-verify', body);
};

// Vehicle verfiy details Apii
export const attachPaymentMethod = body => {
  return post('/api/attach-Payment-Method', body);
};

// Stripe api
export const createStripeCustomer = body => {
  return post('/api/create-stripe-customer', body);
};
export const createRecipientAccount = async body => {
  const response = await window.fetch('https://api.ipify.org?format=json');
  const json = await response.json();
  return await post('/api/create-stripe-account', { ...body, ip: json.ip });
};
export const getRecipientAccount = body => {
  return post('/api/get-stripe-account', body);
};
export const createRecipientAccountLink = body => {
  return post('/api/get-stripe-account-link', body);
};
export const updateRecipientAccount = body => {
  return post('/api/update-stripe-account', body);
};

export const createAppleUser = body => {
  return post('/api/create-apple-user', body);
};

export const createPaymentIntent = body => {
  return post('/api/create-payment-intent', body);
};

export const stripeCheckout = body => {
  return post('/api/stripe/payment', body);
}
export const stripeStatus = (paymentId) => {
  return get('/api/stripe/status/get?paymentId=' + paymentId);
}

export const capturePaymentIntent = body => {
  return post('/api/capture-payment-intent', body);
};

export const retrievePaymentMethod = body => {
  return post('/api/retrieve-payment-method', body);
};

export const createPaymentMethod = body => {
  return post('/api/create-payment-method', body);
};
export const retrieveBusinessName = body => {
  return post('/api/retrieve-business-name', body);
};

export const deletePaymentMethod = body => {
  return post('/api/delete-payment-method', body);
};

export const driverProfileWebhook = body => {
  return post('/api/driver-profile-webhook', body);
};

// odoo requests
export const createOdooUsers = body => {
  return post('/api/authenticate/create-odoo-user', body);
};

export const updateOdooUsers = body => {
  return post('/api/authenticate/update-odoo-user', body);
};

export const fetchBanks = body => {
  return post('/api/authenticate/take-odoo-banks', body);
};

export const assignBankAccountToContactRequest = body => {
  return post('/api/authenticate/assign-bank-to-contact', body);
};

export const updateBankAccountInContactRequest = body => {
  return post('/api/authenticate/update-bank-in-contact', body);
};

export const sendOdooPaymentDetailsRequest = body => {
  return post('/api/authenticate/send-odoo-payment-details', body);
};

export const sendOdooPaymentPickUpVehicleRequest = body => {
  return post('/api/authenticate/send-odoo-payment-pick-up-vehicle', body);
};

export const sendOdooCancelBookingInvoiceRequest = body => {
  return post('/api/authenticate/send-odoo-cancel-booking', body);
};

export const invoiceOdooUsers = body => {
  return post('/api/authenticate/invoice-odoo-user', body);
};

export const updateInvoiceOdooUsers = body => {
  return post('/api/authenticate/invoice-update-user', body);
};

export const invoiceLineOdooUsers = body => {
  return post('/api/authenticate/invoiceline-odoo-user', body);
};

export const invoicePostOdooUsers = body => {
  return post('/api/authenticate/invoicePost-odoo-user', body);
};

export const invoicePaymentOdooUsers = body => {
  return post('/api/authenticate/invoicePayment-odoo-user', body);
};

export const getOdooCountryCode = body => {
  return post('/api/authenticate/get-country-code', body);
};

export const insuranceEmail = body => {
  return post('/api/insurance-email', body);
};

export const mailChimpApi = body => {
  return post('/api/mail-chimp', body);
};

export const updateMetaData = body => {
  return post('/api/update-meta-data', body);
};

export const uploadAfterPhotos = body => {
  return post('/api/upload-after-photos', body);
};

export const queryAllBookings = body => {
  return post('/api/query-all-bookings', body);
};

export const getDetails = body => {
  return post('/api/apple/getDetails', body);
};
export const getProvideData = body => {
  return post('/api/get-provider-data', body);
};

export const docu = body => {
  return post('/api/docu', body);
};

export const viewDocu = body => {
  return post('/api/view-docu', body);
};

export const complyCubeApi = body => {
  return post('/api/comply-cube', body);
};

export const twilioOtp = body => {
  return post('/api/twilio-api', body);
};
export const verifyOtpApiCall = body => {
  return post('/api/verify-otp', body);
};
export const createCheckApi = body => {
  return post('/api/create-check', body);
};

export const getcompleCubeTokenApi = body => {
  return post('/api/get-token', body);
};
export const CreateTxCheckApi = body => {
  return post('/api/create-tx-check', body);
};

// Send verification code to user
export const sendVerification = body => {
  return post('/api/verification/send', body);
};

// Check is code correct
export const checkVerification = body => {
  return post('/api/verification/check', body);
};

// Policy api
export const activatePolicy = body => {
  return post('/api/policy-activate', body);
};
export const updatePolicy = body => {
  return post('/api/policy-update', body);
};
export const cancelPolicy = body => {
  return post('/api/policy-cancel', body);
};
export const obtainPolicy = body => {
  return post('/api/policy-obtain', body);
};

// Chassis
export const getChassisInfo = body => {
  return post('/api/chassis-info', body);
};

// Voucherify
export const validateVoucherApi = body => {
  return post('/api/validate-voucher', body);
};
export const redeemVoucherApi = body => {
  return post('/api/redeem-voucher', body);
};
export const updateDocuTransitionApi = body => {
  return post('/api/update-docu-tranistion', body);
};

export const downloadAgreementApi = body => {
  return post('/api/downloadAgreement', body);
};

export const downloadTest = body => {
  return post('/api/download-pdf', body);
};

export const getAllTransactions = body => {
  return post('/api/get-all-transactions', body);
};

export const updateTxMetadataDispute = body => {
  return post('/api/update-tx-metadata-dispute', body);
};
