import React, { Component, useEffect } from 'react';
import { string, bool, arrayOf, array, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import moment from 'moment';
import config from '../../config';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import {
  Form,
  IconSpinner,
  PrimaryButton,
  FieldDateRangeInput,
  FieldSelect,
  FieldTextInput,
} from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.module.css';
// import { PROFILE } from '../../marketplace-custom-config';
import {
  // getNoticePeriodTime,
  // getPaymentMethod,
  getReferralCode,
} from '../../util/dataExtractors';

const GRACE_PERIOD = process.env.REACT_APP_BOOKING_GRACE_PERIOD ?? 0;

const showNoCreditStyles = {
  color: 'red',
  margin: '5px 0',
  fontSize: '14px',
  fontWeight: 'normal',
};

const time = [
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const options = [
  { key: 'none', label: '---' },
  { key: 'promotional-voucher', label: 'Tengo un cupón promocional' },
  // { key: 'available-credits', label: 'Quiero usar mis créditos disponibles' },
];

const dateFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
};

const identity = v => v;

const voucherExistAndValid = voucher => {
  return (
    voucher &&
    voucher.active &&
    typeof voucher.redemption.quantity === 'number' &&
    voucher.redemption.quantity > voucher.redemption.redeemed_quantity
  );
};

const getBookingEndHourByDate = (transactions = [], passedDate) => {
  const targetDate = new Date(passedDate);
  const year = targetDate.getUTCFullYear();
  const month = targetDate.getUTCMonth();
  const date = targetDate.getUTCDate();

  const transaction = transactions.find(transaction => {
    const bookingEnd = new Date(transaction.booking.attributes.end);

    return (
      bookingEnd.getUTCFullYear() === year &&
      bookingEnd.getUTCMonth() === month &&
      bookingEnd.getUTCDate() === date
    );
  });

  if (transaction) {
    const { dropTime } = transaction.attributes.metadata?.bookingTime?.pickUpTime || {};

    if (dropTime) {
      let [pickUpHour, pickUpMinute] = dropTime.split(':').map(Number);
      pickUpHour += +GRACE_PERIOD;

      if (pickUpHour >= 24) {
        pickUpHour = pickUpHour - 24;
      }

      return pickUpHour;
    }

    return null;
  }

  return null;
};

const timeToNumber = timeString => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 100 + minutes; // Converts "HH:MM" into HHMM format as a number (e.g., 400 for "04:00")
};

const getFirstAvailableTimeIndex = (hour, timeArray) => {
  const formattedHour = `${String(hour).padStart(2, '0')}:00`; // Format the hour to "HH:00"

  return timeArray.indexOf(formattedHour);
};

const removeUnavailableTimes = (hour, timeArray) => {
  if (!hour) {
    return timeArray;
  }
  const formattedHour = timeToNumber(`${String(hour).padStart(2, '0')}:00`);

  return timeArray.filter(timeSlot => timeToNumber(timeSlot) >= formattedHour);
};

