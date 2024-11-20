import React from 'react';
import css from './SectionInsurance.module.css';
import right from './Icon feather-arrow-right.svg';
import building from './sura2.png';

import classNames from 'classnames';
import {
  NamedLink,
} from '../../components';

const SectionInsurance = props => {
  const { className } = props;
  const classes = classNames(className, css.insuranceBlock);

  return (
    <div className={classes}>
      <div className={css.fixedWidthContainer}>
        <div className={css.insurance}>
          <div className={css.insuranceHead}>
            {/* <h1 className={css.title}>
              {!props.viewport ? `   En Réntalo tu seguridad es nuestra prioridad   ` : null}
            </h1> */}
            <h1 className={css.title}>
              <span className={css.emptySpace}></span>
              <span>En Réntalo tu seguridad es nuestra prioridad</span>
              <span className={css.emptySpace}></span>
            </h1>
            <p className={css.subtitle}>
              Una de las aseguradoras más grandes de América Latina, es aliado de Réntalo.{' '}
              <span className={css.link}>
                <NamedLink name="InsurancePage">
                  Conoce más
                  <img src={right} alt="icono de flecha a la derecha" />
                </NamedLink>
              </span>
            </p>
          </div>
          <div className={css.safetyBlock}>
            <div className={css.leftBlock}>
              <div className={css.listBlock}>
                <div className={css.leftBlock}></div>
                <div className={css.rightBlock}>
                  <h1 className={css.heading}>Póliza de seguro para todos tus alquileres</h1>
                  <p className={css.pTag}>
                  Estás automáticamente cubierto por nuestra póliza de Seguros{' '}
                    <a href="https://www.segurossura.com.do/">SURA</a> desde que inicia el viaje.
                  </p>
                </div>
              </div>
              <div className={css.listBlock}>
                <div className={css.leftBlock}></div>
                <div className={css.rightBlock}>
                  <h1 className={css.heading}>Asistencia en caso de avería o accidente</h1>
                  <p className={css.pTag}>
                    Asistencia en carretera las 24 horas del día, los 7 días de la semana en caso de
                    que tu automóvil se descomponga lejos de donde vives y necesites una grúa.
                  </p>
                </div>
              </div>
              <div className={css.listBlock}>
                <div className={css.leftBlock}></div>
                <div className={css.rightBlock}>
                  <h1 className={css.heading}>Un equipo de servicio dedicado al cliente </h1>
                  <p className={css.pTag}>
                    Además de la asistencia en carretera 24/7, puedes contactar con nuestro equipo
                    de atención al cliente de lunes a domingo de 9:00 AM a 5:00 PM.
                  </p>
                </div>
              </div>
            </div>
            <div className={css.rightImgBlock}>
              <img src={building} className={css.image} alt="edificio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInsurance;
