import React from 'react';
import whatsappIcon from '../../assets/whatsapp-icon.svg';
import css from './WhatsAppButton.module.css';
import config from '../../config';

const WhatsAppButton = () => {
  const phoneNumber = config.whatsappNumber;

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      className={css.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={whatsappIcon} alt="WhatsApp" />
    </a>
  );
};

export default WhatsAppButton;
