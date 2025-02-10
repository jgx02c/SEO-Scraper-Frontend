import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Dialog } from "@headlessui/react"; // Import modal library

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
  website?: string;
}

interface Webpage {
  _id: string;
  filename: string;
}

const BusinessDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get business_id from URL

  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [webpages, setWebpages] = useState<Webpage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "webpages">("overview");

  const [selectedPage, setSelectedPage] = useState<Webpage | null>(null);
  const [pageContent, setPageContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openWebpageModal = async (page: Webpage) => {
    setSelectedPage(page);
    setIsModalOpen(true);
    try {
      const response = await fetch(`https://leaps-scraper.onrender.com/get_page_by_id/${page._id}`);
      const result = await response.json();
  
      // Fix: Extract correct content
      setPageContent(result.data?.data?.content || "No content available.");
  
      // Ensure content starts from the top when opening
      setTimeout(() => {
        const contentBox = document.getElementById("modal-content-box");
        if (contentBox) contentBox.scrollTop = 0;
      }, 0);
    } catch (error) {
      console.error("Error fetching webpage content:", error);
      setPageContent("Error loading page content.");
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
            fetchWebpages();
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
              </>
            )}

            {/* Webpages Tab Content */}
            {activeTab === "webpages" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Loaded Webpages</h3>
                {webpages.length > 0 ? (
                  <ul className="space-y-3">
                    {webpages.map((page) => (
                      <li
                        key={page._id}
                        className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
                        onClick={() => openWebpageModal(page)}
                      >
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

{/* MODAL: Webpage Content */}

{/* MODAL: Webpage Content */}
{/* MODAL: Webpage Content */}
<Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <div className="fixed inset-0 z-50 bg-black/50" aria-hidden="true" />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-3xl h-4/5 flex flex-col bg-gray-800 rounded-lg shadow-xl mx-4">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-gray-100">
              {selectedPage?.filename}
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0 p-4">
            <div className="h-full overflow-y-auto bg-gray-900 rounded-lg border border-gray-700 p-4">
              <p className="text-gray-300 whitespace-pre-wrap">
                {pageContent || "Loading..."}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>






    </div>
  );
};

export default BusinessDetailPage;
