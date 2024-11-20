import React, { useState } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import css from './FAQsPage.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import './mui.css';
import SideNav from '../../components/SideNav/SideNav';

import Tab from './Tab';
import Tabs from './Tabs';


// import Tabs, { Tab } from 'react-best-tabs';
import '../../styles/React_Tab.css';
import { useSelector } from 'react-redux';
import config from '../../config';


const FAQsPage = () => {
  const { isAuthenticated } = useSelector(state => state.Auth);


  const pageName = ['Preguntas frecuentes'];
  // prettier-ignore
  return (
    <StaticPage
      title="FAQs"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FAQsPage',
        description: 'FAQs',
        name: 'FAQs',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={isAuthenticated ? css.contentWrapper : css.noWrapper}>
            <div className={css.topSectionWrapper}>
              <div className={css.mobile}>
                <p className={css.mobileText}>Preguntas frecuentes</p>
              </div>

              <div className={css.title}>
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
                <p className={css.subTitle}>o elija una categoría para obtener las preguntas comunes</p>
              </div>

              <Tabs>
                <Tab label="Generales">
                  <div className={css.accordions}>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué es Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Es la plataforma de alquiler de autos más novedosa, segura y rentable. En Réntalo si eres dueño de un vehículo o una flota completa puedes rentarlo a ciudadanos y turistas de todo el mundo. El viaje estará asegurado por nuestra póliza de seguro para tranquilidad del propietario y el conductor.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo cambio mi número de teléfono en Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            <span>
                              Puedes cambiar fácilmente tu número de teléfono llamando al soporte al cliente: +1(829) 657-5069.
                            </span>
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo cambio mi ID de correo electrónico en Rentalo? </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            La ID de correo electrónico se puede cambiar en cualquier momento simplemente siguiendo los pasos a continuación: <br />
                            A través del sitio web <br />
                            1. Inicie sesión en su cuenta de Rentalo.  <br />
                            2. En el menú desplegable Usuario, seleccione 'Configuración de la cuenta'. <br />
                            3. Verá la pestaña Detalles de contacto abierta, con su ID de correo electrónico actual en el campo 'Dirección de correo electrónico'. <br />
                            4. Ingrese un nuevo correo electrónico válido en este campo.  <br />
                            5. Se le pedirá que ingrese su contraseña nuevamente. Ingrese la contraseña y haga clic en 'Guardar cambios'. <br />
                            6. Su nuevo correo electrónico se guardará en el sistema y recibirá un correo electrónico con esta nueva ID para verificar la nueva ID de correo electrónico. <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>No recibí el correo electrónico de verificación. ¿Qué hacer?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            No hay problema. Asegúrese de revisar su carpeta de SPAM en su buzón. A veces, el correo electrónico de verificación llega a la carpeta SPAM. Si eso no funciona, regrese a <a style={{ textDecoration: 'underline' }} href="www.rentaloinc.com">www.rentaloinc.com</a> y verá una ventana emergente pidiéndole que verifique su correo electrónico. Presiona "Reenviar correo electrónico de verificación" en la pantalla emergente. Si aún no recibe el correo electrónico de verificación, envíenos un mensaje por chat o correo electrónico a <a style={{ textDecoration: 'underline' }} href="mailto?soporte@rentaloinc.com">soporte@rentaloinc.com</a> y estaremos encantados de resolverlo por usted.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo canjeo mis créditos de viaje? </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Este art&iacute;culo detalla c&oacute;mo se pueden usar los cr&eacute;ditos de viaje en Réntalo® <br />
                            Los propietarios y conductores de Réntalo® pueden beneficiarse de los cr&eacute;ditos de viaje
                            que reciben. Los propietario y conductores pueden canjear los cr&eacute;ditos de viaje en
                            cualquier viaje de Réntalo®. <br /><br />
                            <span style={{ marginLeft: '20px' }}>1. Los hu&eacute;spedes pueden utilizar los cr&eacute;ditos disponibles al hacer una
                              reserva. Para cualquier viaje, los $ 10 de los cr&eacute;ditos se pueden usar en
                              cualquier momento. Por ejemplo, si un hu&eacute;sped tiene $ 30 en cr&eacute;ditos,
                              puede usarlo en 3 viajes.</span> <br /><br />
                            <span style={{ marginLeft: '20px' }}>2. Los propietarios recibir&aacute;n pagos autom&aacute;ticos por los viajes que organizan
                              seg&uacute;n su saldo de cr&eacute;dito. Por cada viaje, pueden canjear un m&aacute;ximo de $
                              10. Esto suceder&aacute; autom&aacute;ticamente sin que el propietario tenga que hacer
                              nada. Por ejemplo, si un propietario tiene $ 60 en cr&eacute;ditos, recibir&aacute; $ 10
                              adicionales en el momento en que organice un viaje y su saldo de cr&eacute;dito
                              se reducir&aacute; a $ 50. Otro ejemplo, si un propietario tiene $ 5 en cr&eacute;ditos,
                              entonces se le pagar&aacute;n $ 5 adicionales cuando organice un viaje y su saldo
                              de cr&eacute;dito ser&aacute; cero.</span> <br /><br />
                            La validez de los cr&eacute;ditos es de 6 meses a partir de la fecha de recepci&oacute;n de los <br />
                            cr&eacute;ditos. Comun&iacute;quese con nosotros en caso de aclaraciones.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Tab>
                <Tab label="Propietarios">
                  <div className={css.accordions}>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué significan los términos "propietario" y "conductor"?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Los propietarios son dueños de automóviles que desean rentar su automóvil. Los conductores son personas que desean alquilar un automóvil de un propietario en Rentalo.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuánto puedo ganar como propietario?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Depende de la cantidad de días que alquile su automóvil y del precio que establezca. En promedio, las personas que alquilan una vez a la semana probablemente ganarán alrededor de USD$5,000 al año. Consulte nuestra herramienta de estimación para ver cuánto puede ganar al compartir su modelo de automóvil específico.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuál es el proceso para registrar mi auto en Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Registrar su automóvil en Rentalo es un proceso extremadamente simple y no debería llevarle más de 10 minutos hacerlo siempre que tenga toda la documentación requerida.
                            <br />
                            1. Visite <a style={{ textDecoration: 'underline' }} href="www.rentaloinc.com">www.rentaloinc.com</a>
                            <br />
                            2. Regístrese con su dirección de correo electrónico. Verifique con su teléfono y dirección de correo electrónico.
                            <br />
                            3. Sube una foto de perfil para ti. Esto es para que los conductores tengan una cara al nombre de la persona a la que alquilan.
                            <br />
                            4. Haga clic en la pestaña "Incluya su automóvil" en la parte superior derecha.
                            <br />
                            5. Esto requerirá que ingrese algunos detalles básicos de su automóvil. Simplemente siga las instrucciones en cada una de las páginas. Es superfácil :
                            <br />
                            6. Comience con la ubicación de su automóvil seguido de la descripción, el nombre de la marca, el número de modelo. etc. Estos son algunos detalles básicos.
                            <br />
                            7. Ingrese las reglas que desea que sus conductores cumplan, por ejemplo, no fumar / no permitirles conducir a Haití, etc.
                            <br />
                            8. Ingrese el precio por día que desee para su automóvil. El período mínimo de alquiler es de 24 horas. No te preocupes. También puede cambiar esto más tarde.
                            <br />
                            9. Deberá hacer clic en algunas imágenes de su automóvil y cargarlas. Si no tiene las imágenes de inmediato, no se preocupe. Puede y debe cargarlos más tarde ( consulte nuestra guía de fotografía ). También puede optar por contar con la ayuda de nuestros fotógrafos profesionales para tomar fotografías de su automóvil. Es un servicio gratuito solo durante unos días.
                            <br />
                            10. Su automóvil en Rentalo estará cubierto a través de nuestra política integral cuando esté en un viaje de Rentalo. Solo necesitamos que usted nos confirme que tiene una póliza de seguro privada vigente para su automóvil.
                            <br />
                            11. Según disponibilidad, marque cuándo estará disponible su coche para alquilar. Siempre puedes actualizar esto más tarde.
                            <br />
                            12. El último paso es la verificación del propietario, en la que necesitamos algunos detalles sobre usted: copia de su CÉDULA / PASAPORTE. Lo más importante es que también necesitamos que ingrese los detalles de la cuenta en la que desea recibir el pago de los alquileres realizados en Rentalo.
                            <br />
                            No se preocupe, su información está segura ya que tenemos una política de privacidad muy estricta.
                            <br />
                            Una vez hecho esto, siéntese y relájese. Verificaremos sus documentos y confirmaremos su aprobación y la de su listado en breve.
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

                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo se garantiza la seguridad de mi coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Llevamos controles estrictos a los conductores que alquilan en Rentalo a través de su CÉDULA / PASAPORTE y su licencia de conducir. Aunque es muy poco probable, en caso de cualquier incidente desafortunado, su automóvil está asegurado por la póliza de seguro que incluye lo siguiente: <br />
                            • Muerte o lesiones a terceros (hasta RD$ 1,000,000) <br />
                            • Daños a la propiedad de terceros (hasta RD$ 1,000,000) <br />
                            • Pérdida o daño de su vehículo por causas de accidente (hasta el 60% valor de mercado en el momento de la pérdida o daño) <br />
                            • Pérdida de daños por incendio o robo (hasta 60%valor de mercado en el momento de la pérdida o daño) <br />
                            • Riesgo Familiar – Relación Laboral (RD$50,000)<br />
                            • Asistencia vial <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Por qué debería rentar mi coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Como propietario de un automóvil, se enfrenta a muchos costos, como seguros, depreciación, impuestos de circulación, mantenimientos, etc., independientemente del uso. Al rentar su automóvil en Rentalo, puede obtener ingresos adicionales y administrar mejor estos costos. Y lo que es más importante, el uso compartido de automóviles tiene un impacto positivo en nuestro medio ambiente al reducir la cantidad de automóviles en la carretera.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Es obligatorio alquilar si registro mi coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            No. Como propietario de un automóvil, es su decisión aceptar o rechazar una solicitud de reserva. Tú fijas el precio y decides a quién y cuando alquilas tu coche.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo puedo alquilar mi coche con la mayor frecuencia posible?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            <strong>Toma buenas fotos de tu auto</strong> <br />
                            Cuando los conductores buscan un automóvil, las fotos son lo primero que miran. Cuanto mejores sean las fotos, más probable será que alguien quiera alquilar su coche. Lea nuestros consejos para descubrir cómo mejorar las fotos de su automóvil. También debería considerar agregar una foto de perfil. <br />
                            <br />

                            <strong>Seleccione un precio justo</strong> <br />
                            Un precio justo es aquel que es consistente con la edad y el modelo de su automóvil, así como con la época del año y el nivel de demanda. Si es un nuevo propietario, comience con un precio bastante bajo para facilitar la obtención de sus primeros alquileres y obtener algunas críticas positivas.
                            <br />
                            <br />
                            <strong>Describe tu auto</strong> <br />
                            Brinde a los conductores tantos detalles como sea posible: modelo exacto, estado general del vehículo, limpieza, cualquier problema menor que señalar, opciones y accesorios. <br />
                            <br />
                            <strong>Actualiza tu calendario</strong> <br />
                            Mantenga su calendario actualizado para asegurarse de recibir solicitudes solo cuando su vehículo esté disponible. Esto evitará que lo molesten innecesariamente y, lo que es más importante, le permitirá aceptar tantas solicitudes como sea posible, lo que lo ayudará a avanzar en los resultados de búsqueda.
                            <br />
                            <br />

                            <strong>Responda rápidamente a las solicitudes</strong> <br />
                            Cuanto más rápido responda, más alto aparecerá su anuncio en los resultados de búsqueda.   <br />
                            <br />

                            <strong>Di SÍ a las solicitudes</strong> <br />
                            Una respuesta es buena, ¡pero un SÍ es aún mejor! Su tasa de aceptación (número de respuestas positivas del total de solicitudes recibidas) juega un papel importante en la clasificación de su anuncio en los resultados de búsqueda. Lea nuestros consejos para aceptar tantas solicitudes como sea posible.
                            <br />
                            <br />
                            <strong>Especifique sus condiciones de alquiler</strong> <br />
                            Para evitar que le molesten las solicitudes de alquiler que no le convienen y para mejorar su tasa de respuesta positiva, establezca condiciones de alquiler para su automóvil: duración del alquiler (por ejemplo, alquiler mínimo de 2 días) y límites de reserva (por ejemplo, sin solicitudes de última hora).
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Por qué se requiere mi CÉDULA / PASAPORTE?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Necesitamos tener credenciales válidas del propietario del automóvil. Para que el automóvil esté asegurado durante el viaje, debemos asegurarnos de que CÉDULA / PASAPORTE esté mencionado en el seguro del viaje.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué protección tengo contra los daños del coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Llevamos controles estrictos a los conductores que alquilan en Rentalo a través de su CÉDULA / PASAPORTE y su licencia de conducir. Aunque es muy poco probable, en el caso de cualquier incidente desafortunado, su automóvil está asegurado por la póliza de seguro que incluye lo siguiente: <br />
                            riesgo a través de la protección Rentalo, que incluye lo siguiente : <br />
                            • Muerte o lesiones a terceros (hasta RD$ 1,000,000)  <br />
                            • Daños a la propiedad de terceros (hasta RD$ 1,000,000)  <br />
                            • Pérdida o daño de su vehículo por causas de accidente (hasta el 60% valor de mercado en el momento de la pérdida o daño)  <br />
                            • Pérdida de daños por incendio o robo (hasta 60%valor de mercado en el momento de la pérdida o daño) <br />
                            • Riesgo Familiar – Relación Laboral (RD$50,000) <br />
                            • Asistencia vial  <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué tipo de usos de mi coche están permitidos y qué no?  </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Como propietario, puede definir cuáles son las reglas de su automóvil durante el proceso de listado. Los conductores pueden utilizar el coche para su uso personal de forma segura. <br /><br />
                            Solo los conductores verificados por Rentalo pueden reservar y conducir un automóvil durante un viaje Rentalo. Ser un "conductor verificado" significa que el conductor ha proporcionado y actualizado toda la documentación requerida, sigue cumpliendo con todos los requisitos de elegibilidad de Rentalo y que el conductor está actualmente al día. <br /><br />Participar en usos prohibidos con un vehículo reservado a través de Rentalo será motivo de multas, suspensión y / o cancelación de su membresía. También reducirá la cobertura de responsabilidad del conductor a los límites mínimos de si o anulará la cobertura cuando lo permita la ley de República Dominicana aplicable; el propietario ha alentado la participación en un Uso Prohibido, se puede imponer una multa y / o suspensión. <strong>Participar en usos prohibidos también eliminará cualquier cobertura para el conductor por cualquier reclamo relacionado con daños físicos.</strong>
                            <br /><br />
                            <strong>Los usos y actividades de vehículos prohibidos incluyen:</strong>  <br />
                            • Permitir que el vehículo sea empujado o remolcado por cualquier persona que no sea un vehículo de servicio o policía autorizado. <br />
                            • Usar un vehículo reservado a través de Rentalo para: <br />
                            •  remolcar o empujar cualquier cosa. <br />
                            • que no sean carreteras pavimentadas (ya sea "todoterreno", conducción en carreteras no mejoradas o áreas de estacionamiento, o de otro modo). <br />
                            •  en cualquier carrera, prueba o competición. con la intención de causar daño, o con un desprecio lascivo, deliberado o imprudente por la seguridad. <br />
                            • Prácticas de aprendizaje o entrenamiento. <br />
                            • para transportar personas o bienes "por alquiler" o para transportar personas o bienes a cambio de una compensación o una tarifa, incluidos, entre otros, servicios de taxi, paquetes, alimentos o servicios de entrega de comestibles. Sin embargo, puede usar el automóvil para fines comerciales, como asistir a reuniones y llevar materiales asociados. <br />
                            • a menos que se haya reservado un viaje. El uso de vehículos sin reserva o fuera del horario de viaje constituye un uso no autorizado. <br />
                            • durante o como parte de la comisión de un delito o cualquier otra actividad o propósito ilegal. Al utilizar tu vehículo en apuestas, desafíos, carreras o concursos de cualquier naturaleza, inclusive en preparatorias. <br />
                            • mientras el conductor esté bajo la influencia de alcohol por encima del límite legal. <br />
                            • cualquier droga o medicación bajo cuyos efectos esté prohibida o no recomendada la operación de un vehículo. <br />
                            • cuando se ha cargado más allá de su capacidad nominal o con más pasajeros de los que el vehículo tiene cinturones de seguridad. <br />
                            • fuera de las áreas geográficas de uso aprobadas según lo especificado durante la reserva. <br />
                            • sin una licencia válida o si no cumple con nuestros requisitos de elegibilidad. Es su responsabilidad informarnos cuando su licencia caduque o se suspenda, o si cree que ya no puede cumplir con nuestros Requisitos de elegibilidad. <br />
                            • para transportar sustancias inflamables, tóxicas, volátiles, venenosas, peligrosas o ilegales. <br />
                            • transportar una mascota sin el consentimiento explícito del propietario. Los conductores que traigan mascotas en su viaje aún pueden estar sujetos a tarifas de limpieza. <br />
                            • Realizar alteraciones, adiciones o mejoras a cualquier vehículo. <br />
                            • Fumar en el coche. <br />
                            • Repostar un vehículo con un tipo de combustible inadecuado. <br />
                            • Dejar un vehículo desatendido mientras está en marcha o con las llaves en el vehículo.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Tab>
                <Tab label="Conductores">
                <div className={css.accordions}>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué es una autorización previa? </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Se toma una autorización previa para garantizar que cualquier cargo adicional que surja de su viaje en forma de imprevistos se pueda liquidar de manera adecuada y compensar al propietario. Una vez que un conductor completa tres viajes sin presentar inconvenientes con los propietarios y la plataforma, no se le requerirá una autorización previa a menos que haya tenido una disputa. <br /><br />
                            Esta autorización previa puede aparecer como una transacción pendiente en su banca por Internet, cuenta de PayPal o extracto de la tarjeta de crédito. La preautorización es temporal y será liberada desde nuestro final 24 horas después de que finalice el viaje. El dinero nunca sale de su cuenta, es solo una retención para garantizar que la tarjeta de crédito sea válida y funcione. Cuando se libere la autorización previa, no verá un crédito del monto que regrese a su cuenta. En cambio, el cargo pendiente desaparece y los fondos vuelven a estar disponibles para usted. Una vez que nos liberemos de nuestro final, puede tomar de 5 a 6 días para que desaparezca de su cuenta, dependiendo del banco.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Rentalo cobra un depósito de seguridad por los alquileres?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Rentalo no cobra ningún depósito de seguridad por los viajes realizados. En casos específicos, hay una preautorización de US$ 250 (sin cargo) en la tarjeta de crédito / débito del conductor. Esta preautorización es aplicable solo para los siguientes casos: <br />
                            a Un nuevo conductor con menos de 3 viajes. Una vez que el nuevo conductor complete 3 viajes con éxito sin ningún problema, no se requerirá autorización previa para otros viajes. <br />
                            b Si un conductor ha estado involucrado en una disputa / accidente, los viajes futuros requerirán una autorización previa de US$ 250.
                            Una vez finalizado el viaje, la preautorización se libera a las 24 horas. La revocación de la autorización previa puede demorar entre 5 y 7 días en reflejarse en su cuenta, según su tarjeta.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué significa el coche compartido de igual a igual?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Esto significa que las personas que poseen un automóvil pueden alquilar su automóvil a otras personas cuando no necesitan su automóvil. El viaje estará asegurado a todo riesgo para la tranquilidad del propietario y del conductor.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Por qué debería alquilar con Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Rentalo es el acceso más conveniente a los automóviles en República Dominicana. Ofrecemos la mayor variedad de autos cercanos con solo hacer clic en un botón. Rentalo utiliza horas de automóvil no utilizadas de propietarios de automóviles individuales y eso hace que por lo general y en circunstancias normales, los alquileres en Rentalo sean un 30-40% más baratos que las empresas de alquiler tradicionales.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Soy elegible para alquilar un auto en Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            <strong>1. Para ciudadanos de República Dominicana / residentes permanentes: </strong> <br />
                            Debe tener una licencia de conducir válida en la República Dominicana durante el tiempo del alquiler, asi como una tarjeta de credito activa.ra verificar la nueva ID de correo electrónico. <br /><br />

                            <strong>2. Para extranjeros que visiten la republica dominicana  </strong> <br />
                            Debe tener una licencia de conducir válida en su país de origen o residencia y está será vigente durante 30-90 luego de concluida de su estadía en la República Dominicana, asi como una tarjeta de credito activa. <br /><br />
                            <strong>3. Para extranjeros con visa de negocios, estudios, trabajo, residencia, dependencia etc que residan en el país o excedan 30-90 de su estadía en RD. </strong> <br />
                            El extranjero debe obtener / convertir a una licencia de conducir de República Dominicana.<br /> <br />Es posible que solicitemos documentos adicionales para verificación en algunos casos, incluyendo tener una tarjeta de credito activa..
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo crear una cuenta?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>

                            <strong>Qué necesitas para crear una cuenta:</strong> <br />
                            •  Una dirección de correo electrónico: elija el correo electrónico que consulte con regularidad; nos • • comunicaremos con usted allí para informarle sobre su cuenta y sus viajes. <br />
                            • Un número de teléfono vinculado a un teléfono móvil habilitado para texto a  su nombre. <br />
                            • Una vez que verifiquemos su correo electrónico y número de teléfono, le notificaremos que se ha creado su cuenta.  <br />
                            Cuando crea una cuenta, le da a Rentalo instrucciones por escrito y permiso de acuerdo con los datos personales o leyes similares para obtener su informe de crédito personal y / o comercial y / o realizar una verificación de antecedentes penales. También autoriza a Rentalo a obtener su puntaje de seguro de automóvil de una agencia de informes del consumidor.

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué está incluido en el precio del alquiler?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            El precio del viaje incluye el importe del alquiler y los gastos de viaje (incluida la póliza de seguro). El combustible, el estacionamiento corren a cargo del arrendatario por separado.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Para qué puedo utilizar el vehículo alquilado?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Puede utilizar el coche para uso personal y viajes de negocios. No se permite el transporte de pasajeros en automóviles alquilados en Rentalo.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuál es la duración del viaje y cómo se calculan los cargos?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Los cargos se calculan por día, dependiendo de la duración para la que haya reservado el automóvil. Su viaje puede comenzar y terminar en cualquier momento que usted y su propietario acuerden; sin embargo, la unidad más pequeña que cargaremos es un día.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Existe un período de alquiler mínimo y máximo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            El período mínimo de alquiler está sujeto a disponibilidad del propietario. Puede optar por alquilarlo durante el tiempo que desee según la disponibilidad del automóvil.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo se calcula el costo del viaje?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            El costo total de un viaje se compone de estos elementos: <br />
                            <strong>•  Precio del viaje :</strong>esta es la tarifa diaria indicada de un vehículo multiplicada por la duración del viaje. Cada propietario establece su propia tarifa diaria estándar. <br /><br />
                            <strong>•  Tarifa de viaje y seguro :</strong> Las tarifas de viaje varían según, el modelo de automóvil y el precio del viaje. <br /><br />
                            <strong>•  Tarifas de procesamiento  :</strong> % del precio y la tarifa del viaje para cubrir costos y gastos de mantenimiento de la plataforma. (para cubrir los costos de la tarjeta de crédito y débito)[no se permite cargar los costos de las tarjetas de creditos a los usuarios de estas] <br /><br />
                            <strong>•  En general y en ciscunstancias normales :</strong>el costo total del viaje es aproximadamentegeneralmente un 30-40% más barato en comparación con las empresas de alquiler tradicionales. <br /><br />
                            <strong>Ejemplo A:</strong>  <br />
                            El propietario decide el precio de alquiler de su automóvil en US$ 80 por día. Un conductor de 30 años quiere alquilar el coche por un día. El desglose del costo del viaje sería el siguiente:
                            <br /><br />
                            Precio del viaje diario: $ 80 <br />
                            Tarifas de viaje diario: $ 20 <br />
                            Tarifas de procesamiento: $ 4 <br />
                            Costo total del viaje: $ 104 <br />
                            El conductor paga $ 100, el propietario recibe $80 y Rentalo recibe $20. (alquiler 24 horas) <br />

                            <br />
                            <strong>Ejemplo B:</strong> <br />
                            <strong>¿Acabo de hacer una solicitud de reserva y el pago se ha deducido de mi tarjeta?</strong> <br />
                            No te preocupes. Su pago está completamente asegurado. Cuando un conductor inicia una solicitud de reserva, el monto de la reserva solo está preautorizado (no se cobra). <br />
                            Esto NO es un cargo. Es solo una preautorización (similar a cuando se registra en un hotel). Si se acepta la reserva, esto se convierte en un cargo. Si no se acepta, se revierte. Esta preautorización se realiza para garantizar que el conductor tenga dinero en la cuenta para pagar el alquiler. <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Cómo se aseguran los alquileres?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Todos los viajes están asegurados con una póliza de seguro, lo que significa una cobertura por daños a terceros (personas y propiedad), e incluye daños al vehículo de alquiler y robo, y cualquier lesión.  <br /><br />
                            El detalle del seguro a todo riesgo es el siguiente: <br />

                            •  Daños a la propiedad de terceros (hasta RD$ 1,000,000) <br />
                            •  Pérdida o daño de su vehículo por causas de accidente (hasta el 60% valor de mercado en el momento de la pérdida o daño)<br />
                            •  Pérdida de daños por incendio o robo (hasta el 60% valor de mercado en el momento de la pérdida o daño)<br />
                            •  Riesgo Familiar – Relación Laboral (RD$50,000)<br />
                            •  Asistencia vial <br />
                            <br />
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Tab>
              </Tabs>

              {/* <Tabs
                activeTab="1"
                className={css.faqTab}
                ulClassName={css.faqTabList}
                activityClassName={css.active}
                onClick={(event, tab) => {}}
              >
                <Tab title="Generales" className={css.tab}>
                  <div className={css.accordions}>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué es Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Es la plataforma de alquiler de autos más novedosa, segura y rentable. En Réntalo si eres dueño de un vehículo o una flota completa puedes rentarlo a ciudadanos y turistas de todo el mundo. El viaje estará asegurado por nuestra póliza de seguro para tranquilidad del propietario y el conductor.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo cambio mi número de teléfono en Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            <span>
                              Puedes cambiar fácilmente tu número de teléfono llamando al soporte al cliente: +1(829) 657-5069.
                            </span>
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo cambio mi ID de correo electrónico en Rentalo? </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            La ID de correo electrónico se puede cambiar en cualquier momento simplemente siguiendo los pasos a continuación: <br />
                            A través del sitio web <br />
                            1. Inicie sesión en su cuenta de Rentalo.  <br />
                            2. En el menú desplegable Usuario, seleccione 'Configuración de la cuenta'. <br />
                            3. Verá la pestaña Detalles de contacto abierta, con su ID de correo electrónico actual en el campo 'Dirección de correo electrónico'. <br />
                            4. Ingrese un nuevo correo electrónico válido en este campo.  <br />
                            5. Se le pedirá que ingrese su contraseña nuevamente. Ingrese la contraseña y haga clic en 'Guardar cambios'. <br />
                            6. Su nuevo correo electrónico se guardará en el sistema y recibirá un correo electrónico con esta nueva ID para verificar la nueva ID de correo electrónico. <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>No recibí el correo electrónico de verificación. ¿Qué hacer?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            No hay problema. Asegúrese de revisar su carpeta de SPAM en su buzón. A veces, el correo electrónico de verificación llega a la carpeta SPAM. Si eso no funciona, regrese a <a style={{ textDecoration: 'underline' }} href="www.rentaloinc.com">www.rentaloinc.com</a> y verá una ventana emergente pidiéndole que verifique su correo electrónico. Presiona "Reenviar correo electrónico de verificación" en la pantalla emergente. Si aún no recibe el correo electrónico de verificación, envíenos un mensaje por chat o correo electrónico a <a style={{ textDecoration: 'underline' }} href="mailto?soporte@rentaloinc.com">soporte@rentaloinc.com</a> y estaremos encantados de resolverlo por usted.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo canjeo mis créditos de viaje? </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Este art&iacute;culo detalla c&oacute;mo se pueden usar los cr&eacute;ditos de viaje en Réntalo® <br />
                            Los propietarios y conductores de Réntalo® pueden beneficiarse de los cr&eacute;ditos de viaje
                            que reciben. Los propietario y conductores pueden canjear los cr&eacute;ditos de viaje en
                            cualquier viaje de Réntalo®. <br /><br />
                            <span style={{ marginLeft: '20px' }}>1. Los hu&eacute;spedes pueden utilizar los cr&eacute;ditos disponibles al hacer una
                              reserva. Para cualquier viaje, los $ 10 de los cr&eacute;ditos se pueden usar en
                              cualquier momento. Por ejemplo, si un hu&eacute;sped tiene $ 30 en cr&eacute;ditos,
                              puede usarlo en 3 viajes.</span> <br /><br />
                            <span style={{ marginLeft: '20px' }}>2. Los propietarios recibir&aacute;n pagos autom&aacute;ticos por los viajes que organizan
                              seg&uacute;n su saldo de cr&eacute;dito. Por cada viaje, pueden canjear un m&aacute;ximo de $
                              10. Esto suceder&aacute; autom&aacute;ticamente sin que el propietario tenga que hacer
                              nada. Por ejemplo, si un propietario tiene $ 60 en cr&eacute;ditos, recibir&aacute; $ 10
                              adicionales en el momento en que organice un viaje y su saldo de cr&eacute;dito
                              se reducir&aacute; a $ 50. Otro ejemplo, si un propietario tiene $ 5 en cr&eacute;ditos,
                              entonces se le pagar&aacute;n $ 5 adicionales cuando organice un viaje y su saldo
                              de cr&eacute;dito ser&aacute; cero.</span> <br /><br />
                            La validez de los cr&eacute;ditos es de 6 meses a partir de la fecha de recepci&oacute;n de los <br />
                            cr&eacute;ditos. Comun&iacute;quese con nosotros en caso de aclaraciones.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Tab>
                <Tab title="Propietarios" className={css.tab}>
                  <div className={css.accordions}>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué significan los términos "propietario" y "conductor"?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Los propietarios son dueños de automóviles que desean rentar su automóvil. Los conductores son personas que desean alquilar un automóvil de un propietario en Rentalo.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuánto puedo ganar como propietario?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Depende de la cantidad de días que alquile su automóvil y del precio que establezca. En promedio, las personas que alquilan una vez a la semana probablemente ganarán alrededor de USD$5,000 al año. Consulte nuestra herramienta de estimación para ver cuánto puede ganar al compartir su modelo de automóvil específico.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuál es el proceso para registrar mi auto en Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Registrar su automóvil en Rentalo es un proceso extremadamente simple y no debería llevarle más de 10 minutos hacerlo siempre que tenga toda la documentación requerida.
                            <br />
                            1. Visite <a style={{ textDecoration: 'underline' }} href="www.rentaloinc.com">www.rentaloinc.com</a>
                            <br />
                            2. Regístrese con su dirección de correo electrónico. Verifique con su teléfono y dirección de correo electrónico.
                            <br />
                            3. Sube una foto de perfil para ti. Esto es para que los conductores tengan una cara al nombre de la persona a la que alquilan.
                            <br />
                            4. Haga clic en la pestaña "Incluya su automóvil" en la parte superior derecha.
                            <br />
                            5. Esto requerirá que ingrese algunos detalles básicos de su automóvil. Simplemente siga las instrucciones en cada una de las páginas. Es superfácil :
                            <br />
                            6. Comience con la ubicación de su automóvil seguido de la descripción, el nombre de la marca, el número de modelo. etc. Estos son algunos detalles básicos.
                            <br />
                            7. Ingrese las reglas que desea que sus conductores cumplan, por ejemplo, no fumar / no permitirles conducir a Haití, etc.
                            <br />
                            8. Ingrese el precio por día que desee para su automóvil. El período mínimo de alquiler es de 24 horas. No te preocupes. También puede cambiar esto más tarde.
                            <br />
                            9. Deberá hacer clic en algunas imágenes de su automóvil y cargarlas. Si no tiene las imágenes de inmediato, no se preocupe. Puede y debe cargarlos más tarde ( consulte nuestra guía de fotografía ). También puede optar por contar con la ayuda de nuestros fotógrafos profesionales para tomar fotografías de su automóvil. Es un servicio gratuito solo durante unos días.
                            <br />
                            10. Su automóvil en Rentalo estará cubierto a través de nuestra política integral cuando esté en un viaje de Rentalo. Solo necesitamos que usted nos confirme que tiene una póliza de seguro privada vigente para su automóvil.
                            <br />
                            11. Según disponibilidad, marque cuándo estará disponible su coche para alquilar. Siempre puedes actualizar esto más tarde.
                            <br />
                            12. El último paso es la verificación del propietario, en la que necesitamos algunos detalles sobre usted: copia de su CÉDULA / PASAPORTE. Lo más importante es que también necesitamos que ingrese los detalles de la cuenta en la que desea recibir el pago de los alquileres realizados en Rentalo.
                            <br />
                            No se preocupe, su información está segura ya que tenemos una política de privacidad muy estricta.
                            <br />
                            Una vez hecho esto, siéntese y relájese. Verificaremos sus documentos y confirmaremos su aprobación y la de su listado en breve.
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

                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo se garantiza la seguridad de mi coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Llevamos controles estrictos a los conductores que alquilan en Rentalo a través de su CÉDULA / PASAPORTE y su licencia de conducir. Aunque es muy poco probable, en caso de cualquier incidente desafortunado, su automóvil está asegurado por la póliza de seguro que incluye lo siguiente: <br />
                            • Muerte o lesiones a terceros (hasta RD$ 1,000,000) <br />
                            • Daños a la propiedad de terceros (hasta RD$ 1,000,000) <br />
                            • Pérdida o daño de su vehículo por causas de accidente (hasta el 60% valor de mercado en el momento de la pérdida o daño) <br />
                            • Pérdida de daños por incendio o robo (hasta 60%valor de mercado en el momento de la pérdida o daño) <br />
                            • Riesgo Familiar – Relación Laboral (RD$50,000)<br />
                            • Asistencia vial <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Por qué debería rentar mi coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Como propietario de un automóvil, se enfrenta a muchos costos, como seguros, depreciación, impuestos de circulación, mantenimientos, etc., independientemente del uso. Al rentar su automóvil en Rentalo, puede obtener ingresos adicionales y administrar mejor estos costos. Y lo que es más importante, el uso compartido de automóviles tiene un impacto positivo en nuestro medio ambiente al reducir la cantidad de automóviles en la carretera.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Es obligatorio alquilar si registro mi coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            No. Como propietario de un automóvil, es su decisión aceptar o rechazar una solicitud de reserva. Tú fijas el precio y decides a quién y cuando alquilas tu coche.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo puedo alquilar mi coche con la mayor frecuencia posible?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            <strong>Toma buenas fotos de tu auto</strong> <br />
                            Cuando los conductores buscan un automóvil, las fotos son lo primero que miran. Cuanto mejores sean las fotos, más probable será que alguien quiera alquilar su coche. Lea nuestros consejos para descubrir cómo mejorar las fotos de su automóvil. También debería considerar agregar una foto de perfil. <br />
                            <br />

                            <strong>Seleccione un precio justo</strong> <br />
                            Un precio justo es aquel que es consistente con la edad y el modelo de su automóvil, así como con la época del año y el nivel de demanda. Si es un nuevo propietario, comience con un precio bastante bajo para facilitar la obtención de sus primeros alquileres y obtener algunas críticas positivas.
                            <br />
                            <br />
                            <strong>Describe tu auto</strong> <br />
                            Brinde a los conductores tantos detalles como sea posible: modelo exacto, estado general del vehículo, limpieza, cualquier problema menor que señalar, opciones y accesorios. <br />
                            <br />
                            <strong>Actualiza tu calendario</strong> <br />
                            Mantenga su calendario actualizado para asegurarse de recibir solicitudes solo cuando su vehículo esté disponible. Esto evitará que lo molesten innecesariamente y, lo que es más importante, le permitirá aceptar tantas solicitudes como sea posible, lo que lo ayudará a avanzar en los resultados de búsqueda.
                            <br />
                            <br />

                            <strong>Responda rápidamente a las solicitudes</strong> <br />
                            Cuanto más rápido responda, más alto aparecerá su anuncio en los resultados de búsqueda.   <br />
                            <br />

                            <strong>Di SÍ a las solicitudes</strong> <br />
                            Una respuesta es buena, ¡pero un SÍ es aún mejor! Su tasa de aceptación (número de respuestas positivas del total de solicitudes recibidas) juega un papel importante en la clasificación de su anuncio en los resultados de búsqueda. Lea nuestros consejos para aceptar tantas solicitudes como sea posible.
                            <br />
                            <br />
                            <strong>Especifique sus condiciones de alquiler</strong> <br />
                            Para evitar que le molesten las solicitudes de alquiler que no le convienen y para mejorar su tasa de respuesta positiva, establezca condiciones de alquiler para su automóvil: duración del alquiler (por ejemplo, alquiler mínimo de 2 días) y límites de reserva (por ejemplo, sin solicitudes de última hora).
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Por qué se requiere mi CÉDULA / PASAPORTE?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Necesitamos tener credenciales válidas del propietario del automóvil. Para que el automóvil esté asegurado durante el viaje, debemos asegurarnos de que CÉDULA / PASAPORTE esté mencionado en el seguro del viaje.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué protección tengo contra los daños del coche?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Llevamos controles estrictos a los conductores que alquilan en Rentalo a través de su CÉDULA / PASAPORTE y su licencia de conducir. Aunque es muy poco probable, en el caso de cualquier incidente desafortunado, su automóvil está asegurado por la póliza de seguro que incluye lo siguiente: <br />
                            riesgo a través de la protección Rentalo, que incluye lo siguiente : <br />
                            • Muerte o lesiones a terceros (hasta RD$ 1,000,000)  <br />
                            • Daños a la propiedad de terceros (hasta RD$ 1,000,000)  <br />
                            • Pérdida o daño de su vehículo por causas de accidente (hasta el 60% valor de mercado en el momento de la pérdida o daño)  <br />
                            • Pérdida de daños por incendio o robo (hasta 60%valor de mercado en el momento de la pérdida o daño) <br />
                            • Riesgo Familiar – Relación Laboral (RD$50,000) <br />
                            • Asistencia vial  <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué tipo de usos de mi coche están permitidos y qué no?  </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Como propietario, puede definir cuáles son las reglas de su automóvil durante el proceso de listado. Los conductores pueden utilizar el coche para su uso personal de forma segura. <br /><br />
                            Solo los conductores verificados por Rentalo pueden reservar y conducir un automóvil durante un viaje Rentalo. Ser un "conductor verificado" significa que el conductor ha proporcionado y actualizado toda la documentación requerida, sigue cumpliendo con todos los requisitos de elegibilidad de Rentalo y que el conductor está actualmente al día. <br /><br />Participar en usos prohibidos con un vehículo reservado a través de Rentalo será motivo de multas, suspensión y / o cancelación de su membresía. También reducirá la cobertura de responsabilidad del conductor a los límites mínimos de si o anulará la cobertura cuando lo permita la ley de República Dominicana aplicable; el propietario ha alentado la participación en un Uso Prohibido, se puede imponer una multa y / o suspensión. <strong>Participar en usos prohibidos también eliminará cualquier cobertura para el conductor por cualquier reclamo relacionado con daños físicos.</strong>
                            <br /><br />
                            <strong>Los usos y actividades de vehículos prohibidos incluyen:</strong>  <br />
                            • Permitir que el vehículo sea empujado o remolcado por cualquier persona que no sea un vehículo de servicio o policía autorizado. <br />
                            • Usar un vehículo reservado a través de Rentalo para: <br />
                            •  remolcar o empujar cualquier cosa. <br />
                            • que no sean carreteras pavimentadas (ya sea "todoterreno", conducción en carreteras no mejoradas o áreas de estacionamiento, o de otro modo). <br />
                            •  en cualquier carrera, prueba o competición. con la intención de causar daño, o con un desprecio lascivo, deliberado o imprudente por la seguridad. <br />
                            • Prácticas de aprendizaje o entrenamiento. <br />
                            • para transportar personas o bienes "por alquiler" o para transportar personas o bienes a cambio de una compensación o una tarifa, incluidos, entre otros, servicios de taxi, paquetes, alimentos o servicios de entrega de comestibles. Sin embargo, puede usar el automóvil para fines comerciales, como asistir a reuniones y llevar materiales asociados. <br />
                            • a menos que se haya reservado un viaje. El uso de vehículos sin reserva o fuera del horario de viaje constituye un uso no autorizado. <br />
                            • durante o como parte de la comisión de un delito o cualquier otra actividad o propósito ilegal. Al utilizar tu vehículo en apuestas, desafíos, carreras o concursos de cualquier naturaleza, inclusive en preparatorias. <br />
                            • mientras el conductor esté bajo la influencia de alcohol por encima del límite legal. <br />
                            • cualquier droga o medicación bajo cuyos efectos esté prohibida o no recomendada la operación de un vehículo. <br />
                            • cuando se ha cargado más allá de su capacidad nominal o con más pasajeros de los que el vehículo tiene cinturones de seguridad. <br />
                            • fuera de las áreas geográficas de uso aprobadas según lo especificado durante la reserva. <br />
                            • sin una licencia válida o si no cumple con nuestros requisitos de elegibilidad. Es su responsabilidad informarnos cuando su licencia caduque o se suspenda, o si cree que ya no puede cumplir con nuestros Requisitos de elegibilidad. <br />
                            • para transportar sustancias inflamables, tóxicas, volátiles, venenosas, peligrosas o ilegales. <br />
                            • transportar una mascota sin el consentimiento explícito del propietario. Los conductores que traigan mascotas en su viaje aún pueden estar sujetos a tarifas de limpieza. <br />
                            • Realizar alteraciones, adiciones o mejoras a cualquier vehículo. <br />
                            • Fumar en el coche. <br />
                            • Repostar un vehículo con un tipo de combustible inadecuado. <br />
                            • Dejar un vehículo desatendido mientras está en marcha o con las llaves en el vehículo.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Tab>
                <Tab title="Conductores" className={css.tab}>
                  <div className={css.accordions}>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué es una autorización previa? </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Se toma una autorización previa para garantizar que cualquier cargo adicional que surja de su viaje en forma de imprevistos se pueda liquidar de manera adecuada y compensar al propietario. Una vez que un conductor completa tres viajes sin presentar inconvenientes con los propietarios y la plataforma, no se le requerirá una autorización previa a menos que haya tenido una disputa. <br /><br />
                            Esta autorización previa puede aparecer como una transacción pendiente en su banca por Internet, cuenta de PayPal o extracto de la tarjeta de crédito. La preautorización es temporal y será liberada desde nuestro final 24 horas después de que finalice el viaje. El dinero nunca sale de su cuenta, es solo una retención para garantizar que la tarjeta de crédito sea válida y funcione. Cuando se libere la autorización previa, no verá un crédito del monto que regrese a su cuenta. En cambio, el cargo pendiente desaparece y los fondos vuelven a estar disponibles para usted. Una vez que nos liberemos de nuestro final, puede tomar de 5 a 6 días para que desaparezca de su cuenta, dependiendo del banco.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Rentalo cobra un depósito de seguridad por los alquileres?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Rentalo no cobra ningún depósito de seguridad por los viajes realizados. En casos específicos, hay una preautorización de US$ 250 (sin cargo) en la tarjeta de crédito / débito del conductor. Esta preautorización es aplicable solo para los siguientes casos: <br />
                            a Un nuevo conductor con menos de 3 viajes. Una vez que el nuevo conductor complete 3 viajes con éxito sin ningún problema, no se requerirá autorización previa para otros viajes. <br />
                            b Si un conductor ha estado involucrado en una disputa / accidente, los viajes futuros requerirán una autorización previa de US$ 250.
                            Una vez finalizado el viaje, la preautorización se libera a las 24 horas. La revocación de la autorización previa puede demorar entre 5 y 7 días en reflejarse en su cuenta, según su tarjeta.
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ marginBottom: '20px', borderRadius: '10px' }} className={css.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#FF7900', border: '2px solid #FFC79429', borderRadius: '50%', background: '#FFC79429' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={css.accordionSummary}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué significa el coche compartido de igual a igual?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Esto significa que las personas que poseen un automóvil pueden alquilar su automóvil a otras personas cuando no necesitan su automóvil. El viaje estará asegurado a todo riesgo para la tranquilidad del propietario y del conductor.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Por qué debería alquilar con Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Rentalo es el acceso más conveniente a los automóviles en República Dominicana. Ofrecemos la mayor variedad de autos cercanos con solo hacer clic en un botón. Rentalo utiliza horas de automóvil no utilizadas de propietarios de automóviles individuales y eso hace que por lo general y en circunstancias normales, los alquileres en Rentalo sean un 30-40% más baratos que las empresas de alquiler tradicionales.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Soy elegible para alquilar un auto en Rentalo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            <strong>1. Para ciudadanos de República Dominicana / residentes permanentes: </strong> <br />
                            Debe tener una licencia de conducir válida en la República Dominicana durante el tiempo del alquiler, asi como una tarjeta de credito activa.ra verificar la nueva ID de correo electrónico. <br /><br />

                            <strong>2. Para extranjeros que visiten la republica dominicana  </strong> <br />
                            Debe tener una licencia de conducir válida en su país de origen o residencia y está será vigente durante 30-90 luego de concluida de su estadía en la República Dominicana, asi como una tarjeta de credito activa. <br /><br />
                            <strong>3. Para extranjeros con visa de negocios, estudios, trabajo, residencia, dependencia etc que residan en el país o excedan 30-90 de su estadía en RD. </strong> <br />
                            El extranjero debe obtener / convertir a una licencia de conducir de República Dominicana.<br /> <br />Es posible que solicitemos documentos adicionales para verificación en algunos casos, incluyendo tener una tarjeta de credito activa..
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo crear una cuenta?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>

                            <strong>Qué necesitas para crear una cuenta:</strong> <br />
                            •  Una dirección de correo electrónico: elija el correo electrónico que consulte con regularidad; nos • • comunicaremos con usted allí para informarle sobre su cuenta y sus viajes. <br />
                            • Un número de teléfono vinculado a un teléfono móvil habilitado para texto a  su nombre. <br />
                            • Una vez que verifiquemos su correo electrónico y número de teléfono, le notificaremos que se ha creado su cuenta.  <br />
                            Cuando crea una cuenta, le da a Rentalo instrucciones por escrito y permiso de acuerdo con los datos personales o leyes similares para obtener su informe de crédito personal y / o comercial y / o realizar una verificación de antecedentes penales. También autoriza a Rentalo a obtener su puntaje de seguro de automóvil de una agencia de informes del consumidor.

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Qué está incluido en el precio del alquiler?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            El precio del viaje incluye el importe del alquiler y los gastos de viaje (incluida la póliza de seguro). El combustible, el estacionamiento corren a cargo del arrendatario por separado.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Para qué puedo utilizar el vehículo alquilado?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Puede utilizar el coche para uso personal y viajes de negocios. No se permite el transporte de pasajeros en automóviles alquilados en Rentalo.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cuál es la duración del viaje y cómo se calculan los cargos?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Los cargos se calculan por día, dependiendo de la duración para la que haya reservado el automóvil. Su viaje puede comenzar y terminar en cualquier momento que usted y su propietario acuerden; sin embargo, la unidad más pequeña que cargaremos es un día.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Existe un período de alquiler mínimo y máximo?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            El período mínimo de alquiler está sujeto a disponibilidad del propietario. Puede optar por alquilarlo durante el tiempo que desee según la disponibilidad del automóvil.
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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>¿Cómo se calcula el costo del viaje?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            El costo total de un viaje se compone de estos elementos: <br />
                            <strong>•  Precio del viaje :</strong>esta es la tarifa diaria indicada de un vehículo multiplicada por la duración del viaje. Cada propietario establece su propia tarifa diaria estándar. <br /><br />
                            <strong>•  Tarifa de viaje y seguro :</strong> Las tarifas de viaje varían según, el modelo de automóvil y el precio del viaje. <br /><br />
                            <strong>•  Tarifas de procesamiento  :</strong> % del precio y la tarifa del viaje para cubrir costos y gastos de mantenimiento de la plataforma. (para cubrir los costos de la tarjeta de crédito y débito)[no se permite cargar los costos de las tarjetas de creditos a los usuarios de estas] <br /><br />
                            <strong>•  En general y en ciscunstancias normales :</strong>el costo total del viaje es aproximadamentegeneralmente un 30-40% más barato en comparación con las empresas de alquiler tradicionales. <br /><br />
                            <strong>Ejemplo A:</strong>  <br />
                            El propietario decide el precio de alquiler de su automóvil en US$ 80 por día. Un conductor de 30 años quiere alquilar el coche por un día. El desglose del costo del viaje sería el siguiente:
                            <br /><br />
                            Precio del viaje diario: $ 80 <br />
                            Tarifas de viaje diario: $ 20 <br />
                            Tarifas de procesamiento: $ 4 <br />
                            Costo total del viaje: $ 104 <br />
                            El conductor paga $ 100, el propietario recibe $80 y Rentalo recibe $20. (alquiler 24 horas) <br />

                            <br />
                            <strong>Ejemplo B:</strong> <br />
                            <strong>¿Acabo de hacer una solicitud de reserva y el pago se ha deducido de mi tarjeta?</strong> <br />
                            No te preocupes. Su pago está completamente asegurado. Cuando un conductor inicia una solicitud de reserva, el monto de la reserva solo está preautorizado (no se cobra). <br />
                            Esto NO es un cargo. Es solo una preautorización (similar a cuando se registra en un hotel). Si se acepta la reserva, esto se convierte en un cargo. Si no se acepta, se revierte. Esta preautorización se realiza para garantizar que el conductor tenga dinero en la cuenta para pagar el alquiler. <br />

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
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Cómo se aseguran los alquileres?</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={css.accordionDetails}>
                        <Typography sx={{ textAlign: 'justify' }}>
                          <Box sx={{ background: '#F8F8F8 0% 0% no-repeat padding-box', padding: '10px' }}>
                            Todos los viajes están asegurados con una póliza de seguro, lo que significa una cobertura por daños a terceros (personas y propiedad), e incluye daños al vehículo de alquiler y robo, y cualquier lesión.  <br /><br />
                            El detalle del seguro a todo riesgo es el siguiente: <br />

                            •  Daños a la propiedad de terceros (hasta RD$ 1,000,000) <br />
                            •  Pérdida o daño de su vehículo por causas de accidente (hasta el 60% valor de mercado en el momento de la pérdida o daño)<br />
                            •  Pérdida de daños por incendio o robo (hasta el 60% valor de mercado en el momento de la pérdida o daño)<br />
                            •  Riesgo Familiar – Relación Laboral (RD$50,000)<br />
                            •  Asistencia vial <br />
                            <br />
                          </Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Tab>
              </Tabs> */}
            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FAQsPage;
