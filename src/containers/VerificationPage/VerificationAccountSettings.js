import React, { useEffect } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { injectIntl } from '../../util/reactIntl';
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';
// import VerificationWizard from './VerificationWizard';
import {
  // LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  NamedRedirect,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSideNavigation,
  NamedLink,
} from '../../components';
import css from './VerificationAccountSettings.module.css';
import SideNav from '../../components/SideNav/SideNav';
import { getBusinessName } from '../HostDetailsPage/HostDetailsPage.duck';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FormattedMessage } from 'react-intl';
import {
  getOdooBanks,
  assignBankAccountToContact,
  updateBankAccountInContact,
} from '../PayoutDetailsPage/PayoutDetailsPage.duck';

import { steps } from './data';
import {
  getVerifiedSteps,
  accountIsNotVerified,
  // isDriverVerified,
} from '../../util/dataExtractors';
import { ensureCurrentUser } from '../../util/data';
import { updateOdooUser } from './VerificationPage.duck';

const VerificationAccountSettingsComponent = props => {
  const {
    currentUser,
    location,
  } = props;


  const isDriver = location?.pathname?.includes('/verification/driver');
  const pageName = isDriver ? ['Verificación del conductor'] : ['Verificación del propietario'];

  if (location?.state?.newListing) {
    return <NamedRedirect name="VerificationPage" params={{ tab: 'host' }} />;
  }

  const user = ensureCurrentUser(currentUser);

  const verifiedSteps = getVerifiedSteps(steps, user, isDriver);
  const driverNotVerified = accountIsNotVerified(verifiedSteps, isDriver);
  const hostNotVerified = accountIsNotVerified(verifiedSteps, false);

  return (
    <StaticPage
    >
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          {/* <TopbarContainer pageName={pageName} /> */}
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="VerificationAccountSettings"
          currentUser={currentUser}
        />
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.content}>
            <h2 className={css.subTitle}>
              Para garantizar la seguridad de nuestra comunidad, necesitamos verificar a cada
              usuario que desee alquilar un coche en Rentalo. El proceso solo lleva 5 minutos en
              completarse. Asegúrate de tener tus documentos de identidad a mano para
              proporcionarlos cuando se te soliciten.
            </h2>
            <div className={css.buttonsHolder}>
              <NamedLink name="VerificationPage" params={{ tab: 'driver' }} className={css.button}>
                {driverNotVerified ? (
                  <FormattedMessage id="ResultPanel.ResultPanel.driverVerification" />
                ) : (
                  <span>
                    <IoMdCheckmarkCircleOutline className={css.successIcon} />
                    <FormattedMessage id="ResultPanel.ResultPanel.driverVerification" />
                  </span>
                )}
              </NamedLink>
              <NamedLink name="VerificationPage" params={{ tab: 'host' }} className={css.button}>
                {hostNotVerified ? (
                  <FormattedMessage id="ResultPanel.ResultPanel.hostVerification" />
                ) : (
                  <span>
                    <IoMdCheckmarkCircleOutline className={css.successIcon} />
                    <FormattedMessage id="ResultPanel.ResultPanel.hostVerification" />
                  </span>
                )}
              </NamedLink>
            </div>
          </div>
        </LayoutWrapperMain>
      </LayoutSideNavigation>
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

const VerificationAccountSettings = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(VerificationAccountSettingsComponent);

export default VerificationAccountSettings;
