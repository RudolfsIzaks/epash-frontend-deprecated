// src/components/Callback.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');

    if (code) {
      console.log('Authorization code:', code); // Log the authorization code
      console.log('Scope:', scope); // Log the scope

      // Here you can do something with the code, like sending it to a backend

      // Redirect to another route after handling the code
      navigate('/');
    } else {
      const errorDescription = urlParams.get('error_description');
      console.error('No authorization code found');
      if (errorDescription) {
        console.error('Error description:', errorDescription);
        setError(errorDescription);
      }
    }
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Loading...</div>;
};

export default Callback;
