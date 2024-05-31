import React from "react";
import { useLocation } from "react-router-dom";

function CampaignDetail() {
  const location = useLocation();
  const { campaignGroup } = location.state;

  return (
    <div className="flex justify-center py-20">
      <div className="flex flex-col justify-evenly gap-5 p-5">
        <h2 className="font-custom font-black text-epash-green text-4xl">{campaignGroup[0].name}</h2>
        <p className="text-black font-custom font-semibold text-2xl">{campaignGroup[0].status}</p>
        <div className="flex gap-10">
          {campaignGroup.map((campaign, index) => (
            <div key={index} className="ad-variation flex flex-col justify-center items-center w-96 bg-gray-900 p-5 shadow-md rounded-lg">
              <img
                className="rounded-md w-80 mb-5"
                src={campaign.image_link}
                alt={`Ad variation ${index + 1}`}
              />
              <p className="text-white font-semibold font-custom p-5">{campaign.ad_text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;
