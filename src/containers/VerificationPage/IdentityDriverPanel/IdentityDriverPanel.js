import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../../util/reactIntl';
import css from '../VerificationPage.module.css';
import { ensureCurrentUser } from '../../../util/data';
import { Button, PrimaryButton } from '../../../components';
import { verification } from '../../../marketplace-custom-config';
import { getDriverStatus } from '../../../util/dataExtractors';
import { complyCubeApi, createCheckApi } from '../../../util/api';

const IdentityDriverPanel = props => {
  const {
    className,
    rootClassName,
    // submitButtonText,
    previousStep,
    nextStep,
    onUpdateProfile,
    currentUser,
    history,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const panelTitle = <FormattedMessage id='IdentityDriverPanel.title' />;

  const user = ensureCurrentUser(currentUser);
  const driverStatus = getDriverStatus(user);
  const verificationMessage = verification.filter(x => x.key === driverStatus).map(x => x.msg);

  const verificationCount = user?.attributes?.profile?.publicData?.verificationCount ?? 0;
  const verificationOutcome = user?.attributes?.profile?.protectedData?.verification_outcome;

  const initializeComplyCube = async () => {
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
          onComplete: async (data) => {
            try {
              if(data?.documentCapture?.documentId) {
                const updatedValues = {
                  publicData: {
                    verificationCount: verificationCount + 1,
                  },
                  protectedData: {
                    verification_status: 'in progress',
                    driverMetaData: {
                      driverIdentityStatus :  'in progress'
                    }
                  },
                };

                onUpdateProfile(updatedValues);
              }

              await createCheckApi({
                clientId: tokenRes.clientId,
                documentId: data?.documentCapture?.documentId,
                userID: currentUser?.id?.uuid,
                userType: 'driver',
              });

            } catch(e) {
              const updatedValues = {
                protectedData: {
                  verification_status: 'not_verified',
                  driverMetaData: {
                    hostIdentityStatus : 'not_verified'
                  }
                },
              };
              onUpdateProfile(updatedValues);
            }

          },
          onModalClose: function() {
            complycube.updateSettings({ isModalOpen: false });
          },
          onError: function({ type, message }) {
            console.error('ComplyCube error:', type, message);
          },
        });
    }
  };

  const reloadPage = () => history.go(0);

  const disableSubmitBtn =
    driverStatus === undefined ||
    driverStatus !== 'verified' ||
    (verificationOutcome && verificationOutcome !== "clear")

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <div className={css.mati}>
        {verificationOutcome === "attention"
          ? <p>Your document is submitted but we indicated some issues and need some time to review that.</p>
          : null}

        {(driverStatus === "not_verified" ||
          (verificationOutcome === "not processed" && driverStatus !== "in progress")
        ) && verificationCount < 3
          ? (<p>Hubo un problema con la verificación del documento. ¡Por favor, inténtalo de nuevo!</p>)
          : null
        }

        {(
          (driverStatus !== 'verified' && driverStatus !== 'in progress') ||
          (verificationOutcome !== "clear" && driverStatus !== 'in progress')
          ) && verificationCount < 3 ? (
          <div id="complycube-mount">
            <Button className={css.verificationButton} onClick={initializeComplyCube}>
            Iniciar verificación
            </Button>
          </div>
          ) : null
        }
        {driverStatus === "in progress" ? (
          <>
            <div>Tu documento ha sido enviado. Por favor espera mientras completamos la verificación.</div>
              <Button className={css.verificationButton} onClick={reloadPage}>
              Verificar estado de verificación
              </Button>
            </>
          ) : null}
        {driverStatus === 'verified' && (!verificationOutcome || verificationOutcome === "clear") ? <p className={css.verifingMsg}>{verificationMessage}</p> : null}
        {verificationCount >= 3
          ? <p>Lo siento, no podemos verificar tu cuenta. Por favor <a href={window.location.href.replace(window.location.pathname,"/contact")} target='_blank'>Contáctanos</a> aquí para más detalles.</p>
          : null}

        {/* {driverStatus === 'verified' ? <div>
            <p  >{verificationMessage}</p>
          </div> :
          <div
            className={css.verifyStatus}
          >
            <div>
              {driverStatus !== 'verified' ?
                <div id='complycube-mount'>
                  <Button className={css.verificationButton} onClick={() => initializeComplyCube()}>
                    Start Verification
                  </Button>
                </div> : (<h2>Your account is verified</h2>)}
            </div>
          </div>} */}

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

IdentityDriverPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
};

IdentityDriverPanel.propTypes = {
  className: string,
  rootClassName: string,
};

export default IdentityDriverPanel;
