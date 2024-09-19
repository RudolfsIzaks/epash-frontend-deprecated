import React, { useState } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation } from "react-router-dom";
import '../index.css';
import { useNavigate } from "react-router-dom";

function PlatformFacebookView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!parsedData) {
    return <div>Loading...</div>;
  }
  
  const {
    campaignId,       // matches `campaignId` from parsedData
    headings,         // matches `headings` from parsedData
    descriptions,     // matches `descriptions` from parsedData
    images,           // matches `images` from parsedData
    budget,           // added to match `budget`
    ageRanges: age,   // `ageRanges` from parsedData, renamed to `age`
    interests,        // matches `interests` from parsedData
    location: locationData,  // `location` from parsedData, renamed to `locationData`
    language          // matches `language` from parsedData
  } = parsedData;
  

  console.log(parsedData);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
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
      <div className="flex justify-center gap-5 items-center">
        <p className="text-lg">Interests: {interests}</p>
        <p className="text-lg">Age: {age}</p>
        <p className="text-lg">Location: {locationData}</p>
        <p className="text-lg">Languages: {language}</p>
        <p className="text-lg">Languages: {budget}</p>
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
                  <input
                    key={index}
                    type="text"
                    readOnly
                    defaultValue={headline}
                    className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"
                  />
                ))}
                <h2 className="text-xl font-custom mt-5">Descriptions</h2>
                {descriptions.map((description, index) => (
                  <input
                    key={index}
                    type="text"
                    readOnly
                    defaultValue={description}
                    className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"
                  />
                ))}
                <h2 className="text-xl font-custom mt-5">Long Headlines</h2>
                {longHeadings.map((longHeadline, index) => (
                  <input
                    key={index}
                    type="text"
                    readOnly
                    defaultValue={longHeadline}
                    className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"
                  />
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
