import { Button } from '@material-ui/core';
import React from 'react';
import { NamedLink } from '../../../components';
import css from '../../HostDetailsPage/HostDetailsPage.module.css';

function Step3(props) {
  const { setCompanyName, setIdNumber, idNumber, companyName, onUpdateProfile, setStep } = props;

  return (
    <div>
      <p className={css.label}>Commercial name</p>
      <input
        id="companyName"
        value={companyName}
        onChange={e => {
          return setCompanyName(e.target.value);
        }}
        placeholder="Apex Co"
        className={css.input2}
      />

      <p className={css.label}>Id number or RNC</p>
      <input
        id="idNumber"
        value={idNumber}
        onChange={e => {
          return setIdNumber(e.target.value);
        }}
        placeholder="RD123456"
        className={css.input2}
      />
      <Button
        className={css.submitButton}
        type="button"
        onClick={() => {
          onUpdateProfile({
            protectedData: {
              hostProfile: {
                companyName,
                idNumber,
              },
            },
          }).then(() => {
            setStep(3);
          });
        }}
        disabled={!companyName || !idNumber}
      >
        Next : Verify Payout
      </Button>
    </div>
  );
}

export default Step3;
