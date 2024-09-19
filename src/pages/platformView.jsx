import React from "react";
import '../index.css';
import NavLogo from "../components/navLogo";
import google from '../assets/google.png';
import { useNavigate, useLocation } from "react-router-dom";
import meta from '../assets/meta.png';

function PlatformView() {
    const navigate = useNavigate();
    const location = useLocation();
    const { campaign_id } = location.state || {}; // Get the campaign_id from state

    const handlePlatformSelect = async (platform) => {
      if (!campaign_id) {
          console.error("No campaign ID available");
          return;
      }
  
      try {
          const response = await fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/get_assets", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ campaign_id, platform }),
          });
  
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
  
          // Clean and parse the data
          const parsedData = parseCampaignData(data);
  
          // Navigate to the edit page with the parsed data
          navigate(`/platform-view-${platform.toLowerCase()}`, { state: { parsedData } });
      } catch (error) {
          console.error("Error fetching assets:", error.message);
      }
  };
  
  const parseCampaignData = (data) => {
      const cleanText = (textArray) => {
          return textArray.map(text => text.replace(/\\\"/g, '"').replace(/^"|"$/g, ''));
      };
  
      const parsedData = {
          campaignId: data.campaign_id,
          campaignNum: data.campaign_num[0],
          budget: data.budget[0],
          ageRanges: JSON.parse(data.age[0]), // Parse the array string
          headings: cleanText(JSON.parse(data.headlines[0])),
          descriptions: cleanText(JSON.parse(data.descriptions[0])),
          images: JSON.parse(data.images[0]),
          interests: data.interests ? JSON.parse(data.interests[0]) : [], // Handle possible null
          language: JSON.parse(data.language[0]),
          location: JSON.parse(data.location[0])
      };
  
      return parsedData;
  };
  

    return(
        <>
                <>
        <div className="flex w-full justify-between items-center py-5 px-48">
          <NavLogo />
          <div className="flex gap-3">
            <button className="bg-red-500 text-white font-custom font-bold py-2 px-5 rounded-md">
              Discard
            </button>
          </div>
        </div>
        <div className="h-[90dvh] flex flex-col items-center justify-center gap-5">
            <h2 className="text-4xl font-custom font-bold mb-20">Choose your Advertisement platform to view.</h2>
            <div className="flex items-center gap-5">
            <button onClick={() => handlePlatformSelect("Google")} className="bg-white shadow-md text-black font-custom font-bold py-2 px-5 rounded-md">
              <div className="flex gap-3 items-center justify-between">
                <img src={google} className="w-16" alt="google" />
                <p className="font-custom text-md">View For Google</p>
              </div>
            </button>
            <button onClick={() => handlePlatformSelect("Facebook")} className="bg-white shadow-md text-black font-custom font-bold py-2 px-5 rounded-md">
              <div className="flex gap-3 items-center justify-between">
                <img src={meta} className="w-16" alt="meta" />
                <p className="font-custom text-md">View For Facebook</p>
              </div>
            </button>
            </div>
        </div>
        </>
        </>
    )
}

export default PlatformView;