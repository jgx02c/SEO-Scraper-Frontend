import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, CheckCircle, AlertTriangle, AlertCircle, FileText, Gauge } from "lucide-react";
import OverviewSkeleton from './OverviewSkeletion';
import { fetchOverviewData } from '@/api/dashboard-api';

// Interface for our SEO report data structure
interface SeoReportData {
  business_id: string;
  report_date: string;
  filename: string;
  insights_count: {
    "Immediate Action Required": number;
    "Needs Attention": number;
    "Good Practice": number;
  };
  total_insights: number;
  page_reports: Array<{
    website_url: string;
    insights_count: {
      "Immediate Action Required": number;
      "Needs Attention": number;
      "Good Practice": number;
    };
    error_citations: Array<any>;
  }>;
}

interface OverviewProps {
  stats?: any;
}

export const Overview = ({ stats }: OverviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState<SeoReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReportData = async () => {
      try {
        setIsLoading(true);
        
        // Using the API function from the separate file
        const response = await fetchOverviewData();
        
        if (response.success && response.data) {
          setReportData(response.data);
        } else {
          setError(response.error || 'Failed to load SEO report data');
        }
      } catch (err) {
        console.error('Error loading SEO report data:', err);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadReportData();
  }, []);

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">SEO Performance Overview</h2>
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6 text-red-400">
            <div className="flex items-center space-x-2">
              <AlertCircle size={20} />
              <p>Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">SEO Performance Overview</h2>
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6 text-yellow-400">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} />
              <p>No report data available yet. Run a site scan to generate SEO insights.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate total issues
  const totalIssues = 
    (reportData.insights_count["Immediate Action Required"] || 0) + 
    (reportData.insights_count["Needs Attention"] || 0);
  
  // Calculate total insights
  const totalGoodPractices = reportData.insights_count["Good Practice"] || 0;
  
  // Calculate total URLs scanned
  const totalUrlsScanned = reportData.page_reports?.length || 0;

  // Calculate overall health score (good practices vs issues)
  const totalInsights = totalIssues + totalGoodPractices;
  const healthScore = totalInsights > 0 
    ? Math.round((totalGoodPractices / totalInsights) * 100) 
    : 100; // If no insights, consider it 100%

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Overview</h2>
        {reportData.report_date && (
          <span className="text-sm text-gray-400">
            Last updated: {new Date(reportData.report_date).toLocaleString()}
          </span>
        )}
      </div>
      
      {/* Main metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Critical Issues */}
        <Card className={`border-l-4 ${reportData.insights_count["Immediate Action Required"] > 0 ? 'border-l-red-500' : 'border-l-green-500'} bg-gray-800/50 backdrop-blur-xl border-gray-700`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Critical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AlertCircle className={reportData.insights_count["Immediate Action Required"] > 0 ? 'text-red-500' : 'text-green-500'} size={24} />
                <span className="text-2xl font-bold">{reportData.insights_count["Immediate Action Required"] || 0}</span>
              </div>
              <div className="text-xs text-gray-400">
                Immediate action required
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warnings */}
        <Card className={`border-l-4 ${reportData.insights_count["Needs Attention"] > 0 ? 'border-l-yellow-500' : 'border-l-green-500'} bg-gray-800/50 backdrop-blur-xl border-gray-700`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={reportData.insights_count["Needs Attention"] > 0 ? 'text-yellow-500' : 'text-green-500'} size={24} />
                <span className="text-2xl font-bold">{reportData.insights_count["Needs Attention"] || 0}</span>
              </div>
              <div className="text-xs text-gray-400">
                Issues needing attention
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Good Practices */}
        <Card className="border-l-4 border-l-green-500 bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Implemented Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-2xl font-bold">{reportData.insights_count["Good Practice"] || 0}</span>
              </div>
              <div className="text-xs text-gray-400">
                SEO best practices
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional metrics and charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SEO Health Score */}
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge size={20} />
              <span>SEO Health Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-28 h-28 rounded-full border-8 border-gray-700 flex items-center justify-center">
                <span className="text-3xl font-bold">{healthScore}%</span>
              </div>
              <Progress 
                value={healthScore} 
                className="w-full h-2" 
                indicatorClassName={`${
                  healthScore > 80 ? 'bg-green-500' : 
                  healthScore > 50 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
              />
              <div className="text-sm text-gray-400">
                {healthScore > 80 ? 'Excellent' : 
                 healthScore > 50 ? 'Room for improvement' : 
                 'Needs significant work'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Summary */}
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText size={20} />
              <span>Scan Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">URLs Scanned:</span>
                <span className="font-medium">{totalUrlsScanned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Issues:</span>
                <span className="font-medium">{totalIssues}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Good Practices:</span>
                <span className="font-medium">{totalGoodPractices}</span>
              </div>
              {reportData.report_date && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Report Date:</span>
                  <span className="font-medium">{new Date(reportData.report_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-blue-400 cursor-pointer hover:underline">
                  View Full Report
                </span>
                <BarChart size={18} className="text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};