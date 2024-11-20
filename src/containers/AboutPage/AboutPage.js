import React, { useState } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './AboutPage.module.css';
import SideNav from '../../components/SideNav/SideNav';
import Modal from '../../components/Modal/Modal';
import SimpleSlider from '../../components/SlideShow/SlideShow';
import '../../styles/slick/slick.css';
import '../../styles/slick/slick-theme.css';

import './mui.css';
import { useSelector } from 'react-redux';

const AboutPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const { isAuthenticated } = useSelector(state => state.Auth);

  const pageName = ['Acerca del equipo'];

  // prettier-ignore
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function openModal1() {
    setOpen(true);
  }

  function openModal2() {
    setOpenModal(true);
  }

  function openModal3() {
    setIsOpen(true);
  }

  const isWindowDefined = typeof window !== 'undefined';
  const isMobileLayout = isWindowDefined && window.innerWidth < 768;
  const {currentUser} = useSelector(state=>state.user)

  return (
    <StaticPage
      title="Nuestra Misión"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'Acerca',
        name: 'Acerca',
      }}
      description="Nuestra Misión"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav currentUser={currentUser}/>
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={isAuthenticated ? css.contentWrapper: css.noWrapper}>
            <div className={css.fixedWidthContainer}>
              <div className={css.mobile}>
                <p className={css.mobileText}>Sobre nosotros</p>
              </div>
              <div className={css.getToKnowSec}>
                <div className={css.getToKnowLeft}>
                  <span className={css.pattern1}>
                    <svg
                      width="54"
                      height="75"
                      viewBox="0 0 54 75"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="72" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="72" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="72" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="72" r="3" fill="#E9E9E9" />
                    </svg>
                  </span>
                  <SimpleSlider />{' '}
                  <span className={css.pattern2}>
                    <svg
                      width="54"
                      height="75"
                      viewBox="0 0 54 75"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="3" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="3" cy="72" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="19" cy="72" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="35" cy="72" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="20" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="38" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="55" r="3" fill="#E9E9E9" />
                      <circle cx="51" cy="72" r="3" fill="#E9E9E9" />
                    </svg>
                  </span>
                </div>
                <div className={css.getToKnowRight}>
                  <h2>ACERCA</h2>
                  {/* <p className={css.text1}>QUIENES SOMOS</p> */}
                  <p className={css.text2}>Conócenos y descubre qué nos motiva</p>
                  <p className={css.text3}>
                    <strong>Réntalo®</strong> es la plataforma de alquiler de autos más reciente,
                    segura y rentable.
                    <br />
                    Réntalo simplifica la vida de las personas y eficientiza el uso de los recursos compartidos empleando herramientas como: pasarelas de pagos,
                    sistema de verificación biométrica para validar a los usuarios, firma digital del contrato y hasta la contratación de una cobertura de riesgo
                    internacional que garantiza la inversión del propietario. Todo a través de una experiencia de usuario amigable en nuestra plataforma.
                    <br />
                    <br /> Creamos este producto para brindar mejores oportunidades comerciales a
                    los propietarios de vehículos y empresas de alquiler de automóviles, para que
                    puedan generar más ganancias con sus automóviles.
                    <br />
                    <br /> Réntalo® es uno de los proyectos de base tecnológica que incuba Start Lab
                    de Altice Dominicana. Realizado en 2019 en la ciudad de Santiago y patrocinado
                    por La Aurora, S.A.
                    <br />
                    <br /> En Réntalo® tenemos como objetivo dinamizar el mercado de alquiler de
                    vehículos y de esta manera incrementar el ingreso de divisas y brindar seguridad
                    a nuestros clientes.
                    <br />
                    <br /> Queremos unir a las personas, construir una comunidad que desee crear un
                    mejor entorno y utilizar los activos de manera más eficiente.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={css.missionVision}>
            <div className={css.fixedWidthContainer}>
              <button onClick={openModal1} className={css.dottedButton}>
                <span>
                  Nuestra <strong>Misión</strong>
                </span>
              </button>{' '}
              <button onClick={openModal2} className={css.dottedButton}>
                <span>
                  Nuestra <strong>Visión</strong>
                </span>
              </button>{' '}
              <button onClick={openModal3} className={css.dottedButton}>
                <span>
                  Nuestros <strong>Valores</strong>
                </span>
              </button>
            </div>
            <Modal
            id="NuestraVisión"
              isOpen={open}
              onClose={() => {
                setOpen(false);
              }}
              onManageDisableScrolling={() => {}}
              title="Nuestra Misión"
            >
              <div className={css.aboutModalContent}>
                <p>
                Eficientizar el uso de los recursos compartidos a través de la tecnología. {' '}
                </p>
              </div>{' '}
            </Modal>

            <Modal
              isOpen={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
              onManageDisableScrolling={() => {}}
              title="Nuestra Visión"
            >
              <div className={css.aboutModalContent}>
                <p>
                Proveer herramientas tecnológicas y espacios digitales confiables de fácil uso, para propiciar el intercambio de valor entre usuarios de Latinoamérica.{' '}
                </p>
              </div>{' '}
            </Modal>

            <Modal
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
              onManageDisableScrolling={() => {}}
              title="Nuestros Valores"
              isLargeModal={true}
            >
              <div className={css.benefits}>
                <div className={css.boxWrapper}>
                  <h2>Bienestar</h2>
                  <p className={css.text4}>
                    Velamos por el desarrollo y protección de nuestros clientes, apostando a la
                    magia relacional que surge al compartir recursos con otros, a la vez que
                    incrementan su patrimonio.
                  </p>
                </div>{' '}
                <div className={css.boxWrapper}>
                  <h2>Innovación</h2>
                  <p className={css.text4}>
                    Somos creativos, trabajamos con entusiasmo y optimismo, buscando nuevas ideas
                    que impacten y transformen la cadena de valor de la Empresa.
                  </p>
                </div>
                <div className={css.boxWrapper}>
                  <h2> Transparencia</h2>
                  <p className={css.text4}>
                    Trabajamos en confianza, de forma abierta, en armonía, compartiendo
                    responsabilidades, y alineados hacia el propósito que nos guía.
                  </p>
                </div>
                <div className={css.boxWrapper}>
                  <h2>Cooperación</h2>
                  <p className={css.text4}>
                    Trabajamos en equipo para lograr los objetivos y resultados clave de la Empresa.
                    Medimos lo que realmente importa, de manera consciente. Potenciamos la sinergia
                    y la inteligencia colectiva.
                  </p>
                </div>
                <div className={css.boxWrapper}>
                  <h2>Empatía</h2>
                  <p className={css.text4}>
                    Nos ocupamos de atender las necesidades de nuestros clientes, internos y
                    externos. Enfocándonos en sus causas e implicaciones personales, y siendo
                    asertivos en las interacciones con ellos.
                  </p>
                </div>
              </div>
            </Modal>
          </div>
          <div className={css.ourBenefitsSec}>
            <h2 className={css.title}>
              ¿Quién se beneficia de<span className={css.orangeText}>Réntalo</span>y cómo?
            </h2>
            <div className={css.benefits}>
              <div className={css.boxWrapper}>
                <h2>Personas que necesitan automóviles</h2>
                <p className={css.text4}>
                  Réntalo® ofrece a los conductores una alternativa perfecta para moverse sin tener
                  que poseer un vehículo. Hay cientos para elegir y disfrutar de un servicio rápido
                  y seguro con una experiencia de usuario amigable a través de sus teléfonos
                  inteligentes.
                </p>
              </div>{' '}
              <div className={css.boxWrapper}>
                <h2>Propietarios de automóviles</h2>
                <p className={css.text4}>
                La propiedad de un automóvil puede ser costosa. ¿Por qué no hacer algo de dinero extra para mantenerlo cuando tu auto está disponible? Y reducir los costos de propiedad pagando su préstamo. Todos los vehículos están asegurados y usted tendrá el control completo de sus tarifas, quién conduce tu automóvil y cuándo.
                </p>
              </div>
              <div className={css.boxWrapper}>
                <h2> Tránsito de las ciudades</h2>
                <p className={css.text4}>
                Mejoramos la movilidad al aliviar la congestión y facilitar el uso del transporte público. Los coches están parqueados una media de 22 horas al día. Cuando compartimos autos, no necesitamos tantos en el camino, lo que significa menos accidentes, menos tráfico y menos espacio requerido para estacionar.
                </p>
              </div>
              <div className={css.boxWrapper}>
                <h2>¡Todos a largo plazo!</h2>
                <p className={css.text4}>
                  Con el medio ambiente sufriendo un poco más cada año, no hay mejor momento para
                  actuar que ahora. Estamos poniendo nuestro granito de arena contigo para lograr
                  juntos un planeta más limpio, más verde y más sostenible al reducir el número de
                  vehículos activos en nuestras ciudades y honrar nuestra hermosa isla.
                </p>
              </div>
            </div>
          </div>
          <div className={css.talkToUsSec}>
            <div className={css.leftSection}>
              {' '}
              <p className={css.contactText1}>HÁBLANOS</p>
              <p className={css.contactText2}>
                ¡Pregúntenos cualquier cosa y estaremos más que felices de responderle!
              </p>
              <p className={css.contactText3}>
                Puedes comunicarte con nosotros enviándonos un mensaje al numero +1 (829) 657-5069 o
                llámenos al +1 (829) 657-5069 para una reunión personalizada.
              </p>
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

export default AboutPage;
