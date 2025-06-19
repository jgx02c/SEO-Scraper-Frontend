import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Server, Settings } from "lucide-react";

interface DevNoticeProps {
  title?: string;
  message?: string;
  serverUrl?: string;
}

export const DevNotice: React.FC<DevNoticeProps> = ({ 
  title = "Backend Server Not Available",
  message = "The authentication server appears to be offline. Please start your backend server to continue.",
  serverUrl = process.env.NEXT_PUBLIC_API_URL
}) => {
  return (
    <Card className="bg-yellow-900/20 border-yellow-500/50 max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              {title}
            </h3>
            <p className="text-yellow-200 mb-4">
              {message}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Server className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-200">
                  Expected server URL: <code className="bg-yellow-800/30 px-2 py-1 rounded">{serverUrl}</code>
                </span>
              </div>
              
              <div className="bg-yellow-800/20 p-3 rounded border border-yellow-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Settings className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-300">Quick Start:</span>
                </div>
                <ol className="text-sm text-yellow-200 space-y-1 ml-6 list-decimal">
                  <li>Make sure your backend server is running</li>
                  <li>Verify the server is accessible at <code className="bg-yellow-800/30 px-1 rounded">{serverUrl}</code></li>
                  <li>Check for any CORS configuration issues</li>
                  <li>Refresh this page once the server is online</li>
                </ol>
              </div>
              
              <div className="text-xs text-yellow-400">
                💡 This notice only appears during development when the backend is unavailable.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 