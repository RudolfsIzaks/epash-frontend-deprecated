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
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
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
          <p className="mb-10 text-xl">Preview and edit your Facebook campaign.</p>
          <div className="flex justify-around flex-wrap">
            {titles.map((title, index) => (
              <div key={index} className="w-full md:w-1/2 p-4">
                <div className="p-5 border rounded shadow">
                  <h2 className="font-bold text-lg">Title:</h2>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleChange(setTitles)(index, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <h2 className="font-bold text-lg mt-4">Description:</h2>
                  <textarea
                    value={descriptions[index]}
                    onChange={(e) => handleChange(setDescriptions)(index, e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
                {index === currentImageIndex && images[index] && (
                  <img
                    src={images[index]}
                    alt={`Campaign Image ${index + 1}`}
                    className="mt-4 w-full h-auto rounded"
                  />
                )}
              </div>
            ))}
            {images.length > 1 && (
              <div className="w-full text-center mt-5">
                <button onClick={handlePreviousImage} className="mr-5 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                  Previous
                </button>
                <button onClick={handleNextImage} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                  Next
                </button>
              </div>
            )}
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
