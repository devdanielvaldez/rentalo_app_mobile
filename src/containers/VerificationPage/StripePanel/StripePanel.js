import React from 'react';
import { bool, func, oneOf, shape } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import config from '../../../config';
import routeConfiguration from '../../../routeConfiguration';
import { createResourceLocatorString } from '../../../util/routes';
import { FormattedMessage, injectIntl, intlShape } from '../../../util/reactIntl';
import { ensureCurrentUser } from '../../../util/data';
import { propTypes } from '../../../util/types';
import { isScrollingDisabled } from '../../../ducks/UI.duck';
import {
  stripeAccountClearError,
  getStripeConnectAccountLink,
} from '../../../ducks/stripeConnectAccount.duck';

import {
  NamedRedirect,
  StripeConnectAccountStatusBox,
  // UserNav,
} from '../../../components';

import StripeConnectAccountForm from '../../../forms/StripeConnectAccountForm/StripeConnectAccountForm';
import { savePayoutDetails } from '../../StripePayoutPage/StripePayoutPage.duck';

import css from './StripePanel.module.css';

const STRIPE_ONBOARDING_RETURN_URL_SUCCESS = 'success';
const STRIPE_ONBOARDING_RETURN_URL_FAILURE = 'failure';
const STRIPE_ONBOARDING_RETURN_URL_TYPES = [
  STRIPE_ONBOARDING_RETURN_URL_SUCCESS,
  STRIPE_ONBOARDING_RETURN_URL_FAILURE,
];

// Create return URL for the Stripe onboarding form
const createReturnURL = (returnURLType, rootURL, routes) => {
  const path = createResourceLocatorString(
    'VerificationPage',
    routes,
    { returnURLType, tab: 'driver' },
    {}
  );
  const root = rootURL.replace(/\/$/, '');
  return `${root}${path}`;
};

// Get attribute: stripeAccountData
const getStripeAccountData = stripeAccount => stripeAccount.attributes.stripeAccountData || null;

// Get last 4 digits of bank account returned in Stripe account
const getBankAccountLast4Digits = stripeAccountData =>
  stripeAccountData && stripeAccountData.external_accounts.data?.length > 0
    ? stripeAccountData.external_accounts.data[0].last4
    : null;

// Check if there's requirements on selected type: 'past_due', 'currently_due' etc.
const hasRequirements = (stripeAccountData, requirementType) =>
  stripeAccountData != null &&
  stripeAccountData.requirements &&
  Array.isArray(stripeAccountData.requirements[requirementType]) &&
  stripeAccountData.requirements[requirementType]?.length > 0;

// Redirect user to Stripe's hosted Connect account onboarding form
const handleGetStripeConnectAccountLinkFn = (getLinkFn, commonParams) => type => () => {
  getLinkFn({ type, ...commonParams })
    .then(url => {
      window.location.href = url;
    })
    .catch(err => console.error(err));
};

