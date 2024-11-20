import React from 'react';
import verifiedIcon from './verified.png';
import { FormattedMessage } from '../../util/reactIntl';

import css from './VerificationComplete.module.css';

function VerificationComplete() {
  return (
    <div className={css.verificationCompleteSec}>
      <img src={verifiedIcon} alt="Verification Complete" />
      <p>
        <FormattedMessage id="VerificationComplete.complete" />
      </p>
    </div>
  );
}

export default VerificationComplete;
