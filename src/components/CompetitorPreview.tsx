import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const mockCompetitorData = [
  { date: 'Jan', competitor: 45, you: 38 },
  { date: 'Feb', competitor: 48, you: 42 },
  { date: 'Mar', competitor: 46, you: 45 },
  { date: 'Apr', competitor: 43, you: 48 },
  { date: 'May', competitor: 41, you: 52 },
  { date: 'Jun', competitor: 39, you: 55 }
];

const CompetitorPreview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Competitor Ranking Comparison */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">SEO Ranking Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockCompetitorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Line 
              type="monotone" 
              dataKey="you" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              name={"Your Rankings"}
            />
            <Line 
              type="monotone" 
              dataKey="competitor" 
              stroke="#EF4444" 
              strokeWidth={2} 
              name={"Competitor"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Intelligence Dashboard */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Competitive Intelligence</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Keyword Gap</div>
              <div className="text-2xl font-bold text-white mt-1">127</div>
              <div className="text-sm text-green-400 flex items-center mt-1">
                <ArrowUp className="w-4 h-4 mr-1" />
                24 new opportunities
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Active Ad Campaigns</div>
              <div className="text-2xl font-bold text-white mt-1">8</div>
              <div className="text-sm text-red-400 flex items-center mt-1">
                <ArrowDown className="w-4 h-4 mr-1" />
                3 ending soon
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3">Recent Changes Detected</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                <div>
                  <div className="text-white">New landing page detected</div>
                  <div className="text-gray-400">Competitor launched product feature page</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                <div>
                  <div className="text-white">New ad campaign started</div>
                  <div className="text-gray-400">Targeting &quot;enterprise analytics&quot; keywords</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                <div>
                  <div className="text-white">Content update detected</div>
                  <div className="text-gray-400">Blog post optimization for &quot;SEO tools&quot;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorPreview;