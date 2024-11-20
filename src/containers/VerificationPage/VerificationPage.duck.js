// import { parse } from '../../util/urlHelpers';
// import { verify } from '../../ducks/EmailVerification.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';
import { fetchStripeAccount } from '../../ducks/stripeConnectAccount.duck';
import { setInitialValues } from '../StripePayoutPage/StripePayoutPage.duck';

import { updateOdooUsers } from '../../util/api';

// ================ Thunks ================ //

export const updateOdooUser = (params) => async (dispatch, getState) => {
  const currentUser = getState()?.user?.currentUser;

  params.userId = currentUser.id.uuid;

  if (!params.odooUserId) {
    if (!currentUser) return;

    const {
      attributes: {
        email,
        profile,
      },
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
}

export const loadData = () => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialValues());

  return dispatch(fetchCurrentUser()).then(response => {
    const currentUser = getState().user.currentUser;
    if (currentUser && currentUser.stripeAccount) {
      dispatch(fetchStripeAccount());
    }
    return response;
  });
};
