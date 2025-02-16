// components/landing/Dashboard/data.ts

interface HealthData {
    month: string;
    score: number;
  }
  
  interface TrafficData {
    month: string;
    organic: number;
    paid: number;
  }
  
  interface SEOIssue {
    category: string;
    count: number;
  }
  
  export const dashboardData = {
    title: "Comprehensive Health Monitoring",
    description: "Track your website's vital signs with our intuitive dashboard",
    
    // Health Score Data
    mockHealthData: [
      { month: 'Jan', score: 72 },
      { month: 'Feb', score: 75 },
      { month: 'Mar', score: 82 },
      { month: 'Apr', score: 78 },
      { month: 'May', score: 85 },
      { month: 'Jun', score: 89 }
    ] as HealthData[],
  
    // Traffic Data
    mockTrafficData: [
      { month: 'Jan', organic: 5200, paid: 3100 },
      { month: 'Feb', organic: 5800, paid: 3300 },
      { month: 'Mar', organic: 6500, paid: 3800 },
      { month: 'Apr', organic: 7200, paid: 4100 },
      { month: 'May', organic: 8100, paid: 4500 },
      { month: 'Jun', organic: 9000, paid: 4800 }
    ] as TrafficData[],
  
    // SEO Issues Data
    mockSEOIssues: [
      { category: 'Missing Meta', count: 24 },
      { category: 'Broken Links', count: 12 },
      { category: 'Slow Pages', count: 8 },
      { category: 'No Alt Text', count: 45 },
      { category: 'H1 Issues', count: 15 }
    ] as SEOIssue[],
  
    // Chart Colors
    chartColors: {
      primary: '#3B82F6',   // Blue
      secondary: '#10B981', // Green
      background: '#1F2937',
      grid: '#374151',
      text: '#9CA3AF'
    },
  
    // Chart Options
    chartOptions: {
      height: 200,
      tooltipBackground: '#1F2937',
      gridDash: '3 3'
    }
  };
  
  // Dashboard Card Interfaces
  export interface DashboardCard {
    title: string;
    value: number | string;
    change: {
      value: number;
      isPositive: boolean;
    };
    timeFrame: string;
  }
  
  // Sample Dashboard Cards Data
  export const dashboardCards: DashboardCard[] = [
    {
      title: "Overall Health Score",
      value: 89,
      change: {
        value: 5,
        isPositive: true
      },
      timeFrame: "vs last month"
    },
    {
      title: "SEO Issues",
      value: 12,
      change: {
        value: 3,
        isPositive: false
      },
      timeFrame: "new this week"
    },
    {
      title: "Total Traffic",
      value: "13.8k",
      change: {
        value: 12,
        isPositive: true
      },
      timeFrame: "vs last month"
    },
    {
      title: "Performance Score",
      value: 94,
      change: {
        value: 2,
        isPositive: true
      },
      timeFrame: "vs last week"
    }
  ];