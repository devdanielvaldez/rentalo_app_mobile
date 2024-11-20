import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import config from '../../config';
import { types as sdkTypes } from '../../util/sdkLoader';
import { isTransactionsTransitionInvalidTransition, storableError } from '../../util/errors';
import {
  txIsEnquired,
  getReview1Transition,
  getReview2Transition,
  txIsInFirstReviewBy,
  TRANSITION_ACCEPT,
  TRANSITION_DECLINE,
  TRANSITION_CANCEL_BY_CUSTOMER,
  TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE,
  TRANSITION_SIGNED_BY_CUSTOMER,
  TRANSITION_SIGNED_BY_PROVIDER,
  TRANSITION_UPLOAD_CAR_PHOTO,
  TRANSITION_EXTEND_TRIP_CUSTOMER,
  TRANSITION_DECLINE_EXTEND_TRIP,
  TRANSITION_ACCEPT_EXTEND_TRIP,
  TRANSITION_CUSTOMER_FULL_REFUND,
  TRANSITION_CUSTOMER_HALF_REFUND,
  TRANSITION_CUSTOMER_NO_REFUND,
  TRANSITION_CANCEL_BY_PROVIDER,
  TRANSITION_RE_VERIFY,
  TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY,
  TRANSITION_CUSTOMER_NO_REFUND_AFTER_REVERIFY,
  TRANSITION_CUSTOMER_NO_REFUND_AFTER_UPLOAD_PHOTO,
  TRANSITION_CUSTOMER_NO_REFUND_AFTER_CUSTOMER_SIGN,
  TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE,
  TRANSITION_CUSTOMER_NO_REFUND_AFTER_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_HALF_REFUND_AFTER_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_CUSTOMER_HALF_REFUND_AFTER_UPLOAD_PHOTO,
  TRANSITION_CUSTOMER_HALF_REFUND_AFTER_REVERIFY,
  TRANSITION_CUSTOMER_HALF_REFUND_AFTER_CUSTOMER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_AFTER_CUSTOMER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO,
  TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_PROVIDER_COMPLETE,
  TRANSITION_PROVIDER_DISPUTE,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO,
  TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN,
  TRANSITION_REQUEST_PAYMENT_INSTANT,
  TRANSITION_CUSTOMER_COMPLETE,
} from '../../util/transaction';
import {
  capturePaymentIntent,
  createCharge,
  docu,
  initiateRefund,
  transactionLineItems,
  transitionPrivileged,
  updateMetaData,
  uploadAfterPhotos,
  viewDocu,
  obtainPolicy,
  sendOdooPaymentDetailsRequest,
  sendOdooPaymentPickUpVehicleRequest,
  sendOdooCancelBookingInvoiceRequest,
  updateTxMetadataDispute,
} from '../../util/api';
import * as log from '../../util/log';
import {
  updatedEntities,
  denormalisedEntities,
  denormalisedResponseEntities,
} from '../../util/data';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUser, fetchCurrentUserNotifications } from '../../ducks/user.duck';
import { decipher } from '../../util/encryptHelper';
import {
  getBookingAcceptDate,
  getBookingDataFromTransaction,
  getBookingStartDate,
  getPaymentMethod,
  getServiceFee,
  getStripeCustomer,
} from '../../util/dataExtractors';
const { UUID } = sdkTypes;

const MESSAGES_PAGE_SIZE = 100;
const CUSTOMER = 'customer';

// ================ Action types ================ //

export const SET_INITIAL_VALUES = 'app/TransactionPage/SET_INITIAL_VALUES';

export const FETCH_TRANSACTION_REQUEST = 'app/TransactionPage/FETCH_TRANSACTION_REQUEST';
export const FETCH_TRANSACTION_SUCCESS = 'app/TransactionPage/FETCH_TRANSACTION_SUCCESS';
export const FETCH_TRANSACTION_ERROR = 'app/TransactionPage/FETCH_TRANSACTION_ERROR';

export const FETCH_TRANSITIONS_REQUEST = 'app/TransactionPage/FETCH_TRANSITIONS_REQUEST';
export const FETCH_TRANSITIONS_SUCCESS = 'app/TransactionPage/FETCH_TRANSITIONS_SUCCESS';
export const FETCH_TRANSITIONS_ERROR = 'app/TransactionPage/FETCH_TRANSITIONS_ERROR';

export const ACCEPT_SALE_REQUEST = 'app/TransactionPage/ACCEPT_SALE_REQUEST';
export const ACCEPT_SALE_SUCCESS = 'app/TransactionPage/ACCEPT_SALE_SUCCESS';
export const ACCEPT_SALE_ERROR = 'app/TransactionPage/ACCEPT_SALE_ERROR';

export const CANCEL_SALE_REQUEST = 'app/TransactionPage/CANCEL_SALE_REQUEST';
export const CANCEL_SALE_SUCCESS = 'app/TransactionPage/CANCEL_SALE_SUCCESS';
export const CANCEL_SALE_ERROR = 'app/TransactionPage/CANCEL_SALE_ERROR';

export const DECLINE_SALE_REQUEST = 'app/TransactionPage/DECLINE_SALE_REQUEST';
export const DECLINE_SALE_SUCCESS = 'app/TransactionPage/DECLINE_SALE_SUCCESS';
export const DECLINE_SALE_ERROR = 'app/TransactionPage/DECLINE_SALE_ERROR';

export const GET_ENVELOPE_ID_REQUEST = 'app/TransactionPage/GET_ENVELOPE_ID_REQUEST';
export const GET_ENVELOPE_ID_SUCCESS = 'app/TransactionPage/GET_ENVELOPE_ID_SUCCESS';
export const GET_ENVELOPE_ID_ERROR = 'app/TransactionPage/GET_ENVELOPE_ID_ERROR';

export const GET_SECOND_URL_REQUEST = 'app/TransactionPage/GET_SECOND_URL_REQUEST';
export const GET_SECOND_URL_SUCCESS = 'app/TransactionPage/GET_SECOND_URL_SUCCESS';
export const GET_SECOND_URL_ERROR = 'app/TransactionPage/GET_SECOND_URL_ERROR';

export const CONTRACT_SIGN_SUCCESS = 'app/TransactionPage/CONTRACT_SIGN_SUCCESS';
export const CLEAR_CONTRACT_URL_STATE = 'app/TransactionPage/CLEAR_CONTRACT_URL_STATE';

export const FETCH_MESSAGES_REQUEST = 'app/TransactionPage/FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'app/TransactionPage/FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'app/TransactionPage/FETCH_MESSAGES_ERROR';

export const SEND_MESSAGE_REQUEST = 'app/TransactionPage/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'app/TransactionPage/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'app/TransactionPage/SEND_MESSAGE_ERROR';

export const SEND_REVIEW_REQUEST = 'app/TransactionPage/SEND_REVIEW_REQUEST';
export const SEND_REVIEW_SUCCESS = 'app/TransactionPage/SEND_REVIEW_SUCCESS';
export const SEND_REVIEW_ERROR = 'app/TransactionPage/SEND_REVIEW_ERROR';

export const FETCH_TIME_SLOTS_REQUEST = 'app/TransactionPage/FETCH_TIME_SLOTS_REQUEST';
export const FETCH_TIME_SLOTS_SUCCESS = 'app/TransactionPage/FETCH_TIME_SLOTS_SUCCESS';
export const FETCH_TIME_SLOTS_ERROR = 'app/TransactionPage/FETCH_TIME_SLOTS_ERROR';

