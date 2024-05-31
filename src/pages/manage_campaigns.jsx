import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavLogo from "../components/navLogo";
import DashNav from "../components/dashNav";
import Swal from "sweetalert2";

function ManageCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://epash-ai-jaroslavsbolsak.replit.app/api/get_campaigns', {
      method: 'GET',
      credentials: 'include', // to include cookies and session information
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const campaignsMap = data.reduce((acc, campaign) => {
        const campaignId = campaign[0];
        const campaignDetails = {
          id: campaign[0],
          user_id: campaign[2],
          name: campaign[3],
          description: campaign[4],
          product_type: campaign[5],
          features: campaign[6],
          competitive_advantage: campaign[7],
          languages: JSON.parse(campaign[8]),
          locations: JSON.parse(campaign[9]),
          target_ages: JSON.parse(campaign[10]),
          budget: campaign[11],
          daily_limit: campaign[12],
          start_date: campaign[13],
          end_date: campaign[14],
          image_link: campaign[16],
          ad_text: campaign[17],
          status: campaign[18]
        };
        if (!acc[campaignId]) {
          acc[campaignId] = [];
        }
        acc[campaignId].push(campaignDetails);
        return acc;
      }, {});
      setCampaigns(Object.values(campaignsMap));
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching campaigns:', error);
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const deleteCampaign = async (campaignId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it."
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
      const response = await fetch(`https://epash-ai-jaroslavsbolsak.replit.app/api/delete_campaign/${campaignId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const remainingCampaigns = campaigns.filter(campaignGroup => campaignGroup[0].id !== campaignId);
      setCampaigns(remainingCampaigns);
      Swal.fire({
        icon: 'success',
        title: 'Campaign Deleted',
      });

    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign');
    }}
  })
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <div className="flex gap-3 items-center animate-pulse">
          <img src="../src/assets/logo.png" alt="Logo Epash" className="w-16" />
          <h1 className="font-bold text-4xl">Epash AI</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
      </div>
      <DashNav />
      <div className="flex justify-center py-20">
        <div className="campaign-grid">
          {campaigns.map(campaignGroup => (
            <div key={campaignGroup[0].id} className="w-80 flex flex-col justify-evenly gap-5 shadow-lg p-5">
              <div className="flex justify-between">
                <h2 className="font-custom font-semibold">{campaignGroup[0].name}</h2>
                <p className="text-gray-300 text-turbo-small">ID: {campaignGroup[0].id}</p>
              </div>
              <p className="text-black font-custom ">{campaignGroup[0].status}</p>
              <button className="bg-red-500 px-4 py-2 rounded-md text-white font-bold w-36 hover:scale-110 duration-200" onClick={() => deleteCampaign(campaignGroup[0].id)}>Delete</button>
              <button 
                className="bg-epash-green px-4 py-2 rounded-md text-white font-bold w-36 hover:scale-110 duration-200"
                onClick={() => navigate('/dashboard/manage-campaigns/campaign-details', { state: { campaignGroup } })}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageCampaigns;
