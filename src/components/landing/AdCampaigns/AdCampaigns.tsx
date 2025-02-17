import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Target, TrendingUp, Zap, Sparkles, ArrowRight, LineChart } from 'lucide-react';

const adMetrics = {
  currentROI: "247%",
  improvement: "+32%",
  optimizations: "89",
  lastUpdate: "2 mins ago"
};

const aiActions = [
  {
    title: "Bid Optimization",
    description: "Adjusted keyword bids based on conversion data",
    impact: "+18% CTR",
    time: "3 mins ago",
    icon: TrendingUp,
    color: "text-green-400"
  },
  {
    title: "Audience Targeting",
    description: "Expanded to new high-converting segment",
    impact: "+12% Conv. Rate",
    time: "15 mins ago",
    icon: Target,
    color: "text-blue-400"
  },
  {
    title: "Creative Testing",
    description: "Launched new ad variation based on performance",
    impact: "-15% CPA",
    time: "28 mins ago",
    icon: Sparkles,
    color: "text-purple-400"
  }
];

export const AdCampaigns = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
            <LineChart className="w-4 h-4" />
            <span>Campaign Performance</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            AI-Powered Campaign Management
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI agents continuously optimize your ad campaigns for maximum ROI, adjusting bids, targeting, and creative elements in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Performance */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <h3 className="text-white text-lg font-semibold mb-6">Campaign Performance</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                  <div className="absolute inset-0 bg-green-500/5 rounded-lg" />
                  <div className="relative p-4">
                    <div className="text-sm text-gray-400">Current ROI</div>
                    <div className="text-2xl font-bold text-white mt-1">{adMetrics.currentROI}</div>
                    <div className="text-sm text-green-400 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {adMetrics.improvement}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                  <div className="absolute inset-0 bg-blue-500/5 rounded-lg" />
                  <div className="relative p-4">
                    <div className="text-sm text-gray-400">AI Optimizations</div>
                    <div className="text-2xl font-bold text-white mt-1">{adMetrics.optimizations}</div>
                    <div className="text-sm text-blue-400">Last update {adMetrics.lastUpdate}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {aiActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div key={index} className="relative p-4 rounded-lg group transition-all duration-200">
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-lg opacity-10 bg-gray-800 group-hover:opacity-20 transition-opacity" />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30 group-hover:border-gray-600/50 transition-colors" />
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-gray-800">
                          <Icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">{action.title}</h4>
                            <span className={`${action.color} text-sm`}>{action.impact}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{action.description}</p>
                          <p className="text-gray-500 text-sm mt-2">{action.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">AI Recommendations</h3>
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-green-400 text-sm">Live Updates</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative p-4 rounded-lg">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-lg border border-blue-500/20" />
                  <div className="relative">
                    <div className="flex items-center space-x-2 mb-3">
                      <Bot className="w-5 h-5 text-blue-400" />
                      <h4 className="text-white font-medium">New Opportunity Detected</h4>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Based on recent performance data, expanding your campaign to include these keywords could increase conversions by 23%.
                    </p>
                    <div className="flex space-x-3">
                      <Button className="bg-blue-600 hover:bg-blue-500 inline-flex items-center">
                        Apply Recommendations
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative p-4 rounded-lg">
                  <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                  <div className="relative">
                    <h4 className="text-white font-medium mb-2">Automated Optimizations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Bid Adjustments</span>
                        <span className="text-green-400">Every 4 hours</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Audience Targeting</span>
                        <span className="text-green-400">Every 6 hours</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Creative Testing</span>
                        <span className="text-green-400">Every 12 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdCampaigns;