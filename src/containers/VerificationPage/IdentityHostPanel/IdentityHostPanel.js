import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../../util/reactIntl';
import css from '../VerificationPage.module.css';
import { ensureCurrentUser } from "../../../util/data";
import { Button, PrimaryButton } from '../../../components';
// import {
  // verification,
// } from '../../../marketplace-custom-config';
import {
  // getHostIdentification,
  getHostStatus,
} from '../../../util/dataExtractors';
import { complyCubeApi, createCheckApi } from '../../../util/api';
// import { AccountTypeForm } from '../../../forms';


const IdentityHostPanel = props => {
  const {
    className,
    rootClassName,
    // submitButtonText,
    nextStep,
    previousStep,
    onUpdateProfile,
    currentUser,
    history,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const panelTitle = <FormattedMessage id="IdentityHostPanel.title" />;

  const user = ensureCurrentUser(currentUser);
  const hostStatus = getHostStatus(user);

  const verificationCount = user?.attributes?.profile?.publicData?.verificationCount ?? 0;
  const verificationOutcome = user?.attributes?.profile?.protectedData?.verification_outcome;

  const reloadPage = () => history.go(0);

  const initializeComplyCube = async () => {
    const email = currentUser?.attributes?.email;
    const firstName = currentUser?.attributes?.profile?.firstName;
    const lastName = currentUser?.attributes?.profile?.lastName;
    const userData = { email, firstName, lastName, userID: currentUser?.id?.uuid, userType: 'host' };

    const tokenRes = await complyCubeApi({ userData });

    if (tokenRes.token) {
      const complycube =
        typeof window !== 'undefined' &&
        window.ComplyCube.mount({
          token: tokenRes.token,
          onComplete: async (data) => {
            try {
              if(data?.documentCapture?.documentId) {

                const updatedValues = {
                  publicData: {
                    verificationCount: verificationCount + 1,
                  },
                  protectedData: {
                    verification_status: 'in progress',
                    hostMetaData: {
                      hostIdentityStatus : 'in progress'
                    }
                  },
                };

                onUpdateProfile(updatedValues);
              }

              await createCheckApi({
                clientId: tokenRes.clientId,
                documentId: data?.documentCapture?.documentId,
                userID: currentUser?.id?.uuid,
                userType: "host"
              });
            } catch(e) {
              const updatedValues = {
                protectedData: {
                  verification_status: 'not_verified',
                  hostMetaData: {
                    hostIdentityStatus : 'not_verified'
                  }
                },
              };

              onUpdateProfile(updatedValues);
            }

          },
          onModalClose: function () {
            complycube.updateSettings({ isModalOpen: false });
          },
          onError: function ({ type, message }) {
            console.error('ComplyCube error:', type, message);
          },
        });
    }
  };

  const disableSubmitBtn =
    hostStatus === undefined ||
    hostStatus !== 'verified' ||
    (verificationOutcome && verificationOutcome !== "clear")

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <div className={css.mati}>
        <div className={css.verifingSec}>
          <div>
            {verificationOutcome === "attention"
              ? <p>Tu documento ha sido enviado, pero hemos indicado algunos problemas y necesitamos tiempo para revisarlo.</p>
              : null}

            {(hostStatus === "not_verified" ||
              (verificationOutcome === "not processed" && hostStatus !== "in progress")
            ) && verificationCount < 3
              ? (<p>Hubo un problema con la verificación del documento. ¡Por favor, inténtalo de nuevo!</p>)
              : null
            }

            {(
              (hostStatus !== 'verified' && hostStatus !== 'in progress') ||
              (verificationOutcome !== "clear" && hostStatus !== 'in progress')
            ) && verificationCount < 3  ? (
              <div id="complycube-mount">
                <Button className={css.verificationButton} onClick={initializeComplyCube}>
                  Iniciar verificación
                </Button>
              </div>
              ) : null
            }
            {hostStatus === "in progress" ? (
              <>
                <div> Tu documento ha sido enviado. Por favor, espera mientras completamos la verificación. </div>
                <Button className={css.verificationButton} onClick={reloadPage}>
                  Verificar estado de verificación
                </Button>
              </>
            ) : null}
            {hostStatus === 'verified' && (!verificationOutcome || verificationOutcome === "clear") ? <p> Tu cuenta está verificada. </p> : null}
            {verificationCount >= 3
              ? <p> Lo siento, no podemos verificar tu cuenta. Por favor <a href={window.location.href.replace(window.location.pathname,"/contact")} target='_blank'>Contáctenos</a> aquí para más detalles.</p>
              : null}
          </div>
        </div>

      </div>

      <div className={css.buttonsHolder}>
        <span className={css.button} onClick={previousStep}>
          Regresar
        </span>

        <PrimaryButton
          type='submit'
          disabled={disableSubmitBtn}
          className={css.button}
          onClick={nextStep}
        >
          Continuar verificación
        </PrimaryButton>
      </div>
    </div>
  );
};

IdentityHostPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
};

IdentityHostPanel.propTypes = {
  className: string,
  rootClassName: string,
};

export default IdentityHostPanel;
