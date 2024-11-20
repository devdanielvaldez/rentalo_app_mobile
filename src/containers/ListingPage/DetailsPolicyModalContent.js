import React from 'react';
import config from '../../config';

import css from './ListingPage.module.css';

const DetailsPolicyModalContent = () => {
  return (
    <div className={css.modalContent}>
      {/* <h2 style={{ textAlign: 'center' }}>Detalles de la poliza</h2> */}
      {/* <span>
      {' '}
      Seguro y asistencia en carretera 24/7 incluidos en el precio del
      viaje
    </span> */}

      <ul>
        <li>Cobertura de riesgo comprensivo hasta el 60% del valor del veh&iacute;culo.</li>
        <li>
          Cobertura de hasta 1 mill&oacute;n de pesos por responsabilidad civil (da&ntilde;os
          materiales) y lesiones corporales.
        </li>
        <li>Beneficios por accidentes personales hasta RD$50,000.00</li>
        <li>Robo total o parcial de veh&iacute;culos</li>
        <li>Asistencia Vial</li>
        <li>
          Pol&iacute;tica aplicable &uacute;nicamente para el conductor aprobado durante el
          per&iacute;odo de alquiler.
        </li>
      </ul>
      <div>
        Click{' '}
        <span className={css.link}>
          <a href={config.pdfPolicyInfo} target="_blank">
            aquí
          </a>
        </span>{' '}
        para ver p&oacute;liza de seguro completa.
      </div>
    </div>
  );
};

export default DetailsPolicyModalContent;
