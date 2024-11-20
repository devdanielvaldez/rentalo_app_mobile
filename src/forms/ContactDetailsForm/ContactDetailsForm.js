import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { ensureCurrentUser } from '../../util/data';
import {
  isChangeEmailTakenError,
  isChangeEmailWrongPassword,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import { Form, FieldTextInput, PrimaryButton } from '../../components';

import css from './ContactDetailsForm.module.css';
import { Button } from '@mui/material';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import '../../styles/phoneNumberInput.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { getDriverPhoneNumber, getHostPhoneNumber } from '../../util/dataExtractors';
import isEqual from 'lodash/isEqual';

const SHOW_EMAIL_SENT_TIMEOUT = 2000;

class ContactDetailsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVerificationEmailSentMessage: false,
      showResetPasswordMessage: false,
      verificationStatus: null,
      valid: null,
      checkedOnce: false,
      phoneNumberState: props.driverPhoneNumber,
    };
    this.emailSentTimeoutId = null;
    this.handleResendVerificationEmail = this.handleResendVerificationEmail.bind(this);
    this.submittedValues = {};
  }

  componentWillUnmount() {
    window.clearTimeout(this.emailSentTimeoutId);
  }

  handleResendVerificationEmail() {
    this.setState({ showVerificationEmailSentMessage: true });

    this.props.onResendVerificationEmail().then(() => {
      // show "verification email sent" text for a bit longer.
      this.emailSentTimeoutId = window.setTimeout(() => {
        this.setState({ showVerificationEmailSentMessage: false });
      }, SHOW_EMAIL_SENT_TIMEOUT);
    });
  }


  handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text/plain');
    if (!/^\d+$/.test(pastedValue)) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <>
        <FinalForm
          {...this.props}
          render={fieldRenderProps => {
            const {
              rootClassName,
              className,
              saveEmailError,
              savePhoneNumberError,
              currentUser,
              formId,
              handleSubmit,
              // inProgress,
              intl,
              // invalid,
              sendVerificationEmailError,
              sendVerificationEmailInProgress,
              values,
              form,
              handleSendCode,
              isDriverVerifiedNumber,
              // onManageDisableScrolling,
              updateStep,
              isDriverApproval,
              isHostApproval,
              isHostVerifiedNumber,
              isVerificationPage,
              btnHolderClassName,
              prevNextBtnClassName,
              previousStep,

              nextStep,

              updateInProgress,
              invalid,
            } = fieldRenderProps;

            const { email, phoneNumber } = values;

            const user = ensureCurrentUser(currentUser);
            const driverPhoneNumber = getDriverPhoneNumber(currentUser);
            const hostPhoneNumber = getHostPhoneNumber(currentUser);

            if (!user.id) {
              return null;
            }

            const { email: currentEmail, emailVerified, pendingEmail } = user.attributes;

            // has the email changed
            const emailChanged = currentEmail !== email;

            const emailLabel = intl.formatMessage({
              id: 'ContactDetailsForm.emailLabel',
            });

            const emailPlaceholder = currentEmail || '';

            const emailRequiredMessage = intl.formatMessage({
              id: 'ContactDetailsForm.emailRequired',
            });
            const emailRequired = validators.required(emailRequiredMessage);
            const emailInvalidMessage = intl.formatMessage({
              id: 'ContactDetailsForm.emailInvalid',
            });
            const emailValid = validators.emailFormatValid(emailInvalidMessage);

            const tooManyVerificationRequests = isTooManyEmailVerificationRequestsError(
              sendVerificationEmailError,
            );

            const emailTouched = this.submittedValues.email !== values.email;
            const emailTakenErrorText = isChangeEmailTakenError(saveEmailError)
              ? intl.formatMessage({ id: 'ContactDetailsForm.emailTakenError' })
              : null;

            let resendEmailMessage = null;
            if (tooManyVerificationRequests) {
              resendEmailMessage = (
                <span className={css.tooMany}>
                  <FormattedMessage id='ContactDetailsForm.tooManyVerificationRequests' />
                </span>
              );
            } else if (
              sendVerificationEmailInProgress ||
              this.state.showVerificationEmailSentMessage
            ) {
              resendEmailMessage = (
                <span className={css.emailSent}>
                  <FormattedMessage id='ContactDetailsForm.emailSent' />
                </span>
              );
            } else {
              resendEmailMessage = (
                <span
                  className={css.helperLink}
                  onClick={this.handleResendVerificationEmail}
                  role='button'
                >
                  <FormattedMessage id='ContactDetailsForm.resendEmailVerificationText' />
                </span>
              );
            }

            // Email status info: unverified, verified and pending email (aka changed unverified email)
            let emailVerifiedInfo = null;

            if (emailVerified && !pendingEmail && !emailChanged) {
              // Current email is verified and there's no pending unverified email
              emailVerifiedInfo = (
                <span className={css.emailVerified}>
                  <FormattedMessage id='ContactDetailsForm.emailVerified' />
                </span>
              );
            } else if (!emailVerified && !pendingEmail) {
              // Current email is unverified. This is the email given in sign up form

              emailVerifiedInfo = (
                <span className={css.emailUnverified}>
                  <FormattedMessage
                    id='ContactDetailsForm.emailUnverified'
                    values={{ resendEmailMessage }}
                  />
                </span>
              );
            } else if (pendingEmail) {
              // Current email has been tried to change, but the new address is not yet verified

              const pendingEmailStyled = <span className={css.emailStyle}>{pendingEmail}</span>;
              const pendingEmailCheckInbox = (
                <span className={css.checkInbox}>
                  <FormattedMessage
                    id='ContactDetailsForm.pendingEmailCheckInbox'
                    values={{ pendingEmail: pendingEmailStyled }}
                  />
                </span>
              );

              emailVerifiedInfo = (
                <span className={css.pendingEmailUnverified}>
                  <FormattedMessage
                    id='ContactDetailsForm.pendingEmailUnverified'
                    values={{ pendingEmailCheckInbox, resendEmailMessage }}
                  />
                </span>
              );
            }

            // phone
            // const protectedData = profile.protectedData || {};
            // const currentPhoneNumber = protectedData.phoneNumber;

            // has the phone number changed
            // const phoneNumberChanged = currentPhoneNumber !== phoneNumber;

            const phonePlaceholder = intl.formatMessage({
              id: 'ContactDetailsForm.phonePlaceholder',
            });
            const phoneLabel = intl.formatMessage({ id: 'ContactDetailsForm.phoneLabel' });

            // password
            // const passwordLabel = intl.formatMessage({
            //   id: 'ContactDetailsForm.passwordLabel',
            // });
            // const passwordPlaceholder = intl.formatMessage({
            //   id: 'ContactDetailsForm.passwordPlaceholder',
            // });
            // const passwordRequiredMessage = intl.formatMessage({
            //   id: 'ContactDetailsForm.passwordRequired',
            // });

            // const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);

            // const passwordMinLengthMessage = intl.formatMessage(
            //   {
            //     id: 'ContactDetailsForm.passwordTooShort',
            //   },
            //   {
            //     minLength: validators.PASSWORD_MIN_LENGTH,
            //   }
            // );

            // const passwordMinLength = validators.minLength(
            //   passwordMinLengthMessage,
            //   validators.PASSWORD_MIN_LENGTH
            // );

            // const passwordValidators = emailChanged
            //   ? validators.composeValidators(passwordRequired, passwordMinLength)
            //   : null;

            const passwordFailedMessage = intl.formatMessage({
              id: 'ContactDetailsForm.passwordFailed',
            });
            // const passwordTouched = this.submittedValues.currentPassword !== values.currentPassword;
            const passwordErrorText = isChangeEmailWrongPassword(saveEmailError)
              ? passwordFailedMessage
              : null;

            // const confirmClasses = classNames(css.confirmChangesSection, {
            //   [css.confirmChangesSectionVisible]: emailChanged,
            // });

            // generic error
            const isGenericEmailError = saveEmailError && !(emailTakenErrorText || passwordErrorText);

            // let genericError = null;

            if (isGenericEmailError && savePhoneNumberError) {
              genericError = (
                <span className={css.error}>
                  <FormattedMessage id='ContactDetailsForm.genericFailure' />
                </span>
              );
            } else if (isGenericEmailError) {
              genericError = (
                <span className={css.error}>
                  <FormattedMessage id='ContactDetailsForm.genericEmailFailure' />
                </span>
              );
            } else if (savePhoneNumberError) {
              genericError = (
                <span className={css.error}>
                  <FormattedMessage id='ContactDetailsForm.genericPhoneNumberFailure' />
                </span>
              );
            }

            const classes = classNames(rootClassName || css.root, className);
            const submitInProgress = updateInProgress;
            const submittedOnce = Object.keys(this.submittedValues).length > 0;
            const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
            const submitDisabled =
              invalid  || pristineSinceLastSubmit|| updateInProgress || submitInProgress;

            // let verificationMessage = null;

            if (this.state.verificationStatus === 'success') {
              verificationMessage = (
                <span className={css.verificationSuccess}>
                  successful matched
                </span>
              );
            } else if (this.state.verificationStatus === 'error') {
              verificationMessage = (
                <span className={css.verificationError}>
                  invalid otp
                </span>
              );
            }
            form.change('phoneNumber', this.state.phoneNumberState);

            const checkphoneNumber = () => {
              if (this.state.phoneNumberState && !this.state.checkedOnce) {
                const formatedNumber = formatPhoneNumberIntl(phoneNumber);
                if (isValidPhoneNumber(formatedNumber)) {
                  this.setState({
                    valid: true,
                    checkedOnce: true,
                  });
                } else {
                  this.setState({
                    valid: false,
                    checkedOnce: true,
                  });
                }
              }
            };

            return (
              <Form
                className={classes}
                onSubmit={e => {
                  this.submittedValues = values;
                  handleSubmit(e);
                }}
              >
                <div className={css.contactDetailsSection}>
                  <FieldTextInput
                    type='email'
                    name='email'
                    id={formId ? `${formId}.email` : 'email'}
                    label={emailLabel}
                    placeholder={emailPlaceholder}
                    validate={validators.composeValidators(emailRequired, emailValid)}
                    customErrorText={emailTouched ? null : emailTakenErrorText}
                    className={css.emailInput}
                  />
                  {emailVerifiedInfo}
                  <div className={css.numberBoxMainWrap}>
                    {isDriverVerifiedNumber || isHostVerifiedNumber ? <div>
                        <FieldTextInput
                          type='verifiedNumber'
                          name='verifiedNumber'
                          readOnly
                          id={formId ? `${formId}.verifiedNumber` : 'verifiedNumber'}
                          label={'Número de teléfono'}
                          placeholder={phonePlaceholder}
                          className={css.emailInput}
                        />
                        <span style={{ color: '#2ecc71' }}>
                        Tu número de teléfono ha sido verificado.
                      </span>
                      </div> :
                      <PhoneInput
                        className={css.inputNumberBox}
                        name='phoneNumber'
                        defaultCountry='DO'
                        id={formId ? `${formId}.phoneNumber` : 'phoneNumber'}
                        placeholder={phonePlaceholder}
                        value={phoneNumber}
                        label={phoneLabel}
                        onChange={phone => {
                          this.setState({ phoneNumberState: phone });
                        }}
                        onBlur={checkphoneNumber}
                      />}
                  </div>

                  {isDriverVerifiedNumber || isHostVerifiedNumber
                    ? null
                    : (
                      <Button onClick={() => handleSendCode(values.phoneNumber)}
                              className={css.sendOtp}>
                        Solicitar código
                      </Button>
                    )
                  }

                </div>

                <p className={css.textMessage}>Para actualizar el número de teléfono,
                  por favor contacta nuestro equipo de soporte al cliente.</p>

                {((isDriverApproval && driverPhoneNumber && isDriverVerifiedNumber) || (isHostApproval && isHostVerifiedNumber && hostPhoneNumber)) ?
                  <Button className={css.nextButton} onClick={() => updateStep()}>
                    Siguiente
                  </Button>
                  : null}

                {isVerificationPage && <div className={btnHolderClassName}>
                  <span className={prevNextBtnClassName} onClick={() => previousStep()}>
                  Regresar
                  </span>

                  <PrimaryButton
                    type='submit'
                    disabled={submitDisabled}
                    className={prevNextBtnClassName}
                    onClick={() => {
                      nextStep();
                    }}
                  >
                    Continuar verificación
                  </PrimaryButton>

                </div>}
              </Form>
            );
          }}
        />
      </>
    );
  }
}

ContactDetailsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  formId: null,
  saveEmailError: null,
  savePhoneNumberError: null,
  inProgress: false,
  sendVerificationEmailError: null,
  sendVerificationEmailInProgress: false,
  email: null,
  phoneNumber: null,
};

const { bool, func, string } = PropTypes;

ContactDetailsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  formId: string,
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  inProgress: bool,
  intl: intlShape.isRequired,
  onResendVerificationEmail: func.isRequired,
  ready: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  sendVerificationEmailInProgress: bool,
  onManageDisableScrolling: func.isRequired,
};

const ContactDetailsForm = compose(injectIntl)(ContactDetailsFormComponent);

ContactDetailsForm.displayName = 'ContactDetailsForm';

export default ContactDetailsForm;
