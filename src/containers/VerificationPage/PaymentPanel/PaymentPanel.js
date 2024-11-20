import React, { useState } from 'react';
import { bool, func, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { savePaymentMethod, deletePaymentMethod } from '../../../ducks/paymentMethods.duck';
import { handleCardSetup } from '../../../ducks/stripe.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../../ducks/UI.duck';
import {
  createStripeSetupIntent,
  stripeCustomer,
  attachPaymentMethod,
  detachPaymentMethod,
} from '../../PaymentMethodsPage/PaymentMethodsPage.duck.js';

import { getPaymentMethod } from '../../../util/dataExtractors';
import CustomCardElement from '../../../components/CustomCardElement/CustomCardElement';
import Modal from '../../../components/Modal/Modal';

import css from './PaymentPanel.module.css';


const PaymentPanelComponent = props => {
  const [showChangeCard, setChangeCard] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const {
    currentUser,
    onManageDisableScrolling,
    intl,
    handleAttachPaymentMethod,
    handleDetachPaymentMethod,
    attachmentInProgress,
    attached,
    detached,
    isDriver,
    goToStep,
    nextStep,
    previousStep,
    accountNotVerified,
    history,
    attachmentError
  } = props;

  const title = intl.formatMessage({ id: 'PaymentPanel.title' });

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);

    if (!accountNotVerified) {
      history.push('/s')
    }
  }

  const cardData = getPaymentMethod(currentUser);
  return (
    <div className={css.content}>
      <h1 className={css.title}>{title}</h1>
      <CustomCardElement
        cardData={cardData}
        showChangeCard={showChangeCard}
        attached={attached}
        detached={detached}
        setChangeCard={setChangeCard}
        handleAttachPaymentMethod={handleAttachPaymentMethod}
        handleDetachPaymentMethod={handleDetachPaymentMethod}
        attachmentInProgress={attachmentInProgress}
        previousStep={previousStep}
        goToStep={goToStep}
        nextStep={nextStep}
        isVerificationPage={true}
        btnHolderClassName={css.buttonsHolder}
        prevNextBtnClassName={css.button}
        isDriver={isDriver}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        attachmentError={attachmentError}
      />



      {isDriver && !accountNotVerified && <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          handleCloseModal()
        }}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div className={css.modalContent}>
          <h2 className={css.modalTitle}>¡Felicidades!</h2>
          <div className={css.modalText}>
            <p>Tu cuenta está ahora verificada.</p>
            <p>Puedes comenzar a hacer reservas.</p>
          </div>

        </div>
      </Modal>}
    </div>
  );
};

PaymentPanelComponent.defaultProps = {
  currentUser: null,
  addPaymentMethodError: null,
  deletePaymentMethodError: null,
  createStripeCustomerError: null,
  handleCardSetupError: null,
};

PaymentPanelComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  addPaymentMethodError: object,
  deletePaymentMethodError: object,
  createStripeCustomerError: object,
  handleCardSetupError: object,
  onCreateSetupIntent: func.isRequired,
  onHandleCardSetup: func.isRequired,
  onSavePaymentMethod: func.isRequired,
  onDeletePaymentMethod: func.isRequired,
  fetchStripeCustomer: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;

  const {
    deletePaymentMethodInProgress,
    addPaymentMethodError,
    deletePaymentMethodError,
    createStripeCustomerError,
  } = state.paymentMethods;

  const {
    stripeCustomerFetched,
    attachmentInProgress,
    attached,
    detachmentInProgress,
    detached,
    attachmentError,
  } = state.PaymentMethodsPage;

  const { handleCardSetupError } = state.stripe;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    deletePaymentMethodInProgress,
    addPaymentMethodError,
    deletePaymentMethodError,
    createStripeCustomerError,
    handleCardSetupError,
    stripeCustomerFetched,
    attachmentInProgress,
    attached,
    detachmentInProgress,
    detached,
    attachmentError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  fetchStripeCustomer: () => dispatch(stripeCustomer()),
  onHandleCardSetup: params => dispatch(handleCardSetup(params)),
  onCreateSetupIntent: params => dispatch(createStripeSetupIntent(params)),
  onSavePaymentMethod: (stripeCustomer, newPaymentMethod) =>
    dispatch(savePaymentMethod(stripeCustomer, newPaymentMethod)),
  onDeletePaymentMethod: params => dispatch(deletePaymentMethod(params)),
  handleAttachPaymentMethod: params => dispatch(attachPaymentMethod(params)),
  handleDetachPaymentMethod: () => dispatch(detachPaymentMethod()),
});

const PaymentPanel = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(PaymentPanelComponent);

export default PaymentPanel;
