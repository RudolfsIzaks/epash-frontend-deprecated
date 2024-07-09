import React, { useState } from "react";
import NavLogo from "../components/navLogo";
import { Link, useNavigate } from "react-router-dom";
import DashNav from "../components/dashNav";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ad1 from '../assets/LogInAds.png';
import ad2 from '../assets/createADS.png';
import ad3 from '../assets/CliendIDc.png';
import ad4 from '../assets/ClientID.png';

function ProfileLinkage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [showGuide, setShowGuide] = useState(false);
  const [googleAdsId, setGoogleAdsId] = useState("");

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
    setShowGuide(!showGuide);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://epash-ai-jaroslavsbolsak.replit.app/api/link_to_google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id: googleAdsId }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Google Ads ID linked successfully!',
        });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

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
      <div className="flex w-full h-[60dvh] justify-center items-center">
        <div className="w-1/2">
          <h2 className="font-custom font-bold">To run ads link your google ad account</h2>
          <div className="rounded-2xl shadow-2xl p-20 border border-stone-200">
            <p className="text-epash-green font-custom font-bold">Google Ads ID:</p>
            <div className="flex justify-between items-center bg-stone-100 border border-stone-300 py-2 px-4 rounded-md">
              <input
                type="text"
                placeholder="e.g. 124-234-1235"
                className="outline-none border-none bg-transparent appearance-none w-full"
                value={googleAdsId}
                onChange={(e) => setGoogleAdsId(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-epash-green cursor-pointer"
                onClick={handleGuide}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-epash-green text-white rounded-md px-4 py-2 font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {showGuide && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75">
          <div className="flex flex-col items-center bg-white shadow-md rounded-lg w-1/2 relative px-20 pt-10 pb-10 text-center " >
            <button
              className="absolute top-5 right-5 text-gray-500 text-3xl"
              onClick={handleGuide}
            >
              &times;
            </button>
            {step === 1 && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">Go To Google Ads Website And Press Sign Up</h2>
                <img className="w-96 shadow-lg mt-10" src={ad1} alt="step 1" />
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">Make a New Ad Account 
                (If You don’t Have One)</h2>
                <img src={ad2} alt="" className="w-96 shadow-lg mt-10" />
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">
                  Choose One Google Ad Account
                </h2>
                <img src={ad3} alt="" className="w-96 shadow-lg mt-10" />
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                Copy the Account ID
                </h2>
                <p>Paste it into the input and submit</p>
                <img className="w-96 shadow-lg mt-10" src={ad4} alt="" />
              </div>
            )}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                Confirm The email
                </h2>
                <p>
                 We will send you an email to confirm your connection.
                </p>
              </div>
            )}
            {step === 6 && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  That's It!
                </h2>
                <button onClick={handleGuide} className="bg-epash-green px-5 py-2 font-custom cursor-pointer font-black text-white rounded-md mt-10">
                    Close
                </button>
              </div>
            )}
            <div className="flex justify-evenly items-center mt-14">
              <button
                onClick={prevStep}
                className=" rounded text-3xl px-8 font-black"
                disabled={step === 1}
              >
                <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-epash-green cursor-pointer"
                
              />
              </button>
              <div className="flex space-x-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      step === i + 1 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                className="rounded text-3xl px-8 font-black"
                disabled={step === totalSteps}
              >
                <FontAwesomeIcon
                icon={faArrowRight}
                className="text-epash-green cursor-pointer"
                
              />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileLinkage;
