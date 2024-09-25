import React from "react";
import '../index.css';
import { Link } from "react-router-dom";

function Footer() {

    return(
        <>
        <div className="w-full h-[20dvh] flex items-center justify-evenly">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
        </div>
        </>
    )
}

export default Footer;