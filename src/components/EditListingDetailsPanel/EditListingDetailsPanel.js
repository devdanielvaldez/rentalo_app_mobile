import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import EditListingDetailsForm from '../../forms/EditListingDetailsForm/EditListingDetailsForm';
import css from './EditListingDetailsPanel.module.css';

const EditListingDetailsPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const currentListing = ensureOwnListing(listing);
  const publicData = currentListing.attributes.publicData;
  const classes = classNames(rootClassName || css.root, className);
  const { category = '', transmission = '', fuel = '', seat = '', door = '' } = publicData || {};
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDetailsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDetailsPanel.title" />
  );
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDetailsForm
        className={css.form}
        initialValues={{
          category,
          transmission,
          seat,
          fuel,
          door,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { category, transmission, fuel, seat, door } = values;
          const updateValues = {
            publicData: {
              category,
              transmission,
              fuel,
              seat,
              door,
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingDetailsPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDetailsPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingDetailsPanel;
