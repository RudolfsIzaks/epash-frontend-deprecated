import React, { useState, useEffect } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";

function PlatformFacebook() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initialize state with empty arrays or default values
  const [headlines, setHeadlines] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [budget, setBudget] = useState("");
  const [campaignNumber, setCampaignNumber] = useState("");

  useEffect(() => {
    if (parsedData) {
      setHeadlines(parsedData.headlines || []);
      setDescriptions(parsedData.descriptions || []);
      setTexts(parsedData.texts || []);
      setImages(parsedData.images || []);
      setBudget(parsedData.budget || "");
      setCampaignNumber(parsedData.campaignNumber || "");
    }
  }, [parsedData]);

  const handleChange = (setter) => (index, value) => {
    setter((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSubmit = async () => {
    const data = {
      campaign_id: parsedData.campaignId,
      campaign_number: campaignNumber,
      headings: headlines,
      descriptions: descriptions,
      texts: texts,
      images: images,
      budget: budget,
    };

    try {
      const response = await fetch(
        "https://epash-ai-jaroslavsbolsak.replit.app/api/launch_facebook_ads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      navigate("/dashboard"); // Redirect to dashboard after successful submission
    } catch (error) {
      console.error("Error launching Facebook Ads:", error);
    }
  };

  if (!parsedData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
        <div className="flex gap-3">
          <Link
            to="/dashboard"
            className="bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100 flex items-center justify-center"
          >
            Go Back
          </Link>
        </div>
      </div>
      <div className="text-center mt-10 px-10">
        <h1 className="text-5xl font-bold">Facebook Ad Campaign Details</h1>
        <p className="mb-10 text-xl">
          Preview and edit your Facebook campaign.
        </p>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-2/3 p-4">
            {headlines.map((headline, index) => (
              <div key={index} className="p-5 border rounded shadow mb-5">
                <h2 className="font-bold text-lg">Headline {index + 1}:</h2>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) =>
                    handleChange(setHeadlines)(index, e.target.value)
                  }
                  className="w-full p-2 border rounded mt-2"
                />
                <h2 className="font-bold text-lg mt-4">
                  Description {index + 1}:
                </h2>
                <textarea
                  value={descriptions[index]}
                  onChange={(e) =>
                    handleChange(setDescriptions)(index, e.target.value)
                  }
                  className="w-full p-2 border rounded mt-2"
                  rows="3"
                />
                <h2 className="font-bold text-lg mt-4">Text {index + 1}:</h2>
                <textarea
                  value={texts[index]}
                  onChange={(e) =>
                    handleChange(setTexts)(index, e.target.value)
                  }
                  className="w-full p-2 border rounded mt-2"
                  rows="3"
                />
              </div>
            ))}
          </div>

          {images.length > 0 && (
            <div className="w-full md:w-2/3 p-4">
              <h2 className="font-bold text-lg mb-4">Images:</h2>
              <div className="flex items-center justify-center">
                <button
                  onClick={handlePreviousImage}
                  className="mr-5 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt={`Campaign Image ${currentImageIndex + 1}`}
                  className="w-1/2 h-auto rounded"
                />
                <button
                  onClick={handleNextImage}
                  className="ml-5 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
              <p className="mt-2">
                Image {currentImageIndex + 1} of {images.length}
              </p>
            </div>
          )}

          <div className="w-full md:w-2/3 p-4 mt-5">
            <h2 className="font-bold text-lg">Budget:</h2>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              min="0"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-10 bg-epash-green text-white rounded-md px-8 py-2 font-bold hover:scale-110 duration-100"
          >
            Launch Campaign
          </button>
        </div>
      </div>
    </>
  );
}

export default PlatformFacebook;
