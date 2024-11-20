import React, { useEffect } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../../util/reactIntl';
import css from '../VerificationPage.module.css';
import PayoutDetailsForm from './PayoutDetailsForm';

const BankAccountPanel = props => {
  const {
    className,
    rootClassName,
    nextStep,
    currentUser,
    previousStep,
    onGetOdooBanks,
    banks = [],
    banksInProgress,
    onAssignBankAccountToContact,
    attachBankToAccountInProgress,
    attachBankToAccountError,
    onUpdateBankAccountInContact,
    attachBankToAccountSuccess,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const panelTitle = <FormattedMessage id="PayoutDetailsForm.payoutDetails" />;

  const {
    bankName,
    country,
    odoo_bank_account_id,
  } = currentUser?.attributes?.profile?.privateData ?? {};

  const handleSubmit = (formValues) => {
    const odooUserId = currentUser.attributes.profile.privateData?.odoo_user_id;
    const odooBankAccountId = currentUser.attributes.profile.privateData?.odoo_bank_account_id;

    const {
      banksNames,
      bankAccountNumber,
      routingNumber,
      iban,
      country,
    } = formValues;

    const payload = {
      "partner_id": odooUserId,
      "currency_id": 2, // ???
      country: country,
    }

    if (banksNames) {
      payload.bank_id = +banksNames;
      payload.bankName = banks.find(({id}) => id === +banksNames)?.name ?? null;
    }
    if (routingNumber) {
      payload.x_studio_x_routing_number = routingNumber;
    }
    if (iban) {
      payload.acc_number = iban;
    }
    if (bankAccountNumber) {
      payload.acc_number = bankAccountNumber
    }

    return odooBankAccountId
      ? onUpdateBankAccountInContact({ ...payload, odooBankAccountId })
      : onAssignBankAccountToContact(payload);
  }

  const initialValues = {
    country: country,
    routingNumber: country === "United States" ? "●●●●●●●●●●" : undefined,
    bankAccountNumber: country === "Dominican Republic" || country === "United States" ? "●●●●●●●●●●" : undefined,
    iban: country && country !== "United States" && country !== "Dominican Republic" ? "●●●●●●●●●●" : undefined,
    banksNames: banks.find(({name}) => name === bankName)?.id.toString(),
  }

  useEffect(() => {
    if (bankName && !banks.length && !banksInProgress) {
      onGetOdooBanks();
    }
  }, []);

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <PayoutDetailsForm
        initialValues={initialValues}
        bankAccountId={odoo_bank_account_id}
        banks={banks}
        banksInProgress={banksInProgress}
        attachBankToAccountInProgress={attachBankToAccountInProgress}
        onSubmit={(values, form) => {
          handleSubmit(values)
            .then(() => {
              form.reset({
                country: values.country,
                routingNumber: values.routingNumber ? "●●●●●●●●●●" : undefined,
                bankAccountNumber: values.bankAccountNumber ? "●●●●●●●●●●" : undefined,
                iban: values.iban ? "●●●●●●●●●●" : undefined,
                banksNames: values.banksNames,
              });
              nextStep();
            })
            .catch((e) => console.log(e))
        }}
        onGetOdooBanks={onGetOdooBanks}
        previousStep={previousStep}
        prevNextBtnClassName={css.button}
        attachBankToAccountSuccess={attachBankToAccountSuccess}
        nextStep={nextStep}
      />

      {attachBankToAccountError && attachBankToAccountError.message
        ? <p className={css.error}>{attachBankToAccountError.message}</p>
        : null
      }
    </div>
  );
};

export default BankAccountPanel;
