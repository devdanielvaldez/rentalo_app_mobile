import { ensureTransaction } from './data';

/**
 * Transitions
 *
 * These strings must sync with values defined in Flex API,
 * since transaction objects given by API contain info about last transitions.
 * All the actions in API side happen in transitions,
 * so we need to understand what those strings mean.
 */

// When a customer makes a booking to a listing, a transaction is
// created with the initial request-payment transition.
// At this transition a PaymentIntent is created by Marketplace API.
// After this transition, the actual payment must be made on client-side directly to Stripe.
export const TRANSITION_REQUEST_PAYMENT = 'transition/request-payment';
export const TRANSITION_REQUEST_PAYMENT_INSTANT = 'transition/request-payment-instant';

// A customer can also initiate a transaction with an enquiry, and
// then transition that with a request.
export const TRANSITION_ENQUIRE = 'transition/enquire';
export const TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY = 'transition/request-payment-after-enquiry';
export const TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY_INSTANT =
  'transition/request-payment-after-enquiry-instant';

// Stripe SDK might need to ask 3D security from customer, in a separate front-end step.
// Therefore we need to make another transition to Marketplace API,
// to tell that the payment is confirmed.
export const TRANSITION_CONFIRM_PAYMENT = 'transition/confirm-payment';

// If the payment is not confirmed in the time limit set in transaction process (by default 15min)
// the transaction will expire automatically.
export const TRANSITION_EXPIRE_PAYMENT = 'transition/expire-payment';

// When the provider accepts or declines a transaction from the
// SalePage, it is transitioned with the accept or decline transition.
export const TRANSITION_ACCEPT = 'transition/accept';
export const TRANSITION_DECLINE = 'transition/decline';

// The backend automatically expire the transaction.
export const TRANSITION_EXPIRE = 'transition/expire';

// Admin can also cancel the transition.
export const TRANSITION_CANCEL = 'transition/cancel';
export const TRANSITION_CANCEL_BY_CUSTOMER = 'transition/cancel-by-customer';

//contract sign related transitions
export const TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE =
  'transition/waiting-for-customer-signature';
export const TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE =
  'transition/waiting-for-provider-signature';
export const TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE_BY_OPREATOR =
  'transition/waiting-for-customer-signature-by-operator';
export const TRANSITION_SIGNED_BY_CUSTOMER = 'transition/signed-by-customer';
export const TRANSITION_SIGNED_BY_PROVIDER = 'transition/signed-by-provider';
export const TRANSITION_UPLOAD_CAR_PHOTO = 'transition/upload-car-photo';

//metaMap reverification related transitions

export const TRANSITION_RE_VERIFY = 'transition/reverify';
// The backend will mark the transaction completed.
export const TRANSITION_COMPLETE = 'transition/complete';
// export const TRANSITION_PROVIDER_COMPLETE = 'transition/provider-complete';
export const TRANSITION_CUSTOMER_COMPLETE = 'transition/customer-complete'; // REVIEW:

export const TRANSITION_PROVIDER_COMPLETE = 'transition/provider-complete';
export const TRANSITION_PROVIDER_DISPUTE = 'transition/provider-dispute';
export const TRANSITION_ADMIN_COMPLETE = 'transition/admin-complete';

// Customer can also complete the transition.
export const TRANSITION_COMPLETE_BY_CUSTOMER = 'transition/complete-by-customer';

// Reviews are given through transaction transitions. Review 1 can be
// by provider or customer, and review 2 will be the other party of
// the transaction.
export const TRANSITION_REVIEW_1_BY_PROVIDER = 'transition/review-1-by-provider';
export const TRANSITION_REVIEW_2_BY_PROVIDER = 'transition/review-2-by-provider';
export const TRANSITION_REVIEW_1_BY_CUSTOMER = 'transition/review-1-by-customer';
export const TRANSITION_REVIEW_2_BY_CUSTOMER = 'transition/review-2-by-customer';
export const TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD = 'transition/expire-customer-review-period';
export const TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD = 'transition/expire-provider-review-period';
export const TRANSITION_EXPIRE_REVIEW_PERIOD = 'transition/expire-review-period';

