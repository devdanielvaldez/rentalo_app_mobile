import React from 'react';
import { string, func } from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink } from '../../components';
import { Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import css from './ListingCardLong.module.css';
import gasIcon from './gasIcon.png';
import groupIcon from './groupIcon.png';
import partsIcon from './partsIcon.png';
import carDoorIcon from './carDoorIcon.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../containers/ProfileSettingsPage/ProfileSettingsPage.duck';
import { useSelector } from 'react-redux';



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

export const ListingCardLongComponent = props => {
  const { className, rootClassName, intl, listing, renderSizes, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing && currentListing.id.uuid;
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
  const unitType = config.bookingUnitType;

  const state = useSelector(state => state);
  const user = state.user.currentUser;

  const dispatch = useDispatch()
  const bookmark = user?.attributes?.profile.publicData?.bookmark || [];
  const index = bookmark.findIndex(ids => ids === id);
  const handleClick = e => {
    e.preventDefault();
    index > -1
      ? [
        bookmark.splice(index, 1),
        dispatch(updateProfile({ publicData: { bookmark } })),
      ]
      : [bookmark.push(id), dispatch(updateProfile({ publicData: { bookmark } }))];
  };

  const publicData = currentListing?.attributes?.publicData ?? {};
  const { transmission, fuel, door, seat } = publicData;

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <Grid container item xs={12} style={{ width: '100%', height: '100%' }}>
          <Grid container item xs={12}>
            <Grid container item xs={4}>
              <img src={displayImage} className={css.listingImage} alt='foto del coche' />
            </Grid>
            <Grid container item xs={8} style={{ paddingLeft: '15px' }}>
              <Grid container item xs={12} direction="row" alignItems="center">
                <div className={css.reviews}>
                  <StarIcon className={css.starIcon} /> {'new'}
                </div>
                {/* <div className={css.trips}>0 Rentas</div> */}
              </Grid>
              <Grid container item xs={12} direction="row">
                <div className={css.listingTitle}>
                  {richText(title, {
                    longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                    longWordClass: css.longWord,
                  })}
                </div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent="space-between"
                alignContent="center"
                alignItems="center"
              >
                <div className={css.listingPrice}>
                  {formattedPrice} <span>/ día</span>
                </div>
                <div className={css.rightBtn}>
                  <button className={css.rentNowButton}>Réntalo</button>
                  <div className={css.favButtonWrapper}>
                    {index > -1 ?(
                      <FavoriteIcon
                      onClick={e => handleClick(e)}
                        className={css.favButtonSelected}
                      />
                    ):
                    (
                      <FavoriteBorderIcon
                      onClick={e => handleClick(e)}
                        className={css.favButtonNotSelected}
                      />
                    ) }
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className={css.cardFeatures}>
              <div className={css.listingIconWrapper}>
                <img src={gasIcon} className={css.listingIcon} alt='gas' /> {fuel ?? 'Not provided'}
              </div>
              <div className={css.listingIconWrapper}>
                <img src={partsIcon} className={css.listingIcon}  alt='parts' /> {transmission == 'automatic' ? 'Automatica' : 'Mecanica' ?? 'Not provided'}
              </div>
              <div className={css.listingIconWrapper}>
                <img src={groupIcon} className={css.listingIcon} alt='grupo' /> {seat ?? 'Not provided'} pasajeros
              </div>
              <div className={css.listingIconWrapper}>
                <img src={carDoorIcon} className={css.listingIcon} alt='puerta del coche' /> {door ?? 'Not provided'} puertas
              </div>
            </div>
          </Grid>
          <Grid container item xs={12}></Grid>
        </Grid>

      </div>
    </NamedLink>
  );
};

ListingCardLongComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardLongComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardLongComponent);
