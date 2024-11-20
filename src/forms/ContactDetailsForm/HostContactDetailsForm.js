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
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import { FieldPhoneNumberInput, Form, FieldTextInput } from '../../components';

import css from './HostContactDetailsForm.module.css';

// const SHOW_EMAIL_SENT_TIMEOUT = 2000;

class HostContactDetailsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showVerificationEmailSentMessage: false, showResetPasswordMessage: false };
    this.emailSentTimeoutId = null;
    this.handleResendVerificationEmail = this.handleResendVerificationEmail.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.submittedValues = {};
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            rootClassName,
            className,
            saveEmailError,
            currentUser,
            formId,
            intl,
            sendVerificationEmailError,
            sendVerificationEmailInProgress,
            values,
          } = fieldRenderProps;
          const user = ensureCurrentUser(currentUser);

          if (!user.id) {
            return null;
          }

          const { email: currentEmail } = user.attributes;


          // has the email changed
          // const emailChanged = currentEmail !== email;

          const emailLabel = intl.formatMessage({
            id: 'HostContactDetailsForm.emailLabel',
          });

          const emailPlaceholder = currentEmail || '' ;

          const emailRequiredMessage = intl.formatMessage({
            id: 'HostContactDetailsForm.emailRequired',
          });
          const emailRequired = validators.required(emailRequiredMessage);
          const emailInvalidMessage = intl.formatMessage({
            id: 'HostContactDetailsForm.emailInvalid',
          });
          const emailValid = validators.emailFormatValid(emailInvalidMessage);

          const tooManyVerificationRequests = isTooManyEmailVerificationRequestsError(
            sendVerificationEmailError
          );

          const emailTouched = this.submittedValues.email !== values.email;
          const emailTakenErrorText = isChangeEmailTakenError(saveEmailError)
            ? intl.formatMessage({ id: 'HostContactDetailsForm.emailTakenError' })
            : null;

          let resendEmailMessage = null;
          if (tooManyVerificationRequests) {
            resendEmailMessage = (
              <span className={css.tooMany}>
                <FormattedMessage id="HostContactDetailsForm.tooManyVerificationRequests" />
              </span>
            );
          } else if (
            sendVerificationEmailInProgress ||
            this.state.showVerificationEmailSentMessage
          ) {
            resendEmailMessage = (
              <span className={css.emailSent}>
                <FormattedMessage id="HostContactDetailsForm.emailSent" />
              </span>
            );
          } else {
            resendEmailMessage = (
              <span
                className={css.helperLink}
                onClick={this.handleResendVerificationEmail}
                role="button"
              >
                <FormattedMessage id="HostContactDetailsForm.resendEmailVerificationText" />
              </span>
            );
          }


          // phone
          // const protectedData = profile.protectedData || {};
          // const currentPhoneNumber = protectedData.phoneNumber;

          // has the phone number changed
          // const phoneNumberChanged = currentPhoneNumber !== phoneNumber;

          const phonePlaceholder = intl.formatMessage({
            id: 'HostContactDetailsForm.phonePlaceholder',
          });
          const phoneLabel = intl.formatMessage({ id: 'HostContactDetailsForm.phoneLabel' });

          const classes = classNames(rootClassName || css.root, className);
          // const submittedOnce = Object.keys(this.submittedValues).length > 0;
          // const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          // const submitDisabled = invalid

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
                  type="email"
                  name="email"
                  id={formId ? `${formId}.email` : 'email'}
                  label={emailLabel}
                  placeholder={emailPlaceholder}
                  validate={validators.composeValidators(emailRequired, emailValid)}
                  customErrorText={emailTouched ? null : emailTakenErrorText}
                  className={css.emailInput}
                />
                {emailVerifiedInfo}
                <FieldPhoneNumberInput
                readOnly
                  className={css.phone}
                  name="phoneNumber"
                  id={formId ? `${formId}.phoneNumber` : 'phoneNumber'}
                  label={phoneLabel}
                  placeholder={phonePlaceholder}
                />
              </div>

              <div className={confirmClasses}>
                <h3 className={css.confirmChangesTitle}>
                  <FormattedMessage id="HostContactDetailsForm.confirmChangesTitle" />
                </h3>
                <p className={css.confirmChangesInfo}>
                  <FormattedMessage id="HostContactDetailsForm.confirmChangesInfo" />
                  <br />
                  <FormattedMessage
                    id="HostContactDetailsForm.resetPasswordInfo"
                    values={{ resetPasswordLink }}
                  />
                </p>

              </div>
              <p className={css.textMessage}>To update the phone number please reach out to our customer support team.</p>
              {/* <div className={css.bottomWrapper}>
                {genericError}
                <PrimaryButton
                  type="submit"
                  inProgress={inProgress}
                  ready={pristineSinceLastSubmit}
                  disabled={submitDisabled}
                  className={css.button}
                >
                  <FormattedMessage id="HostContactDetailsForm.saveChanges" />
                </PrimaryButton>
              </div> */}
            </Form>
          );
        }}
      />
    );
  }
}

HostContactDetailsFormComponent.defaultProps = {
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
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func, string } = PropTypes;

HostContactDetailsFormComponent.propTypes = {
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
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,
};

const HostContactDetailsForm = compose(injectIntl)(HostContactDetailsFormComponent);

HostContactDetailsForm.displayName = 'HostContactDetailsForm';

export default HostContactDetailsForm;
