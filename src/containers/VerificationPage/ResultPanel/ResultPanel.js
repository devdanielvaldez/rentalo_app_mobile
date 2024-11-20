import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { injectIntl, intlShape } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
// import { ensureCurrentUser } from '../../../util/data';
import { sendVerificationEmail } from '../../../ducks/user.duck';
import { isScrollingDisabled } from '../../../ducks/UI.duck';
import verify from '../images/verify.png';
import notVerify from '../images/notVerify.png';
import {
  // saveContactDetails,
  saveContactDetailsClear,
  resetPassword,
} from '../../ContactDetailsPage/ContactDetailsPage.duck';
import classNames from 'classnames';
// import { steps } from '../data';

import css from './ResultPanel.module.css';
// import { getDriverStatus, getHostStatus, getPaymentMethod } from '../../../util/dataExtractors';

export const ResultPanelComponent = props => {
  const {
    // currentUser,
    rootClassName,
    className,
    nextStep,
    goToStep,
    isDriver,
    accountNotVerified,
    filteredSteps,
    verifiedSteps,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const handleNotCompletedStep = () => {
    if (accountNotVerified) {
      const currentStep = verifiedSteps.filter(step => !step.verified);
      goToStep(currentStep[0].step);
    } else {
      nextStep();
    }
  };

  const renderStepsList = filteredSteps.map((step, index) => {
    return (
      <li className={css.stepsItem} key={index}>
        <div className={css.data}>
          <span className={css.stepsImg} onClick={() => goToStep(step.step)}>
            <img src={step.iconSrc} alt={step.title} />
          </span>
          <span className={css.stepsTitle} onClick={() => goToStep(step.step)}>
            {step.title}
          </span>
        </div>

        {step.verified ? (
          <span className={css.status}>
            {' '}
            <img src={verify} alt="verify" />
          </span>
        ) : (
          <span className={css.status}>
            <img src={notVerify} alt="not verify" />
          </span>
        )}
      </li>
    );
  });

  return (
    <div className={classes}>
      <h1 className={css.mainTitle}>
        <span>
          {isDriver
            ? 'Estado de verificación del conductor:'
            : 'Estado de verificación del propietario:'}
        </span>
        {!accountNotVerified ? (
          <span className={css.verified}>Cuenta verificada</span>
        ) : (
          <span className={css.notVerified}>Cuenta no verificada</span>
        )}
      </h1>

      <h2 className={css.subTitle}>
        Para garantizar la seguridad de nuestra comunidad, necesitamos verificar a cada usuario que
        desee alquilar un coche en Rentalo. El proceso solo lleva 5 minutos en completarse.
        Asegúrate de tener tus documentos de identidad a mano para proporcionarlos cuando se te
        soliciten.
      </h2>

      {accountNotVerified ? (
        <h3 className={css.tip}>Tu cuenta no está verificada, ¡por favor verifica tu cuenta!</h3>
      ) : (
        <h3 className={css.tip}>Tu cuenta está verificada, ¡gracias!</h3>
      )}

      <ul className={css.stepsList}>{renderStepsList}</ul>

      {accountNotVerified && (
        <div className={css.buttonsHolder}>
          <span className={css.button} onClick={handleNotCompletedStep}>
            Continuar verificación
          </span>
        </div>
      )}
    </div>
  );
};

ResultPanelComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

ResultPanelComponent.propTypes = {
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  saveContactDetailsInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  contactDetailsChanged: bool.isRequired,
  onChange: func.isRequired,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.ContactDetailsPage;
  return {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    contactDetailsChanged,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(saveContactDetailsClear()),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const ResultPanel = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ResultPanelComponent);

export default ResultPanel;
