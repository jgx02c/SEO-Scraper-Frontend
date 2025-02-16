import React from 'react';
import { SEODashboardPreview } from './SEODashboardPreview';
import { dashboardData, dashboardCards } from './data';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const Dashboard = () => {
  const { title, description } = dashboardData;

  return (
    <section className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-gray-400 text-sm">{card.title}</h3>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-3xl font-bold text-white">
                  {card.value}
                </div>
                <div className={`flex items-center text-sm ${
                  card.change.isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {card.change.isPositive ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {card.change.value}%
                </div>
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {card.timeFrame}
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          {/* Main Dashboard */}
          <div className="relative z-10">
            <SEODashboardPreview />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Real-time data updates every 5 minutes. All metrics are based on your website&apos;s current performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;