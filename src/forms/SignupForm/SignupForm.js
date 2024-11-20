import React, { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppleLogin from 'react-apple-login';
import { ArrowRight, Mail } from 'lucide-react';
import { useHistory } from 'react-router-dom';

const SignupForm = ({ intl, onSubmit, authWithGoogle, authWithFacebook, appleLoginCallback }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const router = useHistory();

  const validate = values => {
    const errors = {};
    if (!values.fname) errors.fname = 'Nombre requerido';
    if (!values.lname) errors.lname = 'Apellido requerido';
    if (!values.email) {
      errors.email = 'Correo requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Correo inválido';
    }
    if (!values.password) {
      errors.password = 'Contraseña requerida';
    } else if (values.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    return errors;
  };

  return (
    <div className="signup-container">
      <h2 className="form-title">Crear cuenta</h2>
      <div className="social-buttons">
        <button className="social-button google" onClick={authWithGoogle}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" />
          <span>Continuar con Google</span>
          <ArrowRight size={20} />
        </button>
        <AppleLogin
          clientId="com.rentalo.rent.service"
          redirectURI={process.env.REACT_APP_CANONICAL_ROOT_URL}
          responseType="id_token"
          responseMode="form_post"
          scope="name email"
          usePopup={true}
          callback={appleLoginCallback}
          render={props => (
            <button className="social-button apple" {...props}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1200px-Apple_logo_grey.svg.png" alt="Apple" />
              <span>Continuar con Apple</span>
              <ArrowRight size={20} />
            </button>
          )}
        />
        <button className="social-button facebook" onClick={authWithFacebook}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook" />
          <span>Continuar con Facebook</span>
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="divider">
        <span>O</span>
      </div>
      <FinalForm
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <Field name="fname">
                {({ input, meta }) => (
                  <div className="form-group">
                    <input {...input} type="text" placeholder="Nombre" className="form-input" />
                    {meta.error && meta.touched && <span className="error">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="lname">
                {({ input, meta }) => (
                  <div className="form-group">
                    <input {...input} type="text" placeholder="Apellido" className="form-input" />
                    {meta.error && meta.touched && <span className="error">{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <Field name="email">
              {({ input, meta }) => (
                <div className="form-group">
                  <input {...input} type="email" placeholder="Correo electrónico" className="form-input" />
                  {meta.error && meta.touched && <span className="error">{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div className="form-group">
                  <input {...input} type="password" placeholder="Contraseña" className="form-input" />
                  {meta.error && meta.touched && <span className="error">{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className='check'
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <span>Acepto los <a href="/terms">términos y condiciones</a></span>
              </label>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className='check'
                  checked={newsletterSubscribed}
                  onChange={() => setNewsletterSubscribed(!newsletterSubscribed)}
                />
                <span>Deseo recibir novedades y ofertas</span>
              </label>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={submitting || pristine || invalid || !termsAccepted}
            >
              Crear cuenta
            </button>
          </form>
        )}
      />
      <p className="login-link">
        ¿Ya tienes una cuenta? <a onClick={() => {
          router.push('/login')
        }}>Iniciar sesión</a>
      </p>

      <style jsx>{`
        .signup-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .social-button {
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

        .social-button:hover {
          background-color: #f5f5f5;
        }

        .social-button img {
          width: 24px;
          height: 24px;
        }

        .check {
          width:20px;
        }

        .google { color: #757575; }
        .apple { color: #000000; background-color: #000000; color: #ffffff; }
        .facebook { color: #1877f2; }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #757575;
          margin: 1.5rem 0;
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

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-group {
          flex: 1;
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
          border-color: #4a90e2;
          outline: none;
        }

        .error {
          color: #ff3b30;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          margin-bottom: 0.2rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #333;
        }

        .checkbox-label a {
          color: #4a90e2;
          text-decoration: none;
        }

        .submit-button {
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

        .submit-button:hover {
          background-color: #3a7bd5;
        }

        .submit-button:disabled {
          background-color: #b0b0b0;
          cursor: not-allowed;
        }

        .login-link {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #757575;
        }

        .login-link a {
          color: #4a90e2;
          text-decoration: none;
        }

        @media (max-width: 480px) {
          .signup-container {
            padding: 1.5rem;
            border-radius: 0;
            box-shadow: none;
          }

          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default injectIntl(SignupForm);