export const FETCH_LINE_ITEMS_REQUEST = 'app/TransactionPage/FETCH_LINE_ITEMS_REQUEST';
export const FETCH_LINE_ITEMS_SUCCESS = 'app/TransactionPage/FETCH_LINE_ITEMS_SUCCESS';
export const FETCH_LINE_ITEMS_ERROR = 'app/TransactionPage/FETCH_LINE_ITEMS_ERROR';

export const EXTEND_TRIP_REQUEST = 'app/TransactionPage/EXTEND_TRIP_REQUEST';
export const EXTEND_TRIP_SUCCESS = 'app/TransactionPage/EXTEND_TRIP_SUCCESS';
export const EXTEND_TRIP_ERROR = 'app/TransactionPage/EXTEND_TRIP_ERROR';

export const ACCEPT_EXTENDED_REQUEST = 'app/TransactionPage/ACCEPT_EXTENDED_REQUEST';
export const REJECT_EXTENDED_REQUEST = 'app/TransactionPage/REJECT_EXTENDED_REQUEST';

export const ACCEPT_OR_REJECT_SUCCESS = 'app/TransactionPage/ACCEPT_OR_REJECT_SUCCESS';
export const ACCEPT_OR_REJECT_ERROR = 'app/TransactionPage/ACCEPT_OR_REJECT_ERROR';

export const GET_PROVIDER_SUCCESS = 'app/TransactionPage/GET_PROVIDER_SUCCESS';

export const FETCH_POLICY_REQUEST = 'app/TransactionPage/FETCH_POLICY_REQUEST';
export const FETCH_POLICY_SUCCESS = 'app/TransactionPage/FETCH_POLICY_SUCCESS';
export const FETCH_POLICY_ERROR = 'app/TransactionPage/FETCH_POLICY_ERROR';

export const COMPLETE_TRANSITIONS_REQUEST = 'app/TransactionPage/COMPLETE_TRANSITIONS_REQUEST';
export const COMPLETE_TRANSITIONS_SUCCESS = 'app/TransactionPage/COMPLETE_TRANSITIONS_SUCCESS';
export const COMPLETE_TRANSITIONS_ERROR = 'app/TransactionPage/COMPLETE_TRANSITIONS_ERROR';

export const PROVIDER_COMPLETE_TRANSACTION_REQUEST =
  'app/TransactionPage/PROVIDER_COMPLETE_TRANSACTION_REQUEST';
export const PROVIDER_COMPLETE_TRANSACTION_SUCCESS =
  'app/TransactionPage/PROVIDER_COMPLETE_TRANSACTION_SUCCESS';
export const PROVIDER_COMPLETE_TRANSACTION_ERROR =
  'app/TransactionPage/PROVIDER_COMPLETE_TRANSACTION_ERROR';

export const PROVIDER_DISPUTE_TRANSACTION_REQUEST =
  'app/TransactionPage/PROVIDER_DISPUTE_TRANSACTION_REQUEST';
export const PROVIDER_DISPUTE_TRANSACTION_SUCCESS =
  'app/TransactionPage/PROVIDER_DISPUTE_TRANSACTION_SUCCESS';
export const PROVIDER_DISPUTE_TRANSACTION_ERROR =
  'app/TransactionPage/PROVIDER_DISPUTE_TRANSACTION_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchTransactionInProgress: false,
  fetchTransactionError: null,
  transactionRef: null,
  acceptInProgress: false,
  acceptSaleError: null,
  declineInProgress: false,
  cancelInProgress: false,
  declineSaleError: null,
  cancelSaleError: null,
  fetchMessagesInProgress: false,
  fetchMessagesError: null,
  totalMessages: 0,
  totalMessagePages: 0,
  oldestMessagePageFetched: 0,
  messages: [],
  initialMessageFailedToTransaction: null,
  savePaymentMethodFailed: false,
  sendMessageInProgress: false,
  sendMessageError: null,
  sendReviewInProgress: false,
  sendReviewError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  fetchTransitionsInProgress: false,
  fetchTransitionsError: null,
  processTransitions: null,
  lineItems: null,
  fetchLineItemsInProgress: false,
  fetchLineItemsError: null,
  cancelInProgress: false,
  cancelOrderError: null,
  extendTripInProgress: false,
  extendTripError: null,
  acceptExtendedInProgress: false,
  rejectExtendedInProgress: false,
  acceptOrRejectError: null,
  providerName: null,
  getEnvelopeIDProgress: false,
  getSecondUrlProgress: false,
  getEnvelopeIDError: null,
  getSecondUrlError: null,
  docuCode: null,
  contractUrl1: null,
  contractUrl2: null,
  contractSign: false,
  contractSignSuccessState: null,
  policy: null,
  policyError: null,
  policyInProgress: false,
  bookingCompleteInProgress: false,
  bookingCompleteError: null,

  disputeError: null,
  disputeInProgress: false,

  refund: null,
  refundInProgress: false,
  refundError: null,
};

