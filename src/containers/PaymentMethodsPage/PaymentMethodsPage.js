import React, { useState } from 'react';
import { bool, func, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { savePaymentMethod, deletePaymentMethod } from '../../ducks/paymentMethods.duck';
import { handleCardSetup } from '../../ducks/stripe.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
} from '../../components';
import { TopbarContainer } from '../../containers';
import {
  createStripeSetupIntent,
  stripeCustomer,
  attachPaymentMethod,
  detachPaymentMethod,
} from './PaymentMethodsPage.duck.js';
import css from './PaymentMethodsPage.module.css';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { getPaymentMethod } from '../../util/dataExtractors';

import CustomCardElement from '../../components/CustomCardElement/CustomCardElement';

const PaymentMethodsPageComponent = props => {
  const [showChangeCard, setChangeCard] = useState(false);

  const {
    currentUser,
    scrollingDisabled,
    intl,
    handleAttachPaymentMethod,
    handleDetachPaymentMethod,
    attachmentInProgress,
    attached,
    detached,
  } = props;

  // const getClientSecret = setupIntent => {
  //   return setupIntent && setupIntent.attributes ? setupIntent.attributes.clientSecret : null;
  // };
  // const getPaymentParams = (currentUser, formValues) => {
  //   const { name, addressLine1, addressLine2, postal, state, city, country } = formValues;
  //   const addressMaybe =
  //     addressLine1 && postal
  //       ? {
  //           address: {
  //             city: city,
  //             country: country,
  //             line1: addressLine1,
  //             line2: addressLine2,
  //             postal_code: postal,
  //             state: state,
  //           },
  //         }
  //       : {};
  //   const billingDetails = {
  //     name,
  //     email: ensureCurrentUser(currentUser).attributes.email,
  //     ...addressMaybe,
  //   };

  //   const paymentParams = {
  //     payment_method_data: {
  //       billing_details: billingDetails,
  //     },
  //   };

  //   return paymentParams;
  // };

  // const handleSubmit = params => {
  //   setIsSubmitting(true);
  //   const ensuredCurrentUser = ensureCurrentUser(currentUser);
  //   const stripeCustomer = ensuredCurrentUser.stripeCustomer;
  //   const { stripe, card, formValues } = params;

  //   onCreateSetupIntent()
  //     .then(setupIntent => {
  //       const stripeParams = {
  //         stripe,
  //         card,
  //         setupIntentClientSecret: getClientSecret(setupIntent),
  //         paymentParams: getPaymentParams(currentUser, formValues),
  //       };

  //       return onHandleCardSetup(stripeParams);
  //     })
  //     .then(result => {
  //       const newPaymentMethod = result.setupIntent.payment_method;
  //       // Note: stripe.handleCardSetup might return an error inside successful call (200), but those are rejected in thunk functions.

  //       return onSavePaymentMethod(stripeCustomer, newPaymentMethod);
  //     })
  //     .then(() => {
  //       // Update currentUser entity and its sub entities: stripeCustomer and defaultPaymentMethod
  //       fetchStripeCustomer();
  //       setIsSubmitting(false);
  //       setCardState('default');
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setIsSubmitting(false);
  //     });
  // };

  // const handleRemovePaymentMethod = () => {
  //   onDeletePaymentMethod().then(() => {
  //     fetchStripeCustomer();
  //   });
  // };

  const title = intl.formatMessage({ id: 'PaymentMethodsPage.title' });

  // const ensuredCurrentUser = ensureCurrentUser(currentUser);
  // const currentUserLoaded = !!ensuredCurrentUser.id;

  // const hasDefaultPaymentMethod =
  //   currentUser &&
  //   ensureStripeCustomer(currentUser.stripeCustomer).attributes.stripeCustomerId &&
  //   ensurePaymentMethodCard(currentUser.stripeCustomer.defaultPaymentMethod).id;

  // Get first and last name of the current user and use it in the StripePaymentForm to autofill the name field
  // const userName = currentUserLoaded
  //   ? `${ensuredCurrentUser.attributes.profile.firstName} ${ensuredCurrentUser.attributes.profile.lastName}`
  //   : null;

  // const initalValuesForStripePayment = { name: userName };

  // const card = hasDefaultPaymentMethod
  //   ? ensurePaymentMethodCard(currentUser.stripeCustomer.defaultPaymentMethod).attributes.card
  //   : null;

  // const showForm = cardState === 'replaceCard' || !hasDefaultPaymentMethod;
  // const showCardDetails = !!hasDefaultPaymentMethod;

  const cardData = getPaymentMethod(currentUser);
  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="PaymentMethodsPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
            pageName={['Configuración']}
          />
          {/* <UserNav selectedPageName="PaymentMethodsPage" /> */}
          <div className={css.sideNav}>
            <ProfileNav />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="PaymentMethodsPage"
          currentUser={currentUser}
          isVerficationDetailsTab={true}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="PaymentMethodsPage.heading" />
            </h1>
            <CustomCardElement
              cardData={cardData}
              showChangeCard={showChangeCard}
              attached={attached}
              detached={detached}
              setChangeCard={setChangeCard}
              handleAttachPaymentMethod={handleAttachPaymentMethod}
              handleDetachPaymentMethod={handleDetachPaymentMethod}
              attachmentInProgress={attachmentInProgress}
            />
          </div>
        </LayoutWrapperMain>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}

      </LayoutSideNavigation>
    </Page>
  );
};

PaymentMethodsPageComponent.defaultProps = {
  currentUser: null,
  addPaymentMethodError: null,
  deletePaymentMethodError: null,
  createStripeCustomerError: null,
  handleCardSetupError: null,
};

PaymentMethodsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  addPaymentMethodError: object,
  deletePaymentMethodError: object,
  createStripeCustomerError: object,
  handleCardSetupError: object,
  onCreateSetupIntent: func.isRequired,
  onHandleCardSetup: func.isRequired,
  onSavePaymentMethod: func.isRequired,
  onDeletePaymentMethod: func.isRequired,
  fetchStripeCustomer: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;

  const {
    deletePaymentMethodInProgress,
    addPaymentMethodError,
    deletePaymentMethodError,
    createStripeCustomerError,
  } = state.paymentMethods;

  const {
    stripeCustomerFetched,
    attachmentInProgress,
    attached,
    detachmentInProgress,
    detached,
  } = state.PaymentMethodsPage;

  const { handleCardSetupError } = state.stripe;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    deletePaymentMethodInProgress,
    addPaymentMethodError,
    deletePaymentMethodError,
    createStripeCustomerError,
    handleCardSetupError,
    stripeCustomerFetched,
    attachmentInProgress,
    attached,
    detachmentInProgress,
    detached,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  fetchStripeCustomer: () => dispatch(stripeCustomer()),
  onHandleCardSetup: params => dispatch(handleCardSetup(params)),
  onCreateSetupIntent: params => dispatch(createStripeSetupIntent(params)),
  onSavePaymentMethod: (stripeCustomer, newPaymentMethod) =>
    dispatch(savePaymentMethod(stripeCustomer, newPaymentMethod)),
  onDeletePaymentMethod: params => dispatch(deletePaymentMethod(params)),
  handleAttachPaymentMethod: params => dispatch(attachPaymentMethod(params)),
  handleDetachPaymentMethod: () => dispatch(detachPaymentMethod()),
});

const PaymentMethodsPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(PaymentMethodsPageComponent);

export default PaymentMethodsPage;
