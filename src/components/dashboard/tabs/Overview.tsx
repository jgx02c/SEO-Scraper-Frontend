// components/dashboard/tabs/Overview.tsx
export const Overview = ({ stats }: { stats: any }) => {
    return (
      <div>Overview Component</div>
    );
  };
  
  // components/dashboard/tabs/Traffic/index.ts
  export * from './WebsiteTraffic';
  export * from './SocialMediaTraffic';
  export * from './AdsPerformance';
  
  // components/dashboard/tabs/Traffic/WebsiteTraffic.tsx
  export const WebsiteTraffic = ({ data, timeRange }: { data: any; timeRange: string }) => {
    return (
      <div>Website Traffic Component</div>
    );
  };
  
  // components/dashboard/tabs/Traffic/SocialMediaTraffic.tsx
  export const SocialMediaTraffic = ({ data, timeRange }: { data: any; timeRange: string }) => {
    return (
      <div>Social Media Traffic Component</div>
    );
  };
  
  // components/dashboard/tabs/Traffic/AdsPerformance.tsx
  export const AdsPerformance = ({ data, timeRange }: { data: any; timeRange: string }) => {
    return (
      <div>Ads Performance Component</div>
    );
  };