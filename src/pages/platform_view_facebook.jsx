import React, { useState } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation } from "react-router-dom";
import '../index.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faGear
} from "@fortawesome/free-solid-svg-icons";

function PlatformFacebookView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(""); // State to track copy success message

  if (!parsedData) {
    return <div>Loading...</div>;
  }

  const {
    campaignId,
    headings,
    descriptions,
    images,
    budget,
    ageRanges,
    interests,
    location: locationData,
    language,
  } = parsedData;

  const age = ageRanges.join(' ');

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(text); // Store the copied text to show success message
      setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
    }
  };

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
        <div className="flex gap-3">
          <Link
            to="/dashboard/manage-campaigns"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            Go Back
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex justify-center gap-5 mt-10 items-center">
        <p className="text-lg">Interests: <i className="font-bold italic text-epash-green">{interests}</i></p>
        <p className="text-lg">Age: <i className="font-bold italic text-epash-green">{age}</i></p>
        <p className="text-lg">Location: <i className="font-bold italic text-epash-green">{locationData}</i></p>
        <p className="text-lg">Languages: <i className="font-bold italic text-epash-green">{language}</i></p>
        <p className="text-lg">Budget: <i className="font-bold italic text-epash-green">{budget}</i></p>
      </div>
      <div>
        <h1 className="text-center mt-20 text-5xl font-custom font-bold">Check out your Facebook ads</h1>
        <p className="text-center mb-20 mt-5 text-xl">You can always go and change headlines, body text, and contents of your Facebook ads by pressing 'edit'.</p>
        <div className="flex justify-center">
          <div className="flex flex-col w-2/3 m-10 rounded-lg shadow-lg border border-stone-200 bg-white p-10">
            <h1 className="text-4xl font-custom">Facebook Ads</h1>
            <div className="flex flex-col gap-10 justify-center mt-10">
              <div className="flex flex-col gap-4 flex-grow">
                <h2 className="text-xl font-custom">Headlines</h2>
                {headings.map((headline, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      defaultValue={headline}
                      className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5 w-full"
                    />
                    <button
                      onClick={() => handleCopy(headline)}
                      className="bg-stone-300 flex gap-2 items-center text-stone-500 px-3 py-1 rounded hover:bg-epash-green hover:text-white transition"
                    >
                      Copy 
                      <FontAwesomeIcon 
                        icon={faClipboard}
                      />

                    </button>
                    {copySuccess === headline && (
                      <span className="text-green-500">Copied!</span>
                    )}
                  </div>
                ))}
                <h2 className="text-xl font-custom mt-5">Descriptions</h2>
                {descriptions.map((description, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      defaultValue={description}
                      className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5 w-full"
                    />
                    <button
                      onClick={() => handleCopy(description)}
                      className="bg-stone-300 flex gap-2 items-center text-stone-500 px-3 py-1 rounded hover:bg-epash-green hover:text-white transition"
                    >
                      Copy
                      <FontAwesomeIcon 
                        icon={faClipboard}
                      />
                    </button>
                    {copySuccess === description && (
                      <span className="text-green-500">Copied!</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center mt-10 flex-grow">
                <img
                  src={images[currentImageIndex]}
                  alt="Facebook Ad"
                  className="w-auto h-96 object-cover rounded-md mb-5"
                />
                <div className="flex gap-5">
                  <button
                    onClick={handlePreviousImage}
                    className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black mt-10"
                onClick={() =>
                  navigate("/platform-select", {
                    state: { campaign_id: campaignId },
                  })
                }
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlatformFacebookView;
