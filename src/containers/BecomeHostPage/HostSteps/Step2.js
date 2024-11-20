import React, { useState } from 'react';
import { Button } from '../../../components';
import css from '../../HostDetailsPage/HostDetailsPage.module.css';

const matiClientId = process.env.REACT_APP_MATI_CLIENT_ID;
const hostFlowId = process.env.REACT_APP_MATI_DRIVER_PROFILE_FLOW_ID;

function Step2(props) {
  const {
    hostIdentificationPogress,
    hostIdentification,
    currentUser,
    isIdCompleted,
    setStep,
    isCompany = false,
  } = props;
  const [customEnable, setCustomEnable] = useState(false);
  return (
    <div>
      <p className={css.label}>Photo of ID / Passport / Licence</p>
      {hostIdentificationPogress === 'loading' || hostIdentification === 'inProgress' ? (
        <p className={css.loadingLabel}>
          We are checking your files, this might take a few minutes ...{' '}
        </p>
      ) : (
        <div onClick={() => setCustomEnable(!customEnable)}>
          <mati-button
            clientid={matiClientId}
            flowId={hostFlowId}
            metadata={`{"userId":"${currentUser.id.uuid}"}`}
            language='es'
            fixedLanguage='es'
            color='orange'
          />
        </div>
      )}
      {isCompany ? (
        <Button className={css.submitButton} type="button" onClick={() => setStep(2)}>
          Verificación de identidad
        </Button>
      ) : (
        <Button
          className={css.submitButton}
          disabled={!customEnable}
          type="button"
          onClick={() => setStep(2)}
        >
          Next : Payout
        </Button>
      )}
    </div>
  );
}

export default Step2;
