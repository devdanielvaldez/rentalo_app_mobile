import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import arrayMutators from 'final-form-arrays';

import { Form, Button, FieldSelect, FieldCheckboxGroup } from '../../components';
import css from './EditListingPoliciesForm.module.css';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';

export const EditListingPoliciesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        name,
        invalid,
        fieldId,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const minimumTripOption = config.custom.minimumTripDays;
      const maximumTripOption = config.custom.maximumTripDays;
      const options = findOptionsForSelectFilter('carrules', filterConfig);

      // minimum trip
      const minimumTripLabel = intl.formatMessage({ id: 'EditListingCarRulesForm.minimumTrip' });
      const minimumTripPlaceholder = intl.formatMessage({
        id: 'EditListingCarRulesForm.minimumTripPlaceholder',
      });
      // const transmissionRequired = intl.formatMessage(
      //   intl.formatMessage({
      //     id: 'EditListingDetailsForm.transmissionRequired',
      //   })
      // );

      // maximum trip
      const maximumTripLabel = intl.formatMessage({ id: 'EditListingCarRulesForm.maximumTrip' });
      const maximumTripPlaceholderMessage = intl.formatMessage({
        id: 'EditListingCarRulesForm.maximumTripPlaceholder',
      });
      // const categoryRequiredMessage = intl.formatMessage({
      //   id: "EditListingDetailsForm.categoryRequired",
      // });

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPoliciesForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <div>
            <div className={css.rowBox}>
              <FieldSelect
                id={`${fieldId}.minimumTrip`}
                name="minimumTrip"
                className={css.inputBox}
                label={minimumTripLabel}
                placeholder={minimumTripPlaceholder}
                // validate={countryRequired}
              >
                <option value="">Por favor, selecciona la opción</option>
                {minimumTripOption.map((item, index) => (
                  <option value={item.key}>{item.label}</option>
                ))}
              </FieldSelect>

              <FieldSelect
                id={`${fieldId}.maximumTrip`}
                name="maximumTrip"
                className={css.inputBox}
                label={maximumTripLabel}
                placeholder={maximumTripPlaceholderMessage}
                // validate={countryRequired}
              >
                <option value="">Por favor, selecciona la opción</option>
                {maximumTripOption.map((item, index) => (
                  <option value={item.key}>{item.label}</option>
                ))}
              </FieldSelect>
            </div>
            <div className={css.box}>
              <FieldCheckboxGroup
                className={css.features}
                id={name}
                name={name}
                options={options}
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
          </div>
        </Form>
      );
    }}
  />
);

EditListingPoliciesFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
  filterConfig: config.custom.filters,
};

EditListingPoliciesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPoliciesFormComponent);
