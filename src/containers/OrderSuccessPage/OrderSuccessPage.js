import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPaymentIntent } from '../../ducks/stripe.duck';

const OrderSuccessPage = ({ onCreatePaymentIntent }) => {
  const { paymentId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (paymentId) {
      onCreatePaymentIntent(paymentId)
        .then(() => {
          // Redirect to order details or another appropriate page
          history.push('/orders');
        })
        .catch(error => {
          console.error('Error completing order:', error);
          history.push('/checkout?error=payment-processing-failed');
        });
    }
  }, [paymentId]);

  return (
    <div>
      <h1>Processing your order...</h1>
      {/* Add loading spinner or other UI elements */}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onCreatePaymentIntent: paymentId => dispatch(createPaymentIntent(paymentId)),
});

export default connect(null, mapDispatchToProps)(OrderSuccessPage);