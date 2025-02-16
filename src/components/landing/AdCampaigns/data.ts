// components/landing/AdCampaigns/data.ts
import { Bot, Target, LineChart, AlertCircle } from 'lucide-react';

export const adCampaignData = {
  title: "AI-Powered Counter-Campaigns",
  description: "Deploy intelligent ad campaigns that automatically respond to competitor strategies",
  features: [
    {
      icon: Bot,
      title: "Automated Response Campaigns",
      description: "AI automatically detects competitor ad campaigns and deploys targeted counter-strategies."
    },
    {
      icon: Target,
      title: "Smart Keyword Targeting",
      description: "Identify and target gaps in competitor keyword coverage for maximum impact."
    },
    {
      icon: LineChart,
      title: "Performance Optimization",
      description: "AI continuously optimizes ad performance based on real-time competitor data."
    },
    {
      icon: AlertCircle,
      title: "Opportunity Detection",
      description: "Get instant alerts when new competitive advertising opportunities arise."
    }
  ],
  activeCampaign: {
    title: "Active Counter-Campaign",
    targeting: 'Targeting: Competitor\'s "Analytics Platform" campaign',
    roi: "147% ROI",
    duration: "Active for 7 days"
  },
  aiRecommendation: {
    title: "AI Recommendation",
    description: 'New opportunity detected in "Business Intelligence" keywords',
    buttonText: "Deploy Counter-Campaign"
  }
};