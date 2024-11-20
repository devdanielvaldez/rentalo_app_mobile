import React, { Component } from 'react';
import { bool, func, instanceOf, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName, findRouteByRouteName } from '../../util/routes';
import { propTypes } from '../../util/types';
import { ensureListing, ensureUser, ensureTransaction, ensureBooking } from '../../util/data';
import { dateFromLocalToAPI, daysBetween } from '../../util/dates';
import { createSlug } from '../../util/urlHelpers';
import {
  isTransactionInitiateAmountTooLowError,
  isTransactionInitiateListingNotFoundError,
  isTransactionInitiateBookingTimeNotAvailableError,
  isTransactionChargeDisabledError,
  isTransactionZeroPaymentError,
} from '../../util/errors';
import {
  AvatarMedium,
  Button,
  BookingBreakdown,
  Logo,
  NamedLink,
  NamedRedirect,
  Page,
  ResponsiveImage,
  Form,
  FieldTextInput,
  CustomSavedCardDetails,
} from '../../components';

import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  initiateOrder,
  setInitialValues,
  speculateTransaction,
  sendMessage,
  createInvoice,
  createInvoiceLineItems,
  invoiceStatusPosted,
  invoiceFinalStep,
  redeemVoucher,
} from './CheckoutPage.duck';
import Modal from 'react-modal';
Modal.setAppElement('#root');

import config from '../../config';

import { storeData, storedData, clearData } from './CheckoutPageSessionHelpers';
import { post, activatePolicy, sendOdooPaymentDetailsRequest, stripeCheckout, stripeStatus } from '../../util/api';
import css from './CheckoutPage.module.css';
// import moment from 'moment';
import { DATE_TYPE_DATE } from '../../util/types';
import CardSection from './CardSection';
import {
  // getOdooUserID,
  getPaymentMethod,
  getStripeCustomer,
} from '../../util/dataExtractors';
import { isEqual } from 'lodash';
import { fetchPaymentMethod, createCustomer, createIntent } from '../../ducks/user.duck';
import cardIcon from './card.png';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';

const STORAGE_KEY = 'CheckoutPage';

const formatDate = d => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const getProductQuantity = (code, rentalDys) => {
  return code === 'line-item/day' || code === 'line-item/tarifa-de-seguro' ? rentalDys : 1;
};

const getPriceUnit = (code, price, totalAmount) => {
  const amount = price / 100;

  return code === 'line-item/cupon-descuento' ? totalAmount / 100 : amount;
};

const getOdooOrderlines = (transactionLineItems, rentalDys) => {
  return transactionLineItems
    .map(({ unitPrice, lineTotal, code }) => {
      if (code === 'line-item/provider-commission') {
        return null;
      }

      const productId =
        code === 'line-item/day'
          ? 50
          : code === 'line-item/tarifa-de-seguro'
            ? 82
            : code === 'line-item/dias-de-descuento'
              ? 84
              : code === 'line-item/tarifa-de-servicio'
                ? 72
                : 76;

      return [
        0,
        0,
        {
          product_id: productId,
          product_uom_qty: getProductQuantity(code, rentalDys),
          price_unit: getPriceUnit(code, unitPrice.amount, lineTotal.amount),
        },
      ];
    })
    .filter(Boolean);
};

const handleSendOdooPaymentDetails = (currentUser, requestParams, currentTransaction) => {
  const userName = currentUser.attributes.profile.displayName;

  const odooPaymentDetails = {
    partner_id: currentUser.attributes.profile.privateData.odoo_user_id,
    is_rental_order: true,
    rental_status: 'draft',
    date_order: formatDate(requestParams.bookingStart),
    validity_date: formatDate(requestParams.bookingEnd),
    x_owner: userName,
    order_line: getOdooOrderlines(
      currentTransaction.attributes.lineItems,
      daysBetween(requestParams.bookingStart, requestParams.bookingEnd)
    ),
  };

  const user = {
    email: currentUser?.attributes?.email,
    name: userName,
    id: currentUser?.id.uuid,
  };

  sendOdooPaymentDetailsRequest({
    order: odooPaymentDetails,
    txId: currentTransaction.id.uuid,
    user,
  });
};

