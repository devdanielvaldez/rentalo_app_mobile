import React, { useState, useEffect } from 'react';
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
import css from './CohostPage.module.css';
import { post } from '../../util/api';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
const sharetribeSdk = require('sharetribe-flex-sdk');
const sdk = sharetribeSdk.createInstance({
  clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID,
});

const getCohostCode = str => {
  const lastSix = str.substr(str.length - 6);
  const reversedCharacters = lastSix
    .split('')
    .reverse()
    .join('');
  const finalCode = reversedCharacters.toUpperCase();
  return finalCode;
};

const CohostPage = () => {
  const [cohostCode, setCohostCode] = useState('');
  const [userName, setUserName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [successfullySend, setSuccessfullySend] = useState(false);
  const [error, setError] = useState(false);
  const [emailInfo, setEmailInfo] = useState(false);
  const [cohost, setCohost] = useState(false);

  useEffect(() => {
    sdk.currentUser
      .show()
      .then(res => {
        const userId = res.data.data.id.uuid;
        const userName = res.data.data.attributes.profile.displayName;
        const cohostCode = getCohostCode(userId);
        setCohostCode(cohostCode);
        setUserName(userName);

        const cohostId = res.data.data.attributes.profile.publicData.cohost;
        if (cohostId) {
          return sdk.users
            .show({ id: cohostId })
            .then(res => {
              setCohost(res.data.data);
            })
            .catch(e => {
              //ignore error
            });
        }
      })
      .catch(e => console.log(e));
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const sendInviteEmail = () => {
    const requestOptions = {
      to: inviteEmail, // Change to your recipient
      subject: `${userName} invited you to join Réntalo® as his co-host`,
      text: `${userName} invited you to join Réntalo®, sign up in <a href='${origin}/signup/?cohost=${cohostCode}'>here</a> and become his co-host !`,
    };

    return post('/api/sendgrid-email', requestOptions)
      .then(resp => {
        setInviteEmail('');
        setSuccessfullySend(true);
      })
      .catch(error => {
        setError(true);
        console.log(error.stack);
      });
  };

  const pageName = ['Configuración'];

  return (
    <Page title="Co-host">
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <ProfileNav />
          </div>
          {/* <UserNav selectedPageName="CohostPage" /> */}
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav currentTab="CohostPage" />
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Co-host</h1>
          <div className={css.contentWrapper}>
            {cohost ? (
              <a
                className={css.aTagWrapper}
                href={
                  typeof window !== 'undefined'
                    ? `${window.location.origin}/u/${cohost.id.uuid}`
                    : ''
                }
              >
                <div className={css.cohostAvatar}>
                  <br />
                  <p className={css.cohostName}>{cohost.attributes.profile.displayName}</p>
                </div>
              </a>
            ) : (
              <>
                <p>
                  <strong>Invite someone to be your co-host:</strong>
                </p>

                <div className={css.sendEmailWrapper}>
                  <input
                    className={css.sendEmailInput}
                    placeholder="example@gmail.com"
                    value={inviteEmail}
                    onChange={e => {
                      setEmailInfo(e.target.value);
                      setInviteEmail(e.target.value);
                    }}
                  />
                  <Button className={css.sendButton} onClick={sendInviteEmail}>
                    Send
                  </Button>
                </div>
                {successfullySend ? (
                  <p
                    className={css.successText}
                  >{`The email was send successfully, wait for ${emailInfo} to sign up`}</p>
                ) : null}
                {error ? (
                  <p className={css.errorText}>Woops! Somthing went wrong, please try again</p>
                ) : null}
              </>
            )}
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

export default CohostPage;
