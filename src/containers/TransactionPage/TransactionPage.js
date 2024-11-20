import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureListing, ensureTransaction } from '../../util/data';
import { dateFromAPIToLocalNoon } from '../../util/dates';
import { createSlug } from '../../util/urlHelpers';
import { txIsPaymentPending } from '../../util/transaction';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';
import {
  NamedRedirect,
  TransactionPanel,
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
} from '../../components';
import SideNav from '../../components/SideNav/SideNav';
import { TopbarContainer } from '../../containers';

import {
  acceptSale,
  declineSale,
  cancelSale,
  sendMessage,
  sendReview,
  fetchMoreMessages,
  fetchTransactionLineItems,
  uploadPhoto,
  fetchTransaction,
  declineSaleBeforeAccept,
  extendTrip,
  acceptOrRejectExtendTrip,
  updatedProtectedData,
  uploadAfterPhoto,
  fetchNextTransitions,
  getEnvolapId,
  getSecondSignerUrl,
  fetchTransactionIntervalTime,
  contractSignSuccess,
  clearContractUrl,
  completeBooking,
  providerCompleteTx,
  providerDisputeTx,
} from './TransactionPage.duck';
import css from './TransactionPage.module.css';
import { getPaymentMethod } from '../../util/dataExtractors';

const PROVIDER = 'provider';
const CUSTOMER = 'customer';