export class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: {},
      dataLoaded: false,
      submitting: false,
      card: null,
      stripe: false,
      submitReady: false,
      checked: false,
      cardElementid: '',
      hasPaymentMethod: false,
      showChangeCard: false,
      flightNumber: null,
      arivalTime: null,
      departureTime: null,
    };

    this.loadInitialData = this.loadInitialData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchPaymentMethod = this.fetchPaymentMethod.bind(this);
    this.setChangeCard = this.setChangeCard.bind(this);
    this.handleSavedOrder = this.handleSavedOrder.bind(this);
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const initialMessage = queryParams.get('initialMessage');
    const paymentId = queryParams.get('paymentId');
    const status = queryParams.get('status');

    if(status == 'success') {
    this.handleSubmit({initialMessage: initialMessage == 'undefined' ? '' : initialMessage}, paymentId);
    }
  }

  handleSavedOrder(values, card) {
    const { listing, speculatedTransaction } = this.props;
    const stripeCustomer = getStripeCustomer(this.props.currentUser);
    // const savedCard = getPaymentMethod(this.props.currentUser);
    const totalPrice = speculatedTransaction?.attributes?.payinTotal?.amount;
    const currentPath = window.location.pathname;
  
    stripeCheckout({
      price: totalPrice,
      stripeCustomer: stripeCustomer.id,
      vehicleName: listing.attributes.title,
      image: listing.images[0].attributes.variants.facebook.url,
      values,
      returnUrl: currentPath
    })
    .then(async (data) => {
      // const paymentId = data.paymentId;
      window.location.href = data.url;
    })
    .catch((error) => {
      console.error("Error al abrir la ventana de checkout:", error);
    });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.iframeUrl = ""; // Limpiar la URL al cerrar el modal
  };

  setChangeCard(cardValue) {
    this.setState({ showChangeCard: cardValue });
  }

  componentWillMount() {
    if (window) {
      this.loadInitialData();
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.currentUser, this.props.currentUser)) {
      const stripeCustomer = getStripeCustomer(this.props.currentUser);
      const customerId = stripeCustomer && stripeCustomer.id;
      this.fetchPaymentMethod({ customerId });
    }
  }

  async fetchPaymentMethod(customerId) {
    const hasPaymentMethod = customerId && (await this.props.onFetchPaymentMethod(customerId));
    this.setState({ hasPaymentMethod });
  }

  handlePaymentMethod(card, cardToken) {
    this.setState({ card, cardToken });
  }

  /**
   * Load initial data for the page
   *
   * Since the data for the checkout is not passed in the URL (there
   * might be lots of options in the future), we must pass in the data
   * some other way. Currently the ListingPage sets the initial data
   * for the CheckoutPage's Redux store.
   *
   * For some cases (e.g. a refresh in the CheckoutPage), the Redux
   * store is empty. To handle that case, we store the received data
   * to window.sessionStorage and read it from there if no props from
   * the store exist.
   *
   * This function also sets of fetching the speculative transaction
   * based on this initial data.
   */
  loadInitialData() {
    const {
      bookingData,
      bookingDates,
      listing,
      enquiredTransaction,
      fetchSpeculatedTransaction,
      history,
    } = this.props;
    // Browser's back navigation should not rewrite data in session store.
    // Action is 'POP' on both history.back() and page refresh cases.
    // Action is 'PUSH' when user has directed through a link
    // Action is 'REPLACE' when user has directed through login/signup process
    const hasNavigatedThroughLink = history.action === 'PUSH' || history.action === 'REPLACE';

    const hasDataInProps = !!(bookingData && bookingDates && listing) && hasNavigatedThroughLink;
    if (hasDataInProps) {
      // Store data only if data is passed through props and user has navigated through a link.
      storeData(bookingData, bookingDates, listing, enquiredTransaction, STORAGE_KEY);
    }

    // NOTE: stored data can be empty if user has already successfully completed transaction.
    const pageData = hasDataInProps
      ? { bookingData, bookingDates, listing, enquiredTransaction }
      : storedData(STORAGE_KEY);
    const hasData =
      pageData &&
      pageData.listing &&
      pageData.listing.id &&
      pageData.bookingData &&
      pageData.bookingDates &&
      pageData.bookingDates.bookingStart &&
      pageData.bookingDates.bookingEnd;
    const tx = pageData ? pageData.transaction : null;
    if (hasData) {
      const listingId = pageData.listing.id;
      const { bookingStart, bookingEnd } = pageData.bookingDates;

      const transactionId = tx ? tx.id : null;
      const bookingStartForAPI = dateFromLocalToAPI(bookingStart);
      const bookingEndForAPI = dateFromLocalToAPI(bookingEnd);
      const promotion = pageData.bookingData?.promotion;
      const voucherCode = pageData.bookingData?.voucherCode;
      const refferralCode = pageData.bookingData?.refferralCode;
      const voucher = pageData.bookingData?.voucher;
      // Fetch speculated transaction for showing price in booking breakdown
      // NOTE: if unit type is line-item/units, quantity needs to be added.
      // The way to pass it to checkout page is through pageData.bookingData
      fetchSpeculatedTransaction(
        {
          listingId,
          bookingStart: bookingStartForAPI,
          bookingEnd: bookingEndForAPI,
          promotion,
          voucherCode,
          refferralCode,
          voucher,
          authorId: pageData.listing.author.id.uuid,
          ...bookingData,
        },
        transactionId
      );
    }

    this.setState({ pageData: pageData || {}, dataLoaded: true });
  }

  handleSubmit(values, paymentId) {
    if (this.state.submitting) {
      return;
    }

    this.setState({ submitting: true });

    const initialMessage = values.initialMessage;
    const {
      history,
      speculatedTransaction,
      dispatch,
      onInitiateOrder,
      onSendMessage,
      // onCreateCustomer,
      currentUser,
      onCreatePaymentIntent,
      // onCreateInvoice,
      // onInvoiceStatusPosted,
      // onCreateInvoiceLineItems,
      // onInvoiceFinalStep,
      onRedeemVoucher,
    } = this.props;

    const savedCard = getPaymentMethod(currentUser);
    const stripeCustomer = getStripeCustomer(currentUser);
    // const cardToken = card || card?.token;
    const currentListing = ensureListing(this.state.pageData.listing);

    const { voucher, ...restBookingData } = this.state.pageData.bookingData;

    const instantBooking = currentListing.attributes.publicData.instantBooking;
    // Create order aka transaction
    // NOTE: if unit type is line-item/units, quantity needs to be added.
    // The way to pass it to checkout page is through pageData.bookingData
    const requestParams = {
      listingId: this.state.pageData.listing.id,
      bookingStart: this.state.pageData.bookingDates.bookingStart, // speculatedTransaction.booking.attributes.start,
      bookingEnd: this.state.pageData.bookingDates.bookingEnd, //speculatedTransaction.booking.attributes.end,
      pickUpTime: restBookingData,
      dropTime: this.state.pageData.dropTime,
      quantity: this.state.pageData.bookingData.quantity,
      promotion: this.state.pageData.bookingData.promotion,
      voucherCode: this.state.pageData.bookingData.voucherCode,
      refferralCode: this.state.pageData.bookingData.refferralCode,
      arivalTime: this.state.arivalTime,
      departureTime: this.state.departureTime,
      flightNumber: this.state.flightNumber,
      voucher: this.state.pageData.bookingData?.voucher,
      authorId: this.state.pageData.listing.author.id.uuid,
    };

    const enquiredTransaction = this.state.pageData.enquiredTransaction;
    const transactionIdMaybe = enquiredTransaction ? enquiredTransaction.id : null;
    const totalPrice = speculatedTransaction?.attributes?.payinTotal?.amount;
    // requestParams.token = cardToken;
    requestParams.instantBooking = instantBooking;
    // const lineItems =
    //   speculatedTransaction &&
    //   speculatedTransaction.attributes &&
    //   speculatedTransaction.attributes.lineItems;
    // const title = currentListing?.attributes?.title;
    // const odooUserid = getOdooUserID(currentUser);

    // const invoiceFormat = {
    //   partner_id: odooUserid,
    //   payment_reference: 'INV-RENTALO',
    //   invoice_date: moment().format('YYYY-MM-DD'),
    //   invoice_payment_term_id: 1,
    //   journal_id: 1,
    //   currency_id: 2,
    // };
    // const finalInvoiceStep = {
    //   journal_id: 7,
    //   partner_bank_id: 1,
    //   amount: totalPrice,
    //   currency_id: 2,
    // };

    // const extractDays = () => {
    //   for (let i = 0; i < lineItems.length; i++) {
    //     if (lineItems[i].code === 'line-item/day') {
    //       return lineItems[i].quantity.d[0];
    //     } else {
    //       continue;
    //     }
    //   }
    // };

    // const invoicePrice =
    //   lineItems &&
    //   lineItems
    //     .filter(item => item.code !== 'line-item/provider-commission')
    //     .map((item, i) => {
    //       const name = i === 0 ? title : item.code.split('/')[1];
    //       const account_id = 21;
    //       const quantity = i === 0 ? extractDays() : i === 1 ? extractDays() : 1;
    //       const price_unit =
    //         i === 0
    //           ? item?.unitPrice?.amount / 100
    //           : i === 1
    //           ? item?.unitPrice?.amount / 100 / lineItems[0]?.quantity.d[0]
    //           : item?.unitPrice?.amount / 100;
    //       const product_id = i + 1;
    //       return { name, account_id, quantity, price_unit, product_id };
    //     });

    // const providerCommissionLineItem =
    //   lineItems && lineItems.find(item => item.code == LINE_ITEM_PROVIDER_COMMISSION);
    // const providerCommission =
    //   providerCommissionLineItem &&
    //   providerCommissionLineItem.lineTotal &&
    //   providerCommissionLineItem.lineTotal.amount &&
    //   Math.abs(providerCommissionLineItem.lineTotal.amount);

    const params = {
      stripeCustomer: stripeCustomer?.id,
      paymentMethod: savedCard?.id,
      instantBooking: instantBooking === 'yes',
      totalPrice,
    };
    let order = null;

    onCreatePaymentIntent(paymentId)
      .then(res => {
        if (!res) {
          return null;
        }
        return onInitiateOrder(requestParams, transactionIdMaybe).then(params => {
          order = params;
          // onCreateInvoice(invoiceFormat)
          // .then(res => {
          //   const invoices = invoicePrice.map(item => {
          //     if (res) {
          //       onCreateInvoiceLineItems({ ...item, move_id: res });
          //     }
          //   });
          //   if (invoices) {
          //     onInvoiceStatusPosted(res).then(response => {
          //       if (response) {
          //         Object.assign(finalInvoiceStep, { context: { active_ids: [res] } });
          //         onInvoiceFinalStep(finalInvoiceStep);
          //       }
          //     });
          //   }
          // });

          const paramsResp = params;
          const currentUser = this.props.currentUser;
          const referralObj = currentUser.attributes.profile.privateData.referral;
          const referralNotUsed = referralObj?.used === false;
          // const body = {
          //   transaction: params,
          //   token: cardToken,
          //   stripeCustomer: stripeCustomer?.id,
          // };
          if (referralObj && referralNotUsed) {
            const body = {
              newUserId: currentUser.id.uuid,
              // type: isReferralSenderUser ? 'oldUser' : 'newUser',
              type: 'newUser',
              referralObj: referralObj,
              currentUser: currentUser,
            };

            return post('/api/update-referral', body)
              .then(resp => {
                return paramsResp;
              })
              .catch(e => console.log(e));
          } else {
            return paramsResp;
          }
        });
      })
      .then(params => {
        activatePolicy({
          listingId: currentListing?.id?.uuid,
          customerId: currentUser?.id?.uuid,
          startBooking: formatDate(requestParams.bookingStart),
          endBooking: formatDate(requestParams.bookingEnd),
          providerId: currentListing.author.id.uuid,
          transactionId: paymentId,
        });
        return params;
      })
      .then(params => {
        onSendMessage({ ...params, message: initialMessage })
          .then(values => {
            const { orderId, messageSuccess } = values;
            this.setState({ submitting: false });
            const routes = routeConfiguration();
            const OrderPage = findRouteByRouteName('OrderDetailsPage', routes);

            // Transaction is already created, but if the initial message
            // sending failed, we tell it to the OrderDetailsPage.
            dispatch(
              OrderPage.setInitialValues({
                initialMessageFailedToTransaction: messageSuccess ? null : orderId,
              })
            );
            const orderDetailsPath = pathByRouteName('OrderDetailsPage', routes, {
              id: orderId.uuid,
            });
            clearData(STORAGE_KEY);
            history.push(orderDetailsPath);
          })
          .catch(() => {
            this.setState({ submitting: false });
          });
      })
      .then(() => {
        if (this.state.pageData.bookingData?.voucherCode) {
          onRedeemVoucher({
            code: this.state.pageData.bookingData?.voucherCode,
            customerId: currentUser.id.uuid,
          });
        }
      })
      .then(() => {
        if (params.instantBooking) {
          handleSendOdooPaymentDetails(currentUser, requestParams, order);
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const {
      scrollingDisabled,
      speculateTransactionInProgress,
      speculateTransactionError,
      speculatedTransaction,
      initiateOrderError,
      intl,
      params,
      currentUser,
      onCreateCustomer,
    } = this.props;

    // const { hasPaymentMethod } = this.state;
    // Since the listing data is already given from the ListingPage
    // and stored to handle refreshes, it might not have the possible
    // deleted or closed information in it. If the transaction
    // initiate or the speculative initiate fail due to the listing
    // being deleted or closec, we should dig the information from the
    // errors and not the listing data.
    const listingNotFound =
      isTransactionInitiateListingNotFoundError(speculateTransactionError) ||
      isTransactionInitiateListingNotFoundError(initiateOrderError);

    const isLoading = !this.state.dataLoaded || speculateTransactionInProgress;

    const { listing, bookingDates, enquiredTransaction } = this.state.pageData;
    const currentTransaction = ensureTransaction(speculatedTransaction, {}, null);
    // const currentBooking = ensureBooking(currentTransaction.booking);
    const currentListing = ensureListing(listing);
    const currentAuthor = ensureUser(currentListing.author);

    // const unitType = config.bookingUnitType;
    // const isNightly = unitType === LINE_ITEM_NIGHT;
    // const isDaily = unitType === LINE_ITEM_DAY;

    // const nightsBetween = (startDate, endDate) => {
    //   const nights = moment(endDate).diff(startDate, 'days');
    //   if (nights < 0) {
    //     throw new Error('End date cannot be before start date');
    //   }
    //   return nights;
    // };

    // const localStartDate = dateFromAPIToLocalNoon(this.state.pageData.bookingDates?.bookingStart);
    // const localEndDateRaw = dateFromAPIToLocalNoon(this.state.pageData.bookingDates?.bookingEnd);

    // const endDay = isNightly ? localEndDateRaw : moment(localEndDateRaw).subtract(1, 'days');
    // const type = currentListing.attributes.publicData.type;
    // const quantity = nightsBetween(
    //   this.state?.pageData?.bookingDates?.bookingStart,
    //   this.state?.pageData?.bookingDates?.bookingEnd
    // );
    // const listingPrice = currentListing?.attributes?.price?.amount / 100;

    const isOwnListing =
      currentUser &&
      currentUser.id &&
      currentAuthor &&
      currentAuthor.id &&
      currentAuthor.id.uuid === currentUser.id.uuid;

    const hasListingAndAuthor = !!(currentListing.id && currentAuthor.id);
    const hasBookingDates = !!(
      bookingDates &&
      bookingDates.bookingStart &&
      bookingDates.bookingEnd
    );
    const hasRequiredData = hasListingAndAuthor && hasBookingDates;
    const canShowPage = hasRequiredData && !isOwnListing;
    const shouldRedirect = !isLoading && !canShowPage;

    // Redirect back to ListingPage if data is missing.
    // Redirection must happen before any data format error is thrown (e.g. wrong currency)
    if (shouldRedirect) {
      // eslint-disable-next-line no-console
      console.error('Missing or invalid data for checkout, redirecting back to listing page.', {
        transaction: currentTransaction,
        bookingDates,
        listing,
      });
      return <NamedRedirect name="ListingPage" params={params} />;
    }

    const listingTitle = currentListing.attributes.title;
    const title = intl.formatMessage({ id: 'CheckoutPage.title' }, { listingTitle });

    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const listingNotFoundErrorMessage = listingNotFound ? (
      <p className={css.notFoundError}>
        <FormattedMessage id="CheckoutPage.listingNotFoundError" />
      </p>
    ) : null;
    const listingLink = (
      <NamedLink
        name="ListingPage"
        params={{
          id: currentListing.id.uuid,
          slug: createSlug(listingTitle),
        }}
      >
        <FormattedMessage id="CheckoutPage.errorlistingLinkText" />
      </NamedLink>
    );

    const checkBoxLabel = intl.formatMessage({
      id: 'CheckoutPage.chekBox',
    });

    const isAmountTooLowError = isTransactionInitiateAmountTooLowError(initiateOrderError);
    const isChargeDisabledError = isTransactionChargeDisabledError(initiateOrderError);
    const isBookingTimeNotAvailableError = isTransactionInitiateBookingTimeNotAvailableError(
      initiateOrderError
    );

    let initiateOrderErrorMessage = null;

    if (!listingNotFound && isAmountTooLowError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderAmountTooLow" />
        </p>
      );
    } else if (!listingNotFound && isBookingTimeNotAvailableError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.bookingTimeNotAvailableMessage" />
        </p>
      );
    } else if (!listingNotFound && isChargeDisabledError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.chargeDisabledMessage" />
        </p>
      );
    } else if (!listingNotFound && initiateOrderError) {
      initiateOrderErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderError" values={{ listingLink }} />
        </p>
      );
    }

    const speculateTransactionErrorMessage = speculateTransactionError ? (
      <p className={css.speculateError}>
        <FormattedMessage id="CheckoutPage.speculateTransactionError" />
      </p>
    ) : null;
    let speculateErrorMessage = null;

    if (isTransactionInitiateBookingTimeNotAvailableError(speculateTransactionError)) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.bookingTimeNotAvailableMessage" />
        </p>
      );
    } else if (isTransactionZeroPaymentError(speculateTransactionError)) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.initiateOrderAmountTooLow" />
        </p>
      );
    } else if (speculateTransactionError) {
      speculateErrorMessage = (
        <p className={css.orderError}>
          <FormattedMessage id="CheckoutPage.speculateFailedMessage" />
        </p>
      );
    }

    const topbar = (
      <div className={css.topbar}>
        <NamedLink className={css.home} name="HomePage">
          <Logo
            className={css.logoMobile}
            title={intl.formatMessage({
              id: 'CheckoutPage.goToLandingPage',
            })}
            format="mobile"
          />
          <Logo
            className={css.logoDesktop}
            alt={intl.formatMessage({
              id: 'CheckoutPage.goToLandingPage',
            })}
            format="desktop"
          />
        </NamedLink>
      </div>
    );

    const showInitialMessageInput = !enquiredTransaction;

    const pageProps = { title, scrollingDisabled };

    if (isLoading) {
      return (
        <Page {...pageProps}>
          {topbar}
          <div className={css.contentContainer}>
            <div className={css.leftSection}>
              <div className={css.loading}>
                <FormattedMessage id="CheckoutPage.loadingData" />
              </div>
            </div>
            <div className={css.rightSection}></div>
          </div>
        </Page>
      );
    }
    const authorDisplayName = currentAuthor.attributes.profile.displayName;
    const messagePlaceholder = intl.formatMessage(
      { id: 'StripePaymentForm.messagePlaceholder' },
      { name: authorDisplayName }
    );

    const messageOptionalText = intl.formatMessage({
      id: 'StripePaymentForm.messageOptionalText',
    });

    const initialMessageLabel = intl.formatMessage(
      { id: 'StripePaymentForm.messageLabel' },
      { messageOptionalText: messageOptionalText }
    );

    const savedCard = getPaymentMethod(currentUser);

    const bookingForm = (
      <FinalForm
        onSubmit={() => { }}
        render={fieldRenderProps => {
          const { handleSubmit, values } = fieldRenderProps;
          return (
            <Form onSubmit={handleSubmit}>
              {showInitialMessageInput ? (
                <div className={css.checkoutForm}>
                  <h3 className={css.messageHeading}>
                    <FormattedMessage id="StripePaymentForm.messageHeading" />
                  </h3>
                  <FieldTextInput
                    type="textarea"
                    id={`bookingForm-message`}
                    name="initialMessage"
                    label={initialMessageLabel}
                    placeholder={messagePlaceholder}
                    className={css.message}
                  />
                  <div className={css.flightInfo}>
                    <h1>Información del vuelo (opcional)</h1>

                    <div className={css.rowFld}>
                      <label>Número de vuelo</label>
                      <input
                        type="text"
                        name="flightNumber"
                        placeholder="Número de vuelo"
                        onChange={e => this.setState({ flightNumber: e.target.value })}
                      />
                    </div>
                    <div className={css.rowFld}>
                      <label>Hora de llegada</label>
                      <input
                        type="datetime-local"
                        name="arivalTime"
                        placeholder="Hora de llegada"
                        onChange={e => this.setState({ arivalTime: e.target.value })}
                      />
                    </div>
                    <div className={css.rowFld}>
                      <label>Hora de salida</label>
                      <input
                        type="datetime-local"
                        name="departureTime"
                        placeholder="Hora de salida"
                        onChange={e => this.setState({ departureTime: e.target.value })}
                      />
                    </div>

                    {savedCard && savedCard.id && !this.state.showChangeCard ? (
                      <div className={css.rowFld}>
                        {/* <label>Número de tarjeta</label>
                        <CustomSavedCardDetails
                          className={css.paymentMethodSelector}
                          card={savedCard && savedCard.card}
                          onChange={() => this.setChangeCard(!this.state.showChangeCard)}
                          isCheckoutPage
                        /> */}

                        <Button
                          inProgress={this.state.submitting}
                          type="submit"
                          onClick={() => {
                            this.handleSavedOrder(values, savedCard.card);
                          }}
                          className={css.submitBtn}
                        >
                          Continuar a Pagar
                        </Button>
                      </div>
                    ) : (
                      <>
                        {savedCard && savedCard.id ? (
                          <div
                            className={css.useSavedCard}
                            onClick={() => this.setChangeCard(!this.state.showChangeCard)}
                          >
                            <span>Use saved card</span> <img src={cardIcon} alt="Saved Card Icon" />
                          </div>
                        ) : null}
                        {/* <CardSection
                          onCreateCustomer={onCreateCustomer}
                          checkBoxLabel={checkBoxLabel}
                          handlePaymentMethod={this.handlePaymentMethod}
                          handleOrderSubmit={card => this.handleSubmit(values, card)}
                          inProgress={this.state.submitting}
                        /> */}
                      </>
                    )}
                  </div>
                </div>
              ) : null}
            </Form>
          );
        }}
      />
    );

    const marketValue = listing?.attributes.publicData.marketValue;

    let insuranceAmount = 0;

    if (marketValue) {
      const referenceValue = parseInt(marketValue) * 0.6;

      if (referenceValue < 100000) {
        insuranceAmount = 14500;
      }

      if (referenceValue >= 100000 && referenceValue <= 200000) {
        insuranceAmount = 17500;
      }

      if (referenceValue >= 200000 && referenceValue <= 300000) {
        insuranceAmount = 19500;
      }

      if (referenceValue >= 300000 && referenceValue <= 400000) {
        insuranceAmount = 23500;
      }

      if (referenceValue >= 400000 && referenceValue <= 500000) {
        insuranceAmount = 27500;
      }

      if (referenceValue >= 500000 && referenceValue <= 1000000) {
        insuranceAmount = 32500;
      }

      if (referenceValue > 1000000) {
        insuranceAmount = 32500;
      }
    }

    // Show breakdown only when speculated transaction and booking are loaded
    // (i.e. have an id)
    const { transaction } = this.state.pageData;
    const { bookingData } = this.state.pageData;
    const existingTransaction = ensureTransaction(transaction);
    const tx = existingTransaction.booking ? existingTransaction : speculatedTransaction;
    const txBooking = tx && tx.id && ensureBooking(tx?.booking);
    const breakdown =
      tx?.id && txBooking?.id ? (
        <BookingBreakdown
          className={css.bookingBreakdown}
          userRole="customer"
          unitType={config.bookingUnitType}
          transaction={tx}
          booking={txBooking}
          dateType={DATE_TYPE_DATE}
          bookingData={bookingData}
        />
      ) : null;

    return (
      <Page {...pageProps}>
        {topbar}
        <div className={css.contentContainer}>
          <div className={css.leftSection}>
            <div className={css.aspectWrapper}>
              <ResponsiveImage
                rootClassName={css.rootForImage}
                alt={listingTitle}
                image={firstImage}
                variants={['landscape-crop', 'landscape-crop2x']}
              />
            </div>
            <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
              <AvatarMedium user={currentAuthor} disableProfileLink />
            </div>
            <div className={css.bookListingContainer}>
              <div className={css.heading}>
                <h1 className={css.title}>{title}</h1>
                <div className={css.author}>
                  <FormattedMessage
                    id="CheckoutPage.hostedBy"
                    values={{ name: authorDisplayName }}
                  />
                </div>
              </div>

              <section className={css.paymentContainer}>
                {initiateOrderErrorMessage}
                {listingNotFoundErrorMessage}
                {speculateErrorMessage}
                {bookingForm}
              </section>
            </div>
          </div>
          <div className={css.rightSection}>
            <div className={css.detailsContainerDesktop}>
              <div className={css.detailsAspectWrapper}>
                <ResponsiveImage
                  rootClassName={css.rootForImage}
                  alt={listingTitle}
                  image={firstImage}
                  variants={['landscape-crop', 'landscape-crop2x']}
                />
              </div>
              <div className={css.avatarWrapper}>
                <AvatarMedium user={currentAuthor} disableProfileLink />
              </div>
              <div className={css.detailsHeadings}>
                <h2 className={css.detailsTitle}>{listingTitle}</h2>
              </div>
              {/* <div className={css.breakdownWrapper}> */}
              {breakdown}
              {/* </div> */}
            </div>
          </div>
        </div>
        {speculateTransactionErrorMessage}
      </Page>
    );
  }
}

