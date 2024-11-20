import moment from 'moment';
import { TRANSITION_ACCEPT, TRANSITION_CUSTOMER_FULL_REFUND } from './transaction';
import { SERVICE_FEE } from './types';
import { types as sdkTypes } from '../util/sdkLoader';
const { REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY } = process.env;
const CONVERSION_VALUE = 60.30;
const { Money } = sdkTypes;

export const getStripeCustomer = currentUser => {
  return (
    currentUser && currentUser.id && currentUser?.attributes?.profile?.privateData?.stripeCustomer
  );
};

export const getPaymentMethod = currentUser => {
  return (
    !!currentUser &&
    !!currentUser?.id &&
    currentUser?.attributes?.profile?.privateData?.stripePaymentMethod
  );
};

export const getCardToken = currentUser => {
  return currentUser && currentUser.id && currentUser?.attributes?.profile?.privateData?.cardToken;
};

export const getMessageBody = msg => {
  return msg && msg.attributes && msg.attributes.content;
};

export const getAuthorName = msg => {
  return msg?.sender?.attributes?.profile?.displayName;
};

export const getHostData = currentUser => {
  return (
    currentUser && currentUser.id && currentUser?.attributes?.profile?.protectedData?.hostProfile
  );
};

export const getDriverLastStep = currentUser => {
  return (
    currentUser && currentUser.id && currentUser?.attributes?.profile?.protectedData?.lastDriverStep
  );
};

export const getHostLastStep = currentUser => {
  return (
    currentUser && currentUser.id && currentUser?.attributes?.profile?.protectedData?.lastHostStep
  );
};

export const isHostVerified = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    !!currentUser?.attributes?.profile?.protectedData?.hostIdentification?.isComplete
  );
};

export const isDriverVerified = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData?.lastDriverStep);
};

export const getDriverProfile = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData?.isDriverVerfied?.key
  );
};

export const getHostIdentification = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData?.isHostVerfied?.key
  );
};

export const getDriverPhoneNumber = currentUser => {
  // return (
  //   currentUser &&
  //   currentUser.id &&
  //   currentUser?.attributes?.profile?.protectedData?.driverPhoneNumber
  // );

  const {
    driverPhoneNumber,
    phoneNumber,
  } = currentUser?.attributes?.profile?.protectedData ?? {};

  return phoneNumber ?? driverPhoneNumber;
};
export const isPhoneNumberVerified = currentUser => {
  // return (
  //   currentUser &&
  //   currentUser.id &&
  //   currentUser?.attributes?.profile?.protectedData?.driverVerifiedPhoneNumber
  // );

  const {
    driverVerifiedPhoneNumber,
    verifiedPhoneNumber,
  } = currentUser?.attributes?.profile?.protectedData ?? {};

  return verifiedPhoneNumber ?? driverVerifiedPhoneNumber;
};
export const isHostPhoneNumberVerified = currentUser => {
  // return (
  //   currentUser &&
  //   currentUser.id &&
  //   currentUser?.attributes?.profile?.protectedData?.hostVerifiedPhoneNumber
  // );

  const {
    hostVerifiedPhoneNumber,
    verifiedPhoneNumber,
  } = currentUser?.attributes?.profile?.protectedData ?? {};

  return verifiedPhoneNumber ?? hostVerifiedPhoneNumber;
};

export const getHostPhoneNumber = currentUser => {
  const {
    hostPhoneNumber,
    phoneNumber,
  } = currentUser?.attributes?.profile?.protectedData ?? {};

  return phoneNumber ?? hostPhoneNumber;
};

export const getDriverDocumentNumber = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData?.documentDetails?.documentNumber
  );
};

export const getDriverDateOfBirth = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData?.holderDetails?.dob
  );
};

