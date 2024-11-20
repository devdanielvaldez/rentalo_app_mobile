import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';

import { Button, Form, FieldTextInput } from '../../components';
import css from './EditListingPromotionForm.module.css';


export const EditListingPromotionFormComponent = props => (
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
        formId,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;
      // const unitType = config.bookingUnitType;
      // const isNightly = unitType === LINE_ITEM_NIGHT;
      // const isDaily = unitType === LINE_ITEM_DAY;

      // const translationKey = isNightly
      //   ? 'EditListingPricingForm.pricePerNight'
      //   : isDaily
      //   ? 'EditListingPricingForm.pricePerDay'
      //   : 'EditListingPricingForm.pricePerUnit';

      const sevenDaysDiscount = intl.formatMessage({
        id: 'EditListingPromotionsForm.sevenDaysInputLabel',
      });
      const fifteenDaysDiscount = intl.formatMessage({
        id: 'EditListingPromotionsForm.fifteenDaysInputLabel',
      });
      const twentyFiveDaysDiscount = intl.formatMessage({
        id: 'EditListingPromotionsForm.twentyFiveDaysInputLabel',
      });
      // const priceRequired = validators.required(
      //   intl.formatMessage({
      //     id: 'EditListingPricingForm.priceRequired',
      //   })
      // );
      // const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      // const minPriceRequired = validators.moneySubUnitAmountAtLeast(
      //   intl.formatMessage(
      //     {
      //       id: 'EditListingPricingForm.priceTooLow',
      //     },
      //     {
      //       minPrice: formatMoney(intl, minPrice),
      //     }
      //   ),
      //   config.listingMinimumPriceSubUnits
      // );
      // const priceValidators = config.listingMinimumPriceSubUnits
      //   ? validators.composeValidators(priceRequired, minPriceRequired)
      //   : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      // const instantBookingOptions = findOptionsForSelectFilter(
      //   'instantBooking',
      //   config.custom.filters
      // );

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
          <h2>
          Proporciona descuentos especiales a tus conductores según la duración de la renta, una estrategia comprobada para atraer 
          una mayor demanda. Con descuentos para rentas de 7 días o más, 15 días o más, y 25 días o más, puedes incentivar a los 
          conductores a alquilar por períodos más largos, aumentando así la ocupación y optimizando tus ingresos.
          
          {' '}
          </h2>
          <div className={css.rowBox}>
            <FieldTextInput
              className={css.inputBox}
              type="number"
              id={formId ? `${formId}.sevenDayDiscount` : 'sevenDayDiscount'}
              name="sevenDayDiscount"
              label={sevenDaysDiscount}
              // placeholder={emailPlaceholder}
              placeholder="0 $"
            />

            <FieldTextInput
              className={css.inputBox}
              type="number"
              id={formId ? `${formId}.fifteenDaysDiscount` : 'fifteenDaysDiscount'}
              name="fifteenDaysDiscount"
              label={fifteenDaysDiscount}
              // placeholder={emailPlaceholder}
              placeholder="0 $"
            />
          </div>
          <div className={css.rowBox}>
            <FieldTextInput
              className={css.inputBox}
              type="number"
              id={formId ? `${formId}.twentyFiveDaysDiscount` : 'twentyFiveDaysDiscount'}
              name="twentyFiveDaysDiscount"
              label={twentyFiveDaysDiscount}
              // placeholder={emailPlaceholder}
              placeholder="0 $"
            />
          </div>
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

EditListingPromotionFormComponent.defaultProps = { fetchErrors: null };

EditListingPromotionFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingPromotionFormComponent);
