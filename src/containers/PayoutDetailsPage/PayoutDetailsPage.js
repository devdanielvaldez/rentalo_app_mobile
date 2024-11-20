import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  // LayoutWrapperFooter,
  // Footer,
  Page,
  LayoutSideNavigation,
  LayoutWrapperAccountSettingsSideNav,
} from '../../components';
import { TopbarContainer } from '../../containers';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import {
  getOdooBanks,
  assignBankAccountToContact,
  updateBankAccountInContact,
} from './PayoutDetailsPage.duck';
import PayoutDetailsForm from './components/PayoutDetailsForm/PayoutDetailsForm';

import css from './PayoutDetailsPage.module.css';

const PayoutDetailsPageComponent = ({
  currentUser,
  scrollingDisabled,
  intl,
  onGetOdooBanks,
  banks,
  banksInProgress,
  onAssignBankAccountToContact,
  attachBankToAccountError,
  attachBankToAccountInProgress,
  onUpdateBankAccountInContact,
  attachBankToAccountSuccess,
}) => {
  const title = intl.formatMessage({ id: 'PayoutDetailsPage.title' });

  const {
    bankName,
    country,
    odoo_bank_account_id,
  } = currentUser?.attributes?.profile?.privateData ?? {};

  const handleSubmit = (formValues) => {
    const odooUserId = currentUser.attributes.profile.privateData?.odoo_user_id;
    const odooBankAccountId = currentUser.attributes.profile.privateData?.odoo_bank_account_id;

    const {
      banksNames,
      bankAccountNumber,
      routingNumber,
      iban,
      country,
    } = formValues;

    const payload = {
      "partner_id": odooUserId,
      "currency_id": 2, // ???
      country: country,
    }

    if (banksNames) {
      payload.bank_id = +banksNames;
      payload.bankName = banks.find(({id}) => id === +banksNames)?.name ?? null;
    }
    if (routingNumber) {
      payload.x_studio_x_routing_number = routingNumber;
    }
    if (iban) {
      payload.acc_number = iban;
    }
    if (bankAccountNumber) {
      payload.acc_number = bankAccountNumber
    }

    return odooBankAccountId
      ? onUpdateBankAccountInContact({ ...payload, odooBankAccountId })
      : onAssignBankAccountToContact(payload);
  }

  const initialValues = {
    country: country,
    routingNumber: country === "United States" ? "●●●●●●●●●●" : undefined,
    bankAccountNumber: country === "Dominican Republic" || country === "United States" ? "●●●●●●●●●●" : undefined,
    iban: country && country !== "United States" && country !== "Dominican Republic" ? "●●●●●●●●●●" : undefined,
    banksNames: banks.find(({name}) => name === bankName)?.id.toString(),
  }

  useEffect(() => {
    if (bankName && !banks.length && !banksInProgress) {
      onGetOdooBanks();
    }
  }, [])

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
       <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="PayoutDetailsPage" pageName={['Payout details page']} />
            <div className={css.sideNav}>
              <ProfileNav />
            </div>
          </LayoutWrapperTopbar>
          <LayoutWrapperAccountSettingsSideNav
            currentTab="PayoutDetailsPage"
            currentUser={currentUser}
          />
          <LayoutWrapperMain>
            <div className={css.content}>
              <PayoutDetailsForm
                initialValues={initialValues}
                bankAccountId={odoo_bank_account_id}
                banks={banks}
                banksInProgress={banksInProgress}
                onSubmit={handleSubmit}
                onGetOdooBanks={onGetOdooBanks}
                attachBankToAccountInProgress={attachBankToAccountInProgress}
                attachBankToAccountSuccess={attachBankToAccountSuccess}
              />

              {attachBankToAccountError && attachBankToAccountError.message
                ? <p className={css.error}>{attachBankToAccountError.message}</p>
                : null
              }
            </div>
          </LayoutWrapperMain>
        </LayoutSideNavigation>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}

    </Page>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    banks,
    banksInProgress,
    attachBankToAccountError,
    attachBankToAccountInProgress,
    attachBankToAccountSuccess,
  } = state.PayoutDetailsPage;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    banks,
    banksInProgress,
    attachBankToAccountError,
    attachBankToAccountInProgress,
    attachBankToAccountSuccess,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetOdooBanks: () => dispatch(getOdooBanks()),
  onAssignBankAccountToContact: (params) =>
    dispatch(assignBankAccountToContact(params)),
  onUpdateBankAccountInContact: (params) =>
    dispatch(updateBankAccountInContact(params)),
});

const PayoutDetailsPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(PayoutDetailsPageComponent);

export default PayoutDetailsPage;