// Merge entity arrays using ids, so that conflicting items in newer array (b) overwrite old values (a).
// const a = [{ id: { uuid: 1 } }, { id: { uuid: 3 } }];
// const b = [{ id: : { uuid: 2 } }, { id: : { uuid: 1 } }];
// mergeEntityArrays(a, b)
// => [{ id: { uuid: 3 } }, { id: : { uuid: 2 } }, { id: : { uuid: 1 } }]
const mergeEntityArrays = (a, b) => {
  return a.filter(aEntity => !b.find(bEntity => aEntity.id.uuid === bEntity.id.uuid)).concat(b);
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_VALUES:
      return { ...initialState, ...payload };

    case FETCH_TRANSACTION_REQUEST:
      return { ...state, fetchTransactionInProgress: true, fetchTransactionError: null };
    case FETCH_TRANSACTION_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchTransactionInProgress: false, transactionRef };
    }
    case FETCH_TRANSACTION_ERROR:
      return { ...state, fetchTransactionInProgress: false, fetchTransactionError: payload };

    case FETCH_TRANSITIONS_REQUEST:
      return { ...state, fetchTransitionsInProgress: true, fetchTransitionsError: null };
    case FETCH_TRANSITIONS_SUCCESS:
      return { ...state, fetchTransitionsInProgress: false, processTransitions: payload };
    case FETCH_TRANSITIONS_ERROR:
      return { ...state, fetchTransitionsInProgress: false, fetchTransitionsError: payload };

    case ACCEPT_SALE_REQUEST:
      return { ...state, acceptInProgress: true, acceptSaleError: null, declineSaleError: null };
    case ACCEPT_SALE_SUCCESS:
      return { ...state, acceptInProgress: false };
    case ACCEPT_SALE_ERROR:
      return { ...state, acceptInProgress: false, acceptSaleError: payload };

    case EXTEND_TRIP_REQUEST:
      return { ...state, extendTripInProgress: true, extendTripError: null };
    case EXTEND_TRIP_SUCCESS:
      return { ...state, extendTripInProgress: false };
    case EXTEND_TRIP_ERROR:
      return { ...state, extendTripInProgress: false, extendTripError: payload };

    case GET_ENVELOPE_ID_REQUEST:
      return { ...state, getEnvelopeIDProgress: true, getEnvelopeIDError: null };
    case GET_ENVELOPE_ID_SUCCESS:
      return { ...state, getEnvelopeIDProgress: false, docuCode: payload, contractUrl1: payload };
    case GET_ENVELOPE_ID_ERROR:
      return { ...state, getEnvelopeIDProgress: false, getEnvelopeIDError: payload };

    case GET_SECOND_URL_REQUEST:
      return { ...state, getSecondUrlProgress: true, getSecondUrlError: null };
    case GET_SECOND_URL_SUCCESS:
      return { ...state, getSecondUrlProgress: false, docuCode: payload, contractUrl2: payload };
    case GET_SECOND_URL_ERROR:
      return { ...state, getSecondUrlProgress: false, getSecondUrlError: payload };

    case CONTRACT_SIGN_SUCCESS:
      return { ...state, contractSignSuccessState: payload };

    case CLEAR_CONTRACT_URL_STATE:
      return { ...state, contractUrl1: false, contractUrl2: false };

    case ACCEPT_EXTENDED_REQUEST:
      return { ...state, acceptExtendedInProgress: true, acceptOrRejectError: null };
    case REJECT_EXTENDED_REQUEST:
      return { ...state, rejectExtendedInProgress: true, acceptOrRejectError: null };
    case ACCEPT_OR_REJECT_SUCCESS:
      return { ...state, acceptExtendedInProgress: false, rejectExtendedInProgress: false };
    case ACCEPT_OR_REJECT_ERROR:
      return { ...state, acceptOrRejectInProgress: false, acceptOrRejectError: payload };

    case DECLINE_SALE_REQUEST:
      return { ...state, declineInProgress: true, declineSaleError: null, acceptSaleError: null };
    case DECLINE_SALE_SUCCESS:
      return { ...state, declineInProgress: false };
    case DECLINE_SALE_ERROR:
      return { ...state, declineInProgress: false, declineSaleError: payload };
    case CANCEL_SALE_REQUEST:
      return { ...state, cancelInProgress: true, cancelOrderError: null };
    case CANCEL_SALE_SUCCESS:
      return { ...state, cancelInProgress: false };
    case CANCEL_SALE_ERROR:
      return { ...state, cancelInProgress: false, cancleOrderError: payload };

    case FETCH_MESSAGES_REQUEST:
      return { ...state, fetchMessagesInProgress: true, fetchMessagesError: null };
    case FETCH_MESSAGES_SUCCESS: {
      const oldestMessagePageFetched =
        state.oldestMessagePageFetched > payload.page
          ? state.oldestMessagePageFetched
          : payload.page;
      return {
        ...state,
        fetchMessagesInProgress: false,
        messages: mergeEntityArrays(state.messages, payload.messages),
        totalMessages: payload.totalItems,
        totalMessagePages: payload.totalPages,
        oldestMessagePageFetched,
      };
    }
    case FETCH_MESSAGES_ERROR:
      return { ...state, fetchMessagesInProgress: false, fetchMessagesError: payload };

    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sendMessageInProgress: true,
        sendMessageError: null,
        initialMessageFailedToTransaction: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendMessageInProgress: false };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageInProgress: false, sendMessageError: payload };

    case SEND_REVIEW_REQUEST:
      return { ...state, sendReviewInProgress: true, sendReviewError: null };
    case SEND_REVIEW_SUCCESS:
      return { ...state, sendReviewInProgress: false };
    case SEND_REVIEW_ERROR:
      return { ...state, sendReviewInProgress: false, sendReviewError: payload };

    case FETCH_TIME_SLOTS_REQUEST:
      return { ...state, fetchTimeSlotsError: null };
    case FETCH_TIME_SLOTS_SUCCESS:
      return { ...state, timeSlots: payload };
    case FETCH_TIME_SLOTS_ERROR:
      return { ...state, fetchTimeSlotsError: payload };

    case FETCH_LINE_ITEMS_REQUEST:
      return { ...state, fetchLineItemsInProgress: true, fetchLineItemsError: null };
    case FETCH_LINE_ITEMS_SUCCESS:
      return { ...state, fetchLineItemsInProgress: false, lineItems: payload };
    case FETCH_LINE_ITEMS_ERROR:
      return { ...state, fetchLineItemsInProgress: false, fetchLineItemsError: payload };

    case GET_PROVIDER_SUCCESS:
      return { ...state, providerName: payload };

    case FETCH_POLICY_REQUEST:
      return { ...state, policyInProgress: true, policyError: null };
    case FETCH_POLICY_SUCCESS:
      return { ...state, policyInProgress: false, policy: payload };
    case FETCH_POLICY_ERROR:
      return { ...state, policyInProgress: false, policyError: payload };

    case COMPLETE_TRANSITIONS_REQUEST:
      return { ...state, bookingCompleteInProgress: true, bookingCompleteError: null };
    case COMPLETE_TRANSITIONS_SUCCESS:
      return { ...state, bookingCompleteInProgress: false };
    case COMPLETE_TRANSITIONS_ERROR:
      return { ...state, bookingCompleteInProgress: false, bookingCompleteError: payload };

    case PROVIDER_COMPLETE_TRANSACTION_REQUEST:
      return { ...state, refundInProgress: true, bookingCompleteError: null };
    case PROVIDER_COMPLETE_TRANSACTION_SUCCESS:
      return { ...state, refundInProgress: false };
    case PROVIDER_COMPLETE_TRANSACTION_ERROR:
      return { ...state, refundInProgress: false, bookingCompleteError: payload };

    case PROVIDER_DISPUTE_TRANSACTION_REQUEST:
      return { ...state, disputeInProgress: true, bookingCompleteError: null };
    case PROVIDER_DISPUTE_TRANSACTION_SUCCESS:
      return { ...state, disputeInProgress: false };
    case PROVIDER_DISPUTE_TRANSACTION_ERROR:
      return { ...state, disputeInProgress: false, bookingCompleteError: payload };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const acceptOrDeclineInProgress = state => {
  return state.TransactionPage.acceptInProgress || state.TransactionPage.declineInProgress;
};

export const cancelInProgress = state => {
  return state.TransactionPage.cancelInProgress;
};

// ================ Action creators ================ //
export const setInitialValues = initialValues => ({
  type: SET_INITIAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const fetchTransactionRequest = () => ({ type: FETCH_TRANSACTION_REQUEST });
const fetchTransactionSuccess = response => ({
  type: FETCH_TRANSACTION_SUCCESS,
  payload: response,
});
const fetchTransactionError = e => ({ type: FETCH_TRANSACTION_ERROR, error: true, payload: e });

const fetchTransitionsRequest = () => ({ type: FETCH_TRANSITIONS_REQUEST });
const fetchTransitionsSuccess = response => ({
  type: FETCH_TRANSITIONS_SUCCESS,
  payload: response,
});
const fetchTransitionsError = e => ({ type: FETCH_TRANSITIONS_ERROR, error: true, payload: e });

const acceptSaleRequest = () => ({ type: ACCEPT_SALE_REQUEST });
const acceptSaleSuccess = () => ({ type: ACCEPT_SALE_SUCCESS });
const acceptSaleError = e => ({ type: ACCEPT_SALE_ERROR, error: true, payload: e });

const cancelSaleRequest = () => ({ type: CANCEL_SALE_REQUEST });
const cancelSaleSuccess = () => ({ type: CANCEL_SALE_SUCCESS });
// const cancelSaleError = e => ({ type: CANCEL_SALE_ERROR, error: true, payload: e });

const declineSaleRequest = () => ({ type: DECLINE_SALE_REQUEST });
const declineSaleSuccess = () => ({ type: DECLINE_SALE_SUCCESS });
const declineSaleError = e => ({ type: DECLINE_SALE_ERROR, error: true, payload: e });

const getEnvolapIdRequest = () => ({ type: GET_ENVELOPE_ID_REQUEST });
const getEnvolapIdSuccess = res => ({ type: GET_ENVELOPE_ID_SUCCESS, payload: res });
const getEnvolapIdError = e => ({ type: GET_ENVELOPE_ID_ERROR, error: true, payload: e });

const getSecondRequest = () => ({ type: GET_SECOND_URL_REQUEST });
const getSecondSuccess = res => ({ type: GET_SECOND_URL_SUCCESS, payload: res });
const getSecondError = e => ({ type: GET_ENVELOPE_ID_ERROR, error: true, payload: e });

const fetchMessagesRequest = () => ({ type: FETCH_MESSAGES_REQUEST });
const fetchMessagesSuccess = (messages, pagination) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages, ...pagination },
});
const fetchMessagesError = e => ({ type: FETCH_MESSAGES_ERROR, error: true, payload: e });

