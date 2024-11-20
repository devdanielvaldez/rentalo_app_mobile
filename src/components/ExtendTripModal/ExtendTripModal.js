import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import css from './ExtendTripModal.module.css';
import Modal from '../Modal/Modal';
import BookingPanel from '../BookingPanel/BookingPanel';

const ExtendTripModal = props => {
  const {
    id,
    isOpen,
    onCloseModal,
    onManageDisableScrolling,
    titleClassName,
    listing,
    transaction,
    isOwnListing,
    unitType,
    onSubmit,
    title,
    authorDisplayName,
    timeSlots,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    extendTripInProgress,
    isTransactionPage,
    price,
    isApprovedToDrive,
    currentUser,
    authorId,
  } = props;

  return (
    <>
      <Modal
        id={id}
        isOpen={isOpen}
        onClose={onCloseModal}
        onManageDisableScrolling={onManageDisableScrolling}
        usePortal
        isExtendTripModalOpen={true}
        className={css.extendTripModal}
        modalTitle="Extender renta"
      >
        <BookingPanel
          className={css.bookingPanel}
          titleClassName={titleClassName}
          listing={listing}
          price={price}
          transaction={transaction}
          isOwnListing={isOwnListing}
          unitType={unitType}
          onSubmit={onSubmit}
          currentUser={currentUser}
          title={title}
          isApprovedToDrive={isApprovedToDrive}
          authorDisplayName={authorDisplayName}
          onManageDisableScrolling={onManageDisableScrolling}
          timeSlots={timeSlots}
          onFetchTransactionLineItems={onFetchTransactionLineItems}
          lineItems={lineItems}
          fetchLineItemsInProgress={fetchLineItemsInProgress}
          fetchLineItemsError={fetchLineItemsError}
          isExtend={true}
          inProgress={extendTripInProgress}
          isExtendTripModalOpen={true}
          isTransactionPage={isTransactionPage}
          isExtendTripModal={true}
          authorId={authorId}
        />
      </Modal>
    </>
  );
};

const { string } = PropTypes;

ExtendTripModal.defaultProps = {
  className: null,
  rootClassName: null,
};

ExtendTripModal.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
};

export default injectIntl(ExtendTripModal);
