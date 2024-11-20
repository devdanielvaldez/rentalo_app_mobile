import React from 'react';
import css from './SectionWhyRentalo.module.css';
import car from './pic1.png';
import incremantar from './incrementar-1.png';
import carHand from './carhand.png';
import money from './money.png';
import approved from './approved.png';

import './mui.css';

const SectionWhyRentalo = () => {
  return (
    <div className={css.why}>
      <div className={css.whyLeftImg}>
        <img alt="auto" src={car} className={css.image} />
      </div>
      <div className={css.whyRightContent}>
        <h2 className={css.heading}>¿Por qué Réntalo ofrece mayor valor y conveniencia?</h2>
        <p className={css.subTitle}>
          Si estás buscando iniciar tu negocio, o actualmente administras tu propio negocio de renta
          de vehículos, Réntalo ofrece tecnologia y recursos para ayudarte a tener éxito.
        </p>
        <div className={css.whyRent}>
          <div className={css.whyRentBlock}>
            <div className={css.seguro}>
              <img alt="auto" src={carHand} />
            </div>
            <p>Es sencillo y seguro </p>
          </div>
          <div className={css.whyRentBlock}>
            <div className={css.money}>
              <img src={money} alt="dinero" />
            </div>
            <p>Tú decides el precio de alquiler</p>
          </div>
          <div className={css.whyRentBlock}>
            <div className={css.check}>
              <img src={approved} alt="aprobado" />
            </div>
            <p>Tus propias normas de alquiler</p>
          </div>
          <div className={css.whyRentBlock}>
            <div className={css.exchange}>
              <img src={incremantar} alt="incremente" />
            </div>
            <p>Sin gasto de registro ni cuotas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWhyRentalo;
