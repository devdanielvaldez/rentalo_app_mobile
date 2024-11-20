import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';

import * as validators from '../../util/validators';
import { injectIntl, intlShape } from '../../util/reactIntl';

import { Form, FieldTextInput, Button } from '../../components';

import css from './SubscribeEmailForm.module.css';

const SubscribeEmailFormComponent = props => {
  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          rootClassName,
          className,
          formId,
          handleSubmit,
          inProgress,
          intl,
          invalid,
        } = fieldRenderProps;

        // email
        const emailRequiredMessage = intl.formatMessage({
          id: 'SubscribeEmailForm.emailRequired',
        });
        const emailRequired = validators.required(emailRequiredMessage);
        const emailInvalidMessage = intl.formatMessage({
          id: 'SubscribeEmailForm.emailInvalid',
        });
        const emailValid = validators.emailFormatValid(emailInvalidMessage);

        const classes = classNames(rootClassName || css.root, className);
        const submitInProgress = inProgress;
        const submitDisabled = invalid || submitInProgress;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <FieldTextInput
              className={css.email}
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name={'email'}
              placeholder={'Escribe tu correo'}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
            <Button
              className={css.button}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
            >
              Suscribirme
            </Button>
          </Form>
        );
      }}
    />
  );
};

SubscribeEmailFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

SubscribeEmailFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const LoginForm = compose(injectIntl)(SubscribeEmailFormComponent);
LoginForm.displayName = 'LoginForm';

export default LoginForm;
