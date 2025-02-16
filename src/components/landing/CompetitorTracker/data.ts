// components/landing/CompetitorTracker/data.ts
interface RankingData {
    date: string;
    competitor: number;
    you: number;
  }
  
  interface RecentChange {
    type: string;
    title: string;
    description: string;
    color: 'blue' | 'red' | 'green';
  }
  
  export const competitorData = {
    title: "Real-Time Competitor Intelligence",
    description: "Track your competitors' every move and automatically counter their strategies",
    mockRankingData: [
      { date: 'Jan', competitor: 45, you: 38 },
      { date: 'Feb', competitor: 48, you: 42 },
      { date: 'Mar', competitor: 46, you: 45 },
      { date: 'Apr', competitor: 43, you: 48 },
      { date: 'May', competitor: 41, you: 52 },
      { date: 'Jun', competitor: 39, you: 55 }
    ] as RankingData[],
    keywordGap: {
      total: 127,
      new: 24
    },
    adCampaigns: {
      active: 8,
      ending: 3
    },
    recentChanges: [
      {
        type: "new-page",
        title: "New landing page detected",
        description: "Competitor launched product feature page",
        color: "blue"
      },
      {
        type: "new-campaign",
        title: "New ad campaign started",
        description: 'Targeting "enterprise analytics" keywords',
        color: "red"
      },
      {
        type: "content-update",
        title: "Content update detected",
        description: 'Blog post optimization for "SEO tools"',
        color: "green"
      }
    ] as RecentChange[]
  };