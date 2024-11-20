import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingPoliciesForm } from '../../forms';

import css from './EditListingPoliciesPanel.module.css';
const CAR_RULES = 'carrules';

const EditListingPoliciesPanel = props => {
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

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const minimumAge = publicData.minimumAge;
  const maximumAge = publicData.maximumAge;
  const [ageRange, setAgeRange] = useState(
    minimumAge && maximumAge ? [minimumAge, maximumAge] : [18, 60]
  );

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPoliciesPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPoliciesPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingPoliciesForm
        className={css.form}
        name={CAR_RULES}
        publicData={publicData}
        initialValues={{ carrules: publicData.carrules, minimumTrip:publicData.minimumTrip ,maximumTrip :publicData.maximumTrip }}
        onSubmit={values => {
          const { minimumTrip, maximumTrip, carrules = [] } = values;
          const updateValues = {
            publicData: { minimumTrip, maximumTrip, carrules },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPoliciesPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPoliciesPanel.propTypes = {
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

export default EditListingPoliciesPanel;
