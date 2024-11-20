import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './CareersPage.module.css';
import SideNav from '../../components/SideNav/SideNav';

const CareersPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Vacantes"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CareersPage',
        description: 'Careers',
        name: 'Careers',
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
          <h1 className={css.pageTitle}>Careers</h1>

          <div className={css.contentWrapper}>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>At Réntalo® we are looking for high-energy people who are passionate about scaling growth in the sharing economy and who see themselves as entrepreneurs who take responsibility. We are a fast growing setup and therefore we need someone who brings high energy levels with them and can push themselves.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>Our team is collaborative, positive, curious and committed. We think fast, work smart, laugh often, and look for like-minded people to join us in our mission to make the use of shared resources more efficient through technology.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"', textAlign: 'center'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>&nbsp;</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"', textAlign: 'center'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Values</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Empathy</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We believe that challenges in human communication can be resolved by being considerate, making an effort to understand the perspective of the other party, and always looking for ways to help others.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Magical thinking</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We believe that the thought, the spoken word and the conscious actions of a person with a clearly purpose can have a transcendental influence and alter the course of events in the physical realm without a causal link, which is considered a miracle.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Flowing ferocity</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>It is the quality of taking fierce actions to achieve a goal, enjoy the process of creation, detach from the result and allow it to manifest in the divine perfect time.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Down-to-earth</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We’re humble, unpretentious, and we always try to lead without arrogance.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Pioneering</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We encourage people to get out of their comfort zone and try new things. We’re evolving an entire industry, so we need to be comfortable knowing there’s no playbook.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Autonomous</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We take ownership of our work and set our own goals.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Open-minded</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We encourage new ideas and believe everyone has a direct impact.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Efficient</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We work hard but also value our time and optimise it.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Candor</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We recognize that to get things done and work effectively as a team we need to clearly communicate what we think and feel and give others direct, honest feedback. We expect the very best work from each other, every day. Radical candor is the backbone of our working culture.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"', textAlign: 'center'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Employee benefits</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Career Development</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We encourage your professional growth with a yearly education stipend and free access to all TECO &nbsp;courses.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Recognition</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We celebrate success together with our peer-to-peer recognition program and monthly employee awards.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Flexibility</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We are a remote-first workplace, and provide flexible work hours and unlimited PTO.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Credit</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>You get monthly Réntalo® credit and discounts for your friends and family.</span></p>
          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default CareersPage;
