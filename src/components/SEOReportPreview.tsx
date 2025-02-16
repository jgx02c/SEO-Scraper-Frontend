import React from 'react';
import { 
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const SEOReportPreview = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="space-y-6">
        {/* Report Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Website Health Report</h3>
            <p className="text-gray-400">Last updated: 2 hours ago</p>
          </div>
          <div className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full">
            Health Score: 85/100
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <h4 className="text-white font-medium">Critical Issues</h4>
                <p className="text-gray-400 text-sm">4 issues need immediate attention</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Missing meta descriptions (3 pages)</li>
                  <li>• Broken internal links</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="text-white font-medium">Warnings</h4>
                <p className="text-gray-400 text-sm">7 items need improvement</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Slow loading images</li>
                  <li>• Missing alt text</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h4 className="text-white font-medium">Passed Checks</h4>
                <p className="text-gray-400 text-sm">15 items are well optimized</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Mobile responsiveness</li>
                  <li>• SSL certificate</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <h4 className="text-white font-medium">Competitive Gaps</h4>
                <p className="text-gray-400 text-sm">3 areas need attention</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Keyword coverage</li>
                  <li>• Content length</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOReportPreview;