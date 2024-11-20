import React, { useEffect, useState } from 'react';
import {
  SectionHowItWorks,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SearchMap,
  Modal,
} from '../../components';
import { TopbarContainer, StaticPage } from '../../containers';

import css from './HomePage.module.css';
import SectionGif from '../../components/SectionGif/SectionGif';
import SectionCars from '../../components/SectionCars/SectionCars';
import SectionInsurance from '../../components/SectionInsurance/SectionInsurance';
import SectionAccordion from '../../components/SectionAccordion/SectionAccordion';
import SideNav from '../../components/SideNav/SideNav';
import { Grid } from '@material-ui/core';
import sura from '../../assets/logo_sura.png';
import tesla from './Mask Group 35.png';
import { pushToPath } from '../../util/urlHelpers';
import adventuresIcon from './adventuresIcon.png';
import compactIcon from './compactIcon.png';
import economicIcon from './economicIcon.png';
import executivesIcon from './executivesIcon.png';
import familyIcon from './familyIcon.png';
import ListingCardTall from '../../components/ListingCardTall/ListingCardTall';

import '../../styles/slick/slick.css';
import '../../styles/slick/slick-theme.css';
import Slider from 'react-slick';
import './slick.css';
import { connect, useSelector } from 'react-redux';
import IconSliderArrowRight from '../../components/IconSliderArrowRight/IconSliderArrowRight';
import IconSliderArrowLeft from '../../components/IconSliderArrowLeft/IconSliderArrowLeft';
import { compose } from 'redux';

