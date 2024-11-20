import React, { Component } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { ensureCurrentUser } from "../../../util/data";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { isScrollingDisabled } from '../../../ducks/UI.duck';

import { updateProfile, uploadImage } from '../../ProfileSettingsPage/ProfileSettingsPage.duck';
import { ProfileSettingsForm } from '../../../forms';

import css from './ProfileImagePanel.module.css';


const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileImagePanelComponent extends Component {
  render() {
    const {
      currentUser,
      image,
      onImageUpload,
      onUpdateProfile,
      // scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      // onFetchCurrentUser,
      nextStep,
      previousStep,
      // goToStep,
      intl,
      // history,
      // submitButtonText,
      className,
      rootClassName,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const user = ensureCurrentUser(currentUser);
    // const { firstName, lastName, bio } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const title = intl.formatMessage({ id: 'ProfileImagePanel.title' });
    // const pageName = ['Configuración'];

    return (
      <div className={classes}>
        <h1 className={css.mainTitle}>{title}</h1>
        <ProfileSettingsForm
          className={css.form}
          currentUser={currentUser}
          initialValues={{ profileImage: user.profileImage }}
          profileImage={profileImage}
          onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
          uploadInProgress={uploadInProgress}
          updateInProgress={updateInProgress}
          uploadImageError={uploadImageError}
          updateProfileError={updateProfileError}
          previousStep={previousStep}
          nextStep={nextStep}
          isVerificationPage={true}
          btnHolderClassName={css.buttonsHolder}
          prevNextBtnClassName={css.button}
          onSubmit={() => {
            const uploadedImage = this.props.image;

            // Update profileImage only if file system has been accessed
            const updatedValues =
              uploadedImage && uploadedImage.imageId && uploadedImage.file
                ? { profileImageId: uploadedImage.imageId }
                : {};

            onUpdateProfile(updatedValues).then(() => nextStep());
          }}
        />
      </div>
    );
  }
}

ProfileImagePanelComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

const { bool, func, object, shape } = PropTypes;

ProfileImagePanelComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileImagePanel = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ProfileImagePanelComponent);

export default ProfileImagePanel;
