import React from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

function DocuForm({
  // avatarUrl,
  // userRoleName,
  // includeMoreInfo = true,
  text,
  // userFlowText,
  includePhone,
  onSubmit,
  placeholderName,
  // nameLabel,
  submitted = false,
}) {
  // let navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const ErrorMessageContainer = ({ children }) => (
  //   <div className="error">{children}</div>
  // );

  return (
    <>
      <div className="form-holder">
        {/* <UserProfile
          buttonName={text.moreInfoName}
          avatarUrl={avatarUrl}
          userRoleName={userRoleName}
          includeMoreInfo={includeMoreInfo}
          popUpOpen={isOpen}
          setPopUpOpen={setIsOpen}
        /> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* If a placeholderName was given, then only display the full placeholder name.
          Otherwise, display first and last name text boxes. */}
          {false ? (
            <>
              <label>{"Name"}</label>
              <input
                readOnly
                type="text"
                placeholder={placeholderName}
                defaultValue={placeholderName}
                {...register('fullName', {
                  required: {
                    value: true,
                    message: text.requiredFieldError,
                  },
                  maxLength: { value: 30, message: text.inputTooLongError },
                })}
              />
            </>
          ) : (
            <>
            <h3>First name</h3>
              <input
                type="text"
                {...register('firstName', {
                  required: {
                    value: true,
                    message: text.requiredFieldError,
                  },
                  maxLength: { value: 30, message: text.inputTooLongError },
                })}
              />
                          <h3>Last name</h3>

              <input
                type="text"
                {...register('lastName', {
                  required: {
                    value: true,
                    message: text.requiredFieldError,
                  },
                  maxLength: { value: 50, message: text.inputTooLongError },
                })}
              />
            </>
          )}

          {/* If includePhone is true, then display the phone field only. Otherwise, display the
         email field. */}
          {includePhone ? (
            <>
              <input
                type="text"
                placeholder="1"
                {...register('countryCode', {
                  required: {
                    value: true,
                    message: text.requiredFieldError,
                  },
                  // Use regex string to validate country code
                  pattern: {
                    value: /^([+]?\d+)$/,
                    message: text.invalidCountryCodeError,
                  },
                })}
              />
                          <h3>PhoneNumber</h3>

              <input
                type="tel"
                placeholder={text.phonePlaceholder}
                {...register('phoneNumber', {
                  required: {
                    value: true,
                    message: text.requiredFieldError,
                  },
                  // Use regex string to validate phone number
                  pattern: {
                    value: /^(\d+-?)+\d+$/,
                    message: text.invalidPhoneNumberError,
                  },
                  maxLength: {
                    value: 11,
                    message: text.invalidPhoneNumberError,
                  },
                  minLength: {
                    value: 8,
                    message: text.invalidPhoneNumberError,
                  },
                })}
              />
            </>
          ) : (
            <>
            <h3>Email</h3>
              <input
                type="text"
                {...register('signerEmail', {
                  required: {
                    value: true,
                    message: text.requiredFieldError,
                  },
                  // Use regex string to validate email
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: text.invalidEmailFormatError,
                  },
                })}
              />
            </>
          )}

          <div className="button-container">
            <button className="black-button" type="submit" disabled={submitted}>
              Submit
            </button>
            <button
              className="grey-button"
              onClick={() => {
                // navigate('/index');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* {isOpen && (
        <Popup
          text={userFlowText}
          handleClose={() => {
            setIsOpen(!isOpen);
          }}
        />
      )} */}
    </>
  );
}

export default DocuForm;
