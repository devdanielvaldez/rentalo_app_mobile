import React, { useState, useEffect } from 'react';
import { pushToPath } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { NamedLink } from '../../components';
import Grid from '@mui/material/Grid';
import css from './ReservationPage.module.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Box from '@mui/material/Box';

import SideNav from '../../components/SideNav/SideNav';

import cursor from './cursor.svg';
import car from './Enmascarar-grupo-41.png';
import aproba from './aproba.png';
import search from './search.png';
import reserva from './reserva.png';
import carAnime from './carAnime.png';
import reservationMobile from './reservation-mobile.png';
import ListingCardLong from '../../components/ListingCardLong/ListingCardLong';
import classNames from 'classnames';

const ReservationPage = () => {

  const sharetribeSdk = require('sharetribe-flex-sdk');
  const sdk = sharetribeSdk.createInstance({
    clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
  });
  const [listings, setListings] = useState([]);
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

  // const GreenSwitch = styled(Switch)(({ theme }) => ({
  //   '& .MuiSwitch-switchBase.Mui-checked': {
  //     color: green[600],
  //     '&:hover': {
  //       backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
  //     },
  //   },
  //   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
  //     backgroundColor: green[600],
  //   },
  // }));

  const pageName = ['Reserva instantánea'];

  return (
    <StaticPage
      title="Reserva instantánea"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ReservationPage',
        description: 'Reservation instant',
        name: 'Reservation page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>Reserva instantanea</p>
            </div>
            <div className={css.firstGrid}>
              <div className={css.reservationHeader}>
                <div className={css.reservationHeaderLeft}>
                  <div className={css.leftContent}>
                    <h2>Reserva instantáneamente con solo un click</h2>
                    <p>
                      ¡No más esperas para la aprobación! <br /> Obtenga sus reservas aceptadas de
                      inmediato con Reserva instantánea.
                    </p>
                    <div className={css.activateBookingAccount}>
                      <div className={css.toggleBtn}>
                        <label className={css.switch}>
                          <input type="checkbox" />
                          <span className={classNames(css.slider, css.round)}></span>
                        </label>
                        <span className={css.desktopToggleText}>
                          Activar reserva instantánea en mi cuenta
                        </span>
                        <span className={css.mobileToggleText}>Activar reserva instantánea</span>
                      </div>
                      <p
                        className={css.seeCars}
                        style={{ cursor: 'pointer' }}
                        onClick={() => pushToPath('/s?pub_instantBooking=yes')}
                      >
                        Ver autos con reserva instantánea <ArrowForwardIcon />{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.reservationHeaderRight}>
                  {/* <img src={car} className={css.mobilePic} /> */}
                  <img src={cursor} className={css.pic1} alt='cursor' />
                  <img src={car} className={css.pic2} alt='coche' />
                </div>
              </div>
            </div>
            <div className={css.secondGrid}>
              <div className={css.bookingServicesBlock}>
                <div className={css.serviceType}>
                  <div className={css.serviceTypeImg} style={{ background: '#00BFA52E' }}>
                    <img src={aproba} className={css.photo1} alt='aproba' />
                  </div>
                  <div className={css.serviceTypeInfo}>
                    <div className={css.texts}>
                      <h3>Aprobación instantánea</h3>
                      <p className={css.text}>
                        Los anuncios con reserva instantánea no requieren la aprobación del
                        propietario antes de que puedan reservarse.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.serviceType}>
                  <div className={css.serviceTypeImg} style={{ background: '#0091EA2E' }}>
                    <img src={reserva} className={css.photo1} alt='reserva' />
                  </div>
                  <div className={css.serviceTypeInfo}>
                    <div className={css.texts}>
                      <h3>Reserva con un clic</h3>
                      <p className={css.text}>
                        Los conductores pueden hacer una reserva directamente sin necesidad de hacer
                        una solicitud de reserva primero.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.serviceType}>
                  <div className={css.serviceTypeImg} style={{ background: '#304FFE2E' }}>
                    <img src={search} className={css.photo1} alt='buscar' />
                  </div>
                  <div className={css.serviceTypeInfo}>
                    <div className={css.texts}>
                      <h3>Búsqueda filtrada</h3>
                      <p className={css.text}>
                        Con la reserva instantánea, los conductores pueden filtrar su búsqueda para
                        ver solo los listados que tienen activada la reserva instantánea.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.importantNote}>
              <p className={css.center}>
                Existe un período de notificación predeterminado de 4 horas para las reservas
                instantáneas y no puede reservar en ningún momento entre las 12 a. m. y las 7 a. m.
                Esto garantiza que los propietarios tengan tiempo suficiente para preparar su
                automóvil para sus reservas instantáneas. Los propietarios pueden optar por cambiar
                este período de aviso predeterminado.
              </p>
            </div>
            <div className={css.exploreVehicleSec}>
              <h2>Explora vehículos con reserva instantánea</h2>
              <div className={css.listing}>
                <Grid container item xs={12} md={12} justifyContent="center" alignItems="center">
                  {' '}
                  {listings.slice(0, 3).map(l => {
                    return (
                      <div className={css.listingWrapper}>
                        <ListingCardLong
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
            </div>
          </div>
          <div className={css.lastGrid}>
            <Grid
              container
              item
              xs={12}
              // columnSpacing={4}
              alignItems="center"
              sx={{ background: '#F8F9F9 0% 0% no-repeat padding-box' }}
            >
              <Grid
                className={css.leftContentImg}
                item
                xs={12}
                lg={3}
                style={{ textAlign: 'center' }}
              >
                <img src={carAnime} className={css.lastpic} alt='coche' />
                <img src={reservationMobile} className={css.mobilepic} alt='reserva' />
              </Grid>
              <Grid className={css.leftContentSec} item xs={12} lg={4}>
                <h2>Beneficios de la Reserva Instantánea para propietarios</h2>
                <p>
                  Si tienes activada la reserva instantánea, se aplicará a todas las fechas
                  disponibles en tu calendario. Actualiza tu calendario regularmente para maximizar
                  sus reservas y ganancias.
                  <br /> <br /> Recomendamos encarecidamente a nuestros propietarios que activen la
                  reserva instantánea en sus listados para obtener los siguientes beneficios:
                </p>
                <NamedLink name="PrivacyPolicyPage">
                  Obtenga más información sobre las políticas de reserva instantánea{' '}
                  <ArrowForwardIcon />
                </NamedLink>
              </Grid>
              <Grid className={css.benefitsBlock} item xs={12} lg={4}>
                <Box
                  sx={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '15px',
                    marginTop: '-25px',
                  }}
                >
                  <div className={css.boxText}>
                    <h4>Reservas más rápidas</h4>
                    <p>Recibirás reservas sin tener que aceptar solicitudes previamente.</p>
                  </div>
                </Box>
                <Box
                  sx={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '15px',
                    marginTop: '15px',
                    marginBottom: '15px',
                  }}
                >
                  <div className={css.boxText}>
                    <h4>Mayores ingresos</h4>
                    <p>
                      Obtendrá más ingresos con tu automóvil al activar la reserva instantánea. Los
                      conductores prefieren los listados que pueden reservar instantáneamente, ya que
                      esto les permite hacer planes confirmados.
                    </p>
                  </div>
                </Box>
                <Box
                  sx={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '15px',
                    marginBottom: '-25px',
                  }}
                >
                  <div className={css.boxText}>
                    <h4>Ubicación de búsqueda</h4>
                    <p>
                      Los listados con la reserva instantánea activada tienen prioridad en la
                      ubicación de búsqueda.
                    </p>
                  </div>
                </Box>
              </Grid>
              <div className={css.mobileBenefits}>
                <div
                  className={css.boxText}
                  style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '15px',
                  }}
                >
                  <h4>Reservas más rápidas</h4>
                  <p>Recibirás reservas sin tener que aceptar solicitudes previamente.</p>
                </div>
                <div
                  className={css.boxText}
                  style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '15px',
                  }}
                >
                  <h4>Ubicación de búsqueda</h4>
                  <p>
                    Los listados con la reserva instantánea activada tienen prioridad en la
                    ubicación de búsqueda.
                  </p>
                </div>
                <div
                  className={css.boxText}
                  style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '15px',
                  }}
                >
                  <h4>Mayores ingresos</h4>
                  <p>
                    Obtendrá más ingresos con tu automóvil al activar la reserva instantánea. Los
                    conductores prefieren los listados que pueden reservar instantáneamente, ya que
                    esto les permite hacer planes confirmados.
                  </p>
                </div>
              </div>
            </Grid>
            <div className={css.mobileLink}>
              <NamedLink name="PrivacyPolicyPage">
                Obtenga más información sobre las políticas de reserva instantánea{' '}
                <ArrowForwardIcon />
              </NamedLink>
            </div>
            <div className={css.addVehicleSec}>
              <div className={css.fixedWidthContainer}>
                <p>
                  Si tienes activada la reserva instantánea, se aplicará a todas las fechas
                  disponibles en tu calendario. Actualiza tu calendario regularmente para maximizar
                  sus reservas y ganancias.
                </p>
                <NamedLink name="NewListingPage">
                  <button className={css.button}>Agrega tu auto</button>
                </NamedLink>
              </div>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ReservationPage;