const subtractOneDay = date => {
  return moment(date)
    .subtract(1, 'days')
    .toDate();
};

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null, show: false, showNoCredit: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }
  showMessage = () => {
    setTimeout(() => this.setState({ show: false }), 3000);
    clearTimeout();
  };

  showNoCreditMessage = () => {
    setTimeout(() => this.setState({ showNoCredit: false }), 3000);
    clearTimeout();
  };

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      e.bookingDates.endDate = subtractOneDay(e.bookingDates.endDate);
      this.props.onSubmit(e);
    }
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues, form) {
    const { pickUpTime, dropTime, promotion, voucherCode } = formValues?.values;
    const { startDate, endDate } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};
    const {
      authorId,
      listingId,
      voucherValid: voucher,
      isOwnListing,
      currentUser,
      fetchLineItemsInProgress,
      onFetchTransactionLineItems,
    } = this.props;

    const refferralCode = getReferralCode(currentUser);
    if (refferralCode && formValues?.values?.promotion == 'available-credits') {
      form.change('refferralCode', refferralCode);
    }

    const voucherPromotion =
      voucher && formValues?.values?.promotion === 'promotional-voucher' ? voucher : null;

    if (startDate && endDate && !fetchLineItemsInProgress) {
      onFetchTransactionLineItems({
        bookingData: {
          startDate,
          endDate: subtractOneDay(endDate),
          pickUpTime,
          dropTime,
          promotion,
          refferralCode: refferralCode,
          voucher: voucherPromotion,
          authorId,
        },
        listingId,
        isOwnListing,
        // promotion: refferralCode ? formValues?.values?.promotion : null,
      });
    } else if (
      startDate &&
      endDate &&
      !fetchLineItemsInProgress &&
      !refferralCode &&
      !voucherCode
    ) {
      if (
        formValues.values &&
        formValues.values?.promotion == 'available-credits' &&
        !refferralCode
      ) {
        this.setState({ showNoCredit: true });
        this.showNoCreditMessage();
      }
      onFetchTransactionLineItems({
        bookingData: {
          startDate,
          endDate: subtractOneDay(endDate),
          pickUpTime,
          dropTime,
          voucher,
          authorId,
        },
        listingId,
        isOwnListing,
      });
    }
  }

  onApplyCoupon = values => {
    const { voucherCode = null, promotion, bookingDates, pickUpTime, dropTime } = values;
    const {
      onValidateVoucher,
      listingId,
      isOwnListing,
      fetchLineItemsInProgress,
      onFetchTransactionLineItems,
      authorId,
    } = this.props;
    const { startDate, endDate } = bookingDates ?? {};

    if (voucherCode) {
      onValidateVoucher({ code: voucherCode }).then(res => {
        if (voucherExistAndValid(res) && startDate && endDate && !fetchLineItemsInProgress) {
          onFetchTransactionLineItems({
            bookingData: {
              startDate,
              endDate: subtractOneDay(endDate),
              voucher: res,
              promotion,
              authorId,
              pickUpTime,
              dropTime,
            },
            listingId,
            isOwnListing,
          });
        }
      });
    }
  };

  render() {
    const { rootClassName, className, price: unitPrice, noticePeriod, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }
    const today = new Date();
    const currentHours = today.getHours();
    const validateTime = currentHours; //notice period removed for now  + parseInt(noticePeriod);
    const filterTime = time.filter(time => parseInt(time) > validateTime);

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
            listing,
            isBookingPanelForm,
            // currentUser,
            isExtend,
            isApprovedToDrive,
            form,
            voucherValid,
            voucherInProgress,
            voucherRequested,
            transactions,
          } = fieldRenderProps;
          const selectedDate = values?.bookingDates?.startDate;
          const currentDate = new Date();
          const validateDate =
            moment(currentDate).format('dddd,MMMM Do') ===
            moment(selectedDate).format('dddd,MMMM Do');

          useEffect(() => {
            const bookingEndTime = getBookingEndHourByDate(transactions, selectedDate);
            const timeList = validateDate ? filterTime : time;

            if (!bookingEndTime) {
              form.change('pickUpTime', timeList[0]);
              form.change('dropTime', timeList[0]);
            } else {
              const indexOfTime = getFirstAvailableTimeIndex(bookingEndTime, timeList);
              if (indexOfTime !== -1) {
                form.change('pickUpTime', timeList[indexOfTime]);
                form.change('dropTime', timeList[indexOfTime]);
              } else {
                form.change('pickUpTime', timeList[0]);
                form.change('dropTime', timeList[0]);
              }
            }
          }, [selectedDate]);

          const nonBookingStart = moment().format('24:00');
          const nonBookingEnd = moment().format('07:00');
          const instantBooking = listing.attributes?.publicData?.instantBooking;
          const nonBookingTime =
            nonBookingStart > moment().format('HH:mm') && nonBookingEnd < moment().format('HH:mm');
          const isNonBookingTime = !nonBookingTime && instantBooking == 'yes';
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingEndTitle',
          });
          const requiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.requiredDate',
          });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          const promotionsAndCreditsLabel = intl.formatMessage({
            id: 'bookingTimeForm.promotionsAndCredits',
          });
          const promotionsAndVoucherLabel = intl.formatMessage({
            id: 'bookingTimeForm.promotionsAndVoucher',
          });

          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data.
          // Note: lineItems are calculated and fetched from FTW backend
          // so we need to pass only booking data that is needed otherwise
          // If you have added new fields to the form that will affect to pricing,
          // you need to add the values to handleOnChange function

          const bookingData =
            startDate && endDate
              ? {
                  unitType,
                  startDate,
                  endDate: subtractOneDay(endDate),
                  pickUpTime: values?.pickUpTime,
                  dropTime: values?.dropTime,
                }
              : null;

          const showEstimatedBreakdown =
            bookingData && lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;

          const bookingInfoMaybe = showEstimatedBreakdown ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} lineItems={lineItems} />
            </div>
          ) : null;
          const loadingSpinnerMaybe = fetchLineItemsInProgress ? (
            <IconSpinner className={css.spinner} />
          ) : null;

          const bookingInfoErrorMaybe = fetchLineItemsError ? (
            <span className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.fetchLineItemsError" />
            </span>
          ) : null;

          const voucherDoesNotExist =
            (voucherValid && !voucherExistAndValid(voucherValid)) ||
            (!voucherValid && voucherRequested) ? (
              <span className={css.sideBarError}>
                <FormattedMessage id="BookingDatesForm.voucherDoesNotExist" />
              </span>
            ) : null;

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const selectTime = removeUnavailableTimes(
            getBookingEndHourByDate(transactions, selectedDate),
            validateDate ? filterTime : time
          );

          const submitMsg = instantBooking
            ? 'BookingDatesForm.instantBook'
            : 'BookingDatesForm.requestToBook';

          return (
            <Form onSubmit={handleSubmit} className={classes} enforcePagePreloadFor="CheckoutPage">
              {timeSlotsError}
              <FormSpy
                subscription={{ values: true }}
                onChange={values => {
                  this.handleOnChange(values, form);
                }}
              />
              {isNonBookingTime ? (
                <p style={{ color: 'red' }}>
                  No puedes reservar la Reserva Instantánea entre las 12:00 a. m. y las 7:00 a. m.
                </p>
              ) : null}
              <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={unitType}
                startDateId={`${formId}.bookingStartDate`}
                startDateLabel={bookingStartLabel}
                startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`${formId}.bookingEndDate`}
                endDateLabel={bookingEndLabel}
                endDatePlaceholderText={endDatePlaceholderText}
                focusedInput={this.state.focusedInput}
                onFocusedInputChange={this.onFocusedInputChange}
                format={identity}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(requiredMessage),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                )}
                disabled={fetchLineItemsInProgress}
                showBorders={true}
                isBookingPanelForm={isBookingPanelForm}
              />
              {!isExtend && (
                <div className={css.bookingTimeContainer}>
                  <div className={css.bookingTime}>
                    <FieldSelect
                      id="pickUpTime"
                      name="pickUpTime"
                      //  disabled={disabled}
                      className={css.field}
                      label="Hora de recogida"
                    >
                      {selectTime.map(time => (
                        <option key={time} value={time}>
                          {time} {parseInt(time) < 12 ? 'AM' : 'PM'}
                        </option>
                      ))}
                    </FieldSelect>
                  </div>
                  <div className={css.bookingTime}>
                    <FieldSelect
                      id="dropTime"
                      name="dropTime"
                      // disabled={!values.pickUpTime}
                      className={css.field}
                      label="Hora de entrega"
                    >
                      {time.map(time => (
                        <option key={time} value={time}>
                          {time} {parseInt(time) < 12 ? 'AM' : 'PM'}
                        </option>
                      ))}
                    </FieldSelect>
                  </div>
                </div>
              )}
              {!isExtend && (
                <div className={css.promoCredits}>
                  {isOwnListing ? (
                    <></>
                  ) : (
                    <FieldSelect
                      id="promotion"
                      name="promotion"
                      //  disabled={disabled}
                      className={css.field}
                      label={promotionsAndCreditsLabel}
                      //  validate={countryRequired}
                    >
                      {options.map(c => (
                        <option key={c?.key} value={c?.key}>
                          {c.label}
                        </option>
                      ))}
                    </FieldSelect>
                  )}
                  {this.state.show ? (
                    <p style={showNoCreditStyles}>Por favor ingrese un código de cupón válido</p>
                  ) : null}
                  {this.state.showNoCredit ? (
                    <p style={showNoCreditStyles}>No hay crédito disponible</p>
                  ) : null}
                  {values?.promotion == 'promotional-voucher' ? (
                    <>
                      <FieldTextInput
                        id="voucherCode"
                        name="voucherCode"
                        label={promotionsAndVoucherLabel}
                        className={css.field}
                        placeholder="Código de cupón"
                      />
                      <PrimaryButton
                        inProgress={voucherInProgress}
                        type="button"
                        onClick={() => this.onApplyCoupon(values)}
                        disabled={!values?.voucherCode}
                      >
                        Aplicar cupón{' '}
                      </PrimaryButton>
                    </>
                  ) : null}
                </div>
              )}
              {bookingInfoMaybe}
              {loadingSpinnerMaybe}
              {bookingInfoErrorMaybe}
              {/* {voucherErrorMaybe} */}
              {voucherDoesNotExist}

              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              {!isApprovedToDrive && (
                <p className={css.smallPrint}>
                  <span
                    className={css.link}
                    onClick={e => {
                      const currentPath = window.location.pathname;
                      localStorage.setItem('currentPath', currentPath);
                      window.location.href = '/verification/driver';
                    }}
                  >
                    <p>
                      <span className={css.btnLink}>Obtener la aprobación</span> para conducir
                    </p>
                  </span>
                </p>
              )}
              <div className={submitButtonClasses}>
                {!isExtend ? (
                  <PrimaryButton
                    type="submit"
                    disabled={
                      !isApprovedToDrive || isOwnListing || isNonBookingTime || !values.pickUpTime
                    }
                  >
                    <FormattedMessage id={submitMsg} />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton type="submit">
                    <FormattedMessage id={submitMsg} />
                  </PrimaryButton>
                )}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
