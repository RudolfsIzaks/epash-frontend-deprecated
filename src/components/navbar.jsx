import React from "react";
import '../index.css';
import { Link } from 'react-router-dom';
import NavLogo from "./navLogo";

function NavbarLanding() {
    return (
        <>
            <div className="flex w-full justify-between items-center py-5 px-48">
                <NavLogo/>
                <div className="flex gap-3">
                 <Link to="/signup" className="flex justify-center items-center text-epash-green rounded-md border-2 border-epash-green px-8 h-12 font-bold hover:scale-110 duration-100">Sign Up</Link>
                 <Link to="/login" className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100">Log In</Link>
                </div>
            </div>
            <hr />
        </>
    )
}

export default NavbarLanding;
