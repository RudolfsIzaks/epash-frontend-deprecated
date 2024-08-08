import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavLogo from "../components/navLogo";
import DashNav from "../components/dashNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faArrowRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../components/auth";
import google from "../assets/google.png";
import meta from "../assets/meta.png";
import spotify from "../assets/spotify.png";
import Swal from "sweetalert2";

function CreateCampaign() {
  const { user } = useAuth();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const [selectedProductType, setSelectedProductType] = useState(null);
  const [customProductType, setCustomProductType] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [evolutionSpeed, setEvolutionSpeed] = useState(1);
  const [evolutionHarshness, setEvolutionHarshness] = useState(5);
  const [addOwnAds, setAddOwnAds] = useState(false);

  let autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    user_id: user.user_id,
    camp_name: "",
    product_name: "",
    product_type: "",
    location: ["Latvia"], // Hardcoded location
    language: [],
    age: [],
    budget: "",
    start_date: "",
    end_date: "",
    website: "",
    campaign_descript: "",
    product_descript: "",
    customer_description: "", // New field added
    platforms: [],
    evolutionSpeed: 1,
    evolutionHarshness: 5,
    addOwnAds: false,
  });
  

  const languageOptions = [
    { value: "en_US", label: "English - United States" },
    { value: "es_ES", label: "Spanish - Spain" },
    { value: "fr_FR", label: "French - France" },
    { value: "de_DE", label: "German - Germany" },
    { value: "zh_CN", label: "Chinese (Simplified) - China" },
    { value: "zh_TW", label: "Chinese (Traditional) - Taiwan" },
    { value: "ru_RU", label: "Russian - Russia" },
    { value: "ja_JP", label: "Japanese - Japan" },
    { value: "pt_BR", label: "Portuguese - Brazil" },
    { value: "pt_PT", label: "Portuguese - Portugal" },
    { value: "it_IT", label: "Italian - Italy" },
    { value: "ko_KR", label: "Korean - South Korea" },
    { value: "ar_SA", label: "Arabic - Saudi Arabia" },
    { value: "tr_TR", label: "Turkish - Turkey" },
    { value: "nl_NL", label: "Dutch - Netherlands" },
    { value: "sv_SE", label: "Swedish - Sweden" },
    { value: "pl_PL", label: "Polish - Poland" },
    { value: "da_DK", label: "Danish - Denmark" },
    { value: "fi_FI", label: "Finnish - Finland" },
    { value: "no_NO", label: "Norwegian - Norway" },
    { value: "cs_CZ", label: "Czech - Czech Republic" },
    { value: "hu_HU", label: "Hungarian - Hungary" },
    { value: "el_GR", label: "Greek - Greece" },
    { value: "th_TH", label: "Thai - Thailand" },
    { value: "hi_IN", label: "Hindi - India" },
    { value: "he_IL", label: "Hebrew - Israel" },
    { value: "id_ID", label: "Indonesian - Indonesia" },
    { value: "ms_MY", label: "Malay - Malaysia" },
    { value: "vi_VN", label: "Vietnamese - Vietnam" },
    { value: "fa_IR", label: "Persian - Iran" },
  ];

  const productTypeOptions = [
    { value: "service", label: "Services" },
    { value: "software", label: "Software" },
    { value: "ecommerce_item", label: "E-commerce Item" },
    { value: "other", label: "Other" },
  ];

  const ageOptions = [
    { value: "18-25", label: "18-25" },
    { value: "26-35", label: "26-35" },
    { value: "36-50", label: "36-50" },
    { value: "51-65", label: "51-65" },
    { value: "over65", label: "65+" },
  ];

  const handleProductTypeChange = (selectedOption) => {
    setSelectedProductType(selectedOption);
    if (selectedOption.value !== "other") {
      setCustomProductType(""); // Reset if not 'other'
    }
    setFormData((prevData) => ({
      ...prevData,
      product_type: selectedOption.value,
    }));
  };

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
    setFormData((prevData) => ({
      ...prevData,
      language: selectedOptions.map((option) => option.value),
    }));
  };

  const handleAgeChange = (selectedOptions) => {
    setSelectedAges(selectedOptions);
    setFormData((prevData) => ({
      ...prevData,
      age: selectedOptions.map((option) => option.value),
    }));
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prevPlatforms) =>
      prevPlatforms.includes(platform)
        ? prevPlatforms.filter((p) => p !== platform)
        : [...prevPlatforms, platform]
    );
    setFormData((prevData) => ({
      ...prevData,
      platforms: selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter((p) => p !== platform)
        : [...selectedPlatforms, platform],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setAddOwnAds(checked);
    setFormData((prevData) => ({
      ...prevData,
      addOwnAds: checked,
    }));
  };

  const handleSliderChange = (e, name) => {
    const { value } = e.target;
    if (name === "evolutionSpeed") {
      setEvolutionSpeed(value);
    } else if (name === "evolutionHarshness") {
      setEvolutionHarshness(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showEvolutionSpeedInfo = () => {
    Swal.fire({
      title: "Evolution Speed",
      text: "Evolution Speed determines how quickly the ad algorithm adapts to new data and changes in performance metrics. A higher speed means faster adaptation.",
      icon: "info",
      confirmButtonText: "Got it!",
    });
  };

  const showEvolutionHarshnessInfo = () => {
    Swal.fire({
      title: "Evolution Harshness",
      text: "Evolution Harshness controls the strictness of the algorithm's adjustments. Higher harshness means more significant changes are made based on performance data.",
      icon: "info",
      confirmButtonText: "Got it!",
    });
  };

  const renderTags = (selectedOptions) => (
    <div className="flex flex-wrap gap-2">
      {selectedOptions.map((option) => (
        <div
          key={option.value}
          className="flex items-center justify-between bg-epash-green text-white shadow-lg rounded-3xl px-3 py-2 text-sm font-bold"
        >
          {option.label}
          <FontAwesomeIcon
            icon={faTimes}
            className="ml-2 cursor-pointer text-white"
            onClick={() => removeTag(option)}
          />
        </div>
      ))}
    </div>
  );

  // Remove tag function
  const removeTag = (optionToRemove) => {
    setSelectedLanguages(
      selectedLanguages.filter(
        (option) => option.value !== optionToRemove.value
      )
    );
  };

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    // Create an array from the existing file list and the newly selected files
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files to existing files
  };
  // Optional: Function to remove a file from the list
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileClick = () => {
    document.getElementById("file_input").click(); // Simulate file input click
  };

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    formData.user_id = user.user_id;

    console.log("Form data submitted:", formData); // Debug log to inspect form data

    try {
      const response = await fetch(
        "https://epash-ai-jaroslavsbolsak.replit.app/api/start_campaign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let campaign_id = await response.text(); // Read the response as text

      // Clean up the campaign_id
      campaign_id = campaign_id.trim().replace(/^"|"$/g, "");

      setLoading(false);
      navigate("/platform-select", { state: { campaign_id } }); // Pass cleaned campaign_id to PlatformSelect
    } catch (error) {
      console.error("Error creating campaign:", error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <div>
          <div className="flex gap-3 items-center justify-center animate-pulse">
            <img
              src="https://res.cloudinary.com/drcze5fsl/image/upload/v1718707751/o6uk4vdhzumrmjztnp4a.png"
              alt="Logo Epash"
              className="w-16"
            />
            <h1 className="font-bold text-4xl">Epash AI</h1>
          </div>
          <p className="font-custom text-xl text-center mt-2 animate-pulse">
            This might take a moment, your ads are being generated...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
        <div className="flex gap-3">
          <button className="bg-red-500 text-white font-custom font-bold py-2 px-5 rounded-md">
            Discard
          </button>
          <button className="bg-epash-green text-white font-custom font-bold py-2 px-5 rounded-md">
            Save
          </button>
        </div>
      </div>
      <DashNav />
      <div className="px-48 mt-24">
        <h1 className="font-black font-custom text-4xl">
          Create Your Campaign!
        </h1>
        <form className="my-10 flex flex-col" onSubmit={handleSubmitForm}>
          <label
            className="mt-5 font-custom text-epash-green"
            htmlFor="camp_name"
          >
            Name Your Campaign
          </label>
          <input
            required
            className="shadow appearance-none border rounded-md w-1/2 mb-5 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline"
            id="camp_name"
            type="text"
            name="camp_name"
            placeholder="Campaign Name...."
            onChange={handleChange}
          />
          <label
            htmlFor="customer_description"
            className="mt-10 mb-2 text-epash-green font-custom rounded-md"
          >
            Describe your ideal customer (Optional)
          </label>
          <textarea
            name="customer_description"
            id="customer_description"
            cols="10"
            rows="3"
            placeholder="Describe your ideal customer here..."
            className="rounded-sm shadow-xl w-1/2 py-2 px-4 appearance-none focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          ></textarea>
          <label
            className="mt-5 font-custom text-epash-green"
            htmlFor="product_name"
          >
            Product Name
          </label>
          <input
            required
            className="shadow appearance-none border rounded-md w-1/2 mb-5 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline"
            id="product_name"
            type="text"
            name="product_name"
            placeholder="Product Name...."
            onChange={handleChange}
          />
          <label
            className="mt-5 font-custom text-epash-green"
            htmlFor="product_type"
          >
            Select Product Type
          </label>
          <Select
            required
            id="product_type"
            value={selectedProductType}
            onChange={handleProductTypeChange}
            options={productTypeOptions}
            className="basic-single shadow appearance-none border rounded-md w-1/2 mb-5 leading-tight focus:outline-none focus:shadow-outline"
            classNamePrefix="select"
            placeholder="Select a product type..."
          />
          {selectedProductType && selectedProductType.value === "other" && (
            <input
              className="shadow appearance-none border rounded-md leading-tight p-3 focus:outline-none focus:shadow-outline w-1/2 mb-5"
              type="text"
              value={customProductType}
              onChange={handleProductTypeChange}
              placeholder="Write your own type..."
            />
          )}
          <label className="text-epash-green font-custom mb-2 mt-5">
            Target Location
          </label>
          <div className="py-2 px-5 shadow-md rounded-md w-48">Latvia</div>
          <label
            htmlFor="age"
            className="block mt-5 mb-2 text-epash-green font-custom"
          >
            Target Age
          </label>
          <Select
            id="age"
            name=""
            isMulti
            value={selectedAges}
            onChange={handleAgeChange}
            options={ageOptions}
            className="basic-single shadow appearance-none border rounded-md w-1/2 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select age ranges..."
          />
          {renderTags(selectedAges)}
          <label
            htmlFor="language"
            className="block mb-2 mt-5 text-epash-green font-custom"
          >
            Select Language
          </label>
          <Select
            required
            id="language"
            isMulti
            value={selectedLanguages}
            onChange={handleLanguageChange}
            options={languageOptions}
            className="basic-single shadow appearance-none border rounded-md w-1/2 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select languages..."
          />
          {renderTags(selectedLanguages)}
          <label
            htmlFor="budget"
            className="mt-5 mb-2 text-epash-green font-custom"
          >
            Budget
          </label>
          <div
            className="shadow flex items-center border-2 py-2 px-2 mb-5 rounded-md overflow-hidden w-80
           gap-3"
          >
            <input
              required
              name="budget"
              className="appearance-none focus:outline-none focus:shadow-outline w-72"
              type="number"
              id="budget"
              placeholder="Set budget..."
              onChange={handleChange}
            />
            <span className="h-6 w-px rounded-md bg-gray-200"></span>
            <p className="text-gray-700">$</p>
          </div>
          <label
            htmlFor="start_date"
            className="mt-5 mb-2 text-epash-green font-custom"
          >
            Set a start date (Optional).
          </label>
          <input
            required
            type="date"
            name="start_date"
            id="start_date"
            className="rounded-sm shadow w-72 py-2 px-4 appearance-none focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
          <label
            htmlFor="end_date"
            className="mt-5 mb-2 text-epash-green font-custom"
          >
            Set an end date
          </label>
          <input
            required
            type="date"
            id="end_date"
            name="end_date"
            className="rounded-sm shadow w-72 py-2 px-4 appearance-none focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />

          <label
            className="mt-5 font-custom text-epash-green"
            htmlFor="website"
          >
            Website Link
          </label>
          <input
            required
            className="shadow appearance-none border rounded-md w-1/2 mb-5 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline"
            id="website"
            type="text"
            name="website"
            placeholder="Website Link...."
            onChange={handleChange}
          />

          <label
            htmlFor="campaign_descript"
            className="mt-10 mb-2 text-epash-green font-custom rounded-md"
          >
            Write a general description of your Campaign. What should be
            here?(Optional).
          </label>
          <textarea
            name="campaign_descript"
            id="description"
            cols="10"
            rows="10"
            placeholder="Description Here..."
            className="rounded-sm shadow-xl w-1/2 py-2 px-4 appearance-none focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          ></textarea>

          <label
            htmlFor="product_descript"
            className="mt-10 mb-2 text-epash-green font-custom rounded-md"
          >
            Tell us about your product and why it is better than your
            competition.
          </label>
          <textarea
            required
            name="product_descript"
            id="whyDescription"
            cols="10"
            rows="10"
            placeholder="Description Here..."
            className="rounded-sm shadow-xl w-1/2 py-2 px-4 appearance-none focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          ></textarea>
          <label className="text-epash-green font-custom mb-2 mt-5">
            Select Platforms You Want to Advertise In
          </label>
          <div className="flex gap-5">
            <div
              className="cursor-pointer"
              onClick={() => handlePlatformChange("Google")}
            >
              <input
                type="checkbox"
                id="google"
                name="platforms"
                value="Google"
                checked={selectedPlatforms.includes("Google")}
                onChange={() => handlePlatformChange("Google")}
                className="hidden"
              />
              <div
                className={`border p-3 rounded flex flex-col items-center justify-center w-32 ${
                  selectedPlatforms.includes("Google")
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <img src={google} className="w-12 my-5" />
                <p className="text-center">Google</p>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePlatformChange("Facebook")}
            >
              <input
                type="checkbox"
                id="facebook"
                name="platforms"
                value="Facebook"
                checked={selectedPlatforms.includes("Facebook")}
                onChange={() => handlePlatformChange("Facebook")}
                className="hidden"
              />
              <div
                className={`border p-3 rounded flex flex-col items-center justify-center w-32 ${
                  selectedPlatforms.includes("Facebook")
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <img src={meta} className="w-12 my-5" />
                <p className="text-center">Facebook</p>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handlePlatformChange("Spotify")}
            >
              <input
                type="checkbox"
                id="spotify"
                name="platforms"
                value="Spotify"
                checked={selectedPlatforms.includes("Spotify")}
                onChange={() => handlePlatformChange("Spotify")}
                className="hidden"
              />
              <div
                className={`border p-3 rounded flex flex-col items-center justify-center w-32 ${
                  selectedPlatforms.includes("Spotify")
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <img src={spotify} className="w-12 my-5" />
                <p className="text-center">Spotify</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label className="text-epash-green font-custom mb-2 flex gap-3">
              Evolution Speed (Days)
              <button type="button" onClick={showEvolutionSpeedInfo}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-epash-green"
                />
              </button>
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="14"
                value={evolutionSpeed}
                onChange={(e) => handleSliderChange(e, "evolutionSpeed")}
                className="w-1/2"
              />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded px-2 py-1">
                {evolutionSpeed}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label className="text-epash-green font-custom mb-2 flex gap-3">
              Evolution Harshness
              <button type="button" onClick={showEvolutionHarshnessInfo}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-epash-green"
                />
              </button>
            </label>
            <div className="relative">
              <input
                type="range"
                min="5"
                max="20"
                value={evolutionHarshness}
                onChange={(e) => handleSliderChange(e, "evolutionHarshness")}
                className="w-1/2"
              />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded px-2 py-1">
                {evolutionHarshness}%
              </div>
            </div>
          </div>

          <label className="mt-10 mb-2 text-epash-green font-custom">
            If you have any inspirations or reference material, here is the
            place to put them.
          </label>
          <div className="flex items-end gap-3 mb-5">
            <input
              type="file"
              id="file_input"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              className="mt-2 px-3 py-2 bg-epash-green text-white rounded hover:scale-110 duration-150 focus:outline-none focus:ring focus:ring-blue-300 w-36 font-black font-custom"
              onClick={handleFileClick}
            >
              Upload
            </button>

            <div id="file_list" className="gap-3 text-sm flex items-end">
              {files.length > 0 ? (
                <ul className="flex gap-1">
                  {files.map((file, index) => (
                    <li
                      className="text-white bg-epash-green font-custom font-bold flex items-center gap-1 px-4 py-2 rounded-xl"
                      key={index}
                    >
                      {file.name}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="ml-2 cursor-pointer text-white"
                        onClick={() => removeFile(index)}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                "No files chosen"
              )}
            </div>
          </div>
          <div className="mt-5 mb-20">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="addOwnAds"
                checked={addOwnAds}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <div
                className={`border p-3 rounded transition ${
                  addOwnAds
                    ? "bg-epash-green text-white"
                    : "bg-white text-black"
                }`}
                onClick={() =>
                  handleCheckboxChange({
                    target: { checked: !addOwnAds },
                  })
                }
              >
                <p>I want to add my own Ads</p>
              </div>
            </label>
          </div>
          <button
            type="submit"
            className={`text-epash-green font-custom font-black text-3xl py-4 rounded-md hover:scale-110 duration-200 flex items-center justify-center text-right' ${
              hovered ? " bg-epash-green text-white" : ""
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <p>Next</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`ml-2 cursor-pointer text-epash-green duration-300 text-2xl ${
                hovered ? "rotate-180 text-white" : ""
              }`}
            />
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateCampaign;
