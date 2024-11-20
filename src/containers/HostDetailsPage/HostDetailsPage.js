import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  // LayoutWrapperFooter,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSideNavigation,
  // Footer,
  Button,
  IconSpinner,
  Modal,
} from '../../components';
import { TopbarContainer } from '../../containers';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { withRouter } from 'react-router-dom';
import { getHostIdentification, getHostLastStep, getHostStatus } from '../../util/dataExtractors';
import { AccountTypeForm, ContactDetailsForm, ProfileSettingsForm } from '../../forms';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import BankDetailsForm from '../../forms/BankDetailsForm/BankDetailsForm';
import { uploadImage, updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import {
  BANK,
  COMPLETE,
  MATI,
  TYPE,
  PROFILE,
  CONTACT,
  verification,
} from '../../marketplace-custom-config';
import css from './HostDetailsPage.module.css';
import {
  getBusinessName,
  sendVerificationCode,
  checkVerificationCode,
  updateOdooUser,
} from './HostDetailsPage.duck';
import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
import { complyCubeApi, createCheckApi } from '../../util/api';
import {
  saveContactDetails,
  saveContactDetailsClear,
} from '../ContactDetailsPage/ContactDetailsPage.duck';
import VerificationComplete from '../../components/VerificationComplete/VerificationComplete';

import { countryList } from '../../constants/countriesList';

export const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};
export class HostDetailsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgressSpiner: false,
      token: null,
      verificationStatus: null,
      verificationCode: null,
      isOtpModal: null,
      phoneNumberState: null,
    };
  }

  componentDidMount() {
    this.loadComplyCube();
  }

  loadComplyCube = async () => {
    if (!window.ComplyCube) {
      const script = document.createElement('script');
      script.src = 'https://assets.complycube.com/web-sdk/v1/complycube.min.js'; // Load ComplyCube SDK script
      script.async = true;
      script.onload = this.initializeComplyCube;
      document.head.appendChild(script);
    } else {
      // this.initializeComplyCube();
    }
  };

  initializeComplyCube = async () => {
    const { currentUser } = this.props;
    const email = currentUser?.attributes?.email;
    const firstName = currentUser?.attributes?.profile?.firstName;
    const lastName = currentUser?.attributes?.profile?.lastName;
    const userData = {
      email,
      firstName,
      lastName,
      userID: currentUser?.id?.uuid,
      userType: 'host',
    };

    const tokenRes = await complyCubeApi({ userData });

    if (tokenRes.token) {
      const complycube =
        typeof window !== 'undefined' &&
        window.ComplyCube.mount({
          token: tokenRes.token,
          onComplete: async data => {
            const check = await createCheckApi({
              clientId: tokenRes.clientId,
              documentId: data?.documentCapture?.documentId,
              userID: currentUser?.id?.uuid,
              userType: 'host',
            });
            if (data.status === 'completed') {
              const updatedValues = {
                protectedData: { lastHostStep: TYPE, verification_status: 'verified' }, // Modify this as needed
                // profileImageId: uploadedImage.imageId,
              };

              this.props.onUpdateProfile(updatedValues).then(() => {
                // Redirect to the next step or page
                history.push(
                  createResourceLocatorString(
                    'HostDetailsPage',
                    routeConfiguration(),
                    { step: TYPE },
                    {}
                  )
                );
              });
            }
            // ); // 20 seconds delay
          },
          onModalClose: function() {
            complycube.updateSettings({ isModalOpen: false });
          },
          onError: function({ type, message }) {
            console.error('ComplyCube error:', type, message);
          },
        });

      // Add cleanup logic when the component unmounts
      this.cleanupComplyCube = () => {
        if (complycube.unmount) {
          complycube.unmount();
        }
      };
    }
  };

  componentWillUnmount() {
    if (this.cleanupComplyCube) {
      this.cleanupComplyCube();
    }
  }

  render() {
    const {
      currentUser,
      scrollingDisabled,
      intl,
      updateInProgress,
      updateProfileError,
      onUpdateProfile,
      onImageUpload,
      history,
      location,
      uploadImageError,
      uploadInProgress,
      image,
      onGetBusinessName,
      onFetchCurrentUser,
      saveEmailError,
      savePhoneNumberError,
      saveContactDetailsInProgress,
      contactDetailsChanged,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onSubmitContactDetails,
      onChange,
      onResendVerificationEmail,

      onUpdateOdooUser,

      sendVerificationError,
      sendVerificationInProgress,
      checkVerificationError,
      checkVerificationInProgress,
      onSendVerificationCode,
      onCheckVerificationCode,
      businessNameError,
    } = this.props;
    const errorVerificationMessage = checkVerificationError || sendVerificationError;

    const title = intl.formatMessage({ id: 'HostDetailsPage.title' });
    // const hostPhoneNumber = getHostPhoneNumber(currentUser)
    // const isHostVerifiedNumber = isHostPhoneNumberVerified(currentUser);
    const user = ensureCurrentUser(currentUser);
    const { verificationStatus, verificationCode, isOtpModal, phoneNumberState } = this.state;

    const { phoneNumber, verifiedPhoneNumber, hostPhoneNumber } =
      user.attributes.profile.protectedData || {};

    const savedStep = getHostLastStep(user) || location.state || PROFILE;
    const hostIdentification = getHostIdentification(user);
    const hostStatus = getHostStatus(user);
    const currentEmail = user.attributes.email || '';

    const verificationMessage = verification.filter(x => x.key === hostStatus).map(x => x.msg);
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const handleSubmit = () => {
      if (profileImageId) {
        const updatedValues = profileImageId ? { protectedData: { lastHostStep: CONTACT } } : {};
        onUpdateProfile(updatedValues).then(() => {
          history.push(
            createResourceLocatorString(
              'HostDetailsPage',
              routeConfiguration(),
              { step: CONTACT },
              {}
            )
          );
        });
      } else {
        const uploadedImage = image;
        const updatedValues =
          uploadedImage && uploadedImage.imageId && uploadedImage.file
            ? { protectedData: { lastHostStep: CONTACT }, profileImageId: uploadedImage.imageId }
            : {};
        onUpdateProfile(updatedValues).then(() => {
          history.push(
            createResourceLocatorString(
              'HostDetailsPage',
              routeConfiguration(),
              { step: CONTACT },
              {}
            )
          );
        });
      }
    };

    let timerId;
    const fetchUser = async () => {
      const user = await onFetchCurrentUser();
      const isVerifiedStatus = getHostStatus(user);
      if (['verified', 'rejected'].includes(isVerifiedStatus) && timerId) {
        clearInterval(timerId);
        this.setState({ inProgressSpiner: false });
      } else {
      }
    };
    const fetchUserInterval = () => {
      timerId = setInterval(function() {
        fetchUser();
      }, 3000);
    };

    const stopSpiner = () => {
      // setTimeout(() => this.setState({ inProgressSpiner: false }), 60000);
      this.setState({ inProgressSpiner: false });
    };
    const setSpiner = () => {
      this.setState({ inProgressSpiner: true });
      if (hostStatus == 'verified') stopSpiner();
    };

    const handleUpdateOdooUser = step => {
      if (step === COMPLETE) {
        const getCountry = code => countryList[code];

        const getUserBirthday = birthday => {
          const { day, month, year } = birthday;

          return `${year}-${month}-${day}`;
        };

        const {
          attributes: {
            profile: {
              firstName,
              lastName,
              protectedData: {
                hostMetaData: { documentDetails, holderDetails },
              },
              privateData: { odoo_user_id },
            },
          },
        } = user;

        const odooUserData = {
          name: `${firstName} ${lastName}`,
          x_document_type: documentDetails?.documentType,
          x_document_number: documentDetails?.documentNumber,
          mobile: phoneNumber ?? hostPhoneNumber,
          company_type: 'person',
          x_studio_date_of_birth_1: getUserBirthday(holderDetails?.dob),
        };

        const odooUserMetadata = {
          countryName: getCountry(documentDetails?.issuingCountry),
        };

        onUpdateOdooUser({
          odooUserId: odoo_user_id,
          odooUserData,
          odooUserMetadata,
        });
      }
    };

    const onUpdateStep = (values, step) => {
      // handleUpdateOdooUser(step);

      onUpdateProfile({
        protectedData: {
          hostIdentification: { hostIdentification, ...values, isComplete: step === COMPLETE },
          lastHostStep: step,
        },
      }).then(() => {
        history.push(
          createResourceLocatorString('HostDetailsPage', routeConfiguration(), { step }, {})
        );
      });
    };

    const handleSubmitVerificationCode = async () => {
      const res = await onCheckVerificationCode({
        userPhoneNumber: phoneNumberState,
        userUUID: user?.id?.uuid,
        code: verificationCode,
      });

      if (!res) {
        this.setState({ phoneNumberState: '' });
        this.setState({ isOtpModal: false });
      }
    };

    const handleSendVerificationCode = async phone => {
      const res = await onSendVerificationCode({ number: phone, userUUID: user?.id?.uuid });

      if (!res) {
        this.setState({ phoneNumberState: phone });
        this.setState({ isOtpModal: true });
      }
    };

    const handleInputChange = e => {
      const value = e.target.value;
      this.setState({ verificationStatus: null });
      this.setState({ verificationCode: value });
    };

    const updateNextStep = () => {
      const updatedValues = { protectedData: { lastHostStep: TYPE } };
      onUpdateProfile(updatedValues).then(() => {
        history.push(
          createResourceLocatorString('HostDetailsPage', routeConfiguration(), { step: TYPE }, {})
        );
      });
    };

    const stepsToShow = () => {
      switch (savedStep) {
        case PROFILE:
          return (
            <div>
              <ProfileSettingsForm
                className={css.form}
                currentUser={currentUser}
                initialValues={{ profileImage: user.profileImage }}
                profileImage={profileImage}
                onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
                uploadInProgress={uploadInProgress}
                updateInProgress={updateInProgress}
                uploadImageError={uploadImageError}
                updateProfileError={updateProfileError}
                onSubmit={handleSubmit}
                isHostApproval={true}
              />
            </div>
          );
        case CONTACT:
          return (
            <div>
              <h1 className={css.title}>
                <FormattedMessage id="ContactDetailsPage.heading" />
              </h1>
              <ContactDetailsForm
                className={css.form}
                hostPhoneNumber={phoneNumber}
                isHostVerifiedNumber={verifiedPhoneNumber}
                initialValues={{
                  email: currentEmail,
                  phoneNumber: phoneNumber,
                  verifiedNumber: phoneNumber,
                }}
                saveEmailError={saveEmailError}
                savePhoneNumberError={savePhoneNumberError}
                currentUser={currentUser}
                onResendVerificationEmail={onResendVerificationEmail}
                onSubmit={values => {
                  onSubmitContactDetails({ ...values, currentEmail });
                }}
                onChange={onChange}
                handleSendCode={handleSendVerificationCode}
                updateStep={updateNextStep}
                isHostApproval={true}
                inProgress={saveContactDetailsInProgress}
                ready={contactDetailsChanged}
                sendVerificationEmailInProgress={sendVerificationEmailInProgress}
                sendVerificationEmailError={sendVerificationEmailError}
              />
            </div>
          );
        case TYPE:
          return (
            <div>
              <AccountTypeForm
                className={css.form}
                currentUser={currentUser}
                updateInProgress={updateInProgress}
                updateProfileError={updateProfileError}
                onSubmit={values => onUpdateStep(values, MATI)}
                isHostApproval={true}
                onGetBusinessName={onGetBusinessName}
                businessNameError={businessNameError}
              />
            </div>
          );
        case MATI:
          return (
            <div className={css.mati}>
              {hostStatus == 'verified' ? (
                <div>
                  <p className={css.verifingMsg}>{verificationMessage}</p>
                </div>
              ) : (
                <div className={css.verifingSec} onClick={() => [setSpiner(), fetchUserInterval()]}>
                  <div>
                    {this.state.inProgressSpiner ? (
                      <div>
                        <IconSpinner />
                        <span>Please wait...</span>
                      </div>
                    ) : null}
                    {hostStatus != 'verified' ? (
                      <div id="complycube-mount">
                        {/* <Button className={css.verificationButton} onClick={() => this.initializeComplyCube()}>
                          Start Verification
                        </Button> */}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              {/* {hostStatus == 'verified' ? (
                <Button
                  onClick={() => onUpdateStep({}, BANK)}
                  disabled={hostStatus !== 'verified'}
                  inProgress={updateInProgress}
                >
                  <FormattedMessage id="HostDetailsPage.bankAccount" />
                </Button>
              ) : !hostIdentification ? (
                <Button
                  onClick={() => onUpdateStep({}, BANK)}
                  disabled={!hostIdentification}
                  inProgress={updateInProgress}
                >
                  <FormattedMessage id="HostDetailsPage.bankAccount" />
                </Button>
              ) : (
                <div className={css.checkFileText}>
                  {' '}
                  <FormattedMessage id="HostDetailsPage.progressMsg" />{' '}
                </div>
              )} */}
            </div>
          );
        case BANK:
          return (
            <BankDetailsForm
              onSubmit={values => onUpdateStep(values, COMPLETE)}
              inProgress={updateInProgress}
            />
          );
        case COMPLETE:
          return <VerificationComplete />;
        default:
          return false;
      }
    };

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="HostDetailsPage" pageName={['Configuración']} />
            <div className={css.sideNav}>
              <ProfileNav />
            </div>
          </LayoutWrapperTopbar>
          <LayoutWrapperAccountSettingsSideNav
            currentTab="HostDetailsPage"
            currentUser={currentUser}
            isHostVerified={savedStep === COMPLETE}
            isVerficationDetailsTab={true}
          />
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                {savedStep !== COMPLETE && (
                  <h1 className={css.title}>
                    <FormattedMessage id="HostDetailsPage.heading" />
                  </h1>
                )}
              </div>
              {stepsToShow()}
            </div>
          </LayoutWrapperMain>
        </LayoutSideNavigation>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}

        {/* ================****************     OTP modal  ******************===============*/}
        <Modal
          id={'TransactionPanel.cancelModal'}
          isOpen={isOtpModal}
          otpModal={true}
          onClose={() => {
            this.setState({ isOtpModal: false });
          }}
          onManageDisableScrolling={() => {}}
        >
          <div>
            <div className={css.verificationCode}>
              <label className={css.controlLabel}>Código de verificación</label>
              <div className={css.verificationCodeInputs}>
                {verificationStatus === 'success' ? (
                  <div>
                    <svg
                      width="100px"
                      height="100px"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        width="48"
                        height="48"
                        fill="white"
                        fill-opacity="0.01"
                        d="M0 0H100V100H0V0z"
                      />
                      <path
                        d="m50 8.333 10.944 7.983 13.548 -0.025 4.16 12.892 10.975 7.942L85.417 50l4.21 12.875 -10.975 7.942 -4.16 12.892 -13.548 -0.025L50 91.667l-10.944 -7.983 -13.548 0.025 -4.16 -12.892 -10.975 -7.942L14.583 50l-4.21 -12.875 10.975 -7.942 4.16 -12.892 13.548 0.025L50 8.333Z"
                        fill="#ff7900"
                        stroke="black"
                        stroke-width="8.333333333333334"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="m35.417 50 10.417 10.417 20.833 -20.833"
                        stroke="white"
                        fill="none"
                        stroke-width="8.333333333333334"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>
                    <input
                      name="otp"
                      type="text"
                      onChange={e => handleInputChange(e)}
                      maxLength="6"
                    ></input>
                  </div>
                )}
                <div>{verificationStatus === 'error' ? <h4>Invalid otp</h4> : null}</div>
                <div>{errorVerificationMessage ? <h4>{errorVerificationMessage}</h4> : null}</div>
              </div>
            </div>
            <div className={css.verifyOtpButton}>
              {verificationStatus == 'error' ? null : (
                <Button
                  disabled={checkVerificationInProgress}
                  onClick={handleSubmitVerificationCode}
                >
                  Verificar código
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </Page>
    );
  }
}

HostDetailsPageComponent.defaultProps = {
  currentUser: null,
};

const { bool, func } = PropTypes;

HostDetailsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  const {
    updateInProgress,
    updateProfileError,
    image,
    uploadImageError,
    uploadInProgress,
  } = state.ProfileSettingsPage;

  const {
    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
    businessNameError,
  } = state.HostDetailsPage;

  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
  } = state.ContactDetailsPage;
  return {
    currentUser,
    updateInProgress,
    uploadImageError,
    uploadInProgress,
    image,
    updateProfileError,
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    scrollingDisabled: isScrollingDisabled(state),

    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
    businessNameError,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onSubmitContactDetails: values => dispatch(saveContactDetails(values)),
  onChange: () => dispatch(saveContactDetailsClear()),
  onGetBusinessName: params => dispatch(getBusinessName(params)),
  onFetchCurrentUser: params => dispatch(fetchCurrentUser(params)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),

  onSendVerificationCode: params => dispatch(sendVerificationCode(params)),
  onCheckVerificationCode: params => dispatch(checkVerificationCode(params)),

  onUpdateOdooUser: params => dispatch(updateOdooUser(params)),
});

const HostDetailsPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(HostDetailsPageComponent);

export default HostDetailsPage;
