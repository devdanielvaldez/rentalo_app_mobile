import isEmpty from 'lodash/isEmpty';
import { clearCurrentUser, fetchCurrentUser } from './user.duck';
import {
  checkAppleId,
  createOdooUsers,
  createUserWithIdp,
  createUserWithOpenIdp,
  loginUserWithOpenIdp,
} from '../util/api';
import { storableError } from '../util/errors';
import * as log from '../util/log';
import { H } from 'highlight.run';

const authenticated = authInfo => authInfo && authInfo.isAnonymous === false;

// ================ Action types ================ //

export const AUTH_INFO_REQUEST = 'app/Auth/AUTH_INFO_REQUEST';
export const AUTH_INFO_SUCCESS = 'app/Auth/AUTH_INFO_SUCCESS';

export const LOGIN_REQUEST = 'app/Auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'app/Auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'app/Auth/LOGIN_ERROR';

export const LOGOUT_REQUEST = 'app/Auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'app/Auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'app/Auth/LOGOUT_ERROR';

export const SIGNUP_REQUEST = 'app/Auth/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'app/Auth/SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'app/Auth/SIGNUP_ERROR';

export const CONFIRM_REQUEST = 'app/Auth/CONFIRM_REQUEST';
export const CONFIRM_SUCCESS = 'app/Auth/CONFIRM_SUCCESS';
export const CONFIRM_ERROR = 'app/Auth/CONFIRM_ERROR';

export const CONFIRM_APPLE_REQUEST = 'app/Auth/CONFIRM_APPLE_REQUEST';
export const CONFIRM_APPLE_SUCCESS = 'app/Auth/CONFIRM_APPLE_SUCCESS';
export const CONFIRM_APPLE_ERROR = 'app/Auth/CONFIRM_APPLE_ERROR';
// Generic user_logout action that can be handled elsewhere
// E.g. src/reducers.js clears store as a consequence
export const USER_LOGOUT = 'app/USER_LOGOUT';

// ================ Reducer ================ //

const initialState = {
  isAuthenticated: false,

  // scopes associated with current token
  authScopes: [],

  // auth info
  authInfoLoaded: false,

  // login
  loginError: null,
  loginInProgress: false,

  // logout
  logoutError: null,
  logoutInProgress: false,

  // signup
  signupError: null,
  signupInProgress: false,

  // confirm (create use with idp)
  confirmError: null,
  confirmInProgress: false,

  // comfirm (create user with openidp)
  confirmAppleError: null,
  confirmAppleInProgress: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_INFO_REQUEST:
      return state;
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        authInfoLoaded: true,
        isAuthenticated: authenticated(payload),
        authScopes: payload.scopes,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loginInProgress: true,
        loginError: null,
        logoutError: null,
        signupError: null,
      };
    case LOGIN_SUCCESS:
      return { ...state, loginInProgress: false, isAuthenticated: true };
    case LOGIN_ERROR:
      return { ...state, loginInProgress: false, loginError: payload };

    case LOGOUT_REQUEST:
      return { ...state, logoutInProgress: true, loginError: null, logoutError: null };
    case LOGOUT_SUCCESS:
      return { ...state, logoutInProgress: false, isAuthenticated: false, authScopes: [] };
    case LOGOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };

    case SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, loginError: null, signupError: null };
    case SIGNUP_SUCCESS:
      return { ...state, signupInProgress: false };
    case SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case CONFIRM_REQUEST:
      return { ...state, confirmInProgress: true, loginError: null, confirmError: null };
    case CONFIRM_SUCCESS:
      return { ...state, confirmInProgress: false, isAuthenticated: true };
    case CONFIRM_ERROR:
      return { ...state, confirmInProgress: false, confirmError: payload };

    case CONFIRM_APPLE_REQUEST:
      return { ...state, confirmAppleInProgress: true, confirmAppleError: null };
    case CONFIRM_APPLE_SUCCESS:
      return { ...state, confirmAppleInProgress: false, isAuthenticated: true };
    case CONFIRM_APPLE_ERROR:
      return { ...state, confirmAppleInProgress: false, confirmAppleError: payload };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const authenticationInProgress = state => {
  const { loginInProgress, logoutInProgress, signupInProgress } = state.Auth;
  return loginInProgress || logoutInProgress || signupInProgress;
};

// ================ Action creators ================ //

export const authInfoRequest = () => ({ type: AUTH_INFO_REQUEST });
export const authInfoSuccess = info => ({ type: AUTH_INFO_SUCCESS, payload: info });

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginError = error => ({ type: LOGIN_ERROR, payload: error, error: true });

export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutError = error => ({ type: LOGOUT_ERROR, payload: error, error: true });

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupError = error => ({ type: SIGNUP_ERROR, payload: error, error: true });

export const confirmRequest = () => ({ type: CONFIRM_REQUEST });
export const confirmSuccess = () => ({ type: CONFIRM_SUCCESS });
export const confirmError = error => ({ type: CONFIRM_ERROR, payload: error, error: true });

