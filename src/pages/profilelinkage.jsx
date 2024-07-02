import React from "react";
import { Link } from "react-router-dom";
import '../index.css';
import google from '../assets/google.png';
import NavLogo from "../components/navLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProfileLinkage() {
    const handleLogin = () => {
        const clientId = '75828378290-1e4k7m3iolebr8bmsbk2i5pj71hmrctm.apps.googleusercontent.com';
        const redirectUri = 'https://epash-frontend.vercel.app/auth/google/callback'; 
        const scope = 'https://www.googleapis.com/auth/adwords';
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        window.location.href = authUrl;
      };

    return(
        <>
         <div className="flex justify-between items-center py-5 px-48">
            <NavLogo/>
            <Link to='/account/settings' className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-white"
              />
            </Link>
         </div>
          <button onClick={handleLogin}>
            Connect Google
          </button>
        </>
    )
}

export default ProfileLinkage;