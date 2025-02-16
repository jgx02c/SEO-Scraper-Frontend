import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockHealthData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 89 }
];

const mockTrafficData = [
  { month: 'Jan', organic: 5200, paid: 3100 },
  { month: 'Feb', organic: 5800, paid: 3300 },
  { month: 'Mar', organic: 6500, paid: 3800 },
  { month: 'Apr', organic: 7200, paid: 4100 },
  { month: 'May', organic: 8100, paid: 4500 },
  { month: 'Jun', organic: 9000, paid: 4800 }
];

const mockSEOIssues = [
  { category: 'Missing Meta', count: 24 },
  { category: 'Broken Links', count: 12 },
  { category: 'Slow Pages', count: 8 },
  { category: 'No Alt Text', count: 45 },
  { category: 'H1 Issues', count: 15 }
];

const SEODashboardPreview = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Health Score */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Website Health Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Overview */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
              <Area type="monotone" dataKey="paid" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SEO Issues Overview */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">SEO Issues Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockSEOIssues}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SEODashboardPreview;