const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });

const extendTripRequest = () => ({ type: EXTEND_TRIP_REQUEST });
const extendTripSuccess = () => ({ type: EXTEND_TRIP_SUCCESS });
const extendTripError = e => ({ type: EXTEND_TRIP_ERROR, error: true, payload: e });

const acceptExtendedRequest = () => ({ type: ACCEPT_EXTENDED_REQUEST });
const rejectExtendedRequest = () => ({ type: REJECT_EXTENDED_REQUEST });

const acceptOrRejectSuccess = () => ({ type: ACCEPT_OR_REJECT_SUCCESS });
const acceptOrRejectError = e => ({ type: ACCEPT_OR_REJECT_ERROR, error: true, payload: e });

const sendReviewRequest = () => ({ type: SEND_REVIEW_REQUEST });
const sendReviewSuccess = () => ({ type: SEND_REVIEW_SUCCESS });
const sendReviewError = e => ({ type: SEND_REVIEW_ERROR, error: true, payload: e });

const fetchTimeSlotsRequest = () => ({ type: FETCH_TIME_SLOTS_REQUEST });
const fetchTimeSlotsSuccess = timeSlots => ({
  type: FETCH_TIME_SLOTS_SUCCESS,
  payload: timeSlots,
});
const fetchTimeSlotsError = e => ({
  type: FETCH_TIME_SLOTS_ERROR,
  error: true,
  payload: e,
});

// const getProviderName = payload => ({
//   type: GET_PROVIDER_SUCCESS,
//   payload: payload,
// });

export const fetchLineItemsRequest = () => ({ type: FETCH_LINE_ITEMS_REQUEST });
export const fetchLineItemsSuccess = lineItems => ({
  type: FETCH_LINE_ITEMS_SUCCESS,
  payload: lineItems,
});
export const fetchLineItemsError = error => ({
  type: FETCH_LINE_ITEMS_ERROR,
  error: true,
  payload: error,
});

export const contractSignSuccess = payload => ({
  type: CONTRACT_SIGN_SUCCESS,
  payload,
});

export const clearContractUrl = payload => {
  return {
    type: CLEAR_CONTRACT_URL_STATE,
    payload,
  };
};

const fetchPolicyRequest = () => ({ type: FETCH_POLICY_REQUEST });
const fetchPolicySuccess = payload => ({
  type: FETCH_POLICY_SUCCESS,
  payload,
});
const fetchPolicyError = error => ({
  type: FETCH_POLICY_ERROR,
  error: true,
  payload: error,
});

const completeTransactionRequest = () => ({ type: COMPLETE_TRANSITIONS_REQUEST });
const completeTransactionSuccess = () => ({ type: COMPLETE_TRANSITIONS_SUCCESS });
const completeTransactionError = e => ({
  type: COMPLETE_TRANSITIONS_ERROR,
  error: true,
  payload: e,
});

const providerCompleteTransactionRequest = () => ({ type: PROVIDER_COMPLETE_TRANSACTION_REQUEST });
const providerCompleteTransactionSuccess = () => ({ type: PROVIDER_COMPLETE_TRANSACTION_SUCCESS });
const providerCompleteTransactionError = e => ({
  type: PROVIDER_COMPLETE_TRANSACTION_ERROR,
  error: true,
  payload: e,
});

