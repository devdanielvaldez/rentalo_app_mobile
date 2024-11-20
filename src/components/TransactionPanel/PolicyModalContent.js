import React from "react";

import css from './TransactionPanel.module.css'

const formatDate = (userDate) => {
  const date = new Date(userDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${monthNames[monthIndex]} ${day}, ${year} ${hours}:${strMinutes} ${ampm}`;
}

const PolicyModalContent = ({ policy }) => {
  const {
    end_date,
    fullname,
    mobile_phone,
    reference,
    start_date,
    vehicle_brand,
    vehicle_chassis,
    vehicle_color,
    vehicle_model,
    vehicle_plate,
    vehicle_year,
  } = policy ?? {};

  return (
    <duv>
      <div className={css.policyModalContentColsWrapper}>
        <p className={css.policyModalContent}>
          <span>Fecha de inicio: {formatDate(start_date)}</span>
        </p>
        <p className={css.policyModalContent}>
          <span>Fecha de finalización: {formatDate(end_date)}</span>
        </p>
      </div>
      <div className={css.policyModalContentColsWrapper}>
        <div className={css.policyModalContentCol}>
          <p className={css.policyModalContent}>
          Marca: {vehicle_brand}
          </p>
          <p className={css.policyModalContent}>
            Modelo: {vehicle_model}
          </p>
          <p className={css.policyModalContent}>
            Color: {vehicle_color}
          </p>
          <p className={css.policyModalContent}>
            Año: {vehicle_year}
          </p>
          <p className={css.policyModalContent}>
            Placa: {vehicle_plate}
          </p>
          <p className={css.policyModalContent}>
            Chasis: {vehicle_chassis}
          </p>
        </div>
        <div>
          <p className={css.policyModalContent}>
            Nombre conductor: {fullname}
          </p>
          {mobile_phone ? ( <p className={css.policyModalContent}>
            Número de teléfono del conductor: {mobile_phone}
          </p>) : null}
        </div>
      </div>
      <div>
        <p className={css.policyModalContent}>
          Referencia: {reference}
        </p>
      </div>
    </duv>
  )
}

export default PolicyModalContent;
