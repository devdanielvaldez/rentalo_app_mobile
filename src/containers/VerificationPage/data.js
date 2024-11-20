import bank from './images/bank.png';
import company from './images/company.png';
import email from './images/email.png';
import identity from './images/identity.png';
import insurance from './images/insurance.png';
import payment from './images/payment.png';
import phone from './images/phone.png';
import profile from './images/profile.png';


export const steps = [
  {iconSrc: profile, profile: true,  title: 'Imagen de perfil', verified: false, isDriver: true, isHost: true, step: 2 },
  {iconSrc: email, email: true, title: 'Email ID', verified: false, isDriver: true, isHost: true, step: 3},
  {iconSrc: phone, phone: true, title: 'Número de teléfono', verified: false, isDriver: true, isHost: true, step: 3},
  {iconSrc: identity, identity: true, title: 'Verificación de identidad', verified: false, isDriver: true, isHost: true, step: 4},
  {iconSrc: payment, payment: true, title: 'Método de pago', verified: false, isDriver: true, isHost: false, step: 5},
  {iconSrc: company, company: true, title: 'Individual / empresa', verified: false, isDriver: false, isHost: true, step: 5},
  {iconSrc: bank, bank: true, title: 'Cuenta bancaria', verified: false, isDriver: false, isHost: true, step: 6},
  {iconSrc: insurance, insurance: true, title: 'Información del seguro', verified: false, isDriver: false, isHost: true, step: 7},
]