//When a booking is in accepted state, customer can extend trip by sending the extend trip request.
export const TRANSITION_EXTEND_TRIP_CUSTOMER = 'transition/extend-by-customer';
export const TRANSITION_ACCEPT_EXTEND_TRIP = 'transition/accept-extend-trip';
export const TRANSITION_DECLINE_EXTEND_TRIP = 'transition/decline-extend-trip';

//Refund
export const TRANSITION_CUSTOMER_FULL_REFUND = 'transition/customer-full-refund';
export const TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY =
  'transition/customer-full-refund-after-verify';
export const TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO =
  'transition/customer-full-refund-after-upload-car-photo';
export const TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN =
  'transition/customer-full-refund-after-waiting-customer-sign';
export const TRANSITION_CUSTOMER_FULL_REFUND_AFTER_CUSTOMER_SIGN =
  'transition/customer-full-refund-after-customer-sign';
export const TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN =
  'transition/customer-full-refund-after-waiting-for-provider-signature';
export const TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN =
  'transition/customer-full-refund-after-signed-by-provider';

export const TRANSITION_CUSTOMER_HALF_REFUND = 'transition/customer-half-refund';
export const TRANSITION_CUSTOMER_HALF_REFUND_AFTER_REVERIFY =
  'transition/customer-half-refund-after-verify';
export const TRANSITION_CUSTOMER_HALF_REFUND_AFTER_UPLOAD_PHOTO =
  'transition/customer-half-refund-after-upload-car-photo';
export const TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_CUSTOMER_SIGN =
  'transition/customer-half-refund-after-waiting-customer-sign';
export const TRANSITION_CUSTOMER_HALF_REFUND_AFTER_CUSTOMER_SIGN =
  'transition/customer-half-refund-after-customer-sign';
export const TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_PROVIDER_SIGN =
  'transition/customer-half-refund-after-waiting-for-provider-signature';
export const TRANSITION_CUSTOMER_HALF_REFUND_AFTER_PROVIDER_SIGN =
  'transition/customer-half-refund-after-signed-by-provider';

export const TRANSITION_CUSTOMER_NO_REFUND = 'transition/customer-no-refund';
export const TRANSITION_CUSTOMER_NO_REFUND_AFTER_REVERIFY =
  'transition/customer-no-refund-after-verify';
export const TRANSITION_CUSTOMER_NO_REFUND_AFTER_UPLOAD_PHOTO =
  'transition/customer-no-refund-after-upload-car-photo';
export const TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_CUSTOMER_SIGN =
  'transition/customer-no-refund-after-waiting-customer-sign';
export const TRANSITION_CUSTOMER_NO_REFUND_AFTER_CUSTOMER_SIGN =
  'transition/customer-no-refund-after-customer-sign';
export const TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_PROVIDER_SIGN =
  'transition/customer-no-refund-after-waiting-for-provider-signature';
export const TRANSITION_CUSTOMER_NO_REFUND_AFTER_PROVIDER_SIGN =
  'transition/customer-no-refund-after-signed-by-provider';

export const TRANSITION_CUSTOMER_CHARGE = 'transition/charge-customer';
export const TRANSITION_CUSTOMER_CHARGE_AFTER_REVERIFY = 'transition/charge-after-verify';
export const TRANSITION_CUSTOMER_CHARGE_AFTER_UPLOAD_PHOTO =
  'transition/charge-after-upload-car-photo';
export const TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_CUSTOMER_SIGN =
  'transition/charge-after-waiting-customer-sign';
export const TRANSITION_CUSTOMER_CHARGE_AFTER_CUSTOMER_SIGN =
  'transition/charge-after-customer-sign';
export const TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_PROVIDER_SIGN =
  'transition/charge-after-waiting-for-provider-signature';
export const TRANSITION_CUSTOMER_CHARGE_AFTER_PROVIDER_SIGN =
  'transition/charge-after-signed-by-provider';

export const TRANSITION_CANCEL_BY_PROVIDER = 'transition/decline-by-provider-after-accept';
export const TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY =
  'transition/decline-by-provider-after-verify';
export const TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO =
  'transition/decline-by-provider-after-upload-car-photo';
export const TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN =
  'transition/decline-by-provider-after-waiting-customer-sign';
