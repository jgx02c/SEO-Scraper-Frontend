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
  FileText,
  Play,
  Image,
  Camera,
  Video,
  Check
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
    description: "Optimized video thumbnails",
    impact: "+25%",
    icon: Play,
    color: "text-orange-400"
  },
  {
    title: "Image Optimization",
    description: "Enhanced ALT tags",
    impact: "+18%",
    icon: Image,
    color: "text-pink-400"
  },
  {
    title: "Content Structure",
    description: "Improved hierarchy",
    impact: "+12%",
    icon: BrainCircuit,
    color: "text-blue-400"
  }
];

export const ContentAnalysis = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-6">
              <FileText className="w-4 h-4 mr-2" />
              <span>Content Intelligence</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              AI-Powered Content
              <br />
              That Converts
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our AI agents continuously analyze and optimize your content across all formats, 
              ensuring maximum engagement through data-driven improvements.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Real-Time Content Analysis</h3>
                  <p className="text-gray-400">Continuous monitoring and optimization</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Multi-Format Optimization</h3>
                  <p className="text-gray-400">Text, images, and videos enhanced automatically</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Performance Metrics */}
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
                    <span className="text-green-400 text-sm">Live</span>
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

                <div className="space-y-4">
                  {contentActions.map((action, index) => (
                    <div key={index} className="relative p-4 rounded-lg group transition-all duration-200">
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-lg opacity-10 bg-gray-800 group-hover:opacity-20 transition-opacity" />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30 group-hover:border-gray-600/50 transition-colors" />
                      <div className="relative flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gray-800">
                          <action.icon className={`w-5 h-5 ${action.color}`} />
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
                  ))}
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