export const confirmAppleRequest = () => ({ type: CONFIRM_APPLE_REQUEST });
export const confirmAppleSuccess = () => ({ type: CONFIRM_APPLE_SUCCESS });
export const confirmAppleError = error => ({
  type: CONFIRM_APPLE_ERROR,
  payload: error,
  error: true,
});

export const userLogout = () => ({ type: USER_LOGOUT });

// ================ Thunks ================ //

export const authInfo = () => (dispatch, getState, sdk) => {
  dispatch(authInfoRequest());
  return sdk
    .authInfo()
    .then(info => dispatch(authInfoSuccess(info)))
    .catch(e => {
      // Requesting auth info just reads the token from the token
      // store (i.e. cookies), and should not fail in normal
      // circumstances. If it fails, it's due to a programming
      // error. In that case we mark the operation done and dispatch
      // `null` success action that marks the user as unauthenticated.
      log.error(e, 'auth-info-failed');
      dispatch(authInfoSuccess(null));
    });
};

export const login = (username, password) => (dispatch, getState, sdk) => {
  if (authenticationInProgress(getState())) {
    return Promise.reject(new Error('Login or logout already in progress'));
  }
  dispatch(loginRequest());
	H.identify(username);
  // Note that the thunk does not reject when the login fails, it
  // just dispatches the login error action.
  return sdk
    .login({ username, password })
    .then(() => dispatch(loginSuccess()))
    .then(() => dispatch(fetchCurrentUser()))
    .then(() => dispatch(fetchCurrentUser()))
    .catch(e => dispatch(loginError(storableError(e))));
};

export const logout = () => (dispatch, getState, sdk) => {
  if (authenticationInProgress(getState())) {
    return Promise.reject(new Error('Login or logout already in progress'));
  }
  dispatch(logoutRequest());

  // Note that the thunk does not reject when the logout fails, it
  // just dispatches the logout error action.
  return sdk
    .logout()
    .then(() => {
      // The order of the dispatched actions
      dispatch(logoutSuccess());
      dispatch(clearCurrentUser());
      log.clearUserId();
      dispatch(userLogout());
    })
    .catch(e => dispatch(logoutError(storableError(e))));
};

export const signup = params => (dispatch, getState, sdk) => {
  if (authenticationInProgress(getState())) {
    return Promise.reject(new Error('Login or logout already in progress'));
  }
  dispatch(signupRequest());
  const { email, password, firstName, lastName, ...rest } = params;

  const createUserParams = isEmpty(rest)
    ? { email, password, firstName, lastName }
    : {
        email,
        password,
        firstName,
        lastName,
        publicData: { email, fullName: `${firstName} ${lastName}` },
        protectedData: { isApprovedToDrive: false, ...rest },
      };
  const name = firstName + ' ' + lastName;

  // We must login the user if signup succeeds since the API doesn't
  // do that automatically.
  return sdk.currentUser
    .create(createUserParams)
    .then(() => dispatch(signupSuccess()))
    .then(() => dispatch(login(email, password)))
    .then(() => createOdooUsers({ email: email, name: name }))
    .then(res => {
      const odoo_user_id = res?.odooUserId;

      return sdk.currentUser.updateProfile({
        privateData: {
          odoo_user_id,
        },
      });
    })
    .catch(e => {
      dispatch(signupError(storableError(e)));
      log.error(e, 'signup-failed', {
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
      });
    });
};

export const signupWithIdp = params => async (dispatch, getState, sdk) => {
  try {
    const { email, firstName, lastName } = params;
    const name = firstName + ' ' + lastName;

    dispatch(confirmRequest());

    await createUserWithIdp(params);
    await sdk.currentUser.updateProfile({ publicData: { email } });

    dispatch(confirmSuccess());
    dispatch(fetchCurrentUser());

    const odooUserResponse = await createOdooUsers({ email: email, name: name });
    const odoo_user_id = odooUserResponse?.odooUserId;

    await sdk.currentUser.updateProfile({
      privateData: {
        odoo_user_id,
      },
    });

    dispatch(fetchCurrentUser());
  } catch (e) {
    log.error(e, 'create-user-with-idp-failed', { params });
    dispatch(confirmError(storableError(e)));
  }
};

export const checkAppleMailId = params => () => {
  return checkAppleId(params)
    .then(res => res)
    .catch(err => err);
};

export const signupWithAppleIdp = params => async dispatch => {
  try {
    dispatch(confirmAppleRequest());
    const userRes = await createUserWithOpenIdp(params);
    dispatch(confirmAppleSuccess());
    dispatch(fetchCurrentUser());
    return userRes;
  } catch (error) {
    log.error(error, 'create-user-with-idp-failed', { params });
    return dispatch(confirmAppleError(storableError(error)));
  }
};

export const loginWithAppleIdp = params => async dispatch => {
  try {
    dispatch(confirmRequest());
    const response = await loginUserWithOpenIdp(params);

    dispatch(fetchCurrentUser());
    dispatch(confirmSuccess());
    return response;
  } catch (error) {
    console.log('error', error);
  }
};
