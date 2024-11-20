import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { injectIntl } from '../../util/reactIntl';
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';
import VerificationWizard from './VerificationWizard';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  // LayoutWrapperFooter,
  // Footer,
  NamedRedirect,
} from '../../components';
import css from './VerificationPage.module.css';
import SideNav from '../../components/SideNav/SideNav';
import { getBusinessName } from '../HostDetailsPage/HostDetailsPage.duck';

import {
  getOdooBanks,
  assignBankAccountToContact,
  updateBankAccountInContact,
} from '../PayoutDetailsPage/PayoutDetailsPage.duck';

import { steps } from './data';
import {
  // getDriverStatus,
  // getHostStatus,
  // getPaymentMethod,
  getVerifiedSteps,
  accountIsNotVerified,
} from '../../util/dataExtractors';
import { ensureCurrentUser } from '../../util/data';
import { updateOdooUser } from './VerificationPage.duck';

const VerificationPageComponent = props => {
  const {
    onUpdateProfile,
    onFetchCurrentUser,
    currentUser,
    history,
    location,
    updateInProgress,
    updateProfileError,
    onGetBusinessName,
    onGetOdooBanks,
    banks,
    banksInProgress,
    onAssignBankAccountToContact,
    attachBankToAccountInProgress,
    onManageDisableScrolling,
    attachBankToAccountError,
    onUpdateOdooUser,
    onUpdateBankAccountInContact,
  } = props;

  const isDriver = location?.pathname?.includes('/verification/driver');
  const pageName = isDriver ? ['Verificación del conductor'] : ['Verificación del propietario'];

  if (location?.state?.newListing) {
    return <NamedRedirect name="VerificationPage" params={{ tab: 'host' }} />;
  }

  const user = ensureCurrentUser(currentUser);
  // const currentEmail = user.attributes.email || '';
  // const emailVerified = user.attributes.emailVerified;
  // const protectedData = user?.attributes.profile.protectedData || {};
  // const currentPhoneNumber = protectedData.phoneNumber || '';
  // const hostInsuranceDetails = protectedData?.hostInsuranceDetails;
  // const accountType = protectedData?.hostIdentification?.accountType;
  // const profileImage = user?.profileImage?.id;
  // const hostStatus = getHostStatus(user);
  // const driverStatus = getDriverStatus(user);
  // const identityStatus = isDriver ? driverStatus : hostStatus;
  // const cardData = getPaymentMethod(currentUser);
  // const privateData = user?.attributes.profile.privateData || {};
  // const odooBankAccount = privateData.odoo_bank_account_id;
  // const { odooAccountUpdated } = user?.attributes?.profile?.publicData ?? {};

  const verifiedSteps = getVerifiedSteps(steps, user, isDriver);
  const accountNotVerified = accountIsNotVerified(verifiedSteps, isDriver);

  const driverSteps = verifiedSteps.filter(step => step.isDriver);
  const hostSteps = verifiedSteps.filter(step => step.isHost);
  const filteredSteps = isDriver ? driverSteps : hostSteps;

  // if (!accountNotVerified && odooAccountUpdated) {
  //   return <NamedRedirect name="LandingPage" />;
  // }

  return (
    <StaticPage
      title="Página de verificación"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'VerificationPage',
        description: 'VerificationPage Rentalo',
        name: 'Verification page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper}>
            <VerificationWizard
              onUpdateProfile={onUpdateProfile}
              onFetchCurrentUser={onFetchCurrentUser}
              currentUser={currentUser}
              history={history}
              onGetBusinessName={onGetBusinessName}
              updateInProgress={updateInProgress}
              updateProfileError={updateProfileError}
              isDriver={isDriver}
              onGetOdooBanks={onGetOdooBanks}
              banks={banks}
              banksInProgress={banksInProgress}
              onAssignBankAccountToContact={onAssignBankAccountToContact}
              attachBankToAccountInProgress={attachBankToAccountInProgress}
              onUpdateOdooUser={onUpdateOdooUser}
              onUpdateBankAccountInContact={onUpdateBankAccountInContact}
              onManageDisableScrolling={onManageDisableScrolling}
              accountNotVerified={accountNotVerified}
              filteredSteps={filteredSteps}
              verifiedSteps={verifiedSteps}
              attachBankToAccountError={attachBankToAccountError}
            />
          </div>
        </LayoutWrapperMain>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}
      </LayoutSingleColumn>
    </StaticPage>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  const {
    banks,
    banksInProgress,
    attachBankToAccountInProgress,
    attachBankToAccountError,
  } = state.PayoutDetailsPage;

  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,

    banks,
    banksInProgress,
    attachBankToAccountInProgress,
    attachBankToAccountError,
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onFetchCurrentUser: data => dispatch(fetchCurrentUser(data)),
  onGetBusinessName: params => dispatch(getBusinessName(params)),
  onGetOdooBanks: () => dispatch(getOdooBanks()),
  onAssignBankAccountToContact: params => dispatch(assignBankAccountToContact(params)),
  onUpdateBankAccountInContact: params => dispatch(updateBankAccountInContact(params)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onUpdateOdooUser: params => dispatch(updateOdooUser(params)),
});

const VerificationPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(VerificationPageComponent);

export default VerificationPage;
