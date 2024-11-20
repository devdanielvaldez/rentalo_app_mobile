import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldSelect } from '../../components';
import css from './EditListingDetailsForm.module.css';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';

const EditListingDetailsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        fieldId,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
      const transmissionOptions = config.custom.transmission;
      const fuelOptions = config.custom.fuel;

      // transmission
      const transmissionLabel = intl.formatMessage({ id: 'EditListingDetailsForm.transmission' });
      const transmissionPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.transmissionPlaceholder',
      });
      const transmissionRequired = intl.formatMessage({
        id: 'EditListingDetailsForm.transmissionRequired',
      });

      // category
      const categoryLabel = intl.formatMessage({ id: 'EditListingDetailsForm.category' });
      const categoryPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.categoryPlaceholder',
      });

      const categoryRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.categoryRequired',
      });

      // fuel
      const fuelLabel = intl.formatMessage({ id: 'EditListingDetailsForm.fuel' });
      const fuelPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.fuelPlaceholder',
      });
      const fuelRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.fuelRequired',
      });

      // seat
      const seatLabel = intl.formatMessage({ id: 'EditListingDetailsForm.seat' });
      const seatPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.seatPlaceholder',
      });
      const seatRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.seatRequiredMessage',
      });

      // door
      const doorLabel = intl.formatMessage({ id: 'EditListingDetailsForm.door' });
      const doorPlaceholder = intl.formatMessage({
        id: 'EditListingDetailsForm.doorPlaceholder',
      });
      const doorRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.doorRequiredMessage',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <div className={css.rowBox}>
            <FieldSelect
              id={`${fieldId}.category`}
              name="category"
              className={css.inputBox}
              label={categoryLabel}
              placeholder={categoryPlaceholderMessage}
              validate={composeValidators(required(categoryRequiredMessage))}
            >
              <option value="">Por favor, selecciona la categoría</option>

              {categoryOptions.map((item, index) => (
                <option value={item.key}>{item.label}</option>
              ))}
            </FieldSelect>

            <FieldSelect
              id={`${fieldId}.transmission`}
              name="transmission"
              className={css.inputBox}
              label={transmissionLabel}
              placeholder={transmissionPlaceholder}
              validate={composeValidators(required(transmissionRequired))}
            >
              <option value="">Por favor, selecciona la transmisión</option>
              {transmissionOptions.map((item, index) => (
                <option value={item.key}>{item.label}</option>
              ))}
            </FieldSelect>
          </div>
          <div className={css.rowBox}>
            <FieldSelect
              id={`${fieldId}.fuel`}
              name="fuel"
              className={css.inputBox}
              label={fuelLabel}
              placeholder={fuelPlaceholderMessage}
              validate={composeValidators(required(fuelRequiredMessage))}
            >
              <option value="">Por favor, selecciona el tipo de combustible</option>

              {fuelOptions.map((item, index) => (
                <option value={item.key}>{item.label}</option>
              ))}
            </FieldSelect>

            <FieldTextInput
              id="seat"
              name="seat"
              className={css.inputBox}
              type="text"
              label={seatLabel}
              placeholder={seatPlaceholder}
              validate={composeValidators(required(seatRequiredMessage))}
            />
          </div>
          <FieldTextInput
            id="door"
            name="door"
            className={css.inputBox}
            type="text"
            label={doorLabel}
            placeholder={doorPlaceholder}
            validate={composeValidators(required(doorRequiredMessage))}
          />
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

EditListingDetailsFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDetailsFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDetailsFormComponent);