export const getDriverFullName = currentUser => {
  if (
    currentUser &&
    currentUser.attributes &&
    currentUser.attributes.profile &&
    currentUser.attributes.profile.protectedData &&
    currentUser.attributes.profile.protectedData.driverMetaData &&
    currentUser.attributes.profile.protectedData.driverMetaData.holderDetails
  ) {
    const { firstName, lastName } = currentUser.attributes.profile.protectedData.driverMetaData.holderDetails;
    if (firstName && firstName.length > 0 && lastName && lastName.length > 0) {
      return `${firstName[0]} ${lastName[0]}`;
    }
  }
  return null; // Return null if any of the required data is missing
};
export const getHostFullName = currentUser => {
  if (
    currentUser &&
    currentUser.attributes &&
    currentUser.attributes.profile &&
    currentUser.attributes.profile.protectedData &&
    currentUser.attributes.profile.protectedData.hostMetaData &&
    currentUser.attributes.profile.protectedData.hostMetaData.holderDetails
  ) {
    const { firstName, lastName } = currentUser.attributes.profile.protectedData.hostMetaData
    .holderDetails;
    if (firstName && firstName.length > 0 && lastName && lastName.length > 0) {
      return `${firstName[0]} ${lastName[0]}`;
    }
  }
  return null; // Return null if any of the required data is missing
};

export const getDriverStatus = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData?.driverIdentityStatus
  );
};
export const getDriverComplyCubeId = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData?.driverClientId
  );
};

export const getHostStatus = currentUser => currentUser?.attributes?.profile?.protectedData?.hostMetaData?.hostIdentityStatus
export const getFlightDetails = currentTransaction =>  currentTransaction?.attributes?.metadata?.flightDetails



export const getOdooUserID = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.privateData &&
    currentUser?.attributes?.profile?.privateData?.odoo_user_id
  );
};





export const getOdooUserCountryNumber = currentUser => {
  return (
    currentUser &&
    currentUser.id &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData?.documents &&
    currentUser?.attributes?.profile?.protectedData?.driverMetaData?.documents[0]?.country
  );
};

export const getUserEmail = currentUser => {
  return currentUser && currentUser.id && currentUser?.attributes?.email;
};
export const getLicenseplate = listing => {
  return listing && listing.id && listing?.attributes?.publicData?.licenseplate;
};

export const sameMonthCancelledBooking = tx => {
  const transitionCancelledByCustomer =
    !!tx?.id &&
    tx?.attributes?.transitions?.find(item => item?.transition === TRANSITION_CUSTOMER_FULL_REFUND)?.createdAt;
  const currentMonth = moment().month();
  const isSameMonthCancelled =
    !!transitionCancelledByCustomer &&
    moment(transitionCancelledByCustomer).month() === currentMonth;
  return isSameMonthCancelled;
};

export const getBookingStartDate = tx => !!tx?.id && tx?.booking?.attributes?.start;
export const getBookingEndDate = tx => !!tx?.id && tx?.booking?.attributes?.end;


export const getBookingAcceptDate = tx => !!tx?.id && tx?.attributes?.transitions?.find(
  item => item?.transition === TRANSITION_ACCEPT)?.createdAt;

export const getServiceFee = tx => !!tx?.id && tx?.attributes?.lineItems?.find(item => item?.code === SERVICE_FEE)?.lineTotal
  ?.amount;

export const getUserDisplayName = user => !!user?.id && user?.attributes?.profile?.displayName;

export const setReferralCode = str => {
  const lastSix = str?.substr(str.length - 6);
  const reversedCharacters = lastSix
    .split('')
    .reverse()
    .join('');
  const finalCode = reversedCharacters.toUpperCase();
  return finalCode;
};

export const getReferralCode = user => !!user?.id && user?.attributes?.profile?.protectedData?.referralCode;

export const getBookingDataFromTransaction = tx => !!tx?.id && tx?.attributes?.protectedData?.extendedBookingData;


