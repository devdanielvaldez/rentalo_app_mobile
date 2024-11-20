import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button } from '../../components';

import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
// import { capitalizeFirstLetter } from '../../util/dataExtractors';
import SwitchButton from '../../components/SwitchButton';

import css from './EditListingAvailabilityForm.module.css';

/////////////
// Weekday //
/////////////
const WEEKDAYS = ['days', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export class EditListingAvailabilityFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            //intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
            values,
            form,
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;
          const allSelected =
            values &&
            WEEKDAYS.filter(w => (w == 'days' ? false : values[w])).length >= WEEKDAYS.length - 1;

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.availabilitySec}>
                <div className={css.setAvailabilty}>
                  <h2>Establecer horario semanal</h2>
                  <p>Establecer un horario semanal para los días y horarios en los que tu anuncio estará disponible</p>
                  <div className={css.timeContainer}>
                    <div className={css.allDaysContent}>
                      {availabilityPlan &&
                      availabilityPlan.entries &&
                      availabilityPlan.entries.length
                        ? WEEKDAYS.map(w => (
                            <div className={css.availability}>
                              <div className={css.availabilityLeft}>
                                <SwitchButton
                                  id={w}
                                  name={w}
                                  checked={w == 'days' ? allSelected : values[w]}
                                  onChange={value =>
                                    w == 'days'
                                      ? WEEKDAYS.map(we => form.change(we, value))
                                      : form.change(w, value)
                                  }
                                />
                                <label>
                                  <FormattedMessage
                                    id={`EditListingAvailabilityPanel.dayOfWeek.${w}`}
                                  />
                                </label>
                              </div>
                              <span className={css.availabilityRight}>Disponible</span>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
                <div className={css.calendarWrapper}>
                  <ManageAvailabilityCalendar
                    availability={availability}
                    availabilityPlan={availabilityPlan}
                    listingId={listingId}
                  />
                </div>
              </div>
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
