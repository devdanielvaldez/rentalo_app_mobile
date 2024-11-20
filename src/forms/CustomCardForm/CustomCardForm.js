import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '../../../components';
import css from '../CustomCardForm/CustomCardForm.moudle.css';

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

const options = {
  style: {
    base: inputStyle,
  },
  invalid: {
    color: '#9e2146',
  },
}

const CustomCardForm = props => {
  const { handleAttachPaymentMethod, saveText, ready } = props;
  const stripe = useStripe();
  const elements = useElements();
  const isSaveChecked = false;

  const [isCardEnabled, setCardEnable] = useState(false);

  const handleCardChange = e => {
    const isComplete = e && e.complete;
    if (isComplete) {
      setCardEnable(true);
    } else {
      setCardEnable(false);
    }
  };

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

    handleAttachPaymentMethod(payload, isSaveChecked);
  };


  return (
    <form className={css.addCardForm} onSubmit={handleSubmit}>
      <label>Detalles de la tarjeta</label>
      <CardElement
        options={options}
        onChange={handleCardChange}
      />
      {/* {isCheckout ? <FieldCheckbox id="saveCard" name="saveCard" label="Save this card for future payments?" checked={isSaveChecked} value="true" onChange={handleSaveCard}/> : null} */}
      {
        <Button ready={ready} type="submit" disabled={!isCardEnabled}>
          {saveText ? 'Save Card' : 'Pay'}
        </Button>
      }
    </form>
  );
};

export default CustomCardForm;