export const TRANSITION_CANCEL_BY_PROVIDER_AFTER_CUSTOMER_SIGN =
  'transition/decline-by-provider-after-customer-sign';
export const TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN =
  'transition/decline-by-provider-after-waiting-for-provider-signature';
export const TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN =
  'transition/decline-by-provider-after-signed-by-provider';

/**
 * Actors
 *
 * There are 4 different actors that might initiate transitions:
 */

// Roles of actors that perform transaction transitions
export const TX_TRANSITION_ACTOR_CUSTOMER = 'customer';
export const TX_TRANSITION_ACTOR_PROVIDER = 'provider';
export const TX_TRANSITION_ACTOR_SYSTEM = 'system';
export const TX_TRANSITION_ACTOR_OPERATOR = 'operator';

export const TX_TRANSITION_ACTORS = [
  TX_TRANSITION_ACTOR_CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER,
  TX_TRANSITION_ACTOR_SYSTEM,
  TX_TRANSITION_ACTOR_OPERATOR,
];

/**
 * States
 *
 * These constants are only for making it clear how transitions work together.
 * You should not use these constants outside of this file.
 *
 * Note: these states are not in sync with states used transaction process definitions
 *       in Marketplace API. Only last transitions are passed along transaction object.
 */
const STATE_INITIAL = 'initial';
const STATE_ENQUIRY = 'enquiry';
const STATE_PENDING_PAYMENT = 'pending-payment';
const STATE_PAYMENT_EXPIRED = 'payment-expired';
const STATE_PREAUTHORIZED = 'preauthorized';
const STATE_DECLINED = 'declined';
const STATE_ACCEPTED = 'accepted';
const STATE_CANCELED = 'canceled';
const STATE_DELIVERED = 'delivered';
const STATE_DISPUTE = 'dispute';
const STATE_REVIEWED = 'reviewed';
const STATE_REVIEWED_BY_CUSTOMER = 'reviewed-by-customer';
const STATE_REVIEWED_BY_PROVIDER = 'reviewed-by-provider';
const STATE_REVERIFY = 'reverify';

const STATE_WAITING_FOR_CUSTOMER_SIGNATURE = 'waiting-for-customer-signature';
const STATE_WAITING_FOR_PROVIDER_SIGNATURE = 'waiting-for-provider-signature';
const STATE_SIGNED_BY_PROVIDER = 'signed-by-provider';
const STATE_CUSTOMER_PHOTO_UPLOAD = 'customer-photo-upload';

/**
 * Description of transaction process
 *
 * You should keep this in sync with transaction process defined in Marketplace API
 *
 * Note: we don't use yet any state machine library,
 *       but this description format is following Xstate (FSM library)
 *       https://xstate.js.org/docs/
 */
