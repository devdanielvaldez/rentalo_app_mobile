import moment from 'moment';
import { types as sdkTypes } from './sdkLoader';
import toPairs from 'lodash/toPairs';

const { LatLng, Money } = sdkTypes;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;

const isNonEmptyString = val => {
  return typeof val === 'string' && val.trim().length > 0;
};

/**
 * Validator functions and helpers for Final Forms
 */

// Final Form expects and undefined value for a successful validation
const VALID = undefined;

export const required = message => value => {
  if (typeof value === 'undefined' || value === null) {
    // undefined or null values are invalid
    return message;
  }
  if (typeof value === 'string') {
    // string must be nonempty when trimmed
    return isNonEmptyString(value) ? VALID : message;
  }
  return VALID;
};

export const requiredStringNoTrim = message => value => {
  return typeof value === 'string' && value.length > 0 ? VALID : message;
};

// DEPRECATED in favor of required
export const requiredBoolean = message => value => {
  return typeof value === 'boolean' ? VALID : message;
};

// DEPRECATED in favor of required
export const requiredAndNonEmptyString = message => value => {
  return isNonEmptyString(value) ? VALID : message;
};

export const requiredFieldArrayCheckbox = message => value => {
  if (!value) {
    return message;
  }

  const entries = toPairs(value);
  const hasSelectedValues = entries.filter(e => !!e[1]).length > 0;
  return hasSelectedValues ? VALID : message;
};

export const minLength = (message, minimumLength) => value => {
  const hasLength = value && typeof value.length === 'number';
  return hasLength && value.length >= minimumLength ? VALID : message;
};

export const maxNumber = (message, maxAmount) => value => {
  if (!value) {
    return VALID;
  }

  return Number(value) <= maxAmount ? VALID : message;
};

export const maxLength = (message, maximumLength) => value => {
  if (!value) {
    return VALID;
  }
  const hasLength = value && typeof value.length === 'number';
  return hasLength && value.length <= maximumLength ? VALID : message;
};

export const nonEmptyArray = message => value => {
  return value && Array.isArray(value) && value.length > 0 ? VALID : message;
};

export const autocompleteSearchRequired = message => value => {
  return value && value.search ? VALID : message;
};

export const autocompletePlaceSelected = message => value => {
  const selectedPlaceIsValid =
    value &&
    value.selectedPlace &&
    value.selectedPlace.address &&
    value.selectedPlace.origin instanceof LatLng;
  return selectedPlaceIsValid ? VALID : message;
};

export const bookingDateRequired = inValidDateMessage => value => {
  const dateIsValid = value && value.date instanceof Date;
  return !dateIsValid ? inValidDateMessage : VALID;
};

const isOneSymbol = string => {
  const letters = string.split('');
  const unique = new Set(letters);

  return unique.size === 1 && unique.has('●');
};

export const bankAccountNumber = inValidDateMessage => value => {
  if (isOneSymbol(value)) {
    return VALID;
  }
  const regex = new RegExp(/^[0-9]{9,18}$/);
  return value.length && regex.test(value) ? VALID : inValidDateMessage;
};

export const routingNumber = inValidDateMessage => value => {
  if (isOneSymbol(value)) {
    return VALID;
  }
  const routingNum = value.replace(/\s|-/g, '');
  if (routingNum.length !== 9 || isNaN(Number(routingNum))) {
    return inValidDateMessage;
  }

  let checksum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = Number(routingNum[i]);
    if (i % 3 === 0) {
      checksum += 3 * digit;
    } else if (i % 3 === 1) {
      checksum += 7 * digit;
    } else {
      checksum += digit;
    }
  }
  return checksum % 10 === 0 ? VALID : inValidDateMessage;
};

const mod97 = digits => {
  let checksum = Number(digits.slice(0, 2));
  let fragment;
  for (let offset = 2; offset < digits.length; offset += 7) {
    fragment = String(checksum) + digits.substring(offset, offset + 7);
    checksum = Number(fragment) % 97;
  }
  return checksum;
};

export const isValidIBAN = inValidDateMessage => value => {
  const CODE_LENGTHS = {
    AD: 24,
    AE: 23,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CR: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
    AL: 28,
    BY: 28,
    CR: 22,
    EG: 29,
    GE: 22,
    IQ: 23,
    LC: 32,
    SC: 31,
    ST: 25,
    SV: 28,
    TL: 23,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20,
  };

  if (isOneSymbol(value)) {
    return VALID;
  }

  const iban = value.replace(/\s/g, '').toUpperCase();
  const match = iban.match(/^([A-Z]{2})(\d{2})(.+)$/);
  if (!match || iban.length !== CODE_LENGTHS[match[1]]) {
    return inValidDateMessage;
  }
  const digits = (match[3] + match[1] + match[2]).replace(/[A-Z]/g, letter =>
    (letter.charCodeAt(0) - 55).toString()
  );
  const remainder = mod97(digits);
  return remainder === 1 ? VALID : inValidDateMessage;
};

