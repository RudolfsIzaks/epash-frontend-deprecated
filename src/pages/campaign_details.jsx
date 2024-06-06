import React from "react";
import { useLocation } from "react-router-dom";

function CampaignDetail() {
  const location = useLocation();
  const { campaignGroup } = location.state;

  const getStatusStyle = (status) => {
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
          {campaignGroup[0].name}
        </h2>
        <p
          style={getStatusStyle(campaignGroup[0].status)}
          className="text-black font-custom font-semibold text-2xl"
        >
          {campaignGroup[0].status}
        </p>
        <div className="grid grid-cols-2 gap-10">
          {campaignGroup.map((campaign, index) => (
            <div
              key={index}
              className="ad-variation flex flex-col justify-center items-center w-96 bg-white p-5 shadow-md rounded-lg"
            >
              <img
                className="rounded-md w-80 mb-5"
                src={campaign.image_link}
                alt={`Ad variation ${index + 1}`}
              />
              <p className="font-semibold italic font-custom p-5">
                {campaign.ad_text}
              </p>
              <div>
                <p>{campaign.budget}</p>
                <p>{campaign.locations}</p>
                <p>{campaign.target_ages}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;
