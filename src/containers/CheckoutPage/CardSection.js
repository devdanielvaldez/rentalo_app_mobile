import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import css from './CardSection.module.css';
import { Button, FieldCheckbox } from '../../components';

const CardSection = props => {
  const {
    onCreateCustomer,
    orderInProgress,
    saveText,
    inProgress,
    ready,
    checkBoxLabel,
    handlePaymentMethod,
    handleOrderSubmit,
  } = props;

  const stripe = useStripe();
  const elements = useElements();

  const [isSaveChecked, setChecked] = useState(false);
  const [isCardEnabled, setCardEnable] = useState(false);

  const handleCardChange = e => {
    const isComplete = e && e.complete;
    if (isComplete) {
      setCardEnable(true);
    } else {
      setCardEnable(false);
    }
  };

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

    const card = await stripe.createToken(elements.getElement(CardElement));

    if (isSaveChecked) {
      onCreateCustomer({ paymentMethod: payload.paymentMethod, isSaveChecked, card });
    } else {
      handlePaymentMethod(payload.paymentMethod, card?.token);
    }
    handleOrderSubmit(card?.token);
  };

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

  return (
    <form className={css.addCardForm} onSubmit={handleSubmit}>
      <label>Detalles de la tarjeta</label>
      <CardElement
        className={css.StripeElement}
        options={{
          style: {
            base: inputStyle,
          },
          invalid: {
            color: '#9e2146',
          },
        }}
        onChange={handleCardChange}
      />
      <div className={css.radioBoxWrap}>
        <label for="saveCard">{checkBoxLabel}</label>
        <input
          type="checkbox"
          id="saveCard"
          className={css.textInputRow}
          name="saveCard"
          onChange={() => setChecked(!isSaveChecked)}
        />
      </div>
      <Button
        inProgress={inProgress || orderInProgress}
        ready={ready}
        type="submit"
        disabled={!isCardEnabled}
        className={css.submitBtn}
      >
        {saveText ? 'Save Card' : 'Pay'}
      </Button>
    </form>
  );
};

export default CardSection;