const stateDescription = {
  // id is defined only to support Xstate format.
  // However if you have multiple transaction processes defined,
  // it is best to keep them in sync with transaction process aliases.
  id: 'default-process-3/release-1',

  // This 'initial' state is a starting point for new transaction
  initial: STATE_INITIAL,

  // States
  states: {
    [STATE_INITIAL]: {
      on: {
        [TRANSITION_ENQUIRE]: STATE_ENQUIRY,
        //[TRANSITION_REQUEST_PAYMENT]: STATE_PENDING_PAYMENT,
        [TRANSITION_REQUEST_PAYMENT]: STATE_PREAUTHORIZED,
        [TRANSITION_REQUEST_PAYMENT_INSTANT]: STATE_ACCEPTED,
      },
    },
    [STATE_ENQUIRY]: {
      on: {
        [TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY]: STATE_PREAUTHORIZED, //STATE_PENDING_PAYMENT,
        [TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY_INSTANT]: STATE_ACCEPTED, //STATE_PENDING_PAYMENT,
      },
    },

    // [STATE_PENDING_PAYMENT]: {
    //   on: {
    //     [TRANSITION_EXPIRE_PAYMENT]: STATE_PAYMENT_EXPIRED,
    //     [TRANSITION_CONFIRM_PAYMENT]: STATE_PREAUTHORIZED,
    //   },
    // },

    // [STATE_PAYMENT_EXPIRED]: {},
    [STATE_PREAUTHORIZED]: {
      on: {
        [TRANSITION_DECLINE]: STATE_DECLINED,
        [TRANSITION_EXPIRE]: STATE_DECLINED,
        [TRANSITION_ACCEPT]: STATE_ACCEPTED,
      },
    },

    [STATE_DECLINED]: {},
    [STATE_ACCEPTED]: {
      on: {
        [TRANSITION_CUSTOMER_FULL_REFUND]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_HALF_REFUND]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_NO_REFUND]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_CHARGE]: STATE_CANCELED,
        [TRANSITION_CANCEL]: STATE_CANCELED,
        [TRANSITION_CANCEL_BY_PROVIDER]: STATE_DECLINED,
        // [TRANSITION_COMPLETE_BY_CUSTOMER]: STATE_DELIVERED,
        [TRANSITION_RE_VERIFY]: STATE_REVERIFY,
      },
    },

    [STATE_REVERIFY]: {
      on: {
        [TRANSITION_UPLOAD_CAR_PHOTO]: STATE_CUSTOMER_PHOTO_UPLOAD,
        [TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_HALF_REFUND_AFTER_REVERIFY]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_NO_REFUND_AFTER_REVERIFY]: STATE_CANCELED,
        [TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY]: STATE_DECLINED,
        [TRANSITION_CUSTOMER_CHARGE_AFTER_REVERIFY]: STATE_CANCELED,
      },
    },
    [STATE_CUSTOMER_PHOTO_UPLOAD]: {
      on: {
        [TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE]: STATE_WAITING_FOR_CUSTOMER_SIGNATURE,
        [TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_HALF_REFUND_AFTER_UPLOAD_PHOTO]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_NO_REFUND_AFTER_UPLOAD_PHOTO]: STATE_CANCELED,
        [TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO]: STATE_DECLINED,
        [TRANSITION_CUSTOMER_CHARGE_AFTER_UPLOAD_PHOTO]: STATE_CANCELED,
      },
    },

    [STATE_WAITING_FOR_CUSTOMER_SIGNATURE]: {
      on: {
        [TRANSITION_SIGNED_BY_CUSTOMER]: STATE_WAITING_FOR_PROVIDER_SIGNATURE,
        [TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE]: STATE_WAITING_FOR_PROVIDER_SIGNATURE,
        [TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_CUSTOMER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_CUSTOMER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_CUSTOMER_SIGN]: STATE_CANCELED,
        [TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN]: STATE_DECLINED,
        [TRANSITION_CANCEL_BY_PROVIDER_AFTER_CUSTOMER_SIGN]: STATE_DECLINED,
      },
    },

    [STATE_WAITING_FOR_PROVIDER_SIGNATURE]: {
      on: {
        [TRANSITION_SIGNED_BY_PROVIDER]: STATE_SIGNED_BY_PROVIDER,
        [TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_CHARGE_AFTER_CUSTOMER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN]: STATE_DECLINED,
      },
    },

    [STATE_SIGNED_BY_PROVIDER]: {
      on: {
        [TRANSITION_COMPLETE]: STATE_DELIVERED,
        // [TRANSITION_CUSTOMER_COMPLETE]: STATE_DELIVERED,
        [TRANSITION_PROVIDER_COMPLETE]: STATE_DELIVERED,
        [TRANSITION_PROVIDER_DISPUTE]: STATE_DISPUTE,
        [TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_HALF_REFUND_AFTER_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CUSTOMER_NO_REFUND_AFTER_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_EXTEND_TRIP_CUSTOMER]: STATE_SIGNED_BY_PROVIDER,
        [TRANSITION_ACCEPT_EXTEND_TRIP]: STATE_SIGNED_BY_PROVIDER,
        [TRANSITION_DECLINE_EXTEND_TRIP]: STATE_SIGNED_BY_PROVIDER,
        [TRANSITION_CUSTOMER_CHARGE_AFTER_PROVIDER_SIGN]: STATE_CANCELED,
        [TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN]: STATE_DECLINED,
      },
    },
    [STATE_DISPUTE]: {
      on: {
        [TRANSITION_ADMIN_COMPLETE]: STATE_DELIVERED,
      },
    },
    [STATE_CANCELED]: {},
    [STATE_DELIVERED]: {
      on: {
        [TRANSITION_EXPIRE_REVIEW_PERIOD]: STATE_REVIEWED,
        [TRANSITION_REVIEW_1_BY_CUSTOMER]: STATE_REVIEWED_BY_CUSTOMER,
        [TRANSITION_REVIEW_1_BY_PROVIDER]: STATE_REVIEWED_BY_PROVIDER,
      },
    },

    [STATE_REVIEWED_BY_CUSTOMER]: {
      on: {
        [TRANSITION_REVIEW_2_BY_PROVIDER]: STATE_REVIEWED,
        [TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD]: STATE_REVIEWED,
      },
    },
    [STATE_REVIEWED_BY_PROVIDER]: {
      on: {
        [TRANSITION_REVIEW_2_BY_CUSTOMER]: STATE_REVIEWED,
        [TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD]: STATE_REVIEWED,
      },
    },
    [STATE_REVIEWED]: { type: 'final' },
  },
};

