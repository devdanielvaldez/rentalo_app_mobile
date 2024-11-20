import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import css from './SectionHero.module.css';
import rentalo from './rentalo.svg';
import cursor from './cursor.svg';
import Enmascarar from './Grupo 6388.png';

import './mui.css';

const SectionHero = props => {
  const { rootClassName, className, isHostVerified } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.row}>
        <div className={css.heroContent}>
          <div className={css.heroLeftContent}>
            <div className={css.title}>
              <h1 className={css.heading}>¿Qué es</h1>
              <img className={css.rentalo} src={rentalo} alt='Rentalo' />
              <h1 className={css.heading}>?</h1>
            </div>
            <p className={css.content}>
            Es la plataforma de alquiler de autos más novedosa, segura y rentable. En Réntalo
            si eres dueño de un vehículo o una flota completa puedes rentarlo a ciudadanos y
            turistas de todo el mundo.
              <br />
              <br />
              Solicita tu acceso exclusivo hoy. Nuestra plataforma ofrece una oportunidad única
              para monetizar tus activos, contribuir a la sostenibilidad y ser parte de una
              comunidad confiable.
            </p>
            <div className={css.publica}>
              <NamedLink name={!isHostVerified ? 'BecomeHostPage' : 'NewListingPage'}>
                <button className={css.listButton}>Publica tu vehículo</button>
              </NamedLink>
              <img src={cursor} className={css.cursor} alt='cursor' />
            </div>
          </div>
          <div className={css.heroImageSec}>
            <img src={Enmascarar} className={css.mobile} alt='Enmascarar' />
          </div>
        </div>
      </div>
      {/* <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          to={{
            search:
              '/s?address=Dominican Republic&bounds=20.0257734%2C-68.2232316105421%2C17.3755090012706%2C-72.0075109996876',
          }}
          className={css.heroButton}
        >
          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
      </div> */}
      {/* <p className={css.insuranceText}><img className={css.insuranceLogo} src={suraLogo} />Fully insured for SURA</p> */}
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
