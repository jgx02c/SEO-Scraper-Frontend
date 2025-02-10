import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";

interface BusinessDetails {
  _id: string;
  name: string;
  description: string;
  contact_information?: {
    address?: string;
    email?: string;
    phone?: string;
  };
  benefits?: string[];
  products?: { name: string; description: string; url: string }[];
  customer_reviews?: { name: string; comment: string; location: string }[];
  promotions?: { title: string; discount: string; details: string }[];
  social_media?: { platform: string; url: string }[];
  website?: string;
}

interface Webpage {
  _id: string;
  filename: string;
  business_id: string;
  admin_Business: boolean;
}

const BusinessDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get business_id from URL

  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [webpages, setWebpages] = useState<Webpage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "webpages">("overview");

  useEffect(() => {
    if (!id) return;

    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(`https://leaps-scraper.onrender.com/get_business_by_id/${id}`);
        const result = await response.json();
        setBusiness(result.data);
      } catch (error) {
        console.error("Error fetching business details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const fetchWebpages = async () => {
    if (!id) return;
    try {
      const response = await fetch(`https://leaps-scraper.onrender.com/get_pages_by_business_id/${id}`);
      const result = await response.json();
      setWebpages(result.data || []);
    } catch (error) {
      console.error("Error fetching webpages:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <Button className="bg-blue-600 text-white" onClick={() => router.push("/business")}>
          Back to Businesses
        </Button>
        <h1 className="text-2xl font-bold">Business Details</h1>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6">
        <button
          className={`p-2 font-semibold ${activeTab === "overview" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`p-2 font-semibold ${activeTab === "webpages" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
          onClick={() => {
            setActiveTab("webpages");
            fetchWebpages(); // Fetch webpage data when tab is clicked
          }}
        >
          Webpages
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading business details...</p>
      ) : business ? (
        <Card className="bg-gray-800 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <>
                <div>
                  <h2 className="text-3xl font-bold">{business.name}</h2>
                  <p className="text-gray-400 mt-2">{business.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                  <p>{business.contact_information?.address || "No Address Available"}</p>
                  <p>{business.contact_information?.email || "No Email Available"}</p>
                  <p>{business.contact_information?.phone || "No Phone Available"}</p>
                </div>

                {business.benefits && (
                  <div>
                    <h3 className="text-xl font-semibold">Benefits</h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {business.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Webpages Tab Content */}
            {activeTab === "webpages" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Loaded Webpages</h3>
                {webpages.length > 0 ? (
                  <ul className="space-y-3">
                    {webpages.map((page) => (
                      <li key={page._id} className="p-3 bg-gray-700 rounded-lg">
                        <p className="text-gray-300">{page.filename}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No webpages available.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <p className="text-center">Business not found.</p>
      )}
    </div>
  );
};

export default BusinessDetailPage;
