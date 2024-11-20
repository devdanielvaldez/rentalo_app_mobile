import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import suzukii from './Grupo -8.png';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import config from '../../config';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import ReactDOM from 'react-dom';

import {
  isSignupEmailTakenError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import {
  Page,
  NamedLink,
  NamedRedirect,
  InlineTextButton,
  IconClose,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
} from '../../components';
import { ConfirmSignupForm, LoginForm, SignupForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import {
  login,
  authenticationInProgress,
  signup,
  signupWithIdp,
  signupWithAppleIdp,
  loginWithAppleIdp,
  checkAppleMailId,
} from '../../ducks/Auth.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';
import { getValuesFromQueryString } from '../../util/urlHelpers';
import { apiBaseUrl, checkUserExistApi, post } from '../../util/api';
import SideNav from '../../components/SideNav/SideNav';

import car from './005-car.png';
import pickup from './001-pick-up-truck.png';
import family from './002-family-car.png';
import limousine from './006-limousine.png';
import electric from './007-electric-car.png';
import emailConfirm from './emailConfirm.png';
import ConfirmAppleForm from '../../forms/AppleConfirmFrom/ConfirmAppleForm';

import css from './AuthenticationPage.module.css';
import ChooseRoleModal from '../../forms/SignupForm/ChooseYourRole';

const idpId = process.env.REACT_APP_APPLE_IDP_ID;

export class AuthenticationPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tosModalOpen: false,
      openModal: false,
      confirmValues: null,
      idpToken: null,
      isEmail: false,
      appleLoginError: null,
      appleSignUpError: null,
      authError: Cookies.get('st-autherror')
        ? JSON.parse(Cookies.get('st-autherror').replace('j:', ''))
        : null,
      authInfo: Cookies.get('st-authinfo')
        ? JSON.parse(Cookies.get('st-authinfo').replace('j:', ''))
        : null,
    };
  }

  componentDidMount() {
    Cookies.remove('st-autherror');
  }

  render() {
    const {
      authInProgress,
      currentUser,
      intl,
      isAuthenticated,
      location,
      loginError,
      scrollingDisabled,
      signupError,
      submitLogin,
      submitSignup,
      confirmError,
      submitSingupWithIdp,
      tab,
      history,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
      onManageDisableScrolling,
      onSignupWithAppleIdp,
      onLoginWithAppleIdp,
      onCheckAppleMailId,
      confirmAppleInProgress,
    } = this.props;

    const isConfirm = tab === 'confirm';
    const isLogin = tab === 'login';
    const locationFrom = location.state && location.state.from ? location.state.from : null;
    const authinfoFrom =
      this.state.authInfo && this.state.authInfo.from ? this.state.authInfo.from : null;
    const from = locationFrom ? locationFrom : authinfoFrom ? authinfoFrom : null;

    const user = ensureCurrentUser(currentUser);
    const currentUserLoaded = !!user.id;

    const showEmailVerification = !isLogin && currentUserLoaded && !user.attributes.emailVerified;
    if (showEmailVerification) {
      return <NamedRedirect name="VerificationAccountSettings" />;
    }

    if (isAuthenticated && from) {
      return <Redirect to={from} />;
    } else if (isAuthenticated && currentUserLoaded && !showEmailVerification) {
      return <NamedRedirect name="VerificationAccountSettings" />;
    }

    const loginErrorMessage = (
      <div className={css.error}>
        <FormattedMessage id="AuthenticationPage.loginFailed" />
      </div>
    );

    const signupErrorMessage = (
      <div className={css.error}>
        {isSignupEmailTakenError(signupError) ? (
          <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="AuthenticationPage.signupFailed" />
        )}
      </div>
    );

    const confirmErrorMessage = confirmError ? (
      <div className={css.error}>
        {isSignupEmailTakenError(confirmError) ? (
          <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="AuthenticationPage.signupFailed" />
        )}
      </div>
    ) : null;

    // eslint-disable-next-line no-confusing-arrow
    const errorMessage = (error, message) => (error ? message : null);
    const loginOrSignupError = isLogin
      ? errorMessage(loginError, loginErrorMessage)
      : errorMessage(signupError, signupErrorMessage);

    const handleSubmitSignup = async values => {
      const cohostCode = getValuesFromQueryString();
      const referralCode = getValuesFromQueryString().referral;

      const getRoleSelection = () => {
        return new Promise((resolve) => {
          const modalContainer = document.createElement('div');
          document.body.appendChild(modalContainer);
      
          const closeModal = (selectedRole) => {
            ReactDOM.unmountComponentAtNode(modalContainer);
            document.body.removeChild(modalContainer);
            resolve(selectedRole);
          };
      
          ReactDOM.render(
            <ChooseRoleModal
              isOpen={true}
              onClose={() => closeModal(null)}
              onSelectRole={closeModal}
            />,
            modalContainer
          );
        });
      };

      const selectedRole = await getRoleSelection();

      if (!selectedRole) {
        return;
      }

      const processSignup = async () => {
        if (cohostCode?.cohost) {
          const body = {
            referralCode: cohostCode.cohost,
          };

          try {
            await post('/api/check-referral-code', body);
            const { fname, lname, ...rest } = values;
            const params = {
              firstName: fname.trim(),
              lastName: lname.trim(),
              referralCode: referralCode,
              role: selectedRole,
              ...rest,
            };

            const response = await submitSignup(params);
            await post('/api/mail-chimp/subscription', { fname: values.fname, lname: values.lname, email: values.email });

            history.push(
              createResourceLocatorString(
                'VerificationAccountSettings',
                routeConfiguration(),
                {},
                {}
              )
            );
            return response;
          } catch (e) {
            console.error('Error during signup:', e);
          }
        } else {
          const { fname, lname, ...rest } = values;
          const params = {
            firstName: fname.trim(),
            lastName: lname.trim(),
            referralCode: referralCode,
            role: selectedRole,
            ...rest,
          };

          const response = await submitSignup(params);
          await post('/api/mail-chimp/subscription', { fname: values.fname, lname: values.lname, email: values.email });

          history.push(
            createResourceLocatorString('VerificationAccountSettings', routeConfiguration(), {}, {})
          );
          return response;
        }
      };

      return processSignup();
    };

    const handleSubmitConfirm = values => {
      const { idpToken, email, firstName, lastName, idpId } = this.state.authInfo;
      const { email: newEmail, firstName: newFirstName, lastName: newLastName, ...rest } = values;

      post('/api/mail-chimp/subscription', { fname: firstName, lname: lastName, email: email })
        .then(() => {
          console.log('se registro');
        })

      const authParams = {
        ...(newEmail !== email && { email: newEmail }),
        ...(newFirstName !== firstName && { firstName: newFirstName }),
        ...(newLastName !== lastName && { lastName: newLastName }),
      };

      const protectedData = !isEmpty(rest) ? { ...rest } : null;

      submitSingupWithIdp({
        idpToken,
        idpId,
        email,
        firstName,
        lastName,
        ...authParams,
        ...(!!protectedData && { protectedData }),
      }).then(res => {
        history.push(
          createResourceLocatorString('VerificationAccountSettings', routeConfiguration(), {}, {})
        );
      });
    };

    const getDefaultRoutes = () => {
      const routes = routeConfiguration();
      const baseUrl = apiBaseUrl();

      const fromParam = from ? `from=${from}` : '';

      const defaultReturn = pathByRouteName('VerificationAccountSettings', routes);
      const defaultReturnParam = defaultReturn ? `&defaultReturn=${defaultReturn}` : '';

      const defaultConfirm = pathByRouteName('ConfirmPage', routes);
      const defaultConfirmParam = defaultConfirm ? `&defaultConfirm=${defaultConfirm}` : '';

      return { baseUrl, fromParam, defaultReturnParam, defaultConfirmParam };
    };
    const authWithFacebook = () => {
      const defaultRoutes = getDefaultRoutes();
      const { baseUrl, fromParam, defaultReturnParam, defaultConfirmParam } = defaultRoutes;
      window.location.href = `${baseUrl}/api/auth/facebook?${fromParam}${defaultReturnParam}${defaultConfirmParam}`;
    };

    const authWithGoogle = () => {
      const defaultRoutes = getDefaultRoutes();
      const { baseUrl, fromParam, defaultReturnParam, defaultConfirmParam } = defaultRoutes;
      window.location.href = `${baseUrl}/api/auth/google?${fromParam}${defaultReturnParam}${defaultConfirmParam}`;
    };

    const idp = this.state.authInfo
      ? this.state.authInfo.idpId.replace(/^./, str => str.toUpperCase())
      : null;

    const confirmForm = (
      <div className={css.content}>
        <h1 className={css.signupWithIdpTitle}>
          <FormattedMessage id="AuthenticationPage.confirmSignupWithIdpTitle" values={{ idp }} />
        </h1>

        <p className={css.confirmInfoText}>
          <FormattedMessage id="AuthenticationPage.confirmSignupInfoText" />
        </p>
        {confirmErrorMessage}
        <ConfirmSignupForm
          className={css.form}
          onSubmit={handleSubmitConfirm}
          inProgress={authInProgress}
          onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
          authInfo={this.state.authInfo}
          idp={idp}
        />
      </div>
    );

    const handleSubmitConfirmApple = values => {
      const idpToken = this.state.idpToken;
      if (idpToken) {
        const { firstName, lastName, email: appleEmail } = values || {};
        return onSignupWithAppleIdp({ idpToken, idpId, firstName, lastName, appleEmail }).then(
          res => {
            this.setState({ openModal: false });
            if (res) {
              history.push(
                createResourceLocatorString(
                  'VerificationAccountSettings',
                  routeConfiguration(),
                  {},
                  {}
                )
              );
            } else {
              this.setState({ appleSignUpError: 'Email is already registed Please login !' });
            }
          }
        );
      }
    };

    const setIdpToken = idpToken => this.setState({ idpToken });
    const handleModel = checkMail => this.setState({ openModal: checkMail });

    const handleAppleLogin = async id_token => {
      const idpToken = id_token;
      if (idpToken) {
        onLoginWithAppleIdp({ idpToken, idpId }).then(res => {
          const status = res.status;
          this.setState({ openModal: false });
          if (status == 'SUCCESS') {
            history.push(
              createResourceLocatorString(
                'VerificationAccountSettings',
                routeConfiguration(),
                {},
                {}
              )
            );
          } else {
            this.setState({ appleLoginError: 'Account not found please sign up !' });
          }
        });
      }
    };

    const appleLoginCallback = async data => {
      const { id_token } = (data && data.authorization) || {};
      const userExists = await checkUserExistApi({ id_token });
      if (userExists.user && userExists.user?.id) {
        handleAppleLogin(id_token);
      } else {
        onCheckAppleMailId(id_token).then(checkMailRes => {
          setIdpToken(id_token);
          handleModel(checkMailRes.status);
        });
      }
    };

    const authenticationForms = (
      <div className={css.content}>
        {isLogin ? (
          <LoginForm
            className={css.loginForm}
            onSubmit={submitLogin}
            inProgress={authInProgress}
            appleLoginError={this.state.appleLoginError}
            handleAppleLogin={appleLoginCallback}
            authWithGoogle={authWithGoogle}
            authWithFacebook={authWithFacebook}
            history={history}
            loginOrSignupError={loginOrSignupError}
          />
        ) : (
          <SignupForm
            className={css.signupForm}
            onSubmit={handleSubmitSignup}
            inProgress={authInProgress}
            appleLoginCallback={appleLoginCallback}
            onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
            authWithGoogle={authWithGoogle}
            authWithFacebook={authWithFacebook}
            history={history}
            appleSignUpError={this.state.appleSignUpError}
            loginOrSignupError={loginOrSignupError}
          />
        )}

        {/* {socialLoginButtonsMaybe} */}
        <Modal
          id={'AuthenticationPage.AppleConfirmationModal'}
          isOpen={!!this.state.openModal && this.state.idpToken}
          onClose={() => this.setState({ openModal: false })}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <ConfirmAppleForm
            className={css.form}
            confirmAppleInProgress={confirmAppleInProgress}
            isEmail={this.state.openModal == 'SUCCESS'}
            onSubmit={handleSubmitConfirmApple}
          />
        </Modal>
      </div>
    );

    const formContent = isConfirm ? confirmForm : authenticationForms;

    const name = user.attributes.profile.firstName;
    const email = <span className={css.email}>{user.attributes.email}</span>;

    const resendEmailLink = (
      <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
        <FormattedMessage id="AuthenticationPage.resendEmailLinkText" />
      </InlineTextButton>
    );
    const fixEmailLink = (
      <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
        <FormattedMessage id="AuthenticationPage.fixEmailLinkText" />
      </NamedLink>
    );

    const doItLaterLink = (
      <NamedLink className={css.modalHelperLink} name="HomePage">
        <FormattedMessage id="AuthenticationPage.doItLaterLinkText" />
      </NamedLink>
    );

    const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
      sendVerificationEmailError
    )
      ? 'AuthenticationPage.resendFailedTooManyRequests'
      : 'AuthenticationPage.resendFailed';
    const resendErrorMessage = sendVerificationEmailError ? (
      <p className={css.error}>
        <FormattedMessage id={resendErrorTranslationId} />
      </p>
    ) : null;

    const emailVerificationContent = (
      <div className={css.content}>
        <div className={css.signupForm}>
          <div>
            <div className={css.rowWrapper}>
              <div className={css.inputWrapper}>
                <div className={css.emailBox}>
                  <NamedLink className={css.verifyClose} name="HomePage">
                    <span className={css.closeText}>
                      <FormattedMessage id="AuthenticationPage.verifyEmailClose" />
                    </span>
                    <IconClose rootClassName={css.closeIcon} />
                  </NamedLink>
                  <img src={emailConfirm} alt="Confirmar correo electrónico" className={css.emailImg} />
                  <h1 className={css.modalTitle}>
                    <FormattedMessage id="AuthenticationPage.verifyEmailTitle" values={{ name }} />
                  </h1>
                  <p className={css.modalMessage}>
                    <FormattedMessage id="AuthenticationPage.verifyEmailText" values={{ email }} />
                  </p>
                  {resendErrorMessage}

                  <div className={css.bottomWrapper}>
                    <p className={css.modalHelperText}>
                      <FormattedMessage
                        id="AuthenticationPage.doItLater"
                        values={{ doItLaterLink }}
                      />
                    </p>
                    <p className={css.modalHelperText}>
                      {sendVerificationEmailInProgress ? (
                        <FormattedMessage id="AuthenticationPage.sendingEmail" />
                      ) : (
                        <FormattedMessage
                          id="AuthenticationPage.resendEmail"
                          values={{ resendEmailLink }}
                        />
                      )}
                    </p>
                    <p className={css.modalHelperText}>
                      <FormattedMessage
                        id="AuthenticationPage.fixEmail"
                        values={{ fixEmailLink }}
                      />
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    const siteTitle = config.siteTitle;
    const schemaTitle = isLogin
      ? intl.formatMessage({ id: 'AuthenticationPage.schemaTitleLogin' }, { siteTitle })
      : intl.formatMessage({ id: 'AuthenticationPage.schemaTitleSignup' }, { siteTitle });

    const topbarClasses = classNames({
      [css.hideOnMobile]: showEmailVerification,
    });

    const pageName = ['Iniciar sesión'];

    return (
      <>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.layoutWrapperMain}>
            <div className={css.root}>
              {showEmailVerification ? emailVerificationContent : formContent}
            </div>
          </LayoutWrapperMain>

        </LayoutSingleColumn>
      </>
    );
  }
}

