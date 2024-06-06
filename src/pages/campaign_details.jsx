import React from "react";
import { useLocation } from "react-router-dom";

function CampaignDetail() {
  const location = useLocation();
  const { campaignGroup } = location.state || {};

  if (!campaignGroup || campaignGroup.length === 0 || !campaignGroup[0]) {
    console.error('Invalid campaign data:', campaignGroup);
    return <div>Error: Invalid campaign data</div>;
  }

  const getStatusStyle = (status) => {
    if (!status || typeof status !== 'string') {
      console.error('Invalid status value:', status);
      return { color: "black" };
    }
    switch (status.toLowerCase()) {
      case "incomplete":
        return { color: "red" };
      case "ready to deploy":
        return { color: "#ffcc00" };
      case "complete":
        return { color: "green" };
      default:
        return { color: "black" };
    }
  };

  // Extract common parameters from the first element, assuming all are the same across the group
  const commonBudget = campaignGroup[0]?.budget !== null ? campaignGroup[0].budget : 'No budget available';
  const commonLocations = campaignGroup[0]?.locations && campaignGroup[0].locations.length > 0 ? 
                          campaignGroup[0].locations.join(', ') : 'No locations specified';
  const commonTargetAges = campaignGroup[0]?.target_ages && campaignGroup[0].target_ages.length > 0 ? 
                           campaignGroup[0].target_ages.join(', ') : 'No target ages specified';

  return (
    <div className="flex justify-center py-20">
      <div className="flex flex-col justify-evenly gap-5 p-5">
        <h2 className="font-custom font-black text-epash-green text-4xl">
          {campaignGroup[0]?.name || 'No name available'}
        </h2>
        <p
          style={getStatusStyle(campaignGroup[0]?.status)}
          className="text-black font-custom font-semibold text-2xl"
        >
          {campaignGroup[0]?.status || 'Unknown status'}
        </p>

        {/* Display common parameters once */}
        <div className="mb-5">
          <p className="text-xl font-bold">Budget: {commonBudget}</p>
          <p className="text-xl font-bold">Locations: {commonLocations}</p>
          <p className="text-xl font-bold">Target Ages: {commonTargetAges}</p>
        </div>

        {/* Render each ad variation */}
        <div className="grid grid-cols-2 gap-10">
          {campaignGroup.map((campaign, index) => (
            <div
              key={index}
              className="ad-variation flex flex-col justify-center items-center w-96 bg-white p-5 shadow-md rounded-lg"
            >
              <img
                className="rounded-md w-80 mb-5"
                src={campaign.image_link || 'placeholder.png'}
                alt={`Ad variation ${index + 1}`}
                onError={(e) => e.target.src = 'fallback.png'} // Provide a fallback image
              />
              <p className="font-semibold italic font-custom p-5">
                {campaign.ad_text || 'No ad text available'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;
