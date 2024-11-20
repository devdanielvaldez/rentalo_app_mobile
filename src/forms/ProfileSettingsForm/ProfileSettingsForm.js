import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { isUploadImageOverLimitError } from '../../util/errors';
import { Form, Avatar, Button, ImageFromFile, IconSpinner, FieldTextInput } from '../../components';

import css from './ProfileSettingsForm.module.css';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset
class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = {
      uploadDelay: false,
    };
    this.submittedValues = {};
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
            saveText,
            nextStep,
            isDriverApproval,
            isHostApproval,
            isVerificationPage,
            btnHolderClassName,
            prevNextBtnClassName,
            previousStep,
            driverPage,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);
          const { attributes } = user || {};
          const { profile } = attributes || {};
          const { protectedData } = profile || {};
          const { driverMetaData } = protectedData || {};
          const { driverIdentityStatus, documentDetails, holderDetails } = driverMetaData || {};
          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                rootClassName={css.uploadingImage}
                aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}
                {avatarComponent}
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
                </div>
                <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                </div>
              </div>
            );

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;
          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid ||
            pristineSinceLastSubmit ||
            !transientUserProfileImage ||
            uploadInProgress ||
            submitInProgress;

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3>
                <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={css.label} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
                <div className={css.tip}>
                  <FormattedMessage id="ProfileSettingsForm.tip" />
                </div>
                <div className={css.fileInfo}>
                  <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                </div>
              </div>
              {submitError}
              {driverMetaData && driverIdentityStatus && driverPage ? (
                <>
                  <FieldTextInput
                    className={css.field}
                    id="name"
                    name="name"
                    label={
                      <FormattedMessage id="ProfileSettingsForm.ProfileSettingsForm.yournameLabel" />
                    }
                    type="text"
                    readOnly
                  />
                  <FieldTextInput
                    className={css.field}
                    id="dob"
                    name="dob"
                    label={
                      <FormattedMessage id="ProfileSettingsForm.ProfileSettingsForm.dateOfBirthLabel" />
                    }
                    type="text"
                    readOnly
                  />
                  <FieldTextInput
                    className={css.field}
                    id="address"
                    name="address"
                    label={
                      <FormattedMessage id="ProfileSettingsForm.ProfileSettingsForm.addressDetails" />
                    }
                    type="text"
                    readOnly
                  />
                </>
              ) : null}
              {!isVerificationPage &&
                (!driverPage ? (
                  <>
                    <Button
                      className={css.submitButton}
                      type="submit"
                      inProgress={submitInProgress}
                      disabled={submitDisabled}
                      // ready={pristineSinceLastSubmit}
                    >
                      <FormattedMessage id="ProfileSettingsForm.ProfileSettingsForm.buttonLabelSave" />
                      {/* {isDriverApproval ? nextStep : isHostApproval ? nextStep : saveText} */}
                    </Button>
                  </>
                ) : null)}
              {isVerificationPage && (
                <div className={btnHolderClassName}>
                  <span className={prevNextBtnClassName} onClick={() => previousStep()}>
                    Regresar
                  </span>
                  <Button
                    className={prevNextBtnClassName}
                    type="submit"
                    inProgress={submitInProgress}
                    disabled={submitDisabled}
                    // ready={pristineSinceLastSubmit}
                  >
                    Continuar verificación
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      />
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
  saveText: 'Guardar',
  nextStep: 'Siguiente: Verificación de identidad',
};

ProfileSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;
