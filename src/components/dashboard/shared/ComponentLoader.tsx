import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Overview,
  WebsiteTraffic,
  SocialMediaTraffic,
  AdsPerformance,
  SEOPerformance,
  UserBehavior,
  HistoricalData
  // Import other components as needed
} from '@/components/dashboard';

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
      
      // Add other cases as components are built
      
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderComponent()}
    </Suspense>
  );
};