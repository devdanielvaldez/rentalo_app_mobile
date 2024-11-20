import React, { useState, useEffect } from 'react';
import { string, func } from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink } from '../../components';
import { Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import css from './ListingCardSquare.module.css';
import gasIcon from './gasIcon.png';
import groupIcon from './groupIcon.png';
import partsIcon from './partsIcon.png';
import carDoorIcon from './carDoorIcon.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { types as sdkTypes } from '../../util/sdkLoader';
const { UUID } = sdkTypes;
const sharetribeSdk = require('sharetribe-flex-sdk');

const sdk = sharetribeSdk.createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};


export const ListingCardSquareComponent = props => {
  const { className, rootClassName, intl, listing, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;
  const displayImage =
    firstImage && firstImage.attributes.variants['landscape-crop2x']
      ? firstImage.attributes.variants['landscape-crop2x']?.url
      : firstImage.attributes.variants['landscape-crop']
      ? firstImage.attributes.variants['landscape-crop']?.url
      : null;

  const { formattedPrice } = priceData(price, intl);

  const listingId = currentListing?.id?.uuid;

  const [isFavourite, setIsFavourite] = useState(false);
  const [favListingsArray, setFavListingsArray] = useState([]);

  useEffect(() => {
    sdk.currentUser
      .show()
      .then(res => {
        if (
          res.data.data.attributes.profile.privateData &&
          res.data.data.attributes.profile.privateData.favListingsArray
        ) {
          setFavListingsArray(res.data.data.attributes.profile.privateData.favListingsArray);
          const listingsIdsArray = res.data.data.attributes.profile.privateData.favListingsArray;
          const isFavourite = listingsIdsArray.find(id => {
            return id === listingId;
          });
          if (isFavourite) {
            setIsFavourite(true);
          }
        }
      })
      .catch(e => console.log(e));
  }, []);

  const addToFavourites = action => {
    if (action === 'add') {
      return sdk.currentUser
        .updateProfile({
          privateData: {
            favListingsArray: [...favListingsArray, listingId],
          },
        })
        .then(resp => {
          return setIsFavourite(true);
        })
        .catch(e => console.log(e));
    } else {
      const favListingsArrayCopy = [...favListingsArray];

      for (var i = 0; i < favListingsArrayCopy.length; i++) {
        if (favListingsArrayCopy[i] === listingId) {
          favListingsArrayCopy.splice(i, 1);
        }
      }

      return sdk.currentUser
        .updateProfile({
          privateData: {
            favListingsArray: favListingsArrayCopy,
          },
        })
        .then(resp => {
          return setIsFavourite(false);
        })
        .catch(e => console.log(e));
    }
  };

  const [averageRating, setAverangeRating] = useState(false);

  useEffect(() => {
    sdk.reviews
      .query({
        listingId: new UUID(id),
      })
      .then(res => {
        const reviewsArray = res.data.data;

        const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

        if (reviewsArray.length > 0) {
          const ratingNumbersArray = reviewsArray
            .filter(r => {
              return r.attributes.rating;
            })
            .map(n => {
              return n.attributes.rating;
            });

          const averageRatingNumber = average(ratingNumbersArray).toFixed(1);
          setAverangeRating(averageRatingNumber);
        }
      });
  }, []);

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <Grid container item xs={12} style={{ width: '100%', height: '100%' }}>
          <div className={css.listingCardSquare}>
            <div className={css.squareCardTop}>
              <div className={css.squareCardImg}>
                <img src={displayImage} className={css.listingImage} alt='foto del coche' />
              </div>
              <div className={css.squareCardDescription}>
                <div className={css.listingTitle}>
                  {richText(title, {
                    longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                    longWordClass: css.longWord,
                  })}
                </div>
                <div className={css.listingPrice}>
                  {formattedPrice} <span>/ día</span>
                </div>
              </div>
            </div>
            <div className={css.squareCardRating}>
              <div className={css.userReview}>
                <div className={css.reviews}>
                  <StarIcon className={css.starIcon} /> {averageRating || 'new'}
                </div>
                {/* <div className={css.trips}>0 Rentas</div> */}
              </div>
              <div className={css.rentNow}>
                <button className={css.rentNowButton}>Réntalo</button>
                <div className={css.favButtonWrapper}>
                  {!isFavourite ? (
                    <FavoriteBorderIcon
                      onClick={e => {
                        e.preventDefault();
                        addToFavourites('add');
                      }}
                      className={css.favButtonNotSelected}
                    />
                  ) : (
                    <FavoriteIcon
                      onClick={e => {
                        e.preventDefault();
                        addToFavourites('remove');
                      }}
                      className={css.favButtonSelected}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={css.squareCardFeatures}>
              <div className={css.listingIconWrapper}>
                <img src={gasIcon} className={css.listingIcon} alt='gas' />
                <span>Gasolina</span>
              </div>
              <div className={css.listingIconWrapper}>
                <img src={partsIcon} className={css.listingIcon} alt='parts' />
                <span>Auto</span>
              </div>
              <div className={css.listingIconWrapper}>
                <img src={groupIcon} className={css.listingIcon} alt='grupo' />
                <span>4 Pasajeros</span>
              </div>
              <div className={css.listingIconWrapper}>
                <img src={carDoorIcon} className={css.listingIcon} alt='puerta del coche' />
                <span>2 Puertas</span>
              </div>
            </div>
          </div>
        </Grid>
        {/* <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x', 'listing-card', 'listing-card-2x']}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={css.title}>
            {richText(title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div>
          <div className={css.authorInfo}>
            <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }} />
          </div>
        </div>*/}
      </div>
    </NamedLink>
  );
};

ListingCardSquareComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardSquareComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardSquareComponent);
