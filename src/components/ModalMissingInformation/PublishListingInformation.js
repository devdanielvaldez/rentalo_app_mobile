import React from 'react';
// import css from './ModalMissingInformation.module.css';
import css from './PublishListing.module.css';
import { FormattedMessage } from 'react-intl';
import { PrimaryButton } from '../Button/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { removePendingApprovalModal } from '../../containers/EditListingPage/EditListingPage.duck';
import classNames from 'classnames';
const PublishListingInformation = ({ className, listingData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className={css.modalContent}>
      <h2 className={css.modalTitle}>
        <FormattedMessage id="ModalMissingInformation.PublishListingInformation.pendingApprovalTitle" />
      </h2>
      <div className={css.modalText}>
        <p>
          <FormattedMessage id="ModalMissingInformation.PublishListingInformation.pendingApprovalText" />
        </p>
      </div>
      <button
        className={classNames(css.button, css.closeModalBtn)}
        onClick={() => {
          dispatch(removePendingApprovalModal());
          history.push(`/l/draft/${listingData?.id?.uuid}/pending-approval`);
        }}
      >
        <FormattedMessage id="ModalMissingInformation.PublishListingInformation.closeLabel" />
      </button>
      {/* <div className={css.bottomWrapper}>
        <PrimaryButton
          className={css.primaryButton}
          onClick={() => {
            dispatch(removePendingApprovalModal());
            history.push(`/l/draft/${listingData?.id?.uuid}/pending-approval`);
          }}
        >
          <FormattedMessage id="ModalMissingInformation.PublishListingInformation.closeLabel" />
        </PrimaryButton>
      </div> */}
    </div>
  );
};

export default PublishListingInformation;
