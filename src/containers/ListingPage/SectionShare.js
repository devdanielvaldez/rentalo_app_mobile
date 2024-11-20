import React from 'react';
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

import css from './ListingPage.module.css';

const SectionShare = props => {

  return (
    <div className={css.sectionShare}>
      <div className={css.socialShare}>
        <div className={css.shareText}>Share profile:</div>
        <TwitterShareButton url={typeof window !== 'undefined' && window.location.href}>
          <img alt='twitter' src={twitter} className={css.socialIcon} />
        </TwitterShareButton>

        <FacebookShareButton url={typeof window !== 'undefined' && window.location.href}>
          <img alt='facebook' src={facebook} className={css.socialIcon} />
        </FacebookShareButton>

        <WhatsappShareButton url={typeof window !== 'undefined' && window.location.href}>
          <img alt='whatsapp' src={whatsapp} className={css.socialIcon} />
        </WhatsappShareButton>
        <EmailShareButton url={typeof window !== 'undefined' && window.location.href}>
          <img alt='mail' src={mail} className={css.socialIcon} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SectionShare;
