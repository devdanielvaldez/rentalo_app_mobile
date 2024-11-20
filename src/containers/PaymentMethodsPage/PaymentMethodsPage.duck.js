import { fetchCurrentUser } from '../../ducks/user.duck';
import {
  setInitialValues as setInitialValuesForPaymentMethods,
} from '../../ducks/paymentMethods.duck';
import { storableError } from '../../util/errors';
import * as log from '../../util/log';
import { getPaymentMethod, getStripeCustomer } from '../../util/dataExtractors';
import { createPaymentMethod, createStripeCustomer, deletePaymentMethod } from '../../util/api';

// ================ Action types ================ //

export const ATTACHMENT_METHOD_REQUEST = 'app/PaymentMethodsPage/ATTACHMENT_METHOD_REQUEST';
export const ATTACHMENT_METHOD_SUCCESS = 'app/PaymentMethodsPage/ATTACHMENT_METHOD_SUCCESS';
export const ATTACHMENT_METHOD_ERROR = 'app/PaymentMethodsPage/ATTACHMENT_METHOD_ERROR';
export const ATTACHMENT_METHOD_CLEAR_STATE = 'app/PaymentMethodsPage/ATTACHMENT_METHOD_CLEAR_STATE';

export const DETACHMENT_METHOD_REQUEST = 'app/PaymentMethodsPage/DETACHMENT_METHOD_REQUEST';
export const DETACHMENT_METHOD_SUCCESS = 'app/PaymentMethodsPage/DETACHMENT_METHOD_SUCCESS';

export const SETUP_INTENT_REQUEST = 'app/PaymentMethodsPage/SETUP_INTENT_REQUEST';
export const SETUP_INTENT_SUCCESS = 'app/PaymentMethodsPage/SETUP_INTENT_SUCCESS';
export const SETUP_INTENT_ERROR = 'app/PaymentMethodsPage/SETUP_INTENT_ERROR';

export const STRIPE_CUSTOMER_REQUEST = 'app/PaymentMethodsPage/STRIPE_CUSTOMER_REQUEST';
export const STRIPE_CUSTOMER_SUCCESS = 'app/PaymentMethodsPage/STRIPE_CUSTOMER_SUCCESS';
export const STRIPE_CUSTOMER_ERROR = 'app/PaymentMethodsPage/STRIPE_CUSTOMER_ERROR';

// ================ Reducer ================ //

const initialState = {
  setupIntentInProgress: false,
  setupIntentError: null,
  setupIntent: null,
  stripeCustomerFetched: false,
  attachmentError: null,
};

