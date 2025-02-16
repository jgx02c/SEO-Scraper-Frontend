import { ComponentType } from 'react';
import { Bot, Rocket, BrainCog, Fingerprint } from 'lucide-react';

export interface Message {
  type: 'bot' | 'user';
  message: string;
}

export interface ChatFeature {
  icon: ComponentType;
  title: string;
  description: string;
}

export const chatData = {
  title: "Chat with Your Website Data",
  description: "Our AI assistant understands your website's health data and can help you:",
  features: [
    {
      icon: Bot,
      title: "Natural Language Insights",
      description: "Ask questions about your website's health in plain English and get instant answers."
    },
    {
      icon: Rocket,
      title: "Actionable Recommendations",
      description: "Get specific steps to improve your website's performance and SEO."
    },
    {
      icon: BrainCog,
      title: "Data Analysis",
      description: "Let AI analyze your trends and identify opportunities for improvement."
    },
    {
      icon: Fingerprint,
      title: "Personalized Assistance",
      description: "Get help tailored to your website's specific needs and goals."
    }
  ] as ChatFeature[]
};

export const sampleMessages: Message[] = [
  {
    type: 'bot',
    message: "Hello! I'm your AI Health Assistant. I can help you understand your website's performance and SEO data. What would you like to know?"
  },
  {
    type: 'user',
    message: "What are my top SEO issues this week?"
  },
  {
    type: 'bot',
    message: "I've analyzed your latest health check. The main issues are:\n1. 3 pages are missing meta descriptions\n2. There's a broken internal link on your blog\n3. Image optimization needed on your product pages\n\nWould you like me to help you fix these issues?"
  },
  {
    type: 'user',
    message: "Yes, let's fix the meta descriptions first"
  },
  {
    type: 'bot',
    message: "Great choice! I've identified the following pages missing meta descriptions:\n1. /products/new-features\n2. /blog/seo-tips\n3. /about-us\n\nI can help you generate optimized meta descriptions based on each page's content. Would you like me to do that?"
  }
];