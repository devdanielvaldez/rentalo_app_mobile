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
  Footer,
  TermsOfService,
} from '../../components';
import config from '../../config';

import css from './TermsOfServicePage.module.css';
import SideNav from '../../components/SideNav/SideNav';

const TermsOfServicePageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const pageName = ['Política de privacidad'];
  const { isAuthenticated } = useSelector(state => state.Auth);

  const tabs = [
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.tosTabTitle' }),
      selected: true,
      linkProps: {
        name: 'TermsOfServicePage',
      },
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
  const schemaTitle = intl.formatMessage({ id: 'TermsOfServicePage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page
      title="Términos y condiciones"
      scrollingDisabled={scrollingDisabled}
      schema={schema}
      description="Términos y condiciones"
    >
      <LayoutSideNavigation isStaticPage={true}>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} currentPage="TermsOfServicePage" />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}>
          <div className={css.contentWrapper}>
            <LayoutWrapperSideNav tabs={tabs} className={css.sideNavWrapper} />
            <div className={css.content}>
              <h1 className={css.heading}>
                <FormattedMessage id="TermsOfServicePage.heading" />
              </h1>
              <TermsOfService />
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

TermsOfServicePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const TermsOfServicePage = compose(
  connect(mapStateToProps),
  injectIntl
)(TermsOfServicePageComponent);

export default TermsOfServicePage;
