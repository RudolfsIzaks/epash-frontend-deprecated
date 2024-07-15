import React from "react";
import '../index.css';
import NavLogo from "../components/navLogo";
import google from '../assets/google.png';
import { useNavigate } from "react-router-dom";


function PlatformSelect() {
    const navigate = useNavigate();

    const handlePlatformGoogle = () => {
      navigate('/platform-edit-google');
    }

    const handlePlatformFB = () => {
        navigate('/platform-edit-facebook');
    }

    return( 
        <>
        <div className="flex w-full justify-between items-center py-5 px-48">
          <NavLogo />
          <div className="flex gap-3">
            <button className="bg-red-500 text-white font-custom font-bold py-2 px-5 rounded-md">
              Discard
            </button>
          </div>
        </div>
        <div className="h-[90dvh] flex items-center justify-center gap-5">
            <button onClick={handlePlatformGoogle} className="bg-white shadow-md text-black font-custom font-bold py-2 px-5 rounded-md">
              <div className="flex gap-3 items-center justify-between">
                <img src={google} className="w-16" alt="google" />
                <p className="font-custom text-md">Edit For Google</p>
              </div>
            </button>
            <button onClick={handlePlatformFB} className="bg-white shadow-md text-black font-custom font-bold py-2 px-5 rounded-md">
              <div className="flex gap-3 items-center justify-between">
                <img src={google} className="w-16" alt="google" />
                <p className="font-custom text-md">Edit For Google</p>
              </div>
            </button>
        </div>
        </>
    )
}

export default PlatformSelect;