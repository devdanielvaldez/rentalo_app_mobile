import React from 'react';
import Box from '@mui/material/Box';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './InsurancePage.module.css';
import sura from './sura.png';
import animeCar from './animeCar.png';
import pic from './pic.png';
import portret from './portret.png';
import SideNav from '../../components/SideNav/SideNav';
import schedule from './schedule.png';
import agenda from './agenda.png';
import guy from './guy.png';
import adobe from './Adobe.jpg';

import './mui.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import config from '../../config';

const InsurancePage = () => {
  const { currentUser } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector(state => state.Auth);

  const pageName = ['Confianza y seguridad'];
  // prettier-ignore
  return (
    <StaticPage
      title="Pólizas de Seguro"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'InsurancePage',
        description: 'Insurance',
        name: 'Insurance page',
      }}
      description="Pólizas de Seguro"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser} />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.mobile}>
            <p className={css.mobileText}>Confianza y seguridad</p>
          </div>
          <div className={isAuthenticated ? css.contentWrapper: css.noWrapper}>
            <div className={css.insuranceHead}>
              <div className={css.insuranceHeadLeft}>
                <div className={css.box}>
                  <div className={css.sura}>
                    <img src={sura} className={css.suraMobile} alt='sura'/>
                  </div>
                  <div className={css.text}>
                    <h3 className={css.title11}>Su seguridad es nuestra prioridad</h3>
                    <p className={css.textMobile}>Réntalo se ha asociado con una de las compañías de seguros más confiables de América Latina.</p>
                  </div>
                  <div className={css.sura}>
                    <img src={sura} className={css.suraLogo} alt='sura'/>
                  </div>
                </div>
              </div>
              <div className={css.insuranceHeadRight}>
                <img src={adobe} className={css.photo} alt='adobe' />
              </div>
            </div>
          </div>
          <div className={css.suraInsurance}>
            <p className={css.title123}>Junto con Seguros SURA estamos ahí para ti.</p>
            <div className={css.suraCards}>
              <div className={css.card}>
                  <p className={css.boxTitle}>Control de calidad y detección de fraude</p>
                  <p className={css.boxText}>
                  Estas herramientas, junto con nuestros estándares de alquiler, nos permiten seleccionar usuarios y coches de confianza.
                  </p>
              </div>
              <div className={css.card}>
                <p className={css.boxTitle}>Verificación de identidad, seguridad mejorada</p>
                <p className={css.boxText}>
                Réntalo hace que el coche sea más seguro para propietarios y conductores.
                </p>
              </div>
              <div className={css.card}>
                <p className={css.boxTitle}>Por cada reserva estás bien protegido</p>
                <p className={css.boxText}>
                Nuestro socio asegurador se encarga de protegerte, de esta manera tu riesgo se minimiza cuando rentas tu auto con nosotros.
                </p>
              </div>
            </div>
          </div>
          <div className={css.coveredSection}>
            <div className={css.coveredSectionLeft}>
              <h2 className={css.title}>Estás cubierto</h2>
              <p className={css.text1}>Estás cubierto con un seguro de responsabilidad civil de hasta $1,000,000 de pesos, y tu coche está protegido por contrato contra robos y daños físicos. También solicitamos un depósito de seguridad para gastos imprevistos y franquicias.
              <br /><br />
                En caso de accidente, el conductor debe pagar los gastos de reparación hasta el límite de la franquicia del seguro elegido. El seguro cubre la parte restante. </p>
              <div className={css.ourPolicy}>
                <p className={css.link}>

                  {/* <NamedLink name="PrivacyPolicyPage">Nuestra Póliza de seguro <img src={right} /></NamedLink>
                   */}

                    <a href={config.pdfPolicyInfo} target="_blank">
                    Nuestra Póliza de seguro
                    </a>
                  </p>

                  <a href={config.pdfPolicyInfo} className={css.mobileLink} target="_blank">
                    Nuestra Póliza de seguro
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242">
                      <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)">
                        <path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      </g>
                    </svg>
                  </a>



