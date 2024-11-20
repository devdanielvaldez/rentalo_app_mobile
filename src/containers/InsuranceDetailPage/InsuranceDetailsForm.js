import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import {
  Form,
  FieldTextInput,
  FieldCheckboxGroup,
  FieldSelect,
  PrimaryButton,
} from '../../components';
import css from './InsuranceDetailsForm.module.css';
import '../../styles/phoneNumberInput.css';
import config from '../../config';
import { workTypes } from '../../marketplace-custom-config';
import arrayMutators from 'final-form-arrays';
import { composeValidators, required, requiredFieldArrayCheckbox } from '../../util/validators';

const options = [
  { key: 'yes', label: 'Si' },
  { key: 'no', label: 'No' },
];

class InsuranceDetailsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <FinalForm
          {...this.props}
          mutators={{ ...arrayMutators }}

          render={fieldRenderProps => {
            const {
              rootClassName,
              className,
              currentUser,
              formId,
              handleSubmit,
              intl,
              values,
              form,
              inSubmitProgress,
              invalid,
              pristine,
              updated,
              ready,
              isVerificationPage,
              btnHolderClassName,
              prevNextBtnClassName,
              previousStep,
            } = fieldRenderProps;

            const professionRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const professionlabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.profession',
            });
            const occupationRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const occupationLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.occupationPosition',
            });
            const companyRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const companyLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.company',
            });
            const workAddressRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const workAddressLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.workAddress',
            });
            const workTypesRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const workTypesLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.workTypes',
            });
            const isPublicResourcesRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const isPublicResourcesLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.publicResources',
            });
            const publicResourcesDetailRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const specifyLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.pleaseSpecify',
            });
            const isPublicPowerRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const isPublicPowerLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.publicPower',
            });
            const publicPowerDetailRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const isPubliclyInfluentialDetailRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const isPubliclyInfluentialDetailLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.publiclyInfluential',
            });
            const publiclyInfluentialDetailRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const isAffirmativeRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });
            const isAffirmativeLabel = intl.formatMessage({
              id: 'InsuranceDetailsForm.affirmative',
            });
            const affirmativeDetailRequiredMessage = intl.formatMessage({
              id: 'InsuranceDetailsForm.fieldRequired',
            });

            const submitReady = (updated) || ready;

            const classes = classNames(rootClassName || css.root, className);
            const submitDisabled = invalid;

            return (
              <Form
                className={classes}
                onSubmit={e => {
                  this.submittedValues = values;
                  handleSubmit(e);
                }}
              >
                <div className={isVerificationPage ? null : css.contactDetailsSection}>
                  <div className={css.numberBoxMainWrap}>
                    <div className={css.formRow}>
                      <FieldTextInput
                        className={css.inputRow}
                        type='text'
                        name='profession'
                        id={formId ? `${formId}.profession` : 'profession'}
                        label={professionlabel}
                        placeholder={professionlabel}
                        validate={composeValidators(required(professionRequiredMessage))}

                      />
                      <FieldTextInput
                        className={css.inputRow}
                        type='text'
                        name='occupationPosition'
                        id={formId ? `${formId}.occupationPosition` : 'occupationPosition'}
                        label={occupationLabel}
                        placeholder={occupationLabel}
                        validate={composeValidators(required(occupationRequiredMessage))}
                      />
                    </div>
                    <div className={css.formRow}>
                      <FieldTextInput
                        className={css.inputRow}
                        type='text'
                        name='company'
                        id={formId ? `${formId}.company` : 'company'}
                        label={companyLabel}
                        placeholder={companyLabel}
                        validate={composeValidators(required(companyRequiredMessage))}

                      />
                      <FieldTextInput
                        className={css.inputRow}
                        type='text'
                        name='workAddress'
                        id={formId ? `${formId}.workAddress` : 'workAddress'}
                        label={workAddressLabel}
                        placeholder={workAddressLabel}
                        validate={composeValidators(required(workAddressRequiredMessage))}
                      />
                    </div>
                    <div className={css.checkBoxWrapper}>
                      <h2><FormattedMessage id='InsuranceDetailsForm.workTypes' /></h2>
                      <FieldCheckboxGroup
                        className={css.features}
                        id={'workTypes'}
                        name={'workTypes'}
                        options={workTypes}
                        validate={composeValidators(requiredFieldArrayCheckbox(workTypesRequiredMessage))}

                      />
                    </div>


                    {values && values?.workTypes && values.workTypes.findIndex((i) => i === 'Other') >= 0 ?
                      <FieldTextInput
                        type='text'
                        name='other'
                        id={formId ? `${formId}.other` : 'other'}
                        label={specifyLabel}
                        placeholder={specifyLabel}
                        validate={composeValidators(required(publicResourcesDetailRequiredMessage))}
                      />
                      : null}

                    <div>
                      <h2><FormattedMessage id='InsuranceDetailsForm.financialInformation' /></h2>
                      <div>
                        <div className={css.formRowSecond}>
                          <FieldSelect
                            id={`isPublicResources`}
                            name='isPublicResources'
                            className={css.inputRow}
                            label={isPublicResourcesLabel}
                            validate={composeValidators(required(isPublicResourcesRequiredMessage))}
                          >
                            <option value=''>
                              Por favor, seleccione:
                            </option>

                            {options.map((item, index) => (
                              <option value={item.key}>{item.label}</option>
                            ))}
                          </FieldSelect>
                          {values?.isPublicResources === 'yes' ?
                            <FieldTextInput
                              type='text'
                              className={css.inputRow}
                              name='publicResourcesDetail'
                              id={formId ? `${formId}.publicResourcesDetail` : 'publicResourcesDetail'}
                              label={specifyLabel}
                              placeholder={specifyLabel}
                              validate={composeValidators(required(publicResourcesDetailRequiredMessage))}
                            /> : null}
                        </div>
                        <div className={css.formRowSecond}>
                          <FieldSelect
                            id={`isPublicPower`}
                            name='isPublicPower'
                            className={css.inputRow}
                            label={isPublicPowerLabel}
                            validate={composeValidators(required(isPublicPowerRequiredMessage))}
                          >
                            <option value=''>
                              Por favor, seleccione:
                            </option>

                            {options.map((item, index) => (
                              <option value={item.key}>{item.label}</option>
                            ))}
                          </FieldSelect>
                          {values?.isPublicPower === 'yes' ?
                            <FieldTextInput
                              className={css.inputRow}
                              type='text'
                              name='publicPowerDetail'
                              id={formId ? `${formId}.publicPowerDetail` : 'publicPowerDetail'}
                              label={specifyLabel}
                              placeholder={specifyLabel}
                              validate={composeValidators(required(publicPowerDetailRequiredMessage))}

                            /> :
                            null}
                        </div>
                        <div className={css.formRowSecond}>
                          <FieldSelect
                            id={`isPubliclyInfluential`}
                            name='isPubliclyInfluential'
                            className={css.inputRow}
                            label={isPubliclyInfluentialDetailLabel}
                            validate={composeValidators(required(isPubliclyInfluentialDetailRequiredMessage))}
                          >
                            <option value=''>
                              Por favor, seleccione:
                            </option>

                            {options.map((item, index) => (
                              <option value={item.key}>{item.label}</option>
                            ))}
                          </FieldSelect>
                          {values?.isPubliclyInfluential === 'yes' ?
                            <FieldTextInput
                              type='text'
                              className={css.inputRow}
                              name='publiclyInfluentialDetail'
                              id={formId ? `${formId}.publiclyInfluentialDetail` : 'publiclyInfluentialDetail'}
                              label={specifyLabel}
                              placeholder={specifyLabel}
                              validate={composeValidators(required(publiclyInfluentialDetailRequiredMessage))}

                            /> : null}
                        </div>
                        <div className={css.lastRow}>
                          <FieldSelect
                            id={`isAffirmative`}
                            name='isAffirmative'
                            className={css.inputRow}
                            label={isAffirmativeLabel}
                            validate={composeValidators(required(isAffirmativeRequiredMessage))}

                          >
                            <option value=''>
                              Por favor, seleccione:
                            </option>
                            {options.map((item, index) => (
                              <option value={item.key}>{item.label}</option>
                            ))}
                          </FieldSelect>
                          {values.isAffirmative === 'yes' ? <FieldTextInput
                            type='text'
                            className={css.inputRow}
                            name='affirmativeDetail'
                            id={formId ? `${formId}.affirmativeDetail` : 'affirmativeDetail'}
                            label={specifyLabel}
                            placeholder={specifyLabel}
                            validate={composeValidators(required(affirmativeDetailRequiredMessage))}

                          /> : null}
                        </div>

                      </div>
                    </div>
                  </div>
                  {!isVerificationPage && <div>
                    <PrimaryButton
                      className={css.submitButton}
                      type='submit'
                      disabled={submitDisabled}
                      inProgress={inSubmitProgress}
                      // ready={submitReady}
                    >
                      <FormattedMessage id='InsuranceDetailsForm.saveButton' />
                    </PrimaryButton>
                  </div>}

                  {isVerificationPage && <div className={btnHolderClassName}>
                    <span className={prevNextBtnClassName} onClick={() => previousStep()}>
                      Regresar
                    </span>

                    <PrimaryButton
                      className={prevNextBtnClassName}
                      type='submit'
                      disabled={submitDisabled}
                      inProgress={inSubmitProgress}
                    >
                   Finalizar verificación
                    </PrimaryButton>
                  </div>}
                </div>
              </Form>
            );
          }}
        />
      </>
    );
  }
}

InsuranceDetailsFormComponent.defaultProps = {
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

InsuranceDetailsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  formId: string,
  filterConfig: config.custom.filters,
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  intl: intlShape.isRequired,
  onResendVerificationEmail: func.isRequired,
  ready: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  sendVerificationEmailInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,
  updated: bool.isRequired,
};

const InsuranceDetailsForm = compose(injectIntl)(InsuranceDetailsFormComponent);

InsuranceDetailsForm.displayName = 'InsuranceDetailsForm';

export default InsuranceDetailsForm;
