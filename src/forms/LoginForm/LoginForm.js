import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, FieldTextInput, NamedLink, Button } from '../../components';
import * as validators from '../../util/validators';
import AppleLogin from 'react-apple-login';
import { pushToPath } from '../../util/urlHelpers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useHistory } from 'react-router-dom';

const LoginFormComponent = props => {
  const router = useHistory();


  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          rootClassName,
          className,
          formId,
          handleSubmit,
          inProgress,
          intl,
          invalid,
          authWithGoogle,
          authWithFacebook,
          handleAppleLogin,
          appleLoginError,
          loginOrSignupError,
        } = fieldRenderProps;

        const emailRequiredMessage = intl.formatMessage({ id: 'LoginForm.emailRequired' });
        const emailRequired = validators.required(emailRequiredMessage);
        const emailInvalidMessage = intl.formatMessage({ id: 'LoginForm.emailInvalid' });
        const emailValid = validators.emailFormatValid(emailInvalidMessage);

        const passwordRequiredMessage = intl.formatMessage({ id: 'LoginForm.passwordRequired' });
        const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);

        const classes = classNames(rootClassName || 'loginForm', className);
        const submitInProgress = inProgress;
        const submitDisabled = invalid || submitInProgress;

        const passwordRecoveryLink = (
          <NamedLink name="PasswordRecoveryPage" className="recoveryLink">
            <FormattedMessage id="LoginForm.forgotPassword" />
          </NamedLink>
        );

        const renderAppleButton = (props) => (
          <button type='button' className="socialButton appleButton" {...props}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1200px-Apple_logo_grey.svg.png" alt="Apple" />

            <span>Continuar con Apple</span>
            <ArrowForwardIcon />
          </button>
        );

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <div className="formContainer">
              <h2 className="formTitle">Iniciar sesión</h2>

              <div className="socialButtons">
                <button className="socialButton googleButton" onClick={authWithGoogle}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" />
                  <span>Ingresar con Google</span>
                  <ArrowForwardIcon />
                </button>

                <AppleLogin
                  clientId={"com.rentalo.rent.service"}
                  redirectURI={process.env.REACT_APP_CANONICAL_ROOT_URL}
                  responseType={"id_token"}
                  responseMode={"form_post"}
                  scope={"name email"}
                  usePopup={true}
                  callback={handleAppleLogin}
                  render={renderAppleButton}
                />

                <button className="socialButton facebookButton" onClick={authWithFacebook}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook" />
                  <span>Ingresar con Facebook</span>
                  <ArrowForwardIcon />
                </button>
              </div>

              <div className="divider">
                <span>O</span>
              </div>

              <div className="inputGroup">
                <FieldTextInput
                  type="email"
                  id={formId ? `${formId}.email` : 'email'}
                  name="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  validate={validators.composeValidators(emailRequired, emailValid)}
                />
                <FieldTextInput
                  type="password"
                  id={formId ? `${formId}.password` : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  validate={passwordRequired}
                />
              </div>

              {(appleLoginError || loginOrSignupError) && (
                <p className="errorMessage">{appleLoginError || loginOrSignupError}</p>
              )}

              <Button
                className="submitButton"
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
              >
                Iniciar sesión
              </Button>

              <p className="signupLink" onClick={() => router.push('/signup')}>
                ¿No tienes una cuenta? <span>Crear cuenta</span>
              </p>

              <p className="recoveryLinkInfo">
                <FormattedMessage
                  id="LoginForm.forgotPasswordInfo"
                  values={{ passwordRecoveryLink }}
                />
              </p>
            </div>

            <style jsx>{`
              .loginForm {
                width: 100%;
                max-width: 400px;
                margin: 0 auto;
                padding: 2rem;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }

              .formContainer {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .formTitle {
                font-size: 1.5rem;
                font-weight: 600;
                text-align: center;
                color: #333;
                margin-bottom: 1rem;
              }

              .socialButtons {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .socialButton {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .socialButton:hover {
                background-color: #f5f5f5;
              }

              .socialButton img {
                width: 24px;
                height: 24px;
              }

              .googleButton {
                color: #757575;
              }

              .appleButton {
                color: #000000;
                background-color: #000000;
                color: #ffffff;
              }

              .facebookButton {
                color: #1877f2;
              }

              .divider {
                display: flex;
                align-items: center;
                text-align: center;
                color: #757575;
              }

              .divider::before,
              .divider::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid #e0e0e0;
              }

              .divider span {
                padding: 0 10px;
              }

              .inputGroup {
                display: flex;
                flex-direction: column;
                gap: 1rem;
              }

              .inputGroup input {
                padding: 0.75rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
              }

              .inputGroup input:focus {
                border-color: #4a90e2;
                outline: none;
              }

              .errorMessage {
                color: #ff3b30;
                font-size: 0.875rem;
                margin-top: 0.5rem;
              }

              .submitButton {
                width: 100%;
                padding: 0.75rem;
                background-color: #4a90e2;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }

              .submitButton:hover {
                background-color: #3a7bd5;
              }

              .submitButton:disabled {
                background-color: #b0b0b0;
                cursor: not-allowed;
              }

              .signupLink {
                text-align: center;
                font-size: 0.875rem;
                color: #757575;
              }

              .signupLink span {
                color: #4a90e2;
                cursor: pointer;
              }

              .recoveryLinkInfo {
                text-align: center;
                font-size: 0.875rem;
                color: #757575;
              }

              .recoveryLink {
                color: #4a90e2;
                text-decoration: none;
              }

              @media (max-width: 480px) {
                .loginForm {
                  padding: 1.5rem;
                  border-radius: 0;
                  box-shadow: none;
                }

                .formTitle {
                  font-size: 1.25rem;
                }

                .socialButton {
                  font-size: 0.875rem;
                }
              }
            `}</style>
          </Form>
        );
      }}
    />
  );
};

LoginFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

LoginFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const LoginForm = compose(injectIntl)(LoginFormComponent);
LoginForm.displayName = 'LoginForm';

export default LoginForm;