import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, Target, TrendingUp, Zap, Sparkles, ArrowRight, LineChart, Check } from 'lucide-react';

const aiActions = [
  {
    title: "Bid Optimization",
    description: "Adjusted keyword bids",
    impact: "+18%",
    icon: TrendingUp,
    color: "text-green-400"
  },
  {
    title: "Audience Targeting",
    description: "New converting segment",
    impact: "+12%",
    icon: Target,
    color: "text-blue-400"
  },
  {
    title: "Creative Testing",
    description: "New ad variation",
    impact: "-15%",
    icon: Sparkles,
    color: "text-purple-400"
  }
];

export const AdCampaigns = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-6">
              <LineChart className="w-4 h-4 mr-2" />
              <span>AI Campaigns</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              Deploy Smart
              <br />
              Ad Campaigns
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Set your budget and let our AI agents optimize your campaigns automatically. 
              Experience continuous ROI improvements through real-time adjustments.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Automated Budget Management</h3>
                  <p className="text-gray-400">Dynamic allocation across channels for optimal ROI</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">24/7 Performance Monitoring</h3>
                  <p className="text-gray-400">Real-time optimization and bid adjustments</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Smart A/B Testing</h3>
                  <p className="text-gray-400">Automated creative testing and optimization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - All Visuals */}
          <div>
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
              <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg font-semibold">Live Performance</h3>
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>

                {/* Campaign Deployment */}
                <div className="relative p-4 rounded-lg mb-6">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-lg border border-blue-500/20" />
                  <div className="relative">
                    <div className="flex items-center space-x-2 mb-4">
                      <Bot className="w-5 h-5 text-blue-400" />
                      <h4 className="text-white font-medium">Deploy New Campaign</h4>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Enter daily budget"
                        className="flex-1 h-12 px-4 rounded-lg bg-white/90 border border-gray-300 
                                 text-gray-900 text-lg placeholder-gray-500 
                                 focus:outline-none focus:border-indigo-500"
                      />
                      <Button 
                        className="h-12 bg-blue-600 hover:bg-blue-500 inline-flex items-center"
                      >
                        Launch Campaign
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                    <div className="absolute inset-0 bg-green-500/5 rounded-lg" />
                    <div className="relative p-4">
                      <div className="text-sm text-gray-400">Current ROI</div>
                      <div className="text-2xl font-bold text-white mt-1">247%</div>
                      <div className="text-sm text-green-400 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +32%
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                    <div className="absolute inset-0 bg-blue-500/5 rounded-lg" />
                    <div className="relative p-4">
                      <div className="text-sm text-gray-400">Optimizations</div>
                      <div className="text-2xl font-bold text-white mt-1">89</div>
                      <div className="text-sm text-blue-400">Last update 2m ago</div>
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
                        <div className="relative flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-gray-800">
                            <Icon className={`w-5 h-5 ${action.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">{action.title}</h4>
                              <span className={`${action.color} text-sm`}>{action.impact}</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{action.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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