import { storableError } from '../../util/errors';
import { fetchBanks, assignBankAccountToContactRequest, updateBankAccountInContactRequest } from '../../util/api';
import { fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const FETCH_BANKS_REQUEST = 'app/PayoutDetailsPage/FETCH_BANKS_REQUEST';
export const FETCH_BANKS_SUCCESS = 'app/PayoutDetailsPage/FETCH_BANKS_SUCCESS';
export const FETCH_BANKS_ERROR = 'app/PayoutDetailsPage/FETCH_BANKS_ERROR';

export const ATTACH_BANK_TO_CONTACT_REQUEST = 'app/PayoutDetailsPage/ATTACH_BANK_TO_CONTACT_REQUEST';
export const ATTACH_BANK_TO_CONTACT_SUCCESS = 'app/PayoutDetailsPage/ATTACH_BANK_TO_CONTACT_SUCCESS';
export const ATTACH_BANK_TO_CONTACT_ERROR = 'app/PayoutDetailsPage/ATTACH_BANK_TO_CONTACT_ERROR';
export const ATTACH_BANK_TO_CONTACT_RESET = 'app/PayoutDetailsPage/ATTACH_BANK_TO_CONTACT_RESET';

// ================ Reducer ================ //

const initialState = {
  banks: [],
  banksError: null,
  banksInProgress: false,
  attachBankToAccountError: null,
  attachBankToAccountInProgress: false,
  attachBankToAccountSuccess: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BANKS_REQUEST:
      return {
        ...state,
        banksInProgress: true,
        banksError: null,
      };
    case FETCH_BANKS_SUCCESS: {
      return { ...state, banks: payload, banksInProgress: false };
    }
    case FETCH_BANKS_ERROR: {
      return {
        ...state,
        banksError: payload,
        banksInProgress: false
      };
    }

    case ATTACH_BANK_TO_CONTACT_RESET:
      return { ...state, attachBankToAccountSuccess: null, }
    case ATTACH_BANK_TO_CONTACT_REQUEST:
      return {
        ...state,
        attachBankToAccountInProgress: true,
        attachBankToAccountError: null,
        attachBankToAccountSuccess: null,
      };
    case ATTACH_BANK_TO_CONTACT_SUCCESS: {
      return {
        ...state,
        attachBankToAccountInProgress: false,
        attachBankToAccountSuccess: true,
      };
    }
    case ATTACH_BANK_TO_CONTACT_ERROR: {
      return {
        ...state,
        attachBankToAccountError: payload,
        attachBankToAccountInProgress: false,
        attachBankToAccountSuccess: false,
      };
    }

    default:
      return state;
  }
}

export const attachBankToContactRequest = () => ({ type: ATTACH_BANK_TO_CONTACT_REQUEST });
export const attachBankToContactSuccess = payload => ({ type: ATTACH_BANK_TO_CONTACT_SUCCESS, payload });
export const attachBankToContactError = error => ({
  type: ATTACH_BANK_TO_CONTACT_ERROR,
  payload: error,
  error: true,
});
export const attachBankToContactReset = () => ({type: ATTACH_BANK_TO_CONTACT_RESET});

export const fetchBanksRequest = () => ({ type: FETCH_BANKS_REQUEST });
export const fetchBanksSuccess = payload => ({ type: FETCH_BANKS_SUCCESS, payload });
export const fetchBanksError = error => ({
  type: FETCH_BANKS_ERROR,
  payload: error,
  error: true,
});


export const getOdooBanks = () => async (dispatch) => {
  dispatch(fetchBanksRequest());

  try {
    const response = await fetchBanks({});

    dispatch(fetchBanksSuccess(response.data ?? []));
  } catch(e) {
    dispatch(fetchBanksError(storableError(e)));
  }
};

export const assignBankAccountToContact = (params) => async (dispatch, getState, sdk) => {
  dispatch(attachBankToContactRequest());

  const { country, bankName, ...restParams } = params;

  let user = null;
  if (!params.partner_id) {
    const currentUser = getState()?.user?.currentUser;
    if (!currentUser) return;

    const {
      attributes: {
        email,
        profile,
      },
      id,
    } = currentUser;

    user = {
      email,
      name: profile?.displayName,
      id: id.uuid,
    };
  }

  try {
    const response = await assignBankAccountToContactRequest({bankAccountData: restParams, user });

    if (response.error) {
      throw new Error(response.error);
    }

    if (response.data) {
      await sdk.currentUser.updateProfile({
        privateData: {
          odoo_bank_account_id: response.data,
          country,
          bankName,
        }
      });
    }

    dispatch(attachBankToContactSuccess());
  } catch(e) {
    dispatch(attachBankToContactError(storableError(e)));
    throw e;
  }
};

export const updateBankAccountInContact = (params) => async (dispatch, getState, sdk) => {
  dispatch(attachBankToContactRequest());

  const { odooBankAccountId, country, bankName, ...bankAccountData } = params;

  try {
    const response = await updateBankAccountInContactRequest({ bankAccountData, bankAccountId: odooBankAccountId });

    if (response.error) {
      throw new Error(response.error);
    }

    if (response.data) {
      await sdk.currentUser.updateProfile({
        privateData: {
          country,
          bankName,
        }
      });
    }

    dispatch(attachBankToContactSuccess());
  } catch(e) {
    dispatch(attachBankToContactError(storableError(e)));
    throw e;
  }
};

export const loadData = () => (dispatch) => {
  dispatch(attachBankToContactReset());
  return dispatch(fetchCurrentUser());
};
