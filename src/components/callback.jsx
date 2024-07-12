import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log('Authorization Code:', code);

      const getRefreshToken = async () => {
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              code: code,
              client_id: '1033664191407-ai61p9okci4t9acdf1vhhn2jik7t68u1.apps.googleusercontent.com',
              client_secret: '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',
              redirect_uri: 'https://epash-frontend.vercel.app/auth/google/callback',
              grant_type: 'authorization_code'
            })
          });

          const data = await response.json();
          if (data.refresh_token) {
            console.log('Refresh Token:', data.refresh_token);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Google Ads ID linked successfully!',
            });
            // Optionally, navigate to another page
            navigate("/success-google");
          } else {
            throw new Error(data.error || 'Something went wrong');
          }
        } catch (error) {
          console.error("Error getting refresh token:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      };

      getRefreshToken();
    } else {
      console.error("No authorization code found");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
