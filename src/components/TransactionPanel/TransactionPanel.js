import React, { Component } from 'react';
import Decimal from 'decimal.js';
import { array, arrayOf, bool, func, number, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import './Lightbox.css';

import {
  TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
  txIsAccepted,
  txIsCanceled,
  txIsDeclined,
  txIsEnquired,
  txIsPaymentExpired,
  txIsPaymentPending,
  txIsRequested,
  txHasBeenDelivered,
  txIsWaitingForCustomerSignature,
  txIsWaitingForProviderSignature,
  txIsSignedByProvider,
  txIsWaitingForCustomerReVerification,
  TRANSITION_REQUEST_PAYMENT,
  txIsCustomerPhotoUploaded,
  TRANSITION_CUSTOMER_FULL_REFUND,
  TRANSITION_CUSTOMER_HALF_REFUND,
  TRANSITION_CUSTOMER_NO_REFUND,
  TRANSITION_DECLINE,
  TRANSITION_CANCEL_BY_PROVIDER,
  txIsExtendTrip,
  txIsDeclineExtendTrip,
  txIsAcceptExtendTrip,
  TRANSITION_EXTEND_TRIP_CUSTOMER,
  TRANSITION_DECLINE_EXTEND_TRIP,
  TRANSITION_CUSTOMER_CHARGE_AFTER_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_CHARGE_AFTER_CUSTOMER_SIGN,
  TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_CUSTOMER_CHARGE_AFTER_UPLOAD_PHOTO,
  TRANSITION_CUSTOMER_CHARGE,
  TRANSITION_CUSTOMER_CHARGE_AFTER_REVERIFY,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO,
  TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_CANCEL_BY_PROVIDER_AFTER_CUSTOMER_SIGN,
  TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_ACCEPT_EXTEND_TRIP,
  TRANSITION_SIGNED_BY_PROVIDER,
  TRANSITION_COMPLETE,
  TRANSITION_EXPIRE_REVIEW_PERIOD,
  TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD,
  TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD,
  TRANSITION_REVIEW_1_BY_PROVIDER,
  TRANSITION_REVIEW_2_BY_PROVIDER,
  TRANSITION_REVIEW_1_BY_CUSTOMER,
  TRANSITION_REVIEW_2_BY_CUSTOMER,
  TRANSITION_RE_VERIFY,
  TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN,
  TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN,
  TRANSITION_SIGNED_BY_CUSTOMER,
  TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE,
  TRANSITION_ACCEPT,
  TRANSITION_REQUEST_PAYMENT_INSTANT,
  TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE,
  TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE_BY_OPREATOR,
  TRANSITION_PROVIDER_COMPLETE,
  TRANSITION_ADMIN_COMPLETE,
  TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY, // TODO:
  TRANSITION_PROVIDER_DISPUTE,
} from '../../util/transaction';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import { daysBetween, convertTo12HourFormat, combineDates } from '../../util/dates';

import {
  ensureListing,
  ensureTransaction,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { isMobileSafari } from '../../util/userAgent';
import {
  formatMoney,
  unitDivisor,
  convertMoneyToNumber,
  convertUnitToSubUnit,
} from '../../util/currency';
import {
  AvatarLarge,
  BookingPanel,
  NamedLink,
  ReviewModal,
  UserDisplayName,
  SecondaryButton,
  PrimaryButton,
  Modal,
  IconSpinner,
} from '../../components';
import { SendMessageForm } from '../../forms';
import config from '../../config';
// These are internal components that make this file more readable.
import AddressLinkMaybe from './AddressLinkMaybe';
import BreakdownMaybe from './BreakdownMaybe';
import DetailCardHeadingsMaybe from './DetailCardHeadingsMaybe';
import DetailCardImage from './DetailCardImage';
import FeedSection from './FeedSection';
import SaleActionButtonsMaybe from './SaleActionButtonsMaybe';
import PanelHeading, {
  HEADING_ENQUIRED,
  HEADING_PAYMENT_PENDING,
  HEADING_PAYMENT_EXPIRED,
  HEADING_REQUESTED,
  HEADING_ACCEPTED,
  HEADING_DECLINED,
  HEADING_CANCELED,
  HEADING_DELIVERED,
  STATE_CUSTOMER_PHOTO_UPLOAD,
  HEADING_WAITING_FOR_CUSTOMER_SIGNATURE,
  HEADING_WAITING_FOR_PROVIDER_SIGNATURE,
  HEADING_SIGNED_BY_PROVIDER,
  STATE_REVERIFICATION_BY_CUSTOMER,
  HEADING_EXTEND_TRIP_CUSTOMER,
  HEADING_ACCEPT_EXTEND_TRIP,
  HEADING_DECLINE_EXTEND_TRIP,
} from './PanelHeading';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DisputeModalContent from './DisputeModalContent';
import {
  CreateTxCheckApi,
  getcompleCubeTokenApi,
  cancelPolicy,
  updatePolicy,
  updateDocuTransitionApi,
  downloadAgreementApi,
  createCharge,
  transactionLineItems,
} from '../../util/api';
import { MultipleImagesUploader } from './MultipleImagesUploader';
import Lightbox from 'react-image-lightbox';
import css from './TransactionPanel.module.css';
import {
  getDriverComplyCubeId,
  getDriverDocumentNumber,
  getDriverFullName,
  getFlightDetails,
  getHostFullName,
  getLicenseplate,
  getPaymentMethod,
  perInsuranceValue,
} from '../../util/dataExtractors';
import ExtendTripModal from '../ExtendTripModal/ExtendTripModal';
import RentalPopup from './InsuranceModal';
import { types as sdkTypes } from '../../util/sdkLoader';

const { Money } = sdkTypes;

const GRACE_PERIOD = process.env.REACT_APP_BOOKING_GRACE_PERIOD ?? 0;

// import moment from 'moment';
// import { sendRequest } from '../../util/appleScriptHelper';
const sharetribeSdk = require('sharetribe-flex-sdk');
const sdk = sharetribeSdk.createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const estimatedTotalPrice = lineItems => {
  const numericTotalPrice = lineItems.reduce((sum, lineItem) => {
    const numericPrice = convertMoneyToNumber(lineItem.lineTotal);
    return new Decimal(numericPrice).add(sum);
  }, 0);

  const currency =
    lineItems[0] && lineItems[0].unitPrice ? lineItems[0].unitPrice.currency : config.currency;

  return new Money(
    convertUnitToSubUnit(numericTotalPrice.toNumber(), unitDivisor(currency)),
    currency
  );
};

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

const createOdooInvoiceData = (tx, currentUser) => {
  const lineItems = tx.attributes.lineItems;
  const odooUserId = currentUser.attributes.profile.privateData?.odoo_user_id ?? null;
  const bookingStartDate = tx.booking.attributes.displayStart;
  const bookingEndDate = tx.booking.attributes.displayEnd;
  const rentalDys = daysBetween(bookingStartDate, bookingEndDate);

  return {
    partner_id: odooUserId,
    is_rental_order: true,
    rental_status: 'draft',
    date_order: formatDateToOdoo(bookingStartDate),
    validity_date: formatDateToOdoo(bookingEndDate),
    x_owner: currentUser.attributes.profile.displayName,
    order_line: getOdooOrderlines(lineItems, rentalDys),
  };
};

const formatDateToOdoo = value => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Helper function to get display names for different roles
const displayNames = (currentUser, currentProvider, currentCustomer, intl) => {
  const authorDisplayName = <UserDisplayName user={currentProvider} intl={intl} />;
  const customerDisplayName = <UserDisplayName user={currentCustomer} intl={intl} />;

  let otherUserDisplayName = '';
  let otherUserDisplayNameString = '';
  const currentUserIsCustomer =
    currentUser.id && currentCustomer.id && currentUser.id.uuid === currentCustomer.id.uuid;
  const currentUserIsProvider =
    currentUser.id && currentProvider.id && currentUser.id.uuid === currentProvider.id.uuid;

  if (currentUserIsCustomer) {
    otherUserDisplayName = authorDisplayName;
    otherUserDisplayNameString = userDisplayNameAsString(currentProvider, '');
  } else if (currentUserIsProvider) {
    otherUserDisplayName = customerDisplayName;
    otherUserDisplayNameString = userDisplayNameAsString(currentCustomer, '');
  }

  return {
    authorDisplayName,
    customerDisplayName,
    otherUserDisplayName,
    otherUserDisplayNameString,
  };
};

// let timerId;
export class TransactionPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageFormFocused: false,
      isReviewModalOpen: false,
      reviewSubmitted: false,
      contractSent: false,
      loading: false,
      isLightboxOpen: false,
      photoIndex: 0,
      isExtendTripModalOpen: false,
      viewDoc: false,
      lightboxTarget: 'before',
      viewInProgress: false,
      viewInProgressProvider: false,
      openInsuranceModal: false,
      openModal: false,
      dropOffModel: false,
      recipient1Url: null,
      recipient2Url: null,
      requesting: false,
      openDoc: false,
      downloadInProgress: false,
      complycubeInProgress: false,
      policyModalOpen: false,
      disputeModal: false,
    };
    this.isMobSaf = false;
    this.sendMessageFormName = 'TransactionPanel.SendMessageForm';

    this.onOpenReviewModal = this.onOpenReviewModal.bind(this);
    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.onSendMessageFormFocus = this.onSendMessageFormFocus.bind(this);
    this.onSendMessageFormBlur = this.onSendMessageFormBlur.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.scrollToMessage = this.scrollToMessage.bind(this);
    this.handleUpdateDocuTransitions = this.handleUpdateDocuTransitions.bind(this);
    this.getVerificationData = this.getVerificationData.bind(this);
  }

  handleInsuranceModel = () => {
    this.setState({ openInsuranceModal: true });
  };

  handleUpdateDocuTransitions = async () => {
    const {
      transaction,
      transactionRole,
      onFetchTransactionIntervalTime,
      onFetchNextTransitions,
      contractSignSuccessState,
      onContractSignSuccess,
      history,
    } = this.props;
    const { lastTransition } = transaction.attributes;
    const isCustomer = transactionRole === 'customer';
    contractSignSuccessState !== 'start' && onContractSignSuccess('start');
    await updateDocuTransitionApi({ txId: transaction.id.uuid, lastTransition, isCustomer });
    await onFetchTransactionIntervalTime(transaction.id, transactionRole);
    onFetchNextTransitions(transaction.id);
    isCustomer
      ? history.push(`/order/${transaction?.id?.uuid}`)
      : history.push(`/sale/${transaction?.id?.uuid}`);
  };

  componentDidMount() {
    this.isMobSaf = isMobileSafari();
    this.loadComplyCube();
    if (typeof window !== 'undefined') {
      require('react-image-lightbox/style.css');
    }
    const { history, transaction } = this.props;
    const { lastTransition } = transaction && transaction.attributes;
    const searchString = history?.location?.search;
    if (
      searchString &&
      searchString.includes('myState=54255&event=signing_complete') &&
      (lastTransition === 'transition/waiting-for-customer-signature' ||
        lastTransition === 'transition/waiting-for-customer-signature-by-operator' ||
        lastTransition === 'transition/waiting-for-provider-signature')
      // TRANSITION_SIGNED_BY_CUSTOMER, TRANSITION_SIGNED_BY_PROVIDER
    ) {
      this.handleUpdateDocuTransitions();
    }
  }

  onOpenReviewModal() {
    this.setState({ isReviewModalOpen: true });
  }

  onSubmitReview(values) {
    const { onSendReview, transaction, transactionRole } = this.props;
    const currentTransaction = ensureTransaction(transaction);
    const { reviewRating, reviewContent } = values;
    const rating = Number.parseInt(reviewRating, 10);
    onSendReview(transactionRole, currentTransaction, rating, reviewContent)
      .then(r => this.setState({ isReviewModalOpen: false, reviewSubmitted: true }))
      .catch(e => {
        // Do nothing.
      });
  }

  onSendMessageFormFocus() {
    this.setState({ sendMessageFormFocused: true });
    if (this.isMobSaf) {
      // Scroll to bottom
      window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    }
  }

  onSendMessageFormBlur() {
    this.setState({ sendMessageFormFocused: false });
  }

  onMessageSubmit(values, form) {
    const message = values.message ? values.message.trim() : null;
    const { transaction, onSendMessage } = this.props;
    const ensuredTransaction = ensureTransaction(transaction);

    if (!message) {
      return;
    }
    onSendMessage(ensuredTransaction.id, message)
      .then(messageId => {
        form.reset();
        this.scrollToMessage(messageId);
      })
      .catch(e => {
        // Ignore, Redux handles the error
      });
  }

  scrollToMessage(messageId) {
    const selector = `#msg-${messageId.uuid}`;
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }

  loadComplyCube = async () => {
    if (!window.ComplyCube) {
      const script = document.createElement('script');
      script.src = 'https://assets.complycube.com/web-sdk/v1/complycube.min.js'; // Load ComplyCube SDK script
      script.async = true;
      script.onload = this.initializeComplyCube;
      document.head.appendChild(script);
    } else {
      // this.initializeComplyCube();
    }
  };

  getVerificationData = () => {
    const {
      transaction,
      onFetchTransactionIntervalTime,
      transactionRole,
      onFetchNextTransitions,
    } = this.props;
    const { driverReverified } = transaction?.attributes?.metadata || {};
    let isVerified = driverReverified && driverReverified.identity;
    let count = 0; // Initialize count variable
    this.setState({ complycubeInProgress: true });

    const intervalId = setInterval(() => {
      // Check if verification is complete
      if (isVerified === 'complete') {
        this.setState({ complycubeInProgress: false });
        clearInterval(intervalId); // Stop the interval once verification is complete
        console.log('Verification complete!');
      } else {
        // Fetch transaction interval time and next transitions
        onFetchTransactionIntervalTime(transaction.id, transactionRole);
        onFetchNextTransitions(transaction.id);
        console.log('Fetching data...');

        // Increment count
        count++;

        // Check if count reaches 25
        if (count >= 12) {
          clearInterval(intervalId); // Stop the interval if count reaches 25
          this.setState({ complycubeInProgress: false });

          console.log('Verification not completed after 25 attempts. Stopping...');
        }
      }
    }, 7000);
  };

  initializeComplyCube = async () => {
    const { currentUser, transaction } = this.props;
    const clientId = getDriverComplyCubeId(currentUser);
    const currentTransaction = ensureTransaction(transaction);

    const tokenRes = await getcompleCubeTokenApi({ clientId, txId: currentTransaction?.id?.uuid });
    if (tokenRes.token) {
      const complycube =
        typeof window !== 'undefined' &&
        window.ComplyCube.mount({
          token: tokenRes.token,
          containerId: 'complycube-mount',
          stages: [
            {
              name: 'documentCapture',
              options: {
                crossDeviceOnly: false,
                documentTypes: {
                  passport: false,
                  driving_license: true,
                  national_identity_card: false,
                },
              },
            },
            {
              name: 'faceCapture',
              options: {
                mode: 'photo',
              },
            },
            'completion',
          ],
          onComplete: async data => {
            await CreateTxCheckApi({
              clientId: tokenRes.clientId,
              documentId: data?.documentCapture?.documentId,
            });
          },
          onModalClose: function() {
            complycube.updateSettings({ isModalOpen: false });
            this.getVerificationData();
          }.bind(this),
          onError: function({ type, message }) {
            console.error('ComplyCube error:', type, message);
          },
        });

      // Add cleanup logic when the component unmounts
      this.cleanupComplyCube = () => {
        if (complycube.unmount) {
          complycube.unmount();
        }
      };
    }
  };

  componentDidUpdate() {
    const { openDoc } = this.state;
    const { contractUrl1, contractUrl2 } = this.props;
    if ((contractUrl1 || contractUrl2) && !openDoc) {
      this.setState({ openDoc: true });
      typeof window !== 'undefined' && window.open(contractUrl1 || contractUrl2, '_self');
    }
  }

  render() {
    const {
      rootClassName,
      className,
      currentUser,
      transaction,
      totalMessagePages,
      oldestMessagePageFetched,
      messages,
      initialMessageFailed,
      savePaymentMethodFailed,
      fetchMessagesInProgress,
      fetchMessagesError,
      sendMessageInProgress,
      sendMessageError,
      sendReviewInProgress,
      sendReviewError,
      onManageDisableScrolling,
      onShowMoreMessages,
      transactionRole,
      intl,
      onAcceptSale,
      onUploadPhoto,
      onDeclineSale,
      acceptInProgress,
      declineInProgress,
      onUploadAfterPhoto,
      acceptSaleError,
      declineSaleError,
      onSubmitBookingRequest,
      timeSlots,
      fetchTimeSlotsError,
      nextTransitions,
      onFetchTransactionLineItems,
      fetchLineItemsInProgress,
      fetchLineItemsError,
      onCancelSale,
      onExtendTrip,
      onAcceptOrRejectExtendTrip,
      onDeclineSaleBeforeAccept,
      rejectExtendedInProgress,
      acceptExtendedInProgress,
      onUpdatedProtectedData,
      onGetEnvolapId,
      onGetSecondSignerUrl,
      getEnvelopeIDProgress,
      getSecondUrlProgress,
      onFetchTransactionIntervalTime,
      onFetchNextTransitions,
      cancelInProgress,
      policy,
      onCompleteBooking,
      onProviderCompleteTx,
      onProviderDisputeTx,
      refundInProgress,
      disputeInProgress,
    } = this.props;

    const {
      isLightboxOpen,
      photoIndex,
      lightboxTarget,
      openInsuranceModal,
      isReviewModalOpen,
      reviewSubmitted,
      openModal,
      dropOffModel,
      isExtendTripModalOpen,
      policyModalOpen,
      disputeModal,
    } = this.state;
    const currentTransaction = ensureTransaction(transaction);
    const flightDetails = getFlightDetails(currentTransaction);
    const currentListing = ensureListing(currentTransaction.listing);
    const currentProvider = ensureUser(currentTransaction.provider);
    const currentCustomer = ensureUser(currentTransaction.customer);
    const documnetNumber = getDriverDocumentNumber(currentUser);
    const driverFullName = getDriverFullName(currentUser);
    const hostFullName = getHostFullName(currentUser);
    const savedCard = getPaymentMethod(currentUser);
    const cardData = getPaymentMethod(currentUser);
    const clientId = getDriverComplyCubeId(currentUser);
    const licenseplate = getLicenseplate(currentListing);
    const perDayInsuranceFee = perInsuranceValue(currentListing);
    const { lineItems = [] } = currentTransaction.attributes || {};
    const isCustomer = transactionRole === 'customer';
    const isProvider = transactionRole === 'provider';
    // const redirectUrl = isCustomer ? `${process.env.REACT_APP_CANONICAL_ROOT_URL}/inbox/orders` : `${process.env.REACT_APP_CANONICAL_ROOT_URL}/inbox/sales`
    const data = lineItems
      .filter(item => item.code !== 'line-item/provider-commission')
      .map(item => item.lineTotal?.amount);
    const totalExtendAmount = data.reduce((prve, next) => parseInt(prve) + parseInt(next), 0);
    const { flightNumber, departureTime, arivalTime } = flightDetails || {};
    const lastTransition = currentTransaction?.id && currentTransaction?.attributes?.lastTransition;
    const listingLoaded = !!currentListing.id;
    const listingDeleted = listingLoaded && currentListing.attributes.deleted;
    const iscustomerLoaded = !!currentCustomer.id;
    const isCustomerBanned = iscustomerLoaded && currentCustomer.attributes.banned;
    const isCustomerDeleted = iscustomerLoaded && currentCustomer.attributes.deleted;
    const isProviderLoaded = !!currentProvider.id;
    const isProviderBanned = isProviderLoaded && currentProvider.attributes.banned;
    const isProviderDeleted = isProviderLoaded && currentProvider.attributes.deleted;
    const showSendMessageForm =
      !isCustomerBanned && !isCustomerDeleted && !isProviderBanned && !isProviderDeleted;
    const authorId = currentProvider.id.uuid;
    const txPolicy = currentTransaction?.attributes?.metadata?.policy;
    const policyToShow = txPolicy ?? policy;

    const {
      authorDisplayName,
      customerDisplayName,
      otherUserDisplayName,
      otherUserDisplayNameString,
    } = displayNames(currentUser, currentProvider, currentCustomer, intl);

    const { publicData, geolocation, price } = currentListing.attributes;
    const { location, fuel, chassis } = publicData || {};

    const deletedListingTitle = intl.formatMessage({
      id: 'TransactionPanel.deletedListingTitle',
    });

    const listingTitle = currentListing.attributes.deleted
      ? deletedListingTitle
      : currentListing?.attributes?.title;
    const unitType = config.bookingUnitType;
    const isNightly = unitType === LINE_ITEM_NIGHT;
    const isDaily = unitType === LINE_ITEM_DAY;

    const unitTranslationKey = isNightly
      ? 'TransactionPanel.perNight'
      : isDaily
      ? 'TransactionPanel.perDay'
      : 'TransactionPanel.perUnit';

    const bookingSubTitle = price
      ? `${formatMoney(intl, price)} ${intl.formatMessage({ id: unitTranslationKey })}`
      : '';

    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const cardBrand = savedCard?.card?.brand;
    const cardNumber = cardBrand?.concat(' ***', savedCard?.card?.last4);
    const isApprovedToDrive = !!cardData;
    const isDropOff = currentTransaction?.attributes?.metadata?.dropOff;
    const txProtectedData = currentTransaction?.attributes?.protectedData?.extendedBookingData;
    let lastElement = txProtectedData && txProtectedData[txProtectedData.length - 1];
    const extBookingStart = lastElement && lastElement.bookingStart;
    const extBookingEnd = lastElement && lastElement.bookingEnd;
    const bookingStartDate = currentTransaction?.booking?.attributes?.start;
    const bookingEndDate = currentTransaction?.booking?.attributes?.end;
    const title = currentTransaction?.listing?.attributes?.title;
    const { pickUpTime = '', dropTime = '' } =
      currentTransaction?.attributes?.metadata?.bookingTime?.pickUpTime || {};

    // const pickTimeFormat = pickUpTime.concat(pickUpTime < 12 ? " AM" : " PM")
    // const dropTimeFormat = dropTime.concat(dropTime < 12 ? " AM" : " PM")
    const insuranceAmount =
      currentTransaction?.attributes?.lineItems
        .filter(item => item.code === 'line-item/tarifa-de-seguro')
        .map(item => item.lineTotal?.amount) / 100;
    const paymentMethod = lastElement && lastElement?.paymentMethod;
    const paymentIntent = lastElement && lastElement?.paymentIntent;
    const stripeCustomer = lastElement && lastElement?.stripeCustomer;

    const payInTotal = currentTransaction?.attributes?.payinTotal?.amount;
    const bookingData = { pickUpTime, dropTime };

    const txMetadata = currentTransaction?.attributes?.metadata;
    const envelopeId = txMetadata && txMetadata.envelopeId;
    const carPhotosBefore = txMetadata?.beforePhotos ?? [];
    const carPhotosAfter = txMetadata?.afterImages ?? [];
    const afterIm = txMetadata?.afterImages;
    const disputeComplete = txMetadata.disputeComplete;
    const lightboxPhotos = lightboxTarget === 'before' ? carPhotosBefore : carPhotosAfter;
    const centerButtons = carPhotosBefore.length > 0 && carPhotosAfter.length > 0;

    // const { isCustomerSigned, isProviderSigned } = (currentTransaction && currentTransaction.attributes && currentTransaction.attributes.protectedData) || {};

    const verficationInProgress =
      isCustomer &&
      this.state.complycubeInProgress &&
      (lastTransition === TRANSITION_ACCEPT ||
        lastTransition === TRANSITION_REQUEST_PAYMENT_INSTANT);
    const perDayPrice = lineItems
      .filter(item => item.code === 'line-item/day')
      .map(item => item.lineTotal?.amount);
    const unitPrice = lineItems
      .filter(item => item.code === 'line-item/day')
      .map(item => item.unitPrice?.amount);
    const unitCalculatedPrice = unitPrice / 100;
    // const bookingDaysArr =
    // lineItems &&
    // lineItems.length > 0 &&
    // lineItems.filter(item => item.code === 'line-item/day').flatMap(item => item.quantity?.d);
    const serviceFeeArray = lineItems
      .filter(item => item.code === 'line-item/tarifa-de-servicio')
      .map(item => item.lineTotal?.amount);
    const discountPriceArray = lineItems
      .filter(item => item.code === 'line-item/dias-de-descuento')
      .map(item => item.lineTotal?.amount);
    const perDayCalculatedPrice = perDayPrice / 100;
    const serviceFee = serviceFeeArray / 100;
    const finalPrice =
      currentTransaction && currentTransaction?.attributes?.payinTotal?.amount / 100;
    const discountAmount =
      discountPriceArray && discountPriceArray.length && discountPriceArray[0] / 100;

    const currentCustomerName = currentCustomer?.attributes?.profile?.publicData?.fullName;
    const currentProviderName = currentProvider?.attributes?.profile?.publicData?.fullName;

    const pickupAndDropTime = pickUpTime && convertTo12HourFormat(pickUpTime);
    const dropoffTime = dropTime ? convertTo12HourFormat(dropTime) : '';

    const documentFields = {
      location,
      bookingStartDate,
      bookingEndDate,
      documnetNumber,
      cardBrand,
      cardNumber,
      fuel,
      vehicle: title,
      perDayCalculatedPrice,
      finalPrice,
      serviceFee,
      unitCalculatedPrice,
      driverFullName,
      hostFullName,
      licenseplate,
      discountAmount,
      insuranceAmount,
      currentCustomerName,
      currentProviderName,
      chassis,
      perDayInsuranceFee,
      pickupAndDropTime,
      dropoffTime,
    };

    const stateDataFn = tx => {
      if (txIsEnquired(tx)) {
        const transitions = Array.isArray(nextTransitions)
          ? nextTransitions.map(transition => {
              return transition.attributes.name;
            })
          : [];
        const hasCorrectNextTransition =
          transitions.length > 0 && transitions.includes(TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY);
        return {
          headingState: HEADING_ENQUIRED,
          showBookingPanel: isCustomer && !isProviderBanned && hasCorrectNextTransition,
        };
      } else if (txIsPaymentPending(tx)) {
        return {
          headingState: HEADING_PAYMENT_PENDING,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsPaymentExpired(tx)) {
        return {
          headingState: HEADING_PAYMENT_EXPIRED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsRequested(tx)) {
        return {
          headingState: HEADING_REQUESTED,
          showDetailCardHeadings: isCustomer,
          showSaleButtons: isProvider && !isCustomerBanned,
        };
      } else if (txIsWaitingForCustomerSignature(tx)) {
        return {
          headingState: HEADING_WAITING_FOR_CUSTOMER_SIGNATURE,
          showDetailCardHeadings: true,
          showAddress: true,
          showSendContract: isCustomer,
        };
      } else if (txIsWaitingForCustomerReVerification(tx)) {
        return {
          headingState: STATE_REVERIFICATION_BY_CUSTOMER,
          showDetailCardHeadings: true,
          showUploadPicture: isCustomer,
        };
      } else if (txIsAccepted(tx)) {
        return {
          headingState: HEADING_ACCEPTED,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
          showVerifyButton: isCustomer,
        };
      } else if (txIsCustomerPhotoUploaded(tx)) {
        return {
          headingState: STATE_CUSTOMER_PHOTO_UPLOAD,
          showDetailCardHeadings: true,
          showAddress: true,
          showUploadPicture: isCustomer,
        };
      } else if (txIsWaitingForProviderSignature(tx)) {
        return {
          headingState: HEADING_WAITING_FOR_PROVIDER_SIGNATURE,
          showDetailCardHeadings: true,
          showAddress: true,
          showApproveContract: isProvider,
        };
      } else if (txIsSignedByProvider(tx)) {
        return {
          headingState: HEADING_SIGNED_BY_PROVIDER,
          showDetailCardHeadings: true,
          showAddress: true,
          showExtendTrip: isCustomer,
        };
      } else if (txIsExtendTrip(tx)) {
        return {
          headingState: HEADING_EXTEND_TRIP_CUSTOMER,
          showDetailCardHeadings: true,
          showAddress: true,
          showExtendButtons: isProvider,
        };
      } else if (txIsAcceptExtendTrip(tx)) {
        return {
          headingState: HEADING_ACCEPT_EXTEND_TRIP,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
        };
      } else if (txIsDeclineExtendTrip(tx)) {
        return {
          headingState: HEADING_DECLINE_EXTEND_TRIP,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
        };
      } else if (txIsDeclined(tx)) {
        return {
          headingState: HEADING_DECLINED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsCanceled(tx)) {
        return {
          headingState: HEADING_CANCELED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txHasBeenDelivered(tx)) {
        return {
          headingState: HEADING_DELIVERED,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
        };
      } else {
        return { headingState: 'unknown' };
      }
    };

    const stateData = stateDataFn(currentTransaction);

    const odooPaymentDetails = {
      partner_id: currentUser.attributes.profile.privateData.odoo_user_id,
      is_rental_order: true,
      rental_status: 'draft',
      date_order: formatDateToOdoo(bookingStartDate),
      validity_date: formatDateToOdoo(bookingEndDate),
      x_owner: currentUser.attributes.profile.displayName,
      order_line: getOdooOrderlines(
        currentTransaction.attributes.lineItems,
        daysBetween(bookingStartDate, bookingEndDate)
      ),
    };

    const txId = currentTransaction?.id?.uuid;
    const odooOrderId = currentTransaction?.attributes?.metadata?.odooOrderId ?? null;

    const saleButtons = (
      <SaleActionButtonsMaybe
        showButtons={stateData.showSaleButtons}
        acceptInProgress={acceptInProgress}
        declineInProgress={declineInProgress}
        acceptSaleError={acceptSaleError}
        declineSaleError={declineSaleError}
        onAcceptSale={() => onAcceptSale(currentTransaction, odooPaymentDetails, txId)}
        onDeclineSale={() => onDeclineSaleBeforeAccept(currentTransaction?.id)}
      />
    );

    const sendMessagePlaceholder = intl.formatMessage(
      { id: 'TransactionPanel.sendMessagePlaceholder' },
      { name: otherUserDisplayNameString }
    );
    const sendingMessageNotAllowed = intl.formatMessage({
      id: 'TransactionPanel.sendingMessageNotAllowed',
    });

    const paymentMethodsPageLink = (
      <NamedLink name="PaymentMethodsPage">
        <FormattedMessage id="TransactionPanel.paymentMethodsPageLink" />
      </NamedLink>
    );
    const classes = classNames(rootClassName || css.root, className);

    const handleGetEnvolapeAndUrl = () => {
      const txId = currentTransaction?.id?.uuid;
      const providerName = currentProvider?.attributes?.profile?.displayName;
      const providerEmail = currentProvider?.attributes?.profile?.publicData?.email;
      const customerName = currentCustomer?.attributes?.profile?.displayName;
      const customerEmail = currentCustomer?.attributes?.profile?.publicData?.email;

      if (isCustomer) {
        onGetEnvolapId({
          isCustomer,
          txId,
          providerName,
          providerEmail,
          customerName,
          customerEmail,
          documentFields,
        });
      } else if (!isCustomer) {
        onGetSecondSignerUrl({
          isCustomer,
          txId,
          envelopeId,
          providerEmail,
          providerName,
          documentFields,
        });
      }
    };

    const downloadPdf = async () => {
      await this.setState({ downloadInProgress: true }, () => {});
      try {
        const result = await downloadAgreementApi({ envelopeId: envelopeId });
        // Convert the provided PDF content string into a Uint8Array
        const pdfBytes = new Uint8Array(result.length);
        for (let i = 0; i < result.length; i++) {
          pdfBytes[i] = result.charCodeAt(i);
        }
        // Create a blob from the PDF content
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        // Create a temporary link element
        const a = document.createElement('a');
        a.href = result;
        a.download = 'download.pdf'; // Set the file name
        // Append the link to the body
        document.body.appendChild(a);
        // Click the link programatically to start download
        a.click();
        // Remove the link from the body
        document.body.removeChild(a);
        // Revoke the URL
        URL.revokeObjectURL(result);
        this.setState({ downloadInProgress: false });
        return;
      } catch (error) {
        console.error('Error downloading PDF:', error);
        // Handle error
      }
    };

    const handleUploadPhotos = (photos, uploadContainer) => {
      const promises = photos.map(p => {
        return sdk.images
          .upload({ image: p }, { expand: true })
          .then(resp => {
            return resp.data.data.attributes.variants.default.url;
          })
          .catch(e => console.error('handleUploadPhotos', e));
      });

      return Promise.all(promises)
        .then(res => {
          let metadataInfo = {
            metadata: {},
          };

          metadataInfo.metadata[uploadContainer] = res;
          return onUploadPhoto(currentTransaction, metadataInfo, odooOrderId).then(res => {
            setTimeout(() => {
              onFetchTransactionIntervalTime(transaction.id, transactionRole);
              onFetchNextTransitions(transaction.id);
            }, 3000);
          });
        })
        .catch(e => console.error('handleUploadPhotos error', e));
    };

    const handleAfterPhotos = photos => {
      const afterIm = currentTransaction?.attributes?.metadata?.afterImages || [];
      const afterImages = [...afterIm];
      const promises = photos.map(p => {
        return sdk.images
          .upload(
            {
              image: p,
            },
            {
              expand: true,
            }
          )
          .then(resp => {
            const url = resp.data.data.attributes.variants.default.url;
            afterImages.push(url);
            return onUploadAfterPhoto({ currentTransaction, promises, afterImages });
          })
          .catch(e => console.error(e, '*** Error in sdk.images.upload ***'));
      });
    };

    const handleProviderCompleteTx = () => {
      const paymentIntentId = txMetadata?.token;
      const bondAmount = lineItems.find(({ code }) => code === 'line-item/bond');

      if (!bondAmount) {
        return;
      }

      const amount = bondAmount.lineTotal.amount;

      onProviderCompleteTx(currentTransaction?.id, paymentIntentId, amount);
    };

    const handleProviderDisputeTx = formValues => {
      this.setState({ disputeModal: false });

      const disputeAmount = Math.abs(formValues.disputeAmount);
      onProviderDisputeTx(currentTransaction?.id, disputeAmount, formValues.disputeReason);
    };

    const getBookingStart = (bookingStartDate, pickUpTime = '') => {
      const bookingStart = new Date(bookingStartDate);

      const [hours, minutes] = pickUpTime.split(':');

      if (hours) {
        bookingStart.setHours(+hours);
      }

      if (minutes) {
        bookingStart.setMinutes(+minutes);
      }

      bookingStart.setSeconds(0);

      return bookingStart;
    };

    const now = new Date().getTime();
    const end = getBookingStart(bookingStartDate, pickUpTime).getTime();
    const difference = (end - now) / (1000 * 60 * 60);
    const showVerificationButton = (difference > 0 && difference <= 3) || now > end;
    const isRightTransition = currentTransaction?.attributes?.transitions?.some(elm =>
      [TRANSITION_SIGNED_BY_CUSTOMER, TRANSITION_SIGNED_BY_PROVIDER].includes(elm?.transition)
    );
    const dropOffFullDate = combineDates(bookingEndDate, dropoffTime);

    // REVIEW: hide it for now
    // const handleCompleteBooking = () => {
    //   const id = currentTransaction?.id?.uuid;
    //   onCompleteBooking(id).then(handleChargeCustomer);
    // };

    const handleChargeCustomer = () => {
      if (now > new Date(dropOffFullDate).getTime() + GRACE_PERIOD * 60 * 60 * 1000) {
        const currency = currentTransaction?.attributes?.payinTotal?.currency;
        let datePlusDay = new Date(dropOffFullDate);
        datePlusDay.setDate(datePlusDay.getDate() + 1);

        const { stripeCustomer, stripePaymentMethod } = currentUser.attributes.profile.privateData;

        transactionLineItems({
          bookingData: {
            startDate: dropOffFullDate,
            endDate: datePlusDay,
            authorId: authorId,
          },
          listingId: currentListing?.id,
          isOwnListing: false,
        }).then(response => {
          const lineItems = response.data;
          const customerLineItems = lineItems.filter(item => item.includeFor.includes('customer'));
          const payinTotal = estimatedTotalPrice(customerLineItems);

          createCharge({
            amount: payinTotal.amount,
            paymentMethod: stripePaymentMethod.id,
            stripeCustomer: stripeCustomer.id,
            currency,
            id: txId,
            dropOffExceed: true,
          });
        });
      }
    };

    const showDropOffBtn =
      !isDropOff &&
      (lastTransition === TRANSITION_SIGNED_BY_PROVIDER ||
        lastTransition === TRANSITION_COMPLETE) &&
      isCustomer &&
      (new Date(dropOffFullDate).getTime() < Date.now() + 10800000 ||
        new Date(dropOffFullDate).getTime() > Date.now());

    const dropOffBtn = () => this.setState({ dropOffModel: true });
    // afterIm && lastTransition === TRANSITION_SIGNED_BY_PROVIDER
    //   ? handleCompleteBooking
    //   : () => this.setState({ dropOffModel: true });

    const isBookingComplete = currentTransaction.attributes.transitions.find(({ transition }) =>
      [
        TRANSITION_PROVIDER_COMPLETE,
        TRANSITION_ADMIN_COMPLETE,
        TRANSITION_PROVIDER_DISPUTE,
      ].includes(transition)
    );

    return (
      <div className={classes}>
        {stateData.showSaleButtons ? (
          <div className={css.mobileActionButtons}>{saleButtons}</div>
        ) : null}
        <div className={css.container}>
          <div className={css.txInfo}>
            <DetailCardImage
              rootClassName={css.imageWrapperMobile}
              avatarWrapperClassName={css.avatarWrapperMobile}
              listingTitle={listingTitle}
              image={firstImage}
              provider={currentProvider}
              isCustomer={isCustomer}
            />
            {isProvider ? (
              <div className={css.avatarWrapperProviderDesktop}>
                <AvatarLarge user={currentCustomer} className={css.avatarDesktop} />
              </div>
            ) : null}

            <PanelHeading
              panelHeadingState={stateData.headingState}
              transactionRole={transactionRole}
              providerName={authorDisplayName}
              customerName={customerDisplayName}
              isCustomerBanned={isCustomerBanned}
              listingId={currentListing.id && currentListing.id.uuid}
              listingTitle={listingTitle}
              listingDeleted={listingDeleted}
            />

            <div className={css.bookingDetailsMobile}>
              <AddressLinkMaybe
                rootClassName={css.addressMobile}
                location={location}
                geolocation={geolocation}
                showAddress={stateData.showAddress}
              />
              <BreakdownMaybe
                transaction={currentTransaction}
                transactionRole={transactionRole}
                bookingData={bookingData}
              />
            </div>

            {(flightNumber || arivalTime || departureTime) && (
              <div>
                <h1>Detalles del vuelo (opcional)</h1>
                {flightNumber && <p>Número de vuelo: {flightNumber}</p>}
                {arivalTime && <p>Hora de llegada: {arivalTime}</p>}
                {departureTime && <p>Hora de salida: {departureTime}</p>}
              </div>
            )}
            {savePaymentMethodFailed ? (
              <p className={css.genericError}>
                <FormattedMessage
                  id="TransactionPanel.savePaymentMethodFailed"
                  values={{ paymentMethodsPageLink }}
                />
              </p>
            ) : null}

            <FeedSection
              rootClassName={css.feedContainer}
              currentTransaction={currentTransaction}
              currentUser={currentUser}
              fetchMessagesError={fetchMessagesError}
              fetchMessagesInProgress={fetchMessagesInProgress}
              initialMessageFailed={initialMessageFailed}
              messages={messages}
              oldestMessagePageFetched={oldestMessagePageFetched}
              onOpenReviewModal={this.onOpenReviewModal}
              onShowMoreMessages={() => onShowMoreMessages(currentTransaction.id)}
              totalMessagePages={totalMessagePages}
            />
            {[
              TRANSITION_CUSTOMER_FULL_REFUND,
              TRANSITION_CUSTOMER_HALF_REFUND,
              TRANSITION_CUSTOMER_NO_REFUND,
              TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_PROVIDER_SIGN,
              TRANSITION_DECLINE,
              TRANSITION_REQUEST_PAYMENT,
              TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
              TRANSITION_CUSTOMER_CHARGE_AFTER_PROVIDER_SIGN,
              TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_PROVIDER_SIGN,
              TRANSITION_CUSTOMER_CHARGE_AFTER_CUSTOMER_SIGN,
              TRANSITION_CUSTOMER_CHARGE_WAITING_FOR_CUSTOMER_SIGN,
              TRANSITION_CUSTOMER_CHARGE_AFTER_UPLOAD_PHOTO,
              TRANSITION_CUSTOMER_CHARGE,
              TRANSITION_COMPLETE,
              TRANSITION_CUSTOMER_CHARGE_AFTER_REVERIFY,
              TRANSITION_CUSTOMER_FULL_REFUND_AFTER_PROVIDER_SIGN,
              TRANSITION_CANCEL_BY_PROVIDER,
              TRANSITION_CANCEL_BY_PROVIDER_AFTER_REVERIFY,
              TRANSITION_CANCEL_BY_PROVIDER_AFTER_UPLOAD_PHOTO,
              TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_CUSTOMER_SIGN,
              TRANSITION_CANCEL_BY_PROVIDER_AFTER_CUSTOMER_SIGN,
              TRANSITION_CANCEL_BY_PROVIDER_WAITING_FOR_PROVIDER_SIGN,
              TRANSITION_CUSTOMER_FULL_REFUND_WAITING_FOR_CUSTOMER_SIGN,
              TRANSITION_CANCEL_BY_PROVIDER_AFTER_PROVIDER_SIGN,
              TRANSITION_EXTEND_TRIP_CUSTOMER,
              TRANSITION_ACCEPT_EXTEND_TRIP,
              TRANSITION_DECLINE_EXTEND_TRIP,
              TRANSITION_EXPIRE_REVIEW_PERIOD,
              TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD,
              TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD,
              TRANSITION_REVIEW_1_BY_PROVIDER,
              TRANSITION_REVIEW_2_BY_PROVIDER,
              TRANSITION_REVIEW_1_BY_CUSTOMER,
              TRANSITION_REVIEW_2_BY_CUSTOMER,
              TRANSITION_CUSTOMER_FULL_REFUND_AFTER_REVERIFY,
            ].includes(lastTransition) ? (
              <></>
            ) : (
              <div className={css.submitContainer}>
                <SecondaryButton
                  rootClassName={css.submitButton}
                  inProgress={false}
                  onClick={() => this.setState({ openModal: true })}
                >
                  <FormattedMessage id="TransactionPanel.cancelButton" />
                </SecondaryButton>
              </div>
            )}

            {showSendMessageForm ? (
              <SendMessageForm
                formId={this.sendMessageFormName}
                rootClassName={css.sendMessageForm}
                messagePlaceholder={sendMessagePlaceholder}
                inProgress={sendMessageInProgress}
                sendMessageError={sendMessageError}
                onFocus={this.onSendMessageFormFocus}
                onBlur={this.onSendMessageFormBlur}
                onSubmit={this.onMessageSubmit}
                lastTransition={lastTransition}
              />
            ) : (
              <div className={css.sendingMessageNotAllowed}>{sendingMessageNotAllowed}</div>
            )}
          </div>

          <div className={css.asideDesktop}>
            <div className={css.detailCard}>
              <DetailCardImage
                avatarWrapperClassName={css.avatarWrapperDesktop}
                listingTitle={listingTitle}
                image={firstImage}
                provider={currentProvider}
                isCustomer={isCustomer}
              />

              <DetailCardHeadingsMaybe
                showDetailCardHeadings={stateData.showDetailCardHeadings}
                listingTitle={listingTitle}
                subTitle={bookingSubTitle}
                location={location}
                geolocation={geolocation}
                showAddress={stateData.showAddress}
              />
              {stateData.showBookingPanel ? (
                <BookingPanel
                  className={css.bookingPanel}
                  titleClassName={css.bookingTitle}
                  isOwnListing={false}
                  currentUser={currentUser}
                  listing={currentListing}
                  title={listingTitle}
                  subTitle={bookingSubTitle}
                  authorDisplayName={authorDisplayName}
                  onSubmit={onSubmitBookingRequest}
                  onManageDisableScrolling={onManageDisableScrolling}
                  timeSlots={timeSlots}
                  fetchTimeSlotsError={fetchTimeSlotsError}
                  onFetchTransactionLineItems={onFetchTransactionLineItems}
                  lineItems={lineItems}
                  fetchLineItemsInProgress={fetchLineItemsInProgress}
                  fetchLineItemsError={fetchLineItemsError}
                  authorId={authorId}
                />
              ) : null}

              {lastTransition == TRANSITION_RE_VERIFY &&
              isCustomer &&
              carPhotosBefore.length === 0 ? (
                <MultipleImagesUploader
                  maxNumber={15}
                  label={'Fotos iniciales'}
                  underLabel={'Por favor, sube hasta 15 fotos del vehículo el día que lo recojas'}
                  handleUploadPhotos={handleUploadPhotos}
                  metadataKey={'beforePhotos'}
                />
              ) : null}

              {carPhotosBefore && carPhotosBefore.length > 0 ? (
                <div className={centerButtons ? css.seePhotosWrapperCenter : css.seePhotosWrapper}>
                  <button
                    type="button"
                    className={css.seePhotosButton}
                    onClick={() => {
                      this.setState({ isLightboxOpen: true, lightboxTarget: 'before' });
                    }}
                  >
                    Ver fotos (inicial) <CameraAltIcon />
                  </button>
                </div>
              ) : null}

              {afterIm && afterIm.length ? (
                <div className={centerButtons ? css.seePhotosWrapperCenter : css.seePhotosWrapper}>
                  <button
                    type="button"
                    className={css.seePhotosButton}
                    onClick={() => {
                      this.setState({ isLightboxOpen: true, lightboxTarget: 'after' });
                    }}
                  >
                    Ver fotos (final) <CameraAltIcon />
                  </button>
                </div>
              ) : null}

              {(lastTransition === TRANSITION_SIGNED_BY_PROVIDER ||
                lastTransition === TRANSITION_COMPLETE) &&
              !afterIm &&
              isCustomer ? (
                <MultipleImagesUploader
                  maxNumber={15}
                  label={'Fotos finales'}
                  afterPhotos={true}
                  underLabel={'Por favor, sube hasta 15 fotos del vehículo antes de devolverlo'}
                  handleAfterPhotos={handleAfterPhotos}
                  metadataKey={'afterPhotos'}
                />
              ) : null}

              {isLightboxOpen && (
                <Lightbox
                  mainSrc={lightboxPhotos[photoIndex]}
                  nextSrc={lightboxPhotos[(photoIndex + 1) % lightboxPhotos.length]}
                  prevSrc={
                    lightboxPhotos[(photoIndex + lightboxPhotos.length - 1) % lightboxPhotos.length]
                  }
                  onCloseRequest={() => this.setState({ isLightboxOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + lightboxPhotos.length - 1) % lightboxPhotos.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % lightboxPhotos.length,
                    })
                  }
                />
              )}
              <BreakdownMaybe
                className={css.breakdownContainer}
                isExtend={true}
                transaction={currentTransaction}
                transactionRole={transactionRole}
                bookingData={bookingData}
              />
              {stateData.showSaleButtons && (
                <div className={css.desktopActionButtons}>{saleButtons}</div>
              )}

              {verficationInProgress ? (
                <div className={css.spinnerBox}>
                  <IconSpinner /> Por favor espere al menos 3 horas antes de la hora de checkin para
                  iniciar el proceso de re-verificación....{' '}
                </div>
              ) : isCustomer &&
                (lastTransition === TRANSITION_ACCEPT ||
                  lastTransition === TRANSITION_REQUEST_PAYMENT_INSTANT) &&
                clientId &&
                showVerificationButton ? (
                <div id="complycube-mount">
                  <PrimaryButton
                    className={css.verificationButton}
                    onClick={() => this.initializeComplyCube()}
                  >
                    Iniciar Re-verificación
                  </PrimaryButton>
                </div>
              ) : null}

              {/* EXTEND BOOKING - HIDING THIS FEATURE FOR NOW */}

              {/* {stateData.showExtendTrip && lastTransition !== TRANSITION_DECLINE_EXTEND_TRIP && (
                <div className={css.verifySec}>
                  <PrimaryButton onClick={() => this.setState({ isExtendTripModalOpen: true })}>
                    Extender renta{' '}
                  </PrimaryButton>
                </div>
              )} */}

              {/* EXTEND BOOKING - HIDING THIS FEATURE FOR NOW */}

              {policyToShow && isCustomer ? (
                <div className={css.verifySec}>
                  <PrimaryButton onClick={() => this.setState({ policyModalOpen: true })}>
                    Mostrar tarjeta del seguro
                  </PrimaryButton>
                </div>
              ) : null}

              {/* {lastTransition === TRANSITION_SIGNED_BY_PROVIDER && isCustomer ? (
                <div className={css.verifySec}>
                  <PrimaryButton onClick={() => this.setState({ openInsuranceModal: true })}>
                    Mostrar tarjeta del seguro{' '}
                  </PrimaryButton>
                </div>
              ) : null} */}

              {showDropOffBtn ? (
                <div className={css.verifySec}>
                  <PrimaryButton onClick={dropOffBtn}>Reserva completa</PrimaryButton>
                </div>
              ) : null}

              {isDropOff && isProvider && !isBookingComplete && !disputeComplete ? (
                <div>
                  <div className={css.providerComplete}>
                    <PrimaryButton
                      onClick={handleProviderCompleteTx}
                      inProgress={refundInProgress || disputeInProgress}
                    >
                      <FormattedMessage id="TransactionPanel.completeTransaction" />
                    </PrimaryButton>
                  </div>
                  <div className={css.providerComplete}>
                    <PrimaryButton
                      onClick={() => this.setState({ disputeModal: true })}
                      inProgress={refundInProgress || disputeInProgress}
                    >
                      <FormattedMessage id="TransactionPanel.disputeTransaction" />
                    </PrimaryButton>
                  </div>
                </div>
              ) : null}

              {/* CHECK THIS CODE, IS NOT WORKING */}

              {/* {(stateData?.headingState == "delivered" && isCustomer && !afterIm) ?
                <PrimaryButton onClick={() => { this.setState({ dropOffModel: true }) }}>
                  <p>Devolver vehículo</p>
                </PrimaryButton> : null
              } */}

              {!isCustomer && lastTransition === TRANSITION_EXTEND_TRIP_CUSTOMER && (
                <div className={css.acceptContractBtn}>
                  <PrimaryButton
                    type="button"
                    inProgress={acceptExtendedInProgress}
                    onClick={() =>
                      onAcceptOrRejectExtendTrip({
                        type: 'accept',
                        tx: currentTransaction,
                        lastTransition: lastTransition,
                        extBookingStart: extBookingStart,
                        extBookingEnd: extBookingEnd,
                        paymentIntent: paymentIntent,
                        paymentMethod: paymentMethod,
                        stripeCustomer: stripeCustomer,
                        totalExtendAmount: totalExtendAmount,
                      })
                    }
                  >
                    <FormattedMessage id="TransactionPanel.acceptButton" />
                  </PrimaryButton>
                  <SecondaryButton
                    inProgress={rejectExtendedInProgress}
                    onClick={() =>
                      onAcceptOrRejectExtendTrip({
                        type: 'reject',
                        tx: currentTransaction,
                        extBookingStart: extBookingStart,
                        extBookingEnd: extBookingEnd,
                      })
                    }
                  >
                    <FormattedMessage id="TransactionPanel.declineButton" />
                  </SecondaryButton>
                </div>
              )}
              {isRightTransition ? (
                <button
                  disabled={this.state.downloadInProgress}
                  inProgress={this.state.downloadInProgress}
                  className={css.downloadPdfButton}
                  onClick={() => downloadPdf()}
                >
                  {!this.state.downloadInProgress ? 'Descargar contrato' : 'Cargando...'}
                </button>
              ) : (
                ''
              )}
            </div>

            {isCustomer &&
            (lastTransition === TRANSITION_WAITING_FOR_CUSTOMER_SIGNATURE ||
              lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE_BY_OPREATOR) ? (
              <div className={css.bottomButon}>
                <div className={css.buttonBox}>
                  <PrimaryButton
                    inProgress={getEnvelopeIDProgress}
                    onClick={handleGetEnvolapeAndUrl}
                  >
                    Ver contrato y firmar
                  </PrimaryButton>
                </div>
              </div>
            ) : null}

            {isProvider && lastTransition === TRANSITION_WAITING_FOR_PROVIDER_SIGNATURE ? (
              <div className={css.bottomButon}>
                <div className={css.buttonBox}>
                  <PrimaryButton
                    inProgress={getSecondUrlProgress}
                    onClick={handleGetEnvolapeAndUrl}
                  >
                    Ver contrato y firmar
                  </PrimaryButton>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* <a href={`https://account-d.docusign.com/oauth/auth?grant_type=authorization_code&scope=signature%20impersonation&client_id=cc289aa0-e1f1-4f60-98d0-b5bfbe15d8ee&redirect_uri=${process.env.REACT_APP_CANONICAL_ROOT_URL}`}>
                  Access App for docu sign </a>  */}

        {/* ==============##################*******************Modals==========================#############################============== */}

        <Modal
          id={'TransactionPanel.insuranceModal'}
          isOpen={openInsuranceModal}
          onClose={() => {
            this.setState({ openInsuranceModal: false });
          }}
          onManageDisableScrolling={() => {}}
          modalTitle="Tarjeta de seguro"
        >
          <div className={css.insuranceCard}>
            <p>
              <span>Título: </span>
              <strong>{title}</strong>
            </p>
            <p>
              <span>Tu fecha de inicio de reserva: </span>
              <strong>{bookingStartDate.toLocaleDateString()}</strong>
            </p>
            <p>
              <span>Tu fecha de inicio de reserva:</span>{' '}
              <strong>{bookingEndDate.toLocaleDateString()}</strong>
            </p>
            <p>
              <span>Monto total que pagas:</span> <strong> $ {payInTotal / 100}</strong>
            </p>
            <p>
              <span>Monto del seguro:</span> <strong>${insuranceAmount}</strong>
            </p>
          </div>
        </Modal>

        {/* <Modal
          id="PolicyModal"
          isOpen={policyModalOpen}
          onClose={() => {
            this.setState({ policyModalOpen: false });
          }}
          onManageDisableScrolling={() => { }}
          modalTitle="Información de la póliza"
        >
          <PolicyModalContent policy={policyToShow} />
        </Modal> */}

        <RentalPopup
          isOpen={policyModalOpen}
          onClose={() => {
            this.setState({ policyModalOpen: false });
          }}
          insuranceData={policyToShow}
        />

        <ReviewModal
          id="ReviewOrderModal"
          isOpen={isReviewModalOpen}
          onCloseModal={() => this.setState({ isReviewModalOpen: false })}
          onManageDisableScrolling={onManageDisableScrolling}
          onSubmitReview={this.onSubmitReview}
          revieweeName={otherUserDisplayName}
          reviewSent={reviewSubmitted}
          sendReviewInProgress={sendReviewInProgress}
          sendReviewError={sendReviewError}
        />

        <Modal
          id="DisputeModal"
          isOpen={disputeModal}
          onClose={() => {
            this.setState({ disputeModal: false });
          }}
          onManageDisableScrolling={onManageDisableScrolling}
          modalTitle={'Dispute'}
        >
          <DisputeModalContent
            onSubmit={handleProviderDisputeTx}
            intl={intl}
            submitInProgress={false}
          />
        </Modal>

        <Modal
          id={'TransactionPanel.cancelModal'}
          isOpen={openModal}
          onClose={() => {
            this.setState({ openModal: false });
          }}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.cancelTransactionModal}>
            <h2>¿Estás seguro/a de que quieres cancelar la transacción?</h2>

            <p>Tu transacción será cancelada si confirmas.</p>
            <NamedLink className={css.checkPrivacy} name="PrivacyPolicyPage">
              Por favor, revisa la política de privacidad antes de cancelar.
            </NamedLink>
            <div className={css.cancelTransBtn}>
              <PrimaryButton
                rootClassName={css.submitButton}
                inProgress={declineInProgress || cancelInProgress}
                disabled={declineInProgress || cancelInProgress}
                onClick={
                  isCustomer
                    ? () => {
                        const invoice = createOdooInvoiceData(currentTransaction, currentUser);

                        if (chassis) {
                          cancelPolicy({ chassis });
                        }
                        onCancelSale(currentTransaction, invoice).then(res => {
                          if (res) {
                            this.setState({ openModal: false });
                          }
                        });
                      }
                    : () => {
                        const invoice = createOdooInvoiceData(currentTransaction, currentUser);

                        if (chassis) {
                          cancelPolicy({ chassis });
                        }
                        onDeclineSale(currentTransaction, invoice).then(res => {
                          if (res) {
                            this.setState({ openModal: false });
                          }
                        });
                      }
                }
              >
                Si
              </PrimaryButton>

              <SecondaryButton
                rootClassName={css.submitButton}
                inProgress={declineInProgress || cancelInProgress}
                disabled={declineInProgress || cancelInProgress}
                onClick={() => this.setState({ openModal: false })}
              >
                No
              </SecondaryButton>
            </div>
          </div>
        </Modal>

        <Modal
          id={'TransactionPanel.dropOffModal'}
          isOpen={dropOffModel}
          onClose={() => {
            this.setState({ dropOffModel: false });
          }}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.cancelTransactionModal}>
            <h2>"¿Estás seguro/a de que quieres dejar el vehículo?</h2>

            <div className={css.cancelTransBtn}>
              <PrimaryButton
                rootClassName={css.submitButton}
                inProgress={false}
                onClick={() => {
                  onUpdatedProtectedData({ id: currentTransaction?.id.uuid, dropOff: true }).then(
                    res => {
                      // handleChargeCustomer();
                      if (res) {
                        this.setState({
                          dropOffModel: false,
                        });
                      }
                    }
                  );
                }}
              >
                Si
              </PrimaryButton>

              <SecondaryButton
                rootClassName={css.submitButton}
                inProgress={false}
                onClick={() => this.setState({ dropOffModel: false })}
              >
                No
              </SecondaryButton>
            </div>
          </div>
        </Modal>

        <ExtendTripModal
          id="ExtendTripModal"
          isOpen={isExtendTripModalOpen}
          onCloseModal={() => this.setState({ isExtendTripModalOpen: false })}
          className={css.bookingPanel}
          titleClassName={css.bookingTitle}
          isOwnListing={false}
          listing={currentListing}
          transaction={currentTransaction}
          title={listingTitle}
          currentUser={currentUser}
          isApprovedToDrive={isApprovedToDrive}
          subTitle={bookingSubTitle}
          authorDisplayName={authorDisplayName}
          price={price}
          onSubmit={values => {
            const { startDate, endDate } = values?.bookingDates;
            const bookingStart = startDate;
            const bookingEnd = endDate;
            onExtendTrip({
              tx: currentTransaction,
              bookingStart,
              bookingEnd,
              totalExtendAmount,
              perDayCalculatedPrice,
            }).then(res => {
              if (chassis) {
                updatePolicy({
                  startBooking: formatDate(bookingStart),
                  endBooking: formatDate(bookingStart),
                  chassis: chassis,
                });
              }

              if (res) {
                this.setState({
                  isExtendTripModalOpen: false,
                });
              }
            });
          }}
          onManageDisableScrolling={onManageDisableScrolling}
          timeSlots={timeSlots}
          onFetchTransactionLineItems={onFetchTransactionLineItems}
          lineItems={lineItems}
          isTransactionPage={true}
          fetchLineItemsInProgress={fetchLineItemsInProgress}
          fetchLineItemsError={fetchLineItemsError}
          extendInProgress={false}
          extendSaleError={false}
          authorId={authorId}
        />
      </div>
    );
  }
}

TransactionPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  acceptSaleError: null,
  declineSaleError: null,
  fetchMessagesError: null,
  initialMessageFailed: false,
  savePaymentMethodFailed: false,
  sendMessageError: null,
  sendReviewError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  nextTransitions: null,
  lineItems: null,
  fetchLineItemsError: null,
};

TransactionPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  totalMessagePages: number.isRequired,
  oldestMessagePageFetched: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailed: bool,
  savePaymentMethodFailed: bool,
  fetchMessagesInProgress: bool.isRequired,
  fetchMessagesError: propTypes.error,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  sendReviewInProgress: bool.isRequired,
  sendReviewError: propTypes.error,
  onManageDisableScrolling: func.isRequired,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  onSendReview: func.isRequired,
  onSubmitBookingRequest: func.isRequired,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  nextTransitions: array,
  onUploadPhoto: func.isRequired,
  // Sale related props
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,

  // line items
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape,
};

const TransactionPanel = injectIntl(TransactionPanelComponent);

export default TransactionPanel;
