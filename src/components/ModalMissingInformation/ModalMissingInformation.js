import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { pathByRouteName } from '../../util/routes';
import { Modal } from '../../components';

import EmailReminder from './EmailReminder';
import StripeAccountReminder from './StripeAccountReminder';
import css from './ModalMissingInformation.module.css';
import PublishListingInformation from './PublishListingInformation';

const MISSING_INFORMATION_MODAL_WHITELIST = [
  'LoginPage',
  'SignupPage',
  'ContactDetailsPage',
  'EmailVerificationPage',
  'PasswordResetPage',
  'StripePayoutPage',
];

const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
const STRIPE_ACCOUNT = 'STRIPE_ACCOUNT';
const PUBLISH_LISTING = 'PUBLISH_LISTING';
class ModalMissingInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMissingInformationReminder: null,
      hasSeenMissingInformationReminder: false,
    };
    this.handleMissingInformationReminder = this.handleMissingInformationReminder.bind(this);
  }

  componentDidUpdate() {
    const {
      currentUser,
      currentUserHasListings,
      currentUserHasOrders,
      location,
      showPendingApprovalModal,
      listingData,
    } = this.props;

    const user = ensureCurrentUser(currentUser);
    this.handleMissingInformationReminder(
      user,
      currentUserHasListings,
      currentUserHasOrders,
      location
    );
  }

  handleMissingInformationReminder(
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    newLocation
  ) {
    const routes = routeConfiguration();
    const whitelistedPaths = MISSING_INFORMATION_MODAL_WHITELIST.map(page =>
      pathByRouteName(page, routes)
    );

    // Is the current page whitelisted?
    const isPageWhitelisted = whitelistedPaths.includes(newLocation.pathname);

    // Track if path changes inside Page level component
    const pathChanged = newLocation.pathname !== this.props.location.pathname;
    const notRemindedYet =
      !this.state.showMissingInformationReminder && !this.state.hasSeenMissingInformationReminder;

    // Is the reminder already shown on current page
    const showOnPathChange = notRemindedYet || pathChanged;

    if (!isPageWhitelisted && showOnPathChange) {
      // Emails are sent when order is initiated
      // Customer is likely to get email soon when she books something
      // Provider email should work - she should get an email when someone books a listing
      const hasOrders = currentUserHasOrders === true;
      const hasListingsOrOrders = currentUserHasListings || hasOrders;

      const emailUnverified = !!currentUser.id && !currentUser.attributes.emailVerified;
      const emailVerificationNeeded = hasListingsOrOrders && emailUnverified;

      const stripeAccountMissing = !!currentUser.id && !currentUser.attributes.stripeConnected;
      const stripeAccountNeeded = currentUserHasListings && stripeAccountMissing;

      // Show reminder
      if (emailVerificationNeeded) {
        this.setState({ showMissingInformationReminder: EMAIL_VERIFICATION });
      }
    }
  }

  render() {
    const {
      rootClassName,
      className,
      containerClassName,
      currentUser,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onManageDisableScrolling,
      onResendVerificationEmail,
      showPendingApprovalModal,
      listingData,
    } = this.props;

    const user = ensureCurrentUser(currentUser);
    const classes = classNames(rootClassName || css.root, className);

    let content = null;

    const currentUserLoaded = user && user.id;
    if (currentUserLoaded) {
      if (this.state.showMissingInformationReminder === EMAIL_VERIFICATION) {
        content = (
          <EmailReminder
            className={classes}
            user={user}
            onResendVerificationEmail={onResendVerificationEmail}
            sendVerificationEmailInProgress={sendVerificationEmailInProgress}
            sendVerificationEmailError={sendVerificationEmailError}
          />
        );
      } else if (this.state.showMissingInformationReminder === STRIPE_ACCOUNT) {
        content = <StripeAccountReminder className={classes} />;
      } else if (this.state.showMissingInformationReminder === PUBLISH_LISTING) {
        content = <PublishListingInformation className={classes} />;
      }
    }

    const closeButtonMessage = (
      <FormattedMessage id="ModalMissingInformation.closeVerifyEmailReminder" />
    );

    return (
      <Modal
        id="MissingInformationReminder"
        containerClassName={containerClassName}
        isOpen={!!this.state.showMissingInformationReminder || showPendingApprovalModal}
        onClose={() => {
          this.setState({
            showMissingInformationReminder: null,
            hasSeenMissingInformationReminder: true,
          });
        }}
        usePortal
        onManageDisableScrolling={onManageDisableScrolling}
        closeButtonMessage={closeButtonMessage}
        isMissingInfoModal={true}
      >
        {showPendingApprovalModal ? (
          <PublishListingInformation className={classes} listingData={listingData} />
        ) : null}
        {content}
      </Modal>
    );
  }
}

ModalMissingInformation.defaultProps = {
  className: null,
  rootClassName: null,
  currentUser: null,
};

ModalMissingInformation.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  containerClassName: string,

  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  sendVerificationEmailError: propTypes.error,
  sendVerificationEmailInProgress: bool.isRequired,
};

ModalMissingInformation.displayName = 'ModalMissingInformation';

export default ModalMissingInformation;
