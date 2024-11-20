import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { accountIsVerified } from '../../util/verificationSteps';
import {
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
} from '../../components';
import userIcon from './userIcon.png';
import { TopbarSearchForm } from '../../forms';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import css from './TopbarDesktop.module.css';
import { driverSteps } from '../../marketplace-custom-config';
import IconUser from '../IconUser/IconUser';

const TopbarDesktop = props => {
  const {
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    notificationCount,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
    pageName,
    viewport,
    isWhiteNav,
  } = props;
  const [mounted, setMounted] = useState(false);
  // const [showBanner, setShowBanner] = useState(!isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;
  const classes = classNames(
    rootClassName || css.root,
    className,
    !isAuthenticated ? css.whitenavWithoutLogin : null,
    isWhiteNav ? css.whiteNav : css.blackNav
  );
  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
      viewport={viewport}
      isWhiteNav={isWhiteNav}
    />
  );
  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;
  const inboxLink = authenticatedOnClientSide ? (
    <NamedLink
      className={css.inboxLink}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <span className={css.inbox}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  ) : null;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };
  const favorite = (
    <>
      <NamedLink name="FavListingsPage" className={css.favIcon}>
        <FavoriteBorderIcon sx={{ color: 'white', height: '16px', width: 'auto' }} />
      </NamedLink>
    </>
  );

  const profileMenu = authenticatedOnClientSide ? (
    <Menu>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        <div className={css.userIcon}>
          <img alt="usuario" src={userIcon} />
        </div>
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        <MenuItem
          key="NewListingPage"
          children={<FormattedMessage id="TopbarDesktop.createListing" />}
        >
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('NewListingPage'))}
            name={!accountIsVerified(currentUser) ? 'VerificationPage' : 'NewListingPage'}
            params={!accountIsVerified(currentUser) ? { tab: 'host' } : {}}
            to={{ state: { newListing: true } }}
          >
            <FormattedMessage id="TopbarDesktop.createListing" />
          </NamedLink>
        </MenuItem>

        {/* <MenuItem key="BookingDetailsPage">
          {accountIsVerified(currentUser) && (
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('NewListingPage'))}
              name={'BookingDetailsPage'}
            >
              Booking Details
            </NamedLink>
          )}
        </MenuItem> */}

        {inboxLink ? (
          <MenuItem key="InboxPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('InboxPage'))}
              params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
              name="InboxPage"
            >
              <FormattedMessage id="TopbarDesktop.inbox" />
            </NamedLink>
          </MenuItem>
        ) : null}
        <MenuItem key="ManageListingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('ManageListingsPage'))}
            name="ManageListingsPage"
          >
            <FormattedMessage id="TopbarDesktop.yourListingsLink" />
          </NamedLink>
        </MenuItem>
        {/* <MenuItem key="ProfileSettingsPage">
        {/* fav listings */}
        <MenuItem key="FavListingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('FavListingsPage'))}
            name="FavListingsPage"
          >
            <FormattedMessage id="TopbarDesktop.FavListingsPage" />
          </NamedLink>
        </MenuItem>

        <MenuItem key="DriverApprovalPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('DriverApprovalPage'))}
            name="DriverApprovalPage"
            params={{ step: driverSteps[0] }}
            to={{ state: driverSteps[0] }}
          >
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="PasswordChangePage">
          <NamedLink
            className={classNames(css.passwordChangeLink, currentPageClass('PasswordChangePage'))}
            name="PasswordChangePage"
          >
            Cambiar contraseña
          </NamedLink>
        </MenuItem>
        <MenuItem key="PaymentMethodsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('PaymentMethodsPage'))}
            name="PaymentMethodsPage"
          >
            <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  ) : null;
  // const signupLink = isAuthenticatedOrJustHydrated ? null : (
  //   <NamedLink name="SignupPage" className={css.signupLink}>
  //     <span className={classNames(css.signup, css.authIcon)}>
  //       <IconUser />
  //     </span>
  //   </NamedLink>
  // );
  const loginLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="LoginPage" className={css.loginLink}>
      <span className={classNames(css.login, css.authIcon)}>
        <IconUser />
      </span>
    </NamedLink>
  );
  return (
    <div>
      {/* {showBanner ? (
        <div className={css.topbarAuth}>
          <span>
            Pronto podrás elegir entre opciones ilimitadas de vehículos o generar más rentabilidad
            con tus activos.
          </span>
          <span
            className={css.closeButton}
            onClick={() => {
              setShowBanner(false);
            }}
          >
            <IconCard brand="close" />
          </span>
        </div>
      ) : null} */}

      <nav className={classes}>
        {isWhiteNav ? (
          <Logo format="desktop" className={css.topLogo} />
        ) : (
          <h1 className={css.pageName}>{pageName}</h1>
        )}
        {/* <NamedLink className={css.logoLink} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink> */}
        <div className={css.middleSection}>{search}</div>
        <div className={css.rightSide}>
          {favorite}
          {profileMenu}
          {loginLink}
        </div>
      </nav>
    </div>
  );
};
const { bool, func, object, number, string } = PropTypes;
TopbarDesktop.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
};
TopbarDesktop.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};
export default TopbarDesktop;
