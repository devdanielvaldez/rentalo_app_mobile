import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { Form, LocationAutocompleteInput, FieldDateRangeInput } from '../../components';
import config from '../../config';
import './Dates.css';
import css from './TopbarSearchForm.module.css';

const identity = v => v;

Date.prototype.removeDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

Date.prototype.toSearchDate = function(days) {
  var date = new Date(this.valueOf());
  date.setHours(0);
  date.setMinutes(0);
  date.setMilliseconds(0);
  const year = date.getFullYear();
  const rowMonth = date.getMonth() + 1;
  const month = rowMonth < 10 ? '0' + rowMonth.toString() : rowMonth;
  const day = date.getDate();
  const fullDate = year + '-' + month + '-' + day;
  return fullDate;
};

class TopbarSearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.searchInput = null;
  }

  onChange(location) {
    // if (location.selectedPlace) {
    //   // Note that we use `onSubmit` instead of the conventional
    //   // `handleSubmit` prop for submitting. We want to autosubmit
    //   // when a place is selected, and don't require any extra
    //   // validations for the form.
    //   this.props.onSubmit({ location });
    //   // blur search input to hide software keyboard
    //   if (this.searchInput) {
    //     this.searchInput.blur();
    //   }
    // }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const {
            rootClassName,
            className,
            desktopInputRoot,
            intl,
            isMobile,
            unitType,
            values,
            isWhiteNav,
          } = formRenderProps;
          const classes = classNames(
            rootClassName,
            className,
            isWhiteNav ? css.whiteNavSearch : css.blackNavSearch
          );
          const desktopInputRootClass = desktopInputRoot || css.desktopInputRoot;

          const handleFormSubmit = e => {
            e.preventDefault();
            let finalValues = {};
            if (values.location) {
              finalValues.location = values.location;
            }

            if (values.bookingDates) {
              const startDate = values.bookingDates.startDate;
              const endDate = values.bookingDates.endDate.removeDays(1) ?? startDate.removeDays(1);
              finalValues.dates = startDate.toSearchDate() + ',' + endDate.toSearchDate();
            }
            this.props.onSubmit({ ...finalValues });
          };
          return (
            <Form
              className={classes}
              onSubmit={handleFormSubmit}
              enforcePagePreloadFor="SearchPage"
            >
              <div className={css.searchSec}>
                <div className={css.searchFieldSec}>
                  <label htmlFor="location">Dirección</label>
                  <Field
                    name="location"
                    format={identity}
                    render={({ input, meta }) => {
                      const { onChange, ...restInput } = input;

                      // Merge the standard onChange function with custom behaviur. A better solution would
                      // be to use the FormSpy component from Final Form and pass this.onChange to the
                      // onChange prop but that breaks due to insufficient subscription handling.
                      // See: https://github.com/final-form/react-final-form/issues/159
                      const searchOnChange = value => {
                        onChange(value);
                        this.onChange(value);
                      };

                      const searchInput = { ...restInput, onChange: searchOnChange };
                      return (
                        <LocationAutocompleteInput
                          className={isMobile ? css.mobileInputRoot : desktopInputRootClass}
                          iconClassName={isMobile ? css.mobileIcon : css.desktopIcon}
                          inputClassName={isMobile ? css.mobileInput : css.desktopInput}
                          predictionsClassName={
                            isMobile ? css.mobilePredictions : css.desktopPredictions
                          }
                          predictionsAttributionClassName={
                            isMobile ? css.mobilePredictionsAttribution : null
                          }
                          placeholder={intl.formatMessage({ id: 'TopbarSearchForm.placeholder' })}
                          closeOnBlur={!isMobile}
                          inputRef={node => {
                            this.searchInput = node;
                          }}
                          input={searchInput}
                          meta={meta}
                        />
                      );
                    }}
                  />
                </div>
                <FieldDateRangeInput
                  className={css.bookingDates}
                  name="bookingDates"
                  unitType={unitType}
                  startDateId={`bookingStartDate`}
                  startDateLabel="Desde"
                  endDateLabel="Hasta"
                  startDatePlaceholderText={'Desde'}
                  endDateId={`bookingEndDate`}
                  endDatePlaceholderText={'Hasta'}
                  // focusedInput={this.state.focusedInput}
                  // onFocusedInputChange={this.onFocusedInputChange}
                  format={identity}
                  // timeSlots={timeSlots}
                  useMobileMargins
                  // validate={composeValidators(
                  //   required(requiredMessage),
                  //   bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                  // )}
                  // disabled={fetchLineItemsInProgress}
                />
              </div>
              <button className={css.submitButton}>Buscar</button>
              <button className={css.mobileSearch}>Buscar vehículo</button>
            </Form>
          );
        }}
      />
    );
  }
}

const { func, string, bool } = PropTypes;

TopbarSearchFormComponent.defaultProps = {
  unitType: config.bookingUnitType,
  rootClassName: null,
  className: null,
  desktopInputRoot: null,
  isMobile: false,
};

TopbarSearchFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  desktopInputRoot: string,
  onSubmit: func.isRequired,
  isMobile: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const TopbarSearchForm = injectIntl(TopbarSearchFormComponent);

export default TopbarSearchForm;
