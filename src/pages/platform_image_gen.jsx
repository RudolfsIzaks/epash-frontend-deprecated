import React, { useState } from "react";
import "../index.css";
import NavLogo from "../components/navLogo";
import "../ImageUpload.css";

function PlatformImageGeneration() {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");

  const handleFileChange1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const handleRemoveFile1 = () => {
    setSelectedFile1(null);
    document.getElementById('image1').value = null;
  };

  const handleRemoveFile2 = () => {
    setSelectedFile2(null);
    document.getElementById('image2').value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image1", selectedFile1);
    formData.append("image2", selectedFile2);
    formData.append("style", selectedStyle);

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
          <form className="flex flex-col items-start" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-5">
              <label htmlFor="image1">
                Upload an image <i>of only the product</i>.
              </label>
              <input
                type="file"
                id="image1"
                onChange={handleFileChange1}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => document.getElementById('image1').click()}
                className="px-5 py-2 bg-epash-green rounded-md text-white font-custom w-48"
              >
                Upload
              </button>
              {selectedFile1 && (
                <div className="flex w-auto gap-3 p-2">
                  <p className="bg-stone-50 p-2 rounded-md font-custom">{selectedFile1.name}</p>
                  <button onClick={handleRemoveFile1} className="bg-red-500 w-8 h-8 text-white font-custom font-black rounded-md">x</button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 mb-5">
              <label htmlFor="image2">
                Upload an image that you might want to use for the ads.
              </label>
              <input
                type="file"
                id="image2"
                onChange={handleFileChange2}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => document.getElementById('image2').click()}
                className="px-5 py-2 bg-epash-green rounded-md text-white font-custom w-48"
              >
                Upload
              </button>
              {selectedFile2 && (
                <div className="flex w-auto gap-3 p-2 ">
                  <p className="bg-stone-50 p-2 rounded-md font-custom">{selectedFile2.name}</p>
                  <button onClick={handleRemoveFile2} className="bg-red-500 w-8 h-8 text-white font-custom font-black rounded-md">x</button>
                </div>
              )}
            </div>
            <div>
              <label className="mb-5">Choose Image Style:</label>
              <div className="flex gap-4 items-center flex-wrap">
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
            <button type="submit" className="px-5 py-2 rounded-md font-custom text-white bg-epash-green my-5">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PlatformImageGeneration;
