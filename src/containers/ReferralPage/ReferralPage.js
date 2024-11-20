import React, { useState } from 'react';
import { TopbarContainer } from '../../containers';
import {
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSideNavigation,
  Footer,
  Page,
  Button,
} from '../../components';
import css from './ReferralPage.module.css';
import { post } from '../../util/api';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { useSelector } from 'react-redux';
import { getReferralCode, getUserDisplayName, setReferralCode } from '../../util/dataExtractors';

// const sharetribeSdk = require('sharetribe-flex-sdk');
// const sdk = sharetribeSdk.createInstance({
//   clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
// });

const ReferralPage = () => {
  // const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('');
  const [successfullySend, setSuccessfullySend] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(15);
  const incrementCount = () => {
    setCount(count - 1);
  };

  const showMessage = () => {
    setTimeout(() => setShow(false), 4000);
    clearTimeout();
  }

  const { currentUser } = useSelector(state => state?.user);
  const userName = getUserDisplayName(currentUser);
  const referralCode = !!currentUser?.id && setReferralCode(currentUser?.id?.uuid);
  const userReferalCode = !!currentUser?.id && getReferralCode(currentUser);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const sendInviteEmail = () => {
    const requestOptions = {
      to: inviteEmail, // Change to your recipient
      subject: `${userName} invited you to join Réntalo®`,
      html: `
      <!doctype html>
      <html lang="en">

      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Referral</title>

        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
        <style type="text/css">
          table,
          td,
          div,
          h1,
          p {
            font-family: 'Poppins', sans-serif;
          }

          @media screen and (max-width: 1920px) {
            .col-sml {
              max-width: 42% !important;
            }

            .col-lge {
              max-width: 57% !important;
            }

            .mainContainer {
              max-width: 680px;
              width: 100%;
              box-sizing: border-box;
              margin: 20px auto;
              padding: 36px 64px;
              border: 1px solid #D1D1D1;
            }

            .mainContainerInner {
              padding: 0px;
              max-width: 100%;
            }

            .headerCon {
              width: 100%;
              padding: 0px;
            }

            .buttonFullWidth {
              width: fit-content;
            }

          }

          @media screen and (max-width: 768px) {
            .col-lge {
              max-width: 100% !important;
              margin-top: 24px;
            }

            .mainContainer {
              max-width: 100%;
              width: 100%;
              margin: 0px auto;
              padding: 26px 34px 0;
              border: 0px solid;
              display: table-cell;
            }

            .headerCon {
              border: 0px solid #D1D1D1;
              border-radius: 0px;
              padding: 0;
              width: 100%;
            }

            .buttonFullWidth {
              width: fit-content;
            }
          }

          @media screen and (max-width: 767px) {

            .col-lge {
              max-width: 100% !important;
              margin-top: 24px;
            }

            .buttonFullWidth {
              width: 100%;
            }

            .mainContainer {
              max-width: 100%;
              margin: 0;
              width: 100%;
              padding: 39px 0px 24px;
            }

            .mainContainerInner {
              max-width: 100%;
              width: 100%;
              margin: 0px auto;
              padding: 0px 20px 0px;
              border: 0px solid;
              display: table-cell;
            }

            .headerCon {
              border: 0px solid #D1D1D1;
              border-radius: 0px;
              padding: 0px;
              width: 100%;
            }

            button {
              width: 100%;
              text-align: center;
            }
          }
        </style>
      </head>

      <body
        style="font-size:16px;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;color:#0a0a0a;font-family: 'Poppins', sans-serif;font-weight:normal;padding:0;margin:0;text-align:left;font-size:16px;line-height:19px;width:100% !important;">
        <div class="mainContainer">
          <div class="mainContainerInner">
            <header
              style="text-align:center;margin-bottom:24px;display: flex;justify-content: flex-start; flex-direction: row;align-items: center;">

              <img src='/logo.png' width="200" height="100"/>

            </header>
            <div class="headerCon" style=" margin:38px 0 0 0;">
              <div>
                <h5
                  style="font-family: 'Poppins', sans-serif;font-style: normal;font-weight: 600;font-size: 18px;line-height: 100%;letter-spacing: -0.04em;margin:0;color: #000000;">
                  Hola
                </h5>

                <div style="margin-top: 22px;">
                  <p
                    style="font-family: 'Poppins', sans-serif; font-style: normal;font-weight: normal;font-size: 17px;line-height: 140%;letter-spacing: -0.04em; margin:0 0 20px 0;color: #7A7A7A;display: inline-block;width: 100%;">
                    <span style="color:#000000;">${userName} </span> invited you to join Réntalo®, use the referral link
                    below to
                    sign up and get some bonuses !
                  </p>
                  <p
                    style="font-family: 'Poppins', sans-serif;font-style: normal;font-weight: normal;font-size: 17px;line-height: 140%;letter-spacing: -0.04em;margin:0 0 20px 0;color: #7A7A7A;display: inline-block;width: 100%;">
                    Referral link : <a href="${origin}/signup/?referral=${referralCode}"
                      style="text-decoration: underline;color:#000000" >Join Now </a>
                  </p>
                  <p
                    style="margin:24px 0 0px; font-family: 'Poppins', sans-serif;font-style: normal;font-weight: normal;font-size: 17px;line-height: 140%;letter-spacing: -0.04em;color: #333;">
                    Gracias, <br>
                    El equipo de Réntalo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>

      </html>`,
    };

    return post('/api/sendgrid-email', requestOptions)
      .then(resp => {

        if(resp){
          setShow(true)
          showMessage()
          incrementCount()
        }
        setInviteEmail('');
        setSuccessfullySend(true);
      })
      .catch(error => {
        setError(true);
      });
  };

  const pageName = ['Configuración'];

  const userReferralPrice = process.env.REACT_APP_AVAILABLE_CREDIT_PRICE;
  return (
    <Page title="Referral">
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          {/* <UserNav selectedPageName="ReferralPage" /> */}
          <div className={css.sideNav}>
            <ProfileNav currentUser={currentUser}
            />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="ReferralPage"
          currentUser={currentUser}
          isVerficationDetailsTab={true}
        />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>Referral</h1>
            <div className={css.section}>
              <p>
                <strong>{`Tienes ${userReferalCode ? Number(userReferralPrice) : ''} ${userReferalCode ? 'créditos' : 'crédito'
                  }`}</strong>
              </p>
              <div className={css.contentWrapper}>
                <p>Envíe su enlace de referencia a sus amigos por correo:</p>
                <h2>Creditos totales: {count}</h2>
              </div>
              <div className={css.sendEmailWrapper}>
                <input
                  className={css.sendEmailInput}
                  placeholder="example@gmail.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                />
                <Button className={css.sendButton} onClick={sendInviteEmail}>
                  Enviar
                </Button>
              </div>
              {!successfullySend && !error ? (
                <p className={css.infoText}>
                  *Recibirá _______ por cada usuario que se registre con su enlace de referencia y
                  completa una reserva
                </p>
              ) : null}
              {show ? (
                <p className={css.successText}>El correo electrónico fue enviado con éxito</p>
              ) : null}
              {error ? (
                <p className={css.errorText}>
                  ¡Vaya! Algo salió mal. Por favor, vuelva a intentarlo
                </p>
              ) : null}
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

export default ReferralPage;
