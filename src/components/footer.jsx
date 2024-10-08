import React from "react";
import '../index.css';
import { Link } from "react-router-dom";

function Footer() {

    return(
        <>
        <div className="w-full h-[10dvh] bg-epash-green flex items-center justify-evenly">
            <Link className="text-white" to="/privacy-policy">Privacy Policy</Link>
            <Link className="text-white" to="/terms-conditions">Terms & Conditions</Link>
        </div>
        </>
    )
}

export default Footer;