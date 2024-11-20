import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CustomSavedCardDetails from '../CustomSavedCardDetails/CustomSavedCardDetails';
import { InjectedCheckoutForm } from '../../forms';
import css from './CustomCardElement.module.css';

import cardIcon from './card.png';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CustomCardElement(props) {
  const {
    cardData,
    showChangeCard,
    attached,
    detached,
    setChangeCard,
    handleAttachPaymentMethod,
    handleDetachPaymentMethod,
    attachmentInProgress,
    isDriverApproval = false,
    isVerificationPage,
    btnHolderClassName,
    prevNextBtnClassName,
    previousStep,
    goToStep,
    nextStep,
    isDriver,
    handleOpenModal,
    handleCloseModal,
    attachmentError,
  } = props;

  return (
    <div className={css.cardSec}>
      {(cardData && cardData.id && !showChangeCard) || (attached && !detached) ? (
        <>
          <label htmlFor="paymentMethodSelector">Tarjeta de crédito o débito</label>
          <CustomSavedCardDetails
            className={css.paymentMethodSelector}
            card={cardData && cardData.card}
            onChange={() => setChangeCard(!showChangeCard)}
          />
          {isVerificationPage ? (
            <div className={btnHolderClassName}>
              <span className={prevNextBtnClassName} onClick={previousStep}>
                Regresar
              </span>
              <span
                className={prevNextBtnClassName}
                onClick={() => {
                  handleOpenModal(true);
                }}
              >
                {isDriver ? 'Finalizar verificación' : 'Continuar verificación'}
              </span>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {!isDriverApproval && (
            <div className={css.useSavedCard} onClick={() => setChangeCard(!showChangeCard)}>
              <img src={cardIcon} alt="Saved Card Icon" />
            </div>
          )}
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm
              handleAttachPaymentMethod={handleAttachPaymentMethod}
              saveText={true}
              handleDetachPaymentMethod={handleDetachPaymentMethod}
              inProgress={attachmentInProgress}
              ready={attached}
              previousStep={previousStep}
              goToStep={goToStep}
              nextStep={nextStep}
              isVerificationPage={isVerificationPage}
              btnHolderClassName={btnHolderClassName}
              prevNextBtnClassName={prevNextBtnClassName}
              isDriver={isDriver}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              attachmentError={attachmentError}
            />
          </Elements>
        </>
      )}
    </div>
  );
}

export default CustomCardElement;
