import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Search,
  Eye,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { apiV2, Snapshot, Website } from '@/api/website-api-v2';

interface ScanWithWebsite extends Snapshot {
  website?: Website;
}

interface ScanDashboardProps {
  onViewReport?: (snapshotId: string) => void;
}

export const ScanDashboard: React.FC<ScanDashboardProps> = ({ onViewReport }) => {
  const [scans, setScans] = useState<ScanWithWebsite[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    
    // Set up polling for active scans
    const interval = setInterval(() => {
      const hasActiveScans = scans.some(scan => 
        scan.status === 'running' || scan.status === 'pending'
      );
      if (hasActiveScans) {
        refreshScans();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [scans]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [websiteList] = await Promise.all([
        apiV2.websites.list()
      ]);
      
      setWebsites(websiteList);
      
      // Get all snapshots for all websites
      const allSnapshots = [];
      for (const website of websiteList) {
        try {
          const snapshots = await apiV2.snapshots.listByWebsite(website.id);
          const snapshotsWithWebsite = snapshots.map(snapshot => ({
            ...snapshot,
            website
          }));
          allSnapshots.push(...snapshotsWithWebsite);
        } catch (error) {
          console.error(`Failed to load snapshots for website ${website.id}:`, error);
        }
      }
      
      // Sort by creation date (newest first)
      allSnapshots.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setScans(allSnapshots.slice(0, 20)); // Show last 20 scans
    } catch (error) {
      console.error('Failed to load scan data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshScans = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleStartNewScan = async (websiteId: string) => {
    try {
      await apiV2.snapshots.create(websiteId);
      await loadData();
    } catch (error) {
      console.error('Failed to start scan:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'running':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getScoreIcon = (currentScore?: number, previousScore?: number) => {
    if (!currentScore || !previousScore) return <Minus className="h-4 w-4 text-gray-400" />;
    
    if (currentScore > previousScore) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (currentScore < previousScore) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  // Calculate summary stats
  const activeScans = scans.filter(scan => scan.status === 'running').length;
  const completedScans = scans.filter(scan => scan.status === 'completed').length;
  const failedScans = scans.filter(scan => scan.status === 'failed').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-600 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Scan Dashboard</h2>
        <Button 
          onClick={refreshScans} 
          disabled={refreshing}
          variant="outline"
          className="border-gray-600 hover:bg-gray-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Scans</p>
                <p className="text-2xl font-bold text-blue-400">{activeScans}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedScans}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-red-400">{failedScans}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Websites</p>
                <p className="text-2xl font-bold text-indigo-400">{websites.length}</p>
              </div>
              <Search className="h-8 w-8 text-indigo-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start New Scan */}
      {websites.length > 0 && (
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Start Scan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {websites.slice(0, 6).map((website) => (
                <Button
                  key={website.id}
                  onClick={() => handleStartNewScan(website.id)}
                  variant="outline"
                  className="justify-start border-gray-600 hover:bg-gray-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Scan {website.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Scans */}
      <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          {scans.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No scans yet. Start your first scan to see results here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(scan.status)}
                    <div>
                      <p className="font-medium text-white">
                        {scan.website?.name || 'Unknown Website'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {scan.website?.url}
                      </p>
                      <p className="text-xs text-gray-500">
                        Started: {new Date(scan.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={getStatusBadgeVariant(scan.status)}
                      className="capitalize"
                    >
                      {scan.status}
                    </Badge>

                    {scan.status === 'running' && (
                      <div className="w-24">
                        <Progress value={scan.progress_percentage} className="h-2" />
                        <p className="text-xs text-gray-400 mt-1 text-center">
                          {scan.progress_percentage}%
                        </p>
                      </div>
                    )}

                    {scan.status === 'completed' && scan.report && (
                      <div className="flex items-center space-x-2">
                        <div className="text-center">
                          <p className="text-sm font-medium text-green-400">
                            {scan.report.seo_score}
                          </p>
                          <p className="text-xs text-gray-400">Score</p>
                        </div>
                        {getScoreIcon(scan.report.seo_score)}
                      </div>
                    )}

                    {scan.status === 'completed' && (
                      <Button
                        size="sm"
                        onClick={() => onViewReport?.(scan.id)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Report
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 