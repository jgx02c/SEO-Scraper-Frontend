import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Overview,
  WebsiteTraffic,
  SocialMediaTraffic,
  AdsPerformance,
  SEOPerformance,
  UserBehavior,
  HistoricalData,
  CompetitorGrid,
  CompetitorDetails,
  ScrapedWebpages,
  CompetitorData,
  ReportsDocuments,
  MyAds,
  CompetitorAds,
  AIContentGeneration,
  AIFixes,
  AlertsMonitoring,
  ChatInterface
} from '@/components/dashboard';
import { WebsiteList, AddWebsite } from '@/components/dashboard/tabs/Websites';
import { ScanDashboard } from '@/components/dashboard/tabs/Scans';

// Define a more specific type for data based on your components' requirements
interface ComponentData {
  stats?: any;
  data?: any;
  timeRange?: string;
}

interface ComponentLoaderProps {
  activeTab: string;
  activeSubItem: string | null;
  data?: ComponentData;
}

const LoadingFallback = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
  </div>
);

export const ComponentLoader: React.FC<ComponentLoaderProps> = ({ 
  activeTab, 
  activeSubItem,
  data 
}) => {
  const renderComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview stats={data?.stats} />;
      
      case 'websites':
        switch (activeSubItem) {
          case 'website-list':
            return <WebsiteList />;
          case 'add-website':
            return <AddWebsite />;
          case 'website-management':
            return <WebsiteList />;
          default:
            return <WebsiteList />;
        }
      
      case 'scans':
        switch (activeSubItem) {
          case 'scan-dashboard':
            return <ScanDashboard />;
          case 'create-scan':
            return <AddWebsite />;
          case 'scan-history':
            return <ScanDashboard />;
          case 'reports':
            return <ScanDashboard />;
          default:
            return <ScanDashboard />;
        }
      
      case 'competitor-lookup':
        switch (activeSubItem) {
          case 'competitor-grid':
            return <CompetitorGrid data={data?.data} />;
          case 'competitor-details':
            return <CompetitorDetails data={data?.data} />;
          case 'competitive-comparison':
            return <CompetitorGrid data={data?.data} />;
          default:
            return <CompetitorGrid data={data?.data} />;
        }
      
      case 'files':
        switch (activeSubItem) {
          case 'scraped-webpages':
            return <ScrapedWebpages data={data?.data} />;
          case 'competitor-data':
            return <CompetitorData data={data?.data} />;
          case 'reports-documents':
            return <ReportsDocuments data={data?.data} />;
          default:
            return <ScrapedWebpages data={data?.data} />;
        }
      
      case 'analytics':
        switch (activeSubItem) {
          case 'seo-performance':
            return <SEOPerformance data={data?.data} timeRange={data?.timeRange || "7d"} />;
          case 'user-behavior':
            return <UserBehavior data={data?.data} timeRange={data?.timeRange || "7d"} />;
          case 'historical-data':
            return <HistoricalData data={data?.data} timeRange={data?.timeRange || "7d"} />;
          default:
            return <SEOPerformance data={data?.data} timeRange={data?.timeRange || "7d"} />;
        }
      
      case 'traffic': 
        switch (activeSubItem) {
          case 'website-traffic':
            return <WebsiteTraffic data={data?.data} timeRange={data?.timeRange || "7d"} />;
          case 'social-traffic':
            return <SocialMediaTraffic data={data?.data} timeRange={data?.timeRange || "7d"} />;
          case 'ads-performance':
            return <AdsPerformance data={data?.data} timeRange={data?.timeRange || "7d"} />;
          default:
            return <WebsiteTraffic data={data?.data} timeRange={data?.timeRange || "7d"} />;
        }
      
      case 'ads':
        switch (activeSubItem) {
          case 'my-ads':
            return <MyAds data={data?.data} />;
          case 'competitor-ads':
            return <CompetitorAds data={data?.data} />;
          default:
            return <MyAds data={data?.data} />;
        }
      
      case 'ai':
        switch (activeSubItem) {
          case 'ai-content-generation':
            return <AIContentGeneration data={data?.data} />;
          case 'ai-fixes':
            return <AIFixes data={data?.data} />;
          case 'alerts-monitoring':
            return <AlertsMonitoring data={data?.data} />;
          default:
            return <AIContentGeneration data={data?.data} />;
        }
      
      case 'chat':
        return <ChatInterface data={data?.data} />;
      
      default:
        return <div className="text-center py-8 text-gray-400">Component not found: {activeTab}</div>;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderComponent()}
    </Suspense>
  );
};