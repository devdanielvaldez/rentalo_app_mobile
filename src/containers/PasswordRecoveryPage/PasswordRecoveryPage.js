import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isPasswordRecoveryEmailNotFoundError } from '../../util/errors';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  IconKeys,
  LayoutSingleColumn,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
} from '../../components';
import { PasswordRecoveryForm } from '../../forms';


import {
  recoverPassword,
  retypePasswordRecoveryEmail,
  clearPasswordRecoveryError,
} from './PasswordRecoveryPage.duck';
import css from './PasswordRecoveryPage.module.css';


export const PasswordRecoveryPageComponent = props => {
  const {
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
    onChange,
    onSubmitEmail,
    onRetypeEmail,
  } = props;

  const submitEmailContent = (
    <div className={css.submitEmailContent}>
      <PasswordRecoveryForm
        inProgress={recoveryInProgress}
        onChange={onChange}
        onSubmit={values => onSubmitEmail(values.email)}
        initialValues={{ email: initialEmail }}
        recoveryError={recoveryError}
      />
    </div>
  );

  const submittedEmailText = passwordRequested ? (
    <span className={css.email}>{initialEmail}</span>
  ) : (
    <span className={css.email}>{submittedEmail}</span>
  );

  const emailSubmittedContent = (
    <div className="email-sent-container">
      <div className="content-wrapper">
        <div className="icon-wrapper">
          <IconKeys className="icon key-icon" />
        </div>
        <h1 className="title">
          <FormattedMessage id="PasswordRecoveryPage.emailSubmittedTitle" />
        </h1>
        <p className="message">
          <FormattedMessage
            id="PasswordRecoveryPage.emailSubmittedMessage"
            values={{ submittedEmailText: <strong>{submittedEmailText}</strong> }}
          />
        </p>
        <div className="actions">
          {recoveryInProgress ? (
            <p className="helper-text">
              <FormattedMessage id="PasswordRecoveryPage.resendingEmailInfo" />
            </p>
          ) : (
            <button className="action-button" onClick={() => onSubmitEmail(submittedEmail)}>
              ¿No recibiste el correo electrónico?, Reenviarlo
            </button>
          )}
          <button className="action-button" onClick={onRetypeEmail}>
            Vaya, ¿hay un error en tu dirección de correo electrónico?, corregirlo
          </button>
        </div>
      </div>

      <style jsx>{`
        .email-sent-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 1rem;
        }

        .content-wrapper {
          background-color: white;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .icon-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
        }

        .icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #4a90e2;
        }

        .key-icon {
          transform: scale(0.6) translate(50%, 50%);
          color: #f0b90b;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
        }

        .message {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1.5rem;
        }

        .message strong {
          color: #4a90e2;
          font-weight: 600;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .helper-text {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: #666;
        }

        .spinner {
          margin-right: 0.5rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          background-color: #f0f0f0;
          color: #333;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .action-button:hover {
          background-color: #e0e0e0;
        }

        .action-button svg {
          margin-right: 0.5rem;
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 1.5rem;
          }

          .title {
            font-size: 1.25rem;
          }

          .message {
            font-size: 0.9rem;
          }

          .action-button {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );

  const genericErrorContent = (
    <div className={css.genericErrorContent}>
      <IconKeys className={css.modalIcon} />
      <h1 className={css.modalTitle}>
        <FormattedMessage id="PasswordRecoveryPage.actionFailedTitle" />
      </h1>
      <p className={css.modalMessage}>
        <FormattedMessage id="PasswordRecoveryPage.actionFailedMessage" />
      </p>
    </div>
  );

  let content;
  if (isPasswordRecoveryEmailNotFoundError(recoveryError)) {
    content = submitEmailContent;
  } else if (recoveryError) {
    content = genericErrorContent;
  } else if (submittedEmail || passwordRequested) {
    content = emailSubmittedContent;
  } else {
    content = submitEmailContent;
  }

  return (
    <>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.layoutWrapperMain}>
          <div className={css.root}>{content}</div>
        </LayoutWrapperMain>
      </LayoutSingleColumn>
    </>
  );
};

PasswordRecoveryPageComponent.defaultProps = {
  sendVerificationEmailError: null,
  initialEmail: null,
  submittedEmail: null,
  recoveryError: null,
};

const { bool, func, string } = PropTypes;

PasswordRecoveryPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  initialEmail: string,
  submittedEmail: string,
  recoveryError: propTypes.error,
  recoveryInProgress: bool.isRequired,
  passwordRequested: bool.isRequired,
  onChange: func.isRequired,
  onSubmitEmail: func.isRequired,
  onRetypeEmail: func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
  } = state.PasswordRecoveryPage;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(clearPasswordRecoveryError()),
  onSubmitEmail: email => dispatch(recoverPassword(email)),
  onRetypeEmail: () => dispatch(retypePasswordRecoveryEmail()),
});

const PasswordRecoveryPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(PasswordRecoveryPageComponent);

export default PasswordRecoveryPage;
