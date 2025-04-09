import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bot, Search, Zap, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockRankingData = [
  { date: 'Week 1', you: 15, competitor: 12 },
  { date: 'Week 2', you: 11, competitor: 13 },
  { date: 'Week 3', you: 8, competitor: 14 },
  { date: 'Week 4', you: 5, competitor: 11 }
];

const agentActivities = [
  {
    id: 1,
    agent: 'KeywordBot',
    icon: Search,
    action: 'Found 3 high-value keywords',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  {
    id: 2,
    agent: 'ContentBot',
    icon: Bot,
    action: 'New competitor content detected',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    id: 3,
    agent: 'RankBot',
    icon: TrendingUp,
    action: 'Implementing improvements',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  },
  {
    id: 4,
    agent: 'AlertBot',
    icon: AlertCircle,
    action: 'Competitor promotion found',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10'
  }
];

export const CompetitorTracker = () => {
  const [activeAgents, setActiveAgents] = useState(agentActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgents(prev => {
        const newAgents = [...prev];
        const randomIndex = Math.floor(Math.random() * newAgents.length);
        newAgents[randomIndex] = {
          ...newAgents[randomIndex],
          action: `${['Scanning', 'Analyzing', 'Detecting', 'Updating'][Math.floor(Math.random() * 4)]}...`
        };
        return newAgents;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-6">
              <Bot className="w-4 h-4 mr-2" />
              <span>Automated SEO Suite</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Your AI Agents,
              <br />
              Working 24/7
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A comprehensive suite of AI-powered tools that continuously monitor, analyze, and optimize your SEO strategy. Automatically track competitors, discover opportunities, and implement improvements without manual intervention.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-medium">Keyword Analysis</span>
                </div>
                <p className="text-gray-400 text-sm">Continuous discovery of high-value keywords and opportunities</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-medium">Rank Tracking</span>
                </div>
                <p className="text-gray-400 text-sm">Real-time monitoring of your search position</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-medium">Content Analysis</span>
                </div>
                <p className="text-gray-400 text-sm">Smart content optimization suggestions</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-medium">Competitor Alerts</span>
                </div>
                <p className="text-gray-400 text-sm">Instant notifications of competitor changes</p>
              </div>
            </div>
          </div>

          {/* Right side dashboard */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
              <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg font-semibold">Live Agent Activity</h3>
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {activeAgents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <div key={agent.id} className="relative p-4 rounded-lg group transition-all duration-200">
                        <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                        <div className={`absolute inset-0 rounded-lg ${agent.bgColor} opacity-10 group-hover:opacity-20 transition-opacity`} />
                        <div className="absolute inset-0 rounded-lg border border-gray-700/30 group-hover:border-gray-600/50 transition-colors" />
                        <div className="relative flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${agent.bgColor}`}>
                            <Icon className={`w-5 h-5 ${agent.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">{agent.agent}</h4>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                            <p className={`${agent.color} text-sm mt-2`}>{agent.action}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="relative mt-6 rounded-lg">
                  <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5 rounded-lg" />
                  <div className="absolute inset-0 border border-gray-700/30 rounded-lg" />
                  <div className="relative p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">127</p>
                        <p className="text-gray-400 text-sm">Optimizations Today</p>
                      </div>
                      <Button className="bg-indigo-600 hover:bg-indigo-500">
                        View Details
                      </Button>
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

export default CompetitorTracker;