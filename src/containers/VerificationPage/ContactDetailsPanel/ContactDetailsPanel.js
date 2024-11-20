import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { ensureCurrentUser } from '../../../util/data';
import { sendVerificationEmail } from '../../../ducks/user.duck';
import {
  Modal
} from '../../../components';
import { ContactDetailsForm } from '../../../forms';
import { isScrollingDisabled } from '../../../ducks/UI.duck';
import {
  saveContactDetails,
  saveContactDetailsClear,
  sendVerificationCode,
  checkVerificationCode,
} from '../../ContactDetailsPage/ContactDetailsPage.duck';
import css from './ContactDetailsPanel.module.css';

import { updateProfile } from '../../ProfileSettingsPage/ProfileSettingsPage.duck';

export const ContactDetailsPanelComponent = props => {
  const [verificationCode, setVerificationCode] = useState(null)
  const [phoneNumberState, setPhoneNumberState] = useState(null)
  const [isOtpModal, setIsOtpModal] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState(null)

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
    intl,
    previousStep,
    nextStep,
    goToStep,
    isDriver,
    sendVerificationError,
    // sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
    onSendVerificationCode,
    onCheckVerificationCode,
  } = props;
  const errorVerificationMessage = checkVerificationError || sendVerificationError;

  const user = ensureCurrentUser(currentUser);
  const currentEmail = user.attributes.email || '';
  const {
    phoneNumber,
    verifiedPhoneNumber,
  } = user.attributes.profile.protectedData || {};

  const title = intl.formatMessage({ id: 'ContactDetailsPanel.title' });

  // const pageName = ['Configuración'];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setVerificationStatus(null)
    setVerificationCode(value)
  };

  const handleSubmitVerificationCode = async () => {
    const res = await onCheckVerificationCode({
      userPhoneNumber: phoneNumberState,
      userUUID: user?.id?.uuid,
      code: verificationCode,
    });

    if (!res) {
      setPhoneNumberState(null);
      setIsOtpModal(false);
    }
  };

  const handleSendVerificationCode = async (phone) => {
    const res = await onSendVerificationCode({ number: phone, userUUID: user?.id?.uuid, });

    if (!res) {
      setPhoneNumberState(phone);
      setIsOtpModal(true);
    }
  };

  return (
    <>
      <div className={css.content}>
        <h1 className={css.title}>{title}</h1>
        <ContactDetailsForm
          className={css.form}
          driverPhoneNumber={phoneNumber}
          isDriverVerifiedNumber={verifiedPhoneNumber}
          initialValues={{ email: currentEmail, phoneNumber: phoneNumber, verifiedNumber: phoneNumber }}
          saveEmailError={saveEmailError}
          savePhoneNumberError={savePhoneNumberError}
          currentUser={currentUser}
          onResendVerificationEmail={onResendVerificationEmail}
          onSubmit={values => {
            onSubmitContactDetails({ ...values, currentEmail });
          }}
          onChange={onChange}
          handleSendCode={handleSendVerificationCode}
          inProgress={saveContactDetailsInProgress}
          ready={contactDetailsChanged}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
          sendVerificationEmailError={sendVerificationEmailError}
          previousStep={previousStep}
          goToStep={goToStep}
          nextStep={nextStep}
          isVerificationPage={true}
          btnHolderClassName={css.buttonsHolder}
          prevNextBtnClassName={css.button}
          isDriver={isDriver}
        />
      </div>

      <Modal
        id={"TransactionPanel.cancelModal"}
        isOpen={isOtpModal}
        otpModal={true}
        onClose={() => {
          setIsOtpModal(false)
        }}
        onManageDisableScrolling={() => {}}
      >
        <div>
          <div className={css.verificationCode}>
            <label className={css.controlLabel}>Código de verificación</label>
            <div className={css.verificationCodeInputs}>
              {verificationStatus === 'success' ? (
                <div>
                  <svg width="100px" height="100px" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path width="48" height="48" fill="white" fill-opacity="0.01" d="M0 0H100V100H0V0z" />
                    <path d="m50 8.333 10.944 7.983 13.548 -0.025 4.16 12.892 10.975 7.942L85.417 50l4.21 12.875 -10.975 7.942 -4.16 12.892 -13.548 -0.025L50 91.667l-10.944 -7.983 -13.548 0.025 -4.16 -12.892 -10.975 -7.942L14.583 50l-4.21 -12.875 10.975 -7.942 4.16 -12.892 13.548 0.025L50 8.333Z" fill="#ff7900" stroke="black" stroke-width="8.333333333333334" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="m35.417 50 10.417 10.417 20.833 -20.833" stroke="white" fill="none" stroke-width="8.333333333333334" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              ) : (
                <div>
                  <input
                    name="otp"
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    maxLength="6"
                  >
                  </input>
                </div>
              )}
              <div>
                {verificationStatus === 'error' ? <h4>Invalid otp</h4> : null}
              </div>
              <div>
                {errorVerificationMessage ? <h4>{errorVerificationMessage}</h4> : null}
              </div>
            </div>
          </div>
          <div className={css.verifyOtpButton}>
            {verificationStatus == 'error' ? null :
              <button
                disabled={checkVerificationInProgress}
                onClick={handleSubmitVerificationCode}
              >
               Verificar código
              </button>
            }
          </div>
        </div>
      </Modal>
    </>
  );
};

ContactDetailsPanelComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
};

const { bool, func } = PropTypes;

ContactDetailsPanelComponent.propTypes = {
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

    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
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

    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(saveContactDetailsClear()),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSubmitContactDetails: values => dispatch(saveContactDetails(values)),
  onUpdateProfile: data => dispatch(updateProfile(data)),

  onSendVerificationCode: params => dispatch(sendVerificationCode(params)),
  onCheckVerificationCode: params => dispatch(checkVerificationCode(params)),
});

const ContactDetailsPanel = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ContactDetailsPanelComponent);

export default ContactDetailsPanel;
