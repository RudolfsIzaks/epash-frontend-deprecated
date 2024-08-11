import React, { useState, useEffect } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";

function PlatformFacebook() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update state hooks to match provided data
  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [images, setImages] = useState([]);
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (parsedData) {
      setTitles(parsedData.headlines || []); // Using titles to match API naming
      setDescriptions(parsedData.descriptions || []);
      setImages(parsedData.images || []);
      setBudget(parsedData.budget || "");
    }
  }, [parsedData]);

  const handleChange = (setter) => (index, value) => {
    setter((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handleSubmit = async () => {
    const data = {
      campaign_id: parsedData.campaignId,
      titles: titles, // Sending titles instead of headlines
      descriptions: descriptions,
      images: images,
    };

    try {
      const response = await fetch(
        "https://epash-ai-jaroslavsbolsak.replit.app/api/launch_facebook",
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
      navigate("/dashboard"); // Assuming dashboard is where user goes next
    } catch (error) {
      console.error("Error launching Facebook Ads:", error);
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
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
            className="bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            Go Back
          </Link>
        </div>
      </div>
      <div className="text-center mt-10">
        <h1 className="text-5xl font-bold">Facebook Ad Campaign Details</h1>
        <p className="mb-10 text-xl">
          Preview and edit your Facebook campaign.
        </p>
        <div className="flex justify-around flex-wrap">
          {titles.map((title, index) => (
            <div key={index} className="w-full md:w-2/5 p-4 m-10">
              <div className="p-10 border border-stone-100 shadow-lg rounded-md">
                <h2 className="font-black font-custom text-lg">Title:</h2>
                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    handleChange(setTitles)(index, e.target.value)
                  }
                  className="w-full px-5 py-4 border border-stone-200 text-stone-500 focus:text-black focus:outline-epash-green  active:outline-epash-green transition rounded"
                />
                <h2 className="font-bold font-custom text-lg mt-4">Description:</h2>
                <textarea
                  value={descriptions[index]}
                  onChange={(e) =>
                    handleChange(setDescriptions)(index, e.target.value)
                  }
                  className="w-full px-5 py-4 border border-stone-200 text-stone-500 focus:text-black focus:outline-epash-green active:outline-epash-green transition rounded"
                  rows="3"
                />
              </div>
            </div>
          ))}
        </div>
        {images.length > 0 && (
          <div className="text-center mt-10 flex flex-col items-center justify-center">
            <img
              src={images[currentImageIndex]}
              alt={`Campaign Image ${currentImageIndex + 1}`}
              className="mt-4 w-96 h-auto rounded-lg"
            />
            <div className="w-full text-center mt-5">
              <button
                onClick={handlePreviousImage}
                className="mr-5 bg-epash-green border-epash-green text-white hover:bg-transparent hover:text-epash-green font-black font-custom transition py-2 px-5 rounded"
              >
                Previous
              </button>
              <button
                onClick={handleNextImage}
                className="bg-epash-green border-epash-green text-white hover:bg-transparent hover:text-epash-green font-black font-custom transition py-2 px-6 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="mt-10 bg-epash-green text-white rounded-md px-8 py-2 font-bold hover:scale-110 duration-100 mb-32"
        >
          Launch Campaign
        </button>
      </div>
    </>
  );
}

export default PlatformFacebook;
