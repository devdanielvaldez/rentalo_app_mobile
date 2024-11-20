import React, { Component } from 'react';
import { array, arrayOf, bool, func, shape, string, oneOf } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { compose } from 'redux';
import {
  // LISTING_PAGE_PARAM_TYPE_DRAFT,
  // LISTING_PAGE_PARAM_TYPE_EDIT,
  parse,
  stringify,
} from '../../util/urlHelpers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LISTING_PAGE_DRAFT_VARIANT,
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  // LISTING_PAGE_PARAM_TYPE_DRAFT,
  // LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
} from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { richText } from '../../util/richText';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Page,
  // NamedLink,
  NamedRedirect,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  // LayoutWrapperFooter,
  // Footer,
  BookingPanel,
  AvatarLarge,
  Button,
  Modal,
  IconFeatherArrowRight,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import SideNav from '../../components/SideNav/SideNav';
import {
  sendEnquiry,
  fetchTransactionLineItems,
  setInitialValues,
  validateVoucher,
} from './ListingPage.duck';
import SectionReviews from './SectionReviews';
import { Grid } from '@mui/material';
import abstractBackground from './abstractBackground.png';
import Lightbox from 'react-image-lightbox';
import ListingCardTall from '../../components/ListingCardTall/ListingCardTall';
import css from './ListingPage.module.css';
import facebook from './Icon awesome-facebook.svg';
import twitter from './Icon awesome-twitter.svg';
import whatsapp from './Icon awesome-whatsapp.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getVerifiedSteps, accountIsNotVerified } from '../../util/dataExtractors';
import { withViewport } from '../../util/contextHelpers';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import LeaseAgreementModalContent from './LeaseAgreementModalContent';
import DetailsPolicyModalContent from './DetailsPolicyModalContent';
import { steps } from '../VerificationPage/data';

// import ActionBarMaybe from './ActionBarMaybe.js';
const sharetribeSdk = require('sharetribe-flex-sdk');
const sdk = sharetribeSdk.createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;

const { UUID } = sdkTypes;

const voucherExistAndValid = voucher => {
  return (
    voucher &&
    voucher.active &&
    typeof voucher.redemption.quantity === 'number' &&
    voucher.redemption.quantity > voucher.redemption.redeemed_quantity
  );
};

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

// const categoryLabel = (categories, key) => {
//   const cat = categories.find(c => c.key === key);
//   return cat ? cat.label : key;
// };