// Note: currently we assume that state description doesn't contain nested states.
const statesFromStateDescription = description => description.states || {};

// Get all the transitions from states object in an array
const getTransitions = states => {
  const stateNames = Object.keys(states);

  const transitionsReducer = (transitionArray, name) => {
    const stateTransitions = states[name] && states[name].on;
    const transitionKeys = stateTransitions ? Object.keys(stateTransitions) : [];
    return [
      ...transitionArray,
      ...transitionKeys.map(key => ({ key, value: stateTransitions[key] })),
    ];
  };

  return stateNames.reduce(transitionsReducer, []);
};

// This is a list of all the transitions that this app should be able to handle.
export const TRANSITIONS = getTransitions(statesFromStateDescription(stateDescription)).map(
  t => t.key
);

// This function returns a function that has given stateDesc in scope chain.
const getTransitionsToStateFn = stateDesc => state =>
  getTransitions(statesFromStateDescription(stateDesc))
    .filter(t => t.value === state)
    .map(t => t.key);

// Get all the transitions that lead to specified state.
const getTransitionsToState = getTransitionsToStateFn(stateDescription);

// This is needed to fetch transactions that need response from provider.
// I.e. transactions which provider needs to accept or decline
export const transitionsToRequested = getTransitionsToState(STATE_PREAUTHORIZED);

/**
 * Helper functions to figure out if transaction is in a specific state.
 * State is based on lastTransition given by transaction object and state description.
 */

const txLastTransition = tx => ensureTransaction(tx).attributes.lastTransition;

export const txIsExtendTrip = tx =>
  ensureTransaction(tx).attributes.lastTransition === TRANSITION_EXTEND_TRIP_CUSTOMER;
export const txIsDeclineExtendTrip = tx =>
  ensureTransaction(tx).attributes.lastTransition === TRANSITION_DECLINE_EXTEND_TRIP;
export const txIsAcceptExtendTrip = tx =>
  ensureTransaction(tx).attributes.lastTransition === TRANSITION_ACCEPT_EXTEND_TRIP;

export const txIsEnquired = tx =>
  getTransitionsToState(STATE_ENQUIRY).includes(txLastTransition(tx));

export const txIsPaymentPending = tx =>
  getTransitionsToState(STATE_PENDING_PAYMENT).includes(txLastTransition(tx));

export const txIsPaymentExpired = tx =>
  getTransitionsToState(STATE_PAYMENT_EXPIRED).includes(txLastTransition(tx));

// Note: state name used in Marketplace API docs (and here) is actually preauthorized
// However, word "requested" is used in many places so that we decided to keep it.
export const txIsRequested = tx =>
  getTransitionsToState(STATE_PREAUTHORIZED).includes(txLastTransition(tx));

export const txIsCustomerPhotoUploaded = tx =>
  getTransitionsToState(STATE_CUSTOMER_PHOTO_UPLOAD).includes(txLastTransition(tx));

export const txIsAccepted = tx =>
  getTransitionsToState(STATE_ACCEPTED).includes(txLastTransition(tx));

