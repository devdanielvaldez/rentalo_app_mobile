import React from 'react';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { PrimaryButton, Form, FieldTextInput } from '../../components';
import { required, composeValidators, maxNumber } from '../../util/validators';

import css from './TransactionPanel.module.css';

const BOND_AMOUNT_FEE = (process.env.REACT_APP_BOND_AMOUNT_FEE ?? 0) * 5;

const DisputeModalContent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        rootClassName,
        disabled,
        handleSubmit,
        intl,
        formId,
        invalid,
        submitInProgress,
      } = fieldRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <FieldTextInput
            type="textarea"
            id={formId ? `${formId}.disputeReason` : 'disputeReason'}
            name="disputeReason"
            label={intl.formatMessage({ id: 'DisputeModalContent.disputeReasonLabel' })}
            placeholder={intl.formatMessage({
              id: 'DisputeModalContent.disputeReasonPlaceholderMessage',
            })}
            validate={required(
              intl.formatMessage({ id: 'DisputeModalContent.disputeReasonRequiredMessage' })
            )}
          />

          <FieldTextInput
            className={css.disputeAmount}
            id="disputeAmount"
            name="disputeAmount"
            disabled={disabled}
            label={intl.formatMessage({ id: 'DisputeModalContent.disputeAmountLabel' })}
            placeholder={intl.formatMessage({
              id: 'DisputeModalContent.disputeAmountPlaceholder',
            })}
            validate={composeValidators(
              required(
                intl.formatMessage({ id: 'DisputeModalContent.disputeReasonRequiredMessage' })
              ),
              maxNumber(
                intl.formatMessage(
                  { id: 'DisputeModalContent.disputeAmountToHigh' },
                  { maxDispute: BOND_AMOUNT_FEE }
                ),
                BOND_AMOUNT_FEE
              )
            )}
            type="number"
            min={0}
            max={BOND_AMOUNT_FEE}
            step="1"
          />

          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            {intl.formatMessage({
              id: 'DisputeModalContent.disputeSubmitMessage',
            })}
          </PrimaryButton>
        </Form>
      );
    }}
  />
);

export default DisputeModalContent;
