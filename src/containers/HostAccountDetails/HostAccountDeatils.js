import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TopbarContainer } from '../../containers';
import {
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSideNavigation,
  Footer,
  Page,
  Modal,
  Button
} from '../../components';
import css from './HostAccountDetails.module.css';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import HostAccountDetailsForm from './HostAccountDetailsForm';

import { sendVerificationCode, checkVerificationCode } from './HostAccountDeatils.duck';

const HostAccountDeatilsComponent = ({
  currentUser,
  onSendVerificationCode,
  onCheckVerificationCode,
  sendVerificationError,
  sendVerificationInProgress,
  checkVerificationError,
  checkVerificationInProgress,
}) => {
  const [verificationCode, setVerificationCode] = useState(null)
  const [phoneNumberState, setPhoneNumberState] = useState(null)
  const [isOtpModal, setIsOtpModal] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState(null)
  const pageName = ['Configuración'];

  const errorVerificationMessage = checkVerificationError || sendVerificationError;

  const {
    phoneNumber,
    verifiedPhoneNumber,
  } = currentUser?.attributes?.profile?.protectedData || {};

  const handleSubmitVerificationCode = async () => {
    const res = await onCheckVerificationCode({
      userPhoneNumber: phoneNumberState,
      userUUID: currentUser?.id?.uuid,
      code: verificationCode,
    });

    if (!res) {
      setPhoneNumberState(null);
      setIsOtpModal(false);
    }
  };

  const handleSendVerificationCode = async (phone) => {
    const res = await onSendVerificationCode({
      number: phone,
      userUUID: currentUser?.id?.uuid,
    });

    if (!res) {
      setPhoneNumberState(phone);
      setIsOtpModal(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setVerificationStatus(null)
    setVerificationCode(value)
  };

  return (
    <Page title="HostAccountDetails">
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <ProfileNav currentUser={currentUser}
            />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="HostAccountDeatils"
          currentUser={currentUser}
          isVerficationDetailsTab={true}
        />
        <LayoutWrapperMain>
          <h1 className={css.title}>Host Account Deatils</h1>
          <div className={css.hostlWrapper}>
            <HostAccountDetailsForm
              className={css.form}
              hostPhoneNumber={phoneNumber}
              onSubmit={values => {
                handleSendVerificationCode(values);
              }}
              isHostVerifiedNumber={verifiedPhoneNumber}
              initialValues={{verifiedNumber:phoneNumber }}
              currentUser={currentUser}
              handleSendCode={handleSendVerificationCode}
            />
          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>

      <Modal
        id={"TransactionPanel.cancelModal"}
        isOpen={isOtpModal}
        otpModal={true}
        onClose={() => {
          setIsOtpModal(false)
        }}
        onManageDisableScrolling={() => { }}
      >
        <div>
          <div className={css.verificationCode}>
            <label className={css.controlLabel}>Código de verificación</label>
            <div className={css.verificationCodeInputs}>
              {
                verificationStatus === 'success' ?
                  <div>
                    <svg width="100px" height="100px" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path width="48" height="48" fill="white" fill-opacity="0.01" d="M0 0H100V100H0V0z" /><path d="m50 8.333 10.944 7.983 13.548 -0.025 4.16 12.892 10.975 7.942L85.417 50l4.21 12.875 -10.975 7.942 -4.16 12.892 -13.548 -0.025L50 91.667l-10.944 -7.983 -13.548 0.025 -4.16 -12.892 -10.975 -7.942L14.583 50l-4.21 -12.875 10.975 -7.942 4.16 -12.892 13.548 0.025L50 8.333Z" fill="#ff7900" stroke="black" stroke-width="8.333333333333334" stroke-linecap="round" stroke-linejoin="round" /><path d="m35.417 50 10.417 10.417 20.833 -20.833" stroke="white" fill="none" stroke-width="8.333333333333334" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  </div>
                  :
                  <div>
                    <input
                      name="otp"
                      type="text"
                      onChange={(e) => handleInputChange(e,)}
                      maxLength="6"
                    >
                    </input>
                  </div>}
              <div>
                {verificationStatus === 'error' ?
                  <h4>
                    Invalid otp
                  </h4> : null}
              </div>
              <div>
                {errorVerificationMessage ? <h4>{errorVerificationMessage}</h4> : null}
              </div>
            </div>
          </div>
          <div className={css.verifyOtpButton}>
            {verificationStatus == 'error' ? null :
              <Button
                disabled={checkVerificationInProgress}
                onClick={handleSubmitVerificationCode}
              >
                Verificar código
              </Button>}
          </div>
        </div>
      </Modal>
    </Page>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
  } = state.HostAccountDeatils;
  return {
    currentUser,

    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onSendVerificationCode: params => dispatch(sendVerificationCode(params)),
  onCheckVerificationCode: params => dispatch(checkVerificationCode(params)),
});

const HostAccountDeatils = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HostAccountDeatilsComponent);

export default HostAccountDeatils;
