import React, { useState, useEffect } from "react";
import NavLogo from "../components/navLogo";
import { Link, useNavigate } from "react-router-dom";
import DashNav from "../components/dashNav";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function ProfileLinkage() {  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Confirm Log Out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            "https://epash-ai-jaroslavsbolsak.replit.app/api/logout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Ensures cookies are included with the request
            }
          );

          const data = await response.json();
          if (response.ok) {
            console.log("Logout successful:", data.message);
            navigate("/login");
          } else {
            console.error("Logout failed:", data.error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Logout failed! Please try again.",
            });
          }
        } catch (error) {
          console.error("Network error:", error);
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please check your connection and try again.",
          });
        }
      }
    });
  };

  const handleGuide = () => {
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white shadow-md rounded-lg p-6 w-1/2 relative">
      <button className="absolute top-4 right-4 text-gray-500" onClick={handleGuide}>
        &times;
      </button>
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Confirm The Email</h2>
          <p>We will send you an email to confirm your connection.</p>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Copy The Account ID</h2>
          <p>
            Paste It Into The Input And Submit
            <span className="block bg-gray-200 rounded p-2 mt-2">179-030-4919</span>
          </p>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Choose One Google Ad Account</h2>
          <p>
            Select a Google Ads account
            <span className="block bg-gray-200 rounded p-2 mt-2">179-030-4919</span>
          </p>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Make A New Ad Account (If You Don’t Have One)</h2>
          <p>
            New Google Ads account
          </p>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Go To Google Ads Website And Press Sign Up</h2>
          <p>
            <span className="block bg-gray-200 rounded p-2 mt-2">sign up</span>
          </p>
        </div>
      )}
      {step === 6 && (
        <div>
          <h2 className="text-xl font-bold mb-2">To Run Ads Link Your Google Ad Account</h2>
          <p>
            Google Ads ID: 
            <span className="block bg-gray-200 rounded p-2 mt-2">e.g. 123-456-7890</span>
          </p>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="text-white font-bold bg-epash-green rounded px-2" disabled={step === 1}>
          &larr;
        </button>
        <div className="flex space-x-2">
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${step === i + 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
          ))}
        </div>
        <button onClick={nextStep} className="text-white font-bold bg-epash-green rounded px-2" disabled={step === totalSteps}>
          &rarr;
        </button>
      </div>
    </div>
  </div>
  }

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />

        <div className="flex gap-3">
          <Link
            to="/account/settings"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            Go Back
          </Link>
        </div>
      </div>
      <DashNav handleLogout={handleLogout} />
      <div className="h-[60dvh] flex justify-center items-center">
        <div className="h-1/2 w-3/5">
          <h2 className="font-custom font-bold">To run ads link your google ad account</h2>
          <div className="">
            <p className="text-epash-green font-custom">Google Ads ID:</p>
            <div className="flex justify-between bg-stone-200 border border-stone-300">
            <input type="text" placeholder="e.g. 124-234-1235" className="outline-none border-none bg-none appearance-none"  />
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-epash-green"
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLinkage;
