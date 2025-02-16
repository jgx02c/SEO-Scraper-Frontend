import React from 'react';
import { contentData } from './data';
import { 
  // Keeping these commented in case they're used in future visualizations
  // LineChart, 
  // Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  // Keeping these commented in case they're used later
  // FileText, 
  BrainCircuit, 
  Sparkles, 
  // PenTool 
} from 'lucide-react';

export const ContentAnalysis = () => {
  const { title, description, features, qualityScores } = contentData;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              {title}
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg">
                {description}
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

          {/* Right Column - Analytics */}
          <div className="space-y-6">
            {/* Content Quality Score */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">Content Quality Metrics</h3>
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

            {/* Content Generation Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Generated Posts</h4>
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-white">247</div>
                <div className="text-sm text-green-400">+12% this month</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Content Score</h4>
                  <BrainCircuit className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-white">94%</div>
                <div className="text-sm text-green-400">+5% improvement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentAnalysis;