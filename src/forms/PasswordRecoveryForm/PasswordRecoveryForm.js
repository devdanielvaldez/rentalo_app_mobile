import React, { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Lock, ArrowRight } from 'lucide-react';

const PasswordRecoveryForm = ({ onSubmit, inProgress, recoveryError }) => {
  const intl = useIntl();
  const [submittedValues, setSubmittedValues] = useState({});

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = intl.formatMessage({ id: 'PasswordRecoveryForm.emailRequired' });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = intl.formatMessage({ id: 'PasswordRecoveryForm.emailInvalid' });
    }
    return errors;
  };

  const isPasswordRecoveryEmailNotFoundError = (error) => {
    // Implement this function based on your error handling logic
    return error && error.type === 'EMAIL_NOT_FOUND';
  };

  return (
    <div className="recovery-container">
      <div className="recovery-content">
        <Lock className="icon" size={48} />
        <h2 className="title">Recuperar contraseña</h2>
        <p className="subtitle">
          Escriba su correo electrónico, recibirá un código para reestablecer la cuenta.
        </p>
        <FinalForm
          onSubmit={(values) => {
            setSubmittedValues(values);
            onSubmit(values);
          }}
          validate={validate}
          render={({ handleSubmit, submitting, pristine, invalid, values }) => (
            <form onSubmit={handleSubmit} className="recovery-form">
              <Field name="email">
                {({ input, meta }) => (
                  <div className="input-group">
                    <input
                      {...input}
                      type="email"
                      placeholder="Correo electrónico"
                      className={`form-input ${meta.error && meta.touched ? 'error' : ''}`}
                    />
                    {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
                    {isPasswordRecoveryEmailNotFoundError(recoveryError) && values.email === submittedValues.email && (
                      <span className="error-message">
                        <FormattedMessage id="PasswordRecoveryForm.emailNotFound" />
                      </span>
                    )}
                  </div>
                )}
              </Field>
              <button
                type="submit"
                className="submit-button"
                disabled={submitting || pristine || invalid || inProgress}
              >
                {inProgress ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Restablecer contraseña
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        />
      </div>

      <style jsx>{`
        .recovery-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #ffa07a 0%, #ff7f50 50%, #ff6347 100%);
          padding: 1rem;
        }

        .recovery-content {
          background-color: white;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .icon {
          color: #ff7f50;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1.5rem;
        }

        .recovery-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #ff9a9e;
          outline: none;
        }

        .form-input.error {
          border-color: #ff3b30;
        }

        .error-message {
          position: absolute;
          left: 0;
          bottom: -1.5rem;
          font-size: 0.8rem;
          color: #ff3b30;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.75rem;
          background-color: #ff7f50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #ff7f50;
        }

        .submit-button:disabled {
          background-color: #ff7f50;
          cursor: not-allowed;
        }

        .submit-button svg {
          margin-left: 0.5rem;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .recovery-content {
            padding: 1.5rem;
          }

          .title {
            font-size: 1.25rem;
          }

          .subtitle {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PasswordRecoveryForm;