CheckoutPageComponent.defaultProps = {
  initiateOrderError: null,
  listing: null,
  bookingData: {},
  bookingDates: null,
  speculateTransactionError: null,
  speculatedTransaction: null,
  enquiredTransaction: null,
  currentUser: null,
};

CheckoutPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  listing: propTypes.listing,
  bookingData: object,
  bookingDates: shape({
    bookingStart: instanceOf(Date).isRequired,
    bookingEnd: instanceOf(Date).isRequired,
  }),
  fetchSpeculatedTransaction: func.isRequired,
  speculateTransactionInProgress: bool.isRequired,
  speculateTransactionError: propTypes.error,
  speculatedTransaction: propTypes.transaction,
  enquiredTransaction: propTypes.transaction,
  initiateOrderError: propTypes.error,
  currentUser: propTypes.currentUser,
  params: shape({
    id: string,
    slug: string,
  }).isRequired,
  sendOrderRequest: func.isRequired,
  onCreateStripePaymentToken: func.isRequired,

  // from connect
  dispatch: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const {
    listing,
    bookingData,
    bookingDates,
    speculateTransactionInProgress,
    speculateTransactionError,
    speculatedTransaction,
    enquiredTransaction,
    initiateOrderError,
    voucher,
  } = state.CheckoutPage;
  const { currentUser } = state.user;

  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    bookingData,
    bookingDates,
    speculateTransactionInProgress,
    speculateTransactionError,
    speculatedTransaction,
    enquiredTransaction,
    listing,
    initiateOrderError,
    voucher,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  onInitiateOrder: (params, transactionId) => dispatch(initiateOrder(params, transactionId)),
  onSendMessage: params => dispatch(sendMessage(params)),
  fetchSpeculatedTransaction: params => dispatch(speculateTransaction(params)),
  onCreateCustomer: params => dispatch(createCustomer(params)),
  onFetchPaymentMethod: customerId => dispatch(fetchPaymentMethod(customerId)),
  onCreatePaymentIntent: params => dispatch(createIntent(params)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onCreateInvoice: params => dispatch(createInvoice(params)),
  onCreateInvoiceLineItems: params => dispatch(createInvoiceLineItems(params)),
  onInvoiceStatusPosted: params => dispatch(invoiceStatusPosted(params)),
  onInvoiceFinalStep: params => dispatch(invoiceFinalStep(params)),
  onRedeemVoucher: params => dispatch(redeemVoucher(params)),
});

const CheckoutPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(CheckoutPageComponent);

CheckoutPage.setInitialValues = initialValues => setInitialValues(initialValues);

CheckoutPage.displayName = 'CheckoutPage';

export default CheckoutPage;
