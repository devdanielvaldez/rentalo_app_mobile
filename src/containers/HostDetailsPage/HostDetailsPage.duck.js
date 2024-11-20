import { fetchCurrentUser } from '../../ducks/user.duck';
import { retrieveBusinessName } from '../../util/api';

import { checkVerification, sendVerification, updateOdooUsers } from '../../util/api';
import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const SEND_VERIFICATION_REQUEST = 'app/HostDetailsPage/SEND_VERIFICATION_REQUEST';
export const SEND_VERIFICATION_SUCCESS = 'app/HostDetailsPage/SEND_VERIFICATION_SUCCESS';
export const SEND_VERIFICATION_ERROR = 'app/HostDetailsPage/SEND_VERIFICATION_ERROR';

export const CHECK_VERIFICATION_REQUEST = 'app/HostDetailsPage/CHECK_VERIFICATION_REQUEST';
export const CHECK_VERIFICATION_SUCCESS = 'app/HostDetailsPage/CHECK_VERIFICATION_SUCCESS';
export const CHECK_VERIFICATION_ERROR = 'app/HostDetailsPage/CHECK_VERIFICATION_ERROR';

export const BUSINESS_NAME_REQUEST = 'app/HostDetailsPage/BUSINESS_NAME_REQUEST';
export const BUSINESS_NAME_SUCCESS = 'app/HostDetailsPage/BUSINESS_NAME_SUCCESS';
export const BUSINESS_NAME_ERROR = 'app/HostDetailsPage/BUSINESS_NAME_ERROR';
// ================ Reducer ================ //

const initialState = {
  sendVerificationError: null,
  sendVerificationInProgress: false,
  checkVerificationError: null,
  checkVerificationInProgress: false,
  businessNameError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SEND_VERIFICATION_REQUEST:
      return { ...state, sendVerificationInProgress: true, sendVerificationError: null };
    case SEND_VERIFICATION_SUCCESS:
      return { ...state, sendVerificationInProgress: false, sendVerificationError: null };
    case SEND_VERIFICATION_ERROR:
      return { ...state, sendVerificationInProgress: false, sendVerificationError: payload };

    case CHECK_VERIFICATION_REQUEST:
      return { ...state, checkVerificationInProgress: true, checkVerificationError: null };
    case CHECK_VERIFICATION_SUCCESS:
      return { ...state, checkVerificationInProgress: false, checkVerificationError: null };
    case CHECK_VERIFICATION_ERROR:
      return { ...state, checkVerificationInProgress: false, checkVerificationError: payload };
    case BUSINESS_NAME_REQUEST:
      return { ...state, businessNameError: null };
    case BUSINESS_NAME_SUCCESS:
      return { ...state, businessNameError: null };
    case BUSINESS_NAME_ERROR:
      return { ...state, businessNameError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const sendVerificationRequest = () => ({ type: SEND_VERIFICATION_REQUEST });
export const sendVerificationSuccess = () => ({ type: SEND_VERIFICATION_SUCCESS });
export const sendVerificationError = payload => ({ type: SEND_VERIFICATION_ERROR, payload });

export const checkVerificationRequest = () => ({ type: CHECK_VERIFICATION_REQUEST });
export const checkVerificationSuccess = () => ({ type: CHECK_VERIFICATION_SUCCESS });
export const checkVerificationError = payload => ({ type: CHECK_VERIFICATION_ERROR, payload });

export const getBusinessName = params => async dispatch => {
  try {
    dispatch({ type: BUSINESS_NAME_REQUEST });
    const businessName = await retrieveBusinessName({ ...params });
    dispatch({ type: BUSINESS_NAME_SUCCESS });
    return businessName;
  } catch (error) {
    dispatch({ type: BUSINESS_NAME_ERROR, payload: storableError(error) });
    return storableError(error);
  }
};

export const sendVerificationCode = params => async dispatch => {
  dispatch(sendVerificationRequest());
  return await sendVerification(params)
    .then(() => {
      dispatch(sendVerificationSuccess());
    })
    .catch(e => {
      dispatch(sendVerificationError(e?.response?.data?.message || DEFAULT_ERROR_MESSAGE));
      return e?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    });
};

export const checkVerificationCode = params => async dispatch => {
  dispatch(checkVerificationRequest());
  return await checkVerification(params)
    .then(() => {
      dispatch(checkVerificationSuccess());
      dispatch(fetchCurrentUser());
    })
    .catch(e => {
      dispatch(checkVerificationError(e?.response?.data?.message || DEFAULT_ERROR_MESSAGE));
      return e?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    });
};

export const updateOdooUser = params => async (dispatch, getState) => {
  if (!params.odooUserId) {
    const currentUser = getState()?.user?.currentUser;
    if (!currentUser) return;

    const {
      attributes: { email, profile },
      id,
    } = currentUser;

    params.user = {
      email,
      name: profile?.displayName,
      id: id.uuid,
    };
  }

  try {
    await updateOdooUsers(params);
  } catch (error) {
    console.log(error);
  }
};

export const loadData = () => {
  // Since verify email happens in separate tab, current user's data might be updated
  return fetchCurrentUser();
};