export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getVerifiedSteps = (steps, user, isDriver) => {

  const currentEmail = user.attributes.email || '';
  const emailVerified = user.attributes.emailVerified;
  const protectedData = user?.attributes.profile.protectedData || {};
  const currentPhoneNumber = protectedData.phoneNumber || '';
  const verifiedPhoneNumber = protectedData.verifiedPhoneNumber;
  const hostInsuranceDetails = protectedData?.hostInsuranceDetails;
  const accountType = protectedData?.hostIdentification?.accountType;
  const documentVerificationStatus = protectedData?.verification_outcome;
  const profileImage = user?.profileImage?.id || user?.relationships?.profileImage?.data?.id;
  const hostStatus = getHostStatus(user);
  const driverStatus = getDriverStatus(user);
  const identityStatus = isDriver ? driverStatus : hostStatus;
  const cardData = getPaymentMethod(user);
  const privateData = user?.attributes.profile.privateData || {};
  const odooBankAccount = privateData.odoo_bank_account_id;

  const verifiedSteps = steps.map(step => {
    if (step.email && currentEmail.length > 0 && emailVerified) {
      return {
        ...step,
        verified: true,
      };
    }
    if (step.phone && currentPhoneNumber.length > 0 && verifiedPhoneNumber) {
      return {
        ...step,
        verified: true,
      };
    }
    if (step.profile && profileImage) {
      return {
        ...step,
        verified: true,
      };
    }
    if (
      step.identity && identityStatus === "verified" &&
      (!documentVerificationStatus || documentVerificationStatus === "clear")
    ) {
      return {
        ...step,
        verified: true,
      };
    }
    if (step.payment && cardData) {
      return {
        ...step,
        verified: true,
      };
    }
    if (step.company && accountType) {
      return {
        ...step,
        verified: true,
      };
    }
    if (step.bank && odooBankAccount) {
      return {
        ...step,
        verified: true,
      };
    }
    if (step.insurance && hostInsuranceDetails) {
      return {
        ...step,
        verified: true,
      };
    } else {
      return step;
    }
  });

  return verifiedSteps;
}

export const accountIsNotVerified = (verifiedSteps, isDriver) => {
  const driverSteps = verifiedSteps.filter(step => step.isDriver);
  const hostSteps = verifiedSteps.filter(step => step.isHost);

  const accountNotVerified = isDriver ? driverSteps.some(step => !step.verified) : hostSteps.some(step => !step.verified);

  return accountNotVerified;
}


export const perInsuranceValue = (listing)=>{

  const marketValue = listing?.attributes.publicData.marketValue || 0;
  let insuranceAmount = 0;
  const make =  listing?.attributes?.publicData?.make

  if (marketValue) {
    const referenceValue = parseInt(marketValue) * 0.6;

    if (referenceValue < 100000) {
      insuranceAmount = 17000;
    }

    if (referenceValue >= 100000 && referenceValue <= 200000) {
      insuranceAmount = 17000;
    }

    if (referenceValue >= 200000 && referenceValue <= 300000) {
      insuranceAmount = 19000;
    }

    if (referenceValue >= 300000 && referenceValue <= 400000) {
      insuranceAmount = 21500;
    }

    if (referenceValue >= 400000 && referenceValue <= 500000) {
      insuranceAmount = 25500;
    }

    if (referenceValue >= 500000 && referenceValue <= 1000000) {
      insuranceAmount = 29500;
    }

    if (referenceValue > 1000000) {
      insuranceAmount = 34500;
    }
  }

  const price =  make.toUpperCase() == "HYUNDAI" || make.toUpperCase() == "KIA" ? new Money(
    (insuranceAmount * 1 / parseFloat(CONVERSION_VALUE)) + ((insuranceAmount * 1 / parseFloat(CONVERSION_VALUE) * 0.2)), REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY
  ) : new Money((insuranceAmount * 1 / parseFloat(CONVERSION_VALUE)), process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY);

  return price && price.amount
}
