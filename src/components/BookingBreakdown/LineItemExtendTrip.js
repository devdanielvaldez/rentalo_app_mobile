import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { txIsCanceled, txIsDelivered, txIsDeclined } from '../../util/transaction';
import { propTypes } from '../../util/types';
import css from './BookingBreakdown.module.css';
import { BookingPeriod } from './LineItemBookingPeriod';
import { DATE_TYPE_DATE } from '../../util/types';

const LineItemExtendTrip = props => {
  const { transaction, isProvider, intl, isCustomer } = props;
  const extendTripArr = transaction?.attributes?.protectedData?.extendedBookingData
  let lastElement = extendTripArr && extendTripArr[extendTripArr.length - 1];
  const startDate = lastElement?.bookingStart
  const endDate = lastElement?.bookingEnd
  const totalExtendAmount = lastElement?.totalExtendAmount / 100
  const perDayExtendedPrice = lastElement?.perDayCalculatedPrice
  const providerCommission = lastElement?.perDayCalculatedPrice * 10 / 100
  const lastAmountCustomer = transaction?.attributes?.payinTotal?.amount / 100


  let providerTotalMessageId = 'BookingBreakdown.extendTripTotal';
  if (txIsDelivered(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDelivered';
  } else if (txIsDeclined(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDeclined';
  } else if (txIsCanceled(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalCanceled';
  }

  const totalLabel = isProvider ? (
    <FormattedMessage id={providerTotalMessageId} />
  ) : (
    <FormattedMessage id="BookingBreakdown.extendTripTotal" />
  );
  const finalPriceLabel = <FormattedMessage id="BookingBreakdown.finalTotalPrice" />
  const rentloFeeLabel = <FormattedMessage id="BookingBreakdown.rentloFee" />

  const totalPrice = isProvider
    ? parseInt(perDayExtendedPrice) - parseInt(providerCommission)
    : parseInt(totalExtendAmount) + parseInt(lastAmountCustomer);

  return (
    <>
      <hr className={css.totalDivider} />
      <div className={css.lineItem}>
        <BookingPeriod startDate={startDate} endDate={endDate} dateType={DATE_TYPE_DATE} />
      </div>
      {isCustomer && <div className={css.lineItemTotal}>
        <div className={css.totalLabel}>{totalLabel}</div>
        <div className={css.totalPrice}>${totalExtendAmount}</div>
      </div>}

      {isCustomer && <div className={css.lineItemTotal}>
        <div className={css.totalLabel}> </div>
        <div className={css.totalPrice}>${lastAmountCustomer}</div>
      </div>}
      {isProvider && <div className={css.lineItemTotal}>
        <div className={css.totalLabel}> </div>
        <div className={css.totalPrice}>${perDayExtendedPrice}  </div>
      </div>}
      {isProvider && <div className={css.lineItemTotal}>
        <div className={css.totalLabel}>{rentloFeeLabel}</div>
        <div className={css.totalPrice}> - ${providerCommission}</div>
      </div>}
      {<div className={css.lineItemTotal}>
        <div className={css.totalLabel}>{finalPriceLabel}</div>
        <div className={css.totalPrice}>${totalPrice}</div>
      </div>}

    </>
  );
};

LineItemExtendTrip.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemExtendTrip;
