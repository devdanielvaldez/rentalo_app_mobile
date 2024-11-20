import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';

import CircleIcon from '@mui/icons-material/Circle';

import linkedin from './Icon awesome-linkedin-in.svg';
import twitter from './Icon awesome-twitter.svg';
import instagram from './Icon feather-instagram.svg';
import facebook from './Icon simple-facebook.svg';
import location from './Group 1897.svg';
import mail from './Group 1892.svg';
import phone from './Group 1894.svg';

import {
  Logo,
  NamedLink,
} from '../../components';

import css from './Footer.module.css';

// const renderSocialMediaLinks = intl => {
//   const { siteFacebookPage, siteInstagramPage, siteTwitterHandle } = config;
//   const siteTwitterPage = twitterPageURL(siteTwitterHandle);

//   const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
//   const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
//   const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

//   const fbLink = siteFacebookPage ? (
//     <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
//       <IconSocialMediaFacebook />
//     </ExternalLink>
//   ) : null;

//   const twitterLink = siteTwitterPage ? (
//     <ExternalLink
//       key="linkToTwitter"
//       href={siteTwitterPage}
//       className={css.icon}
//       title={goToTwitter}
//     >
//       <IconSocialMediaTwitter />
//     </ExternalLink>
//   ) : null;

//   const instragramLink = siteInstagramPage ? (
//     <ExternalLink
//       key="linkToInstagram"
//       href={siteInstagramPage}
//       className={css.icon}
//       title={goToInsta}
//     >
//       <IconSocialMediaInstagram />
//     </ExternalLink>
//   ) : null;
//   return [fbLink, twitterLink, instragramLink].filter(v => v != null);
// };

