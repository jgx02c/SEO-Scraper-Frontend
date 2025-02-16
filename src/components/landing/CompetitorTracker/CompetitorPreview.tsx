// components/landing/CompetitorTracker/CompetitorPreview.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { competitorData } from './data';

export const CompetitorPreview = () => {
  const { mockRankingData, recentChanges, keywordGap, adCampaigns } = competitorData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Competitor Ranking Comparison */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">SEO Ranking Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockRankingData}>
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
              name="Your Rankings"
            />
            <Line 
              type="monotone" 
              dataKey="competitor" 
              stroke="#EF4444" 
              strokeWidth={2} 
              name="Competitor"
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
              <div className="text-2xl font-bold text-white mt-1">{keywordGap.total}</div>
              <div className="text-sm text-green-400 flex items-center mt-1">
                <ArrowUp className="w-4 h-4 mr-1" />
                {keywordGap.new} new opportunities
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Active Ad Campaigns</div>
              <div className="text-2xl font-bold text-white mt-1">{adCampaigns.active}</div>
              <div className="text-sm text-red-400 flex items-center mt-1">
                <ArrowDown className="w-4 h-4 mr-1" />
                {adCampaigns.ending} ending soon
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3">Recent Changes Detected</h4>
            <div className="space-y-3">
              {recentChanges.map((change, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    change.color === 'blue' ? 'bg-blue-500' :
                    change.color === 'red' ? 'bg-red-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <div className="text-white">{change.title}</div>
                    <div className="text-gray-400">{change.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};