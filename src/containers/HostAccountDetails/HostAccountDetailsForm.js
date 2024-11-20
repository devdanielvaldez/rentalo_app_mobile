import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { Form, FieldTextInput } from '../../components';
import css from './HostAccountDetailsForm.module.css';
import { Button } from '@mui/material';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import '../../styles/phoneNumberInput.css';
import { isValidPhoneNumber } from 'react-phone-number-input';


class HostAccountDetailsFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerificationEmailSentMessage: false,
            showResetPasswordMessage: false,
            verificationStatus: null,
            valid: null,
            checkedOnce: false
        };
        this.emailSentTimeoutId = null;
        this.submittedValues = {};
    }

    render() {
        return (
            <>
                <FinalForm
                    {...this.props}
                    render={fieldRenderProps => {
                        const {
                            rootClassName,
                            className,
                            currentUser,
                            formId,
                            handleSubmit,
                            inProgress,
                            intl,
                            invalid,
                            values,
                            form,
                            handleSendCode,
                            hostPhoneNumber,
                            isHostVerifiedNumber,
                        } = fieldRenderProps;


                        const { phoneNumber } = values;

                        const user = ensureCurrentUser(currentUser);

                        // phone
                        const phonePlaceholder = intl.formatMessage({
                            id: 'ContactDetailsForm.phonePlaceholder',
                        });
                        const phoneLabel = intl.formatMessage({
                            id: 'ContactDetailsForm.phoneLabel'
                        });
                        const classes = classNames(rootClassName || css.root, className);
                        const submitDisabled = ""



                        form.change('phoneNumber', this.state.phoneNumberState)
                        const checkphoneNumber = (form) => {
                            if (this.state.phoneNumberState && !this.state.checkedOnce) {
                                const formatedNumber = formatPhoneNumberIntl(phoneNumber);
                                if (isValidPhoneNumber(formatedNumber)) {
                                    this.setState({
                                        valid: true,
                                        checkedOnce: true
                                    });
                                } else {
                                    this.setState({
                                        valid: false,
                                        checkedOnce: true
                                    });
                                }
                            }
                        };

                        return (
                            <Form
                                className={classes}
                                onSubmit={e => {
                                    this.submittedValues = values;
                                    handleSubmit(e);
                                }}
                            >
                                <div className={css.contactDetailsSection}>

                                    <div className={css.numberBoxMainWrap}>
                                        <h3>Número de teléfono</h3>

                                        {isHostVerifiedNumber ?
                                            <div>
                                                <FieldTextInput
                                                    type="verifiedNumber"
                                                    name="verifiedNumber"
                                                    readOnly
                                                    id={formId ? `${formId}.verifiedNumber` : 'verifiedNumber'}
                                                    label={'Phone number'}
                                                    placeholder={phonePlaceholder}
                                                    className={css.emailInput}
                                                />
                                                <span style={{color:"#2ecc71"}}>
                                                Tu número de teléfono ha sido verificado.

                                                </span>
                                            </div>
                                            :
                                            <PhoneInput
                                                className={css.inputNumberBox}
                                                name="phoneNumber"
                                                defaultCountry="DO"
                                                id={formId ? `${formId}.phoneNumber` : 'phoneNumber'}
                                                placeholder={phonePlaceholder}
                                                value={phoneNumber}
                                                label={phoneLabel}
                                                onChange={phone => {
                                                    this.setState({ phoneNumberState: phone });
                                                }}
                                                onBlur={checkphoneNumber(form)}
                                            />}
                                    </div>
                                    {/* {isHostVerifiedNumber ? null : <Button onClick={() => handleSendCode(values.phoneNumber)} className={css.sendOtp}>Send otp</Button>} */}
                                </div>
                                <p className={css.textMessage}>Para actualizar el número de teléfono,
                                    por favor contacta nuestro equipo de soporte al cliente.</p>
                            </Form>
                        );
                    }}
                />
            </>
        );
    }
}

HostAccountDetailsFormComponent.defaultProps = {
    rootClassName: null,
    className: null,
    formId: null,
    saveEmailError: null,
    savePhoneNumberError: null,
    inProgress: false,
    sendVerificationEmailError: null,
    sendVerificationEmailInProgress: false,
    email: null,
    phoneNumber: null,
    resetPasswordInProgress: false,
    resetPasswordError: null,
};

const { bool, func, string } = PropTypes;

HostAccountDetailsFormComponent.propTypes = {
    rootClassName: string,
    className: string,
    formId: string,
    saveEmailError: propTypes.error,
    savePhoneNumberError: propTypes.error,
    inProgress: bool,
    intl: intlShape.isRequired,
    onResendVerificationEmail: func.isRequired,
    ready: bool.isRequired,
    sendVerificationEmailError: propTypes.error,
    sendVerificationEmailInProgress: bool,
    onManageDisableScrolling: func.isRequired,
    resetPasswordInProgress: bool,
    resetPasswordError: propTypes.error,
};

const HostAccountDetailsForm = compose(injectIntl)(HostAccountDetailsFormComponent);

HostAccountDetailsForm.displayName = 'HostAccountDetailsForm';

export default HostAccountDetailsForm;
