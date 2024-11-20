import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import config from '../../config';

import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/rentaloFacebook-1200x630.jpg';
import twitterImage from '../../assets/rentaloTwitter-600x314.jpg';
import css from './LandingPage.module.css';
import SectionWhyRentalo from '../../components/SectionWhyRentalo/SectionWhyRentalo';
import SectionGif from '../../components/SectionGif/SectionGif';
import SectionCars from '../../components/SectionCars/SectionCars';
import SectionInsurance from '../../components/SectionInsurance/SectionInsurance';
import SectionAccordion from '../../components/SectionAccordion/SectionAccordion';
import SideNav from '../../components/SideNav/SideNav';
import { isHostVerified } from '../../util/dataExtractors';
import { withViewport } from '../../util/contextHelpers';

export const LandingPageComponent = props => {
  const {
    history,
    intl,
    location,
    scrollingDisabled,
    currentUser,
    viewport,
    onManageDisableScrolling,
  } = props;
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    //set state after 2 seconds
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  }, []);
  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
  const isMobileLayout = viewport.width > 767;

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer isLandingPage={true} />
          {isMobileLayout ? (
            <div className={css.sideNav}>
              <SideNav currentUser={currentUser} />
            </div>
          ) : null}
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <SectionHero
            className={css.hero}
            history={history}
            location={location}
            isHostVerified={isHostVerified(currentUser)}
          />
          <div className={css.whyContainer}>
            <div className={css.fixedWidthContainer}>
              <SectionWhyRentalo />
            </div>
          </div>

          <SectionLocations className={css.sectionLocation} history={history} />

          <div className={css.vehicleInOnePlace}>
            <SectionGif />
          </div>

          <div className={css.vehicleWorkSec}>
            <div className={css.fixedWidthContainer}>
              <SectionCars />
            </div>
          </div>
          <div className={css.insuranceSec}>
            <SectionInsurance viewport={isMobileLayout} />
          </div>
          <SectionHowItWorks className={css.SectionHowItWorkItWorks} history={history} />
          <SectionAccordion className={css.faqSection} />
          <div className={css.sectionContent}></div>
          <Modal
            {...props}
            isOpen={isOpen}
            onClose={() => {
              setOpen(false);
              console.log('Closing modal');
            }}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <div style={{ margin: '1rem' }}>
              {isOpen ? (
                <div className={css.vehicleRightSec}>
                  <video src="https://video-analyzes.s3.amazonaws.com/WhatIsRentalo.mp4" autoPlay={true} controls className={css.gifImage} />
                </div>
              ) : null}
            </div>
          </Modal>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, scrollingDisabled) => {
    dispatch(manageDisableScrolling(componentId, scrollingDisabled));
  },
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withViewport
)(LandingPageComponent);

export default LandingPage;
