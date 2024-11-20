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
  // IconSpinner,
  Modal,
} from '../../components';
import { TopbarContainer } from '../../containers';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { withRouter } from 'react-router-dom';
import {
  getDriverLastStep,
  // getDriverPhoneNumber,
  // getDriverStatus,
  // getPaymentMethod,
  // isPhoneNumberVerified,
} from '../../util/dataExtractors';
import { ProfileSettingsForm } from '../../forms';
import {
  COMPLETE,
  MATI,
  PAYMENT,
  PROFILE,
  CONTACT,
  // verification,
} from '../../marketplace-custom-config';
import { uploadImage, updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';

import css from './DriverApprovalPage.module.css';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
// import VerificationComplete from '../../components/VerificationComplete/VerificationComplete';
import { detachPaymentMethod } from '../PaymentMethodsPage/PaymentMethodsPage.duck';
// import CustomCardElement from '../../components/CustomCardElement/CustomCardElement';
import {
  createCustomer,
  fetchCurrentUser,
  getCountryId,
  sendVerificationEmail,
} from '../../ducks/user.duck';
import { complyCubeApi, createCheckApi } from '../../util/api';
import {
  saveContactDetails,
  saveContactDetailsClear,
} from '../ContactDetailsPage/ContactDetailsPage.duck';

import {
  sendVerificationCode,
  checkVerificationCode,
  updateOdooUser,
} from './DriverApprovalPage.duck';

// import { countryList } from '../../constants/countriesList';

export const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class DriverApprovalPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChangeCard: false,
      inProgress: false,
      inProgressSpiner: false,
      token: null,
      verificationStatus: null,
      verificationCode: null,
      isOtpModal: null,
      phoneNumberState: null,
    };
    this.onChangeCard = this.onChangeCard.bind(this);
  }
  onChangeCard() {
    this.setState({ showChangeCard: !this.state.showChangeCard });
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
      userType: 'driver',
    };

    const tokenRes = await complyCubeApi({ userData });

    if (tokenRes.token) {
      const complycube =
        typeof window !== 'undefined' &&
        window.ComplyCube.mount({
          token: tokenRes.token,
          containerId: 'complycube-mount',
          stages: [
            {
              name: 'documentCapture',
              options: {
                crossDeviceOnly: false,
                documentTypes: {
                  passport: false,
                  driving_license: true,
                  national_identity_card: false,
                },
              },
            },
            {
              name: 'faceCapture',
              options: {
                mode: 'photo',
              },
            },
            'completion',
          ],
          onComplete: async data => {
            await createCheckApi({
              clientId: tokenRes.clientId,
              documentId: data?.documentCapture?.documentId,
              userID: currentUser?.id?.uuid,
              userType: 'driver',
            });
            if (data.status === 'completed') {
              const updatedValues = {
                protectedData: { lastHostStep: TYPE, verification_status: 'verified' }, // Modify this as needed
              };

              this.props.onUpdateProfile(updatedValues).then(() => {
                // Redirect to the next step or page
                history.push(
                  createResourceLocatorString(
                    'DriverApprovalPage',
                    routeConfiguration(),
                    { step: MATI },
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
      uploadImageError,
      uploadInProgress,
      onImageUpload,
      image,
      onUpdateProfile,
      // onGetCountryId,
      history,
      location,
      // handleAttachPaymentMethod,
      // handleDetachPaymentMethod,
      // onUpdateOdooUser,
      // attachmentInProgress,
      // saveContactDetailsInProgress,
      // attached,
      // detached,
      // onFetchCurrentUser,
      // saveEmailError,
      // savePhoneNumberError,
      // onResendVerificationEmail,
      // onChange,
      // contactDetailsChanged,
      // sendVerificationEmailInProgress,
      // sendVerificationEmailError,
      // onSubmitContactDetails,

      sendVerificationError,
      // sendVerificationInProgress,
      checkVerificationError,
      checkVerificationInProgress,
      // onSendVerificationCode,
      onCheckVerificationCode,
    } = this.props;
    const errorVerificationMessage = checkVerificationError || sendVerificationError;

    const title = intl.formatMessage({ id: 'DriverApprovalPage.title' });

    const user = ensureCurrentUser(currentUser);
    const { attributes } = user || {};
    const { profile } = attributes || {};
    const { protectedData } = profile || {};
    const { driverMetaData } = protectedData || {};
    const { holderDetails } = driverMetaData || {};
    const name = holderDetails ? `${holderDetails.firstName[0]} ${holderDetails.lastName[0]}` : '';
    const dob = holderDetails
      ? `${holderDetails?.dob?.day}/${holderDetails?.dob?.month}/${holderDetails?.dob?.year}`
      : '';
    const { verificationStatus, verificationCode, isOtpModal, phoneNumberState } = this.state;
    // const currentEmail = user.attributes.email || '';
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    // const driverPhoneNumber = getDriverPhoneNumber(currentUser);
    // const isDriverVerifiedNumber = isPhoneNumberVerified(currentUser)

    // const { phoneNumber, driverPhoneNumber } = user.attributes.profile.protectedData || {};

    const savedStep = getDriverLastStep(user) || location.state || PROFILE;
    // const cardData = getPaymentMethod(user);
    // const driverStatus = getDriverStatus(user);
    // const verificationMessage = verification.filter(x => x.key === driverStatus).map(x => x.msg);
    // const dateofBirth = getDriverDateOfBirth(currentUser);
    // const email = getUserEmail(currentUser);

    let timerId;
    // const fetchUser = async () => {
    //   const user = await onFetchCurrentUser();
    //   const isVerifiedStatus = getDriverStatus(user);
    //   if (isVerifiedStatus == 'verified' && timerId) {
    //     clearInterval(timerId);
    //     this.setState({ inProgressSpiner: false });
    //   } else {
    //     console.log('Rechecked!!');
    //   }
    // };
    // const fetchUserInterval = () => {
    //   timerId = setInterval(function() {
    //     fetchUser();
    //   }, 10000);
    // };

    // const stopSpiner = () => {
    //   // setTimeout(() => this.setState({ inProgressSpiner: false }), 10000);
    //   this.setState({ inProgressSpiner: false });
    // };

    // const setSpiner = () => {
    //   this.setState({ inProgressSpiner: true });
    //   if (driverStatus == 'verified') stopSpiner();
    // };

    const handleSubmit = () => {
      if (profileImageId) {
        const updatedValues = profileImageId ? { protectedData: { lastDriverStep: CONTACT } } : {};
        onUpdateProfile(updatedValues).then(() => {
          history.push(
            createResourceLocatorString(
              'DriverApprovalPage',
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
            ? { protectedData: { lastDriverStep: MATI }, profileImageId: uploadedImage.imageId }
            : {};
        onUpdateProfile(updatedValues).then(() => {
          history.push(
            createResourceLocatorString(
              'DriverApprovalPage',
              routeConfiguration(),
              { step: MATI },
              {}
            )
          );
        });
      }
    };

    // const updateNextStep = () => {
    //   const updatedValues = { protectedData: { lastDriverStep: MATI } };
    //   onUpdateProfile(updatedValues).then(() => {
    //     history.push(
    //       createResourceLocatorString(
    //         'DriverApprovalPage',
    //         routeConfiguration(),
    //         { step: MATI },
    //         {}
    //       )
    //     );
    //   });
    // };

    // const handleUpdateOdooUser = step => {
    //   if (step === COMPLETE) {
    //     const getCountry = code => countryList[code];

    //     const getUserBirthday = birthday => {
    //       const { day, month, year } = birthday;

    //       return `${year}-${month}-${day}`;
    //     };

    //     const {
    //       attributes: {
    //         profile: {
    //           firstName,
    //           lastName,
    //           protectedData: {
    //             driverMetaData: { documentDetails, holderDetails },
    //           },
    //           privateData: { odoo_user_id },
    //         },
    //       },
    //     } = user;

    //     const odooUserData = {
    //       name: `${firstName} ${lastName}`,
    //       x_document_type: documentDetails?.documentType,
    //       x_document_number: documentDetails?.documentNumber,
    //       mobile: phoneNumber ?? driverPhoneNumber,
    //       company_type: 'person',
    //       x_studio_date_of_birth_1: getUserBirthday(holderDetails?.dob),
    //     };

    //     const odooUserMetadata = {
    //       countryName: getCountry(documentDetails?.issuingCountry),
    //     };

    //     onUpdateOdooUser({
    //       odooUserId: odoo_user_id,
    //       odooUserData,
    //       odooUserMetadata,
    //     });
    //   }
    // };

    // *********++++++++++++++++++++################# comment this code becouse url is not updateted  ##################+++++++++++++++++++++++++********************
    const onUpdateStep = async step => {
      this.setState({ inProgress: true });

      // handleUpdateOdooUser(step);

      // const getCountry = await onGetCountryId(countryNumber);
      // this.setState({ countryCode: getCountry.countryCode });
      // if (getCountry) {
      // const updatedData =
      //   !!getCountry &&
      //   (await onUpdateOdooUser({
      //     odooUserId,
      //     odooData: { ...updatedOdooData, country_id: getCountry?.countryCode },
      //   }));
      // if (updatedData == 'success') {
      const updatedProfile =
        // !!updatedData &&
        onUpdateProfile({
          protectedData: {
            driverIdentification: { isComplete: step === COMPLETE },
            lastDriverStep: step,
          },
        });
      if (updatedProfile) {
        this.setState({ inProgress: false });
        history.push(
          createResourceLocatorString(
            'DriverApprovalPage',
            routeConfiguration(),
            { step: PAYMENT },
            {}
          )
        );
      }
      // }
      // }
    };

    const handleInputChange = e => {
      const value = e.target.value;
      this.setState({ verificationStatus: null });
      this.setState({ verificationCode: value });
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

    // const handleSendVerificationCode = async phone => {
    //   const res = await onSendVerificationCode({ number: phone, userUUID: user?.id?.uuid });

    //   if (!res) {
    //     this.setState({ phoneNumberState: phone });
    //     this.setState({ isOtpModal: true });
    //   }
    // };

    const stepsToShow = () => (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{ profileImage: user.profileImage, name: name, dob }}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
        isDriverApproval={true}
        driverPage={true}
      />
    );
    // switch (savedStep) {
    //   case PROFILE:
    //     return (
    //       <ProfileSettingsForm
    //         className={css.form}
    //         currentUser={currentUser}
    //         initialValues={{ profileImage: user.profileImage, name: name, dob }}
    //         profileImage={profileImage}
    //         onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
    //         uploadInProgress={uploadInProgress}
    //         updateInProgress={updateInProgress}
    //         uploadImageError={uploadImageError}
    //         updateProfileError={updateProfileError}
    //         onSubmit={handleSubmit}
    //         isDriverApproval={true}
    //       />
    //     );
    //   case CONTACT:
    //     return (
    //       <div>
    //         <h1 className={css.title}>
    //           <FormattedMessage id="ContactDetailsPage.heading" />
    //         </h1>
    //         <ContactDetailsForm
    //           className={css.form}
    //           driverPhoneNumber={phoneNumber}
    //           isDriverVerifiedNumber={verifiedPhoneNumber}
    //           initialValues={{
    //             email: currentEmail,
    //             phoneNumber: phoneNumber,
    //             verifiedNumber: phoneNumber,
    //           }}
    //           saveEmailError={saveEmailError}
    //           savePhoneNumberError={savePhoneNumberError}
    //           currentUser={currentUser}
    //           onResendVerificationEmail={onResendVerificationEmail}
    //           onSubmit={values => {
    //             onSubmitContactDetails({ ...values, currentEmail });
    //           }}
    //           onChange={onChange}
    //           handleSendCode={handleSendVerificationCode}
    //           updateStep={updateNextStep}
    //           isDriverApproval={true}
    //           inProgress={saveContactDetailsInProgress}
    //           ready={contactDetailsChanged}
    //           sendVerificationEmailInProgress={sendVerificationEmailInProgress}
    //           sendVerificationEmailError={sendVerificationEmailError}
    //         />
    //       </div>
    //     );
    //   case MATI:
    //     return (
    //       <div className={css.mati}>
    //         {driverStatus == 'verified' ? (
    //           <div>
    //             <p className={css.verifingMsg}>{verificationMessage}</p>
    //           </div>
    //         ) : (
    //           <div
    //             className={css.verifyStatus}
    //             onClick={() => [setSpiner(), fetchUserInterval()]}
    //           >
    //             <div>
    //               {this.state.inProgressSpiner ? (
    //                 <div>
    //                   <IconSpinner />
    //                   <span>Please wait...</span>
    //                 </div>
    //               ) : null}
    //               {driverStatus != 'verified' ? (
    //                 <div id="complycube-mount">
    //                   {/* <Button className={css.verificationButton} onClick={() => this.initializeComplyCube()}>
    //                       Start Verification
    //                     </Button> */}
    //                 </div>
    //               ) : null}
    //             </div>
    //           </div>
    //         )}

    //         {driverStatus == 'verified' && (
    //           <Button onClick={() => onUpdateStep(PAYMENT)} inProgress={updateInProgress}>
    //             {this.state.inProgress ? (
    //               <>Loading...</>
    //             ) : (
    //               <FormattedMessage id="DriverApprovalPage.bankAccount" />
    //             )}
    //           </Button>
    //         )}
    //       </div>
    //     );
    //   case PAYMENT:
    //     return (
    //       <CustomCardElement
    //         cardData={cardData}
    //         showChangeCard={this.state.showChangeCard}
    //         attached={attached}
    //         detached={detached}
    //         setChangeCard={this.onChangeCard}
    //         handleAttachPaymentMethod={async values => {
    //           const paymentMethod = await handleAttachPaymentMethod(values);
    //           const updatedStep = await onUpdateStep(COMPLETE);
    //           if (paymentMethod && updatedStep) {
    //             return history.push(
    //               createResourceLocatorString('SearchPage', routeConfiguration(), {}, {})
    //             );
    //           }
    //         }}
    //         handleDetachPaymentMethod={handleDetachPaymentMethod}
    //         attachmentInProgress={attachmentInProgress}
    //         isDriverApproval={true}
    //       />
    //     );
    //   case COMPLETE:
    //     return <VerificationComplete />;
    //   default:
    //     return false;
    // }

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="DriverApprovalPage" pageName={['Configuración']} />
            <div className={css.sideNav}>
              <ProfileNav />
            </div>
          </LayoutWrapperTopbar>
          <LayoutWrapperAccountSettingsSideNav
            currentTab="DriverApprovalPage"
            currentUser={currentUser}
            isVerified={savedStep === COMPLETE}
            isVerficationDetailsTab={true}
          />
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                {savedStep !== COMPLETE && (
                  <h1 className={css.title}>
                    <FormattedMessage id="DriverApprovalPage.heading" />
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
          id={'OTPVerificationModal'}
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

DriverApprovalPageComponent.defaultProps = {
  currentUser: null,
};

const { bool, func } = PropTypes;

DriverApprovalPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  onChange: func.isRequired,
  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentUser,
    attachmentInProgress,
    attached,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  const { detachmentInProgress, detached } = state.PaymentMethodsPage;
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
  } = state.ContactDetailsPage;
  const {
    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
  } = state.DriverApprovalPage;
  return {
    currentUser,
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
    image,
    attachmentInProgress,
    attached,
    detachmentInProgress,
    detached,
    saveEmailError,
    savePhoneNumberError,
    contactDetailsChanged,
    saveContactDetailsInProgress,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    scrollingDisabled: isScrollingDisabled(state),

    sendVerificationError,
    sendVerificationInProgress,
    checkVerificationError,
    checkVerificationInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onSubmitContactDetails: values => dispatch(saveContactDetails(values)),
  onChange: () => dispatch(saveContactDetailsClear()),
  handleAttachPaymentMethod: params => dispatch(createCustomer(params)),
  handleDetachPaymentMethod: () => dispatch(detachPaymentMethod()),
  onUpdateOdooUser: params => dispatch(updateOdooUser(params)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),

  onGetCountryId: params => dispatch(getCountryId(params)),
  onFetchCurrentUser: params => dispatch(fetchCurrentUser(params)),

  onSendVerificationCode: params => dispatch(sendVerificationCode(params)),
  onCheckVerificationCode: params => dispatch(checkVerificationCode(params)),
});

const DriverApprovalPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(DriverApprovalPageComponent);

export default DriverApprovalPage;
