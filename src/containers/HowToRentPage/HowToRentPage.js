import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import css from './HowToRentPage.module.css';
import howToRentPic1 from './howToRentPic1.png';
import howToRentPicMobile from './howToRentPicMobile.png';

import howToRentPic4 from './howToRentPic4.png';

import SideNav from '../../components/SideNav/SideNav';
import patternImg from './pattern.png';
import patternImg2 from './pattern2.png';
import patternImg3 from './pattern3.png';
import SectionAccordion from '../../components/SectionAccordion/SectionAccordion';

import classNames from 'classnames';
import { useSelector } from 'react-redux';

const HowToRentPage = () => {
  const { isAuthenticated } = useSelector(state => state.Auth);

  const isWindowDefined = typeof window !== 'undefined';
  const isMobileLayout = isWindowDefined && window.innerWidth < 768;
  const { currentUser } = useSelector(state => state.user);

  const pageName = ['Cómo alquilar'];
  // prettier-ignore
  return (
    <StaticPage
      title="Acceso Fácil a vehículos Cercanos"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HowToRentPage',
        description: 'Cómo alquilar',
        name: 'Cómo alquilar',
      }}
      description="Acceso Fácil a vehículos Cercanos"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={isAuthenticated ? css.howToRentWrapper : css.noWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>Cómo alquilar</p>
            </div>
            <div class={css.rentCarSection}>
              <div class={css.rentCarLeft}>
                <div className={css.content}>
                  <p className={css.text1}>¿Cómo alquilo un coche con Réntalo?</p>
                  <p className={css.text2}>

                    Con Réntalo, reservar un coche desde el móvil e iniciar tu viaje es más fácil que nunca.

                    <br /><br />

                    Como somos una comunidad basada en la confianza, pedimos a todos nuestros usuarios que completen y verifiquen su perfil antes de realizar una solicitud de reserva. De esta manera, el propietario sabrá un poco sobre ti cuando confirme tu solicitud de reserva.

                    <br /><br />

                    El viaje estará asegurado con nuestra póliza de Seguros SURA para tranquilidad del propietario y del conductor.

                  </p>
                  <a href='/s' className={css.button1}>Encuentra un auto
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242">
                      <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)">
                        <path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </a>
                  {/* <NamedLink name="SearchPage"><button className={css.button1}>Encuentra un auto <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242"><g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)"><path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></g></svg></button></NamedLink>   */}
                </div>
                <img className={css.patternImg} src={patternImg} alt="patternImg" />
              </div>
              <div class={classNames(css.rentCarRight, css.rightContent)}>
                <img src={howToRentPicMobile} className={css.mobileImg} alt='cómo alquilar' />
                <img src={howToRentPic1} className={css.desktopImg} alt='cómo alquilar' />
              </div>
            </div>
            <div class={classNames(css.rentCarSection, css.learnRentCarSection)}>
              <div class={classNames(css.rentCarRight, css.leftContent)}>
                <video src="https://video-analyzes.s3.amazonaws.com/HowToRent.mp4" controls className={css.pic1} />
              </div>
              <div class={css.rentCarLeft}>
                <p className={css.text4}>Conoce cómo <span className={css.orangeText}>alquilar</span> un auto en Réntalo</p>
                <p className={css.text5}>
                  Réntalo hace que sea simple y seguro alquilar auto de personas y empresas confiables. Mire nuestro breve video de cómo funciona.
                </p>
                <div className={css.wrapper1}>
                  <a href='/s' className={css.button1}>Buscar un auto
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242">
                      <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)">
                        <path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </a>
                  {/*
                <NamedLink name="BecomeHostPage"><button className={css.button2}>Buscar un auto</button></NamedLink> */}
                </div>
              </div>
            </div>
          </div>

          <div className={css.descriptionSec}>
            <div className={css.fixedWidthContainer}>
              <h1>Accede fácilmente a los coches cercanos</h1>
              <div className={css.boxContainer}>
                <div className={css.box}>
                  <span className={css.boxCount}>1</span>
                  <h2>Descubre autos cerca de tí</h2>
                  <p>Navega a través de una gran variedad de autos cercanos. Cuando busques un automóvil, asegúrate de
                    incluir las fechas, el precio, las características, entre otros aspectos, que prefiera para obtener el ajuste más preciso.</p>
                </div>
                <div className={css.box}>
                  <span className={css.boxCount}>2</span>
                  <h2>Hacer una solicitud de reserva</h2>
                  <p>Al reservar por primera vez, se le pedirá que comparta sus datos, como: licencia de conducir, identificación/pasaporte. Esto se hará una sola vez.
                    Se le notificará acerca del resultado de su solicitud de reserva dentro de unas horas.</p>
                </div>
                <div className={css.box}>
                  <span className={css.boxCount}>3</span>
                  <h2>Recoger el coche y conducir</h2>
                  <p>Asegúrate de llevar siempre contigo tu permiso de conducir y la tarjeta de crédito que utilizaste al punto de recogida acordado. Haz la vuelta de inspección y
                    firma el contrato de alquiler con el conductor y disfruta de tu viaje.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={css.rentalBestOptionSec}>
            <div className={css.rentalLeftOption}>
              <img className={css.patternLeft} src={patternImg3} alt="pattern" />
              <p className={css.text6}>¿Por qué <span className={css.orange}>Réntalo® es tu mejor opción</span> para alquiler de coches?</p>
              <p className={css.text7}>
                ¿Tienes una pregunta? Siempre puedes enviar un mensaje directo al propietario.
              </p>
              {/* <a  className={css.button32} href={!isMobileLayout ? "https://wa.me/18295099334?text=Estoy%20interesado%20en%20Réntalo" : " https://api.whatsapp.com/send?phone=+18295099334"}
                    target='_blank'
                  >Conversemos <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242"><g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)"><path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg>
                  </a> */}
              <img className={css.patternRight} src={patternImg2} alt="pattern" />
              <span className={css.pointerImg}><svg xmlns="http://www.w3.org/2000/svg" width="107.695" height="437.336" viewBox="0 0 107.695 437.336">
                <g id="Group_5155" data-name="Group 5155" transform="translate(-929.192 -1986.803)">
                  <path id="Path_5816" data-name="Path 5816" d="M12089.26-15818.859s38.655,4.405,54.627-22.027-13.216-61.9,0-87.227,52.864-14.1,52.864-14.1" transform="translate(-11160 17932)" fill="none" stroke="#c2c2c2" strokeWidth="1" stroke-dasharray="5" />
                  <path id="Path_5818" data-name="Path 5818" d="M12089.26-15944.418s38.655-4.405,54.627,22.027-13.216,61.9,0,87.227,52.864,14.1,52.864,14.1" transform="translate(-11160 18083.988)" fill="none" stroke="#c2c2c2" strokeWidth="1" stroke-dasharray="5" />
                  <path id="Path_5819" data-name="Path 5819" d="M12089.26-15944.084s33.116-4.5,39.894,25.222c-6.777,74.031-36.494,84.458,44.314,114.175,47.964,29.2-15.641,73.51-13.555,105.313,4.692,33.888,36.838,27.768,36.838,27.768" transform="translate(-11160 18094.693)" fill="none" stroke="#c2c2c2" strokeWidth="1" stroke-dasharray="5" />
                  <path id="Path_5817" data-name="Path 5817" d="M12089.26-15805.644h107.491" transform="translate(-11160 17932)" fill="none" stroke="#c2c2c2" strokeWidth="1" stroke-dasharray="5" />
                </g>
              </svg>
              </span>
            </div>
            <div className={css.rentalRightOption}>
              <div className={css.box}>
                <h2>Precios asequibles y transparentes</h2>
                <p>El registro y la verificación son gratuitos. Solo cobramos una tarifa para brindarte una experiencia completamente segura, incluido el seguro.</p>
              </div>
              <div className={css.box}> <h2>Póliza de seguro para todos los viajes de Réntalo®</h2>
                <p>Estás cubierto por un seguro durante un viaje activo. Nuestra póliza
                  incluye cobertura integral, de colisión y de responsabilidad civil. Comienza desde que recoges el automóvil, hasta el momento en que los devuelves.</p>
              </div>
              <div className={css.box}> <h2>Asistencia en carretera 24/7</h2>
                <p>Nuestro servicio de asistencia en carretera cubre el remolque del coche y
                  tu transporte al taller en caso de accidente o avería.</p>
              </div>
              <div className={css.box}> <h2>Atención al cliente</h2>
                <p>Para cada viaje, los conductores tienen acceso a asistencia al cliente las 24 horas, los 7 días de la semana durante el período de alquiler. ¡Danos un toque y estaremos encantados de sostener una conversación!</p>
              </div>
            </div>
            <div className={css.mobileContent}>
              <h2>¿Aun tienes una pregunta?</h2>
              <p>Siempre puedes enviar un mensaje directo al anfitrión.</p>
              <button className={css.button5}>Conversemos <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242"><g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)"><path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></g></svg></button>
            </div>
          </div>

          <div className={css.faqSection}>
            <div className={css.fixedWidthContainer}>
              <div className={css.faqLeft}>
                <p className={css.text1}>Su seguridad es nuestra prioridad</p>
                <p className={css.text2}>Réntalo se ha asociado con una de las compañías de seguros más confiables de América Latina.</p>
                <NamedLink className={css.link2} name="PrivacyPolicyPage">Nuestra póliza de seguros <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242"><g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)"><path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#42a5f5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#42a5f5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></g></svg></NamedLink>
              </div>
              <div className={css.faqRight}>
                <img src={howToRentPic4} className={css.pic5} alt='cómo alquilar' />
              </div>
            </div>
          </div>

          <div className={css.readyToJoin}>
            <div className={css.box2}>
              <div className={css.row2}>
                <div className={css.column1}>
                  <p className={css.text11}>¿Listo para unirte a Réntalo?</p>
                  <p className={css.text12}>Alquila un vehículo para hacer turismo o alquila tu propio vehículo para rentabilizarlo.</p>
                </div>
                <div className={css.column2}>
                  <NamedLink className={css.button6} name='SearchPage'>
                    Encontrar vehículo
                  </NamedLink>


                  <button className={css.button7}>
                    Rentar mi vehículo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={css.commercialVehicles}>
            <div className={css.commercialVehiclesContent}>
              <div className={css.left}>
                <p>¿Vehículos comerciales? <span>Escríbenos por WhatsApp o envíanos un correo electrónico a <a href="mailto:soporte@rentaloinc.com">soporte@rentaloinc.com</a> </span></p>
              </div>
              <div className={css.mobileContent}>
                <h2>¿Vehículos comerciales?</h2>
                <p>Escríbenos por WhatsApp o envíanos un correo electrónico a  <a href="mailto:soporte@rentaloinc.com">soporte@rentaloinc.com</a></p>

              </div>
            </div>
          </div>
          <div className={css.haveQuestions}>
            <div className={css.fixedWidthContainer}>
              <SectionAccordion />
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

export default HowToRentPage;
