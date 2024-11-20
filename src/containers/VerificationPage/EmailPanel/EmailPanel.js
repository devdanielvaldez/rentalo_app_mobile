import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { injectIntl, intlShape } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { ensureCurrentUser } from '../../../util/data';
import { sendVerificationEmail } from '../../../ducks/user.duck';
import { isScrollingDisabled } from '../../../ducks/UI.duck';


import EmailForm from './EmailForm';

import {
  saveContactDetails,
  saveContactDetailsClear,
  resetPassword,
} from '../../ContactDetailsPage/ContactDetailsPage.duck';
import classNames from 'classnames';

import css from './EmailPanel.module.css';


export const EmailPanelComponent = props => {
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    contactDetailsChanged,
    onChange,
    // scrollingDisabled,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
    onSubmitContactDetails,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    // intl,
    rootClassName,
    className,
    nextStep,
    previousStep,
    // goToStep,
  } = props;

  const user = ensureCurrentUser(currentUser);
  const currentEmail = user.attributes.email || '';
  const protectedData = user.attributes.profile.protectedData || {};
  const currentPhoneNumber = protectedData.phoneNumber || '';
  const classes = classNames(rootClassName || css.root, className);

  // const title = intl.formatMessage({ id: 'ContactDetailsPage.title' });

  return (
    <div className={classes}>
      <EmailForm
        className={css.form}
        initialValues={{ email: currentEmail, phoneNumber: currentPhoneNumber }}
        saveEmailError={saveEmailError}
        savePhoneNumberError={savePhoneNumberError}
        currentUser={currentUser}
        onResendVerificationEmail={onResendVerificationEmail}
        onResetPassword={onResetPassword}
        onSubmit={values => onSubmitContactDetails({ ...values, currentEmail, currentPhoneNumber }).then(() => nextStep())}
        onChange={onChange}
        inProgress={saveContactDetailsInProgress}
        ready={contactDetailsChanged}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
        resetPasswordInProgress={resetPasswordInProgress}
        resetPasswordError={resetPasswordError}
        previousStep={previousStep}
      />

      <div onClick={() => previousStep()}>
        Regresar
      </div>

      <div onClick={() => nextStep()}>
      Continuar verificación
      </div>
    </div>
  );
};

EmailPanelComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

EmailPanelComponent.propTypes = {
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  saveContactDetailsInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  contactDetailsChanged: bool.isRequired,
  onChange: func.isRequired,
  onSubmitContactDetails: func.isRequired,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.ContactDetailsPage;
  return {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    contactDetailsChanged,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(saveContactDetailsClear()),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSubmitContactDetails: values => dispatch(saveContactDetails(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const EmailPanel = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(EmailPanelComponent);

export default EmailPanel;