AuthenticationPageComponent.defaultProps = {
  currentUser: null,
  loginError: null,
  signupError: null,
  confirmError: null,
  tab: 'signup',
  sendVerificationEmailError: null,
  showSocialLoginsForTests: false,
};

const { bool, func, object, oneOf, shape } = PropTypes;

AuthenticationPageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  isAuthenticated: bool.isRequired,
  loginError: propTypes.error,
  scrollingDisabled: bool.isRequired,
  signupError: propTypes.error,
  confirmError: propTypes.error,

  submitLogin: func.isRequired,
  submitSignup: func.isRequired,
  tab: oneOf(['login', 'signup', 'confirm']),

  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withRouter
  location: shape({ state: object }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    isAuthenticated,
    loginError,
    signupError,
    confirmError,
    confirmAppleInProgress,
  } = state.Auth;
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  return {
    authInProgress: authenticationInProgress(state),
    currentUser,
    isAuthenticated,
    loginError,
    confirmAppleInProgress,
    scrollingDisabled: isScrollingDisabled(state),
    signupError,
    confirmError,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  submitLogin: ({ email, password }) => dispatch(login(email, password)),
  submitSignup: params => dispatch(signup(params)),
  onFetchCurrentUser: params => dispatch(fetchCurrentUser(params)),
  submitSingupWithIdp: params => dispatch(signupWithIdp(params)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSignupWithAppleIdp: params => dispatch(signupWithAppleIdp(params)),
  onLoginWithAppleIdp: params => dispatch(loginWithAppleIdp(params)),
  onCheckAppleMailId: params => dispatch(checkAppleMailId(params)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const AuthenticationPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(AuthenticationPageComponent);

export default AuthenticationPage;