import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Bot,
  BrainCircuit, 
  Sparkles,
  FileText,
  Play,
  Image,
  TrendingUp,
  Camera,
  Video
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const qualityScores = [
  { name: 'SEO', score: 92 },
  { name: 'Readability', score: 88 },
  { name: 'Visual', score: 85 },
  { name: 'Authority', score: 90 },
  { name: 'Engagement', score: 94 }
];

const contentActions = [
  {
    title: "Video Analysis",
    description: "Optimized video thumbnails and metadata",
    impact: "+25% Click Rate",
    time: "2 mins ago",
    icon: Play,
    color: "text-orange-400"
  },
  {
    title: "Image Optimization",
    description: "Enhanced ALT tags and compression",
    impact: "+18% Load Speed",
    time: "8 mins ago",
    icon: Image,
    color: "text-pink-400"
  },
  {
    title: "Content Structure",
    description: "Improved content hierarchy and flow",
    impact: "+12% Time on Page",
    time: "15 mins ago",
    icon: BrainCircuit,
    color: "text-blue-400"
  }
];

export const ContentAnalysis = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
            <FileText className="w-4 h-4" />
            <span>Content Intelligence</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            AI-Powered Content Analysis
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch as our AI agents analyze and optimize your content in real-time, improving engagement, SEO, and conversion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Performance */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Content Quality Metrics</h3>
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-green-400 text-sm">Live Analysis</span>
                </div>
              </div>

              <div className="relative p-4 rounded-lg mb-6">
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                <div className="absolute inset-0 border border-gray-700/30 rounded-lg" />
                <div className="relative">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={qualityScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Bar dataKey="score" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                  <div className="absolute inset-0 bg-green-500/5 rounded-lg" />
                  <div className="relative p-4">
                    <div className="text-sm text-gray-400">Articles & Blogs</div>
                    <div className="text-2xl font-bold text-white mt-1">247</div>
                    <div className="text-sm text-green-400 flex items-center mt-1">
                      <FileText className="w-4 h-4 mr-1" />
                      +12% this month
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                  <div className="absolute inset-0 bg-orange-500/5 rounded-lg" />
                  <div className="relative p-4">
                    <div className="text-sm text-gray-400">Video Content</div>
                    <div className="text-2xl font-bold text-white mt-1">84</div>
                    <div className="text-sm text-orange-400 flex items-center mt-1">
                      <Video className="w-4 h-4 mr-1" />
                      +28% views
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg" />
                  <div className="absolute inset-0 bg-pink-500/5 rounded-lg" />
                  <div className="relative p-4">
                    <div className="text-sm text-gray-400">Images</div>
                    <div className="text-2xl font-bold text-white mt-1">392</div>
                    <div className="text-sm text-pink-400 flex items-center mt-1">
                      <Camera className="w-4 h-4 mr-1" />
                      +15% engagement
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Actions & Recommendations */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <h3 className="text-white text-lg font-semibold mb-6">Recent AI Actions</h3>

              <div className="space-y-4 mb-6">
                {contentActions.map((action, index) => {
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

              <div className="relative p-4 rounded-lg">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm" />
                <div className="absolute inset-0 rounded-lg border border-blue-500/20" />
                <div className="relative">
                  <div className="flex items-center space-x-2 mb-3">
                    <Bot className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-medium">Content Opportunity</h4>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Your recent video about "AI Integration" is trending. Our analysis suggests creating a series of supporting visual content could increase engagement by 45%.
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-500 inline-flex items-center">
                      Generate Video Script
                      <Video className="w-4 h-4 ml-2" />
                    </Button>
                    <Button className="bg-pink-600 hover:bg-pink-500 inline-flex items-center">
                      Create Visuals
                      <Image className="w-4 h-4 ml-2" />
                    </Button>
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

export default ContentAnalysis;