const providerDisputeTransactionRequest = () => ({ type: PROVIDER_DISPUTE_TRANSACTION_REQUEST });
const providerDisputeTransactionSuccess = () => ({ type: PROVIDER_DISPUTE_TRANSACTION_SUCCESS });
const providerDisputeTransactionError = e => ({
  type: PROVIDER_DISPUTE_TRANSACTION_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

const listingRelationship = txResponse => {
  return txResponse.data.data.relationships.listing.data;
};

export const extendTrip = params => async (dispatch, getState, sdk) => {
  const { tx, bookingStart, bookingEnd, totalExtendAmount, perDayCalculatedPrice } = params;
  dispatch(extendTripRequest());
  const currentUser = getState()?.user?.currentUser;
  const { attributes } = tx;
  // const amount = attributes?.payinTotal?.amount;
  const currency = attributes?.payinTotal?.currency;
  // const bookingStartDate = getBookingStartDate(tx);
  // const bookingEndDate = getBookingEndDate(tx)
  const paymentIntent = attributes?.metadata?.token;
  const paymentMethod = getPaymentMethod(currentUser)?.id;
  const stripeCustomer = getStripeCustomer(currentUser)?.id;
  const extendedBookingData = getBookingDataFromTransaction(tx) || [];
  const extendedBookingObj = {
    bookingStart: moment(bookingStart).format('YYYY-MM-DD HH:mm:ss'),
    bookingEnd: moment(bookingEnd).format('YYYY-MM-DD HH:mm:ss'),
    totalExtendAmount,
    perDayCalculatedPrice,
    paymentMethod,
    stripeCustomer,
    paymentIntent,
    currency,
  };
  extendedBookingData.push(extendedBookingObj);

  try {
    const response = await sdk.transactions.transition({
      id: tx.id,
      transition: TRANSITION_EXTEND_TRIP_CUSTOMER,
      params: {
        protectedData: { extendedBookingData },
      },
    });
    dispatch(fetchTransaction(tx.id, 'customer'));
    dispatch(extendTripSuccess());
    dispatch(fetchCurrentUserNotifications());
    return response;
  } catch (error) {
    dispatch(extendTripError(storableError(error)));
    throw error;
  }
};

export const acceptOrRejectExtendTrip = params => async (dispatch, getState, sdk) => {
  const {
    type,
    extBookingStart,
    extBookingEnd,
    tx,
    paymentMethod,
    paymentIntent,
    stripeCustomer,
  } = params;
  const extendedBookingData = getBookingDataFromTransaction(tx) || [];
  const currency = tx?.attributes?.payinTotal?.currency;
  // let transition = TRANSITION_ACCEPT_EXTEND_TRIP
  let lastElement = extendedBookingData && extendedBookingData[extendedBookingData.length - 1];
  const totalExtendAmount = lastElement?.totalExtendAmount;

  if (type == 'accept') {
    dispatch(acceptExtendedRequest());
  }
  if (type == 'reject') {
    dispatch(rejectExtendedRequest());
  }

  const createStripeExtendCharge =
    type == 'accept' &&
    (await createCharge({
      amount: totalExtendAmount,
      paymentMethod,
      currency,
      stripeCustomer,
      paymentIntent,
      id: tx.id,
    }));

  await sdk.transactions.transition({
    id: tx.id,
    transition: type == 'accept' ? TRANSITION_ACCEPT_EXTEND_TRIP : TRANSITION_DECLINE_EXTEND_TRIP,
    params: {
      bookingStart: new Date(extBookingStart).toISOString(),
      bookingEnd: new Date(extBookingEnd).toISOString(),
      protectedData: {
        chargedDetails: createStripeExtendCharge,
      },
    },
  });

  dispatch(fetchTransaction(tx.id, 'customer'));
  dispatch(acceptOrRejectSuccess());
  dispatch(fetchCurrentUserNotifications()).catch(e => {
    dispatch(acceptOrRejectError(storableError(e)));
    throw e;
  });
};

export const fetchTransaction = (id, txRole) => (dispatch, getState, sdk) => {
  dispatch(fetchTransactionRequest());
  let txResponse = null;

  return sdk.transactions
    .show(
      {
        id,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
        ],
        ...IMAGE_VARIANTS,
      },
      { expand: true }
    )
    .then(response => {
      txResponse = response;
      // const providerId = txResponse?.data?.data?.relationships?.provider?.data?.id
      const listingId = listingRelationship(response).id;
      const entities = updatedEntities({}, response.data);
      const listingRef = { id: listingId, type: 'listing' };
      const transactionRef = { id, type: 'transaction' };
      const denormalised = denormalisedEntities(entities, [listingRef, transactionRef]);
      const listing = denormalised[0];
      const transaction = denormalised[1];

      // Fetch time slots for transactions that are in enquired state
      const canFetchTimeslots =
        txRole === 'customer' &&
        config.enableAvailability &&
        transaction &&
        txIsEnquired(transaction);

      if (canFetchTimeslots) {
        dispatch(fetchTimeSlots(listingId));
      }
      // if (providerId) {
      //   getProvideData(providerId).then((resp) => {
      //     const providerName = resp && resp.documents && resp.documents[0].fields?.fullName.value
      //     dispatch(getProviderName(providerName))
      //   })
      // }

      const chassis = listing?.attributes?.publicData?.chassis;

      if (chassis) {
        dispatch(getPolicy(chassis, listing.id.uuid));
      }

      const canFetchListing = listing && listing.attributes && !listing.attributes.deleted;
      if (canFetchListing) {
        return sdk.listings.show({
          id: listingId,
          include: ['author', 'author.profileImage', 'images'],
          ...IMAGE_VARIANTS,
        });
      } else {
        return response;
      }
    })
    .then(response => {
      dispatch(addMarketplaceEntities(txResponse));
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchTransactionSuccess(txResponse));
      return response;
    })
    .catch(e => {
      dispatch(fetchTransactionError(storableError(e)));
      throw e;
    });
};
export const fetchTransactionIntervalTime = (id, txRole) => (dispatch, getState, sdk) => {
  dispatch(fetchTransactionRequest());

  return sdk.transactions
    .show(
      {
        id,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
        ],
        ...IMAGE_VARIANTS,
      },
      { expand: true }
    )
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchTransactionSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(fetchTransactionError(storableError(e)));
      throw e;
    });
};

const sendOdooPaymentDetails = params => async () => {
  try {
    await sendOdooPaymentDetailsRequest(params);
  } catch (e) {
    console.log('sendOdooPaymentDetails', e);
  }
};

const sendOdooPaymentPickUpVehicle = params => async () => {
  try {
    await sendOdooPaymentPickUpVehicleRequest(params);
  } catch (e) {
    console.log('sendOdooPaymentPickUpVehicle', e);
  }
};

const sendOdooCancelBookingInvoice = async params => {
  return await sendOdooCancelBookingInvoiceRequest(params);
};

export const acceptSale = (transaction, token, pm, odooPaymentDetails, txId) => (
  dispatch,
  getState,
  sdk
) => {
  const id = transaction.id;
  // const body = {
  //   transaction: transaction,
  //   token: token,
  // };

  let user = null;
  if (!odooPaymentDetails.partner_id) {
    const currentUser = getState()?.user?.currentUser;
    if (!currentUser) return;

    const {
      attributes: { email, profile },
      id,
    } = currentUser;

    user = {
      email,
      name: profile?.displayName,
      id: id.uuid,
    };
  }

  const myDecipher = decipher('paymentIntent');
  return capturePaymentIntent({ pi: token && myDecipher(token) })
    .then(() => {
      if (acceptOrDeclineInProgress(getState())) {
        return Promise.reject(new Error('Accept or decline already in progress'));
      }
      dispatch(acceptSaleRequest());

      return sdk.transactions
        .transition({ id, transition: TRANSITION_ACCEPT, params: {} }, { expand: true })
        .then(response => {
          dispatch(addMarketplaceEntities(response));
          dispatch(acceptSaleSuccess());
          dispatch(fetchCurrentUserNotifications());
          dispatch(sendOdooPaymentDetails({ order: odooPaymentDetails, txId, user }));

          return response;
        })
        .catch(e => {
          dispatch(acceptSaleError(storableError(e)));
          log.error(e, 'accept-sale-failed', {
            txId: id,
            transition: TRANSITION_ACCEPT,
          });
          throw e;
        });
    })
    .catch(e => console.error(e));
};

export const uploadPhoto = (tx, metadataInfo, odooOrderId) => async dispatch => {
  try {
    const transition = 'transition/upload-car-photo';
    const transactionId = tx?.id;
    const bookingData = false;

    const bodyParams = {
      id: transactionId,
      transition,
      params: {
        listingId: tx.listing.id.uuid,
        ...metadataInfo,
      },
    };

    const queryParams = {
      include: ['booking', 'customer'],
      expand: true,
    };

    const response = await transitionPrivileged({
      isSpeculative: false,
      bookingData,
      bodyParams,
      queryParams,
    });
    if (response) {
      await dispatch(sendOdooPaymentPickUpVehicle({ odooOrderId }));
      dispatch(fetchTransaction(transactionId, 'customer')),
        dispatch(fetchNextTransitions(transactionId));
      // setTimeout(() => typeof window !== 'undefined' && window.location.reload(false), 3000);
      // clearTimeout();
    }

    return response;
  } catch (error) {
    console.error(error, 'err');
  }
};

