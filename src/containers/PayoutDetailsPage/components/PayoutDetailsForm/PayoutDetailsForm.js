import React from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from '../../../../util/reactIntl';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';

import * as validators from '../../../../util/validators';
import { FieldSelect, Form, FieldTextInput, Button } from '../../../../components';

import css from './PayoutDetailsForm.module.css';

const countriesList = [
  "Dominican Republic",
  "United States",
  "Spain",
  "Mexico",
  "France",
  "Germany",
  "Greece",
  "Ireland",
  "Italy",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Sweden",
  "Switzerland",
];


const PayoutDetailsFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        handleSubmit,
        intl,
        banks,
        banksInProgress,
        values,
        onGetOdooBanks,
        pristine,
        invalid,
        submitInProgress,
        attachBankToAccountInProgress,
        bankAccountId,
        attachBankToAccountSuccess,
        form,
      } = fieldRenderProps;

      const classes = classNames(css.root, className);

      const { country, routingNumber, bankAccountNumber, iban, banksNames } = values;

      const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
      const countryPlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.countryPlaceholder',
      });
      const countryRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.countryRequired',
        })
      );

      const routingNumberLabel = intl.formatMessage({ id: 'PayoutDetailsForm.routingNumberLabel' });
      const routingNumberPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.routingNumberPlaceholder' });

      const bankAccountNumberLabel = intl.formatMessage({ id: 'PayoutDetailsForm.bankAccountNumberLabel' });
      const bankAccountNumberPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.bankAccountNumberPlaceholder' });

      const banksNamesLabel = intl.formatMessage({ id: 'PayoutDetailsForm.banksNamesLabel' });
      const bankNamePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.bankNamePlaceholder' });

      const ibanLabelIntlId = country === "Mexico"
        ? "PayoutDetailsForm.ibanMexicoLabel"
        : country === "New Zealand"
        ? "PayoutDetailsForm.ibanNewZealandLabel"
        : "PayoutDetailsForm.ibanLabel";
      const ibanLabel = intl.formatMessage({ id: ibanLabelIntlId });
      const ibanPlaceholder = intl.formatMessage({ id: "PayoutDetailsForm.ibanPlaceholder" });

      const routingNumberRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.routingNumberRequired',
        })
      );
      const routingNumberValid = validators.routingNumber(
        intl.formatMessage({
          id: 'PayoutDetailsForm.routingNumberValid',
        })
      );
      const bankAccountNumberRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.bankAccountNumberRequired',
        })
      );
      const bankAccountNumberValid = validators.bankAccountNumber(
        intl.formatMessage({
          id: 'PayoutDetailsForm.bankAccountNumberValid',
        })
      );
      const banksNamesRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.banksNamesRequired',
        })
      );

      const ibanNumberRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.ibanNumberRequired',
        })
      );

      const ibanNumberValid = validators.isValidIBAN(
        intl.formatMessage({
          id: 'PayoutDetailsForm.ibanValid',
        })
      );

      const onChange = (formValues) => {
        if (
          formValues.values.country === "Dominican Republic" &&
          formValues.values.country !== country
        ) {
          onGetOdooBanks();
        }
        if (formValues.values.country !== country) {
          form.batch(() => {
            if (routingNumber?.includes("●")) {
              form.change('routingNumber', undefined);
            }
            if (bankAccountNumber?.includes("●")) {
              form.change('bankAccountNumber', undefined);
            }
            if (iban?.includes("●")) {
              form.change('iban', undefined);
            }
          });
        }
      }

      const showOdooBanks = country === "Dominican Republic" && banks.length;
      const showBankAccountFields = country === "United States";
      const showIBAN =
        country &&
        country !== "United States" &&
        country !== "Dominican Republic";
      const showBanksLoading = country === "Dominican Republic" && banksInProgress;

      const disableValidation =
        routingNumber && routingNumber.includes("●") ||
        bankAccountNumber && bankAccountNumber.includes("●") ||
        iban && iban.includes("●");

      const submitDisabled = pristine || invalid || submitInProgress || banksInProgress || disableValidation;

      return (
        <Form
          className={classes}
          onSubmit={(values) => {
            handleSubmit(values).then(() => form.reset({
              country: country,
              routingNumber: routingNumber ? "●●●●●●●●●●" : undefined,
              bankAccountNumber: bankAccountNumber ? "●●●●●●●●●●" : undefined,
              iban: iban ? "●●●●●●●●●●" : undefined,
              banksNames: banksNames,
            }))
          }}
        >
          <FormSpy onChange={onChange} subscription={{ values: true }} />
          <div className={css.sectionContainer}>
            <h3 className={css.subTitle}>
              <FormattedMessage id="PayoutDetailsForm.payoutDetails" />
            </h3>

            <FieldSelect
              id="country"
              name="country"
              className={css.selectCountry}
              autoComplete="country"
              label={countryLabel}
              validate={countryRequired}
            >
              <option disabled value="">
                {countryPlaceholder}
              </option>
              {countriesList.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </FieldSelect>

            {showBanksLoading ? <p>Cargando...</p> : null}

            {showBankAccountFields ? <>
              <FieldTextInput
                id="routingNumber"
                name="routingNumber"
                className={css.field}
                type="text"
                label={routingNumberLabel}
                placeholder={routingNumberPlaceholder}
                validate={validators.composeValidators(routingNumberRequired, routingNumberValid)}
              />
              <FieldTextInput
                id="bankAccountNumber"
                name="bankAccountNumber"
                className={css.field}
                type="text"
                label={bankAccountNumberLabel}
                placeholder={bankAccountNumberPlaceholder}
                validate={validators.composeValidators(bankAccountNumberRequired, bankAccountNumberValid)}
              />
            </> : null}

            {showIBAN ? (
              <FieldTextInput
                id="iban"
                name="iban"
                className={css.field}
                type="text"
                label={ibanLabel}
                placeholder={ibanPlaceholder}
                validate={validators.composeValidators(ibanNumberRequired, ibanNumberValid)}
              />
            ) : null}

            {showOdooBanks ? (
              <>
                <FieldSelect
                id="banksNames"
                name="banksNames"
                className={css.selectCountry}
                autoComplete="country"
                label={banksNamesLabel}
                validate={banksNamesRequired}
                >
                  <option disabled value="">
                    {bankNamePlaceholder}
                  </option>
                  {banks.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </FieldSelect>
                <FieldTextInput
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  className={css.field}
                  type="text"
                  label={bankAccountNumberLabel}
                  placeholder={bankAccountNumberPlaceholder}
                  validate={validators.composeValidators(bankAccountNumberRequired, bankAccountNumberValid)}
                />
              </>
            ) : null}

            {attachBankToAccountSuccess
              ? <p className={css.successMsg}>Account details saved</p>
              : null}

            <Button
              className={css.submitButton}
              type="submit"
              disabled={submitDisabled}
              inProgress={attachBankToAccountInProgress}
            >
                {bankAccountId
                  ? intl.formatMessage({ id: 'PayoutDetailsForm.submitEditBtn' })
                  : intl.formatMessage({ id: 'PayoutDetailsForm.submitBtn' })}
            </Button>
          </div>
        </Form>
      )
    }}
  />
);



const PayoutDetailsForm = compose(injectIntl)(PayoutDetailsFormComponent);

export default PayoutDetailsForm;
