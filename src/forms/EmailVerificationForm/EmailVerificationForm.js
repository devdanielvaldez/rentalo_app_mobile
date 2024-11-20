import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, NamedLink, IconEmailAttention, IconEmailSuccess, Button } from '../../components';
import { propTypes } from '../../util/types';
import suzuki from '../PasswordChangeForm/Grupo -8.png';
import car from '../PasswordChangeForm/005-car.png';
import pickup from '../PasswordChangeForm/001-pick-up-truck.png';
import family from '../PasswordChangeForm/002-family-car.png';
import limousine from '../PasswordChangeForm/006-limousine.png';
import electric from '../PasswordChangeForm/007-electric-car.png';
import css from './EmailVerificationForm.module.css';

const EmailVerificationFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const { currentUser, inProgress, handleSubmit, verificationError } = formRenderProps;

      const { email, emailVerified, pendingEmail, profile } = currentUser.attributes;
      const emailToVerify = <strong>{pendingEmail || email}</strong>;
      const name = profile.firstName;

      const errorMessage = (
        <div className={css.error}>
          <FormattedMessage id="EmailVerificationForm.verificationFailed" />
        </div>
      );

      const submitInProgress = inProgress;
      const submitDisabled = submitInProgress;

      const verifyEmail = (
        <div className={css.root}>
          <div className={css.verifyEmailAddress}>
            <IconEmailAttention className={css.modalIcon} />
            <h1 className={css.title}>
              <FormattedMessage id="EmailVerificationForm.verifyEmailAddress" />
            </h1>

            <p className={css.subtitle}>
              <FormattedMessage
                id="EmailVerificationForm.finishAccountSetup"
                values={{ email: emailToVerify }}
              />
            </p>

            {verificationError ? errorMessage : null}
          </div>

          <Form onSubmit={handleSubmit}>
            <Field component="input" type="hidden" name="verificationToken" />

            <div className={css.bottomWrapper}>
              <Button
                className={css.button}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
              >
                {inProgress ? (
                  <FormattedMessage id="EmailVerificationForm.verifying" />
                ) : (
                  <FormattedMessage id="EmailVerificationForm.verify" />
                )}
              </Button>
            </div>
          </Form>
        </div>
      );

      const alreadyVerified = (
        <div className={css.root}>
          <div>
            <IconEmailSuccess className={css.modalIcon} />
            <h1 className={css.modalTitle}>
              <FormattedMessage id="EmailVerificationForm.successTitle" values={{ name }} />
            </h1>

            <p className={css.modalMessage}>
              <FormattedMessage id="EmailVerificationForm.successText" />
            </p>
          </div>

          <div className={css.bottomWrapper}>
            <NamedLink className={css.submitButton} name="HomePage">
              <FormattedMessage id="EmailVerificationForm.successButtonText" />
            </NamedLink>
          </div>
        </div>
      );

      return (
        <div className={css.rowWrapper}>
          <div className={css.inputWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>Nueva contraseña</p>
            </div>
            <div className={css.top}>
              <div className={css.box}>
                {emailVerified && !pendingEmail && !verificationError
                  ? alreadyVerified
                  : verifyEmail}
              </div>
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
                  Es la plataforma de alquiler de autos más novedosa, segura y rentable. En Réntalo si eres dueño de un vehículo o una flota completa puedes rentarlo a ciudadanos y turistas de todo el mundo. El viaje estará asegurado por nuestra póliza de seguro para tranquilidad del propietario y el conductor.
                </span>
              </p>
              <img src={suzuki} className={css.pic} />
            </div>
          </div>
        </div>
      );
    }}
  />
);

EmailVerificationFormComponent.defaultProps = {
  currentUser: null,
  inProgress: false,
  verificationError: null,
};

EmailVerificationFormComponent.propTypes = {
  inProgress: bool,
  currentUser: propTypes.currentUser.isRequired,
  verificationError: propTypes.error,
};

const EmailVerificationForm = compose(injectIntl)(EmailVerificationFormComponent);

export default EmailVerificationForm;
