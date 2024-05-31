import React from "react";
import '../index.css';


function NavLogo() {
    return(
        <>
                <div className="flex flex-row gap-5 items-center justify-center">
                    <img src="../src/assets/logo.png" alt="Logo Epash" className="w-16" />
                    <h1 className="font-bold text-4xl">Epash AI</h1>
                </div>
        </>
    )
}

export default NavLogo;