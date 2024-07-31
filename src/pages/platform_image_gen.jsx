import React from "react";
import "../index.css";
import NavLogo from "../components/navLogo";
import { Link } from "react-router-dom";
import { useState } from "react";

function PlatformImageGeneration() {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [inputPoint, setInputPoint] = useState("");

  const handleFileChange1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const handleCampaignIdChange = (event) => {
    setCampaignId(event.target.value);
  };

  const handleInputPointChange = (event) => {
    setInputPoint(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image1", selectedFile1);
    formData.append("image2", selectedFile2);
    formData.append("style", selectedStyle);
    formData.append("campaign_id", campaignId);
    formData.append("input_point", inputPoint);

    try {
      const response = await fetch(
        "https://epash-ai-jaroslavsbolsak.replit.app/api/image_gen",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center items-center py-5 px-48 h-[10dvh]">
        <NavLogo />
      </div>
      <hr />
      <div className="w-full h-[90dvh] flex justify-center items-center">
        <div className="flex flex-col w-3/5 shadow-lg rounded-lg border border-stone-100 p-6">
          <h1 className="font-custom text-3xl font-black mb-10">
            Upload Your Images and Add Your Styles
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="image1">
                Upload an image <i>of only the product</i>.
              </label>
              <input
                type="file"
                id="image1"
                onChange={handleFileChange1}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('image1').click()}
                className="upload-button"
              >
                Upload Image 1
              </button>
            </div>
            <div>
              <label htmlFor="image2">
                Upload an image that you might want to use for the ads.
              </label>
              <input
                type="file"
                id="image2"
                onChange={handleFileChange2}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('image2').click()}
                className="upload-button"
              >
                Upload Image 2
              </button>
            </div>
            <div>
              <label>Choose Image Style:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="photorealistic"
                    checked={selectedStyle === "photorealistic"}
                    onChange={handleStyleChange}
                  />
                  Photorealistic
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="painting"
                    checked={selectedStyle === "painting"}
                    onChange={handleStyleChange}
                  />
                  Painting
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="cartoon"
                    checked={selectedStyle === "cartoon"}
                    onChange={handleStyleChange}
                  />
                  Cartoon
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="graphics"
                    checked={selectedStyle === "graphics"}
                    onChange={handleStyleChange}
                  />
                  Graphics
                </label>
              </div>
            </div>
            <button type="submit" className="submit-button">Upload</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PlatformImageGeneration;
