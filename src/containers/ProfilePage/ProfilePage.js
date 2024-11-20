import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  AvatarLarge,
  Reviews,
  ButtonTabNavHorizontal,
} from '../../components';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';

import facebook from './Icon awesome-facebook.svg';
import twitter from './Icon awesome-twitter.svg';
import whatsapp from './Icon awesome-whatsapp.svg';
import mail from './Icon feather-mail.svg';

import { TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';
import ListingCardSquare from '../../components/ListingCardSquare/ListingCardSquare';
import css from './ProfilePage.module.css';
import ProfileNav from '../../components/ProfileNav/ProfileNav';

const MAX_MOBILE_SCREEN_WIDTH = 768;

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    };

    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);
  }

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  render() {
    const {
      scrollingDisabled,
      // currentUser,
      user,
      userShowError,
      queryListingsError,
      listings,
      reviews,
      queryReviewsError,
      viewport,
      intl,
    } = this.props;
    // const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUser(user);
    // const isCurrentUser =
    //   ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser.attributes.profile.displayName;
    const bio = profileUser.attributes.profile.bio;
    const hasBio = !!bio;
    // const hasListings = listings.length > 0;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

    // const editLinkMobile = isCurrentUser ? (
    //   <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
    //     <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
    //   </NamedLink>
    // ) : null;
    // const editLinkDesktop = isCurrentUser ? (
    //   <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
    //     <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
    //   </NamedLink>
    // ) : null;

    // const asideContent = (
    //   <div className={css.asideContent}>
    //     <AvatarLarge className={css.avatar} user={user} disableProfileLink />
    //     <h1 className={css.mobileHeading}>
    //       {displayName ? (
    //         <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
    //       ) : null}
    //     </h1>
    //     {editLinkMobile}
    //     {editLinkDesktop}
    //   </div>
    // );

    // const listingsContainerClasses = classNames(css.listingsContainer, {
    //   [css.withBioMissingAbove]: !hasBio,
    // });

    const reviewsError = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
      </p>
    );

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    const mobileReviews = (
      <div className={css.mobileReviews}>
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfProviderTitle"
            values={{ count: reviewsOfProvider.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfProvider} />
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfCustomerTitle"
            values={{ count: reviewsOfCustomer.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfCustomer} />
      </div>
    );

    const desktopReviewTabs = [
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfProviderTitle"
              values={{ count: reviewsOfProvider.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER,
        onClick: this.showOfProviderReviews,
      },
      // {
      //   text: (
      //     <h3 className={css.desktopReviewsTitle}>
      //       <FormattedMessage
      //         id="ProfilePage.reviewsOfCustomerTitle"
      //         values={{ count: reviewsOfCustomer.length }}
      //       />
      //     </h3>
      //   ),
      //   selected: this.state.showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
      //   onClick: this.showOfCustomerReviews,
      // },
    ];

    const desktopReviews = (
      <div className={css.desktopReviews}>
        <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

        {queryReviewsError ? reviewsError : null}

        {this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
          <Reviews reviews={reviewsOfProvider} />
        ) : (
          <Reviews reviews={reviewsOfCustomer} />
        )}
      </div>
    );

    const panelMediumWidth = 50;
    const panelLargeWidth = 62.5;
    const cardRenderSizes = [
      '(max-width: 767px) 100vw',
      `(max-width: 1023px) ${panelMediumWidth}vw`,
      `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
      `${panelLargeWidth / 3}vw`,
    ].join(', ');

    const mainContent = (
      <div className={css.contentWrapper}>
        <div className={css.mobile}>
          <p className={css.mobileText}>Sobre nosotros</p>
        </div>
        {/* <h1 className={css.desktopHeading}>
          <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
        </h1>
        </div>
        <Box sx={{background: '#F6F6F6 0% 0% no-repeat padding-box', borderRadius:'10px'}}>
        {hasBio ? <p className={css.bio}>{bio}</p> : null}
        </Box>
        </div>
        {hasListings ? (
          <div className={listingsContainerClasses}>
            <h2 className={css.listingsTitle}>
              <FormattedMessage
                id="ProfilePage.listingsTitle"
                values={{ count: listings.length }}
                />
            </h2>
            <ul className={css.listings}>
              {listings.map(l => (
                <li className={css.listing} key={l.id.uuid}>
                  <ListingCard listing={l} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {isMobileLayout ? mobileReviews : desktopReviews} */}
        <div className={css.gridWrapper}>
          <div className={css.mobileProfileCard}>
            <div className={css.profileShare}>
              <AvatarLarge className={css.avatar} user={user} disableProfileLink />
              <div className={css.socialWrapper}>
                Compartir:
                <span className={css.socialIcons}>
                  <TwitterShareButton url={typeof window !== 'undefined' && window.location.href}>
                    <img alt="twitter" src={twitter} className={css.socialIcon} />
                  </TwitterShareButton>

                  <FacebookShareButton url={typeof window !== 'undefined' && window.location.href}>
                    <img alt="facebook" src={facebook} className={css.socialIcon} />
                  </FacebookShareButton>

                  <WhatsappShareButton url={typeof window !== 'undefined' && window.location.href}>
                    <img alt="whatsapp" src={whatsapp} className={css.socialIcon} />
                  </WhatsappShareButton>

                  <EmailShareButton
                    className={css.emailIcon}
                    url={typeof window !== 'undefined' && window.location.href}
                  >
                    <img alt="mail" src={mail} className={css.socialIcon} />
                  </EmailShareButton>
                </span>
              </div>
            </div>
            <div className={css.otherDetails}>
              <h1 className={css.userName}>{displayName}</h1>
              {hasBio ? <p className={css.userBio}>{bio}</p> : null}
            </div>
            <div className={css.opinionsReceived}>
              <h2>Opiniones recibidas</h2>
              <span className={css.reviewsWrapper}>
                <span className={css.reviewsNumber}>{reviewsOfCustomer.length} </span>
                Reseñas
              </span>
            </div>
            <div className={css.descriptionSec}>

            </div>
          </div>

          <div className={css.userProfileCard}>
            <AvatarLarge className={css.avatar} user={user} disableProfileLink />

            <div className={css.userInfoWrapper}>
              <div className={css.infoWrapper}>
                <h1 className={css.userName}>{displayName}</h1>{' '}
                <p className={css.userBio}>

                </p>
                {hasBio ? <p className={css.userBio}>{bio}</p> : null}
              </div>

              <div className={css.reviewsAndSocialWrapper}>
                <p className={css.reviewsWrapper}>
                  <p className={css.reviewsNumber}>{ reviews && reviews.length} </p>
                  Reseñas
                </p>

                <p className={css.socialWrapper}>
                  Comparte este perfil:
                  <span className={css.socialIcons}>
                    <TwitterShareButton url={typeof window !== 'undefined' && window.location.href}>
                      <img alt='twitter' src={twitter} className={css.socialIcon} />
                    </TwitterShareButton>

                    <FacebookShareButton
                      url={typeof window !== 'undefined' && window.location.href}
                    >
                      <img alt='facebook' src={facebook} className={css.socialIcon} />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      url={typeof window !== 'undefined' && window.location.href}
                    >
                      <img alt='whatsapp' src={whatsapp} className={css.socialIcon} />
                    </WhatsappShareButton>

                    <EmailShareButton
                      className={css.emailIcon}
                      url={typeof window !== 'undefined' && window.location.href}
                    >
                      <img alt='mail' src={mail} className={css.socialIcon} />
                    </EmailShareButton>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={css.sharedVehiclesSection}>
          <h2>
            Vehículos <span className={css.reviewsNumber}>{listings?.length}</span>
          </h2>

          <div className={css.recommendedListingsWrapper}>
            <div className={css.vehiclesSection}>
              {listings.map(l => {
                return (
                  <div className={css.sharedVehicles}>
                    <ListingCardSquare
                      className={css.listingCard}
                      key={l.id.uuid}
                      listing={l}
                      renderSizes={cardRenderSizes}
                      setActiveListing={() => {}}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={css.reviewsWrapper}>{isMobileLayout ? mobileReviews : desktopReviews}</div>
      </div>
    );

    let content;

    if (userShowError && userShowError.status === 404) {
      return <NotFoundPage />;
    } else if (userShowError || queryListingsError) {
      content = (
        <p className={css.error}>
          <FormattedMessage id="ProfilePage.loadingDataFailed" />
        </p>
      );
    } else {
      content = mainContent;
    }

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: displayName,
        siteTitle: config.siteTitle,
      }
    );

    const pageName = ['Perfil del usuario'];

    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProfilePage',
          name: schemaTitle,
        }}
      >
        <LayoutSideNavigation isStaticPage={true}>
          <LayoutWrapperTopbar>
            <TopbarContainer pageName={pageName} currentPage="ProfilePage" />
            <div className={css.sideNav}>
              <ProfileNav />
            </div>
          </LayoutWrapperTopbar>
          {/* <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav> */}
          <LayoutWrapperMain>
            <div className={css.fixedWidthContainer}>{content}</div>
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            {/* <Footer /> */}
          </LayoutWrapperFooter>

        </LayoutSideNavigation>
      </Page>
    );
  }
}

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  queryListingsError: propTypes.error,
  listings: arrayOf(propTypes.listing).isRequired,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    userId,
    userShowError,
    queryListingsError,
    userListingRefs,
    reviews,
    queryReviewsError,
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    reviews,
    queryReviewsError,
  };
};

const ProfilePage = compose(
  connect(mapStateToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

export default ProfilePage;
