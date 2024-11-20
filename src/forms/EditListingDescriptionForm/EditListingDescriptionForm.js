import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const format = value => {
  if (!value) {
    return value;
  }

  const inputValue = value.replace(/\D/g, ''); // Remove non-numeric characters
  const minValue = Math.min(inputValue.length, 11);
  let formattedValue = '';
  for (let i = 0; i < minValue; i++) {
    if (i === 3 || i === 10) {
      formattedValue += '-';
    }
    formattedValue += inputValue[i];
  }
  return formattedValue;
};

const compareVehicle = (verifyVehicle, chassis) => {
  if (!verifyVehicle || !chassis) {
    return null;
  }
  const { model, make, licensePlate } = verifyVehicle ?? {};
  const { model: chassisModel, make: chassisMake, licensePlate: chassisLicensePlate } =
    chassis ?? {};

  return [model === chassisModel, make === chassisMake, licensePlate === chassisLicensePlate];
};

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        handleSubmit,
        intl,
        form,
        saveActionMsg,
        updateInProgress,
        fetchErrors,
        values,
        handleVerifyVehicle,
        handleVerifyChassis,
        handleVerifyMarketValue,
        verifyVehicle,
        verifyVehicleError,
        verifyVehicleInProgress,
        chassis,
      } = formRenderProps;

      const { color: chassisColor, model: chassisModel, make: chassisMake, year: chassisYear } =
        chassis ?? {};
      const { color, model, make, year, isFetched } = verifyVehicle ?? {};

      const vehicleValues = verifyVehicle
        ? verifyVehicle
        : { model: values.model, make: values.make, licensePlate: values.licensePlate };

      const compareResult = compareVehicle(vehicleValues, chassis);
      const [resultModel, resultMake, licensePlate] = Array.isArray(compareResult)
        ? compareResult
        : [];

      const showFields = vehicleValues.make;
      const disableBtn = !values.chassis || !values.identification || !values.licenseplate;

      // licensePlate
      const licensePlateMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.licensePlate',
      });
      const licensePlatePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.licensePlatePlaceholder',
      });
      const licensePlateRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.licensePlateRequired',
      });

      // Chassis
      const chassisMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.chassisPlate',
      });
      const chassisPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.chassisPlaceholder',
      });
      const chassisRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.chassisRequired',
      });

      // Identification
      const identificationMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.identification',
      });
      const lidentificationPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.identificationPlaceholder',
      });
      const identificationRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.identificationRequired',
      });

      // make
      const makeMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.make' });
      const makePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.makePlaceholder',
      });
      const makeRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.makeRequired',
      });

      // model
      const modelMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.model' });
      const modelPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.modelPlaceholder',
      });
      const modelRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.modelRequired',
      });

      // year
      const yearMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.year' });
      const yearPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.yearPlaceholder',
      });
      const yearRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.yearRequired',
      });

      // color
      const colorMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.color' });
      const colorPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.colorPlaceholder',
      });
      const colorRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.colorRequired',
      });

      // marketValue
      // const marketValueMessage = intl.formatMessage({
      //   id: 'EditListingDescriptionForm.marketValue',
      // });
      // const marketValuePlaceholderMessage = intl.formatMessage({
      //   id: 'EditListingDescriptionForm.marketValuePlaceholder',
      // });
      // const marketValueRequiredMessage = intl.formatMessage({
      //   id: 'EditListingDescriptionForm.marketValueRequired',
      // });

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

      // TODO:
      const errorMessageModel =
        chassis && !resultModel ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.errorMessageModel" />
          </p>
        ) : null;
      const errorMessageMake =
        chassis && !resultMake ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.errorMessageMake" />
          </p>
        ) : null;
      const errorMessageLicensePlate =
        chassis && !licensePlate ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.errorMessageLicensePlate" />
          </p>
        ) : null;

      const classes = classNames(css.root, className);
      const submitInProgress = updateInProgress;
      // const submitDisabled = invalid || disabled || submitInProgress || verifyVehicleError;
      // const verifyDisabled = !values.licensePlate && !values.identification && !values?.chassis;

      if (
        (model || chassisModel) &&
        (year || chassisYear) &&
        (color || chassisColor) &&
        (make || chassisMake)
      ) {
        form.batch(() => {
          form.change('model', model ?? chassisModel);
          form.change('year', year ?? chassisYear);
          form.change('color', color ?? chassisColor);
          form.change('make', make ?? chassisMake);
          form.change('isFetched', isFetched);
        });
      }

      if (verifyVehicleError) {
        form.change('isFetched', null);
      }

      const handleAllVerifications = async () => {
        await handleVerifyVehicle({
          licenseplate: values?.licenseplate,
          identification: values?.identification,
        });
        await handleVerifyChassis(values?.chassis);
        await handleVerifyMarketValue(values?.licenseplate);
      };

      const submit = async () => {
        if (!showFields) {
          const vehicle = await handleVerifyVehicle({
            licenseplate: values?.licenseplate,
            identification: values?.identification,
          });
          // const chassis = await handleVerifyChassis(chassis);

          // const compareResult = compareVehicle(vehicle, chassis);
          // const [resultModel, resultMake, resultYear] = Array.isArray(compareResult)
          //   ? compareResult
          //   : [];

          if (vehicle) {
            handleSubmit(values);
          }
        } else {
          handleSubmit(values);
        }
      };

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          {errorMessageModel}
          {errorMessageMake}
          {errorMessageLicensePlate}

          <div className={css.rowBox}>
            <FieldTextInput
              id="licenseplate"
              name="licenseplate"
              className={css.inputBox}
              type="text"
              label={licensePlateMessage}
              placeholder={licensePlatePlaceholderMessage}
              validate={composeValidators(required(licensePlateRequiredMessage))}
            />

            <FieldTextInput
              id="identification"
              name="identification"
              className={css.inputBox}
              type="text"
              label={identificationMessage}
              placeholder={lidentificationPlaceholderMessage}
              validate={composeValidators(required(identificationRequiredMessage))}
              format={format}
              parse={format}
            />
          </div>
          <div className={css.rowBox}>
            <FieldTextInput
              id="chassis"
              name="chassis"
              className={css.inputBox}
              type="text"
              label={chassisMessage}
              placeholder={chassisPlaceholderMessage}
              validate={required(chassisRequiredMessage)}
            />
          </div>
          <div className={css.rowBox} style={{ flexDirection: 'column' }}>
            <Button
              className={css.verifytButton}
              disabled={disableBtn}
              type="button"
              inProgress={verifyVehicleInProgress}
              onClick={handleAllVerifications}
            >
              <FormattedMessage id="EditListingDescriptionForm.verifyButton" />
            </Button>
            {verifyVehicleError && verifyVehicleError.message ? (
              <p className={css.errorMessage}>{verifyVehicleError.message}</p>
            ) : verifyVehicleError ? (
              <p className={css.errorMessage}>
                {' '}
                No podemos encontrar los detalles, favor verifique su placa y cédula / RNC.{' '}
              </p>
            ) : null}
          </div>

          {showFields ? (
            <>
              <div className={css.rowBox}>
                <FieldTextInput
                  id="make"
                  name="make"
                  disabled={verifyVehicle?.make}
                  className={css.inputBox}
                  type="text"
                  label={makeMessage}
                  placeholder={makePlaceholderMessage}
                  validate={composeValidators(required(makeRequiredMessage))}
                />

                <FieldTextInput
                  id="model"
                  name="model"
                  disabled={verifyVehicle?.model}
                  className={css.inputBox}
                  type="text"
                  label={modelMessage}
                  placeholder={modelPlaceholderMessage}
                  validate={composeValidators(required(modelRequiredMessage))}
                />
              </div>

              <div className={css.rowBox}>
                <FieldTextInput
                  id="year"
                  name="year"
                  disabled={!values.licensePlate && !values.identification}
                  className={css.inputBox}
                  type="text"
                  label={yearMessage}
                  placeholder={yearPlaceholderMessage}
                  validate={composeValidators(required(yearRequiredMessage))}
                />

                <FieldTextInput
                  id="color"
                  name="color"
                  disabled={!values.licensePlate && !values.identification}
                  className={css.inputBox}
                  type="text"
                  label={colorMessage}
                  placeholder={colorPlaceholderMessage}
                  validate={composeValidators(required(colorRequiredMessage))}
                />
              </div>
            </>
          ) : null}
          {/* {!values?.isFetched || verifyVehicleError ? (
            <div className={css.rowBox}>
              <FieldTextInput
                id="marketValue"
                name="marketValue"
                disabled={!values.licensePlate && !values.identification}
                className={css.inputBox}
                type="number"
                label={marketValueMessage}
                placeholder={marketValuePlaceholderMessage}
                validate={composeValidators(required(marketValueRequiredMessage))}
              />
            </div>
          ) : null} */}
          {/*================api data fields end==== =================*/}

          <Button
            className={css.submitButton}
            type="button"
            inProgress={submitInProgress}
            onClick={submit}
            disabled={disableBtn}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };
EditListingDescriptionFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingDescriptionFormComponent);
