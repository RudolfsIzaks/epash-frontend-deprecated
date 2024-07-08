import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Fetch user info to get the user_id
      fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/user_info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          // Ensure you have user data before proceeding
          if (data && data.user_id) {
            // Send the authorization code and user_id to the backend
            fetch("https://epash-ai-jaroslavsbolsak.replit.app/auth/google/callback", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code, user_id: data.user_id }),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('Network response was not ok.');
              })
              .then((data) => {
                if (data.message) {
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
            console.error("User data not found");
          }
        })
        .catch((error) => {
          console.error("There was a problem with your fetch operation:", error);
          setError("Failed to fetch user data");
        });
    } else {
      console.error("No authorization code found");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
