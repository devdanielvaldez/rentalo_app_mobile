import React from 'react';
import { func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import { intlShape, injectIntl, } from '../../../util/reactIntl';

import {
  Form,
  Button,
  FieldTextInput,
  FieldCheckboxGroup, FieldSelect,
} from '../../../components';
import css from '../VerificationPage.module.css';
import * as validators from "../../../util/validators";
import arrayMutators from 'final-form-arrays';


const InsuranceFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        updated,
        updateInProgress,
      } = formRenderProps;


      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const required = validators.required(
        intl.formatMessage({
          id: 'InsuranceForm.required',
        })
      );

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div className={css.row}>
            <FieldTextInput
              className={css.inputBox}
              name={'field1'}
              id={`field1`}
              type="text"
              label={"Field1"}
              placeholder={'field1'}
              validate={required}
            />
            <FieldTextInput
              className={css.inputBox}
              name={'field2'}
              id={`field2`}
              type="text"
              label={"Field2"}
              placeholder={'field2'}
              validate={required}
            />
          </div>

          <div className={css.row}>
            <FieldTextInput
              className={css.inputBox}
              name={'field3'}
              id={`field3`}
              type="text"
              label={"Field3"}
              placeholder={'field3'}
              validate={required}
            />
            <FieldTextInput
              className={css.inputBox}
              name={'field4'}
              id={`field4`}
              type="text"
              label={"Field4"}
              placeholder={'field4'}
              validate={required}
            />
          </div>



          <h3>Title2</h3>
          <FieldCheckboxGroup
            className={css.fieldCheckbox}
            id={'field5'}
            name={'field5'}
            options={[{key: '1', label: '1'}, {key: '1', label: '1'}, {key: '1', label: '1'}, {key: '1', label: '1'}, {key: '1', label: '1'}]}
            validate={required}
          />
          <h3>Title3</h3>
          <FieldSelect
            id='field6'
            name='field6'
            label={'Field6'}
            className={classNames(css.fieldSelect, css.fieldSelectShort)}
            validate={required}
          >
            <option value="" hidden disabled>
              Placeholder
            </option>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
          </FieldSelect>

          <FieldSelect label={'Field7'} id='field7' name='field7' className={classNames(css.fieldSelect, css.fieldSelectShort)} validate={required}>
            <option value="" hidden disabled>
              Placeholder
            </option>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
          </FieldSelect>

          <FieldSelect label={'Field8'} id='field8' name='field8' className={classNames(css.fieldSelect, css.fieldSelectShort)} validate={required}>
            <option value="" hidden disabled>
              Placeholder
            </option>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
          </FieldSelect>

          <FieldSelect label={'Field9'} id='field9' name='field9' className={classNames(css.fieldSelect)} validate={required}>
            <option value="" hidden disabled>
              Placeholder
            </option>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
          </FieldSelect>


          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            Next
          </Button>


        </Form>
      );
    }}
  />
);

InsuranceFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
};

InsuranceFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
};

export default compose(injectIntl)(InsuranceFormComponent);
