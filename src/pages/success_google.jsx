import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

function SuccessGoogle() {

    return(
        <>
          <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-4">
                <h1 className="font-custom font-black text-3xl text-center">Success! Google Connected.</h1>
                <p className="font custom text-xl text-center">You are now able to run ads from our platform.</p>
                <Link to="/success-google" className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100">To Dashboard</Link>
            </div>
          </div>
        </>
    )
}

export default SuccessGoogle;