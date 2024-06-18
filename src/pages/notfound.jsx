import React from "react";
import '../index.css';
import NavLogo from "../components/navLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Add this line
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const handleBack = navigate("/dashboard");

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col gap-5">
                <NavLogo/>
                <h2 className="font-custom font-bold text-center">Oops, we are still working on this page...</h2>
                <button onClick={handleBack}>
                    <FontAwesomeIcon
                      
                      icon={faArrowCircleLeft}
                      className="font-light text-3xl"
                    />
                </button>
                <p className="font-custom text-center">Go Back</p>
            </div>
        </div>
    );
}

export default NotFound;
