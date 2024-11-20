import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { Reviews } from '../../components';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import facebook from './Icon awesome-facebook.svg';
import twitter from './Icon awesome-twitter.svg';
import whatsapp from './Icon awesome-whatsapp.svg';

import css from './ListingPage.module.css';

const SectionReviews = props => {
  const { reviews, fetchReviewsError, isMobileLayout } = props;
  const reviewsError = (
    <h2 className={css.errorText}>
      <FormattedMessage id="ListingPage.reviewsError" />
    </h2>
  );

  return (
    <div className={css.sectionReviews}>
      <div className={css.reviewsHeading}>
        <h2>
          {/* <FormattedMessage id="ListingPage.reviewsHeading" values={{ count: reviews.length }} /> */}
          {isMobileLayout ? (
            'Opinar sobre este vehiculo'
          ) : (
            <FormattedMessage id="ListingPage.reviewsHeading" values={{ count: reviews.length }} />
          )}
        </h2>
        {!isMobileLayout ? (
          <div className={css.socialMediaIcons}>
            <div className={css.shareText}>Comparte este vehículo:</div>
            <TwitterShareButton url={typeof window !== 'undefined' && window.location.href}>
              <img alt="twitter" src={twitter} className={css.socialIcon} />
            </TwitterShareButton>

            <FacebookShareButton url={typeof window !== 'undefined' && window.location.href}>
              <img alt="facebook" src={facebook} className={css.socialIcon} />
            </FacebookShareButton>

            <WhatsappShareButton url={typeof window !== 'undefined' && window.location.href}>
              <img alt="whatsapp" src={whatsapp} className={css.socialIcon} />
            </WhatsappShareButton>
          </div>
        ) : null}
      </div>
      {fetchReviewsError ? reviewsError : null}
      <Reviews reviews={reviews} />
    </div>
  );
};

export default SectionReviews;
