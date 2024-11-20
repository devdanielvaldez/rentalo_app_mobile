import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import css from './SideNav.module.css';
import Rentalo from './Mask Group 26.png';
import facebook from './Icon awesome-facebook-f.svg';
import twitter from './Icon awesome-twitter.svg';
import instagram from './Icon feather-instagram.svg';
import user from './Icon feather-user.svg';
import { NamedLink } from '../../components';
import { pushToPath } from '../../util/urlHelpers';
import config from '../../config';

const SideNav = ({ currentUser, isAuthenticatedOrJustHydrated }) => {
  const displayName = currentUser && currentUser?.attributes?.profile?.displayName;

  return (
    <div className={isAuthenticatedOrJustHydrated ? css.nav : css.withoutLoginNav}>
      <div className={css.logo}>
        <NamedLink name="HomePage">
          <img src={Rentalo} alt="Rentalo" />
        </NamedLink>
      </div>
      <div className={css.hr}></div>
      <div className={css.linksBlock}>
        <NamedLink name="HomePage">
          <span className={css.about}>Home</span>
        </NamedLink>
        <NamedLink name="AboutPage">
          <span className={css.about}>Acerca</span>
        </NamedLink>
        <NamedLink name="HowItWorksPage">
          <span className={css.howitworks}>Cómo Funciona</span>
        </NamedLink>
        <NamedLink name="BecomeHostPage">
          <span className={css.host}>Ser un propietario</span>
        </NamedLink>
        <NamedLink name="HowToRentPage">
          <span className={css.rent}>¿Cómo alquilo un coche?</span>
        </NamedLink>
      </div>
      <div className={css.hr}></div>
      <div className={css.linksBlock}>
        <NamedLink name="InsurancePage">
          <span className={css.contact}>Confianza y seguridad</span>
        </NamedLink>
        <NamedLink name="FAQsPage">
          <span className={css.faq}>FAQs</span>
        </NamedLink>
      </div>
      <div className={css.hr}></div>
      <div className={css.linksBlock} onClick={() => pushToPath('/driver/profile')}>
        <div className={css.userLogin}>
          <div className={css.user}>
            <img alt="usuario" src={user} />
          </div>
          <p className={css.userGetInto}>{displayName}</p>
        </div>
      </div>
      <div className={css.hr}></div>
      <div className={css.linksBlock}>
        <div className={css.box}>
          <a href={config.siteFacebookPage} target="_blank">
            <img alt="facebook" src={facebook} className={css.fb} />
          </a>
        </div>
        <div className={css.box}>
          <a href={config.siteTwitterHandle} target="_blank">
            <img alt="twitter" src={twitter} className={css.twit} />
          </a>
        </div>
        <div className={css.box}>
          <a href={config.siteInstagramPage} target="_blank">
            <img alt="instagram" src={instagram} className={css.insta} />
          </a>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  // Topbar needs isAuthenticated
  const { isAuthenticated } = state.Auth;
  // Topbar needs user info.

  return {
    isAuthenticated,
  };
};

export default compose(withRouter, connect(mapStateToProps))(SideNav);
