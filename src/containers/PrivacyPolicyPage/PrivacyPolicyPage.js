import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  PrivacyPolicy,
  Footer,
} from '../../components';
import config from '../../config';

import css from './PrivacyPolicyPage.module.css';
import SideNav from '../../components/SideNav/SideNav';

const PrivacyPolicyPageComponent = props => {
  const { scrollingDisabled, intl } = props;
  const { isAuthenticated } = useSelector(state => state.Auth);

  const pageName = ['Política de privacidad'];

  const tabs = [
    {
      text: intl.formatMessage({ id: 'PrivacyPolicyPage.privacyTabTitle' }),
      selected: true,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
      lastUpdated: 'Last updated: October 30, 2017',
    },
    {
      text: intl.formatMessage({ id: 'PrivacyPolicyPage.tosTabTitle' }),
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
      lastUpdated: 'Last updated: October 30, 2017',
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.rentalTabTitle' }),
      selected: false,
      linkProps: {
        name: 'RentalPage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'PrivacyPolicyPage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page
      title="Política de privacidad de Réntalo"
      scrollingDisabled={scrollingDisabled}
      schema={schema}
      description="Política de privacidad de Réntalo"
    >
      <LayoutSideNavigation isStaticPage={true}>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} currentPage="PrivacyPolicyPage" />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}>
          <div className={css.contentWrapper}>
            <LayoutWrapperSideNav tabs={tabs} className={css.sideNavWrapper} />
            <div className={css.content}>
              <h1 className={css.heading}>
                <FormattedMessage id="PrivacyPolicyPage.heading" />
              </h1>
              <PrivacyPolicy />
            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

PrivacyPolicyPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const PrivacyPolicyPage = compose(connect(mapStateToProps), injectIntl)(PrivacyPolicyPageComponent);

export default PrivacyPolicyPage;
