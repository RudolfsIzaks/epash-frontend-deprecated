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

        const data = await response.text();
        
        // Clean and parse the data
        const parsedData = parseCampaignData(data);

        // Navigate to the edit page with the parsed data
        navigate(`/platform-edit-${platform.toLowerCase()}`, { state: { parsedData } });
    } catch (error) {
        console.error("Error fetching assets:", error.message);
    }
};

const parseCampaignData = (data) => {
    // Extract and clean the JSON strings
    const [campaignIdPart, headingsPart, longHeadingsPart, descriptionsPart, imagesPart] = data.split('; ');

    const campaignId = campaignIdPart.split(': ')[1];
    const headings = JSON.parse(headingsPart.split(': ')[1].replace(/'/g, '"'));
    const longHeadings = JSON.parse(longHeadingsPart.split(': ')[1].replace(/'/g, '"'));
    const descriptions = JSON.parse(descriptionsPart.split(': ')[1].replace(/'/g, '"'));
    const images = JSON.parse(imagesPart.split(': ')[1].replace(/'/g, '"'));

    return {
        campaignId,
        headings,
        longHeadings,
        descriptions,
        images,
    };
};