{/*
                <button className={css.mobileLink}>
                  <NamedLink name="PrivacyPolicyPage">Nuestra Póliza de seguro <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.62" height="15.242" viewBox="0 0 14.62 15.242"><g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(0.75 1.061)"><path id="Path_1" data-name="Path 1" d="M7.5,18H20.62" transform="translate(-7.5 -11.44)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path id="Path_2" data-name="Path 2" d="M18,7.5l6.56,6.56L18,20.62" transform="translate(-11.44 -7.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></g></svg></span>
                    </NamedLink>
                </button> */}


              </div>
            </div>
            <div className={css.coveredSectionRight}>
              <img src={animeCar} className={css.pic} alt='foto del coche' />
            </div>
          </div>

          <div className={css.notAloneSection}>
            <div className={css.fixedWidthContainer}>
              <div className={css.notAloneInner}>
                <div className={css.notAloneLeftSection}>
                  <img src={pic} className={css.pic2} alt='image' />
                </div>
                <div className={css.notAloneRightSection}>
                    <h3 className={css.rentalo}>En Réntalo®</h3>
                    <h2 className={css.title}>No estás solo</h2>
                    <p className={css.text1}>

                    Si eres un propietario y tienes un problema urgente, los agentes de Réntalo están disponibles para atender tu llamada las 24 horas del día, los 7 días de la semana.
                    <br /><br />
                    La seguridad de los conductores y propietarios de Réntalo es siempre una prioridad. Es por eso que los agentes están capacitados para responder a problemas como accidentes, artículos ilegales dejados en los automóviles, recuperación de automóviles y robo.

                    </p>
                </div>
              </div>
            </div>
          </div>

          <div className={css.verificationContainer}>
            <h2 className={css.title2}>Sólido sistema de verificación</h2>
            <p className={css.subTitle2}>Gracias al avanzado sistema de verificación de identidad, comprobamos los documentos de identidad y el permiso de conducir de los conductores antes de cualquier alquiler.</p>
          </div>

          <div className={classNames(css.fixedWidthContainer, css.trustedCommunityContainer)}>
            <div className={css.trustedCommunity}>
              <div className={css.trustedCommunityLeft}>
              <div className={css.contentBlock}>
              <h2 className={css.title3}>Comunidad confiable y verificada</h2>
              <p className={css.text1}>

              Nos aseguramos de que la verificación de los propietarios y sus publicaciones sean aprobada por nosotros. Además, aquí hay un sistema de revisión transparente que ayuda a construir una comunidad confiable.
                </p>

              </div>

              <div className={css.contentBlock}>
              <h2 className={css.title3}>Verificación de seguridad</h2>
              <p className={css.text1}>Cuando llegues al automóvil, la aplicación web de Réntalo lo guiará a través de un control básico de seguridad que incluye tomar fotografías del automóvil que se guardarán en nuestro sistema.</p>

            </div>
              <div className={css.contentBlock}>
                <h2 className={css.title3}>Asistencia en carretera disponible</h2>
              <p className={css.text1}>Ofrecemos asistencia en carretera 24/7 para accidentes o averías que puedan ocurrir durante un viaje activo como parte de nuestros planes de protección.</p>
            </div>
            </div>
              <div className={css.trustedCommunityRight}>
              <img src={portret} className={css.pic} alt='portal' />
              </div>
            </div>
          </div>
          <div className={css.enjoyBenfits}>
            <div className={css.center}>
              <p>Algunos consejos para una mejor experiencia</p>
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
                        src={guy}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='chico'
                      />
                    </Box>
                    <div className={css.text1}>
                    <h4>Lee sobre tu conductor</h4>
                      <p>Tómese unos minutos para aprender un poco sobre su conductor antes de conocerlo.</p>
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
                        src={schedule}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='programar'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Prioriza tu privacidad</h4>
                      <p>Nunca compartas su correo electrónico, domicilio o número de teléfono en línea. Mantenemos sus datos de contacto privados y solo los revelamos una vez que se reserva un viaje.</p>
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
                        src={agenda}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                          resize: 'none',
                        }}
                        alt='agenda'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Revisa y califica</h4>
                      <p>Ayude a otros miembros a tomar decisiones informadas revisando y calificando a los propietarios y conductores de automóviles después de cada viaje.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.mobileContent}>
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
                        src={guy}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='chico'
                      />
                    </Box>
                    <div className={css.text1}>
                    <h4>Lee sobre tu conductor</h4>
                      <p>Tómese unos minutos para aprender un poco sobre su conductor conductor antes de conocerlo.</p>
                    </div>
                  </div>
                </div>
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
                        src={agenda}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                          resize: 'none',
                        }}
                        alt='programar'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Revisa y califica</h4>
                      <p>Ayude a otros miembros a tomar decisiones informadas revisando y calificando a los propietarios y conductores de automóviles después de cada viaje.</p>
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
                        src={schedule}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35px',
                          height: '35px',
                        }}
                        alt='programar'
                      />
                    </Box>
                    <div className={css.text1}>
                      <h4>Prioriza tu privacidad</h4>
                      <p>Nunca compartas su correo electrónico, domicilio o número de teléfono en línea. Mantenemos sus datos de contacto privados y solo los revelamos una vez que se reserva un viaje.</p>
                    </div>
                  </div>
                </div>
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

export default InsurancePage;