export const StripePanelComponent = props => {
  const {
    currentUser,
    // scrollingDisabled,
    getAccountLinkInProgress,
    getAccountLinkError,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccountFetched,
    stripeAccount,
    onPayoutDetailsChange,
    onPayoutDetailsSubmit,
    onGetStripeConnectAccountLink,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    params,
    previousStep,
    nextStep,
    intl,
  } = props;

  const { returnURLType } = params;
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;
  const stripeConnected = currentUserLoaded && !!stripeAccount && !!stripeAccount.id;

  // const title = intl.formatMessage({ id: 'StripePayoutPage.title' });

  const formDisabled = getAccountLinkInProgress;

  const rootURL = config.canonicalRootURL;
  const routes = routeConfiguration();
  const successURL = createReturnURL(STRIPE_ONBOARDING_RETURN_URL_SUCCESS, rootURL, routes);
  const failureURL = createReturnURL(STRIPE_ONBOARDING_RETURN_URL_FAILURE, rootURL, routes);

  const accountId = stripeConnected ? stripeAccount.id : null;
  const stripeAccountData =
    stripeConnected && stripeAccount.attributes
      ? getStripeAccountData(stripeAccount)
      : stripeConnected
      ? stripeAccount
      : null;

  const requirementsMissing =
    stripeAccount &&
    (hasRequirements(stripeAccountData, 'past_due') ||
      hasRequirements(stripeAccountData, 'currently_due'));

  const savedCountry = stripeAccountData ? stripeAccountData.country : null;

  const handleGetStripeConnectAccountLink = handleGetStripeConnectAccountLinkFn(
    onGetStripeConnectAccountLink,
    {
      accountId,
      successURL,
      failureURL,
    }
  );

  const returnedNormallyFromStripe = returnURLType === STRIPE_ONBOARDING_RETURN_URL_SUCCESS;
  const returnedAbnormallyFromStripe = returnURLType === STRIPE_ONBOARDING_RETURN_URL_FAILURE;
  const showVerificationNeeded = stripeConnected && requirementsMissing;

  // Redirect from success URL to basic path for StripePayoutPage
  if (returnedNormallyFromStripe && stripeConnected && !requirementsMissing) {
    return <NamedRedirect name="VerificationPage" params={{ tab: 'driver' }} />;
  }

  // Failure url should redirect back to Stripe since it's most likely due to page reload
  // Account link creation will fail if the account is the reason
  if (returnedAbnormallyFromStripe && !getAccountLinkError) {
    handleGetStripeConnectAccountLink('custom_account_verification')();
  }

  return (
    <div className={css.content}>
      <h1 className={css.title}>
        <FormattedMessage id="StripePayoutPage.heading" />
      </h1>
      {!currentUserLoaded ? (
        <FormattedMessage id="StripePayoutPage.loadingData" />
      ) : returnedAbnormallyFromStripe && !getAccountLinkError ? (
        <FormattedMessage id="StripePayoutPage.redirectingToStripe" />
      ) : (
        <StripeConnectAccountForm
          disabled={formDisabled}
          inProgress={payoutDetailsSaveInProgress}
          ready={payoutDetailsSaved}
          currentUser={ensuredCurrentUser}
          stripeBankAccountLastDigits={getBankAccountLast4Digits(stripeAccountData)}
          savedCountry={savedCountry}
          submitButtonText={intl.formatMessage({
            id: 'StripePayoutPage.submitButtonText',
          })}
          stripeAccountError={
            createStripeAccountError || updateStripeAccountError || fetchStripeAccountError
          }
          stripeAccountLinkError={getAccountLinkError}
          stripeAccountFetched={stripeAccountFetched}
          onChange={onPayoutDetailsChange}
          onSubmit={onPayoutDetailsSubmit}
          onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink}
          stripeConnected={stripeConnected}
          pageName={'VerificationPage'}
        >
          {stripeConnected && !returnedAbnormallyFromStripe && showVerificationNeeded ? (
            <StripeConnectAccountStatusBox
              type="verificationNeeded"
              inProgress={getAccountLinkInProgress}
              onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink(
                'custom_account_verification'
              )}
            />
          ) : stripeConnected && savedCountry && !returnedAbnormallyFromStripe ? (
            <StripeConnectAccountStatusBox
              type="verificationSuccess"
              inProgress={getAccountLinkInProgress}
              disabled={payoutDetailsSaveInProgress}
              onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink(
                'custom_account_update'
              )}
            />
          ) : null}
        </StripeConnectAccountForm>
      )}

      <div className={css.buttonsHolder}>
        <span className={css.button} onClick={() => previousStep()}>
          Regresar
        </span>
        <span className={css.button} onClick={() => nextStep()}>
          Continuar verificación
        </span>
      </div>
    </div>
  );
};

StripePanelComponent.defaultProps = {
  currentUser: null,
  createStripeAccountError: null,
  updateStripeAccountError: null,
  fetchStripeAccountError: null,
  getAccountLinkError: null,
  stripeAccount: null,
  params: {
    returnURLType: null,
  },
};

StripePanelComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  getAccountLinkInProgress: bool.isRequired,
  payoutDetailsSaveInProgress: bool.isRequired,
  createStripeAccountError: propTypes.error,
  getAccountLinkError: propTypes.error,
  updateStripeAccountError: propTypes.error,
  fetchStripeAccountError: propTypes.error,
  stripeAccount: propTypes.stripeAccount,
  stripeAccountFetched: bool.isRequired,
  payoutDetailsSaved: bool.isRequired,

  onPayoutDetailsChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onGetStripeConnectAccountLink: func.isRequired,
  params: shape({
    returnURLType: oneOf(STRIPE_ONBOARDING_RETURN_URL_TYPES),
  }),

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    getAccountLinkInProgress,
    getAccountLinkError,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccount,
    stripeAccountFetched,
  } = state.stripeConnectAccount;
  const { currentUser } = state.user;
  const { payoutDetailsSaveInProgress, payoutDetailsSaved } = state.StripePayoutPage;
  return {
    currentUser,
    getAccountLinkInProgress,
    getAccountLinkError,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccount,
    stripeAccountFetched,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onPayoutDetailsChange: () => dispatch(stripeAccountClearError()),
  onPayoutDetailsSubmit: (values, isUpdateCall) =>
    dispatch(savePayoutDetails(values, isUpdateCall)),
  onGetStripeConnectAccountLink: params => dispatch(getStripeConnectAccountLink(params)),
});

const StripePanel = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(StripePanelComponent);

export default StripePanel;