export const txIsWaitingForCustomerReVerification = tx =>
  txLastTransition(tx) === TRANSITION_RE_VERIFY;

export const txIsWaitingForCustomerSignature = tx =>
  getTransitionsToState(STATE_WAITING_FOR_CUSTOMER_SIGNATURE).includes(txLastTransition(tx));

export const txIsWaitingForProviderSignature = tx =>
  getTransitionsToState(STATE_WAITING_FOR_PROVIDER_SIGNATURE).includes(txLastTransition(tx));
export const txIsSignedByProvider = tx =>
  getTransitionsToState(STATE_SIGNED_BY_PROVIDER).includes(txLastTransition(tx));

export const txIsDeclined = tx =>
  getTransitionsToState(STATE_DECLINED).includes(txLastTransition(tx));

export const txIsCanceled = tx =>
  getTransitionsToState(STATE_CANCELED).includes(txLastTransition(tx));

export const txIsDelivered = tx =>
  getTransitionsToState(STATE_DELIVERED).includes(txLastTransition(tx));

const firstReviewTransitions = [
  ...getTransitionsToState(STATE_REVIEWED_BY_CUSTOMER),
  ...getTransitionsToState(STATE_REVIEWED_BY_PROVIDER),
];
export const txIsInFirstReview = tx => firstReviewTransitions.includes(txLastTransition(tx));

export const txIsInFirstReviewBy = (tx, isCustomer) =>
  isCustomer
    ? getTransitionsToState(STATE_REVIEWED_BY_CUSTOMER).includes(txLastTransition(tx))
    : getTransitionsToState(STATE_REVIEWED_BY_PROVIDER).includes(txLastTransition(tx));

export const txIsReviewed = tx =>
  getTransitionsToState(STATE_REVIEWED).includes(txLastTransition(tx));

/**
 * Helper functions to figure out if transaction has passed a given state.
 * This is based on transitions history given by transaction object.
 */

const txTransitions = tx => ensureTransaction(tx).attributes.transitions || [];
const hasPassedTransition = (transitionName, tx) =>
  !!txTransitions(tx).find(t => t.transition === transitionName);

const hasPassedStateFn = state => tx =>
  getTransitionsToState(state).filter(t => hasPassedTransition(t, tx)).length > 0;

export const txHasBeenAccepted = hasPassedStateFn(STATE_ACCEPTED);

export const txHasBeenDelivered = hasPassedStateFn(STATE_DELIVERED);

/**
 * Other transaction related utility functions
 */

export const transitionIsReviewed = transition =>
  getTransitionsToState(STATE_REVIEWED).includes(transition);

export const transitionIsFirstReviewedBy = (transition, isCustomer) =>
  isCustomer
    ? getTransitionsToState(STATE_REVIEWED_BY_CUSTOMER).includes(transition)
    : getTransitionsToState(STATE_REVIEWED_BY_PROVIDER).includes(transition);

export const getReview1Transition = isCustomer =>
  isCustomer ? TRANSITION_REVIEW_1_BY_CUSTOMER : TRANSITION_REVIEW_1_BY_PROVIDER;

export const getReview2Transition = isCustomer =>
  isCustomer ? TRANSITION_REVIEW_2_BY_CUSTOMER : TRANSITION_REVIEW_2_BY_PROVIDER;

