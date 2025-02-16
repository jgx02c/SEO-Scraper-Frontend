// components/landing/ContentAnalysis/data.ts
import { FileText, BrainCircuit, Sparkles, PenTool } from 'lucide-react';

export const contentData = {
  title: "AI-Powered Content Analysis & Generation",
  description: "Analyze content quality and automatically generate optimized content for your website and marketing campaigns.",
  features: [
    {
      icon: FileText,
      title: "Content Quality Analysis",
      description: "Track readability, engagement metrics, and SEO optimization of your content."
    },
    {
      icon: BrainCircuit,
      title: "Smart Content Generation",
      description: "Generate SEO-optimized content that matches your brand voice and target keywords."
    },
    {
      icon: Sparkles,
      title: "Performance Tracking",
      description: "Monitor content performance and engagement metrics in real-time."
    },
    {
      icon: PenTool,
      title: "Brand Voice Optimization",
      description: "AI ensures generated content maintains consistent brand voice and style."
    }
  ],
  qualityScores: [
    { name: "Readability", score: 85 },
    { name: "SEO Score", score: 92 },
    { name: "Engagement", score: 78 },
    { name: "Brand Voice", score: 88 }
  ],
  contentMetrics: [
    { month: 'Jan', generated: 45, engagement: 72 },
    { month: 'Feb', generated: 52, engagement: 75 },
    { month: 'Mar', generated: 58, engagement: 80 },
    { month: 'Apr', generated: 63, engagement: 85 },
    { month: 'May', generated: 70, engagement: 88 },
    { month: 'Jun', generated: 75, engagement: 92 }
  ]
};