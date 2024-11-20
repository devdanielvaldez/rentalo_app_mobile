import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import testimonial1 from './testimonialPic1.png';
import testimonial2 from './testimonialPic2.png';
import testimonial3 from './testimonialPic3.png';
import quote from './Icon awesome-quote-right.svg';

import css from './SectionHowItWorks.module.css';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      {/*
        <div className={css.section1}>
            <iframe width="100%" height="500" src="https://www.youtube.com/embed/33crJ6BiJ20" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div className={css.text}>
                <p><strong>✓ Unlimited options to choose from</strong></p>
                <p>Most vehicles available in one place</p>

                <p><strong>✓ Optimal and efficient booking experience</strong></p>
                <p>Every step of the rental process happens through our webapp</p>

                <p><strong>✓ You can count on us 24/7</strong></p>
                <p>We offer you customer service and technical support at any time</p>



                <Button className={css.button1}>Learn more</Button>
            </div>


            <div className={css.section2}>
            <br/><br/>
            <center><h1>Let your vehicle work for you!</h1></center>
                <img src={pic1}  className={css.picture}/>

                <br/><br/>

                <p>Accelerate your entrepreneurship and start building your business sharing your car when you don’t need it</p>


                <div className={css.itemsWrapper}>
                    <div className={css.item}>
                        <CreditCardIcon className={css.itemPic}/>
                        <p className={css.itemText}>
                        Generate extra income. Direct deposits to your bank account
                        </p>

                    </div>

                    <div className={css.item}>
                        <PublicIcon className={css.itemPic}/>
                        <p className={css.itemText}>
                        Unlimited access to clients around the world
                        </p>

                    </div>

                    <div className={css.item}>
                        <VerifiedUserIcon className={css.itemPic}/>
                        <p className={css.itemText}>
                        Fully verified drivers and comprehensively insured
                        </p>

                    </div>

                </div>

                <Button className={css.button1} onClick={() => history.push('/becomeHost')}>Learn how much you can earn</Button>
            </div>


            <div className={css.section2}>
            <br/><br/>
            <center><h1 className={css.titleWithPic}>At <img src={logo1} className={css.logo}/>, your safety is our priority</h1></center>
                <img src={pic4}  className={css.picture}/>

                <br/> <br/>
                <p><img className={css.suraLogo} src={suraLogo}/> , one of the largest insurance companies in Latin America, is Rentalo's exclusive provider.</p>


                <div className={css.itemsWrapper}>
                    <div className={css.item}>
                        <ShieldIcon className={css.itemPic}/>
                        <p className={css.itemText}>
                       <strong> Comprehensive insurance for all your rentals </strong>
                        <p className={css.itemText2}>You are automatically covered by our SURA comprehensive insurance, which replaces your insurance as soon as the trip begins.</p>

                        </p>

                    </div>

                    <div className={css.item}>
                        <SupportIcon className={css.itemPic}/>
                        <p className={css.itemText}>
                        <strong>Assistance in case of breakdown or accident</strong>
                        <p className={css.itemText2}>24/7 roadside assistance in case your car breaks down far from where you live and a tow truck is needed.</p>

                        </p>

                    </div>

                    <div className={css.item}>
                        <SupportAgentIcon className={css.itemPic}/>
                        <p className={css.itemText}>
                        <strong>A dedicated customer service team</strong>
                        <p className={css.itemText2}>In addition to 24/7 roadside assistance, you can contact our customer service team from Monday to Sunday, 8:00 a.m. to 10:00 p.m.</p>

                        </p>

                    </div>

                </div>
                <a href='/trust-safety'>
                <Button className={css.button1}>Learn more</Button>
                </a>
            </div> */}

      <div className={css.section2}>
        <br />
        <h1 className={css.titleWithPic}>Testimonios</h1>
        <p className={css.subtitle}>
          Réntalo es una plataforma dedicada a apoyar a sus propietarios en la gestión de
          <br /> sus negocios de alquiler de vehículos.&nbsp;
          <span className={css.link}>
            <NamedLink name="TestimoniosPage">Conoce que dicen de nosotros.</NamedLink>
          </span>
        </p>
        {/* <Testimonials /> */}
        <div className={css.testimonialSection}>
          <div className={css.box}>
            <div className={css.column}>
              <div className={css.wrap}>
                <div className={css.start}>
                  <img alt="testimonio" src={testimonial1} className={css.testimonial} />
                  <p className={css.name}>Sarah D.</p>
                </div>
                <img src={quote} alt="presupuesto" className={css.quote} />
              </div>
              <p className={css.text}>
                He usado Réntalo varias veces y siempre he tenido una experiencia fantástica. Es una
                forma económica y fácil de alquilar un automóvil de una persona local, lo que
                significa que obtiene una experiencia más auténtica y una selección más diversa de
                vehículos. ¡Recomiendo encarecidamente Réntalo a cualquiera que busque un alquiler
                de automóviles diferente y emocionante!.
              </p>
            </div>
          </div>
          <div className={css.box}>
            <div className={css.column}>
              <div className={css.wrap}>
                <div className={css.start}>
                  <img src={testimonial2} alt="testimonio" className={css.testimonial} />
                  <p className={css.name}>Francisco R.</p>
                </div>
                <img src={quote} alt="presupuesto" className={css.quote} />
              </div>
              <p className={css.text}>
                Mi esposo y yo alquilamos un automóvil con Réntalo para un fin de semana largo y no
                podríamos estar más contentos con la experiencia. El propietario del automóvil fue
                muy amable y servicial, y el automóvil estaba en excelentes condiciones. Fue una
                experiencia mucho más personal y agradable que alquilar a través de una empresa
                tradicional de alquiler de automóviles. Definitivamente volveremos a usar Réntalo en
                el futuro.{' '}
              </p>
            </div>
          </div>
          <div className={css.box}>
            <div className={css.column}>
              <div className={css.wrap}>
                <div className={css.start}>
                  <img src={testimonial3} alt="testimonio" className={css.testimonial} />
                  <p className={css.name}>José S.</p>
                </div>
                <img src={quote} alt="presupuesto" className={css.quote} />
              </div>
              <p className={css.text}>
                Réntalo ha cambiado completamente la forma en que viajo. Ahora siempre busco en
                Réntalo antes de considerar una empresa de alquiler de automóviles tradicional. Me
                encanta poder elegir entre una amplia variedad de vehículos y propietarios locales,
                y siempre he tenido una experiencia positiva con el servicio al cliente. ¡Réntalo es
                lo mejor!.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
