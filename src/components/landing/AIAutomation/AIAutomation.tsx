// components/landing/AIAutomation/AIAutomation.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Wand2, GitBranch, ShieldCheck, CodeSquare, RefreshCw } from 'lucide-react';

export const AIAutomation = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              AI Agents That Take Action
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg">
                Let our AI agents automatically implement optimizations and fixes. No manual work needed - just approve the changes.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg">
                    <feature.icon className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-white font-medium">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Live Actions Preview */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white text-lg font-semibold mb-4">Recent AI Actions</h3>
            <div className="space-y-4">
              {recentActions.map((action, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${action.bgColor}`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{action.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{action.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{action.time}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Impact: <span className="text-green-400">{action.impact}</span>
                    </div>
                    {!action.completed && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Approve Change
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
    {
      icon: Bot,
      title: "Automated SEO Fixes",
      description: "AI agents automatically fix meta tags, headings, and other SEO issues."
    },
    {
      icon: CodeSquare,
      title: "Code Optimization",
      description: "Optimize page speed by automatically minifying code and compressing assets."
    },
    {
      icon: GitBranch,
      title: "Content Updates",
      description: "Automatically update content structure and internal linking for better SEO."
    },
    {
      icon: ShieldCheck,
      title: "Safe Implementation",
      description: "All changes are reviewed and can be rolled back instantly if needed."
    }
  ];
  
  const recentActions = [
    {
      icon: Wand2,
      title: "Meta Descriptions Updated",
      description: "Optimized meta descriptions for 12 product pages",
      time: "2 mins ago",
      impact: "+15% CTR potential",
      bgColor: "bg-blue-600",
      completed: false
    },
    {
      icon: CodeSquare,
      title: "Image Optimization",
      description: "Compressed 45 images to improve page speed",
      time: "15 mins ago",
      impact: "+22 Performance Score",
      bgColor: "bg-green-600",
      completed: true
    },
    {
      icon: RefreshCw,
      title: "Internal Links Restructured",
      description: "Updated internal linking structure for better crawlability",
      time: "1 hour ago",
      impact: "+8 Authority Score",
      bgColor: "bg-purple-600",
      completed: true
    }
  ];