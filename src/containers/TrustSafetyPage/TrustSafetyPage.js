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
} from '../../components';
import suraLogo from '../../assets/logo_sura.png';
import SideNav from '../../components/SideNav/SideNav';
import css from './TrustSafetyPage.module.css';

const TrustSafetyPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Confianza y seguridad"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'TrustSafetyPage',
        description: 'Trust and Safety',
        name: 'Trust and Safety',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
          <div className={css.sideNav}>
              <SideNav />
            </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Your safety is our priority</h1>

          <div className={css.contentWrapper}>
              <h2>Réntalo® has partnered with one of the most trusted insurance companies in Latin america.</h2>
              <img src={suraLogo} className={css.suraLogo} alt='logotipo'/>
              <p><strong>Together with SURA Insurance we are there for you.</strong></p>
              <br/>

              <p>-For every booking you are well protected by our insurance partner. This way your risk is minimized when you share your car with others.</p>
              <p>-Our quality control and fraud detection tools, together with our rental standards, allow us to select trusted users and cars.</p>
              <p>-From ID verification to enhanced security, Réntalo® makes carpooling safer for guests and hosts</p>

              <br/>

              <h2>You’re covered</h2>

              <p>You’re covered with up to $1,000,000.00 in liability insurance, and your car is contractually protected against theft and physical damage.We also request a security deposit for unforeseen expenses and excess.</p>
              <p>You’re covered with up to $1,000,000.00 in liability insurance, and your car is contractually protected against theft and physical damage.We also request a security deposit for unforeseen expenses and excess.</p>

              <h2>Strong verification system</h2>

              <p>Thanks to the advanced identity verification system, we verify the drivers' identity documents and driving license before any rental.</p>

              <h2>You’re not alone</h2>


              <p>If you are a host and have an urgent Trust & Safety issue, Réntalo® agents are available to answer your call 24/7. </p>
              <p>The safety of Réntalo®’s guests and hosts is always a top priority. That’s why Trust & Safety agents are trained to respond to issues such as accidents, illegal items left in cars, car recoveries, and theft.</p>


              <h2>Trusted and verified community</h2>

              <p>We make sure that the verification of the hosts and their listings is done by us. Also, here is a transparent review system that helps build a trustworthy community.</p>


              <h2>Safety check</h2>

              <p>When you get to the car, the Réntalo® web app will guide you through a basic safety check that includes taking pictures of all four corners of the car that will be saved in our system.</p>

              <h2>Available 24/7 roadside assistance</h2>
              <p>We offer 24/7 roadside assistance for accidents or breakdowns that may occur during an active trip as part of certain protection plans.</p>



              <br/>

              <center><h2>We offer 24/7 roadside assistance for accidents or breakdowns that may occur during an active trip as part of certain protection plans.</h2></center>

              <h2>Read about you guest</h2>
              <p>Take a few minutes to learn a little about your guest before you meet him.</p>


              <h2>Review and rate</h2>
              <p>Help other members make informed decisions by reviewing and rating car hosts and drivers after each trip.</p>


              <h2>Prioritise your privacy</h2>
              <p>Never share your email, home address or phone number online. We keep your contact details private and we only reveal these once a trip is booked.</p>




          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default TrustSafetyPage;