export const uploadAfterPhoto = params => async dispatch => {
  try {
    const response = await uploadAfterPhotos(params);
    dispatch(addMarketplaceEntities(response));
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const declineSaleBeforeAccept = id => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(declineSaleRequest());
  return sdk.transactions
    .transition({ id, transition: TRANSITION_DECLINE, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(declineSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
    });
};

export const declineSale = (tx, invoice) => async (dispatch, getState, sdk) => {
  const { attributes, id } = tx;

  let user = null;
  if (!invoice.partner_id) {
    const currentUser = getState()?.user?.currentUser;
    if (!currentUser) return;

    const {
      attributes: { email, profile },
      id,
    } = currentUser;

    user = {
      email,
      name: profile?.displayName,
      id: id.uuid,
    };
  }

  try {
    dispatch(fetchCurrentUser());

    await sendOdooCancelBookingInvoice({ invoiceData: invoice, user });

    const { lastTransition, metadata } = attributes || {};
    let amount = attributes?.payinTotal?.amount;
    const serviceFee = getServiceFee(tx);
    const paymentIntent = metadata?.token;
    const bookingStartDate = getBookingStartDate(tx);
    const bookingAcceptDate = getBookingAcceptDate(tx);
    // const paymentMethod = getPaymentMethod(currentUser)?.id;
    // const stripeCustomer = getStripeCustomer(currentUser)?.id;
    // const bookingAcceptDate = "2023-03-29 18:00:00";
    // const bookingStartDate = "2023-03-30 20:45:00";
    const minutesAcceptedDiff = moment(bookingAcceptDate).diff(moment(), 'minutes'); // time difference in minutes
    const hoursBookingDiff = moment(bookingStartDate).diff(moment(), 'hours'); // time difference in minutes
    let transition =
      lastTransition === TRANSITION_ACCEPT
        ? TRANSITION_CANCEL_BY_PROVIDER
        : lastTransition === TRANSITION_REQUEST_PAYMENT_INSTANT
        ? TRANSITION_CANCEL_BY_PROVIDER
        : lastTransition === TRANSITION_RE_VERIFY
        ? TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY
        : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
        ? TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO
        : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
        ? TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN
        : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
        ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_CUSTOMER_SIGN
        : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
        ? TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN
        : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
        ? TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN
        : TRANSITION_CUSTOMER_FULL_REFUND;

    if (acceptOrDeclineInProgress(getState())) {
      return Promise.reject(new Error('Accept or decline already in progress'));
    }
    dispatch(declineSaleRequest());

    if (
      moment(bookingAcceptDate).unix() >
      moment(bookingStartDate)
        .subtract(72, 'hours')
        .unix()
    ) {
      if (minutesAcceptedDiff >= 0 && minutesAcceptedDiff <= 60) {
        console.log('less than 1 hour');
        amount = attributes?.payinTotal?.amount;
        const charge = amount * 0.04;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
          charge,
        });
        // const response = await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } }, { expand: true })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      } else if (minutesAcceptedDiff > 60 && hoursBookingDiff <= 2) {
        console.log('greater than 60 min and less than start of 2 hours');
        const charge = 2000;

        amount = amount - serviceFee;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
          charge,
        });
        // const resp = await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } }, { expand: true })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      } else if (hoursBookingDiff >= 24 && hoursBookingDiff < 48) {
        console.log('greater than  24 hour and less than 48 ');

        const charge = 4000;
        amount = amount - serviceFee;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
          charge,
        });
        // const resp = await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } }, { expand: true })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      } else if (hoursBookingDiff > 48 && hoursBookingDiff < 72) {
        console.log('grater than equal to 48 hour and less than 72 hour');

        amount = amount - serviceFee;
        const charge = 4000;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
          charge,
        });

        // const resp = await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } }, { expand: true })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      } else if (hoursBookingDiff < 24) {
        console.log('less than start of 24 hours');
        amount = amount - serviceFee;
        const charge = 6000;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
          charge,
        });
        // const resp = await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } }, { expand: true })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      }
    } else if (
      moment(bookingAcceptDate).unix() <
      moment(bookingStartDate)
        .subtract(72, 'hours')
        .unix()
    ) {
      if (minutesAcceptedDiff >= 0 && minutesAcceptedDiff <= 60) {
        amount = attributes?.payinTotal?.amount;
        const percentage = 0.04;
        const result = amount * percentage;
        const charge = result;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          charge,
          amount,
        });
        // const response = resp && await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      } else if (minutesAcceptedDiff > 60 && hoursBookingDiff <= 2) {
        console.log('greater than 60 min and less than start of 2 hours');

        amount = amount - serviceFee;
        const charge = 4000;
        const resp = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
          charge,
        });
        // const resp = await sdk.transactions.transition({ id, transition, params: { protectedData: { providerCharge: charge } } }, { expand: true })
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      } else if (hoursBookingDiff < 24) {
        console.log('less than start of 24 hours');
        amount = amount - serviceFee;
        await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
        });
        const charge = 6000;
        const resp = await sdk.transactions.transition(
          { id, transition, params: { protectedData: { providerCharge: charge } } },
          { expand: true }
        );
        dispatch(declineSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
        dispatch(fetchTransaction(id, 'provider'));
        return resp;
      }
    }
  } catch (error) {
    dispatch(declineSaleError(storableError(error)));
    log.error(error, 'reject-sale-failed', {
      txId: id,
      transition: TRANSITION_DECLINE,
    });
    throw error;
  }
};

