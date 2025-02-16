// components/landing/Features/data.ts
import { 
    BrainCircuit, 
    Eye,
    Target,
    LineChart,
    Share2,
    AlertCircle
  } from "lucide-react";
  
  export const featureData = {
    title: "Complete Website Health Suite",
    description: "Everything you need to maintain and improve your website's performance",
    features: [
      {
        icon: BrainCircuit,
        title: "AI-Powered Health Checks",
        description: "Automated website analysis with detailed health reports and recommendations."
      },
      {
        icon: Eye,
        title: "24/7 Monitoring",
        description: "Real-time tracking of your website's vital signs and performance metrics."
      },
      {
        icon: Target,
        title: "Competitor Analysis",
        description: "Track and compare your performance against industry competitors."
      },
      {
        icon: LineChart,
        title: "SEO Optimization",
        description: "Comprehensive SEO audits with actionable improvement strategies."
      },
      {
        icon: Share2,
        title: "Performance Tracking",
        description: "Monitor page speed, Core Web Vitals, and user experience metrics."
      },
      {
        icon: AlertCircle,
        title: "Issue Detection",
        description: "Early warning system for SEO, performance, and security issues."
      }
    ]
  };