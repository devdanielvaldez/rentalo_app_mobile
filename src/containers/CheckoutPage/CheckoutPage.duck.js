import pick from 'lodash/pick';
import config from '../../config';
import {
  // attachPaymentMethod,
  // createStripeCustomer,
  initiatePrivileged,
  invoiceLineOdooUsers,
  invoiceOdooUsers,
  invoicePaymentOdooUsers,
  invoicePostOdooUsers,
  // saveCardMethod,
  transitionPrivileged,
  redeemVoucherApi,
} from '../../util/api';
import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import {
  TRANSITION_REQUEST_PAYMENT,
  TRANSITION_REQUEST_PAYMENT_INSTANT,
  TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
  TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY_INSTANT,
  TRANSITION_CONFIRM_PAYMENT,
  isPrivileged,
} from '../../util/transaction';
import * as log from '../../util/log';
import { fetchCurrentUserHasOrdersSuccess, fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SET_INITIAL_VALUES = 'app/CheckoutPage/SET_INITIAL_VALUES';

export const INITIATE_ORDER_REQUEST = 'app/CheckoutPage/INITIATE_ORDER_REQUEST';
export const INITIATE_ORDER_SUCCESS = 'app/CheckoutPage/INITIATE_ORDER_SUCCESS';
export const INITIATE_ORDER_ERROR = 'app/CheckoutPage/INITIATE_ORDER_ERROR';

export const CONFIRM_PAYMENT_REQUEST = 'app/CheckoutPage/CONFIRM_PAYMENT_REQUEST';
export const CONFIRM_PAYMENT_SUCCESS = 'app/CheckoutPage/CONFIRM_PAYMENT_SUCCESS';
export const CONFIRM_PAYMENT_ERROR = 'app/CheckoutPage/CONFIRM_PAYMENT_ERROR';

export const SPECULATE_TRANSACTION_REQUEST = 'app/ListingPage/SPECULATE_TRANSACTION_REQUEST';
export const SPECULATE_TRANSACTION_SUCCESS = 'app/ListingPage/SPECULATE_TRANSACTION_SUCCESS';
export const SPECULATE_TRANSACTION_ERROR = 'app/ListingPage/SPECULATE_TRANSACTION_ERROR';

export const STRIPE_CUSTOMER_REQUEST = 'app/CheckoutPage/STRIPE_CUSTOMER_REQUEST';
export const STRIPE_CUSTOMER_SUCCESS = 'app/CheckoutPage/STRIPE_CUSTOMER_SUCCESS';
export const STRIPE_CUSTOMER_ERROR = 'app/CheckoutPage/STRIPE_CUSTOMER_ERROR';

export const SAVE_CARD_REQUEST = 'app/CheckoutPage/SAVE_CARD_REQUEST';
export const SAVE_CARD_SUCCESS = 'app/CheckoutPage/SAVE_CARD_SUCCESS';
export const SAVE_CARD_ERROR = 'app/CheckoutPage/SAVE_CARD_ERROR';

export const REDEEM_VOUCHER_REQUEST = 'app/CheckoutPage/REDEEM_VOUCHER_REQUEST';
export const REDEEM_VOUCHER_SUCCESS = 'app/CheckoutPage/REDEEM_VOUCHER_SUCCESS';
export const REDEEM_VOUCHER_ERROR = 'app/CheckoutPage/REDEEM_VOUCHER_ERROR';

// ================ Reducer ================ //

const initialState = {
  listing: null,
  bookingData: null,
  bookingDates: null,
  voucher: null,
  speculateTransactionInProgress: false,
  speculateTransactionError: null,
  speculatedTransaction: null,
  transaction: null,
  initiateOrderError: null,
  confirmPaymentError: null,
  stripeCustomerFetched: false,
  saveCardDetailsInProgress: false,
  saveCardDetailsError: null,
  voucherError: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_VALUES:
      return { ...initialState, ...payload };

    case SPECULATE_TRANSACTION_REQUEST:
      return {
        ...state,
        speculateTransactionInProgress: true,
        speculateTransactionError: null,
        speculatedTransaction: null,
      };
    case SPECULATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        speculateTransactionInProgress: false,
        speculatedTransaction: payload.transaction,
      };
    case SPECULATE_TRANSACTION_ERROR:
      return {
        ...state,
        speculateTransactionInProgress: false,
        speculateTransactionError: payload,
      };

    case INITIATE_ORDER_REQUEST:
      return { ...state, initiateOrderError: null };
    case INITIATE_ORDER_SUCCESS:
      return { ...state, transaction: payload };
    case INITIATE_ORDER_ERROR:
      return { ...state, initiateOrderError: payload };

    case CONFIRM_PAYMENT_REQUEST:
      return { ...state, confirmPaymentError: null };
    case CONFIRM_PAYMENT_SUCCESS:
      return state;
    case CONFIRM_PAYMENT_ERROR:
      return { ...state, confirmPaymentError: payload };

    case STRIPE_CUSTOMER_REQUEST:
      return { ...state, stripeCustomerFetched: false };
    case STRIPE_CUSTOMER_SUCCESS:
      return { ...state, stripeCustomerFetched: true };
    case STRIPE_CUSTOMER_ERROR:
      return { ...state, stripeCustomerFetchError: payload };

    case REDEEM_VOUCHER_REQUEST:
      return { ...state, voucherError: null };
    case REDEEM_VOUCHER_SUCCESS:
      return state;
    case REDEEM_VOUCHER_ERROR:
      return { ...state, voucherError: payload };

    case SAVE_CARD_REQUEST:
      return { ...state, saveCardDetailsInProgress: false };
    case SAVE_CARD_SUCCESS:
      return { ...state, saveCardDetailsInProgress: true };
    case SAVE_CARD_ERROR:
      return { ...state, saveCardDetailsError: payload };
    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const setInitialValues = initialValues => ({
  type: SET_INITIAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const initiateOrderRequest = () => ({ type: INITIATE_ORDER_REQUEST });

const initiateOrderSuccess = order => ({
  type: INITIATE_ORDER_SUCCESS,
  payload: order,
});

const initiateOrderError = e => ({
  type: INITIATE_ORDER_ERROR,
  error: true,
  payload: e,
});

const confirmPaymentRequest = () => ({ type: CONFIRM_PAYMENT_REQUEST });

const confirmPaymentSuccess = orderId => ({
  type: CONFIRM_PAYMENT_SUCCESS,
  payload: orderId,
});

const confirmPaymentError = e => ({
  type: CONFIRM_PAYMENT_ERROR,
  error: true,
  payload: e,
});

export const speculateTransactionRequest = () => ({ type: SPECULATE_TRANSACTION_REQUEST });

export const speculateTransactionSuccess = transaction => ({
  type: SPECULATE_TRANSACTION_SUCCESS,
  payload: { transaction },
});

export const speculateTransactionError = e => ({
  type: SPECULATE_TRANSACTION_ERROR,
  error: true,
  payload: e,
});

export const stripeCustomerRequest = () => ({ type: STRIPE_CUSTOMER_REQUEST });
export const stripeCustomerSuccess = () => ({ type: STRIPE_CUSTOMER_SUCCESS });
export const stripeCustomerError = e => ({
  type: STRIPE_CUSTOMER_ERROR,
  error: true,
  payload: e,
});

export const saveCardDetailsRequest = () => ({ type: SAVE_CARD_REQUEST });
export const saveCardDetailsSuccess = () => ({ type: SAVE_CARD_SUCCESS });
export const saveCardDetailsError = e => ({
  type: SAVE_CARD_ERROR,
  error: true,
  payload: e,
});

export const redeemVoucherRequest = () => ({ type: REDEEM_VOUCHER_REQUEST });
export const redeemVoucherSuccess = () => ({ type: REDEEM_VOUCHER_SUCCESS });
export const redeemVoucherError = error => ({
  type: REDEEM_VOUCHER_ERROR,
  error: true,
  payload: error,
});

/* ================ Thunks ================ */
export const initiateOrder = (orderParams, transactionId) => (dispatch, getState, sdk) => {
  dispatch(initiateOrderRequest());
  const instantBooking = orderParams.instantBooking;
  const isInstantBooking = instantBooking === 'yes';

  // If we already have a transaction ID, we should transition, not
  // initiate.
  const isTransition = !!transactionId;
  const transition = isTransition
    ? isInstantBooking
      ? TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY_INSTANT
      : TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY
    : isInstantBooking
    ? TRANSITION_REQUEST_PAYMENT_INSTANT
    : TRANSITION_REQUEST_PAYMENT;
  const isPrivilegedTransition = isPrivileged(transition);

  const bookingData = {
    startDate: orderParams.bookingStart,
    endDate: orderParams.bookingEnd,
    promotion: orderParams.promotion,
    voucherCode: orderParams.voucherCode,
    refferralCode: orderParams.refferralCode,
    voucher: orderParams.voucher,
    authorId: orderParams.authorId,
    ...(orderParams?.pickUpTime || {}),
  };
  const bookingTime = {
    pickUpTime: orderParams.pickUpTime,
    dropTime: orderParams.dropTime,
  };
  const flightDetails = {
    arivalTime: orderParams.arivalTime,
    departureTime: orderParams.departureTime,
    flightNumber: orderParams.flightNumber,
  };
  const bodyParams = isTransition
    ? {
        id: transactionId,
        transition,
        params: {
          ...orderParams,
          metadata: {
            token: orderParams.token,
            bookingTime,
            flightDetails,
            instantBooking: instantBooking,
          },
        },
      }
    : {
        processAlias: config.bookingProcessAlias,
        transition,
        params: {
          ...orderParams,
          metadata: {
            token: orderParams.token,
            bookingTime,
            flightDetails,
            instantBooking: instantBooking,
          },
        },
      };
  const queryParams = {
    include: ['booking', 'provider', 'customer'],
    expand: true,
  };

  const handleSucces = response => {
    const entities = denormalisedResponseEntities(response);
    const order = entities[0];
    dispatch(initiateOrderSuccess(order));
    dispatch(fetchCurrentUserHasOrdersSuccess(true));
    return order;
  };

  const handleError = e => {
    dispatch(initiateOrderError(storableError(e)));
    const transactionIdMaybe = transactionId ? { transactionId: transactionId.uuid } : {};
    log.error(e, 'initiate-order-failed', {
      ...transactionIdMaybe,
      listingId: orderParams.listingId.uuid,
      bookingStart: orderParams.bookingStart,
      bookingEnd: orderParams.bookingEnd,
    });
    throw e;
  };

  if (isTransition && isPrivilegedTransition) {
    // transition privileged
    return transitionPrivileged({ isSpeculative: false, bookingData, bodyParams, queryParams })
      .then(handleSucces)
      .catch(handleError);
  } else if (isTransition) {
    // transition non-privileged
    return sdk.transactions
      .transition(bodyParams, queryParams)
      .then(handleSucces)
      .catch(handleError);
  } else if (isPrivilegedTransition) {
    // initiate privileged
    return initiatePrivileged({
      isSpeculative: false,
      bookingData,
      bodyParams,
      queryParams,
      paymentIntent: orderParams?.token,
    })
      .then(handleSucces)
      .catch(handleError);
  } else {
    // initiate non-privileged
    return sdk.transactions
      .initiate(bodyParams, queryParams)
      .then(handleSucces)
      .catch(handleError);
  }
};

export const confirmPayment = orderParams => (dispatch, getState, sdk) => {
  dispatch(confirmPaymentRequest());

  const bodyParams = {
    id: orderParams.transactionId,
    transition: TRANSITION_CONFIRM_PAYMENT,
    params: {},
  };

  return sdk.transactions
    .transition(bodyParams)
    .then(response => {
      const order = response.data.data;
      dispatch(confirmPaymentSuccess(order.id));
      return order;
    })
    .catch(e => {
      dispatch(confirmPaymentError(storableError(e)));
      const transactionIdMaybe = orderParams.transactionId
        ? { transactionId: orderParams.transactionId.uuid }
        : {};
      log.error(e, 'initiate-order-failed', {
        ...transactionIdMaybe,
      });
      throw e;
    });
};

export const sendMessage = params => (dispatch, getState, sdk) => {
  const message = params.message;
  const orderId = params.id;

  if (message) {
    return sdk.messages
      .send({ transactionId: orderId, content: message })
      .then(() => {
        return { orderId, messageSuccess: true };
      })
      .catch(e => {
        log.error(e, 'initial-message-send-failed', { txId: orderId });
        return { orderId, messageSuccess: false };
      });
  } else {
    return Promise.resolve({ orderId, messageSuccess: true });
  }
};

/**
 * Initiate or transition the speculative transaction with the given
 * booking details
 *
 * The API allows us to do speculative transaction initiation and
 * transitions. This way we can create a test transaction and get the
 * actual pricing information as if the transaction had been started,
 * without affecting the actual data.
 *
 * We store this speculative transaction in the page store and use the
 * pricing info for the booking breakdown to get a proper estimate for
 * the price with the chosen information.
 */

export const speculateTransaction = (orderParams, transactionId) => (dispatch, getState, sdk) => {
  dispatch(speculateTransactionRequest());

  // If we already have a transaction ID, we should transition, not
  // initiate.
  const isTransition = !!transactionId;
  const transition = isTransition
    ? TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY
    : TRANSITION_REQUEST_PAYMENT;
  const isPrivilegedTransition = isPrivileged(transition);

  const bookingData = {
    startDate: orderParams.bookingStart,
    endDate: orderParams.bookingEnd,
    promotion: orderParams.promotion,
    voucherCode: orderParams.voucherCode,
    refferralCode: orderParams.refferralCode,
    voucher: orderParams.voucher,
    authorId: orderParams.authorId,
    pickUpTime: orderParams.pickUpTime,
    dropTime: orderParams.dropTime,
  };
  const params = {
    ...orderParams,
    // cardToken: 'CheckoutPage_speculative_card_token',
  };

  const bodyParams = isTransition
    ? {
        id: transactionId,
        transition,
        params,
      }
    : {
        processAlias: config.bookingProcessAlias,
        transition,
        params,
      };

  const queryParams = {
    include: ['booking', 'provider', 'customer'],
    expand: true,
  };

  const handleSuccess = response => {
    const entities = denormalisedResponseEntities(response);
    if (entities.length !== 1) {
      throw new Error('Expected a resource in the speculate response');
    }
    const tx = entities[0];
    dispatch(speculateTransactionSuccess(tx));
  };

  const handleError = e => {
    const { listingId, bookingStart, bookingEnd } = params;
    log.error(e, 'speculate-transaction-failed', {
      listingId: listingId.uuid,
      bookingStart,
      bookingEnd,
    });
    return dispatch(speculateTransactionError(storableError(e)));
  };

  if (isTransition && isPrivilegedTransition) {
    // transition privileged
    return transitionPrivileged({ isSpeculative: true, bookingData, bodyParams, queryParams })
      .then(handleSuccess)
      .catch(handleError);
  } else if (isTransition) {
    // transition non-privileged
    return sdk.transactions
      .transitionSpeculative(bodyParams, queryParams)
      .then(handleSuccess)
      .catch(handleError);
  } else if (isPrivilegedTransition) {
    // initiate privileged
    return initiatePrivileged({ isSpeculative: true, bookingData, bodyParams, queryParams })
      .then(handleSuccess)
      .catch(handleError);
  } else {
    // initiate non-privileged
    return sdk.transactions
      .initiateSpeculative(bodyParams, queryParams)
      .then(handleSuccess)
      .catch(handleError);
  }
};

// StripeCustomer is a relantionship to currentUser
// We need to fetch currentUser with correct params to include relationship
export const stripeCustomer = () => dispatch => {
  dispatch(stripeCustomerRequest());

  return dispatch(fetchCurrentUser({ include: ['stripeCustomer.defaultPaymentMethod'] }))
    .then(() => {
      dispatch(stripeCustomerSuccess());
    })
    .catch(e => {
      dispatch(stripeCustomerError(storableError(e)));
    });
};

export const createInvoice = params => async () => {
  const response = await invoiceOdooUsers(params);
  return response;
};

export const createInvoiceLineItems = params => async () => {
  const response = await invoiceLineOdooUsers(params);
  return response;
};

export const invoiceStatusPosted = params => async () => {
  const response = await invoicePostOdooUsers(params);
  return response;
};

export const invoiceFinalStep = params => async () => {
  const response = await invoicePaymentOdooUsers(params);
  return response;
};

export const redeemVoucher = params => async dispatch => {
  dispatch(redeemVoucherRequest());
  try {
    const response = await redeemVoucherApi(params);

    dispatch(redeemVoucherSuccess(response));
  } catch (error) {
    dispatch(redeemVoucherError(storableError(error)));
  }
};