export const updatedProtectedData = params => async dispatch => {
  try {
    const response = await updateMetaData(params);

    dispatch(addMarketplaceEntities(response));
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const cancelSale = (tx, invoice) => async (dispatch, getState) => {
  let user = null;
  if (!invoice.partner_id) {
    const currentUser = getState()?.user?.currentUser;
    if (!currentUser) return;

    const {
      attributes: { email, profile },
      id,
    } = currentUser;

    user = {
      email,
      name: profile?.displayName,
      id: id.uuid,
    };
  }

  try {
    dispatch(fetchCurrentUser());
    dispatch(cancelSaleRequest());

    await sendOdooCancelBookingInvoice({ invoiceData: invoice, user });

    const { attributes, id } = tx;
    const { lastTransition, metadata } = attributes || {};
    let amount = attributes?.payinTotal?.amount;
    let transition = TRANSITION_CUSTOMER_FULL_REFUND;
    const bookingStartDate = getBookingStartDate(tx);
    const bookingAcceptDate = getBookingAcceptDate(tx);
    const paymentIntent = metadata?.token;

    // const bookingAcceptDate = "2023-03-24 17:32:00";
    // const bookingStartDate = "2023-03-29 14:30:00";
    const minutesAcceptedDiff = moment().diff(moment(bookingAcceptDate), 'minutes'); // time difference in minutes
    const hoursBookingDiff = moment(bookingStartDate).diff(moment(), 'hours'); // time difference in minutes

    if (
      moment(bookingAcceptDate).unix() >
      moment(bookingStartDate)
        .subtract(72, 'hours')
        .unix()
    ) {
      if (minutesAcceptedDiff >= 0 && minutesAcceptedDiff <= 60) {
        // console.log('less than 1 hour')
        transition =
          lastTransition === TRANSITION_RE_VERIFY
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY
            : lastTransition === TRANSITION_ACCEPT
            ? TRANSITION_CUSTOMER_FULL_REFUND
            : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO
            : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
            ? TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_CUSTOMER_SIGN
            : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
            ? TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN
            : TRANSITION_CUSTOMER_FULL_REFUND;
        const charge = amount * 0.04;
        amount = attributes?.payinTotal?.amount - charge;
        const response = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
        });
        if (response) {
          dispatch(fetchTransaction(id, 'customer')), dispatch(cancelSaleSuccess());
          dispatch(fetchCurrentUserNotifications());
          return response;
        }
      } else if (hoursBookingDiff >= 48) {
        console.log('less than equal to 48 hour');

        transition =
          lastTransition === TRANSITION_RE_VERIFY
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY
            : lastTransition === TRANSITION_ACCEPT
            ? TRANSITION_CUSTOMER_FULL_REFUND
            : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO
            : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
            ? TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_CUSTOMER_SIGN
            : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
            ? TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN
            : TRANSITION_CUSTOMER_FULL_REFUND;
        const charge = amount * 0.04;
        amount = attributes?.payinTotal?.amount - charge;
        const response = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
        });

        if (response) {
          dispatch(fetchTransaction(id, 'customer')), dispatch(cancelSaleSuccess());
          dispatch(fetchCurrentUserNotifications());
          return response;
        }
      } else if (hoursBookingDiff >= 24) {
        console.log('less than equal to 48 and greater than 24 hour');

        transition =
          lastTransition === TRANSITION_RE_VERIFY
            ? TRANSITION_CUSTOMER_HALF_REFUND_AFTER_REVERIFY
            : lastTransition === TRANSITION_ACCEPT
            ? TRANSITION_CUSTOMER_HALF_REFUND
            : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
            ? TRANSITION_CUSTOMER_HALF_REFUND_AFTER_UPLOAD_PHOTO
            : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
            ? TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_CUSTOMER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
            ? TRANSITION_CUSTOMER_HALF_REFUND_AFTER_CUSTOMER_SIGN
            : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
            ? TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_PROVIDER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
            ? TRANSITION_CUSTOMER_HALF_REFUND_AFTER_PROVIDER_SIGN
            : TRANSITION_CUSTOMER_HALF_REFUND;
        const charge = amount * 0.04;
        amount = amount / 2 - charge;
        const response = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
        });

        if (response) {
          dispatch(fetchTransaction(id, 'customer')), dispatch(cancelSaleSuccess());
          dispatch(fetchCurrentUserNotifications());
          return response;
        }
      } else if (hoursBookingDiff < 24) {
        console.log('less than  24 hour');
        transition =
          lastTransition === TRANSITION_RE_VERIFY
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_REVERIFY
            : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_UPLOAD_PHOTO
            : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
            ? TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_CUSTOMER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_CUSTOMER_SIGN
            : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
            ? TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_PROVIDER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_PROVIDER_SIGN
            : TRANSITION_CUSTOMER_NO_REFUND;
        dispatch(fetchTransaction(id, 'customer')), dispatch(cancelSaleSuccess());
        dispatch(fetchCurrentUserNotifications());
      }
    } else if (
      moment(bookingAcceptDate).unix() <
      moment(bookingStartDate)
        .subtract(72, 'hours')
        .unix()
    ) {
      if (minutesAcceptedDiff >= 0 && minutesAcceptedDiff <= 60) {
        transition =
          lastTransition === TRANSITION_RE_VERIFY
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY
            : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO
            : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
            ? TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_CUSTOMER_SIGN
            : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
            ? TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
            ? TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN
            : TRANSITION_CUSTOMER_FULL_REFUND;
        const charge = amount * 0.04;

        amount = amount - charge;
        const response = await initiateRefund({
          id,
          transition,
          paymentIntentId: paymentIntent,
          amount,
        });

        if (response) {
          dispatch(fetchTransaction(id, 'customer')), dispatch(cancelSaleSuccess());
          dispatch(fetchCurrentUserNotifications());
          return response;
        }
      } else if (minutesAcceptedDiff > 60) {
        transition =
          lastTransition === TRANSITION_RE_VERIFY
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_REVERIFY
            : lastTransition === TRANSITION_UPLOAD_CAR_PHOTO
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_UPLOAD_PHOTO
            : lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE
            ? TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_CUSTOMER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_CUSTOMER
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_CUSTOMER_SIGN
            : lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE
            ? TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_PROVIDER_SIGN
            : lastTransition === TRANSITION_SIGNED_BY_PROVIDER
            ? TRANSITION_CUSTOMER_NO_REFUND_AFTER_PROVIDER_SIGN
            : TRANSITION_CUSTOMER_NO_REFUND;
      }
      dispatch(fetchTransaction(id, 'customer')), dispatch(cancelSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
    }
  } catch (error) {
    log.error(error, 'cancel-sale-failed', {
      txId: tx?.id,
      transition: TRANSITION_CANCEL_BY_CUSTOMER,
    });
  }
};

const fetchMessages = (txId, page) => (dispatch, getState, sdk) => {
  const paging = { page, per_page: MESSAGES_PAGE_SIZE };
  dispatch(fetchMessagesRequest());

  return sdk.messages
    .query({
      transaction_id: txId,
      include: ['sender', 'sender.profileImage'],
      ...IMAGE_VARIANTS,
      ...paging,
    })
    .then(response => {
      const messages = denormalisedResponseEntities(response);
      const { totalItems, totalPages, page: fetchedPage } = response.data.meta;
      const pagination = { totalItems, totalPages, page: fetchedPage };
      const totalMessages = getState().TransactionPage.totalMessages;

      // Original fetchMessages call succeeded
      dispatch(fetchMessagesSuccess(messages, pagination));

      // Check if totalItems has changed between fetched pagination pages
      // if totalItems has changed, fetch first page again to include new incoming messages.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      if (totalItems > totalMessages && page > 1) {
        dispatch(fetchMessages(txId, 1))
          .then(() => {
            // Original fetch was enough as a response for user action,
            // this just includes new incoming messages
          })
          .catch(() => {
            // Background update, no need to to do anything atm.
          });
      }
    })
    .catch(e => {
      dispatch(fetchMessagesError(storableError(e)));
      throw e;
    });
};

export const fetchMoreMessages = txId => (dispatch, getState, sdk) => {
  const state = getState();
  const { oldestMessagePageFetched, totalMessagePages } = state.TransactionPage;
  const hasMoreOldMessages = totalMessagePages > oldestMessagePageFetched;

  // In case there're no more old pages left we default to fetching the current cursor position
  const nextPage = hasMoreOldMessages ? oldestMessagePageFetched + 1 : oldestMessagePageFetched;

  return dispatch(fetchMessages(txId, nextPage));
};

export const sendMessage = (txId, message) => (dispatch, getState, sdk) => {
  dispatch(sendMessageRequest());

  return sdk.messages
    .send({ transactionId: txId, content: message })
    .then(response => {
      const messageId = response.data.data.id;

      // We fetch the first page again to add sent message to the page data
      // and update possible incoming messages too.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      return dispatch(fetchMessages(txId, 1))
        .then(() => {
          dispatch(sendMessageSuccess());
          return messageId;
        })
        .catch(() => dispatch(sendMessageSuccess()));
    })
    .catch(e => {
      dispatch(sendMessageError(storableError(e)));
      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};

const REVIEW_TX_INCLUDES = ['reviews', 'reviews.author', 'reviews.subject'];
const IMAGE_VARIANTS = {
  'fields.image': [
    // Profile images
    'variants.square-small',
    'variants.square-small2x',

    // Listing images:
    'variants.landscape-crop',
    'variants.landscape-crop2x',
  ],
};

// If other party has already sent a review, we need to make transition to
// TRANSITION_REVIEW_2_BY_<CUSTOMER/PROVIDER>
const sendReviewAsSecond = (id, params, role, dispatch, sdk) => {
  const transition = getReview2Transition(role === CUSTOMER);

  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include, ...IMAGE_VARIANTS })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      dispatch(sendReviewError(storableError(e)));

      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};
// If other party has not yet sent a review, we need to make transition to
// TRANSITION_REVIEW_1_BY_<CUSTOMER/PROVIDER>
// However, the other party might have made the review after previous data synch point.
// So, error is likely to happen and then we must try another state transition
// by calling sendReviewAsSecond().
const sendReviewAsFirst = (id, params, role, dispatch, sdk) => {
  const transition = getReview1Transition(role === CUSTOMER);
  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include, ...IMAGE_VARIANTS })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      // If transaction transition is invalid, lets try another endpoint.
      if (isTransactionsTransitionInvalidTransition(e)) {
        return sendReviewAsSecond(id, params, role, dispatch, sdk);
      } else {
        dispatch(sendReviewError(storableError(e)));

        // Rethrow so the page can track whether the sending failed, and
        // keep the message in the form for a retry.
        throw e;
      }
    });
};

