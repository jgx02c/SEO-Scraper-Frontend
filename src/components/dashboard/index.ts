// components/dashboard/index.ts
// Overview
export { Overview } from './tabs/Overview';

// Website management components
export { WebsiteList, AddWebsite } from './tabs/Websites';

// Scan management components  
export { ScanDashboard } from './tabs/Scans';

// Traffic components
export { 
  WebsiteTraffic,
  SocialMediaTraffic,
  AdsPerformance
} from './tabs/Traffic';

// Analytics components
export {
  SEOPerformance,
  UserBehavior,
  HistoricalData
} from './tabs/Analytics';

// Competitor analysis components
export {
  CompetitorGrid,
  CompetitorDetails
} from './tabs/CompetitorLookup';

// Files components
export {
  ScrapedWebpages,
  CompetitorData,
  ReportsDocuments
} from './tabs/Files';

// Reports components
export {
  SEOReports,
  CompetitorReports,
  AdsReports,
  TrafficReports
} from './tabs/Reports';

// Ads components
export {
  MyAds,
  CompetitorAds
} from './tabs/Ads';

// AI components
export {
  AIContentGeneration,
  AIFixes,
  AlertsMonitoring
} from './tabs/AI';

// Chat component
export { ChatInterface } from './tabs/Chat';

// Shared components
export { ComponentLoader } from './shared/ComponentLoader';