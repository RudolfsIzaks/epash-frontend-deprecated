import React, { useState } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";

function PlatformGoogle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headlines, setHeadlines] = useState(
    parsedData ? parsedData.headings : []
  );
  const [longHeadings, setLongHeadings] = useState(
    parsedData ? parsedData.longHeadings : []
  );
  const [descriptions, setDescriptions] = useState(
    parsedData ? parsedData.descriptions : []
  );
  const [images] = useState(parsedData ? parsedData.images : []);

  if (!parsedData) {
    return <div>Loading...</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleChange = (setter) => (index, value) => {
    setter((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const handleSubmit = async () => {
    const data = {
      campaign_id: parsedData.campaignId, // Assuming campaignId is available in parsedData
      headings,
      long_headings: longHeadings,
      descriptions,
      images,
    };

    try {
      const response = await fetch(
        "https://epash-ai-jaroslavsbolsak.replit.app/api/launch_google_ads",
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
      // Navigate to the next page or show a success message
      navigate("/some-next-page"); // Replace with your actual next page route
    } catch (error) {
      console.error("Error launching Google Ads:", error);
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
      <div>
        <h1 className="text-center mt-20 text-5xl font-custom font-bold">
          Modify your google ads
        </h1>
        <p className="text-center mb-20 mt-5 text-xl">
          Change headlines, body text and contents of your google ads.
        </p>
        <div className="flex flex-col m-10 rounded-lg shadow-lg border border-stone-200 bg-white p-10">
          <h1 className="text-4xl font-custom">Google Ad 1:</h1>
          <div className="flex gap-10 justify-between mt-10">
            <div className="flex flex-col gap-4 flex-grow">
              <h2 className="text-xl font-custom">Headlines</h2>
              {headlines.map((headline, index) => (
                <input
                  key={index}
                  type="text"
                  value={headline}
                  onChange={(e) =>
                    handleChange(setHeadlines)(index, e.target.value)
                  }
                  className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"
                />
              ))}
              <h2 className="text-xl font-custom mt-5">Descriptions</h2>
              {descriptions.map((description, index) => (
                <input
                  key={index}
                  type="text"
                  value={description}
                  onChange={(e) =>
                    handleChange(setDescriptions)(index, e.target.value)
                  }
                  className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"
                />
              ))}
              <h2 className="text-xl font-custom mt-5">Long Headlines</h2>
              {longHeadings.map((longHeadline, index) => (
                <input
                  key={index}
                  type="text"
                  value={longHeadline}
                  onChange={(e) =>
                    handleChange(setLongHeadings)(index, e.target.value)
                  }
                  className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"
                />
              ))}
            </div>
            <div className="flex flex-col items-center mt-10 flex-grow">
              <img
                src={images[currentImageIndex]}
                alt="Google Ad"
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
              onClick={handleSubmit}
              className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black mt-10"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlatformGoogle;
