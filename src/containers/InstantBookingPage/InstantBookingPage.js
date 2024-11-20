import React, { useEffect } from 'react';
// import config from '../../config';
// import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  // ExternalLink,
  Button,
} from '../../components';
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import dynamic from 'next/dynamic';
import car1 from './car1.jpg';
import car2 from './car2.jpg';
import car3 from './car3.jpg';
import SideNav from '../../components/SideNav/SideNav';
import css from './InstantBookingPage.module.css';

const Carousel =
  typeof window !== 'undefined'
    ? require('@brainhubeu/react-carousel').default
    : dynamic(() => import('@brainhubeu/react-carousel'), {
        ssr: false,
      });

const InstantBookingPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  useEffect(() => {
    if (typeof window === 'undefined') {
    } else {
      require('@brainhubeu/react-carousel/lib/style.css');
    }
  }, []);

  // prettier-ignore
  return (
    <StaticPage
      title="Reserva instantánea"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'InstantBookingPage',
        description: 'Reserva instantánea',
        name: 'Reserva instantánea',
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
          <h1 className={css.pageTitle}>Instant Booking on Réntalo®</h1>
          <p>No more waiting for approval!</p>
          <p>Get your bookings accepted right away with Instant Booking.</p>

          <div className={css.contentWrapper}>
            <img src={image1} className={css.coverImage} alt='image'/>

            <br/>

            <div className={css.htmlText}>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>For guest</span></strong></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>-Instant approval</span></strong></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>Listings with instant booking do not require approval from the host before they can be booked.</span></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>-One click booking</span></strong></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>Guests can directly make a booking without needing to make a booking request first.&nbsp;</span></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>-Filtered Search</span></strong></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>With instant booking, guests can now book cars quickly and effortlessly. Guests may filter their search to only view listings that have instant booking activated.</span></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;</span></p>
              <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>There is a default 4 hour notice period for instant bookings and you may not book for any time between 12am – 7am. This ensures that hosts have ample time to prepare their car for your instant bookings. Hosts can choose to change this default notice period.</span></p>
            </div>

            <a  href='/s'>
            <Button className={css.singleButtonWrapper}>Browse Instant booking cars </Button>
            </a>


          <br/>

          <Carousel
            plugins={[

              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                numberOfSlides: 3
                }
              },
            ]}

            breakpoints={{
              780: {
                plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 1
                  }
                },
              ]
              },
            }}
      >
       <img src={car1} className={css.carImage} alt='coche'/>
       <img src={car2} className={css.carImage} alt='coche'/>
       <img src={car3} className={css.carImage} alt='coche'/>
       <img src={car1} className={css.carImage} alt='coche'/>
       <img src={car2} className={css.carImage} alt='coche'/>
       <img src={car3} className={css.carImage} alt='coche'/>
          </Carousel>


          <br/>
            <div>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>Benefits of Instant Booking</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>For hosts</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>If you have instant booking activated, it will apply to all available dates on your calendar. Please update your calendar regularly to maximise your bookings and earnings.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>We highly recommend our hosts to activate instant booking on their listings for the below benefits:&nbsp;</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>1-Faster bookings</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;You will receive bookings without having to accept requests first.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>2-Higher earnings</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>You will make more income with your car by activating instant booking, Guests prefer listings they can instant book as this allows them to make confirmed plans.</span></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><strong><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Bold"', color: 'black'}}>3-Search placement</span></strong></p>
        <p style={{marginTop: '0in', marginRight: '0in', marginBottom: '8.0pt', marginLeft: '0in', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri","sans-serif"'}}><span style={{fontSize: '16px', lineHeight: '107%', fontFamily: '"Arimo Regular"', color: 'black'}}>&nbsp;Listings with instant booking activated are prioritised on search placement.&nbsp;</span></p>
      </div>

      <a  href='/l/draft/00000000-0000-0000-0000-000000000000/new/description'>
            <Button className={css.singleButtonWrapper}>List your car </Button>
            </a>

        <br/>

        <img src={image2}  className={css.coverImage} alt='image'/>
            <a >
            <Button className={css.singleButtonWrapper}>Learn more about Instant booking policies </Button>
            </a>
             </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default InstantBookingPage;
