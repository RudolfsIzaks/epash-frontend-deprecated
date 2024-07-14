import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavLogo from "../components/navLogo";
import DashNav from "../components/dashNav";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../components/auth";
import google from '../assets/google.png'


function parseCampaignData(rawData) {
  // Helper function to clean and parse JSON strings
  const cleanAndParseJson = (jsonString) => {
    const cleanedString = jsonString.replace(/\\\"/g, '"');
    return JSON.parse(cleanedString);
  };

  try {
    const parts = rawData.split("; ");
    
    const campaignId = parts[0].split(": ")[1];
    const headings = cleanAndParseJson(parts[1].split(": ")[1]);
    const longHeadings = cleanAndParseJson(parts[2].split(": ")[1]);
    const descriptions = cleanAndParseJson(parts[3].split(": ")[1]);
    const images = cleanAndParseJson(parts[4].split(": ")[1]);

    // Extracting the first item from each list for the preview
    const text = headings[0] || "";
    const longText = longHeadings[0] || "";
    const description = descriptions[0] || "";
    const image_url = images[0] || "";

    return [{
      campaignId,
      text,
      longText,
      description,
      image_url,
    }];
  } catch (e) {
    console.error(`Failed to parse campaign data:`, rawData, e);
    return [];
  }
}


function CreateCampaign() {
  const { user } = useAuth();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handlePlatform = () => {
    navigate('/platform-edit');
  }

  const [selectedProductType, setSelectedProductType] = useState(null);
  const [customProductType, setCustomProductType] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  let autocompleteRef = useRef(null);
  const [campaignResults, setCampaignResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    user_id: user.user_id,
    camp_name: "",
    product_name: "",
    product_type: "",
    location: [],
    language: [],
    age: [],
    budget: "",
    daily_limit: "",
    start_date: "",
    end_date: "",
    campaign_descript: "",
    product_descript: "",
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
    { value: "under18", label: "Under 18" },
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

  const handleAddressChange = (address) => {
    setAddressInput(address);
    // Assuming you want to keep track of the latest address:
    setFormData((prevData) => ({
      ...prevData,
      address,
    }));
  };

  const handleSelectLocation = (address) => {
    setAddressInput("");
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setSelectedLocations((prevLocations) => {
          const newLocations = [...prevLocations, address];
          setFormData((prevData) => ({
            ...prevData,
            location: newLocations,
          }));
          return newLocations;
        });
      })
      .catch((error) => console.error("Error in geocoding:", error));
  };

  const removeLocation = (indexToRemove) => {
    setSelectedLocations(
      selectedLocations.filter((_, index) => index !== indexToRemove)
    );
  };

  let autocomplete;

  const loadGoogleMapsScript = () => {
    if (window.google) {
      initializeAutocomplete();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXiqiacBFj3x2-2OyKF0xfkvyHqKlL0jc&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        initializeAutocomplete();
      };
    }
  };

  const initializeAutocomplete = () => {
    autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );
    autocomplete.addListener("place_changed", onPlaceChanged);
  };

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      console.log(place); // You can extract the needed details from the 'place' object
      setAddress(place.formatted_address);
    } else {
      console.log(
        "No details available for input: '" + autocomplete.getPlace().name + "'"
      );
    }
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

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

  const renderLocationTags = () => {
    return selectedLocations.map((location, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-epash-green font-bold text-white border-gray-200 shadow-md rounded-3xl px-5 mb-1 py-2 w-1/3"
      >
        {location}
        <FontAwesomeIcon
          icon={faTimes}
          className="ml-2 cursor-pointer text-white"
          onClick={() => removeLocation(index)}
        />
      </div>
    ));
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
  
      const data = await response.text();
      console.log("Raw campaign data received from backend:", data); // Add this line for debugging
      const formattedCampaigns = parseCampaignData(data);
      console.log("Parsed campaign data:", formattedCampaigns); // Add this line for debugging
      setCampaignResults(formattedCampaigns);
      setLoading(false);
    } catch (error) {
      console.error("Error creating campaign:", error.message);
      setLoading(false);
    }
  };
  
  
  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <div className="flex gap-3 items-center animate-pulse">
          <img src="https://res.cloudinary.com/drcze5fsl/image/upload/v1718707751/o6uk4vdhzumrmjztnp4a.png" alt="Logo Epash" className="w-16" />
          <h1 className="font-bold text-4xl">Epash AI</h1>
        </div>
      </div>
    );
  }

  if (campaignResults.length > 0) {
    return (
      <div className="campaign-results">
        <div className="flex w-full justify-between items-center py-5 px-48">
          <NavLogo />
          <div className="flex gap-3">
            <button className="bg-red-500 text-white font-custom font-bold py-2 px-5 rounded-md">
              Discard
            </button>
            <button onClick={handlePlatform} className="bg-white shadow-md text-black font-custom font-bold py-2 px-5 rounded-md">
              <div className="flex gap-3 items-center justify-between">
                <img src={google} className="w-16" alt="google" />
                <p className="font-custom text-md">Edit For Google</p>
              </div>
            </button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2">
            {campaignResults.map((campaign, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-5 border rounded-md shadow-md w-1/2"
              >
                <p>{campaign.text}</p>
                <img
                  className="w-96 rounded-md"
                  src={campaign.image_url}
                  alt={`Campaign ${index + 1}`}
                />
                {/* Displaying additional form data */}
                <div className="mt-4">
                  <p><strong>Campaign Name:</strong> {formData.camp_name}</p>
                  <p><strong>Product Name:</strong> {formData.product_name}</p>
                  <p><strong>Location:</strong> {formData.location.join(', ')}</p>
                  <p><strong>Budget:</strong> {formData.budget}</p>
                </div>
              </div>
            ))}
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
          <PlacesAutocomplete
            value={addressInput}
            onChange={handleAddressChange}
            onSelect={handleSelectLocation}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <div className="shadow flex items-center border-2 py-2 px-2 mb-2 rounded-md overflow-hidden w-80 gap-3">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className:
                        "location-search-input w-full focus:outline-none",
                    })}
                    ref={autocompleteRef}
                  />
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className: `suggestion-item ${
                          suggestion.active ? "suggestion-item--active" : ""
                        }`,
                        style: {
                          backgroundColor: suggestion.active ? "" : "",
                          cursor: "pointer",
                        },
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {renderLocationTags()}
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
            htmlFor="daily_limit"
            className="mt-5 mb-2 text-epash-green font-custom"
          >
            Daily Budget
          </label>
          <div
            className="shadow flex items-center border-2 py-2 px-2 mb-5 rounded-md overflow-hidden w-80
           gap-3"
          >
            <input
              required
              name="daily_limit"
              className="appearance-none focus:outline-none focus:shadow-outline w-72"
              type="number"
              id="daily_limit"
              placeholder="Set daily budget..."
              onChange={handleChange}
            />
            <span className="h-6 w-px rounded-md bg-gray-200"></span>
            <p className="text-gray-700">$</p>
          </div>
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
            Write why your product is better than competitor’s and what are the
            main features.
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

          <label className="mt-10 mb-2 text-epash-green font-custom">
            If you have any inspirations or reference material, here is the
            place to put them.
          </label>
          <div className="flex items-end gap-3 mb-20">
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