import discountPromo from './executivesIcon.png';
import { manageDisableScrolling } from '../../ducks/UI.duck';
const HomePage = props => {
  const { location, onManageDisableScrolling } = props;
  const { isAuthenticated } = useSelector(state => state.Auth);
  const sharetribeSdk = require('sharetribe-flex-sdk');
  const sdk = sharetribeSdk.createInstance({
    clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
  });
  const [listings, setListings] = useState([]);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    //set state after 2 seconds
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  useEffect(() => {
    sdk.listings
      .query({
        include: ['author', 'images'],
        'fields.listing': ['title', 'geolocation', 'price', 'publicData'],
        'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
        'fields.image': [`variants.landscape-crop`, `variants.landscape-crop2x`],
        'limit.images': 1,
      })
      .then(res => {
        const listings = res.data.data;
        const images = res.data.included.filter(i => {
          return i.type === 'image';
        });
        const users = res.data.included.filter(i => {
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
        setListings(res.data.data);
      })
      .catch(e => console.log(e));
  }, []);
  const cardRenderSizes = () => {
    return [
      '(max-width: 549px) 100vw',
      '(max-width: 767px) 50vw',
      `(max-width: 1439px) 26vw`,
      `(max-width: 1920px) 18vw`,
      `14vw`,
    ].join(', ');
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  var responsive = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const multiRowSlider = {
    className: 'center',
    centerMode: false,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    arrows: true,
    nextArrow: (
      <span className="sliderRightArrow">
        <IconSliderArrowRight />
      </span>
    ),
    prevArrow: (
      <span className="sliderLeftArrow">
        <IconSliderArrowLeft />
      </span>
    ),
  };
  const pageName = ['Home'];
  const { currentUser } = useSelector(state => state.user);
  // useEffect(() => {
  //   console.log('usuario --->', currentUser);
  // })

  const handleStore = type => {
    switch (type) {
      case 'google':
        window.location.href =
          'https://play.google.com/store/apps/details?id=com.rentalo.app&hl=es_US';
        break;
      case 'apple':
        window.location.href = 'https://apps.apple.com/us/app/rentalo/id6446693559';
        break;
    }
  };

  return (
    <StaticPage
      title="Opciones Ilimitadas a Precios Insuperables"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HomePage',
        description: 'Home',
        name: 'Home page',
      }}
      description="Opciones Ilimitadas a Precios Insuperables"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={isAuthenticated ? css.wrapper : css.noWrapper}>
            <div className={css.homePageBannerSec}>
              <div className={css.bannerLeft}>
                <div className={css.row}>
                  {/* <img src={trust} className={css.pic1} /> */}
                  <img src={sura} className={css.pic2} alt="sura" />
                </div>
                <div className={css.front}>
                  <h1 className={css.title}>
                    Elige entre opciones ilimitadas al mejor precio del mercado
                  </h1>
                  <div className={css.row}>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/024/170/865/original/badge-google-play-and-app-store-button-download-free-png.png"
                      className={css.picStoresApple}
                      alt="apple"
                      onClick={() => handleStore('apple')}
                    />
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/024/170/871/non_2x/badge-google-play-and-app-store-button-download-free-png.png"
                      className={css.picStoresGoogle}
                      alt="google"
                      onClick={() => handleStore('google')}
                    />
                  </div>
                  <p className={css.text}>Asegurado por SURA</p>
                  <button className={css.button} onClick={() => pushToPath('/login')}>
                    {currentUser == null ? 'Acceder ahora' : 'Mi Perfil'}
                  </button>
                </div>
              </div>
              <div className={css.bannerRight}>
                {/* <div className={css.car_details}>
                  <div className={css.inner_padding}>
                    <h4 className={css.modal_name}>Tesla Model Y</h4>
                    <p className={css.price_details}></p>
                  </div>
                  <div className={css.buttons_details}>
                    <div className={css.inner_padding}>
                      <button type="submit" className={css.primary_button}>
                        Réntalo
                      </button>
                      <p className={css.button_link}>
                        <a href="#"> Similares </a>
                      </p>
                    </div>
                  </div>
                  <span className={css.whiteImgIndicator}>
                    <svg width="118" height="22" viewBox="0 0 118 22">
                      <g id="Group_4191" data-name="Group 4191" transform="translate(-1324 -184)">
                        <line
                          id="Line_1311"
                          data-name="Line 1311"
                          x2="87"
                          transform="translate(1324.5 194.5)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1"
                        />
                        <g
                          id="Group_4190"
                          data-name="Group 4190"
                          transform="translate(59.215 5.215)"
                        >
                          <g
                            id="Ellipse_520"
                            data-name="Ellipse 520"
                            transform="translate(1361.785 179.785)"
                            fill="#f6f4f3"
                            stroke="#fff"
                            strokeWidth="1"
                          >
                            <circle cx="10" cy="10" r="10" stroke="none" />
                            <circle cx="10" cy="10" r="10.5" fill="none" />
                          </g>
                          <circle
                            id="Ellipse_521"
                            data-name="Ellipse 521"
                            cx="4"
                            cy="4"
                            r="4"
                            transform="translate(1367.785 185.785)"
                            fill="#fff"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                </div> */}
                <img src={tesla} className={css.teslaPic} alt="tesla" />
              </div>
            </div>
          </div>
          <div className={css.vehicletypeSlider}>
            <Slider {...responsive}>
              <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=adventures')}
              >
                <img src={adventuresIcon} className={css.categoryButtonIcon} alt="aventuras" />
                Aventuras
              </div>

              <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=economic')}
              >
                <img src={economicIcon} className={css.categoryButtonIcon} alt="económico" />
                Económico
              </div>

              <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=compact')}
              >
                <img src={compactIcon} className={css.categoryButtonIcon} alt="compacto" />
                Compacto
              </div>

              <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=executives')}
              >
                <img src={executivesIcon} className={css.categoryButtonIcon} alt="ejecutivos" />
                Ejecutivos
              </div>

              <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=family')}
              >
                <img src={familyIcon} className={css.categoryButtonIcon} alt="familia" />
                Familiar
              </div>

              {/* <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=electrical')}
              >
                <img src={electricalIcon} className={css.categoryButtonIcon} />
                Eléctrico
              </div> */}

              {/* <div
                className={css.categoryButton}
                onClick={() => pushToPath('/s?pub_category=trucks')}
              >
                <img src={truckIcon} className={css.categoryButtonIcon} />
                Camiones
              </div> */}
            </Slider>
          </div>
          <div className={css.cardSliderSec}>
            <Slider {...settings}>
              {listings.slice(0, 5).map(l => {
                return (
                  <ListingCardTall
                    className={css.listingCard}
                    key={l.id.uuid}
                    listing={l}
                    renderSizes={cardRenderSizes()}
                    setActiveListing={() => {}}
                  />
                );
              })}
            </Slider>
          </div>
          <div className={css.mobileProductDetails}>
            <img src={tesla} className={css.teslaPic} alt="tesla" />
            {/* <div className={css.car_details}>
              <div className={css.inner_padding}>
                <h4 className={css.modal_name}>Tesla Model Y</h4>
                <p className={css.price_details}>44.99 $USD</p>
              </div>
              <div className={css.buttons_details}>
                <div className={css.inner_padding}>
                  <button type="submit" className={css.primary_button}>
                    Réntalo
                  </button>
                  <p className={css.button_link}>
                    <a href="#"> Similares </a>
                  </p>
                </div>
              </div>
              <span className={css.whiteImgIndicator}>
                <svg width="118" height="22" viewBox="0 0 118 22">
                  <g id="Group_4191" data-name="Group 4191" transform="translate(-1324 -184)">
                    <line
                      id="Line_1311"
                      data-name="Line 1311"
                      x2="87"
                      transform="translate(1324.5 194.5)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeWidth="1"
                    />
                    <g id="Group_4190" data-name="Group 4190" transform="translate(59.215 5.215)">
                      <g
                        id="Ellipse_520"
                        data-name="Ellipse 520"
                        transform="translate(1361.785 179.785)"
                        fill="#f6f4f3"
                        stroke="#fff"
                        strokeWidth="1"
                      >
                        <circle cx="10" cy="10" r="10" stroke="none" />
                        <circle cx="10" cy="10" r="10.5" fill="none" />
                      </g>
                      <circle
                        id="Ellipse_521"
                        data-name="Ellipse 521"
                        cx="4"
                        cy="4"
                        r="4"
                        transform="translate(1367.785 185.785)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
              </span>
            </div> */}
          </div>
          <div className={css.sectionMap}>
            <Grid
              container
              item
              md={12}
              xs={12}
              alignItems="center"
              alignContent="center"
              justifyContent="center"
            >
              <h2 className={css.sectionTitle}>
                Encuentre y alquile <span>autos asequibles</span> listos para usar{' '}
                <span>cerca de ti</span>
              </h2>
              <p className={css.sectionSubTitle}>
                Tenemos las mejores opciones cerca de ti o donde quiera que vayas. Elije el área más
                conveniente del mapa y el automóvil que más te guste. Nosotros haremos el resto.
              </p>
              <div className={css.mapWrapper2}>
                <SearchMap
                  reusableContainerClassName={css.map}
                  location={location}
                  listings={listings || []}
                />
              </div>
              <div className={css.upperMap}>
                <ul className={css.tabList}>
                  <li className={css.tabContent}>
                    <p>Newyork</p>
                    <h4> La Romana</h4>
                  </li>
                  <li className={css.tabContent}>
                    <p>Newyork</p>
                    <h4> La Romana</h4>
                  </li>
                  <li className={css.tabContent}>
                    <p>Newyork</p>
                    <h4> La Romana</h4>
                  </li>
                  <li className={css.tabContent}>
                    <p>Newyork</p>
                    <h4> La Romana</h4>
                  </li>
                  <li className={css.tabContent}>
                    <p>Newyork</p>
                    <h4> La Romana</h4>
                  </li>
                  <li className={css.tabContent}>
                    <p>Newyork</p>
                    <h4> La Romana</h4>
                  </li>
                </ul>
              </div>
            </Grid>
          </div>

          <div className={css.hr}></div>
          <SectionLocations sliderSetting={settings} responsive={responsive} Slider={Slider} />
          <div className={css.hr}></div>

          <div className={css.listingCars}>
            <h2>Elige entre los mejores vehículos disponibles</h2>
            <div className={css.listing}>
              <Grid container item xs={12} md={12} justifyContent="center" alignItems="center">
                {' '}
                {listings.slice(0, 10).map(l => {
                  return (
                    <div className={css.listingWrapper}>
                      <ListingCardTall
                        className={css.listingCard}
                        key={l.id.uuid}
                        listing={l}
                        renderSizes={cardRenderSizes()}
                        setActiveListing={() => {}}
                      />
                    </div>
                  );
                })}
              </Grid>
            </div>
            <div className={css.mobileMultiSlider}>
              <Slider {...multiRowSlider}>
                {listings.slice(0, 10).map(l => {
                  return (
                    <ListingCardTall
                      className={css.listingCard}
                      key={l.id.uuid}
                      listing={l}
                      renderSizes={cardRenderSizes()}
                      setActiveListing={() => {}}
                    />
                  );
                })}
              </Slider>
            </div>
            <div className={css.buttonWrapper}>
              <button onClick={() => pushToPath('/s')} className={css.exploreButton}>
                Explorar todos
              </button>
            </div>
          </div>

          <SectionGif />
          <div className={css.fixedWidthContainer}>
            <SectionCars />
          </div>
          <SectionInsurance />
          <SectionHowItWorks />
          <SectionAccordion className={css.faqs} />
          <Modal
            {...props}
            isOpen={isOpen}
            onClose={() => {
              setOpen(false);
            }}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <div style={{ margin: '1rem' }}>
              {isOpen ? (
                <div className={css.vehicleRightSec}>
                  <img src={discountPromo} className={css.pic2} alt="discount-promo" />
                </div>
              ) : null}
            </div>
          </Modal>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};
const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, scrollingDisabled) => {
    dispatch(manageDisableScrolling(componentId, scrollingDisabled));
  },
});
export default compose(connect(null, mapDispatchToProps))(HomePage);
