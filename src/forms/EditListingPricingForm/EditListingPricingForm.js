import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  // autocompleteSearchRequired,
  // autocompletePlaceSelected,
  composeValidators,
  required,
} from '../../util/validators';
import { Button, Form, FieldCurrencyInput, FieldSelect, FieldTextInput } from '../../components';
// import { findOptionsForSelectFilter } from '../../util/search';
import css from './EditListingPricingForm.module.css';

const { Money } = sdkTypes;
const delivery = [
  { key: 'yes', value: 'Si' },
  { key: 'no', value: 'No' },
];

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        formId,
        // form,
        values,
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;
      const noticPeriodLabel = intl.formatMessage({
        id: 'EditListingPricingForm.noticePeriodInputLabel',
      });
      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      // if (values?.instantBooking === 'yes') {
      //   form.batch(() => {
      //     form.change('noticPeriod', 4 );
      //   });
      // }

      const instantBookingOptions = [
        { key: 'yes', label: 'Si' },
        { key: 'No', label: 'No' },
      ];
      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}

          <div className={css.rowBox}>
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.inputBox}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />

            <FieldSelect
              className={css.inputBox}
              name={'instantBooking'}
              id={'instantBooking'}
              label={'Reserva instantánea?'}
              validate={composeValidators(required('Necesitas seleccionar una opción'))}
            >
              <option disabled value="">
                {'Selecciona una opción'}
              </option>
              {instantBookingOptions.map(c => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </FieldSelect>
          </div>
          <div className={css.rowBox}>
            <FieldTextInput
              className={css.inputBox}
              type="number"
              id={formId ? `${formId}.noticPeriod` : 'noticPeriod'}
              name="noticPeriod"
              label={noticPeriodLabel}
              placeholder="Período de aviso"
            />

            <FieldSelect
              className={css.inputBox}
              name={'homeDelivery'}
              id={'homeDelivery'}
              label={'Home Delivery'}
              validate={composeValidators(required('Necesitas seleccionar una opción'))}
            >
              <option disabled value="">
                {'Selecciona una opción'}
              </option>
              {delivery.map(c => (
                <option key={c.key} value={c.key}>
                  {c.value}
                </option>
              ))}
            </FieldSelect>
          </div>
          {values.instantBooking == "yes" && values.noticPeriod < 4 ? <p style={{color:'red'}}>Por favor, añade un período de aviso de más de 4 horas</p> : null }

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
