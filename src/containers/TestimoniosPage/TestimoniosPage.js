import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './TestimoniosPage.module.css';
import './mui.css';

import SideNav from '../../components/SideNav/SideNav';
import testimonial1 from './testimonialPic1.png';
import testimonial2 from './testimonialPic2.png';
import testimonial3 from './testimonialPic3.png';
import selfie from './selfie.png';
import Box from '@mui/material/Box';
import quote from './Icon awesome-quote-right.svg';

import { useSelector } from 'react-redux';

const TestimoniosPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const { isAuthenticated } = useSelector(state => state.Auth);

  // prettier-ignore

  // const [selectedImg, setSelectedImg] = useState()

  const pageName = ['Testimonios'];

  return (
    <StaticPage
      title="Testimonios de Clientes"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'TestimoniosPage',
        description: 'Testimonios',
        name: 'Testimonios page',
      }}
      description="Testimonios de Clientes"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
        <div className={isAuthenticated ? css.contentWrapper: css.noWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>{pageName}</p>
            </div>
            <div className={css.testimonialContainer}>
              <div className={css.testimonialBlock}>
                <Box
                  sx={{ background: '#FFFFFF 0% 0% no-repeat padding-box', borderRadius: '12px' }}
                >
                  <div className={css.box}>
                    <div className={css.testimonialVdo}>
                      <video src="https://video-analyzes.s3.amazonaws.com/WhatIsRentalo.mp4" autoPlay={false} controls className={css.gifImage} />
                    </div>
                    <div className={css.column}>
                      <div className={css.wrap}>
                        <div className={css.start}>
                          <img alt="testimonio" src={testimonial1} className={css.testimonial} />
                          <p className={css.name}>Sarah D.</p>
                        </div>
                        <img src={quote} className={css.quote} alt='presu' />
                      </div>
                      <p className={css.text}>
                      He usado Réntalo varias veces y siempre he tenido una experiencia fantástica.
                      Es una forma económica y fácil de alquilar un automóvil de una persona local,
                      lo que significa que obtiene una experiencia más auténtica y una selección más
                      diversa de vehículos. ¡Recomiendo encarecidamente Réntalo a cualquiera que busque
                      un alquiler de automóviles diferente y emocionante!.
                      </p>
                    </div>
                  </div>
                </Box>
              </div>
              <div className={css.testimonialBlock}>
                <Box
                  sx={{ background: '#FFFFFF 0% 0% no-repeat padding-box', borderRadius: '12px' }}
                >
                  <div className={css.box}>
                    <div>
                      <img src={selfie} className={css.image} alt='selfie' />
                    </div>
                    <div className={css.column}>
                      <div className={css.wrap}>
                        <div className={css.start}>
                          <img alt="testimonio" src={testimonial2} className={css.testimonial} />
                          <p className={css.name}>Francisco R.</p>
                        </div>
                        <img src={quote} className={css.quote} alt='presupuesto' />
                      </div>
                      <p className={css.text}>
                      Mi esposa y yo alquilamos un automóvil con Réntalo para un fin de semana largo y no
                      podríamos estar más contentos con la experiencia. El propietario del automóvil fue muy
                      amable y servicial, y el automóvil estaba en excelentes condiciones. Fue una experiencia
                      mucho más personal y agradable que alquilar a través de una empresa tradicional de alquiler
                      de automóviles. Definitivamente volveremos a usar Réntalo en el futuro.
                      </p>
                    </div>
                  </div>
                </Box>
              </div>
              <div className={css.testimonialBlock}>
                <Box
                  sx={{ background: '#FFFFFF 0% 0% no-repeat padding-box', borderRadius: '12px' }}
                >
                  <div className={css.box}>
                    <div className={css.column}>
                      <div className={css.wrap}>
                        <div className={css.start}>
                          <img alt="testimonio" src={testimonial3} className={css.testimonial} />
                          <p className={css.name}>José S.</p>
                        </div>
                        <img src={quote} className={css.quote} alt='quote' />
                      </div>
                      <p className={css.text}>
                      Réntalo ha cambiado completamente la forma en que viajo. Ahora siempre busco en Réntalo
                      antes de considerar una empresa de alquiler de automóviles tradicional. Me encanta poder
                      elegir entre una amplia variedad de vehículos y propietarios locales, y siempre he tenido
                      una experiencia positiva con el servicio al cliente. ¡Réntalo es lo mejor!.
                      </p>
                    </div>
                  </div>
                </Box>
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

export default TestimoniosPage;
