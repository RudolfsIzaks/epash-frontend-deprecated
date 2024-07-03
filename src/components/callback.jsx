// // src/components/Callback.js
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Callback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const code = new URLSearchParams(window.location.search).get('code');
//     if (code) {
//       console.log('Authorization code:', code); // Log the authorization code

//       // Send the code to the backend to exchange for tokens
//       fetch('/auth/google/callback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Tokens received:', data); // Log the response from the backend
//           navigate('/campaign');
//         })
//         .catch((error) => {
//           console.error('Error during token exchange:', error); // Log any errors
//         });
//     }
//   }, [navigate]);

//   return <div>Loading...</div>;
// };

// export default Callback;
