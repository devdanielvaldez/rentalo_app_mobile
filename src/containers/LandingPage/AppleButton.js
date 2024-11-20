import React, { useEffect } from "react";

const AppleSignIn = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        try {
          const tokenUrl = 'https://appleid.apple.com/auth/token';
          const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              grant_type: "authorization_code",
              client_id: "com.rentalo.rent.service",
              client_secret: `-----BEGIN PRIVATE KEY-----
              MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgFV0Zje01X7CFovPz
              wiDBUe4Wn6+3DIxu2M037neNICWgCgYIKoZIzj0DAQehRANCAATPy0zL1PlASXtX
              eA9umguc8TY2IgNbRWHqXScnYR9Qp6xR6nIghEl0WgofGta0tPwU8qV9jnSOt9n9
              Zz98RGoF
              -----END PRIVATE KEY-----`,
              code,
              redirect_uri:'https://rentalo-7417.onrender.com',
            }),
          });
          await response.json();

          // Handle the received token
        } catch (error) {
          // Handle error
        }
      }
    };

    handleRedirect();
  }, []);

  const handleAppleSignIn = () => {
    const authUrl = 'https://appleid.apple.com/auth/authorize?response_type=code&client_id=com.rentalo.rent.service&redirect_uri=https://rentalo-7417.onrender.com';
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleAppleSignIn}>Sign in with Apple</button>
    </div>
  );
};

export default AppleSignIn;