// Check if a transition is the kind that should be rendered
// when showing transition history (e.g. ActivityFeed)
// The first transition and most of the expiration transitions made by system are not relevant
export const isRelevantPastTransition = transition => {
  return [
    TRANSITION_ACCEPT,
    TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE,
    TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE,
    TRANSITION_SIGNED_BY_CUSTOMER,
    TRANSITION_SIGNED_BY_PROVIDER,
    TRANSITION_UPLOAD_CAR_PHOTO,
    TRANSITION_CANCEL,
    TRANSITION_CANCEL_BY_CUSTOMER,
    TRANSITION_CANCEL_BY_PROVIDER,
    TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY,
    TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO,
    TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN,
    TRANSITION_CANCEL_BY_PROVIDER_AFTER_CUSTOMER_SIGN,
    TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN,
    TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_FULL_REFUND,
    TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY,
    TRANSITION_CUSTOMER_FULL_REFUND_AFTER_UPLOAD_PHOTO,
    TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN,
    TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_HALF_REFUND,
    TRANSITION_CUSTOMER_HALF_REFUND_AFTER_REVERIFY,
    TRANSITION_CUSTOMER_HALF_REFUND_AFTER_UPLOAD_PHOTO,
    TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_CUSTOMER_SIGN,
    TRANSITION_CUSTOMER_HALF_REFUND_WAITING_FOR_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_HALF_REFUND_AFTER_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_NO_REFUND,
    TRANSITION_CUSTOMER_NO_REFUND_AFTER_REVERIFY,
    TRANSITION_CUSTOMER_NO_REFUND_AFTER_UPLOAD_PHOTO,
    TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_CUSTOMER_SIGN,
    TRANSITION_CUSTOMER_NO_REFUND_WAITING_FOR_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_NO_REFUND_AFTER_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_CHARGE,
    TRANSITION_CUSTOMER_CHARGE_AFTER_REVERIFY,
    TRANSITION_CUSTOMER_CHARGE_AFTER_UPLOAD_PHOTO,
    TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_CUSTOMER_SIGN,
    TRANSITION_CUSTOMER_CHARGE_AFTER_CUSTOMER_SIGN,
    TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_PROVIDER_SIGN,
    TRANSITION_CUSTOMER_CHARGE_AFTER_PROVIDER_SIGN,
    TRANSITION_COMPLETE,
    // TRANSITION_CUSTOMER_COMPLETE,
    TRANSITION_PROVIDER_COMPLETE,
    TRANSITION_PROVIDER_DISPUTE,
    TRANSITION_ADMIN_COMPLETE,
    TRANSITION_COMPLETE_BY_CUSTOMER,
    TRANSITION_CONFIRM_PAYMENT,
    TRANSITION_DECLINE,
    TRANSITION_EXPIRE,
    TRANSITION_REVIEW_1_BY_CUSTOMER,
    TRANSITION_REVIEW_1_BY_PROVIDER,
    TRANSITION_REVIEW_2_BY_CUSTOMER,
    TRANSITION_REVIEW_2_BY_PROVIDER,
    TRANSITION_RE_VERIFY,
    TRANSITION_EXTEND_TRIP_CUSTOMER,
    TRANSITION_ACCEPT_EXTEND_TRIP,
    TRANSITION_DECLINE_EXTEND_TRIP,
    // TRANSITION_WAITING_FOR_CUSTOMER_REVERIFICATION
  ].includes(transition);
};

export const isCustomerReview = transition => {
  return [TRANSITION_REVIEW_1_BY_CUSTOMER, TRANSITION_REVIEW_2_BY_CUSTOMER].includes(transition);
};

export const isProviderReview = transition => {
  return [TRANSITION_REVIEW_1_BY_PROVIDER, TRANSITION_REVIEW_2_BY_PROVIDER].includes(transition);
};

export const getUserTxRole = (currentUserId, transaction) => {
  const tx = ensureTransaction(transaction);
  const customer = tx.customer;

  if (currentUserId && currentUserId.uuid && tx.id && customer.id) {
    // user can be either customer or provider
    return currentUserId.uuid === customer.id.uuid
      ? TX_TRANSITION_ACTOR_CUSTOMER
      : TX_TRANSITION_ACTOR_PROVIDER;
  } else {
    throw new Error(`Parameters for "userIsCustomer" function were wrong.
      currentUserId: ${currentUserId}, transaction: ${transaction}`);
  }
};

export const txRoleIsProvider = userRole => userRole === TX_TRANSITION_ACTOR_PROVIDER;
export const txRoleIsCustomer = userRole => userRole === TX_TRANSITION_ACTOR_CUSTOMER;

// Check if the given transition is privileged.
//
// Privileged transitions need to be handled from a secure context,
// i.e. the backend. This helper is used to check if the transition
// should go through the local API endpoints, or if using JS SDK is
// enough.
export const isPrivileged = transition => {
  return [
    TRANSITION_REQUEST_PAYMENT,
    TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
    TRANSITION_REQUEST_PAYMENT_INSTANT,
    TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY_INSTANT,
  ].includes(transition);
};
