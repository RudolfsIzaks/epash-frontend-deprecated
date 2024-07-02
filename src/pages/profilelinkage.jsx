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
         <div className="flex justify-between items-center py-5 px-48">
            <NavLogo/>
            <Link to='/account/settings' className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100">
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