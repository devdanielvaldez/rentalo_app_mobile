import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../../util/reactIntl';
import css from '../VerificationPage.module.css';
import { ensureCurrentUser } from "../../../util/data";
import { getHostIdentification } from '../../../util/dataExtractors';
import { AccountTypeForm } from '../../../forms';

const CompanyIndividualPanel = props => {
  const {
    className,
    rootClassName,
    // submitButtonText,
    nextStep,
    previousStep,
    onUpdateProfile,
    currentUser,
    // onFetchCurrentUser,
    onGetBusinessName,
    updateInProgress,
    updateProfileError,
  } = props;

  const classes = classNames(rootClassName || css.root, className);

  const panelTitle = <FormattedMessage id="PayoutDetailsForm.payoutDetails" />;

  const user = ensureCurrentUser(currentUser);
  const hostIdentification = getHostIdentification(user);
  const protectedData = user?.attributes.profile.protectedData || {};
  const accountType = protectedData?.hostIdentification?.accountType;
  const accountNumber = protectedData?.hostIdentification?.accountNumber;
  const idNumber = protectedData?.hostIdentification?.idNumber;


  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <AccountTypeForm
        initialValues={{accountType, accountNumber, idNumber, idNumberMask: idNumber}}
        className={css.form}
        currentUser={currentUser}
        updateInProgress={updateInProgress}
        updateProfileError={updateProfileError}
        onSubmit={values => {
          onUpdateProfile({
            protectedData: {
              hostIdentification: { hostIdentification, ...values},
            },
          }).then(() => nextStep());
        }}
        isHostApproval={true}
        onGetBusinessName={onGetBusinessName}
        previousStep={previousStep}
        nextStep={nextStep}
        isVerificationPage={true}
        btnHolderClassName={css.buttonsHolder}
        prevNextBtnClassName={css.button}
      />
    </div>
  );
};

CompanyIndividualPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
};

CompanyIndividualPanel.propTypes = {
  className: string,
  rootClassName: string,
};

export default CompanyIndividualPanel;