const Footer = props => {
  const { rootClassName, className } = props;
  // const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);
  // const dispatch = useDispatch();
  // const [showError, setShowError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [showSubscribe, setShowSubscribe] = useState(false);

  // const showSuccessMessage = () => {
    // setTimeout(() => setShowSubscribe(false), 2000);
    // clearTimeout();
  // };

  // const showErrorMessage = () => {
    // setTimeout(() => setShowError(false), 2000);
    // clearTimeout();
  // };

  // const onFormSubmit = values => {
    // const { email } = values;
    // dispatch(sendMailByChimp({ email })).then(resp => {
      // const status = resp?.data?.status;
      // if (resp && resp.error) {
        // setErrorMessage(resp?.error?.title);
        // setShowError(true);
        // showErrorMessage();
      // }
      // if (status === 'subscribed') setShowSubscribe(true);
      // showSuccessMessage();
    // });
  // };

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.footerTopContent}>
            {/* <div className={css.someLiksMobile}>{socialMediaLinks}</div> */}
            <div className={css.mobileInfo}>
              <div className={css.linkedin}>
                <a href="https://www.linkedin.com/company/réntalo" target="_blank">
                  <img alt='linkedin' src={linkedin} className={css.photo} />
                </a>
              </div>
              <div className={css.twitter}>
                <a href={config.siteTwitterHandle} target="_blank">
                  <img alt='twitter' src={twitter} className={css.photo} />{' '}
                </a>
              </div>
              <div className={css.instagram}>
                <a href={config.siteInstagramPage} target="_blank">
                  <img alt='instagram' src={instagram} className={css.photo} />
                </a>
              </div>
              <div className={css.facebook}>
                <a href={config.siteFacebookPage} target="_blank">
                  <img alt='facebook' src={facebook} className={css.photo} />
                </a>
              </div>
            </div>

            <div className={css.links}>
              <div className={css.organization} id="organization">
                <NamedLink name="HomePage" className={css.logoLink}>
                  <Logo format="desktop" className={css.logo} />
                </NamedLink>
                <div className={css.organizationInfo}>
                  {/* <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p> */}
                  <div className={css.linkedin}>
                    <a href="https://www.linkedin.com/company/réntalo" target="_blank">
                      <img alt="linkedin" src={linkedin} className={css.photo} />
                    </a>
                  </div>
                  <div className={css.twitter}>
                    <a href={config.siteTwitterHandle} target="_blank">
                      <img alt="twitter" src={twitter} className={css.photo} />{' '}
                    </a>
                  </div>
                  <div className={css.instagram}>
                    <a href={config.siteInstagramPage} target="_blank">
                      <img alt="instagram" src={instagram} className={css.photo} />
                    </a>
                  </div>
                  <div className={css.facebook}>
                    <a href={config.siteFacebookPage} target="_blank">
                      <img alt="facebook" src={facebook} className={css.photo} />
                    </a>
                  </div>
                </div>
              </div>
              <div className={css.otherQuickLinks}>
                <div className={css.quickLinks}>
                  <div className={css.infoLinks1}>
                    <ul className={css.list}>
                      <li className={css.listItem}>
                        <span className={css.title}>Explora</span>
                      </li>
                      <li className={css.listItem}>
                        <NamedLink name="InsurancePage" className={css.link}>
                          Seguros
                          {/* <FormattedMessage id="Footer.toAboutPage" /> */}
                        </NamedLink>
                      </li>
                      <li className={css.listItem}>
                        <NamedLink name="TestimoniosPage" className={css.link}>
                          {/* <FormattedMessage id="Footer.toFAQPage" /> */}
                          Testimonios
                        </NamedLink>
                      </li>
                      <li className={css.listItem}>
                        <NamedLink name="BecomeHostPage" className={css.link}>
                          Conviértete en propietario
                        </NamedLink>
                      </li>

                      <li className={css.listItem}>
                        <NamedLink name="FAQsPage" className={css.link}>
                          FAQs
                        </NamedLink>
                      </li>
                      {/* <li className={css.listItem}>
                        <NamedLink name="ReservationPage" className={css.link}>

                          Reserva instantánea
                        </NamedLink>
                      </li> */}
                    </ul>
                  </div>
                  <div className={css.infoLinks}>
                    <ul className={css.list}>
                      <li className={css.listItem}>
                        <span className={css.title}>Nuestra compañía</span>
                      </li>
                      {/* <li className={css.listItem}>
                    <NamedLink name="BlogPage" className={css.link}>
                      <FormattedMessage id="Footer.blog" />
                    </NamedLink>
                  </li> */}
                      {/* <li className={css.listItem}>
                    <NamedLink name="NewListingPage" className={css.link}>
                      Reservar ahora
                      <FormattedMessage id="Footer.toNewListingPage" />
                    </NamedLink>
                  </li>*/}

                      <li className={css.listItem}>
                        <NamedLink name="AboutPage" className={css.link}>
                          Sobre Nosotros
                        </NamedLink>
                      </li>

                      <li className={css.listItem}>
                        <NamedLink name="HowItWorksPage" className={css.link}>
                          {/* <FormattedMessage id="Footer.careers" /> */}
                          Cómo funciona
                        </NamedLink>
                      </li>

                      <li className={css.listItem}>
                        <NamedLink name="HowToRentPage" className={css.link}>
                          {/* <FormattedMessage id="Footer.careers" /> */}
                          Cómo alquilar
                        </NamedLink>
                      </li>


                      {/* <li className={css.listItem}>
                        <a
                          className={css.link}
                          target="_blank"
                          href="http://blog.rentaloinc.com"
                          // class="Footer_link__Xabb2"
                        >
                          Blog
                        </a>

                      </li> */}
                    </ul>
                  </div>
                  <div className={css.infoLinks}>
                    <ul className={css.list}>
                      <li className={css.listItem}>
                        <span className={css.title}>Legal y Contacto</span>
                      </li>
                      <li className={css.listItem}>
                        <NamedLink name="ContactPage" className={css.link}>
                          {/* <FormattedMessage id="Footer.toAboutPage" /> */}
                          Contacto
                        </NamedLink>
                      </li>
                      {/* <li className={css.listItem}>
                        <NamedLink name="PrivacyPolicyPage" className={css.link}>
                          Política de privacidad
                        </NamedLink>
                      </li>
                      <li className={css.listItem}>
                        <NamedLink name="TermsOfServicePage" className={css.link}>
                          Términos y condiciones
                        </NamedLink>
                      </li> */}
                      <li className={css.listItem}>
                        <NamedLink name="WorkWithUsPage" className={css.link}>
                          Trabaja con nosotros
                        </NamedLink>
                      </li>
                    </ul>
                  </div>

                  <div className={css.infoLinks}>
                    <ul className={css.list}>
                      <li className={css.listItem}>
                        <span className={css.title}>Nuestros socios</span>
                      </li>
                      <li className={css.link}>
                        <a href="https://www.segurossura.com.do/" target="_blank"> Sura </a>
                      </li>
                    </ul>
                  </div>

                  {/* <div className={css.extraLinks}>
                    <span className={css.title}>Suscríbete</span>
                    <span className={css.subtitle}>
                      Únete a nuestro Blog y recibe las ofertas de temporada
                    </span>
                    {showError && <span style={{ color: 'red' }}>{errorMessage} !</span>}
                    {showSubscribe ? (
                      <span style={{ color: 'green' }}>Subscribed successfully !</span>
                    ) : null}
                    <div className={css.box}>
                      <SubscribeEmailForm onSubmit={onFormSubmit} />
                    </div>
                  </div> */}

                </div>
                {/* <div className={css.extraLinks}>
                  <div className={css.someLinks}>{socialMediaLinks}</div>
                  <div className={css.legalMatters}>
                    <ul className={css.tosAndPrivacy}>
                      <li>
                        <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                          <FormattedMessage id="Footer.termsOfUse" />
                        </NamedLink>
                      </li>
                      <li>
                        <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                          <FormattedMessage id="Footer.privacyPolicy" />
                        </NamedLink>
                      </li>
                    </ul>
                  </div>
                </div> */}

                <div className={css.wrapper}>
                  <div className={css.row}>
                    <span>
                      <img src={mail} alt='mail' />
                      <span className={css.subtext}>hola@rentaloinc.com</span>
                    </span>
                    <CircleIcon
                      sx={{ color: '#D9D9D9', width: '6px', height: '6px', marginRight: '20px' }}
                    />
                  </div>
                  <div className={css.row}>
                    <span>
                      <img src={phone} alt='teléfono' />
                      <span className={css.subtext}>(829)-657-5069</span>
                    </span>
                    <CircleIcon
                      sx={{ color: '#D9D9D9', width: '6px', height: '6px', marginRight: '20px' }}
                    />
                  </div>
                  <div className={css.row}>
                    <img src={location} alt='ubicación' />
                    <span className={css.subtext}>
                      <span className={css.location}>
                        Santiago, Dominican Republic
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div> */}

            {/* <div className={css.mobile}>
              <div className={css.hr1}></div>
              <h2>Subscribete</h2>
              <span style={{ color: '#858484', fontSize: '15px' }}>
                Únete y recibe las ofertas de temporada
              </span>
              <span style={{ color: '#858484' }}>Escribe tu correo</span>
              <input className={css.mobileInput} type="email" placeholder="nombre@ejemplo.com" />
              <button className={css.mobileButton}>Subscribir</button>
            </div> */}


          </div>
          <div className={css.last}>
            <div className={css.first}>
              <span>Copyright © 2024 Réntalo. All Rights Reserved.</span>
            </div>
            <div className={css.row1}>
              <NamedLink name="TermsOfServicePage">
                <span className={css.policy}>Términos y condiciones</span>
              </NamedLink>

              <NamedLink name="PrivacyPolicyPage">
                <span className={css.policy}>Política de privacidad</span>
              </NamedLink>
            </div>
          </div>

          <div className={css.mobileCopyright}>
            <div className={css.mobileWrapper}>
              {/* <p style={{ color: '#858484' }}>
                Diseñado por <span style={{ color: 'black' }}>A.SMITH</span>
              </p> */}
              <span style={{ fontSize: '14px', color: '#858484' }}>
                Copyright © 2023 . All Rights Reserved.
              </span>
            </div>
            <div className={css.mobileRow}>
              <NamedLink name="TermsOfServicePage">
                <span className={css.policy}>Términos y condiciones</span>
              </NamedLink>
              <NamedLink name="PrivacyPolicyPage">
                <span className={css.policy}>Política de privacidad</span>
              </NamedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
