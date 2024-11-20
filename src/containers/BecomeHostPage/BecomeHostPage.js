import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  IconCollection,
} from '../../components';
import css from './BecomeHostPage.module.css';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import testimonial1 from './testimonialPic1.png';
import SideNav from '../../components/SideNav/SideNav';
import testimonial2 from './testimonialPic2.png';
import testimonial3 from './testimonialPic3.png';
import quote from './Icon awesome-quote-right.svg';
import SectionInsurance from './SectionInsurance';
import car from './car.png';
import smartphone from './smartphone.png';
import SectionAccordion from '../../components/SectionAccordion/SectionAccordion';
import FieldForm from '../../components/FieldForm/FieldForm';
import incrementar from './incrementar-1.png';
import carHand from './carhand.png';
import approved from './approved.png';
import money from './money.png';

import editIcon from '../../assets/edit.png';
import rentCarIcon from '../../assets/rent-car.png';
import moneyIcon from '../../assets/money.png';
import calendarIcon from '../../assets/calendar.png';

import './mui.css';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { accountIsVerified } from '../../util/verificationSteps';

const BecomeHostPage = () => {
  const pageName = ['Ser propietario'];
  // prettier-ignore

  const isWindowDefined = typeof window !== 'undefined';
  const isMobileLayout = isWindowDefined && window.innerWidth < 768;

  const { currentUser } = useSelector(state => state.user);

  return (
    <StaticPage
      title="¿Por Qué Alquilar con Réntalo?"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'BecomeHostPage',
        description: 'Ser un propietario',
        name: 'Ser un propietario',
      }}
      description="¿Por Qué Alquilar con Réntalo?"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper}>
            <Grid
              container
              xs={12}
              md={12}
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              sx={{ marginBottom: '30px' }}
              spacing={2}
              className={css.gridContainer}
            >
              <div className={css.mobileTextWrapper}>
                <div className={css.mobile}>
                  <p className={css.mobileText}>Ser propietario</p>
                </div>
              </div>
              <Grid item xs={12} md={5} className={css.becomeHost}>
                <h2>¡Que tu vehículo trabaje por tí!</h2>
                <p style={{ textAlign: 'justify' }}>
                  ¿Quieres ganar un poco de dinero extra? Introduce los datos de tu coche para ver
                  lo que ganan los propietarios de vehículos similares.
                </p>
              </Grid>
              <Grid item xs={12} md={7} className={css.becomeHostForm}>
                <FieldForm />
              </Grid>
            </Grid>

            <Grid
              container
              xs={12}
              md={12}
              alignItems="center"
              justifyContent="center"
              className={css.shareContainer}
            >
              <div className={css.IconShareSection1}>
                <IconCollection brand="ICON_BECOMEHOSTPAGE" />
              </div>
              <div className={css.IconShareSection2}>
                <IconCollection brand="ICON_BECOMEHOSTPAGE2" />
              </div>
              <div className={css.IconShareSection3}>
                <IconCollection brand="ICON_BECOMEHOSTPAGE3" />
              </div>
              <Grid container item xs={12} md={8} className={css.shareRentaloContentMain}>
                <Box
                  sx={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #0000000A',
                    borderRadius: '30px',
                    zIndex: '2',
                  }}
                  className={css.compartirRentalo}
                >
                  <div className={css.text}>
                    <h1>¿Por qué rentar con Réntalo?</h1>
                    <p className={css.subtitle1}>
                      Réntalo te ofrece tecnología y recursos para ayudarte a tener éxito, tanto si
                      quieres empezar un negocio como si actualmente gestionas tu propio negocio de
                      renta de vehículos.
                    </p>
                  </div>

                  <Grid
                    container
                    item
                    xs={12}
                    md={12}
                    alignContent="center"
                    justifyContent="center"
                    spacing={3}
                    className={css.shareRentaloContent}
                  >
                    <Grid container item xs={12} className={css.shareContentRow}>
                      <Grid container item xs={6}>
                        <div className={css.seguro}>
                          <img src={carHand} style={{ width: '33px', height: '38px' }} alt='coche' />
                        </div>
                        <p style={{ paddingLeft: '10px' }}>
                          Es sencillo y seguro
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                      </Grid>
                      <Grid container item xs={6}>
                        <div className={css.money}>
                          <img src={money} style={{ width: '33px', height: '38px' }} alt='dinero' />
                        </div>
                        <p style={{ paddingLeft: '10px' }}>Tu decides el precio de alquiler</p>
                      </Grid>
                    </Grid>

                    <Grid container item xs={12} className={css.shareContentRow}>
                      <Grid container item xs={6}>
                        <div className={css.check}>
                          <img src={approved} style={{ width: '33px', height: '38px' }} alt='aprobado' />
                        </div>
                        <p style={{ paddingLeft: '10px' }}>Tus propias normas de alquiler</p>
                      </Grid>
                      <Grid container item xs={6}>
                        <div className={css.exchange}>
                          <img src={incrementar} width="33px" height="38px" />
                        </div>
                        <p style={{ paddingLeft: '10px' }}>Sin gasto de registro ni cuotas&nbsp;</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid container item xs={12} md={9} className={css.shareBg}>
                <Box
                  sx={{
                    background: '#14213D',
                    width: '1086px',
                    height: '250px',
                    marginTop: '-200px',
                    borderRadius: '30px',
                  }}
                >
                  .
                </Box>
              </Grid>
            </Grid>
            {/* <Testimonials /> */}
            <div className={classNames(css.text, css.textMobile)}>
              <p className={css.pTag}>
                Sin cuotas de inscripción ni cuotas mensuales. Con Réntalo, rentar tu coche
                es sencillo y seguro. Usted decide el precio del alquiler, las reglas específicas y
                cuándo estará disponible.
              </p>
            </div>

            <Grid
              container
              item
              xs={12}
              spacing={5}
              justifyContent="center"
              className={css.videoContainer}
            >
              <Grid container item xs={12} md={6} className={css.videoContainerRow}>
                {/* <img src={howItWorksPic1} className={css.pic1} /> */}
                <video src="https://video-analyzes.s3.amazonaws.com/BecomeAHost.mp4" controls className={css.pic1} />
              </Grid>
              <Grid
                container
                item
                xs={11}
                md={5}
                sx={{ alignContent: 'center' }}
                className={css.videoContainerRight}
              >
                <p className={css.text4}>
                  Conoce cómo hacerte <span style={{ color: '#FF7900' }}>propietario</span> en Réntalo
                </p>
                <p className={css.text5}>
                  Réntalo® hace que sea sencillo y seguro rentar tu coche a ciudadanos y turistas de todo el mundo. Mira
                  nuestro breve vídeo de cómo funciona.
                </p>
                <div className={css.wrapper1}>
                    <NamedLink
                      className={css.button2}
                      name={!accountIsVerified(currentUser) ? 'VerificationPage' : 'NewListingPage'}
                      params={!accountIsVerified(currentUser) ? {tab: 'host'} : {}}
                    >
                    Hacerme propietario
                  </NamedLink>

                  {/*<button className={css.button2} onClick={redirectHostUrl}>*/}
                  {/*  Hacerme propietario*/}
                  {/*</button>*/}
                </div>
              </Grid>
            </Grid>
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
                          alt='editar'
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
                          alt='calendario'
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
                          alt='alquilar coche'
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
                          alt='editar'
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
              </div>
            </div>

            <div className={css.section2}>
              <h1 className={css.titleWithPic}>Conoce a los que ganan dinero con Réntalo</h1>
              <p className={css.subtitle}>
                Réntalo es una plataforma dedicada a apoyar a sus propietarios en la gestión de
                <br /> sus negocios de alquiler de vehículos.&nbsp;
                <span className={css.link}>
                  <NamedLink name="TestimoniosPage">Conoce que dicen de nosotros.</NamedLink>
                </span>
              </p>
              {/* <Testimonials /> */}
              <div className={css.fixedWidthContainer}>
                <div className={css.testimonialSection}>
                  <div className={css.box}>
                    <div className={css.column}>
                      <div className={css.wrap}>
                        <div className={css.start}>
                          <img src={testimonial1} className={css.testimonial} alt='testimonial' />
                          <div>
                            <p className={css.name}>Sarah D.</p>
                            {/* <p className={css.subTitle}>Jeep Grand Cherokee Limited</p> */}
                          </div>
                        </div>
                        <img src={quote} className={css.quote} alt='presupuesto' />
                      </div>
                      <p className={css.text}>
                        He usado Réntalo varias veces y siempre he tenido una experiencia fantástica.
                        Es una forma económica y fácil de alquilar un automóvil de una persona local,
                        lo que significa que obtiene una experiencia más auténtica y una selección más
                        diversa de vehículos. ¡Recomiendo encarecidamente Réntalo a cualquiera que busque un
                        alquiler de automóviles diferente y emocionante!.
                      </p>
                    </div>
                  </div>
                  <div className={css.box}>
                    <div className={css.column}>
                      <div className={css.wrap}>
                        <div className={css.start}>
                          <img src={testimonial2} className={css.testimonial} alt='testimonial' />
                          <div>
                            <p className={css.name}>Francisco R.</p>
                            {/* <p className={css.subTitle}>Jeep Grand Cherokee Limited</p> */}
                          </div>
                        </div>
                        <img src={quote} className={css.quote} alt='presupuesto' />
                      </div>
                      <p className={css.text}>
                        Mi esposo y yo alquilamos un automóvil con Réntalo para un fin de semana largo y no
                        podríamos estar más contentos con la experiencia. El propietario del automóvil
                        fue muy amable y servicial, y el automóvil estaba en excelentes condiciones.
                        Fue una experiencia mucho más personal y agradable que alquilar a través de una
                        empresa tradicional de alquiler de automóviles. Definitivamente volveremos a
                        usar Réntalo en el futuro.{' '}
                      </p>
                    </div>
                  </div>
                  <div className={css.box}>
                    <div className={css.column}>
                      <div className={css.wrap}>
                        <div className={css.start}>
                          <img src={testimonial3} className={css.testimonial} alt='testimonial' />
                          <div>
                            <p className={css.name}>José S.</p>
                            {/* <p className={css.subTitle}>Jeep Grand Cherokee Limited</p> */}
                          </div>
                        </div>
                        <img src={quote} className={css.quote} alt='presupuesto' />
                      </div>
                      <p className={css.text}>
                        Réntalo ha cambiado completamente la forma en que viajo. Ahora siempre busco en Réntalo antes
                        de considerar una empresa de alquiler de automóviles tradicional. Me encanta poder elegir
                        entre una amplia variedad de vehículos y propietarios locales, y siempre he tenido una
                        experiencia positiva con el servicio al cliente. ¡Réntalo es lo mejor!.{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SectionInsurance className={css.sectionInsurance} />

            <div className={css.sectionRental}>
              <p className={css.title}>¿Estás listo para ser parte de la familia Réntalo?</p>
              <p className={css.subtitle2}>
                Réntalo ofrece tecnología y recursos para ayudarte a tener éxito.
              </p>
            </div>
            <div className={css.questionDiv}>
              <Box
                sx={{
                  background: '#FFFFFF 0% 0% no-repeat padding-box',
                  border: '1px solid #E5E5E5',
                  cursor: 'pointer',
                  borderRadius: '20px',
                }}
              >
                  <NamedLink
                    className={css.question}
                    name={!accountIsVerified(currentUser) ? 'VerificationPage' : 'NewListingPage'}
                    params={!accountIsVerified(currentUser) ? {tab: 'host'} : {}}
                  >
                  <img src={car} className={css.image1} alt='coche' />
                  <div>
                    <p className={css.question1}>Eres un individuo</p>
                    <p className={css.question2}>Posees uno o más vehículos que quieres rentar</p>
                  </div>
                </NamedLink>
              </Box>
              <Box
                sx={{
                  background: '#FFFFFF 0% 0% no-repeat padding-box',
                  border: '1px solid #E5E5E5',
                  cursor: 'pointer',
                  borderRadius: '20px',
                }}
              >
                <NamedLink
                  className={css.question}
                  name={!accountIsVerified(currentUser) ? 'VerificationPage' : 'NewListingPage'}
                  params={!accountIsVerified(currentUser) ? {tab: 'host'} : {}}
                >
                  <img src={smartphone} className={css.image1} alt='smartphone' />
                  <div>
                    <p className={css.question1}>Tienes una empresa</p>
                    <p className={css.question2}>
                      Puede ser de alquiler, un taller o un distribuidor
                    </p>
                  </div>
                </NamedLink>
              </Box>
            </div>
            <div className={css.faqSect}>
              <SectionAccordion isBecomeHost={true} />
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

export default BecomeHostPage;
