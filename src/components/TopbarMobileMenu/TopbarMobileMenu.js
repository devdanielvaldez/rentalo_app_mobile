/**
 *  TopbarMobileMenu prints the menu content for authenticated user or
 * shows login actions for those who are not authenticated.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { AvatarLarge, InlineTextButton, NamedLink, NotificationBadge } from '../../components';

import css from './TopbarMobileMenu.module.css';
// import { isHostVerified } from '../../util/dataExtractors';
import {
  getVerifiedSteps,
  accountIsNotVerified
} from '../../util/dataExtractors';
import { steps } from '../../containers/VerificationPage/data';

const TopbarMobileMenu = props => {
  const {
    isAuthenticated,
    currentPage,
    currentUserHasListings,
    currentUser,
    notificationCount,
    onLogout,
  } = props;

  const user = ensureCurrentUser(currentUser);

  const verifiedSteps = getVerifiedSteps(steps, user, false);
  const accountNotVerified = accountIsNotVerified(verifiedSteps, false);

  const pathName = accountNotVerified ? 'VerificationPage' : 'NewListingPage';
  const patParams = accountNotVerified ? { tab: 'host' } : {};

  if (!isAuthenticated) {
    const signup = (
      <NamedLink name="SignupPage" className={css.signupLink}>
        <FormattedMessage id="TopbarMobileMenu.signupLink" />
      </NamedLink>
    );

    const login = (
      <NamedLink name="LoginPage" className={css.loginLink}>
        <FormattedMessage id="TopbarMobileMenu.loginLink" />
      </NamedLink>
    );

    const signupOrLogin = (
      <span className={css.authenticationLinks}>
        <FormattedMessage id="TopbarMobileMenu.signupOrLogin" values={{ signup, login }} />
      </span>
    );
    return (
      <div className={css.root}>
        <div className={css.content}>
          <div className={css.authenticationGreeting}>
            <FormattedMessage
              id="TopbarMobileMenu.unauthorizedGreeting"
              values={{ lineBreak: <br />, signupOrLogin }}
            />
          </div>
        </div>
        <div className={css.footer}>
          <NamedLink className={css.createNewListingLink} name={pathName} params={patParams}>
            <FormattedMessage id="TopbarMobileMenu.newListingLink" />
          </NamedLink>
        </div>
      </div>
    );
  }

  const notificationCountBadge =
    notificationCount > 0 ? (
      <NotificationBadge className={css.notificationBadge} count={notificationCount} />
    ) : null;

  const displayName = user?.attributes?.profile?.firstName;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  return (
    <div className={css.root}>
      <AvatarLarge className={css.avatar} user={currentUser} />
      <div className={css.content}>
        <span className={css.greeting}>
          <FormattedMessage id="TopbarMobileMenu.greeting" values={{ displayName }} />
        </span>
        <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
          <FormattedMessage id="TopbarMobileMenu.logoutLink" />
        </InlineTextButton>


        <NamedLink
          className={classNames(css.inbox, currentPageClass('InboxPage'))}
          name="InboxPage"
          params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
        >
          <FormattedMessage id="TopbarMobileMenu.inboxLink" />
          {notificationCountBadge}
        </NamedLink>
        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="HomePage"
        >
          <FormattedMessage id="TopbarMobileMenu.HomePage" />
        </NamedLink>

        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('ManageListingsPage'))}
          name="ManageListingsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.yourListingsLink" />
        </NamedLink>
        {/* <NamedLink

        {/* fav listings link */}

        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="FavListingsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.FavListingsPage" />
        </NamedLink>

        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="AboutPage"
        >
          <FormattedMessage id="TopbarMobileMenu.AcereaPage" />
        </NamedLink>
        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="HowItWorksPage"
        >
          <FormattedMessage id="TopbarMobileMenu.HowItWorksPage" />
        </NamedLink>
        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="BecomeHostPage"
        >
          <FormattedMessage id="TopbarMobileMenu.BecomeHostPage" />
        </NamedLink>
        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="HowToRentPage"
        >
          <FormattedMessage id="TopbarMobileMenu.HowToRent" />
        </NamedLink>

        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="InsurancePage"
        >
          <FormattedMessage id="TopbarMobileMenu.InsurancePage" />
        </NamedLink>

        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('FavListingsPage'))}
          name="FAQsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.FAQsPage" />
        </NamedLink>

        {/*
        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('ProfileSettingsPage'))}
          name="ProfileSettingsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.profileSettingsLink" />
        </NamedLink>
      */}

        <NamedLink
          className={classNames(css.navigationLink, currentPageClass('AccountSettingsPage'))}
          name="AccountSettingsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.accountSettingsLink" />
        </NamedLink>
      </div>
      <div className={css.footer}>
        <NamedLink className={css.createNewListingLink} name={pathName} params={patParams}>
          <FormattedMessage id="TopbarMobileMenu.newListingLink" />
        </NamedLink>
      </div>
    </div>
  );
};

TopbarMobileMenu.defaultProps = { currentUser: null, notificationCount: 0, currentPage: null };

const { bool, func, number, string } = PropTypes;

TopbarMobileMenu.propTypes = {
  isAuthenticated: bool.isRequired,
  currentUserHasListings: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
};

export default TopbarMobileMenu;