// TransactionPage handles data loading for Sale and Order views to transaction pages in Inbox.
export const TransactionPageComponent = props => {
  const {
    currentUser,
    initialMessageFailedToTransaction,
    savePaymentMethodFailed,
    fetchMessagesError,
    fetchMessagesInProgress,
    totalMessagePages,
    oldestMessagePageFetched,
    fetchTransactionError,
    history,
    intl,
    messages,
    onManageDisableScrolling,
    onSendMessage,
    onSendReview,
    onShowMoreMessages,
    params,
    scrollingDisabled,
    sendMessageError,
    sendMessageInProgress,
    sendReviewError,
    sendReviewInProgress,
    transaction,
    transactionRole,
    acceptInProgress,
    acceptSaleError,
    declineInProgress,
    declineSaleError,
    onAcceptSale,
    onUploadPhoto,
    onDeclineSale,
    timeSlots,
    fetchTimeSlotsError,
    onCancelSale,
    processTransitions,
    callSetInitialValues,
    onInitializeCardPaymentData,
    onFetchTransactionLineItems,
    onFetchTransaction,
    onFetchTransactionIntervalTime,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    onUploadAfterPhoto,
    onDeclineSaleBeforeAccept,
    onAcceptOrRejectExtendTrip,
    acceptExtendedInProgress,
    rejectExtendedInProgress,
    acceptOrRejectError,
    onExtendTrip,
    onUpdatedProtectedData,
    onFetchNextTransitions,
    providerName,
    location,
    onGetEnvolapId,
    getEnvelopeIDProgress,
    getSecondUrlProgress,
    onGetSecondSignerUrl,
    docuCode,
    contractUrl1,
    contractUrl2,
    contractSignSuccessState,
    onContractSignSuccess,
    onClearContractUrl,
    cancelInProgress,
    policy,
    onCompleteBooking,
    onProviderCompleteTx,
    onProviderDisputeTx,
    refundInProgress,
    disputeInProgress,
  } = props;
  const routes = routeConfiguration();

  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const isProviderRole = transactionRole === PROVIDER;
  const isCustomerRole = transactionRole === CUSTOMER;

  const customOnAcceptSale = (currentTransaction, odooPaymentDetails, txId) => {
    const token = currentTransaction.attributes.metadata.token;
    const savedCard = getPaymentMethod(currentUser);
    return onAcceptSale(currentTransaction, token, savedCard?.id, odooPaymentDetails, txId);
  };

  const redirectToCheckoutPageWithInitialValues = (initialValues, listing) => {
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
    callSetInitialValues(setInitialValues, initialValues);

    // Clear previous Stripe errors from store if there is any
    onInitializeCardPaymentData();

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        { id: currentListing.id.uuid, slug: createSlug(currentListing.attributes.title) },
        {}
      )
    );
  };

  // If payment is pending, redirect to CheckoutPage
  if (
    txIsPaymentPending(currentTransaction) &&
    isCustomerRole &&
    currentTransaction.attributes.lineItems
  ) {
    const currentBooking = ensureListing(currentTransaction.booking);

    const initialValues = {
      listing: currentListing,
      // Transaction with payment pending should be passed to CheckoutPage
      transaction: currentTransaction,
      // Original bookingData content is not available,
      // but it is already used since booking is created.
      // (E.g. quantity is used when booking is created.)
      bookingData: {},
      bookingDates: {
        bookingStart: dateFromAPIToLocalNoon(currentBooking.attributes.start),
        bookingEnd: dateFromAPIToLocalNoon(currentBooking.attributes.end),
      },
    };

    redirectToCheckoutPageWithInitialValues(initialValues, currentListing);
  }

  // Customer can create a booking, if the tx is in "enquiry" state.
  const handleSubmitBookingRequest = values => {
    const { bookingDates, ...bookingData } = values;
    const initialValues = {
      listing: currentListing,
      // enquired transaction should be passed to CheckoutPage
      transaction: currentTransaction,
      bookingData,
      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
      confirmPaymentError: null,
    };

    redirectToCheckoutPageWithInitialValues(initialValues, currentListing);
  };

  const deletedListingTitle = intl.formatMessage({
    id: 'TransactionPage.deletedListing',
  });
  const listingTitle = currentListing.attributes.deleted
    ? deletedListingTitle
    : currentListing.attributes.title;

  // Redirect users with someone else's direct link to their own inbox/sales or inbox/orders page.
  const isDataAvailable =
    currentUser &&
    currentTransaction.id &&
    currentTransaction.id.uuid === params.id &&
    currentTransaction.attributes.lineItems &&
    currentTransaction.customer &&
    currentTransaction.provider &&
    !fetchTransactionError;

  const isOwnSale =
    isDataAvailable &&
    isProviderRole &&
    currentUser.id.uuid === currentTransaction.provider.id.uuid;
  const isOwnOrder =
    isDataAvailable &&
    isCustomerRole &&
    currentUser.id.uuid === currentTransaction.customer.id.uuid;

  if (isDataAvailable && isProviderRole && !isOwnSale) {
    console.error('Tried to access a sale that was not owned by the current user');
    return <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />;
  } else if (isDataAvailable && isCustomerRole && !isOwnOrder) {
    console.error('Tried to access an order that was not owned by the current user');
    return <NamedRedirect name="InboxPage" params={{ tab: 'orders' }} />;
  }

  const detailsClassName = classNames(css.tabContent, css.tabContentVisible);

  const fetchErrorMessage = isCustomerRole
    ? 'TransactionPage.fetchOrderFailed'
    : 'TransactionPage.fetchSaleFailed';
  const loadingMessage = isCustomerRole
    ? 'TransactionPage.loadingOrderData'
    : 'TransactionPage.loadingSaleData';

  const loadingOrFailedFetching = fetchTransactionError ? (
    <p className={css.error}>
      <FormattedMessage id={`${fetchErrorMessage}`} />
    </p>
  ) : (
    <p className={css.loading}>
      <FormattedMessage id={`${loadingMessage}`} />
    </p>
  );

  const initialMessageFailed = !!(
    initialMessageFailedToTransaction &&
    currentTransaction.id &&
    initialMessageFailedToTransaction.uuid === currentTransaction.id.uuid
  );

  // TransactionPanel is presentational component
  // that currently handles showing everything inside layout's main view area.
  const panel = isDataAvailable ? (
    <TransactionPanel
      className={detailsClassName}
      getEnvelopeIDProgress={getEnvelopeIDProgress}
      currentUser={currentUser}
      transaction={currentTransaction}
      fetchMessagesInProgress={fetchMessagesInProgress}
      totalMessagePages={totalMessagePages}
      oldestMessagePageFetched={oldestMessagePageFetched}
      messages={messages}
      locations={location}
      onExtendTrip={onExtendTrip}
      history={history}
      onFetchTransactionIntervalTime={onFetchTransactionIntervalTime}
      onFetchNextTransitions={onFetchNextTransitions}
      onAcceptOrRejectExtendTrip={onAcceptOrRejectExtendTrip}
      acceptExtendedInProgress={acceptExtendedInProgress}
      contractSignSuccessState={contractSignSuccessState}
      rejectExtendedInProgress={rejectExtendedInProgress}
      acceptOrRejectError={acceptOrRejectError}
      initialMessageFailed={initialMessageFailed}
      savePaymentMethodFailed={savePaymentMethodFailed}
      fetchMessagesError={fetchMessagesError}
      sendMessageInProgress={sendMessageInProgress}
      sendMessageError={sendMessageError}
      sendReviewInProgress={sendReviewInProgress}
      sendReviewError={sendReviewError}
      onManageDisableScrolling={onManageDisableScrolling}
      onShowMoreMessages={onShowMoreMessages}
      onSendMessage={onSendMessage}
      onSendReview={onSendReview}
      transactionRole={transactionRole}
      providerName={providerName}
      onUploadAfterPhoto={onUploadAfterPhoto}
      onAcceptSale={customOnAcceptSale}
      onGetSecondSignerUrl={onGetSecondSignerUrl}
      onUpdatedProtectedData={onUpdatedProtectedData}
      onUploadPhoto={onUploadPhoto}
      onDeclineSale={onDeclineSale}
      docuCode={docuCode}
      routes={routes}
      onDeclineSaleBeforeAccept={onDeclineSaleBeforeAccept}
      onCancelSale={onCancelSale}
      acceptInProgress={acceptInProgress}
      declineInProgress={declineInProgress}
      getSecondUrlProgress={getSecondUrlProgress}
      acceptSaleError={acceptSaleError}
      declineSaleError={declineSaleError}
      nextTransitions={processTransitions}
      onSubmitBookingRequest={handleSubmitBookingRequest}
      timeSlots={timeSlots}
      onGetEnvolapId={onGetEnvolapId}
      onContractSignSuccess={onContractSignSuccess}
      fetchTimeSlotsError={fetchTimeSlotsError}
      onFetchTransactionLineItems={onFetchTransactionLineItems}
      onFetchTransaction={onFetchTransaction}
      lineItems={lineItems}
      fetchLineItemsInProgress={fetchLineItemsInProgress}
      fetchLineItemsError={fetchLineItemsError}
      contractUrl1={contractUrl1}
      contractUrl2={contractUrl2}
      onClearContractUrl={onClearContractUrl}
      cancelInProgress={cancelInProgress}
      policy={policy}
      onCompleteBooking={onCompleteBooking}
      onProviderCompleteTx={onProviderCompleteTx}
      onProviderDisputeTx={onProviderDisputeTx}
      refundInProgress={refundInProgress}
      disputeInProgress={disputeInProgress}
    />
  ) : (
    loadingOrFailedFetching
  );
  const pageName = ['Detalles de la transacción'];

  return (
    <Page
      title={intl.formatMessage({ id: 'TransactionPage.title' }, { title: listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.root}>{panel}</div>
        </LayoutWrapperMain>
      </LayoutSingleColumn>
    </Page>
  );
};

TransactionPageComponent.defaultProps = {
  currentUser: null,
  fetchTransactionError: null,
  acceptSaleError: null,
  declineSaleError: null,
  transaction: null,
  fetchMessagesError: null,
  initialMessageFailedToTransaction: null,
  savePaymentMethodFailed: false,
  sendMessageError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  lineItems: null,
  fetchLineItemsError: null,
};

const { bool, func, oneOf, shape, string, array, arrayOf, number } = PropTypes;

TransactionPageComponent.propTypes = {
  params: shape({ id: string }).isRequired,
  transactionRole: oneOf([PROVIDER, CUSTOMER]).isRequired,
  currentUser: propTypes.currentUser,
  fetchTransactionError: propTypes.error,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  onAcceptSale: func.isRequired,
  onUploadPhoto: func.isRequired,
  onDeclineSale: func.isRequired,
  onCancelSale: func.isRequired,
  scrollingDisabled: bool.isRequired,
  transaction: propTypes.transaction,
  fetchMessagesError: propTypes.error,
  totalMessagePages: number.isRequired,
  oldestMessagePageFetched: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailedToTransaction: propTypes.uuid,
  savePaymentMethodFailed: bool,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  callSetInitialValues: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,
  onFetchTransactionLineItems: func.isRequired,

  // line items
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    fetchTransactionError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    transactionRef,
    fetchMessagesInProgress,
    fetchMessagesError,
    totalMessagePages,
    oldestMessagePageFetched,
    messages,
    initialMessageFailedToTransaction,
    savePaymentMethodFailed,
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
    timeSlots,
    fetchTimeSlotsError,
    processTransitions,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    acceptExtendedInProgress,
    rejectExtendedInProgress,
    acceptOrRejectError,
    providerName,
    getEnvelopeIDProgress,
    getSecondUrlProgress,
    docuCode,
    contractUrl1,
    contractUrl2,
    contractSignSuccessState,
    cancelInProgress,
    policy,
    refundInProgress,
    disputeInProgress,
  } = state.TransactionPage;
  const { currentUser } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    currentUser,
    fetchTransactionError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    scrollingDisabled: isScrollingDisabled(state),
    transaction,
    fetchMessagesInProgress,
    fetchMessagesError,
    totalMessagePages,
    oldestMessagePageFetched,
    messages,
    initialMessageFailedToTransaction,
    savePaymentMethodFailed,
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
    timeSlots,
    fetchTimeSlotsError,
    processTransitions,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    acceptExtendedInProgress,
    rejectExtendedInProgress,
    acceptOrRejectError,
    providerName,
    getEnvelopeIDProgress,
    getSecondUrlProgress,
    docuCode,
    contractUrl1,
    contractUrl2,
    contractSignSuccessState,
    cancelInProgress,
    policy,
    refundInProgress,
    disputeInProgress,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: (transaction, token, paymentMethod, odooPaymentDetails, txId) =>
      dispatch(acceptSale(transaction, token, paymentMethod, odooPaymentDetails, txId)),
    onUploadPhoto: (transaction, metadataInfo, odooOrderId) =>
      dispatch(uploadPhoto(transaction, metadataInfo, odooOrderId)),
    onCancelSale: (params, invoice) => dispatch(cancelSale(params, invoice)),
    onDeclineSale: (currentTransaction, invoice) =>
      dispatch(declineSale(currentTransaction, invoice)),
    onShowMoreMessages: txId => dispatch(fetchMoreMessages(txId)),
    onSendMessage: (txId, message) => dispatch(sendMessage(txId, message)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
    onSendReview: (role, tx, reviewRating, reviewContent) =>
      dispatch(sendReview(role, tx, reviewRating, reviewContent)),
    callSetInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
    onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
    onFetchTransactionLineItems: (bookingData, listingId, isOwnListing) =>
      dispatch(fetchTransactionLineItems(bookingData, listingId, isOwnListing)),
    onFetchTransaction: (id, txRole, type) => dispatch(fetchTransaction(id, txRole, type)),
    onFetchTransactionIntervalTime: (id, txRole, type) =>
      dispatch(fetchTransactionIntervalTime(id, txRole, type)),
    onDeclineSaleBeforeAccept: id => dispatch(declineSaleBeforeAccept(id)),
    onExtendTrip: params => dispatch(extendTrip(params)),
    onAcceptOrRejectExtendTrip: params => dispatch(acceptOrRejectExtendTrip(params)),
    onUpdatedProtectedData: params => dispatch(updatedProtectedData(params)),
    onUploadAfterPhoto: params => dispatch(uploadAfterPhoto(params)),
    onFetchNextTransitions: params => dispatch(fetchNextTransitions(params)),
    onGetEnvolapId: params => dispatch(getEnvolapId(params)),
    onGetSecondSignerUrl: params => dispatch(getSecondSignerUrl(params)),
    onContractSignSuccess: payload => dispatch(contractSignSuccess(payload)),
    onClearContractUrl: payload => dispatch(clearContractUrl(payload)),
    onCompleteBooking: id => dispatch(completeBooking(id)),
    onProviderCompleteTx: (listingId, paymentIntentId, amount) =>
      dispatch(providerCompleteTx(listingId, paymentIntentId, amount)),
    onProviderDisputeTx: (listingId, disputeAmount, disputeReason) =>
      dispatch(providerDisputeTx(listingId, disputeAmount, disputeReason)),
  };
};

const TransactionPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(TransactionPageComponent);

export default TransactionPage;