const panelMediumWidth = 50;
const panelLargeWidth = 62.5;
const cardRenderSizes = [
  '(max-width: 767px) 100vw',
  `(max-width: 1023px) ${panelMediumWidth}vw`,
  `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
  `${panelLargeWidth / 3}vw`,
].join(', ');

export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params } = props;
    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id,
      isLightBoxOpen: false,
      photoIndex: 0,
      recommendedListings: [],
      isFavourite: false,
      isOpen: false,
      open: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContactUser = this.onContactUser.bind(this);
    this.onSubmitEnquiry = this.onSubmitEnquiry.bind(this);
    this.toggleModal1 = this.toggleModal1.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      require('react-image-lightbox/style.css');
    }

    sdk.listings
      .query({
        include: ['author', 'images'],
        'fields.listing': ['title', 'geolocation', 'price', 'publicData', 'description'],
        'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
        'fields.image': [`variants.landscape-crop`, `variants.landscape-crop2x`],
        'limit.images': 1,
      })
      .then(res => {
        const listings = res.data.data.length >= 3 ? res.data.data.slice(0, 3) : [];
        const images =
          res.data.included &&
          res.data.included.filter(i => {
            return i.type === 'image';
          });
        const users =
          res.data.included &&
          res.data.included.filter(i => {
            return i.type === 'user';
          });
        listings.forEach(l => {
          const imageId = l.relationships.images.data[0].id.uuid;
          const authorId = l.relationships.author.data.id.uuid;

          const luckyImage = images.find(i => {
            return i.id.uuid === imageId;
          });

          const author = users.find(u => {
            return u.id.uuid === authorId;
          });
          l.author = author;
          l.images = [luckyImage];
        });

        this.setState({
          recommendedListings: listings,
        });
      })
      .catch(e => console.log(e));
  }

  handleSubmit(values) {
    const {
      history,
      getListing,
      params,
      callSetInitialValues,
      onInitializeCardPaymentData,
      voucherValid,
    } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);

    const { bookingDates, ...bookingData } = values;
    const initialValues = {
      listing,
      bookingData: {
        ...bookingData,
        voucher: voucherExistAndValid(voucherValid) ? voucherValid : null,
      },
      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
      confirmPaymentError: null,
    };
    const saveToSessionStorage = !this.props.currentUser;

    const routes = routeConfiguration();
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
    callSetInitialValues(setInitialValues, initialValues, saveToSessionStorage);
    onInitializeCardPaymentData();
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }

  onContactUser() {
    const { currentUser, history, callSetInitialValues, params, location } = this.props;
    if (!currentUser) {
      const state = { from: `${location.pathname}${location.search}${location.hash}` };
      callSetInitialValues(setInitialValues, { enquiryModalOpenForListingId: params.id });
      history.push(createResourceLocatorString('SignupPage', routeConfiguration(), {}, {}), state);
    } else {
      this.setState({ enquiryModalOpen: true });
    }
  }

  onSubmitEnquiry(values) {
    const { history, params, onSendEnquiry } = this.props;
    const routes = routeConfiguration();
    const listingId = new UUID(params.id);
    const { message } = values;

    onSendEnquiry(listingId, message.trim())
      .then(txId => {
        this.setState({ enquiryModalOpen: false });

        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
      .catch(() => {
        // Ignore, error handling in duck file
      });
  }
  toggleModal1() {
    this.setState({ open: !this.state.open });
  }

  toggleModal2() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      unitType,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      history,
      onManageDisableScrolling,
      params: rawParams,
      location,
      scrollingDisabled,
      showListingError,
      reviews,
      bookings,
      fetchReviewsError,
      timeSlots,
      fetchTimeSlotsError,
      filterConfig,
      onFetchTransactionLineItems,
      lineItems,
      fetchLineItemsInProgress,
      fetchLineItemsError,
      viewport,
      bookmarkedData,
      isAuthenticated,
      onValidateVoucher,
      voucherValid,
      voucherInProgress,
      voucherRequested,
      transactions,
      included,
    } = this.props;

    const listingId = new UUID(rawParams.id);
    const isPendingApprovalVariant = rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
    const isDraftVariant = rawParams.variant === LISTING_PAGE_DRAFT_VARIANT;
    const currentListing =
      isPendingApprovalVariant || isDraftVariant
        ? ensureOwnListing(getOwnListing(listingId))
        : ensureListing(getListing(listingId));

    const listingSlug = rawParams.slug || createSlug(currentListing.attributes.title || '');
    const params = { slug: listingSlug, ...rawParams };

    // const listingType = isDraftVariant
    //   ? LISTING_PAGE_PARAM_TYPE_DRAFT
    //   : LISTING_PAGE_PARAM_TYPE_EDIT;
    // const listingTab = isDraftVariant ? 'photos' : 'description';
    const id = currentListing && currentListing?.id?.uuid;

    const isApproved =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;
    const pendingIsApproved = isPendingApprovalVariant && isApproved;

    const pendingOtherUsersListing =
      (isPendingApprovalVariant || isDraftVariant) &&
      showListingError &&
      showListingError.status === 403;
    const shouldShowPublicListingPage = pendingIsApproved || pendingOtherUsersListing;

    if (shouldShowPublicListingPage) {
      return <NamedRedirect name="ListingPage" params={params} search={location.search} />;
    }
    const isMobileLayout = viewport.width > 0 && viewport.width < 768;

    const { description = '', price = null, title = '', publicData } = currentListing.attributes;

    const richTitle = (
      <span>
        {richText(title, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
          longWordClass: css.longWord,
        })}
      </span>
    );

    const bookmark = currentUser?.attributes?.profile.publicData?.bookmark || [];
    const index = bookmark.findIndex(ids => ids === id);
    const handleClick = e => {
      e.preventDefault();
      index > -1
        ? [bookmark.splice(index, 1), bookmarkedData({ publicData: { bookmark } })]
        : [bookmark.push(id), bookmarkedData({ publicData: { bookmark } })];
    };

    const pageName = ['Detalles del vehículo'];
    const bookingTitle = (
      <FormattedMessage id="ListingPage.bookingTitle" values={{ title: richTitle }} />
    );
    const bookingSubTitle = intl.formatMessage({ id: 'ListingPage.bookingSubTitle' });

    const topbar = <TopbarContainer pageName={pageName} />;

    if (showListingError && showListingError.status === 404) {
      return <NotFoundPage />;
    } else if (showListingError) {
      const errorTitle = intl.formatMessage({
        id: 'ListingPage.errorLoadingListingTitle',
      });

      return (
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain
            // className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}
            >
              <span className={css.errorText}>
                <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
              </span>
            </LayoutWrapperMain>

            {/* <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter> */}
          </LayoutSingleColumn>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      const loadingTitle = intl.formatMessage({
        id: 'ListingPage.loadingListingTitle',
      });

      return (
        <Page title={loadingTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}>
              <span className={css.loadingText}>
                <FormattedMessage id="ListingPage.loadingListingMessage" />
              </span>
            </LayoutWrapperMain>

            {/* <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter> */}
          </LayoutSingleColumn>
        </Page>
      );
    }

    const openBookModal = (isOwnListing, history, location) => {
      if (isOwnListing) {
        window.scrollTo(0, 0);
      } else {
        const { pathname, search, state } = location;
        const searchString = `?${stringify({ ...parse(search), book: true })}`;
        history.push(`${pathname}${searchString}`, state);
      }
    };

    // const closeBookModal = (history, location) => {
    //   const { pathname, search, state } = location;
    //   const searchParams = omit(parse(search), 'book');
    //   const searchString = `?${stringify(searchParams)}`;
    //   history.push(`${pathname}${searchString}`, state);
    // };

    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing =
      userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;
    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);
    // When user is banned or deleted the listing is also deleted.
    // Because listing can be never showed with banned or deleted user we don't have to provide
    // banned or deleted display names for the function
    const authorDisplayName = userDisplayNameAsString(ensuredAuthor, '');
    const authorId = currentListing.author.id.uuid;

    const { formattedPrice } = priceData(price, intl);

    const handleBookingSubmit = values => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        this.handleSubmit(values);
      }
    };

    const listingImages = (listing, variantName) =>
      (listing.images || [])
        .map(image => {
          const variants = image.attributes.variants;
          const variant = variants ? variants[variantName] : null;

          // deprecated
          // for backwards combatility only
          const sizes = image.attributes.sizes;
          const size = sizes ? sizes.find(i => i.name === variantName) : null;

          return variant || size;
        })
        .filter(variant => variant != null);

    const facebookImages = listingImages(currentListing, 'facebook');
    const twitterImages = listingImages(currentListing, 'twitter');
    const schemaImages = JSON.stringify(facebookImages.map(img => img.url));
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage(
      { id: 'ListingPage.schemaTitle' },
      { title, price: formattedPrice, siteTitle }
    );

    // const hostLink = (
    //   <NamedLink
    //     className={css.authorNameLink}
    //     name="ListingPage"
    //     params={params}
    //     to={{ hash: '#host' }}
    //   >
    //     {authorDisplayName}
    //   </NamedLink>
    // );

    // const categoryOptions = findOptionsForSelectFilter('category', filterConfig);
    // const category =
    //   publicData && publicData.category ? (
    //     <span>
    //       {categoryLabel(categoryOptions, publicData.category)}
    //       <span className={css.separator}>•</span>
    //     </span>
    //   ) : null;

    const { isLightBoxOpen, photoIndex } = this.state;

    const imagesArray =
      currentListing?.images && currentListing?.images?.length > 0
        ? currentListing?.images.map(i => {
            return i.attributes.variants['landscape-crop2x']?.url;
          })
        : [];

    const imagesScaledLargeArray =
      currentListing?.images && currentListing?.images?.length > 0
        ? currentListing?.images.map(i => {
            return i.attributes.variants['scaled-large']?.url;
          })
        : [];

    const lightboxImages = imagesScaledLargeArray.length ? imagesScaledLargeArray : imagesArray;

    const firstImage = imagesArray.length > 0 && imagesArray[0];
    const restOfImages =
      imagesArray.length > 1
        ? imagesArray.filter(i => imagesArray.indexOf(i) > 0 && imagesArray.indexOf(i) < 5)
        : false;
    const listingAddress = publicData?.location?.address;
    const isInstantBooking = publicData && publicData?.instantBooking === 'yes';
    const isHomeDelivery = publicData && publicData?.homeDelivery === 'yes';
    const { noticPeriod, carrules = [], amenities = [] } = publicData || {};
    const options = findOptionsForSelectFilter('amenities', filterConfig);
    const keyFeatures = options.filter(obj => amenities.includes(obj.key));

    // const cardData = getPaymentMethod(currentUser);

    const verifiedSteps = currentUser ? getVerifiedSteps(steps, currentUser, true) : null;
    const accountVerified = currentUser ? !accountIsNotVerified(verifiedSteps, true) : false;
    const isApprovedToDrive = accountVerified; // TODO:
    // const actionBar = currentListing.id ? (
    //   <div onClick={e => e.stopPropagation()}>
    //     <ActionBarMaybe
    //       isOwnListing={isOwnListing}
    //       listing={currentListing}
    //       editParams={{
    //         id: listingId.uuid,
    //         slug: listingSlug,
    //         type: listingType,
    //         tab: listingTab,
    //       }}
    //     />
    //   </div>
    // ) : null;
    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={authorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ItemPage',
          description: description,
          name: schemaTitle,
          image: schemaImages,
        }}
      >
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>
            {topbar}
            <div className={css.sideNav}>
              <SideNav currentUser={currentUser} />
            </div>
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}>
            {isLightBoxOpen && (
              <Lightbox
                mainSrc={lightboxImages[photoIndex]}
                nextSrc={lightboxImages[(photoIndex + 1) % lightboxImages.length]}
                prevSrc={
                  lightboxImages[(photoIndex + lightboxImages.length - 1) % lightboxImages.length]
                }
                onCloseRequest={() => this.setState({ isLightBoxOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + lightboxImages.length - 1) % lightboxImages.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % lightboxImages.length,
                  })
                }
              />
            )}
            <div className={css.listingPageWrapper}>
              <div className={css.contentContainer}>
                {!isMobileLayout ? (
                  <>
                    <div className={css.mainContent}>
                      <div className={css.listingInfoWrapper}>
                        <img
                          src={abstractBackground}
                          className={css.abstractBackground}
                          alt="image"
                        />
                        <div className={css.listingInfoCardWrapper}>
                          <div className={css.productDetailsBlock}>
                            {/* {actionBar} */}
                            <div className={css.productImg}>
                              <img
                                src={firstImage}
                                className={css.mainImage}
                                onClick={() =>
                                  this.setState({ isLightBoxOpen: true, photoIndex: 0 })
                                }
                                alt="foto del coche"
                              />
                              {isHomeDelivery && (
                                <div className={css.homeDeliveryLabel}>
                                  <LocalShippingIcon className={css.checkIcon} /> Home Delivery
                                </div>
                              )}
                            </div>

                            <div className={css.productInfo}>
                              <div className={css.productOtherImages}>
                                {restOfImages.length > 0 &&
                                  restOfImages.map(i => {
                                    return (
                                      <img
                                        key={i}
                                        src={i}
                                        className={css.smallImage}
                                        onClick={() =>
                                          this.setState({
                                            isLightBoxOpen: true,
                                            photoIndex: imagesArray.indexOf(i),
                                          })
                                        }
                                        alt="foto del coche"
                                      />
                                    );
                                  })}
                              </div>
                              <div className={css.productOtherInfo}>
                                <div className={css.listingTitle}>{richTitle}</div>
                                <div className={css.listingPrice}>
                                  {formattedPrice}
                                  <span>
                                    {' '}
                                    / día &nbsp; <span className={css.separator}>
                                      •
                                    </span> &nbsp; {listingAddress}
                                  </span>
                                </div>
                              </div>
                              <div className={css.productRating}>
                                <div className={css.favButtonWrapper}>
                                  {index > -1 ? (
                                    <FavoriteIcon
                                      onClick={e => handleClick(e)}
                                      className={css.favButtonSelected}
                                    />
                                  ) : (
                                    <FavoriteBorderIcon
                                      onClick={e => handleClick(e)}
                                      className={css.favButtonNotSelected}
                                    />
                                  )}
                                </div>
                                <div className={css.reviews}>
                                  <StarIcon className={css.starIcon} /> nuevo
                                </div>
                                {/* <div className={css.trips}>{numberOfBookings} Rentas</div> */}
                                {/* {noticPeriod && (
                                  <div className={css.deliveryTime}>{noticPeriod} Horas</div>
                                )} */}
                                {isInstantBooking && (
                                  <div className={css.instantBooking}>
                                    <CheckCircleOutlineIcon className={css.checkIcon} />
                                    Reserva instantánea
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={css.productModalDetails}>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Transmisión</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.transmission == 'automatic'
                                  ? 'Automatica'
                                  : 'Mecanica'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Tipo</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.category == 'adventures'
                                  ? 'Aventura'
                                  : publicData?.category == 'compact'
                                  ? 'Compacto'
                                  : publicData?.category == 'economic'
                                  ? 'Economico'
                                  : publicData?.category == 'family'
                                  ? 'Familiar'
                                  : publicData?.category == 'executive'
                                  ? 'Ejecutivo'
                                  : 'Aventuras'}
                              </div>
                            </div>

                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Combustible</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.fuel ?? 'Not provided'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Puertas</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.door ?? 'Not provided'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Año</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.year ?? 'Not provided'}
                              </div>
                            </div>
                          </div>
                          {/* author info */}
                          <div className={css.gridWrapper}>
                            <div className={css.userProfileDiv}>
                              <AvatarLarge className={css.avatar} user={currentAuthor} />
                              <div className={css.userInfoWrapper}>
                                <div className={css.infoWrapper}>
                                  <h1 className={css.userName}>{authorDisplayName}</h1>
                                  {/* <div className={css.joined}>Joined</div> */}
                                </div>
                                <span className={css.reviewsWrapper}>
                                  <span className={css.reviewsNumber}>
                                    {reviews && reviews?.length}{' '}
                                  </span>
                                  Reseñas
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={css.keyRuleContainer}>
                            <div className={css.keyRules}>
                              <h2>Reglas clave</h2>
                              <ul>
                                {carrules &&
                                  carrules.map((item, index) => (
                                    <li key={index}>
                                      {item == 'no_pet'
                                        ? 'No mascotas'
                                        : item == 'no_smoke'
                                        ? 'No fumar'
                                        : 'No usar fuera de la ciudad'}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className={css.keyRules}>
                              <h2>Características clave</h2>
                              <ul>
                                {keyFeatures &&
                                  keyFeatures.map((item, index) => (
                                    <li key={index}>{item.label}</li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} />{' '}
                      <div className={css.recommendSection}>
                        <div className={css.recommendSectionTitle}>Vehículos recomendados</div>
                        <div className={css.recommendSectionSubtitle}>
                          Échale un ojo a estas ofertas!
                        </div>
                        <div className={css.recommendedListingsWrapper}>
                          {this.state.recommendedListings.map(l => {
                            return (
                              <ListingCardTall
                                className={css.listingCard}
                                key={l.id.uuid}
                                listing={l}
                                renderSizes={cardRenderSizes}
                                setActiveListing={() => {}}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={css.mobileContainer}>
                    <div className={css.mobile}>
                      <span className={css.mobileText}>{pageName}</span>
                    </div>
                    <div className={css.productDetailsBlock}>
                      {/* {actionBar} */}
                      <div className={css.productImg}>
                        <img
                          src={firstImage}
                          className={css.mainImage}
                          onClick={() => this.setState({ isLightBoxOpen: true, photoIndex: 0 })}
                          alt="foto del coche"
                        />
                      </div>

                      <div className={css.productInfo}>
                        <div className={css.productOtherImages}>
                          {restOfImages.length > 0 &&
                            restOfImages.map(i => {
                              return (
                                <img
                                  key={i}
                                  src={i}
                                  className={css.smallImage}
                                  onClick={() =>
                                    this.setState({
                                      isLightBoxOpen: true,
                                      photoIndex: imagesArray.indexOf(i),
                                    })
                                  }
                                  alt="foto del coche"
                                />
                              );
                            })}
                        </div>
                        <div className={css.productOtherInfo}>
                          <div className={css.listingTitle}>{richTitle}</div>
                          <div className={css.changeVehicle}>
                            <div className={css.listingPrice}>
                              {formattedPrice}
                              <span>
                                {' '}
                                / día &nbsp; <span className={css.separator}>•</span> &nbsp;{' '}
                                {listingAddress}
                              </span>
                            </div>
                            {/* <div className={css.changeBtnSec}>
                              <button className={css.changeBtn}>Cambiar vehículo</button>
                            </div> */}
                          </div>
                          <div className={css.productRating}>
                            <div className={css.productRatingLeft}>
                              <div className={css.reviews}>
                                <StarIcon className={css.starIcon} /> new
                              </div>
                              {/* <div className={css.trips}>0 Rentas</div> */}
                              {isInstantBooking && (
                                <div className={css.instantBooking}>
                                  <CheckCircleOutlineIcon className={css.checkIcon} />
                                  Reserva instantánea
                                </div>
                              )}
                            </div>
                            <div className={css.productRatingRight}>
                              <div className={css.socialMediaIcons}>
                                <div className={css.shareText}>Compartir:</div>
                                <TwitterShareButton
                                  url={typeof window !== 'undefined' && window.location.href}
                                >
                                  <img src={twitter} className={css.socialIcon} alt="twitter" />
                                </TwitterShareButton>

                                <FacebookShareButton
                                  url={typeof window !== 'undefined' && window.location.href}
                                >
                                  <img src={facebook} className={css.socialIcon} alt="facebook" />
                                </FacebookShareButton>

                                <WhatsappShareButton
                                  url={typeof window !== 'undefined' && window.location.href}
                                >
                                  <img src={whatsapp} className={css.socialIcon} alt="whatsapp" />
                                </WhatsappShareButton>
                              </div>
                            </div>
                          </div>
                          <div className={css.gridWrapper}>
                            <div className={css.userProfileDiv}>
                              <AvatarLarge className={css.avatar} user={currentAuthor} />
                              <div className={css.userInfoWrapper}>
                                <div className={css.infoWrapper}>
                                  <h1 className={css.userName}>{authorDisplayName}</h1>
                                  {/* <div className={css.joined}>Joined</div> */}
                                </div>
                                <span className={css.reviewsWrapper}>
                                  <span className={css.reviewsNumber}>
                                    {reviews && reviews?.length}{' '}
                                  </span>
                                  Reseñas
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={css.productModalDetails}>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Transmisión</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.transmission == 'automatic'
                                  ? 'Automatica'
                                  : 'Mecanica'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Tipo</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.category == 'adventures'
                                  ? 'Aventura'
                                  : publicData?.category == 'compact'
                                  ? 'Compacto'
                                  : publicData?.category == 'economic'
                                  ? 'Economico'
                                  : publicData?.category == 'family'
                                  ? 'Familiar'
                                  : publicData?.category == 'executive'
                                  ? 'Ejecutivo'
                                  : 'Aventuras'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Marca</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.make ?? 'Not provided'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Combustible</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.fuel ?? 'Not provided'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Puertas</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.door ?? 'Not provided'}
                              </div>
                            </div>
                            <div className={css.subInfoWrapper}>
                              <div className={css.subInfoWrapperTop}>Año</div>
                              <div className={css.subInfoWrapperBottom}>
                                {publicData?.year ?? 'Not provided'}
                              </div>
                            </div>
                          </div>
                          <div className={css.rentNowSec}>
                            <Button
                              rootClassName={css.bookButton}
                              onClick={() => openBookModal(isOwnListing, history, location)}
                            >
                              <FormattedMessage id="BookingPanel.ctaButtonMessage" />
                            </Button>

                            <div className={css.favButtonWrapper}>
                              {index > -1 ? (
                                <FavoriteIcon
                                  onClick={e => handleClick(e)}
                                  className={css.favButtonSelected}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  onClick={e => handleClick(e)}
                                  className={css.favButtonNotSelected}
                                />
                              )}
                            </div>
                          </div>
                          <div className={css.keyRuleContainer}>
                            <div className={css.keyRules}>
                              <h2>Reglas</h2>
                              <ul>
                                {carrules &&
                                  carrules.map((item, index) => <li key={index}>{item}</li>)}
                              </ul>
                            </div>
                            <div className={css.keyRules}>
                              <h2>Características</h2>
                              <ul>
                                {keyFeatures &&
                                  keyFeatures.map((item, index) => (
                                    <li key={index}>{item.label}</li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                          <div className={css.infoSections}>
                            <div className={css.infoSection}>
                              <div className={css.infoSectionTitle}>Detalles de la poliza</div>
                              <div className={css.infoSectionBody}>
                                Seguro y asistencia en carretera 24/7 incluidos en el precio del
                                viaje
                              </div>
                              <div className={css.infoSectionLearnMore} onClick={this.toggleModal1}>
                                Conocer más <IconFeatherArrowRight />
                              </div>
                              <Modal
                                id="Detalles-de-la-poliza"
                                isOpen={this.state.open}
                                onClose={this.toggleModal1}
                                onManageDisableScrolling={() => {}}
                                modalTitle="Detalles de la poliza"
                              >
                                <DetailsPolicyModalContent />
                              </Modal>
                            </div>

                            <div className={css.infoSection}>
                              <div className={css.infoSectionTitle}>Contrato de arrendamiento</div>
                              <div className={css.infoSectionBody}>
                                Aprende más sobre el contrato de arrendamiento
                              </div>
                              <div className={css.infoSectionLearnMore} onClick={this.toggleModal2}>
                                Conocer más <IconFeatherArrowRight />
                              </div>
                              <Modal
                                id="Contrato-de-arrendamiento"
                                isOpen={this.state.isOpen}
                                onClose={this.toggleModal2}
                                onManageDisableScrolling={() => {}}
                                modalTitle="Contrato de arrendamiento"
                              >
                                <LeaseAgreementModalContent />
                              </Modal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <SectionReviews
                      isMobileLayout={isMobileLayout}
                      reviews={reviews}
                      fetchReviewsError={fetchReviewsError}
                    />{' '}
                    <div className={css.recommendSection}>
                      <div className={css.recommendSectionTitle}>Vehículos recomendados</div>
                      <div className={css.recommendSectionSubtitle}>
                        Échale un ojo a estas ofertas!
                      </div>
                      <div className={css.recommendedListingsWrapper}>
                        {this.state.recommendedListings.map(l => {
                          return (
                            <Grid container item xs={12} sm={4} md={4} key={l.id.uuid}>
                              <ListingCardTall
                                className={css.listingCard}
                                listing={l}
                                renderSizes={cardRenderSizes}
                                setActiveListing={() => {}}
                              />
                            </Grid>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <BookingPanel
                  className={css.bookingPanel}
                  listing={currentListing}
                  isOwnListing={isOwnListing}
                  unitType={unitType}
                  onSubmit={handleBookingSubmit}
                  title={bookingTitle}
                  subTitle={bookingSubTitle}
                  authorDisplayName={authorDisplayName}
                  onManageDisableScrolling={onManageDisableScrolling}
                  timeSlots={timeSlots}
                  fetchTimeSlotsError={fetchTimeSlotsError}
                  onFetchTransactionLineItems={onFetchTransactionLineItems}
                  lineItems={lineItems}
                  fetchLineItemsInProgress={fetchLineItemsInProgress}
                  fetchLineItemsError={fetchLineItemsError}
                  isApprovedToDrive={isApprovedToDrive}
                  modalTitle="Selecciona un rango de fecha"
                  onValidateVoucher={onValidateVoucher}
                  voucherValid={voucherValid}
                  voucherInProgress={voucherInProgress}
                  voucherRequested={voucherRequested}
                  authorId={authorId}
                  transactions={transactions}
                  included={included}
                />
              </div>
            </div>
          </LayoutWrapperMain>

          {/* <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter> */}
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ListingPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  enquiryModalOpenForListingId: null,
  showListingError: null,
  reviews: [],
  bookings: [],
  fetchReviewsError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  sendEnquiryError: null,
  filterConfig: config.custom.filters,
  lineItems: null,
  fetchLineItemsError: null,
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_DRAFT_VARIANT, LISTING_PAGE_PENDING_APPROVAL_VARIANT]),
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  callSetInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  bookings: arrayOf(propTypes.bookings),
  fetchReviewsError: propTypes.error,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  onSendEnquiry: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,
  filterConfig: array,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    bookings,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    enquiryModalOpenForListingId,
    voucherValid,
    voucherInProgress,
    voucherRequested,
    transactions,
    included,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    bookings,
    timeSlots,
    fetchTimeSlotsError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    voucherValid,
    voucherInProgress,
    voucherRequested,
    transactions,
    included,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onFetchTransactionLineItems: (
    bookingData,
    listingId,
    isOwnListing,
    promotion,
    voucherCode,
    refferralCode
  ) =>
    dispatch(
      fetchTransactionLineItems(
        bookingData,
        listingId,
        isOwnListing,
        promotion,
        voucherCode,
        refferralCode
      )
    ),
  onSendEnquiry: (listingId, message) => dispatch(sendEnquiry(listingId, message)),
  onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
  bookmarkedData: id => dispatch(updateProfile(id)),
  onValidateVoucher: params => dispatch(validateVoucher(params)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withViewport
)(ListingPageComponent);

export default ListingPage;
