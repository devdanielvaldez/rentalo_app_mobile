import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { complyCubeApi } from '../../util/api';

const ComplyCubeVerification = () => {
  const { currentUser } = useSelector(state => state.user);
  const email = currentUser?.attributes?.email;
  const firstName = currentUser?.attributes?.profile?.firstName;
  const lastName = currentUser?.attributes?.profile?.lastName;
  const userData = { email, firstName, lastName };
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadComplyCube = async () => {
      if (!window.ComplyCube) {
        const script = document.createElement('script');
        script.src = 'complycube.min.js';
        script.async = true;
        script.onload = initializeComplyCube;
        document.head.appendChild(script);
      } else {
        initializeComplyCube();
      }
    };

    loadComplyCube();
  }, []);

  const initializeComplyCube = async () => {
    if (!token) {
      const tokenRes = await complyCubeApi({ userData });

      setToken(tokenRes.token);
    }

    if (token) {
      const complycube = window.ComplyCube.mount({
        token: token,
        onComplete: function (data) {
        },
        onModalClose: function () {
          complycube.updateSettings({ isModalOpen: false });
          // Add your modal close handling logic here
        },
        onError: function ({ type, message }) {
          console.error('ComplyCube error:', type, message);
          // Add your error handling logic here
        },
      });

      // Add cleanup logic when the component unmounts
      return () => {
        if (complycube.unmount) {
          complycube.unmount();
        }
      };
    }
  };

  return (
    <div>
      <div id="complycube-mount"></div>
      <button onClick={initializeComplyCube}>
        <h1>Iniciar verificación</h1>
      </button>
    </div>
  );
};

export default ComplyCubeVerification;
