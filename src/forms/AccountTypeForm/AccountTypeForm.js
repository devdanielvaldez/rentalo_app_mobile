import React, { useState } from 'react';
import { func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldRadioButton } from '../../components';
// import { bankNames } from '../../marketplace-custom-config';

import css from './AccountTypeForm.module.css';
import { useSelector } from 'react-redux';
const MAX_ID_NUMBER_LENGTH = 9;

const format = value => {

  if (!value) {
    return value;
  }

  const inputValue = value.replace(/\D/g, ''); // Remove non-numeric characters
  const minValue = Math.min(inputValue.length, 9);
  let formattedValue = '';
  for (let i = 0; i < minValue; i++) {
    if (i === 3 || i === 8) {
      formattedValue += '-';
    }
    formattedValue += inputValue[i];
  }

  return formattedValue;
};

const AccountTypeFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        handleSubmit,
        intl,
        // saveText,
        inProgress,
        invalid,
        disabled,
        values,
        // verifyText,
        onGetBusinessName,
        form,
        isVerificationPage,
        btnHolderClassName,
        prevNextBtnClassName,
        previousStep,
        // nextStep,
      } = formRenderProps;
      const [fetchInProgress, setInProgress] = useState(false);
      const [checked, setChecked] = useState(false);
      const state = useSelector(state => state);
      const { businessNameError } = state.HostDetailsPage;

      const classes = classNames(css.root, className);

      const accountRequiredMessage = intl.formatMessage({
        id: 'AccountTypeForm.accountRequired',
      });

      const title = intl.formatMessage({
        id: 'AccountTypeForm.title',
      });

      // const commercialName = intl.formatMessage({
      //   id: 'AccountTypeForm.commercialName',
      // });

      const idNumber = intl.formatMessage({
        id: 'AccountTypeForm.idNumber',
      });

      // const commercialNameRequiredMessage = intl.formatMessage({
      //   id: 'AccountTypeForm.commercialNameRequiredMessage',
      // });

      const idNumberRequiredMessage = intl.formatMessage({
        id: 'AccountTypeForm.idNumberRequiredMessage',
      });

      const businessNameLabel = intl.formatMessage({
        id: 'AccountTypeForm.businessNameLabel',
      });
      const businessNameSuccessMsg = intl.formatMessage({
        id: 'AccountTypeForm.businessNameSuccessMsg',
      });

      const submitInProgress = inProgress;
      const isCompanySelected = values && values.accountType === 'company';
      const submitDisabled =
        invalid ||
        disabled ||
        submitInProgress ||
        (isCompanySelected && !values?.businessName) ||
        businessNameError?.message;

      // const formatNumber = number => {
      //   //remove all special characters and
      //   number = number.replace(/[^0-9]/g, '');
      //   if (!number) return undefined;
      //   const numberString = number.toString();
      //   const firstPart = numberString.slice(0, 3);
      //   const secondPart = numberString.slice(3, 8);
      //   const thirdPart = numberString.slice(8, 9);
      //   return `${firstPart}-${secondPart}-${thirdPart}`;
      // };

      const onChange = (formValues) => {
        const v = formValues.values.idNumberMask;
        form.change("idNumber", v);
      }

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <FormSpy onChange={onChange} subscription={{ values: true }} />
          <div className={css.rowBox}>
            {title}
            <FieldRadioButton
              id="individual"
              name="accountType"
              label="Individuo"
              value="individual"
              validate={required(accountRequiredMessage)}
            />
            <FieldRadioButton
              id="company"
              name="accountType"
              label="Empresa"
              value="company"
              validate={required(accountRequiredMessage)}
            />
            {isCompanySelected && (
              <>
                <div className={css.company}>
                  {/* <FieldTextInput
                  id="accountNumber"
                  name="accountNumber"
                  className={css.inputBox}
                  type="text"
                  label={commercialName}
                  validate={composeValidators(required(commercialNameRequiredMessage))}
                /> */}

                  <FieldTextInput
                    id="idNumberMask"
                    name="idNumberMask"
                    className={css.inputBox}
                    type="text"
                    label={idNumber}
                    format={format}
                    parse={format}
                    // onFocus={e => {
                    //   form.batch(() => {
                    //     form.change(
                    //       'idNumberMask',
                    //       values?.idNumber ? values?.idNumber : undefined
                    //     );
                    //   });
                    // }}
                    // onKeyPress={e => {
                    //   if (e.key === 'Enter') {
                    //     e.preventDefault();
                    //   }
                    //   if (!/[0-9-]/.test(e.key)) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    customErrorText={
                      values?.idNumberMask?.replace(/-/g, '').length > MAX_ID_NUMBER_LENGTH ? (
                        <FormattedMessage
                          id="AccountTypeForm.AccountTypeForm.idMaxValidation"
                          values={{ MAX_ID_NUMBER_LENGTH: MAX_ID_NUMBER_LENGTH }}
                        />
                      ) : null
                    }
                    // onBlur={e => {
                      // form.batch(() => {
                        // const value = format(e.target.value);
                        // form.change('idNumber', value);
                        // form.change('idNumberMask', value ? value.replace(/[^-_]/g, '#') : undefined);
                      // });
                    // }}
                    validate={composeValidators(
                      required(idNumberRequiredMessage)
                      // acceptMaxLengthWithoutDash(
                      //   <FormattedMessage
                      //     id="AccountTypeForm.AccountTypeForm.idMaxValidation"
                      //     values={{ MAX_ID_NUMBER_LENGTH: MAX_ID_NUMBER_LENGTH }}
                      //   />,
                      //   MAX_ID_NUMBER_LENGTH
                      // )
                    )}
                  />
                  <Button
                    type="Button"
                    className={css.submitButton}
                    inProgress={fetchInProgress}
                    ready={checked}
                    onClick={async () => {
                      try {
                        setInProgress(true);
                        const businessName = await onGetBusinessName({
                          idNumber: values?.idNumber,
                        });
                        const tradeName = businessName && businessName.tradename;
                        setInProgress(false);
                        if (tradeName) {
                          form.change('businessName', tradeName.trim());
                          setChecked(true);
                        } else {
                          setInProgress(false);
                          form.change('businessName', undefined);
                        }
                      } catch (e) {
                        setInProgress(false);
                        form.change('businessName', undefined);
                      }
                    }}
                  >
                    {/*{verifyText}*/}
                    Verificar
                  </Button>
                </div>
                <div>
                  {values.businessName ? (
                    <>
                      <FieldTextInput
                        id="businessName"
                        name="businessName"
                        className={css.field}
                        type="text"
                        label={businessNameLabel}
                        disabled={true}
                      />
                      <p className={css.successMsg}>{businessNameSuccessMsg}</p>
                    </>
                  ) : null}
                  {businessNameError ? (
                    <p className={css.errorMsg}>{businessNameError?.message}</p>
                  ) : null}
                </div>
              </>
            )}

            {!isVerificationPage && (
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={inProgress}
                disabled={submitDisabled}
                onSubmit={handleSubmit}
              >
                Enviar
              </Button>
            )}

            {isVerificationPage && (
              <div className={btnHolderClassName}>
                <span className={prevNextBtnClassName} onClick={() => previousStep()}>
                  Regresar
                </span>

                <Button
                  className={prevNextBtnClassName}
                  type="submit"
                  inProgress={inProgress}
                  disabled={submitDisabled}
                  onSubmit={handleSubmit}
                >
                  Continuar verificación
                </Button>
              </div>
            )}
          </div>
        </Form>
      );
    }}
  />
);

AccountTypeFormComponent.defaultProps = {
  className: null,
  validateText: 'This field is required',
  saveText: 'Next : Identity Verification',
  verifyText: 'Verify',
};
AccountTypeFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
};

export default compose(injectIntl)(AccountTypeFormComponent);