export const sendReview = (role, tx, reviewRating, reviewContent) => (dispatch, getState, sdk) => {
  const params = { reviewRating, reviewContent };

  const txStateOtherPartyFirst = txIsInFirstReviewBy(tx, role !== CUSTOMER);

  dispatch(sendReviewRequest());

  return txStateOtherPartyFirst
    ? sendReviewAsSecond(tx.id, params, role, dispatch, sdk)
    : sendReviewAsFirst(tx.id, params, role, dispatch, sdk);
};

const isNonEmpty = value => {
  return typeof value === 'object' || Array.isArray(value) ? !isEmpty(value) : !!value;
};

const timeSlotsRequest = params => (dispatch, getState, sdk) => {
  return sdk.timeslots.query(params).then(response => {
    return denormalisedResponseEntities(response);
  });
};

const fetchTimeSlots = listingId => (dispatch, getState, sdk) => {
  dispatch(fetchTimeSlotsRequest);

  // Time slots can be fetched for 90 days at a time,
  // for at most 180 days from now. If max number of bookable
  // day exceeds 90, a second request is made.

  const maxTimeSlots = 90;
  // booking range: today + bookable days -1
  const bookingRange = config.dayCountAvailableForBooking - 1;
  const timeSlotsRange = Math.min(bookingRange, maxTimeSlots);

  const start = moment
    .utc()
    .startOf('day')
    .toDate();
  const end = moment()
    .utc()
    .startOf('day')
    .add(timeSlotsRange, 'days')
    .toDate();
  const params = { listingId, start, end };

  return dispatch(timeSlotsRequest(params))
    .then(timeSlots => {
      const secondRequest = bookingRange > maxTimeSlots;

      if (secondRequest) {
        const secondRange = Math.min(maxTimeSlots, bookingRange - maxTimeSlots);
        const secondParams = {
          listingId,
          start: end,
          end: moment(end)
            .add(secondRange, 'days')
            .toDate(),
        };

        return dispatch(timeSlotsRequest(secondParams)).then(secondBatch => {
          const combined = timeSlots.concat(secondBatch);
          dispatch(fetchTimeSlotsSuccess(combined));
        });
      } else {
        dispatch(fetchTimeSlotsSuccess(timeSlots));
      }
    })
    .catch(e => {
      dispatch(fetchTimeSlotsError(storableError(e)));
    });
};

export const fetchNextTransitions = id => (dispatch, getState, sdk) => {
  dispatch(fetchTransitionsRequest());

  return sdk.processTransitions
    .query({ transactionId: id })
    .then(res => {
      dispatch(fetchTransitionsSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(fetchTransitionsError(storableError(e)));
    });
};

export const getEnvolapId = params => async (dispatch, getState, sdk) => {
  try {
    dispatch(getEnvolapIdRequest());
    const res = await docu(params);
    dispatch(getEnvolapIdSuccess(res && res.recipientUrl));
    return res;
  } catch (error) {
    dispatch(getEnvolapIdError(storableError(error)));
  }
};

export const getSecondSignerUrl = params => async (dispatch, getState, sdk) => {
  try {
    dispatch(getSecondRequest());
    const res = await viewDocu(params);
    dispatch(getSecondSuccess(res && res.recipientUrl2));
    return res;
  } catch (error) {
    dispatch(getSecondError(storableError(error)));
  }
};

export const fetchTransactionLineItems = ({ bookingData, listingId, isOwnListing }) => dispatch => {
  dispatch(fetchLineItemsRequest());
  transactionLineItems({ bookingData, listingId, isOwnListing })
    .then(response => {
      const lineItems = response.data;
      dispatch(fetchLineItemsSuccess(lineItems));
    })
    .catch(e => {
      dispatch(fetchLineItemsError(storableError(e)));
      log.error(e, 'fetching-line-items-failed', {
        listingId: listingId.uuid,
        bookingData: bookingData,
      });
    });
};

const getPolicy = (chassis, listingId) => async dispatch => {
  dispatch(fetchPolicyRequest());

  try {
    const result = await obtainPolicy({ chassis });

    dispatch(fetchPolicySuccess(result.data));
  } catch (e) {
    dispatch(fetchPolicyError(storableError(e)));
    log.error(e, 'fetching-policy-failed', {
      listingId: listingId,
    });
  }
};

export const providerCompleteTx = (txId, paymentIntentId, amount) => async (
  dispatch,
  getState,
  sdk
) => {
  dispatch(providerCompleteTransactionRequest());

  try {
    const apiResponse = await sdk.transactions.transition(
      { id: txId, transition: TRANSITION_PROVIDER_COMPLETE, params: {} },
      { expand: true, ...IMAGE_VARIANTS }
    );

    await initiateRefund({
      paymentIntentId,
      id: txId.uuid,
      amount,
    });

    dispatch(addMarketplaceEntities(apiResponse));
    dispatch(providerCompleteTransactionSuccess());
  } catch (e) {
    dispatch(providerCompleteTransactionError(storableError(e)));
    log.error(e, 'provider-complete-transaction-failed', {
      txId: txId.uuid,
    });
  }
};

export const providerDisputeTx = (txId, disputeAmount, disputeReason) => async (
  dispatch,
  getState,
  sdk
) => {
  dispatch(providerDisputeTransactionRequest());

  try {
    const apiResponse = await sdk.transactions.transition(
      { id: txId, transition: TRANSITION_PROVIDER_DISPUTE, params: {} },
      { expand: true, ...IMAGE_VARIANTS }
    );

    await updateTxMetadataDispute({ id: txId.uuid, disputeAmount, disputeReason });

    dispatch(addMarketplaceEntities(apiResponse));
    dispatch(providerDisputeTransactionSuccess());
  } catch (e) {
    dispatch(providerDisputeTransactionError(storableError(e)));
    log.error(e, 'provider-dispute-transaction-failed', {
      txId: txId.uuid,
    });
  }
};

// TODO: hide it for now
export const completeBooking = id => (dispatch, getState, sdk) => {
  dispatch(completeTransactionRequest());

  return sdk.transactions
    .transition(
      { id, transition: TRANSITION_CUSTOMER_COMPLETE, params: {} },
      { expand: true, ...IMAGE_VARIANTS }
    )
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(completeTransactionSuccess());
      return response;
    })
    .catch(e => {
      dispatch(completeTransactionError(storableError(e)));
      throw e;
    });
};

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params => (dispatch, getState) => {
  const txId = new UUID(params.id);
  const state = getState().TransactionPage;
  const txRef = state.transactionRef;
  const txRole = params.transactionRole;
  // In case a transaction reference is found from a previous
  // data load -> clear the state. Otherwise keep the non-null
  // and non-empty values which may have been set from a previous page.
  const initialValues = txRef ? {} : pickBy(state, isNonEmpty);
  dispatch(setInitialValues(initialValues));

  // Sale / order (i.e. transaction entity in API)
  return Promise.all([
    dispatch(fetchTransaction(txId, txRole)),
    dispatch(fetchMessages(txId, 1)),
    dispatch(fetchNextTransitions(txId)),
  ]);
};
