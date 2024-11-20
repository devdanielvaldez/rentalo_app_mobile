import React, { useState } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../ProfileSettingsPage/ProfileSettingsPage.duck';
import InsuranceDetailsForm from '../../InsuranceDetailPage/InsuranceDetailsForm';
import { FormattedMessage } from '../../../util/reactIntl';
import Modal from '../../../components/Modal/Modal';

import {
  getVerifiedSteps,
  accountIsNotVerified
} from '../../../util/dataExtractors';
import { steps } from '../data';

import css from '../VerificationPage.module.css';


const InsurancePanel = (props) => {
  const { previousStep, onManageDisableScrolling, accountNotVerified, history, isDriver } = props;

  const [isOpen, setOpen] = useState(false);

  const { currentUser } = useSelector(state => state?.user);
  const { updateInProgress } = useSelector(state => state?.ProfileSettingsPage);

  const dispatch = useDispatch();
  const { protectedData } = currentUser?.attributes?.profile || {};
  const { hostInsuranceDetails = {} } = protectedData || {};
  const title = <FormattedMessage id='InsurancePanel.title' />;

  const handleClose = () => {
    setOpen(false);
    // setDisabledRedirect(false);

    if (!accountNotVerified) {
      history.push('/l/new');
    }
  };

  const handleSubmit = (values) => {
    // setDisabledRedirect(true);

    try {
      const updatedValues = {
        protectedData: { hostInsuranceDetails: values },
      };
      dispatch(updateProfile(updatedValues)).then((response) => {
        const user = response?.data?.data;
        const verifiedSteps = getVerifiedSteps(steps, user, isDriver);
        const accountNotVerified = accountIsNotVerified(verifiedSteps, isDriver);

        if (!accountNotVerified) {
          setOpen(true);
        }
      });
    } catch (error) {
      console.log('error', error);
    }

  };
  return (
    <>
      <h1 className={css.title}>{title}</h1>
      <div className={css.hostlWrapper}>
        <InsuranceDetailsForm
          className={css.form}
          inSubmitProgress={updateInProgress}
          initialValues={hostInsuranceDetails}
          onSubmit={values => handleSubmit(values)}
          currentUser={currentUser}
          previousStep={previousStep}
          isVerificationPage={true}
          btnHolderClassName={css.buttonsHolder}
          prevNextBtnClassName={css.button}
        />

        <Modal
          {...props}
          isOpen={isOpen}
          onClose={handleClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.modalContent}>
            <h2 className={css.modalTitle}>¡Felicidades!</h2>
            <div className={css.modalText}>
              <p>Tu cuenta está ahora verificada.</p>
              <p>Puedes comenzar a publicar tus vehículos.</p>
            </div>

            <button className={classNames(css.button, css.closeModalBtn)} onClick={handleClose}>Ok</button>

          </div>
        </Modal>
      </div>
    </>
  );
};

export default InsurancePanel;
