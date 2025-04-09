import React from 'react';
import { 
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bot,
  LineChart,
  ArrowRight,
  FileText,
  Eye,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const healthMetrics = {
  score: 85,
  trend: '+3',
  lastUpdate: '5 mins ago',
  scanStatus: 'Live Monitoring'
};

const reportCategories = [
  {
    title: 'Critical Issues',
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    count: 4,
    status: 'Need attention',
    items: [
      { text: 'Missing meta descriptions', count: 3, pages: ['/about', '/products', '/contact'] },
      { text: 'Broken internal links', count: 1, pages: ['/blog/old-post'] }
    ]
  },
  {
    title: 'Active Optimizations',
    icon: LineChart,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    count: 3,
    status: 'In progress',
    items: [
      { text: 'Content optimization', progress: '75%' },
      { text: 'Image compression', progress: '45%' },
      { text: 'Page speed enhancement', progress: '90%' }
    ]
  },
  {
    title: 'Recent Improvements',
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    count: 15,
    status: 'Completed',
    items: [
      { text: 'Mobile responsiveness', impact: '+22% speed' },
      { text: 'SSL configuration', impact: 'Secured' }
    ]
  }
];

const recentScans = [
  {
    type: 'Technical Audit',
    time: '2 mins ago',
    findings: '2 new issues detected',
    icon: Eye,
    color: 'text-purple-400'
  },
  {
    type: 'Content Analysis',
    time: '15 mins ago',
    findings: '5 optimization opportunities',
    icon: FileText,
    color: 'text-blue-400'
  },
  {
    type: 'Security Check',
    time: '1 hour ago',
    findings: 'All checks passed',
    icon: CheckCircle2,
    color: 'text-green-400'
  }
];

export const Reports = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
            <Bot className="w-4 h-4" />
            <span>AI Reports</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Real-time Health Monitoring
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your AI agents continuously monitor your website's health, generating detailed reports and implementing improvements automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Health Score */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">Website Health Report</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Last update: {healthMetrics.lastUpdate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-green-400 text-sm">{healthMetrics.scanStatus}</span>
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full flex items-center">
                    <span className="text-lg font-semibold">{healthMetrics.score}/100</span>
                    <span className="text-green-400 text-sm ml-2">↑{healthMetrics.trend}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="relative p-4 rounded-lg group transition-all duration-200">
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className={`absolute inset-0 rounded-lg ${category.bgColor} opacity-10`} />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-lg ${category.bgColor}`}>
                              <Icon className={`w-5 h-5 ${category.color}`} />
                            </div>
                            <h4 className="text-white font-medium">{category.title}</h4>
                          </div>
                          <span className={`${category.color} text-sm`}>{category.count}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{category.status}</p>
                        <div className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{item.text}</span>
                              {'progress' in item && (
                                <span className={category.color}>{item.progress}</span>
                              )}
                              {'impact' in item && (
                                <span className={category.color}>{item.impact}</span>
                              )}
                              {'count' in item && !('impact' in item) && !('progress' in item) && (
                                <span className={category.color}>{item.count} pages</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <h3 className="text-white text-lg font-semibold mb-6">Recent Scans</h3>
              
              <div className="space-y-4">
                {recentScans.map((scan, index) => {
                  const Icon = scan.icon;
                  return (
                    <div key={index} className="relative p-4 rounded-lg group transition-all duration-200">
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className="absolute inset-0 rounded-lg opacity-10 bg-gray-800" />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                      <div className="relative flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-gray-800">
                          <Icon className={`w-5 h-5 ${scan.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">{scan.type}</h4>
                            <span className="text-gray-500 text-sm">{scan.time}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{scan.findings}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 inline-flex items-center justify-center">
                View Full Report
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;