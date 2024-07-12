import React, { useState, useEffect } from "react";
import NavLogo from "../components/navLogo";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCreditCard,
    faPencil,
} from "@fortawesome/free-solid-svg-icons";
import '../index.css';

function BillingInfo() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/user_info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            console.error("There was a problem with your fetch operation:", error);
            setError("Failed to fetch data");
          });
      }, []);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!user) {
        return (
          <div className="w-full h-screen bg-white flex justify-center items-center">
            <div className="flex gap-3 items-center animate-pulse">
              <img src="../src/assets/logo.png" alt="Logo Epash" className="w-16" />
              <h1 className="font-bold text-4xl">Epash AI</h1>
            </div>
          </div>
        );// O r any other loading indicator
      }

    return(
        <>
        <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />

        <div className="flex gap-3">
          <Link
            to="/account/settings"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            <FontAwesomeIcon
            icon={faArrowLeft} 
            className="text-white text-xl"
            />
          </Link>
        </div>
        </div>
        <div className="m-20 flex items-center justify-center w-full h-screen">
            <div>
                <h1>Payment Details</h1>
                <div>
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="p-3 bg-gray-50 rounded-md"

                    />
                    <div>
                        <p>Ending with</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default BillingInfo;