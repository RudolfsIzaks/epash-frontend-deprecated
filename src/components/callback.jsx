import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log('Authorization Code:', code);
      // Redirect to another page or show a success message
      navigate("/success-google");
    } else {
      console.error("No authorization code found");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
