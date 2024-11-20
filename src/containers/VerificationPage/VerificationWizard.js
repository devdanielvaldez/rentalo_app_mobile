import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withViewport } from '../../util/contextHelpers';
import { injectIntl } from '../../util/reactIntl';

import StepWizard from 'react-step-wizard';
import ResultPanel from './ResultPanel/ResultPanel';
import ProfileImagePanel from './ProfileImagePanel/ProfileImagePanel';
import ContactDetailsPanel from './ContactDetailsPanel/ContactDetailsPanel';
import IdentityDriverPanel from './IdentityDriverPanel/IdentityDriverPanel';
import IdentityHostPanel from './IdentityHostPanel/IdentityHostPanel';
import CompanyIndividualPanel from './CompanyIndividualPanel/CompanyIndividualPanel';
import PaymentPanel from './PaymentPanel/PaymentPanel';
// import StripePanel from './StripePanel/StripePanel';
import InsurancePanel from './InsurancePanel/InsurancePanel';
import BankAccountPanel from './BankAccountPanel/BankAccountPanel';
// import Tabs, { Tab } from 'react-best-tabs';

import { countryList } from '../../constants/countriesList';

import '../../styles/React_Tab.css';

import css from './VerificationPage.module.css';

const VerificationWizard = props => {
  const {
    onUpdateProfile,
    currentUser,
    history,
    onFetchCurrentUser,
    onGetBusinessName,
    updateInProgress,
    updateProfileError,
    isDriver,

    onGetOdooBanks,
    banks,
    banksInProgress,
    onAssignBankAccountToContact,
    attachBankToAccountInProgress,
    attachBankToAccountError,
    onUpdateOdooUser,
    onUpdateBankAccountInContact,

    onManageDisableScrolling,
    accountNotVerified,
    filteredSteps,
    verifiedSteps,
    hostNotVerified,

    // setDisabledRedirect,
  } = props;

  const { odooAccountUpdated } = currentUser?.attributes?.profile?.publicData ?? {};

  useEffect(() => {
    const handleUserKeyPress = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, []);

  const handleUpdateOdooUser = () => {
    const getCountry = code => countryList[code];

    const getUserBirthday = birthday => {
      const { day, month, year } = birthday;

      return `${year}-${month}-${day}`;
    };

    const {
      attributes: {
        profile: {
          firstName,
          lastName,
          protectedData: {
            driverMetaData,
            hostMetaData,
            phoneNumber,
            hostPhoneNumber,
            driverPhoneNumber,
          },
          privateData: { odoo_user_id },
        },
      },
    } = currentUser;

    const { documentDetails, holderDetails } = isDriver ? driverMetaData : hostMetaData;

    const phone = phoneNumber ? phoneNumber : isDriver ? driverPhoneNumber : hostPhoneNumber;

    const documentFirstName =
      holderDetails?.firstName?.reduce((total, cur) => total + ' ' + cur) ?? firstName;
    const documentLastName =
      holderDetails?.lastName?.reduce((total, cur) => total + ' ' + cur) ?? lastName;

    const odooUserData = {
      name: `${documentFirstName} ${documentLastName}`,
      x_document_type: documentDetails?.documentType,
      x_document_number: documentDetails?.documentNumber,
      mobile: phone,
      company_type: 'person',
      x_studio_date_of_birth_1: holderDetails?.dob ? getUserBirthday(holderDetails?.dob) : null,
    };

    const odooUserMetadata = {
      countryName: documentDetails?.issuingCountry
        ? getCountry(documentDetails?.issuingCountry)
        : null,
    };

    onUpdateOdooUser({
      odooUserId: odoo_user_id,
      odooUserData,
      odooUserMetadata,
    });
  };

  useEffect(() => {
    if (!accountNotVerified && !odooAccountUpdated) {
      handleUpdateOdooUser();

      const {
        attributes: {
          profile: {
            firstName,
            lastName,
            protectedData: { driverMetaData, hostMetaData },
          },
        },
      } = currentUser;

      const { holderDetails } = isDriver ? driverMetaData : hostMetaData;

      const documentFirstName =
        holderDetails?.firstName?.reduce((total, cur) => total + ' ' + cur) ?? firstName;
      const documentLastName =
        holderDetails?.lastName?.reduce((total, cur) => total + ' ' + cur) ?? lastName;

      onUpdateProfile({
        firstName: documentFirstName,
        lastName: documentLastName,
      });
    }
  }, [accountNotVerified]);

  return (
    <div className={css.wizardHolder}>
      <StepWizard className={css.stepWizard} transitions="nothing">
        <ResultPanel
          verifiedSteps={verifiedSteps}
          filteredSteps={filteredSteps}
          accountNotVerified={accountNotVerified}
          hostNotVerified={hostNotVerified}
          className={css.stepItem}
          isDriver={isDriver}
          showTabs={true}
          history={history}
          currentUser={currentUser}
        />

        <ProfileImagePanel
          history={history}
          onFetchCurrentUser={onFetchCurrentUser}
          currentUser={currentUser}
          onUpdateProfile={onUpdateProfile}
        />

        <ContactDetailsPanel
          isDriver={isDriver}
          onFetchCurrentUser={onFetchCurrentUser}
          currentUser={currentUser}
          onUpdateProfile={onUpdateProfile}
        />

        {!isDriver && (
          <IdentityHostPanel
            updateInProgress={updateInProgress}
            updateProfileError={updateProfileError}
            onGetBusinessName={onGetBusinessName}
            onFetchCurrentUser={onFetchCurrentUser}
            currentUser={currentUser}
            onUpdateProfile={onUpdateProfile}
            history={history}
          />
        )}

        {isDriver && (
          <IdentityDriverPanel
            onFetchCurrentUser={onFetchCurrentUser}
            currentUser={currentUser}
            onUpdateProfile={onUpdateProfile}
            history={history}
          />
        )}

        {!isDriver && (
          <CompanyIndividualPanel
            updateInProgress={updateInProgress}
            updateProfileError={updateProfileError}
            onGetBusinessName={onGetBusinessName}
            onFetchCurrentUser={onFetchCurrentUser}
            currentUser={currentUser}
            onUpdateProfile={onUpdateProfile}
          />
        )}
        {!isDriver ? (
          <BankAccountPanel
            currentUser={currentUser}
            onGetOdooBanks={onGetOdooBanks}
            banks={banks}
            banksInProgress={banksInProgress}
            onAssignBankAccountToContact={onAssignBankAccountToContact}
            attachBankToAccountInProgress={attachBankToAccountInProgress}
            attachBankToAccountError={attachBankToAccountError}
            onUpdateBankAccountInContact={onUpdateBankAccountInContact}
          />
        ) : null}
        {isDriver && (
          <PaymentPanel
            isDriver={isDriver}
            onFetchCurrentUser={onFetchCurrentUser}
            currentUser={currentUser}
            onUpdateProfile={onUpdateProfile}
            accountNotVerified={accountNotVerified}
            history={history}
          />
        )}

        {!isDriver && (
          <InsurancePanel
            history={history}
            isDriver={isDriver}
            accountNotVerified={accountNotVerified}
            onManageDisableScrolling={onManageDisableScrolling}
            onFetchCurrentUser={onFetchCurrentUser}
            currentUser={currentUser}
            onUpdateProfile={onUpdateProfile}
            // setDisabledRedirect={setDisabledRedirect}
          />
        )}
      </StepWizard>
    </div>
  );
};

VerificationWizard.defaultProps = {
  className: null,
  currentUser: null,
  rootClassName: null,
};

export default compose(withViewport, injectIntl)(VerificationWizard);
