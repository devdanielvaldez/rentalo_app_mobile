import React from 'react';
import { FormattedMessage, FormattedDate } from '../../util/reactIntl';
import moment from 'moment';
import { LINE_ITEM_NIGHT, DATE_TYPE_DATE, propTypes } from '../../util/types';
import { dateFromAPIToLocalNoon } from '../../util/dates';

import css from './BookingBreakdown.module.css';

export const BookingPeriod = props => {
  const { startDate, endDate, dateType, localEndDateRaw, pickupTime, dropoffTime } = props;

  const timeFormatOptions =
    dateType === DATE_TYPE_DATE
      ? {
          weekday: 'long',
        }
      : {
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
        };

  const dateFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  return (
    <>
      <div className={css.bookingPeriod}>
        <div className={css.bookingPeriodSection}>
          <div className={css.dayLabel}>
            <FormattedMessage id="BookingBreakdown.bookingStart" />
          </div>
          <div className={css.dayInfo}>
            <FormattedDate value={startDate} {...timeFormatOptions} />
          </div>
          <div className={css.itemLabel}>
            <FormattedDate value={startDate} {...dateFormatOptions} />
          </div>
          <span>{pickupTime}</span>
        </div>

        <div className={css.bookingPeriodSectionRigth}>
          <div className={css.dayLabel}>
            <FormattedMessage id="BookingBreakdown.bookingEnd" />
          </div>
          <div className={css.dayInfo}>
            <FormattedDate value={localEndDateRaw} {...timeFormatOptions} />
          </div>
          <div className={css.itemLabel}>
            <FormattedDate value={localEndDateRaw} {...dateFormatOptions} />
          </div>
          <span>{dropoffTime}</span>
        </div>
      </div>
    </>
  );
};

const LineItemBookingPeriod = props => {
  const { booking, unitType, dateType, pickupTime, dropoffTime } = props;

  // Attributes: displayStart and displayEnd can be used to differentiate shown time range
  // from actual start and end times used for availability reservation. It can help in situations
  // where there are preparation time needed between bookings.
  // Read more: https://www.sharetribe.com/api-reference/marketplace.html#bookings
  const { start, end, displayStart, displayEnd } = booking.attributes;
  const localStartDate = dateFromAPIToLocalNoon(displayStart || start);
  const localEndDateRaw = dateFromAPIToLocalNoon(displayEnd || end);
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const endDay = isNightly ? localEndDateRaw : moment(localEndDateRaw).subtract(1, 'days');

  return (
    <>
      <div className={css.lineItem}>
        <BookingPeriod
          startDate={localStartDate}
          endDate={endDay}
          localEndDateRaw={localEndDateRaw}
          dateType={dateType}
          pickupTime={pickupTime}
          dropoffTime={dropoffTime}
        />
      </div>
      <hr className={css.totalDivider} />
    </>
  );
};
LineItemBookingPeriod.defaultProps = { dateType: null };

LineItemBookingPeriod.propTypes = {
  booking: propTypes.booking.isRequired,
  dateType: propTypes.dateType,
};

export default LineItemBookingPeriod;
