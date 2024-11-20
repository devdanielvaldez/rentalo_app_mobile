import React from 'react';
import Box from '@mui/material/Box';
import css from './SectionAccordion.module.css';
import search from './Icon feather-search.svg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './mui.css';
import classNames from 'classnames';
import config from '../../config';

const SectionAccordion = props => {
  return (
    <div className={classNames(props.isBecomeHost ? css.becomeHost : null, css.question)}>
      <div className={classNames(css.row, css.testimonialHeader)}>
        <div className={css.questionHead}>
          <h1>¿Tienes una pregunta?</h1>
          <span className={css.subTitle}>
            Visita nuestro{' '}
            <span className={css.link}>
            <a href={config.helpDeskPage} target="_blank">
                  Centro de ayuda
                </a>
            </span>{' '}
            para encontrar todas las respuestas a todas tus preguntas
          </span>
        </div>
        <form className={css.form}>
          <input type="text" placeholder="Buscar una pregunta" />
          <span className={css.search}>
            <img src={search} alt="search icon" />
          </span>
        </form>
      </div>
      <div className={css.accordionSec}>
        <Accordion sx={{ marginBottom: '30px', borderRadius: '15px' }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{
                  color: '#FF7900',
                  border: '2px solid #FFC79429',
                  borderRadius: '50%',
                  background: '#FFC79429',
                  boxShadow: 'none',
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              ¿Qué es Réntalo®?{' '}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0' }}>
            <Typography sx={{ padding: '0 25px 25px 25px' }}>
            Es la plataforma de alquiler de autos más novedosa, segura y rentable. En Réntalo si eres dueño de un vehículo o
            una flota completa puedes rentarlo a ciudadanos y turistas de todo el mundo. El viaje estará asegurado por nuestra
            póliza de seguro para tranquilidad del propietario y el conductor.
            </Typography>
          </AccordionDetails>
        </Accordion>


        {/* <Accordion sx={{ marginBottom: '30px', borderRadius: '15px' }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{
                  color: '#FF7900',
                  border: '2px solid #FFC79429',
                  borderRadius: '50%',
                  background: '#FFC79429',
                  boxShadow: 'none',
                }}
              />
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              ¿Qué es la reserva instantánea?{' '}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0' }}>
            <Typography sx={{ textAlign: 'justify', padding: '0 25px 25px 25px' }}>
              Los anuncios con reserva instantánea no requieren la aprobación del propietario antes de
              que se puedan reservar. Los conductores pueden hacer una reserva directamente sin
              necesidad de hacer una solicitud de reserva primero.
              <br />
              <span>
                <strong>Para anfitriones </strong>
              </span>
              Si tiene activada la reserva instantánea, se aplicará a todas las fechas disponibles
              en tu calendario. Actualiza tu calendario con regularidad para maximizar sus reservas
              y ganancias. Recomendamos a nuestros propietarios que activen la reserva instantánea en
              sus listas para obtener los siguientes beneficios:
              <br />
              <br />
              <span style={{ marginLeft: '10px' }}>
                {' '}
                1. Reservas más rápidas: recibirás reservas sin tener que aceptar primero las
                solicitudes.
              </span>
              <br />
              <span style={{ marginLeft: '10px' }}>
                {' '}
                2. Mayores ganancias: Obtendrá más ingresos con tu automóvil activando la reserva
                instantánea. Los conductores prefieren las listas que pueden reservar
                instantáneamente, ya que esto les permite hacer planes confirmados.
              </span>
              <br />
              <span style={{ marginLeft: '10px' }}>
                {' '}
                3. Búsqueda filtrada: los conductores pueden filtrar su búsqueda para ver solo las
                listas con la reserva instantánea activada.
              </span>
              <br />
              <span style={{ marginLeft: '10px' }}>
                {' '}
                4. Ubicación de búsqueda: los anuncios con reserva instantánea activada tienen
                prioridad en la ubicación de búsqueda.
              </span>
              <br />
              <span>
                <strong>Para invitados</strong>
              </span>
              ¡Obtén tus reservas confirmadas de inmediato sin tener que esperar la aceptación de
              los propietarios! Ahora puedes filtrar tu búsqueda para ver solo las listas que tienen
              activada la reserva instantánea. Hay un período de aviso predeterminado de 4 horas
              para las reservas instantáneas y no puede reservar en ningún momento entre las 12:00
              a. m. y las 7:00 a. m. Esto asegura que los propietarios tengan suficiente tiempo para
              preparar tu automóvil para sus reservas instantáneas.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* <Accordion sx={{ borderRadius: '15px' }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{
                  color: '#FF7900',
                  border: '2px solid #FFC79429',
                  borderRadius: '50%',
                  background: '#FFC79429',
                  boxShadow: 'none',
                }}
              />
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              ¿Cómo cambio mi número de teléfono en Réntalo®?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0' }}>
            <Typography sx={{ padding: '0 25px 25px 25px' }}>
              <span>
                Puedes cambiar fácilmente tu número de teléfono llamando al soporte al cliente: +1
                (809) 123-4567.
              </span>
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion> */}


            <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                          className={css.accordionSummary}
                        >
                          <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuánto cuesta publicar un automóvil?</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={css.accordionDetails}>
                          <Typography sx={{ textAlign: 'justify' }}>
                            <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            No hay ningún cargo por incluir su automóvil en Rentalo. Es gratis para los propietarios publicar y rentar su auto.
                            </Box>
                          </Typography>
                        </AccordionDetails>
              </Accordion>

              <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                          className={css.accordionSummary}
                        >
                          <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Es seguro alquilar mi coche a un extraño?</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={css.accordionDetails}>
                          <Typography sx={{ textAlign: 'justify' }}>
                            <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Si. En Rentalo, su tranquilidad es de suma importancia para nosotros. Contamos con un sólido proceso de selección de conductores para garantizar que su automóvil sea conducido únicamente por un conductor verificado. También su vehículo contarauenta con una póliza de seguro que lo protegera contra daños y siniestro a su automóvil, finalmente, usted tiene el control, ya que la decisión de aceptar una reserva es siempre suya.
                            </Box>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>





      </div>
    </div>
  );
};

export default SectionAccordion;
