import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  UserNav,
} from '../../components';
import { PasswordChangeForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import {
  RESET_STATE,
  changePassword,
  changePasswordClear,
  resetPassword,
} from './PasswordChangePage.duck';
import css from './PasswordChangePage.module.css';
import SideNav from '../../components/SideNav/SideNav';
import ProfileNav from '../../components/ProfileNav/ProfileNav';

export const PasswordChangePageComponent = props => {
  const {
    changePasswordError,
    changePasswordInProgress,
    currentUser,
    onChange,
    onSubmitChangePassword,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    passwordChanged,
    scrollingDisabled,
    intl,
    resetState,
  } = props;
  useEffect(() => {
    resetState();
  }, []);

  const changePasswordForm =
    currentUser && currentUser.id ? (
      <PasswordChangeForm
        className={css.form}
        changePasswordError={changePasswordError}
        initialValues={{ newPassword: '' }}
        currentUser={currentUser}
        onSubmit={onSubmitChangePassword}
        onChange={onChange}
        onResetPassword={onResetPassword}
        resetPasswordInProgress={resetPasswordInProgress}
        resetPasswordError={resetPasswordError}
        inProgress={changePasswordInProgress}
        ready={passwordChanged}
        resetState={resetState}
      />
    ) : null;

  const title = intl.formatMessage({ id: 'PasswordChangePage.title' });
  const pageName = ['Nueva contraseña'];

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="PasswordChangePage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />

          <div className={css.sideNav}>
            <ProfileNav />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="PasswordChangePage"
          currentUser={currentUser}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="PasswordChangePage.heading" />
            </h1>
            {changePasswordForm}
          </div>
        </LayoutWrapperMain>
      </LayoutSideNavigation>
    </Page>
  );
};

PasswordChangePageComponent.defaultProps = {
  changePasswordError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

PasswordChangePageComponent.propTypes = {
  changePasswordError: propTypes.error,
  changePasswordInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitChangePassword: func.isRequired,
  passwordChanged: bool.isRequired,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    changePasswordError,
    changePasswordInProgress,
    passwordChanged,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.PasswordChangePage;
  const { currentUser } = state.user;
  return {
    changePasswordError,
    changePasswordInProgress,
    currentUser,
    passwordChanged,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(changePasswordClear()),
  onSubmitChangePassword: values => dispatch(changePassword(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
  resetState: () => dispatch({ type: RESET_STATE }),
});

const PasswordChangePage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(PasswordChangePageComponent);

export default PasswordChangePage;
