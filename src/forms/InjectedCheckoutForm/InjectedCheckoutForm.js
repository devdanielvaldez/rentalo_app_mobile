import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, PrimaryButton } from '../../components';
import css from './InjectedCheckoutForm.module.css';
import { FormattedMessage } from '../../util/reactIntl';
import { isEmpty } from 'lodash';

const inputStyle = {
  fontFamily: '"Nunito", sans-serif',
  fontSize: '14px',
  fontSmoothing: 'antialiased',
  lineHeight: '24px',
  letterSpacing: '-0.1px',
  color: '#4A4A4A',
  '::placeholder': {
    color: '#B2B2B2',
  },
};

const InjectedCheckoutForm = props => {
  const {
    handleAttachPaymentMethod,
    orderInProgress,
    saveText,
    inProgress,
    ready,
    isVerificationPage,
    btnHolderClassName,
    prevNextBtnClassName,
    previousStep,
    // nextStep,
    // goToStep,
    isDriver,
    handleOpenModal,
    // handleCloseModal,
    attachmentError
  } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [isSaveChecked] = useState(false);

  const error = <FormattedMessage id='PaymentPanel.error' />;


  // const handleSaveCard = e => {
  //   setChecked(!isSaveChecked);
  // };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    handleAttachPaymentMethod(payload, isSaveChecked).then(() => {
      // handleOpenModal(true)
      window.location.href = localStorage.getItem('currentPath');
    });
  };

  return (
    <form className={css.addCardForm} onSubmit={handleSubmit}>
      <label>Detalles de la tarjeta</label>
      <CardElement
        options={{
          style: {
            base: inputStyle,
          },
          invalid: {
            color: '#9e2146',
          },
        }}
      />
      {/* {isCheckout ? <FieldCheckbox id="saveCard" name="saveCard" label="Save this card for future payments?" checked={isSaveChecked} value="true" onChange={handleSaveCard}/> : null} */}
      {!isVerificationPage && <Button
        inProgress={inProgress || orderInProgress}
        ready={ready}
        type='submit'
        disabled={!stripe}
      >
        {saveText ? 'Save Card' : 'Pay'}
      </Button>}

      {attachmentError && <p className={css.error}>{attachmentError?.raw?.message}</p>}
      {attachmentError && isEmpty(attachmentError) && <p className={css.error}>{error}</p>}


      {isVerificationPage ? (
        <div className={btnHolderClassName}>
          <span className={prevNextBtnClassName} onClick={() => previousStep()}>
            Regresar
          </span>

          <PrimaryButton
            inProgress={inProgress || orderInProgress}
            ready={ready}
            type='submit'
            disabled={!stripe}
            className={prevNextBtnClassName}
            // onClick={() => {
            //   isDriver ? goToStep(1) : nextStep();
            // }}
          >
            {isDriver ? 'Finalizar verificación' : 'Continuar verificación'}
          </PrimaryButton>
        </div>
      ) : null}
    </form>
  );
};

export default InjectedCheckoutForm;