export default function payoutMethodsPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ATTACHMENT_METHOD_REQUEST:
      return {
        ...state,
        attachmentInProgress: true,
        attached: false,
        attachmentError: false,
        detached: false,
      };
    case ATTACHMENT_METHOD_SUCCESS:
      return {
        ...state,
        attachmentInProgress: false,
        attachmentError: false,
        attached: true,
      };
    case ATTACHMENT_METHOD_ERROR:
      return {
        ...state,
        attachmentInProgress: false,
        attachmentError: payload,
        attached: false,
      };
    case ATTACHMENT_METHOD_CLEAR_STATE:
      return {
        ...state,
        attachmentInProgress: false,
        attached: false,
      };
    case DETACHMENT_METHOD_REQUEST:
      return { ...state, detachmentInProgress: true, detached: false, attached: false };
    case DETACHMENT_METHOD_SUCCESS:
      return {
        ...state,
        detachmentInProgress: false,
        detached: true,
      };
    case SETUP_INTENT_REQUEST:
      return { ...state, setupIntentInProgress: true, setupIntentError: null };
    case SETUP_INTENT_SUCCESS:
      return {
        ...state,
        setupIntentInProgress: false,
        setupIntentError: null,
        setupIntent: payload,
      };
    case SETUP_INTENT_ERROR:
      return { ...state, setupIntentInProgress: false, setupIntentError: null };
    case STRIPE_CUSTOMER_REQUEST:
      return { ...state, stripeCustomerFetched: false };
    case STRIPE_CUSTOMER_SUCCESS:
      return { ...state, stripeCustomerFetched: true };
    case STRIPE_CUSTOMER_ERROR:
      return { ...state, stripeCustomerFetchError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const attachPaymentMethodRequest = () => ({ type: ATTACHMENT_METHOD_REQUEST });
export const attachPaymentMethodSuccess = () => ({ type: ATTACHMENT_METHOD_SUCCESS });
export const attachPaymentMethodError = (e) => ({ type: ATTACHMENT_METHOD_ERROR, payload: e });
export const attachPaymentMethodClearState = () => ({ type: ATTACHMENT_METHOD_CLEAR_STATE });

export const detachPaymentMethodRequest = () => ({ type: DETACHMENT_METHOD_REQUEST });
export const detachPaymentMethodSuccess = () => ({ type: DETACHMENT_METHOD_SUCCESS });


export const setupIntentRequest = () => ({ type: SETUP_INTENT_REQUEST });
export const setupIntentSuccess = () => ({ type: SETUP_INTENT_SUCCESS });
export const setupIntentError = e => ({
  type: SETUP_INTENT_ERROR,
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
// ================ Thunks ================ //

export const createStripeSetupIntent = () => (dispatch, getState, sdk) => {
  dispatch(setupIntentRequest());
  return sdk.stripeSetupIntents
    .create()
    .then(response => {
      const setupIntent = response.data.data;
      dispatch(setupIntentSuccess(setupIntent));
      return setupIntent;
    })
    .catch(e => {
      const error = storableError(e);
      log.error(error, 'create-setup-intent-failed');
      dispatch(setupIntentError(error));
      return { createStripeSetupIntentSuccess: false };
    });
};

export const stripeCustomer = () => (dispatch, getState, sdk) => {
  dispatch(stripeCustomerRequest());

  return dispatch(fetchCurrentUser({ include: ['stripeCustomer.defaultPaymentMethod'] }))
    .then(response => {
      dispatch(stripeCustomerSuccess());
    })
    .catch(e => {
      const error = storableError(e);
      log.error(error, 'fetch-stripe-customer-failed');
      dispatch(stripeCustomerError(error));
    });
};

export const attachPaymentMethod = (params) => async (dispatch, getState, sdk) => {
  dispatch(attachPaymentMethodRequest());
  const { paymentMethod } = params;
  const currentUser = getState().user.currentUser;
  console.log('user --->', currentUser);
  const customerId = getStripeCustomer(currentUser);

  return customerId && customerId.id && paymentMethod ? await createPaymentMethod({
    paymentMethod: paymentMethod.id,
    customerId: customerId.id,
    email: currentUser.attributes.email
  }).then((response) => {
    dispatch(attachPaymentMethodSuccess());
    dispatch(fetchCurrentUser());
  }).catch(e => {
    const error = JSON.stringify(e.error);
    console.log(error, 'error createPaymentMethod')
    dispatch(attachPaymentMethodError(JSON.parse(error)));
  }) : await createStripeCustomer({
    email: currentUser?.attributes?.email,
    paymentMethod,
  }).then((response) => {
    dispatch(attachPaymentMethodSuccess());
    dispatch(fetchCurrentUser());
  }).catch(e => {
    const error = JSON.stringify(e.error);
    console.log(error, 'error createStripeCustomer')
    dispatch(attachPaymentMethodError(JSON.parse(error)));
  });
};

export const detachPaymentMethod = () => async (dispatch, getState, sdk) => {
  dispatch(detachPaymentMethodRequest());
  const currentUser = getState().user.currentUser;
  const paymentMethodId = getPaymentMethod(currentUser);
  const paymentMethodRes = paymentMethodId && paymentMethodId.id && await deletePaymentMethod({ paymentMethodId: paymentMethodId.id });
  if (paymentMethodRes) {
    dispatch(detachPaymentMethodSuccess());
  }
};


export const loadData = () => (dispatch, getState, sdk) => {
  dispatch(setInitialValuesForPaymentMethods());

  return dispatch(stripeCustomer());
};
