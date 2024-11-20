import React from 'react';
import { Button } from '../../../components';

function LastStep(props) {
  const { onClose } = props;
  return (
    <div>
      Thankyou for verification.
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}

export default LastStep;
