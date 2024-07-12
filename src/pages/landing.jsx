import React from "react";
import '../index.css';
import NavbarLanding from "../components/navbar";

function LandingPage() {
    return(
        <>
         <NavbarLanding/>
         <div className="bg-[url('https://res.cloudinary.com/drcze5fsl/image/upload/v1718707751/qztectbjngj6fbn85iwr.png')] bg-center bg-no-repeat bg-contain flex flex-col items-center h-screen justify-center">
            <p className="font-custom font-bold text-epash-green py-10 text-lg">Revolutionizing the AI game and...</p>
            <h1 className="font-custom text-5xl font-bold text-center px-48">Crushing Online Sales Records With Personalized AI Marketing</h1>
            <p className="pt-10 pb-5" >Meet Epash, the one-of-a kind AI aimed at transforming digital marketing, forever.</p>
            <button className="font-custom bg-epash-green text-white rounded-md border-epash-green px-8 h-12 font-bold hover:scale-110 duration-100"><p>Curious? Let’s Have a quick Chat!</p></button>
            
         </div>
        </>
    )
}

export default LandingPage;