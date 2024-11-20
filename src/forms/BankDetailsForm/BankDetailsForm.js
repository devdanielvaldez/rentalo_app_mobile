import React from 'react';
import { func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';;
import { required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldSelect } from '../../components';
import { bankNames } from '../../marketplace-custom-config';

import css from './BankDetailsForm.module.css';
import { countryCodes } from '../../translations/countryCodes';

const BankDetailsFormComponent = props => (
    <FinalForm
        {...props}
        render={formRenderProps => {
            const {
                className,
                handleSubmit,
                intl,
                validateText,
                saveText,
                inProgress,
                invalid,
                disabled,
            } = formRenderProps;

            const classes = classNames(css.root, className);

            const accountMessage = intl.formatMessage({
                id: 'BankDetailsForm.account',
            });

            const accountRequiredMessage = intl.formatMessage({
                id: 'BankDetailsForm.accountRequired',
            });

            const bankPlaceholderMessage = intl.formatMessage({
                id: 'BankDetailsForm.bankPlaceholder',
            });

            const submitInProgress = inProgress;
            const submitDisabled = invalid || disabled || submitInProgress;

            return (
                <Form className={classes} onSubmit={handleSubmit}>
                    <div className={css.rowBox}>
                        <FieldSelect
                            className={css.fieldSelect}
                            id="bank"
                            name="bank"
                            label="Nombre del banco"
                            validate={required(validateText)}>
                            <option value="" disabled>
                                {bankPlaceholderMessage}
                            </option>
                            {bankNames.map((item) => (
                                <option key={item.key} value={item.label}>{item.label}</option>
                            ))}
                        </FieldSelect>
                        <FieldSelect
                            className={css.inputBox}
                            name={'country'}
                            id={'country'}
                            label={'country'}
                            validate={composeValidators(required('You need to select an option'))}
                        >
                            <option disabled value="">
                                {'Select an option'}
                            </option>
                            {countryCodes.map(c => (

                                <option key={c.es} value={c.es}>
                                    {c.es}
                                </option>
                            ))}
                        </FieldSelect>

                        <FieldTextInput
                            id="accountNumber"
                            name="accountNumber"
                            className={css.inputBox}
                            type="text"
                            label={accountMessage}
                            validate={composeValidators(required(accountRequiredMessage))}
                        />
                        <FieldTextInput
                            id="routingNumber"
                            name="routingNumber"
                            className={css.inputBox}
                            type="text"
                            label={"Routing Number"}
                        />

                        <Button type="submit" inProgress={inProgress} disabled={submitDisabled}>
                            {saveText}
                        </Button>
                    </div>
                </Form>
            );
        }}
    />
);

BankDetailsFormComponent.defaultProps = {
    className: null,
    validateText: 'This field is required',
    saveText: "Save"
};
BankDetailsFormComponent.propTypes = {
    className: string,
    intl: intlShape.isRequired,
    onSubmit: func.isRequired,
};

export default compose(injectIntl)(BankDetailsFormComponent);
