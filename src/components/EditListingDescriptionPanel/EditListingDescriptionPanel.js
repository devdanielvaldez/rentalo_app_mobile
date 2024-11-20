import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingDescriptionForm } from '../../forms';
import { useSelector } from 'react-redux';
import css from './EditListingDescriptionPanel.module.css';

const getMarketValue = (formMarketValue, storeMarketValue, chassisApiResponse) => {
  return storeMarketValue?.data?.marketValue || chassisApiResponse?.marketValue || formMarketValue || 0;
}

const EditListingDescriptionPanel = props => {
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
    onVerifyVechile,
    onVerifyChassis,
    onVerifyMarketValue,
    storeMarketValue,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const currentListing = ensureOwnListing(listing);
  const {
    description,
    licenseplate,
    identification,
    color = '',
    model = '',
    make = '',
    year = '',
    marketValue = '',
    isFetched = false,
    chassis,
  } = currentListing.attributes?.publicData;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  const { verifyVehicle, chassis: chassisApiResponse, verifyVehicleError, verifyVehicleInProgress} =
    useSelector(state => state.EditListingPage);

  const handleVerifyVehicle = params => onVerifyVechile(params);
  const handleVerifyChassis = chassis => onVerifyChassis(chassis);
  const handleVerifyMarketValue = licenseplate => onVerifyMarketValue(licenseplate);

  const handleSubmit = (values) => {
    const {
      licenseplate,
      identification,
      color,
      model,
      make,
      marketValue,
      year,
      title = `${make} ${model} ${year}`,
      isFetched,
      chassis,
    } = values;
    const updateValues = {
      title: title,
      description,
      publicData: {
        licenseplate: licenseplate.trim(),
        identification: identification.trim(),
        color,
        model,
        make,
        year,
        marketValue: getMarketValue(marketValue, storeMarketValue, chassisApiResponse),
        isFetched,
        chassis,
      },
    };
    onSubmit(updateValues);
  }

  const initialValues = {
    licenseplate,
    identification,
    color,
    model,
    make,
    year,
    marketValue,
    isFetched,
    chassis,
  }

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        currentListing={currentListing}
        verifyVehicle={verifyVehicle}
        verifyVehicleError={verifyVehicleError}
        verifyVehicleInProgress={verifyVehicleInProgress}
        handleVerifyVehicle={handleVerifyVehicle}
        handleVerifyChassis={handleVerifyChassis}
        handleVerifyMarketValue={handleVerifyMarketValue}
        saveActionMsg={submitButtonText}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        chassis={chassisApiResponse}
        storeMarketValue={storeMarketValue?.data}
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
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

export default EditListingDescriptionPanel;
