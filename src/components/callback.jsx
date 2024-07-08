import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Send the authorization code to the backend
      fetch("https://epash-ai-jaroslavsbolsak.replit.app/auth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Redirect to the dashboard or another page after successful login
            navigate("/success-google");
          } else {
            console.error("Login failed:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error during authentication:", error);
        });
    } else {
      console.error("No authorization code found");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
