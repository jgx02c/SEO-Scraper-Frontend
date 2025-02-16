// components/landing/AdCampaigns/AdCampaigns.tsx
import { Button } from "@/components/ui/button";
import { adCampaignData } from "./data";

export const AdCampaigns = () => {
  const { title, description, features, activeCampaign, aiRecommendation } = adCampaignData;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              {title}
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg">
                {description}
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg">
                    <feature.icon className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-white font-medium">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="text-white font-medium mb-2">{activeCampaign.title}</h4>
                <div className="text-sm text-gray-400">{activeCampaign.targeting}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-green-400 text-sm">{activeCampaign.roi}</div>
                  <div className="text-blue-400 text-sm">{activeCampaign.duration}</div>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="text-white font-medium mb-2">{aiRecommendation.title}</h4>
                <div className="text-sm text-gray-400">{aiRecommendation.description}</div>
                <Button className="mt-3 w-full bg-blue-600 hover:bg-blue-700">
                  {aiRecommendation.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};