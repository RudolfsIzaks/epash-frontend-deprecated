// src/components/Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');

    if (code) {
      console.log('Authorization code:', code); // Log the authorization code
      console.log('Scope:', scope); // Log the scope

      // You can now send the code to your backend or store it for further use

      // Redirect to another route after handling the code
      navigate('/');
    } else {
      console.error('No authorization code found');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
