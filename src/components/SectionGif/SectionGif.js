import React from 'react';

import css from './SectionGif.module.css';

import right from './Icon feather-arrow-right.svg';
import clock from './clock-svgrepo-com.svg';
import webCode from './web-code-svgrepo-com.svg';
import infinite from './infinite-outline-svgrepo-com.svg';
import happy from './happy-svgrepo-com.svg';
import crane from './crane-svgrepo-com.svg';
import checked from './checked.png';
import NamedLink from '../NamedLink/NamedLink';

const SectionGif = () => {
  return (
    <div className={css.gif}>
      <div className={css.fixedWidthContainer}>
        <div className={css.vehicleOnePlaceSec}>
          <div className={css.vehicleLeftSec}>
            <h1 className={css.title}>
              La mayoría de los vehículos en un solo lugar.&nbsp;&nbsp;
              <span className={css.link}>
                <NamedLink name="HowToRentPage">
                  Conoce más &nbsp;
                  <img src={right} alt="derecha" />
                </NamedLink>
              </span>
            </h1>
            <div className={css.serivesBlock}>
              <div className={css.wrapper}>
                <div className={css.box1}>
                  <img src={clock} className={css.clock} alt="reloj" />
                </div>
                <p className={css.description}>Servicios 24/7</p>
              </div>

              <div className={css.wrapper}>
                <div className={css.box2}>
                  <img src={webCode} className={css.webCode} alt="code" />
                </div>
                <p className={css.description}>Todo a través de nuestra Web App</p>
              </div>
              <div className={css.wrapper}>
                <div className={css.box3}>
                  <img src={infinite} className={css.webCode} alt="infinite" />
                </div>
                <p className={css.description}>Opciones ilimitadas para elegir</p>
              </div>
              <div className={css.wrapper}>
                <div className={css.box4}>
                  <img src={happy} className={css.webCode} alt="feliz" />
                </div>
                <p className={css.description}>Experiencia de reserva optima y eficiente</p>
              </div>
              <div className={css.wrapper}>
                <div className={css.box5}>
                  <img src={crane} className={css.webCode} alt="grúa" />
                </div>
                <p className={css.description}>Asistencia vial en cualquier momento</p>
              </div>
            </div>
          </div>
          <div className={css.vehicleRightSec}>
            <video
              src="https://video-analyzes.s3.amazonaws.com/HowToRent.mp4"
              autoPlay={false}
              controls
              className={css.gifImage}
            />
          </div>
        </div>
        {/* <div className={css.image}>
              <Box
                sx={{
                  width: '142px',
                  height: '130px',
                  background: '#4960D217 0% 0% no-repeat padding-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={clock} className={css.clock} />
              </Box>
              <p className={css.description}>Servicios 24/7</p>
            </div>
            <div className={css.image}>
              <Box
                sx={{
                  width: '142px',
                  height: '130px',
                  background: '#97D24917 0% 0% no-repeat padding-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={webCode} className={css.webCode} />
              </Box>
              <p className={css.description}>Todo a través de nuestra Web App</p>
            </div>
            <div className={css.image}>
              <Box
                sx={{
                  width: '142px',
                  height: '130px',
                  background: '#D28E4917 0% 0% no-repeat padding-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={infinite} className={css.webCode} />
              </Box>
              <p className={css.description}>Opciones ilimitadas para elegir</p>
            </div>
            <div className={css.image}>
              <Box
                sx={{
                  width: '142px',
                  height: '130px',
                  background: '#0E89B817 0% 0% no-repeat padding-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={happy} className={css.webCode} />
              </Box>
              <p className={css.description}>Experiencia de reserva optima y eficiente</p>
            </div>
            <div className={css.image}>
              <Box
                sx={{
                  width: '142px',
                  height: '130px',
                  background: '#97D24917 0% 0% no-repeat padding-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={crane} className={css.webCode} />
              </Box>
              <p className={css.description}>Asistencia vial en cualquier momento</p>
            </div> */}
      </div>

      <div className={css.mobile}>
        <h1>
          La mayoría de los vehículos
          <br /> en un solo lugar
        </h1>
        {/* <img src={picture} className={css.mobilePhoto} />           */}
        {/* <video src={video} autoPlay={false} controls className={css.mobilePhoto} /> */}
        <div className={css.row2}>
          <img src={checked} className={css.check} alt="image" />
          <p>Servicios 24/7</p>
        </div>
        <div className={css.row2}>
          <img src={checked} className={css.check} alt="image" />
          <p>Todo a través de nuestra Web App</p>
        </div>
        <div className={css.row2}>
          <img src={checked} className={css.check} alt="image" />
          <p>Opciones ilimitadas para elegir</p>
        </div>
        <div className={css.row2}>
          <img src={checked} className={css.check} alt="image" />
          <p>Experiencia de reserva óptima y eficiente</p>
        </div>
        <div className={css.row2}>
          <img src={checked} className={css.check} alt="image" />
          <p>Asistencia vial en cualquier momento</p>
        </div>
        <div className={css.mobileWrap}>
          <button className={css.mobileButton}>
            <NamedLink name="HowToRentPage">
              Mas información{' '}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14.62"
                  height="15.242"
                  viewBox="0 0 14.62 15.242"
                >
                  <g
                    id="Icon_feather-arrow-right"
                    data-name="Icon feather-arrow-right"
                    transform="translate(0.75 1.061)"
                  >
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M7.5,18H20.62"
                      transform="translate(-7.5 -11.44)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M18,7.5l6.56,6.56L18,20.62"
                      transform="translate(-11.44 -7.5)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </span>
            </NamedLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionGif;
