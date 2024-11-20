import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {
  Button,
  FieldTextInput,
} from '../../components';
import './mui.css';
import css from './CvForm.module.css';
import FileUploader from '../FileUploader/FileUploader';
import gang from './gang.png';
import { pushToPath } from '../../util/urlHelpers';
import car from './005-car.png';
import pickup from './001-pick-up-truck.png';
import family from './002-family-car.png';
import limousine from './006-limousine.png';
import electric from './007-electric-car.png';
import bigfoot from './008-bigfoot.png';

const CvForm = () => {
  const onSubmit = values => {
  };
  const onChange = formValues => {
  };

  return (
    <div className={css.cvFormContainer}>
      <FinalForm
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            handleSubmit,
            // invalid,
            // pristine,
            // submitting,
            // formName,
            // emailSend,
            // values,
          } = fieldRenderProps;

          // const required = validators.required('This field is required');
          // const submitDisabled = invalid || pristine || submitting;
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormSpy onChange={onChange} />
              <div className={css.topbar}></div>
              <div className={css.section1}>
                <div className={css.joinOurTeam}>
                  <div className={css.row1}>
                    <img src={car} className={css.cars} alt='coche' />
                    <img src={limousine} className={css.cars} alt='limusina' />
                    <img src={electric} className={css.cars} alt='eléctrico' />
                    <img src={pickup} className={css.cars} alt='camioneta' />
                    <img src={bigfoot} className={css.cars} alt='bigfoot' />
                    <img src={electric} className={css.cars1} alt='eléctrico' />
                    <img src={family} className={css.cars1} alt='familia' />
                    <img src={limousine} className={css.cars1} alt='limusina' />
                    <img src={electric} className={css.cars1} alt='eléctrico' />
                    <img src={car} className={css.cars1} alt='coche' />
                    <img src={pickup} className={css.cars1} alt='camioneta' />
                  </div>
                  <div className={css.cvFormContent}>
                    <h1>
                      Únete a Nuestro Equipo Dinámico
                    </h1>
                    <p className={css.title1}>
                      Envía tu CV junto con una descripción de tu experiencia y habilidades, nuestro
                      equipo se pondrá en contacto contigo
                    </p>
                    <div className={css.box}>
                      <div className={css.boxLeft}>
                        <div className={css.formRow}>
                          <label>
                            Nombre completo <span style={{ color: '#D31821' }}>*</span>
                          </label>
                          <FieldTextInput
                            className={css.field}
                            type="text"
                            id="textInput"
                            name="textInput"
                            //   validate={required}
                          />
                        </div>
                        <div className={css.formRow}>
                          <label>
                            Posición a la que aspira <span style={{ color: '#D31821' }}>*</span>
                          </label>
                          <FieldTextInput
                            className={css.field}
                            type="text"
                            id="textareaInput"
                            name="textareaInput"
                            //   validate={required}
                          />
                        </div>
                        <div className={css.formRow}>
                          <label>Sueldo deseable</label>
                          <FieldTextInput
                            className={css.field}
                            type="text"
                            id="Input"
                            name="Input"
                          />
                        </div>
                      </div>
                      <div className={css.boxRight}>
                        <div className={css.formRow}>
                          <label>Mensaje</label>
                          <FieldTextInput
                            className={css.message}
                            type="textarea"
                            id="textarea"
                            name="textarea"
                            //   validate={required}
                          />
                        </div>
                        <div className={css.selectInput}>
                          <div className={css.pdf}>
                            <h4>Arrastra y suelta aquí tu CV</h4>
                            <p>Se admiten los formatos .pdf o .docx</p>
                          </div>
                          <div className={css.upload}>
                            <FileUploader />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.joinBtn}>
                      <Button
                        className={css.submit}
                        type="submit"
                        onClick={() => pushToPath('/cv')}
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={css.ourBenefitsSec}>
                  {' '}
                  <h2 className={css.title}>
                    Conoce los beneficios de ser partede la familia Réntalo
                  </h2>
                  <div className={css.benefits}>
                    <div className={css.boxWrapper}>
                      <h2>Desarrollo de carrera</h2>
                      <p className={css.text4}>
                        Fomentamos tu crecimiento profesional con un estipendio de educación anual y
                        acceso gratuito a todos los cursos de{' '}
                        <a href="https://t-ecogroup.net/"> TECO</a>.
                      </p>
                    </div>{' '}
                    <div className={css.boxWrapper}>
                      <h2>Reconocimiento</h2>
                      <p className={css.text4}>
                        Celebramos el éxito junto con nuestro programa de reconocimiento entre pares
                        y premios mensuales para empleados por alto desenpeño.
                      </p>
                    </div>
                    <div className={css.boxWrapper}>
                      <h2> Flexibilidad</h2>
                      <p className={css.text4}>
                        Somos un primer lugar de trabajo remoto y brindamos horarios flexibles.
                      </p>
                    </div>
                    <div className={css.boxWrapper}>
                      <h2>¡Todo a largo plazo!</h2>
                      <p className={css.text4}>
                        Obtienes crédito y descuentos mensuales de Réntalo para tus amigos y
                        familiares.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.aboutUsBlock}>
                  <div className={css.aboutUsLeft}>
                    <img src={gang} className={css.image1} alt='gang' />
                  </div>
                  <div className={css.aboutUsRight}>
                    <h2 className={css.text1}>Sobre nosotros</h2>
                    <p className={css.text2}>
                      En Réntalo buscamos personas con mucha energía, apasionadas por escalar el
                      crecimiento en la economía colaborativa y que se vean a sí mismas como
                      emprendedor. Es que asumen responsabilidades. Somos una startup de rápido
                      crecimiento y necesitamos a quien traiga altos niveles de energía y pueda
                      esforzarse.
                    </p>

                    <p className={css.text2}>
                      Nuestro equipo es colaborador, positivo, curioso y comprometido. Pensamos
                      rápido, trabajamos de manera inteligente, nos reímos con frecuencia y buscamos
                      personas con ideas afines para que compartan nuestra misión, haciendo un uso
                      de los recursos compartidos más eficiente a través de la tecnología.
                    </p>
                  </div>
                </div>

                <div className={css.ourBenefitsSec}>
                  <h2 className={css.title}>
                    Conoce <strong>nuestros valores</strong>
                  </h2>
                  <div className={css.benefits}>
                    <div className={css.boxWrapper}>
                      <h2>Bienestar</h2>
                      <p className={css.text4}>
                        Velamos por el desarrollo y protección de nuestros clientes, apostando a la
                        magia relacional que surge al compartir recursos con otros, a la vez que
                        incrementan su patrimonio.
                      </p>
                    </div>{' '}
                    <div className={css.boxWrapper}>
                      <h2>Innovación</h2>
                      <p className={css.text4}>
                        Somos creativos, trabajamos con entusiasmo y optimismo, buscando nuevas
                        ideas que impacten y transformen la cadena de valor de la Empresa.
                      </p>
                    </div>
                    <div className={css.boxWrapper}>
                      <h2> Transparencia</h2>
                      <p className={css.text4}>
                        Trabajamos en confianza, de forma abierta, en armonía, compartiendo
                        responsabilidades, y alineados hacia el propósito que nos guía.
                      </p>
                    </div>
                    <div className={css.boxWrapper}>
                      <h2>Cooperación</h2>
                      <p className={css.text4}>
                        Trabajamos en equipo para lograr los objetivos y resultados clave de la
                        Empresa. Medimos lo que realmente importa, de manera consciente. Potenciamos
                        la sinergia y la inteligencia colectiva.
                      </p>
                    </div>
                    <div className={css.boxWrapper}>
                      <h2>Empatía</h2>
                      <p className={css.text4}>
                        Nos ocupamos de atender las necesidades de nuestros clientes, internos y
                        externos. Enfocándonos en sus causas e implicaciones personales, y siendo
                        asertivos en las interacciones con ellos.
                      </p>
                    </div>
                    <div className={css.boxWrapper}>
                      <h2>Pionero</h2>
                      <p className={css.text4}>
                        Alentamos a las personas a salir de su zona de confort y probar cosas
                        nuevas. Estamos desarrollando toda una industria, por lo que debemos
                        sentirnos cómodos sabiendo que no hay un libro de jugadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default CvForm;