export const bookingDatesRequired = (inValidStartDateMessage, inValidEndDateMessage) => value => {
  const startDateIsValid = value && value.startDate instanceof Date;
  const endDateIsValid = value && value.endDate instanceof Date;

  if (!startDateIsValid) {
    return inValidStartDateMessage;
  } else if (!endDateIsValid) {
    return inValidEndDateMessage;
  } else {
    return VALID;
  }
};

// Source: http://www.regular-expressions.info/email.html
// See the link above for an explanation of the tradeoffs.
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const emailFormatValid = message => value => {
  return value && EMAIL_RE.test(value) ? VALID : message;
};

export const moneySubUnitAmountAtLeast = (message, minValue) => value => {
  return value instanceof Money && value.amount >= minValue ? VALID : message;
};

const parseNum = str => {
  const num = Number.parseInt(str, 10);
  return Number.isNaN(num) ? null : num;
};

export const ageAtLeast = (message, minYears) => value => {
  const { year, month, day } = value;
  const dayNum = parseNum(day);
  const monthNum = parseNum(month);
  const yearNum = parseNum(year);

  // day, month, and year needs to be numbers
  if (dayNum !== null && monthNum !== null && yearNum !== null) {
    const now = moment();
    const age = new Date(yearNum, monthNum - 1, dayNum);
    const ageInYears = now.diff(moment(age), 'years', true);

    return age && age instanceof Date && ageInYears >= minYears ? VALID : message;
  }
  return message;
};

export const validBusinessURL = message => value => {
  if (typeof value === 'undefined' || value === null) {
    return message;
  }

  const disallowedChars = /[^-A-Za-z0-9+&@#/%?=~_|!:,.;()]/;
  const protocolTokens = value.split(':');
  const includesProtocol = protocolTokens.length > 1;
  const usesHttpProtocol = includesProtocol && !!protocolTokens[0].match(/^(https?)/);

  const invalidCharacters = !!value.match(disallowedChars);
  const invalidProtocol = !(usesHttpProtocol || !includesProtocol);
  // Stripe checks against example.com
  const isExampleDotCom = !!value.match(/^(https?:\/\/example\.com|example\.com)/);
  const isLocalhost = !!value.match(/^(https?:\/\/localhost($|:|\/)|localhost($|:|\/))/);
  return invalidCharacters || invalidProtocol || isExampleDotCom || isLocalhost ? message : VALID;
};

export const validSsnLast4 = message => value => {
  return value.length === 4 ? VALID : message;
};

export const validHKID = message => value => {
  // Accept value 000000000 for testing Stripe
  if (value.length === 9 && value.match(/([0]{9})/)) {
    return VALID;
  }

  // HKID format example: AB364912(5)
  // ID can start with one or two letters and the check digit in the end can be in brackets or not
  if (value.length < 8) {
    return message;
  }

  // Handle possible brackets in value
  if (value.charAt(value.length - 3) === '(' && value.charAt(value.length - 1) === ')') {
    value = value.substring(0, value.length - 3) + value.charAt(value.length - 2);
  }
  value = value.toUpperCase();

  // Check that pattern is correct and split value to array
  const hkidPattern = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
  const matchArray = value.match(hkidPattern);

  if (!matchArray) {
    return message;
  }

  const charPart = matchArray[1];
  const numPart = matchArray[2];
  const checkDigit = matchArray[3];

  // Calculate the checksum for character part.
  // Transfer letters to numbers so that A=10, B=11, C=12 etc.
  // If there is only one letter in the ID use 36 as the first value
  // Total calculation is weighted so that 1st digit is x9, 2nd digit x8, 3rd digit x7 etc.

  const strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let checkSum = 0;

  if (charPart.length === 2) {
    checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
    checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
  } else {
    checkSum += 9 * 36;
    checkSum += 8 * (10 + strValidChars.indexOf(charPart));
  }

  // Calculate the checksum for numeric part

  for (let i = 0, j = 7; i < numPart.length; i++, j--) {
    checkSum += j * numPart.charAt(i);
  }

  // Verify the check digit
  const remaining = checkSum % 11;
  let verify = remaining === 0 ? 0 : 11 - remaining;
  verify = verify.toString();
  const isValid = verify === checkDigit || (verify === 10 && checkDigit === 'A');

  return isValid ? VALID : message;
};

export const validSGID = message => value => {
  return value.length === 9 ? VALID : message;
};

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), VALID);

export const acceptMaxLengthWithoutDash = (message, maximumLength) => value => {
  if (!value) {
    return VALID;
  }
  const hasLength = value && typeof value.length === 'number';

  const result = hasLength && value.length < maximumLength ? VALID : message;
  return result;
};

export const aplhabitsNotAllow = message => value => {
  //accept only numbers
  const regex = new RegExp(/^[0-9]*$/);
  return regex.test(value) ? VALID : message;
};
