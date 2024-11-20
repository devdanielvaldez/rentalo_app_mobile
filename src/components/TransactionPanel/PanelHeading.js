import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { createSlug, stringify } from '../../util/urlHelpers';
import { NamedLink } from '../../components';

import css from './TransactionPanel.module.css';

export const HEADING_ENQUIRED = 'enquired';
export const HEADING_PAYMENT_PENDING = 'pending-payment';
export const HEADING_PAYMENT_EXPIRED = 'payment-expired';
export const HEADING_REQUESTED = 'requested';
export const HEADING_ACCEPTED = 'accepted';
export const HEADING_DECLINED = 'declined';
export const HEADING_CANCELED = 'canceled';
export const HEADING_DELIVERED = 'delivered';
export const STATE_REVERIFICATION_BY_CUSTOMER = 'reverify';
export const STATE_CUSTOMER_PHOTO_UPLOAD = 'customer-photo-upload';

export const HEADING_WAITING_FOR_CUSTOMER_SIGNATURE = 'waiting-for-customer-signature';
export const HEADING_WAITING_FOR_PROVIDER_SIGNATURE = 'waiting-for-provider-signature';
export const HEADING_SIGNED_BY_PROVIDER = 'signed-by-provider';

export const HEADING_EXTEND_TRIP_CUSTOMER = 'transition/extend-by-customer';
export const HEADING_ACCEPT_EXTEND_TRIP = 'transition/accept-extend-trip'
export const HEADING_DECLINE_EXTEND_TRIP = 'transition/decline-extend-trip';

const createListingLink = (listingId, label, listingDeleted, searchParams = {}, className = '') => {
  if (!listingDeleted) {
    const params = { id: listingId, slug: createSlug(label) };
    const to = { search: stringify(searchParams) };
    return (
      <NamedLink className={className} name="ListingPage" params={params} to={to}>
        {label}
      </NamedLink>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

const ListingDeletedInfoMaybe = props => {
  return props.listingDeleted ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.messageDeletedListing" />
    </p>
  ) : null;
};

const HeadingCustomer = props => {
  const { className, id, values, listingDeleted } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.title}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const HeadingCustomerWithSubtitle = props => {
  const { className, id, values, subtitleId, subtitleValues, children, listingDeleted } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.title}>
          <FormattedMessage id={id} values={values} />
        </span>{' '}
        <FormattedMessage id={subtitleId} values={subtitleValues} />
      </h1>
      {children}
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const CustomerBannedInfoMaybe = props => {
  return props.isCustomerBanned ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.customerBannedStatus" />
    </p>
  ) : null;
};

const HeadingProvider = props => {
  const { className, id, values, isCustomerBanned, children } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.title}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      {children}
      <CustomerBannedInfoMaybe isCustomerBanned={isCustomerBanned} />
    </React.Fragment>
  );
};

// Functional component as a helper to choose and show Order or Sale heading info:
// title, subtitle, and message
const PanelHeading = props => {
  const {
    className,
    rootClassName,
    panelHeadingState,
    customerName,
    providerName,
    listingId,
    listingTitle,
    listingDeleted,
    isCustomerBanned,
  } = props;

  const isCustomer = props.transactionRole === 'customer';

  const defaultRootClassName = isCustomer ? css.heading : css.heading;
  const titleClasses = classNames(rootClassName || defaultRootClassName, className);
  const listingLink = createListingLink(listingId, listingTitle, listingDeleted);

  switch (panelHeadingState) {
    case HEADING_ENQUIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderEnquiredTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleEnquiredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_PAYMENT_PENDING:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderPaymentPendingTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.salePaymentPendingTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        >
          <p className={css.transactionInfoMessage}>
            <FormattedMessage
              id="TransactionPanel.salePaymentPendingInfo"
              values={{ customerName }}
            />
          </p>
        </HeadingProvider>
      );
    case HEADING_PAYMENT_EXPIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderPaymentExpiredTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.salePaymentExpiredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_REQUESTED:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderPreauthorizedTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderPreauthorizedSubtitle"
          subtitleValues={{ listingLink }}
        >
          {!listingDeleted ? (
            <p className={css.transactionInfoMessage}>
              <FormattedMessage
                id="TransactionPanel.orderPreauthorizedInfo"
                values={{ providerName }}
              />
            </p>
          ) : null}
        </HeadingCustomerWithSubtitle>
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleRequestedTitle"
          values={{ customerName, listingLink }}
        >
          {!isCustomerBanned ? (
            <p className={titleClasses}>
              <FormattedMessage id="TransactionPanel.saleRequestedInfo" values={{ customerName }} />
            </p>
          ) : null}
        </HeadingProvider>
      );
    case HEADING_ACCEPTED:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderPreauthorizedTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderAcceptedSubtitle"
          subtitleValues={{ listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleAcceptedTitle"
          values={{ customerName, listingLink }}
        />
      );
    case STATE_REVERIFICATION_BY_CUSTOMER:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.reVerificationTittle"
          values={{ customerName }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.reVerficationComplete"
          values={{ customerName }}
        />
      );
    case HEADING_WAITING_FOR_CUSTOMER_SIGNATURE:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.waitingForCustomerSignatureTitle1"
          values={{ customerName }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.waitingForCustomerSignatureTitle2"
          values={{ customerName }}
        />
      );
    case HEADING_EXTEND_TRIP_CUSTOMER:
        return isCustomer ? (
          <HeadingCustomer
            className={titleClasses}
            id="TransactionPanel.extendTrip"
            values={{ customerName }}
          />
        ) : (
          <HeadingProvider
            className={titleClasses}
            id="TransactionPanel.extendTrip"
            values={{ customerName }}
          />
        );
        case HEADING_ACCEPT_EXTEND_TRIP:
          return isCustomer ? (
            <HeadingCustomer
              className={titleClasses}
              id="TransactionPanel.extendTripAccept"
              values={{ customerName }}
            />
          ) : (
            <HeadingProvider
              className={titleClasses}
              id="TransactionPanel.extendTripAccept"
              values={{ customerName }}
            />
          );
          case HEADING_DECLINE_EXTEND_TRIP:
            return isCustomer ? (
              <HeadingCustomer
                className={titleClasses}
                id="TransactionPanel.extendTripDecline"
                values={{ customerName }}
              />
            ) : (
              <HeadingProvider
                className={titleClasses}
                id="TransactionPanel.extendTripDecline"
                values={{ customerName }}
              />
            );
    case HEADING_WAITING_FOR_PROVIDER_SIGNATURE:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.waitingForProviderSignatureTitle1"
          values={{ providerName }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.waitingForProviderSignatureTitle2"
          values={{ providerName }}
        />
      );
    case HEADING_SIGNED_BY_PROVIDER:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.signedByProviderTitle1"
          values={{ providerName }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.signedByProviderTitle2"
          values={{ providerName }}
        />
      );
    case HEADING_DECLINED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleDeclinedTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_CANCELED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderCancelledTitle"
          values={{ customerName, listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleCancelledTitle"
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_DELIVERED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderDeliveredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleDeliveredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    default:
      console.warn('Unknown state given to panel heading.');
      return null;
  }
};

export default PanelHeading;
