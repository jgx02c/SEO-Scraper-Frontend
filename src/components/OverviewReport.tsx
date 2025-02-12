// components/OverviewReport.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, BarChart2, CheckCircle } from 'lucide-react';
import { Report, InsightCategory } from '@/types';

interface OverviewReportProps {
  report: Report | null;
}

const OverviewReport: React.FC<OverviewReportProps> = ({ report }) => {
  if (!report) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent>
          <p className="text-center text-gray-400">No report data available</p>
        </CardContent>
      </Card>
    );
  }

  const getInsightCount = (category: InsightCategory): number => {
    return report.insights_count[category] || 0;
  };

  const getBreakdownItems = (type: InsightCategory): Array<{ insight: string; count: number }> => {
    if (!report.insights_breakdown) return [];
    return Object.entries(report.insights_breakdown)
      .filter(([key]) => {
        if (type === "Good Practice") return key.includes("Good practice for SEO");
        if (type === "Needs Attention") return key.includes("missing alt text") || key.includes("Consider adding more content");
        return key.includes("No canonical tag") || key.includes("No meta description");
      })
      .map(([key, value]) => ({
        insight: key,
        count: value
      }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-950/50 border-red-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>Critical Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400 mb-2">
              {getInsightCount("Immediate Action Required")}
            </div>
            <ScrollArea className="h-32">
              {getBreakdownItems("Immediate Action Required").map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <Badge variant="destructive" className="shrink-0">{item.count}x</Badge>
                  <span className="text-sm text-red-200">{item.insight}</span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-yellow-950/50 border-yellow-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-yellow-400" />
              <span>Warnings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {getInsightCount("Needs Attention")}
            </div>
            <ScrollArea className="h-32">
              {getBreakdownItems("Needs Attention").map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <Badge variant="warning" className="bg-yellow-900 text-yellow-200 shrink-0">{item.count}x</Badge>
                  <span className="text-sm text-yellow-200">{item.insight}</span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-green-950/50 border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Good Practices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {getInsightCount("Good Practice")}
            </div>
            <ScrollArea className="h-32">
              {getBreakdownItems("Good Practice").map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <Badge variant="success" className="bg-green-900 text-green-200 shrink-0">{item.count}x</Badge>
                  <span className="text-sm text-green-200">{item.insight}</span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewReport;