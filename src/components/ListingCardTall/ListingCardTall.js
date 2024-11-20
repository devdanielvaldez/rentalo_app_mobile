import React from 'react';
import { string, func } from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import {  propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink } from '../../components';
import StarIcon from '@mui/icons-material/Star';
import css from './ListingCardTall.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';
import { updateProfile } from '../../containers/ProfileSettingsPage/ProfileSettingsPage.duck';
import { useDispatch } from 'react-redux';
import { ensureListing } from '../../util/data';

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

export const ListingCardTallComponent = props => {
  const { className, rootClassName, intl, listing,setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const state = useSelector(state => state);
  const user = state.user.currentUser;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;
  const displayImage =
    firstImage && firstImage.attributes.variants['landscape-crop2x']
      ? firstImage.attributes.variants['landscape-crop2x']?.url
      : firstImage.attributes.variants['landscape-crop']
      ? firstImage.attributes.variants['landscape-crop']?.url
      : null;
  const { formattedPrice } = priceData(price, intl);
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

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <div className={css.cardBlock}>
          <div className={css.cardImg}>
            <img src={displayImage} className={css.listingImage} alt='foto del coche' />
          </div>
          <div className={css.reviewSec}>
            <div className={css.reviews}>
              <StarIcon className={css.starIcon} /> {'new'}
            </div>
            {/* <div className={css.trips}>0 Rentas</div> */}
          </div>
          <div className={css.listingTitle}>
            {richText(title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div>
          <div className={css.listingPrice}>
            {formattedPrice} <span>/ día</span>
          </div>
          <div className={css.bottomWrapper}>
            <div className={css.rentNowButton}>Réntalo</div>
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
        </div>
      </div>
    </NamedLink>
  );
};

ListingCardTallComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};
ListingCardTallComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
  renderSizes: string,
  setActiveListing: func,
};

export default injectIntl(ListingCardTallComponent);
