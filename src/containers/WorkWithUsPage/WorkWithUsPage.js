import React from 'react';
// import config from '../../config';
// import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SectionLocations,
} from '../../components';
import css from './WorkWithUsPage.module.css';
import CvForm from '../../components/Form/CvForm';
import SideNav from '../../components/SideNav/SideNav';

const WorkWithUsPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const pageName = ['Trabaja con nosotros'];
  // prettier-ignore
  return (
    <StaticPage
      title="Únete a Nuestro Equipo Dinámico"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WorkWithUsPage',
        description: 'Work With Us Rentalo',
        name: 'Work With Us page',
      }}
      description="Únete a Nuestro Equipo Dinámico"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <div className={css.sideNav}>
      <SideNav/>
          </div>
          <TopbarContainer pageName={pageName} />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
        <div className={css.mobile}>
          <p className={css.mobileText}>Trabaja con nosotros</p>
        </div>
         <CvForm />
         <SectionLocations className={css.locationSection} />
                {/* <div className={css.hr}></div>
                <div className={css.lastSection}>

                  <h2 style={{textAlign: 'center', marginBottom: '0'}}>Posiciones abiertas</h2>
                  <p style={{textAlign: 'center', color: '#7A7A7A', marginTop: '0'}}>
                  ¡Únase a nosotros en nuestra misión de eficientizar el uso de los recursos compartidos a través<br /> de la tecnología!
                  </p>
                <Grid container xs={12} md={12} flexDirection="column" alignItems="center" sx={{margin: '0 20px'}} >
                  <Grid container item xs={12} md={12} justifyContent="center" alignItems="center">
                    <Box
                      sx={{
                        background: '#FFFFFF 0% 0% no-repeat padding-box',
                        border: '1px solid #E9E9E9',
                        borderRadius: '10px',
                        width: '100%',
                        marginBottom: '20px',
                      }}
                    >
                      <div className={css.row}>
                        <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</h4>
                        <button className={css.button}>Más información</button>
                      </div>
                    </Box>
                    <Box
                      sx={{
                        background: '#FFFFFF 0% 0% no-repeat padding-box',
                        border: '1px solid #E9E9E9',
                        borderRadius: '10px',
                        width: '100%',
                        marginBottom: '20px',
                      }}
                    >
                      <div className={css.row}>
                        <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</h4>
                        <button className={css.button}>Más información</button>
                      </div>
                    </Box>
                    <Box
                      sx={{
                        background: '#FFFFFF 0% 0% no-repeat padding-box',
                        border: '1px solid #E9E9E9',
                        borderRadius: '10px',
                        width: '100%',
                      }}
                    >
                      <div className={css.row}>
                        <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</h4>
                        <button className={css.button}>Más información</button>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                </div> */}
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default WorkWithUsPage;
