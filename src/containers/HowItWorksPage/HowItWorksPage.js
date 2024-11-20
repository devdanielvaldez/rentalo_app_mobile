import React from 'react';
import { pushToPath } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import howToRentPic4 from '../HowToRentPage/howToRentPic4.png';

import editIcon from '../../assets/edit.png';
import calendarIcon from '../../assets/calendar.png';
import returnCarIcon from '../../assets/return-car.png';
import moneyIcon from '../../assets/money.png';
import rentCarIcon from '../../assets/rent-car.png';
import Box from '@mui/material/Box';

import css from './HowItWorksPage.module.css';
import SideNav from '../../components/SideNav/SideNav';
import './mui.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const HowItWorksPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const { currentUser } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector(state => state.Auth);


  const pageName = ['Cómo funciona'];
  // prettier-ignore
  return (

    <StaticPage
      title="Cómo Funciona Réntalo"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HowItWorksPage',
        description: 'Cómo funciona',
        name: 'Cómo funciona',
      }}
      description="Cómo Funciona Réntalo"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={isAuthenticated ? css.contentWrapper : css.noWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>Cómo funciona</p>
            </div>
            <div className={css.fixedWidthContainer}>
              <div className={css.howItWorks}>
                <div className={css.howItWorksLeft}>
                  <video src="https://video-analyzes.s3.amazonaws.com/WhatIsRentalo.mp4" controls className={css.pic1} />
                </div>
                <div className={css.howItWorksRight}>
                  <p className={css.text4}>Conoce <span className={css.orangeText}>cómo<br /> funciona</span> Réntalo</p>
                  <p className={css.text5}>
                    Réntalo® hace que sea simple y seguro alquilar auto de personas y empresas confiables. Mira cómo funciona ahora.
                  </p>
                  <div className={css.wrapper1}>
                    <button className={css.button2} onClick={() => pushToPath('/HowToRent')}>Cómo alquilar</button>
                    <NamedLink name="BecomeHostPage" className={css.link}>Cómo rentar</NamedLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={css.enjoyBenfits}>
            <div className={css.center}>
              <p>Disfruta de los beneficios de rentar en 5 sencillos pasos.</p>
            </div>
            <div className={css.fixedWidthContainer}>
              <div className={css.row}>
                <div className={css.block}>
                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={editIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='editar'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Registra tu auto</h4>
                      <p>
                        Añade la información imprescindible sobre tu coche para empezar a alquilarlo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classNames(css.block, css.block2)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="296.646"
                    height="172.309"
                    viewBox="0 0 296.646 172.309"
                  >
                    <path
                      id="Path_5411"
                      data-name="Path 5411"
                      d="M-17882.91-1362.2c108.223,58.225,91.994-62.3,168.916-10.908s105.1,33.488,134.7,16.248"
                      transform="translate(-16497.416 6344.612) rotate(155)"
                      fill="none"
                      stroke="#a2a2a2"
                      strokeLinecap="round"
                      strokeWidth="1"
                      stroke-dasharray="7"
                    />
                  </svg>

                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={rentCarIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='alquilar coche'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Alquila tu coche</h4>
                      <p>Realiza la vuelta de inspección y firma el contrato de alquiler en tu smartphone junto al conductor.</p>
                    </div>
                  </div>
                </div>
                <div className={classNames(css.block, css.block2)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="296.646"
                    height="172.309"
                    viewBox="0 0 296.646 172.309"
                  >
                    <path
                      id="Path_5411"
                      data-name="Path 5411"
                      d="M-17882.91-1362.2c108.223,58.225,91.994-62.3,168.916-10.908s105.1,33.488,134.7,16.248"
                      transform="translate(-16497.416 6344.612) rotate(155)"
                      fill="none"
                      stroke="#a2a2a2"
                      strokeLinecap="round"
                      strokeWidth="1"
                      stroke-dasharray="7"
                    />
                  </svg>

                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={moneyIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='dinero'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Recibe tus pagos</h4>
                      <p>
                        Recibirá una transferencia bancaria que incluye la compensación por combustible si corresponde.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames(css.row, css.row2)}>
                <div className={classNames(css.block, css.block3)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="179.227"
                    height="90.698"
                    viewBox="0 0 179.227 90.698"
                  >
                    <path
                      id="Path_5408"
                      data-name="Path 5408"
                      d="M-17933.559-1455.393s40.48,100.534,178.035,88.516"
                      transform="translate(17934.209 1456.043)"
                      fill="none"
                      stroke="#a2a2a2"
                      strokeLinecap="round"
                      strokeWidth="1"
                      stroke-dasharray="7"
                    />
                  </svg>

                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        resize: 'none',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={calendarIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '26px',
                          height: '26px',
                          resize: 'none',
                        }}
                        alt='calendario'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Recibe solicitudes de reserva</h4>
                      <p>Acepta o declina solicitudes. Confirme la hora y el lugar de inicio del alquiler con el conductor.</p>
                    </div>
                  </div>
                </div>

                <div className={classNames(css.block, css.block4)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="179.227"
                    height="90.698"
                    viewBox="0 0 179.227 90.698"
                  >
                    <path
                      id="Path_5629"
                      data-name="Path 5629"
                      d="M-17933.559-1455.393s40.48,100.534,178.035,88.516"
                      transform="translate(17934.209 1456.043)"
                      fill="none"
                      stroke="#a2a2a2"
                      strokeLinecap="round"
                      strokeWidth="1"
                      stroke-dasharray="7"
                    />
                  </svg>

                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={editIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Escribe una reseña para tu conductor</h4>
                      <p>
                        ¡Escriba algunas palabras amables sobre tu conductor para que el próximo propietario conozca su experiencia!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.enjoyBenfitsInner}>
              <div className={css.row}>
                <div className={css.block}>
                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={editIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Registra tu auto</h4>
                      <p>
                        Añade la información imprescindible sobre tu coche para empezar a alquilarlo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.block}>
                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        resize: 'none',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={calendarIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '26px',
                          height: '26px',
                          resize: 'none',
                        }}
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Recibe solicitudes de reserva</h4>
                      <p>Acepta o declina solicitudes. Confirme la hora y el lugar de inicio del alquiler con el conductor.</p>
                    </div>
                  </div>
                </div>
                <div className={css.block}>
                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={rentCarIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Alquila tu coche</h4>
                      <p>Realiza la vuelta de inspección y firma el contrato de alquiler en tu smartphone junto al conductor.</p>
                    </div>
                  </div>
                </div>
                <div className={css.block}>
                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={editIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Escribe una reseña para tu conductor</h4>
                      <p>
                        ¡Escriba algunas palabras amables sobre tu conductor para que el próximo propietario conozca su experiencia!
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.block}>
                  <div className={css.blockContent}>
                    <Box
                      sx={{
                        background: '#ffffff 0% 0% no-repeat padding-box',
                        border: '1px solid #c0c0c0',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      className={css.roundWrapper}
                    >
                      <img
                        src={moneyIcon}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Recibe tus pagos</h4>
                      <p>
                        Recibirá una transferencia bancaria que incluye la compensación por combustible si corresponde.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css.serveVehicle}>
            <p className={css.title123}>Reservar un vehículo</p>

            <div className={css.row}>
              <div className={css.block}>
                <div className={css.blockContent}>
                  <div className={css.box}>
                    <Box className={css.bookVehicle} sx={{ background: '#AB47BC1A 0% 0% no-repeat padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '70px', height: '70px' }}>
                      <img src={editIcon} alt="edit Icon" />
                    </Box>
                    <p className={css.boxTitle}>Encuentra un vehículo en Réntalo</p>
                    <p className={css.boxText}>
                      Filtra por tipo de automóvil, precio y otras características que puedas necesitar.
                    </p>
                  </div>
                </div>
              </div>
              <div className={css.block}>
                <div className={css.blockContent}>
                  <div className={css.box}>
                    <Box className={css.bookVehicle} sx={{ background: '#42A5F51A 0% 0% no-repeat padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '70px', height: '70px' }}>
                      <img src={calendarIcon} alt="calendar Icon" />
                    </Box>
                    <p className={css.boxTitle}>Reserva tu vehículo</p>
                    <p className={css.boxText}>
                      Envía solicitudes de alquiler a los propietarios, estos aceptarán.
                    </p>
                  </div>
                </div>
              </div>
              <div className={css.block}>
                <div className={css.blockContent}>
                  <div className={css.box}>
                    <Box className={css.bookVehicle} sx={{ background: '#7E57C21A 0% 0% no-repeat padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '70px', height: '70px' }}>
                      <img src={rentCarIcon} alt="Rent Car" />
                    </Box>
                    <p className={css.boxTitle}>Recoge el coche</p>
                    <p className={css.boxText}>
                      Reúnete con el propietario, realiza la vuelta de inspección y recibe las llaves. Ambos firmarán el contrato digitalmente.
                    </p>
                  </div>
                </div>
              </div>
              <div className={css.block}>
                <div className={css.blockContent}>
                  <div className={css.box}>
                    <Box className={css.bookVehicle} sx={{ background: '#26A69A1A 0% 0% no-repeat padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '70px', height: '70px' }}>
                      <img src={returnCarIcon} alt="Return Car" />
                    </Box>
                    <p className={css.boxTitle}>Devuelve el coche</p>
                    <p className={css.boxText}>
                      Una vez terminado, devuelva el vehículo a la ubicación deseada
                    </p>
                  </div>
                </div>
              </div>
              <div className={css.block}>
                <div className={css.blockContent}>
                  <div className={css.box}>
                    <Box className={css.bookVehicle} sx={{ background: '#D2C9491A 0% 0% no-repeat padding-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '70px', height: '70px' }}>
                      <img src={editIcon} alt="Edit icon" />
                    </Box>
                    <p className={css.boxTitle}>Escribe una reseña acerca de tu experiencia</p>
                    <p className={css.boxText}>
                      Y contribuye a nuestra comunidad basada en la confianza.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={css.box2}>
            <div className={css.row2}>
              <div className={css.rowLeft}>
                <p className={css.text11}>¿Listo para unirte a Réntalo?</p>
                <p className={css.text12}>Alquila un vehículo para hacer turismo o alquila tu propio vehículo para rentabilizarlo.</p>
              </div>
              <div className={css.column2}>
                <button className={css.button6} onClick={() => pushToPath('/s')}>
                  Encontrar vehículo
                </button>
                <NamedLink name="NewListingPage">
                  <button className={css.button7}>
                    Rentar mi vehículo
                  </button>
                </NamedLink>
              </div>
            </div>
          </div>
          <div className={css.faqSection}>
            <div className={css.faqLeft}>
              <p className={css.text1}>Relájate, el vehículo está asegurado durante todo el viaje por nuestro socio de seguros de confianza.</p>
              <p className={css.mobileText1}>Relájate, el vehículo está asegurado</p>

              <p className={css.text2}>Réntalo se ha asociado con una de las compañías de seguros más confiables de América Latina.</p>
              <NamedLink name="InsurancePage">
                <a className={css.link2}>Más información <svg width="14px" height="15px" viewBox="0 0 14.62 15.242"><g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)"><path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#42a5f5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#42a5f5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></g></svg></a>
              </NamedLink>
            </div>
            <div className={css.faqRight}>
              <img src={howToRentPic4} className={css.pic5} alt='Cómo alquilar' />
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

export default HowItWorksPage;
