// components/dashboard/shared/ComponentLoader.tsx
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

interface ComponentLoaderProps {
  activeTab: string;
  activeSubItem: string | null;
  data?: any;
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
        return <Overview stats={data} />;
      
      case 'traffic':
        switch (activeSubItem) {
          case 'website-traffic':
            return <WebsiteTraffic data={data} timeRange="7d" />;
          case 'social-traffic':
            return <SocialMediaTraffic data={data} timeRange="7d" />;
          case 'ads-performance':
            return <AdsPerformance data={data} timeRange="7d" />;
          default:
            return <WebsiteTraffic data={data} timeRange="7d" />;
        }
      
      case 'analytics':
        switch (activeSubItem) {
          case 'seo-performance':
            return <SEOPerformance data={data} timeRange="7d" />;
          case 'user-behavior':
            return <UserBehavior data={data} timeRange="7d" />;
          case 'historical-data':
            return <HistoricalData data={data} timeRange="7d" />;
          default:
            return <SEOPerformance data={data} timeRange="7d" />;
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