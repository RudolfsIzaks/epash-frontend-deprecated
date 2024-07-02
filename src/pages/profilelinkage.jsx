import React from "react";
import { Link } from "react-router-dom";
import '../index.css';
import google from '../assets/google.png';
import NavLogo from "../components/navLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProfileLinkage() {

    return(
        <>
         <div>
            <NavLogo/>
            <Link to='/account/settings' className="p-5 bg-epash-green text-white">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-white"
              />
            </Link>
         </div>
          <button>
            
          </button>
        </>
    )
}

export default ProfileLinkage;