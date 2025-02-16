// components/dashboard/tabs/Analytics/index.ts
export * from './SEOPerformance';
export * from './UserBehavior';
export * from './HistoricalData';

// components/dashboard/tabs/Analytics/SEOPerformance.tsx
export const SEOPerformance = ({ data, timeRange }: { data: any; timeRange: string }) => {
  return (
    <div>SEO Performance Component</div>
  );
};

// components/dashboard/tabs/Analytics/UserBehavior.tsx
export const UserBehavior = ({ data, timeRange }: { data: any; timeRange: string }) => {
  return (
    <div>User Behavior Component</div>
  );
};

// components/dashboard/tabs/Analytics/HistoricalData.tsx
export const HistoricalData = ({ data, timeRange }: { data: any; timeRange: string }) => {
  return (
    <div>Historical Data Component</div>
  );
};