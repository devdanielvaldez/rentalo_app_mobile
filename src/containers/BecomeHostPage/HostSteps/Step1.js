import React from 'react';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import css from '../../HostDetailsPage/HostDetailsPage.module.css';
import { Button } from '../../../components';

function Step1(props) {
  const {
    setFirstName,
    setLastName,
    setDob,
    firstName,
    lastName,
    dob,
    setStep,
    onUpdateProfile,
    type,
  } = props;

  return (
    <div>
      <div>
        <p className={css.label}>First name</p>
        <input
          id="firstName"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
          placeholder="John"
          className={css.input1}
        />
      </div>
      <div>
        <p className={css.label}>Last name</p>
        <input
          id="lastName"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
          }}
          placeholder="Doe"
          className={css.input1}
        />
      </div>
      <p className={css.label}>Date of birth</p>
        <input
          className={css.inputBox}
          type="date"
          value={dob}
          id="startDateTime"
          name="startDateTime"
          label={'Date'}
          onChange={e => {
            setDob(e.target.value);
          }}
          derInput={params => <TextField {...params} />}
        />
      <Button
        className={css.submitButton}
        type="button"
        onClick={() => {
          onUpdateProfile({
            protectedData: {
              hostProfile: {
                type: type,
                firstName: firstName,
                lastName: lastName,
                dob: dob.toString(),
                isHost: false,
              },
            },
          }).then(() => {
            setStep(1);
          });
        }}
        disabled={!firstName || !lastName || !dob}
      >
        Next : Identity Verification
      </Button>
    </div>
  );
}

export default Step1;
