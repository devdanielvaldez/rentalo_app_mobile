import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';

import arrayMutators from 'final-form-arrays';
import {
  Button,
  FieldTextInput,
} from '../../components';
import css from './CustomForm.module.css';

import whatsapp from './whatsapp-icon.svg';
import mail from './mail.svg';
import phone from './phone.svg';
import question from './question.svg';
import music from './music.svg';

import green from './Group 2334.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NamedLink from '../NamedLink/NamedLink';

import Modal from '../Modal/Modal';
import './mui.css';


const CustomForm = props => {
  const onSubmit = values => {
    console.log(values);
  };

  const onChange = formValues => {
    console.log(formValues.values);
  };


  const { sendEmail ,open,setOpen,loading} = props;

  return (
    <div className={css.customFormContainer}>
      <FinalForm
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            handleSubmit,
            invalid,
            pristine,
            submitting,
            // formName,
            // emailSend,
            values,
          } = fieldRenderProps;

          // const required = validators.required('This field is required');
          const submitDisabled = invalid || pristine || submitting;
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
                <div className={css.leftForm}>
                  <div className={css.contactForm}>
                    <div className={css.leftPart}>
                      <div className={css.formRow}>
                        <h4>Tu nombre</h4>
                        <FieldTextInput
                          className={css.field}
                          type="text"
                          id="name"
                          name="name"
                          //   validate={required}
                        />
                      </div>
                      <div className={css.formRow}>
                        <h4>Correo</h4>
                        <FieldTextInput
                          className={css.field}
                          type="text"
                          id="email"
                          name="email"
                          //   validate={required}
                        />
                      </div>
                      {/* <div className={css.formRow}>
                        <h4>Adjuntar documentos</h4>
                        <div className={css.selectInput}>
                          <div className={css.upload}>
                            <FileUpload />
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className={css.rightPart}>
                      <div className={css.formRow}>
                        <h4>Mensaje</h4>
                        <FieldTextInput
                          className={css.message}
                          type="textarea"
                          id="message"
                          name="message"
                          //   validate={required}
                        />
                      </div>
                      {/* <div className={css.formRow}>
                        <h4>Incidencias</h4>
                        <FieldSelect
                          className={css.fieldSelect}
                          id="fieldSelect"
                          name="fieldSelect"
                          placeholder="Seleccionar una"
                          //validate={required}
                        >
                          <option value="" hidden disabled>
                            Seleccionar una
                          </option>
                          <option value="first">Ayuda</option>
                          <option value="second">Pregunta</option>
                          <option value="third">Problema</option>
                        </FieldSelect>
                      </div> */}
                    </div>
                  </div>
                  <div className={css.btttonSection}>
                    <Button
                      className={css.submit}
                      type="submit"
                      disabled ={submitDisabled}
                      inProgress={loading}
                      onClick={()=>sendEmail(values)}
                    >
                      Enviar mensaje
                    </Button>
                  </div>

               <Modal
                    isOpen={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    onManageDisableScrolling={() => {}}
                  >
                    <div className={css.modal}>
                      <img src={green} alt='image' />
                      <h2>Tu mensaje se ha enviado!</h2>
                      <p>
                        Gracias por contactarnos, pronto nos comunicaremos contigo. Te invitamos a
                        seguir explorando la plataforma
                      </p>
                    </div>
                  </Modal>
                </div>
                <div className={css.rightText}>
                  <h2 className={css.hablemos}>HABLEMOS</h2>
                  <h2 className={css.heading}>Ponte en contacto con personas reales</h2>
                  <p className={css.pTag}>
                    Le responderemos por correo electrónico o puede proporcionarnos un número de
                    teléfono si lo prefiere.
                  </p>
                </div>
              </div>
              <div className={css.topbarMobile}>
                <h2>Contactanos</h2>
              </div>
              <div className={css.socialContact}>
                <div className={css.box1}>
                  <h2 className={css.boxTitle}>Conversemos ahora</h2>
                  <div className={css.row}>
                    <img src={whatsapp} width="39px" height="39px" alt='whatsapp' />
                    <div className={css.text}>
                      <p className={css.subtext}>Whatsapp</p>
                      <p className={css.subtext2}>+1 (829) 657-5069</p>
                    </div>
                  </div>
                </div>
                <div className={css.box1}>
                  <h2 className={css.boxTitle}>Escríbenos ahora</h2>
                  <div className={css.row}>
                    <img src={mail} width="39px" height="39px" alt='mail' />
                    <div className={css.text}>
                      <p className={css.subtext}>Correo</p>
                      <p className={css.subtext2}>hola@rentaloinc.com</p>
                    </div>
                  </div>
                </div>
                <div className={css.box1}>
                  <h2 className={css.boxTitle}>Llámanos ahora</h2>
                  <div className={css.row}>
                    <img src={phone} width="39px" height="39px" alt='teléfono' />
                    <div className={css.text}>
                      <p className={css.subtext}>Teléfono</p>
                      <p className={css.subtext2}>(829)-657-5069</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.section2}>
                <div className={css.ourService}>
                  <div className={css.box2} style={{ cursor: 'pointer' }}>
                    <img src={question} width="45px" alt='pregunta' />
                    <div style={{ paddingLeft: '20px' }}>
                      <p className={css.subtext}>Preguntas frecuentes</p>
                      <NamedLink name="FAQsPage">
                        <p className={css.subtext2}>
                          Visitar ahora <ArrowForwardIcon />{' '}
                        </p>
                      </NamedLink>
                    </div>
                  </div>

                  <div className={css.box2}>
                    <img src={music} width="45px" alt='música' />
                    <div style={{ paddingLeft: '20px' }}>
                      <p className={css.subtext}>Servicio de asistencia</p>
                      <p className={css.subtext2}>(829)-657-5069</p>
                    </div>
                  </div>

                  <div className={css.box2}></div>
                </div>
                <div className={css.bottomText}>
                  <p>
                    Nuestro equipo está disponible para tí. Si tienes algunas dudas, contáctanos.
                    Servicio al cliente las 24 horas, rápido y amigable.
                  </p>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default CustomForm;
