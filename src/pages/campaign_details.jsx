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
              <div>
                <p>{campaign.budget !== null ? campaign.budget : 'No budget available'}</p>
                <p>
                  {campaign.locations && campaign.locations.length > 0 ? 
                    campaign.locations.join(', ') 
                    : 'No locations specified'}
                </p>
                <p>
                  {campaign.target_ages && campaign.target_ages.length > 0 ? 
                    campaign.target_ages.join(', ') 
                    : 'No target ages specified'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;
