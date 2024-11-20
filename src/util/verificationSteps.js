import { getDriverStatus, getHostStatus, getPaymentMethod } from './dataExtractors';


export const steps = [
  {profile: true,  title: 'Foto de perfil', verified: false, isDriver: true, isHost: true, step: 2 },
  {email: true, title: 'Email ID', verified: false, isDriver: true, isHost: true, step: 3},
  {phone: true, title: 'Número de teléfono', verified: false, isDriver: true, isHost: true, step: 3},
  {identity: true, title: 'Verificación de identidad', verified: false, isDriver: true, isHost: true, step: 4},
  // {payment: true, title: 'Payment method', verified: false, isDriver: true, isHost: false, step: 6},
  {company: true, title: 'Individual / empresa', verified: false, isDriver: false, isHost: true, step: 5},
  {bank: true, title: 'Cuenta bancaria', verified: false, isDriver: false, isHost: true, step: 6},
  {insurance: true, title: 'Información de seguro', verified: false, isDriver: false, isHost: true, step: 7},
];

export const accountIsVerified = (user) => {
  if (user === null) return;

  const currentEmail = user.attributes.email || '';
  const emailVerified = user.attributes.emailVerified;
  const protectedData = user?.attributes.profile.protectedData || {};
  const privateData = user?.attributes.profile.privateData || {};
  const currentPhoneNumber = protectedData.phoneNumber || '';
  const verifiedPhoneNumber = protectedData.verifiedPhoneNumber;
  const hostInsuranceDetails = protectedData?.hostInsuranceDetails;
  const documentVerificationStatus = protectedData?.verification_outcome;
  const accountType = protectedData?.hostIdentification?.accountType;
  const profileImage = user?.profileImage?.id;
  const identityStatus = getHostStatus(user);
  const cardData = getPaymentMethod(user);
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
    if (step.bank && cardData) {
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

  const accountNotVerified = verifiedSteps.some(step => !step.verified);

  return !accountNotVerified;
}
