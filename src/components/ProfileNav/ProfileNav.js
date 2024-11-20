import React from 'react';

import css from './ProfileNav.module.css';
import Rentalo from './Mask Group 26.png';
import user from './Icon feather-user.svg';
import { NamedLink, SideNav } from '../../components';

const ProfileNav = props => {
  const { currentUser } = props;
  const displayName = currentUser && currentUser?.attributes?.profile?.displayName;

  return (
    <div className={css.nav}>
      <div className={css.logo}>
        <NamedLink name="HomePage">
          <img src={Rentalo} alt="Rentalo" />
        </NamedLink>
      </div>
      {/* <div className={css.hr}></div> */}
      <div className={css.linksBlock}>
        <SideNav currentUser={currentUser} />
      </div>
      {/* <div className={css.hr}></div> */}
      {currentUser ? (
        <div className={css.section4}>
          <div className={css.user}>
            <img src={user} alt="usuario" />
          </div>
          <div>
            <p style={{ color: 'white', marginTop: 0 }}>{displayName}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileNav;
