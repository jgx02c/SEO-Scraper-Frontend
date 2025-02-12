// pages/details/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown";
import ReportSection from "@/components/ReportSection";
import {OverviewTab} from "@/components/OverviewTab";
import {WebpagesTab} from "@/components/WebpagesTab";
import { TabNavigation } from "@/components/ui/tabs";
import { ChatTab } from "@/components/ChatTab";
import { CompetitorLookupTab } from "@/components/CompetitorLookupTab";
import { BusinessDetails, Webpage, Report } from "@/types";
import { businessApi } from "@/services/businessAPI";
import { UserCircle } from "lucide-react";
import OverviewReport from "@/components/OverviewReport";

const BusinessDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [webpages, setWebpages] = useState<Webpage[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "traffic" | "analytics" | "pageReports" | "webpages" | "files" | "chat" | "competitor" | "profile">("overview");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [businessData, reportData] = await Promise.all([
          businessApi.getBusinessById(id as string),
          businessApi.getReportForBusiness(id as string)
        ]);
        
        setBusiness(businessData);
        setReport(reportData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchWebpages = async () => {
    if (!id) return;
    try {
      const pages = await businessApi.getPagesByBusinessId(id as string);
      setWebpages(pages);
    } catch (error) {
      console.error("Error fetching webpages:", error);
    }
  };

  const handlePageClick = async (page: Webpage) => {
    return await businessApi.getPageById(page._id);
  };

  const leftTabs = [
    { id: "overview", label: "Overview" },
    { id: "traffic", label: "Traffic" },
    { id: "analytics", label: "Analytics" },
    { id: "pageReports", label: "Reports" },
    { id: "webpages", label: "Webpages" },
    { id: "files", label: "Files" }
  ];

  const rightTabs = [
    { id: "chat", label: "Chat" },
    { id: "competitor", label: "Competitor Lookup" },
    { id: "profile", label: "Profile" }
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as typeof activeTab);
    if (tab === "webpages") {
      fetchWebpages();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400">Built by: @jgx02 v0.1.10</span>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Leaps & Rebounds</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <UserCircle className="h-8 w-8 text-gray-400 hover:text-white cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-gray-800 border-gray-700">
              <DropdownMenuItem className="text-gray-200 focus:text-white focus:bg-gray-700">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-200 focus:text-white focus:bg-gray-700">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        leftTabs={leftTabs} 
        rightTabs={rightTabs} 
      />

      {loading ? (
        <p className="text-center">Loading business details...</p>
      ) : business ? (
        <Card className="bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            {activeTab === "overview" && <OverviewReport report={report} />}
            {activeTab === "traffic" && (
              <div className="text-center text-gray-400 py-8">Traffic view coming soon</div>
            )}
            {activeTab === "analytics" && (
              <div className="text-center text-gray-400 py-8">Analytics view coming soon</div>
            )}
            {activeTab === "pageReports" && <ReportSection report={report} />}
            {activeTab === "webpages" && <WebpagesTab webpages={webpages} onPageClick={handlePageClick} />}
            {activeTab === "files" && (
              <div className="text-center text-gray-400 py-8">Files view coming soon</div>
            )}
            {activeTab === "chat" && <ChatTab />}
            {activeTab === "competitor" && <CompetitorLookupTab />}
            {activeTab === "profile" && <OverviewTab business={business} />}
          </CardContent>
        </Card>
      ) : (
        <p className="text-center">Business not found.</p>
      )}
    </div>
  );
};

export default BusinessDetailPage;