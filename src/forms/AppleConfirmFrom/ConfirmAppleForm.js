import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { Form, PrimaryButton, FieldTextInput } from '../../components';

import css from './ConfirmSignupForm.module.css';

// const KEY_CODE_ENTER = 13;

const ConfirmAppleFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        invalid,
        intl,
        confirmAppleInProgress,
        isEmail,
        idp,
      } = formRenderProps;
      // email
      const emailLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      // firstName
      const firstNameLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNameLabel',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNameRequired',
      });
      const firstNameRequired = validators.required(firstNameRequiredMessage);

      // lastName
      const lastNameLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNameLabel',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNameRequired',
      });
      const lastNameRequired = validators.required(lastNameRequiredMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;



      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div>
            <div className={css.name}>

              <div>
                {isEmail
                  ? <FieldTextInput
                    type="email"
                    id={formId ? `${formId}.email` : 'email'}
                    name="email"
                    autoComplete="email"
                    label={emailLabel}
                    placeholder={emailPlaceholder}
                    validate={validators.composeValidators(emailRequired, emailValid)}
                  />
                  : null}
              </div>

              <div>
                <FieldTextInput
                  className={css.firstNameRoot}
                  type="text"
                  id={formId ? `${formId}.firstName` : 'firstName'}
                  name="firstName"
                  autoComplete="given-name"
                  label={firstNameLabel}
                  placeholder={firstNamePlaceholder}
                  validate={firstNameRequired}
                />
              </div>

              <div>
                <FieldTextInput
                  className={css.lastNameRoot}
                  type="text"
                  id={formId ? `${formId}.lastName` : 'lastName'}
                  name="lastName"
                  autoComplete="family-name"
                  label={lastNameLabel}
                  placeholder={lastNamePlaceholder}
                  validate={lastNameRequired}
                />
              </div>

            </div>
          </div>

          <div className={css.bottomWrapper}>
            <PrimaryButton type="submit" inProgress={confirmAppleInProgress} disabled={submitDisabled}>
              <FormattedMessage id="ConfirmSignupForm.signUp" values={{ idp: idp }} />
              Submit
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

ConfirmAppleFormComponent.defaultProps = { inProgress: false };

const { bool } = PropTypes;

ConfirmAppleFormComponent.propTypes = {
  inProgress: bool,
  // from injectIntl
  intl: intlShape.isRequired,
};

const ConfirmAppleForm = compose(injectIntl)(ConfirmAppleFormComponent);
ConfirmAppleForm.displayName = 'ConfirmAppleForm';

export default ConfirmAppleForm;
