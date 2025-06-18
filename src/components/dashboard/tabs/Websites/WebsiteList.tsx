import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  MoreVertical, 
  Play, 
  Edit, 
  Trash2, 
  Plus,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { apiV2, Website, Snapshot } from '@/api/website-api-v2';
import { ComponentLoader } from "@/components/dashboard/shared/ComponentLoader";

interface WebsiteWithLatestScan extends Website {
  latest_snapshot?: Snapshot;
}

interface WebsiteListProps {
  onAddWebsite?: () => void;
  onEditWebsite?: (website: Website) => void;
}

export const WebsiteList: React.FC<WebsiteListProps> = ({ 
  onAddWebsite, 
  onEditWebsite 
}) => {
  const [websites, setWebsites] = useState<WebsiteWithLatestScan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      setIsLoading(true);
      const websiteList = await apiV2.websites.list();
      
      // Get latest snapshots for each website
      const websitesWithSnapshots = await Promise.all(
        websiteList.map(async (website) => {
          try {
            const snapshots = await apiV2.snapshots.listByWebsite(website.id);
            const latestSnapshot = snapshots.length > 0 ? snapshots[0] : undefined;
            return { ...website, latest_snapshot: latestSnapshot };
          } catch {
            return website;
          }
        })
      );
      
      setWebsites(websitesWithSnapshots);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load websites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartScan = async (websiteId: string) => {
    try {
      await apiV2.snapshots.create(websiteId);
      // Refresh the list to show the new scan
      loadWebsites();
    } catch (err) {
      console.error('Failed to start scan:', err);
    }
  };

  const handleDeleteWebsite = async (websiteId: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return;
    
    try {
      await apiV2.websites.delete(websiteId);
      loadWebsites();
    } catch (err) {
      console.error('Failed to delete website:', err);
    }
  };

  const getStatusIcon = (snapshot?: Snapshot) => {
    if (!snapshot) return <Clock className="h-4 w-4 text-gray-400" />;
    
    switch (snapshot.status) {
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

  const getStatusText = (snapshot?: Snapshot) => {
    if (!snapshot) return 'No scans';
    
    switch (snapshot.status) {
      case 'completed':
        return `Last scan: ${new Date(snapshot.completed_at!).toLocaleDateString()}`;
      case 'running':
        return `Scanning... ${snapshot.progress_percentage}%`;
      case 'failed':
        return 'Last scan failed';
      default:
        return 'Scan pending';
    }
  };

  if (isLoading) {
    return <ComponentLoader activeTab="loading" activeSubItem={null} />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Websites</h2>
          <Button onClick={onAddWebsite} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Website
          </Button>
        </div>
        <Card className="bg-red-900/20 border-red-500/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p>Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Websites</h2>
        <Button onClick={onAddWebsite} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Website
        </Button>
      </div>

      {websites.length === 0 ? (
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-12 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No websites yet</h3>
            <p className="text-gray-400 mb-4">
              Add your first website to start monitoring SEO performance
            </p>
            <Button onClick={onAddWebsite} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Website
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <Card key={website.id} className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Globe className="h-5 w-5 text-indigo-400" />
                      {website.name}
                    </CardTitle>
                    <p className="text-sm text-gray-400 mt-1 break-all">
                      {website.url}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem 
                        onClick={() => handleStartScan(website.id)}
                        className="hover:bg-gray-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Scan
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onEditWebsite?.(website)}
                        className="hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteWebsite(website.id)}
                        className="hover:bg-gray-700 text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={website.type === 'primary' ? 'default' : 'secondary'}
                      className={website.type === 'primary' ? 'bg-indigo-600' : 'bg-gray-600'}
                    >
                      {website.type === 'primary' ? 'Primary' : 'Competitor'}
                    </Badge>
                    <Badge 
                      variant={website.is_active ? 'default' : 'secondary'}
                      className={website.is_active ? 'bg-green-600' : 'bg-gray-600'}
                    >
                      {website.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    {getStatusIcon(website.latest_snapshot)}
                    <span className="text-gray-400">
                      {getStatusText(website.latest_snapshot)}
                    </span>
                  </div>

                  {website.latest_snapshot?.report && (
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-red-900/20 rounded">
                        <div className="text-red-400 font-semibold">
                          {website.latest_snapshot.report.critical_issues}
                        </div>
                        <div className="text-gray-400">Critical</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-900/20 rounded">
                        <div className="text-yellow-400 font-semibold">
                          {website.latest_snapshot.report.warnings}
                        </div>
                        <div className="text-gray-400">Warnings</div>
                      </div>
                      <div className="text-center p-2 bg-green-900/20 rounded">
                        <div className="text-green-400 font-semibold">
                          {website.latest_snapshot.report.seo_score}
                        </div>
                        <div className="text-gray-400">Score</div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleStartScan(website.id)}
                      disabled={website.latest_snapshot?.status === 'running'}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {website.latest_snapshot?.status === 'running' ? 'Scanning...' : 'Scan'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 