import React from 'react';
import css from './BottomNavigation.module.css';
import NamedLink from '../NamedLink/NamedLink';
import { BiMessageRounded } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { MdTravelExplore } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { getHostStatus } from '../../util/dataExtractors';
// import { accountIsVerified } from '../../util/verificationSteps';
import { FaCar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { TABS } from '../EditListingWizard/EditListingWizard';

const accountPages = [
  '/driver/profile',
  '/contact-details',
  '/account/change-password',
  '/verification/host',
  '/account/payment-methods',
  '/payoutDetailsPage',
  '/delete-profile',
];

const BottomNavigation = () => {
  const intl = useIntl();
  const state = useSelector(state => state);
  const { currentUser } = state?.user || {};
  const hostStatus = getHostStatus(currentUser);
  const host = hostStatus === 'verified';
  // const host = accountIsVerified(currentUser);
  const history = useHistory();
  const { location } = history || {};
  const { pathname } = location || {};
  const isNewListingTab = pathname?.split('/');
  const wizardTab = TABS.find(tab => tab === isNewListingTab[isNewListingTab.length - 1]);

  const isSearchPage = pathname === '/s';
  const isLandingPage = pathname === '/';
  const isInboxPage = pathname === '/inbox/sales' || pathname === '/inbox/orders';
  const isFav = pathname === '/favListings';
  const isAccount = accountPages.includes(pathname);

  return (
    <div className={css.root}>
      {host ? (
        <NamedLink
          className={isSearchPage ? css.navigationLinkSelected : css.navigationLink}
          name="SearchPage"
        >
          <MdTravelExplore className={css.icon} />
          <p className={css.label}>
            {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.explore' })}
          </p>
        </NamedLink>
      ) : (
        <NamedLink
          className={isLandingPage ? css.navigationLinkSelected : css.navigationLink}
          name="HomePage"
        >
          <FaHome className={css.icon} />
          <p className={css.label}>
            {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.home' })}
          </p>
        </NamedLink>
      )}
      <NamedLink
        className={isInboxPage ? css.navigationLinkSelected : css.navigationLink}
        name="InboxPage"
        params={{ tab: 'sales' }}
      >
        <BiMessageRounded className={css.icon} />
        <p className={css.label}>
          {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.inbox' })}
        </p>
      </NamedLink>
      {host ? (
        <NamedLink
          className={wizardTab ? css.navigationLinkSelected : css.navigationLink}
          name="ManageListingsPage"
        >
          <FaCar className={css.icon} />
          <p className={css.label}>
            {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.iwantListings' })}
          </p>
        </NamedLink>
      ) : (
        <NamedLink
          className={isFav ? css.navigationLinkSelected : css.navigationLink}
          name="FavListingsPage"
        >
          <MdFavorite className={css.icon} />
          <p className={css.label}>
            {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.favourites' })}
          </p>
        </NamedLink>
      )}
      {host ? (
        <NamedLink
          className={isAccount ? css.navigationLinkSelected : css.navigationLink}
          name="ContactDetailsPage"
        >
          <IoSettingsSharp className={css.icon} />
          <p className={css.label}>
            {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.accountSettings' })}
          </p>
        </NamedLink>
      ) : (
        <NamedLink
          className={isSearchPage ? css.navigationLinkSelected : css.navigationLink}
          name="SearchPage"
        >
          <FaSearch className={css.icon} />
          <p className={css.label}>
            {intl.formatMessage({ id: 'BottomNavigation.BottomNavigation.search' })}
          </p>
        </NamedLink>
      )}
    </div>
  );
};

export default BottomNavigation;
