import React from 'react';
import { node, number, string, shape } from 'prop-types';
import { compose } from 'redux';

import { FormattedMessage } from '../../util/reactIntl';
import { withViewport } from '../../util/contextHelpers';
import { LayoutWrapperSideNav } from '../../components';

import { getDriverPhoneNumber, getHostStatus } from '../../util/dataExtractors';

const LayoutWrapperAccountSettingsSideNavComponent = props => {
  const { currentTab, currentUser } = props;

  const contactDetailsComplete =
    getDriverPhoneNumber(currentUser) && currentUser?.attributes?.emailVerified;
  const paymentMethodsComplete =
    currentUser?.stripeCustomer?.defaultPaymentMethod ||
    currentUser?.relationships?.stripeCustomer?.data?.id ||
    currentUser?.attributes?.stripeConnected ||
    currentUser?.attributes?.profile?.privateData?.stripePaymentMethod;

  const hostStatus = getHostStatus(currentUser);
  const isHostVerfied = hostStatus === 'verified';

  const tabs = isHostVerfied
    ? [
        {
          text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.profileTabTitle" />,
          selected: currentTab === 'DriverApprovalPage',
          id: 'DriverApprovalPageTab',
          linkProps: {
            name: 'DriverApprovalPage',
            params: { step: 'profile' },
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.contactDetailsTabTitle" />
          ),
          selected: currentTab === 'ContactDetailsPage',
          id: 'ContactDetailsPageTab',
          linkProps: {
            name: 'ContactDetailsPage',
            completed: contactDetailsComplete,
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.LayoutWrapperAccountSettingsSideNav.changePassword" />
          ),
          selected: currentTab === 'PasswordChangePage',
          id: 'PasswordChangePageTab',

          linkProps: {
            name: 'PasswordChangePage',
            completed: false,
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.LayoutWrapperAccountSettingsSideNav.verificationHost" />
          ),
          selected: currentTab === 'VerificationAccountSettings',
          id: 'VerificationAccountSettingsTab',
          linkProps: {
            name: 'VerificationAccountSettings',
            completed: false,
            params: { tab: 'host' },
          },
        },

        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />
          ),
          selected: currentTab === 'PaymentMethodsPage',
          id: 'PaymentMethodsPageTab',
          linkProps: {
            name: 'PaymentMethodsPage',
            completed: paymentMethodsComplete,
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.payoutDetailsPageTabTitle" />
          ),
          selected: currentTab === 'PayoutDetailsPage',
          id: 'PayoutDetailsPageTab',
          linkProps: {
            name: 'PayoutDetailsPage',
          },
        },
        {
          text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.deleteAccountTabTitle" />,
          selected: currentTab === 'DeleteAccountPage',
          id: 'DeleteAccountPageTab',
          linkProps: {
            name: 'DeleteAccountPage',
          },
        },
      ]
    : [
        {
          text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.profileTabTitle" />,
          selected: currentTab === 'DriverApprovalPage',
          id: 'DriverApprovalPageTab',
          linkProps: {
            name: 'DriverApprovalPage',
            params: { step: 'profile' },
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.contactDetailsTabTitle" />
          ),
          selected: currentTab === 'ContactDetailsPage',
          id: 'ContactDetailsPageTab',
          linkProps: {
            name: 'ContactDetailsPage',
            completed: contactDetailsComplete,
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.LayoutWrapperAccountSettingsSideNav.changePassword" />
          ),
          selected: currentTab === 'PasswordChangePage',
          id: 'PasswordChangePageTab',

          linkProps: {
            name: 'PasswordChangePage',
            completed: false,
          },
        },
        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.LayoutWrapperAccountSettingsSideNav.verificationHost" />
          ),
          selected: currentTab === 'VerificationAccountSettings',
          id: 'VerificationAccountSettingsTab',
          linkProps: {
            name: 'VerificationAccountSettings',
            completed: false,
          },
        },

        {
          text: (
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />
          ),
          selected: currentTab === 'PaymentMethodsPage',
          id: 'PaymentMethodsPageTab',
          linkProps: {
            name: 'PaymentMethodsPage',
            completed: paymentMethodsComplete,
          },
        },
        {
          text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.deleteAccountTabTitle" />,
          selected: currentTab === 'DeleteAccountPage',
          id: 'DeleteAccountPageTab',
          linkProps: {
            name: 'DeleteAccountPage',
          },
        },
      ];

  return (
    <LayoutWrapperSideNav isVerficationDetailsTab={props.isVerficationDetailsTab} tabs={tabs} />
  );
};

LayoutWrapperAccountSettingsSideNavComponent.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  currentTab: null,
};

LayoutWrapperAccountSettingsSideNavComponent.propTypes = {
  children: node,
  className: string,
  rootClassName: string,
  currentTab: string,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};

const LayoutWrapperAccountSettingsSideNav = compose(withViewport)(
  LayoutWrapperAccountSettingsSideNavComponent
);

export default LayoutWrapperAccountSettingsSideNav;
