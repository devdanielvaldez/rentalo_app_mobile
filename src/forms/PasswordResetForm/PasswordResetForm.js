import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput } from '../../components';
import * as validators from '../../util/validators';

import css from './PasswordResetForm.module.css';

import suzukii from './Grupo -8.png';
import car from './005-car.png';
import pickup from './001-pick-up-truck.png';
import family from './002-family-car.png';
import limousine from './006-limousine.png';
import electric from './007-electric-car.png';
import passwordRestImage from './Image110.png';

const PasswordResetFormComponent = props => (
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
        values,
      } = fieldRenderProps;
      const [blured, setBlured] = useState(false);
      // password
      // const passwordLabel = intl.formatMessage({
      //   id: 'PasswordResetForm.passwordLabel',
      // });
      // const passwordPlaceholder = intl.formatMessage({
      //   id: 'PasswordResetForm.passwordPlaceholder',
      // });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'PasswordResetForm.passwordRequired',
      });
      const passwordMinLengthMessage = intl.formatMessage(
        {
          id: 'PasswordResetForm.passwordTooShort',
        },
        {
          minLength: validators.PASSWORD_MIN_LENGTH,
        }
      );
      const passwordMaxLengthMessage = intl.formatMessage(
        {
          id: 'PasswordResetForm.passwordTooLong',
        },
        {
          maxLength: validators.PASSWORD_MAX_LENGTH,
        }
      );
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
      const passwordMinLength = validators.minLength(
        passwordMinLengthMessage,
        validators.PASSWORD_MIN_LENGTH
      );
      const passwordMaxLength = validators.maxLength(
        passwordMaxLengthMessage,
        validators.PASSWORD_MAX_LENGTH
      );

      const classes = classNames(rootClassName || css.root, className);
      const passwordChanged = values.repeatPassword !== values.password;
      const submitInProgress = inProgress;
      const submitDisabled =
        invalid ||
        submitInProgress ||
        (typeof values.repeatPassword != 'undefined' && passwordChanged)
          ? true
          : false;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div className={css.rowWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>Crear cuenta</p>
            </div>
            <div className={css.inputWrapper}>
              <div className={css.box}>
                <img
                  src={passwordRestImage}
                  alt="passwordRestImage"
                  className={css.passwordRestimg}
                />
                <p className={css.title}>Establecer nueva contraseña</p>
                <p className={css.subtitle}>
                  Indique una nueva contraseña para proteger su cuenta y reemplazar la anterior.
                </p>
                <FieldTextInput
                  className={css.password}
                  type="password"
                  id={formId ? `${formId}.password` : 'password'}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Nueva contraseña"
                  validate={validators.composeValidators(
                    passwordRequired,
                    passwordMinLength,
                    passwordMaxLength
                  )}
                />
                <FieldTextInput
                  type="password"
                  className={css.password}
                  id={formId ? `${formId}.repeatPassword` : 'repeatPassword'}
                  name="repeatPassword"
                  placeholder={intl.formatMessage({
                    id: 'PasswordResetForm.PasswordResetForm.repeatPasswordPlaceholder',
                  })}
                  onBlur={() => setBlured(true)}
                  validate={validators.composeValidators(
                    validators.required(
                      intl.formatMessage({
                        id: 'PasswordChangeForm.PasswordChangeForm.repeatPasswordReq',
                      })
                    ),
                    passwordMinLength,
                    passwordMaxLength
                  )}
                />

                {values.password && values.repeatPassword ? (
                  <>
                    {blured && values.password !== values.repeatPassword ? (
                      <span className={css.error}>
                        {intl.formatMessage({
                          id: 'PasswordChangeForm.PasswordChangeForm.repeatPasswordError',
                        })}
                      </span>
                    ) : null}
                  </>
                ) : null}
                <PrimaryButton
                  type="submit"
                  className={css.button}
                  inProgress={submitInProgress}
                  disabled={submitDisabled}
                >
                  Restablecer contraseña
                </PrimaryButton>
              </div>
              <div className={css.row}>
                <div className={css.carBox}>
                  <img src={car} className={css.car} alt='coche' />
                </div>
                <div className={css.carBox}>
                  <img src={limousine} className={css.car} alt='limusina' />
                </div>
                <div className={css.carBox}>
                  <img src={family} className={css.car} alt='familia' />
                </div>
                <div className={css.carBox}>
                  <img src={electric} className={css.car} alt='eléctrico' />
                </div>
                <div className={css.carBox}>
                  <img src={pickup} className={css.car} alt='camioneta' />
                </div>
              </div>
            </div>
            <div className={css.formDetailsRight}>
              <div className={css.box1}>
                <h1 className={css.title1}>Renta tu vehículo favorito</h1>
                <p className={css.pTag}>
                  <strong>Réntalo®</strong>
                  <span className={css.text1}>
                    {' '}
                    Es la plataforma de alquiler de autos más novedosa, segura y rentable. En
                    Réntalo si eres dueño de un vehículo o una flota completa puedes rentarlo a
                    ciudadanos y turistas de todo el mundo. El viaje estará asegurado por nuestra
                    póliza de seguro para tranquilidad del propietario y el conductor.
                  </span>
                </p>
                <img src={suzukii} className={css.pic} alt='suzukii' />
              </div>
            </div>
          </div>
        </Form>
      );
    }}
  />
);

PasswordResetFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
  formId: null,
};

const { string, bool } = PropTypes;

PasswordResetFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  inProgress: bool,
  intl: intlShape.isRequired,
  formId: string,
};

const PasswordResetForm = compose(injectIntl)(PasswordResetFormComponent);
PasswordResetForm.displayName = 'PasswordResetForm';

export default PasswordResetForm;
