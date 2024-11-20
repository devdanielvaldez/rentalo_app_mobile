import React from 'react';
import NamedLink from '../NamedLink/NamedLink';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import css from './SectionCars.module.css';

import cars from './cars.png';
import conductor from './conductor.png';
import incrementar from './incrementar.png';
import objectivo from './objetivo.png';
import arrow from './Icon feather-arrow-right.svg';

const incrementarBox = {
  maxWidth: '67px',
  width: '100%',
  height: '64px',
  background: '#C449D226 0% 0% no-repeat padding-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
};

const objectivoBox = {
  maxWidth: '67px',
  width: '100%',
  height: '64px',
  background: '#DFF9EB 0% 0% no-repeat padding-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
};

const SectionCars = () => {
  return (
    <div className={css.why}>
      <h1 className={css.headingMobile}>¡Que tu vehículo trabaje por tí!</h1>
      <p className={css.subTitleMobile}>
        Acelera tu emprendimiento y comienza a construir tu negocio compartiendo tu coche cuando no
        lo necesites.
      </p>
      <div className={css.vehicleWorkBlock}>
        <div className={css.leftSec}>
          <img alt="coches" src={cars} className={css.image} />
        </div>
        <div className={css.rightSec}>
          <h1 className={css.heading}>¡Que tu vehículo trabaje por tí!</h1>
          <p className={css.subTitle}>
            Acelera tu emprendimiento y comienza a construir tu negocio compartiendo tu coche cuando
            no lo necesites.
          </p>
          <div className={css.vehicleContainer}>
            <Grid container item xs={12} className={css.vehicleWork}>
              <div className={css.appereance}>
                <Box sx={incrementarBox}>
                  <img src={incrementar} alt="incrementar" />
                </Box>
                <div className={css.boxInfo}>
                  <h2 className={css.title}>Genera ingresos extra. </h2>
                  <p className={css.pTag}> Depósitos directos en tu cuenta bancaria</p>
                </div>
              </div>
            </Grid>
            <Grid container item xs={12} className={css.vehicleWork}>
              <div className={css.appereance}>
                <Box sx={objectivoBox}>
                  <img src={objectivo} alt="objectivo" />
                </Box>
                <div className={css.boxInfo}>
                  <h2 className={css.title}>Amplia red de clientes.</h2>
                  <p className={css.pTag}> Acceso ilimitado a clientes de todo el mundo</p>
                </div>
              </div>
            </Grid>

            <Grid container item xs={12} className={css.vehicleWork}>
              <div className={css.appereance}>
                <Box sx={objectivoBox}>
                  <img src={conductor} alt="conductor" />
                </Box>

                <div className={css.boxInfo}>
                  <h2 className={css.title}>Tu propiedad está asegurada.</h2>
                  <p className={css.pTag}>
                    Conductores totalmente verificados y asegurados con nuestra póliza de Seguros
                    SURA.
                  </p>
                </div>

                {/* <div className={css.boxInfo}>
                  <h2 className={classNames(css.title, css.pTagMobile)}>Conductores verificados</h2>
                  <p className={classNames(css.pTag, css.pTagMobile)}>
                    Totalmente y asegurados a todo riesgo
                  </p>
                </div> */}
              </div>
            </Grid>
          </div>
          <p className={css.link}>
            <NamedLink name="BecomeHostPage">
              Conoce cuánto puedes ganar
              <img src={arrow} style={{ paddingLeft: '5px' }} alt="flecha" />
            </NamedLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionCars;
