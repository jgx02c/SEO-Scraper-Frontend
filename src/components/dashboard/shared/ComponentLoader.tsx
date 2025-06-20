import { Suspense } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
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
  stats?: unknown;
  data?: unknown;
  timeRange?: string;
}

interface ComponentLoaderProps {
  activeTab: string;
  activeSubItem: string | null;
  data?: ComponentData;
}

const LoadingFallback = ({ componentName }: { componentName?: string }) => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto" />
      <p className="text-gray-400">Loading {componentName || 'content'}...</p>
    </div>
  </div>
);

const ErrorFallback = ({ 
  componentName, 
  onRetry 
}: { 
  componentName?: string; 
  onRetry?: () => void; 
}) => (
  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
    <CardContent className="p-6">
      <div className="text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Unable to load {componentName || 'this section'}
          </h3>
          <p className="text-gray-400">
            There was an error loading this content. This might be due to a network issue or the data not being available yet.
          </p>
        </div>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="border-gray-600 hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

const ComponentLoaderInner: React.FC<ComponentLoaderProps> = ({ 
  activeTab, 
  activeSubItem,
  data 
}) => {
  const getComponentName = () => {
    if (activeSubItem) {
      const subItemName = activeSubItem.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return subItemName;
    }
    return activeTab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderComponent = () => {
    try {
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
          return (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-white mb-2">Component not found</h3>
              <p className="text-gray-400">The component &quot;{activeTab}&quot; is not available yet.</p>
            </div>
          );
      }
    } catch (error) {
      console.error('Error rendering component:', error);
      return <ErrorFallback componentName={getComponentName()} />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback componentName={getComponentName()} />}>
      {renderComponent()}
    </Suspense>
  );
};

export const ComponentLoader: React.FC<ComponentLoaderProps> = (props) => {
  const componentName = props.activeSubItem 
    ? props.activeSubItem.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : props.activeTab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <ErrorBoundary componentName={componentName}>
      <ComponentLoaderInner {...props} />
    </ErrorBoundary>
  );
};