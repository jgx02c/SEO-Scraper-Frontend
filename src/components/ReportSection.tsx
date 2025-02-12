// components/ReportSection.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';
import { Report, InsightCategory } from '@/types';
import { Select, SelectItem } from '@/components/ui/select';

interface ReportSectionProps {
  report: Report | null;
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  const [reportType, setReportType] = useState<string>("page-reports");

  if (!report) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent>
          <p className="text-center text-gray-400">No report data available</p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (section: InsightCategory): string => {
    switch (section) {
      case "Immediate Action Required":
        return "text-red-400 bg-red-950 border-red-800";
      case "Needs Attention":
        return "text-yellow-400 bg-yellow-950 border-yellow-800";
      case "Good Practice":
        return "text-green-400 bg-green-950 border-green-800";
      default:
        return "text-gray-400 bg-gray-950 border-gray-800";
    }
  };

  const getReportTitle = () => {
    switch (reportType) {
      case "page-reports":
        return `Page Reports (${report.page_reports?.length || 0})`;
      case "seo-reports":
        return "SEO Reports";
      case "performance-reports":
        return "Performance Reports";
      default:
        return "Reports";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <h2 className="text-xl font-semibold text-white">{getReportTitle()}</h2>
        </div>
        <div className="w-[180px]">
          <Select
            value={reportType}
            onValueChange={setReportType}
          >
            <SelectItem value="page-reports">Page Reports</SelectItem>
            <SelectItem value="seo-reports">SEO Reports</SelectItem>
            <SelectItem value="performance-reports">Performance Reports</SelectItem>
          </Select>
        </div>
      </div>

      {reportType === "page-reports" && (
        <ScrollArea className="h-[calc(100vh-280px)] min-h-[500px]">
          <div className="space-y-4 pr-4">
            {report.page_reports?.map((pageReport, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <h4 className="font-medium text-lg mb-3 text-blue-400 break-all">
                    {pageReport.website_url}
                  </h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Badge variant="destructive" className="justify-center">
                      Critical: {pageReport.insights_count["Immediate Action Required"]}
                    </Badge>
                    <Badge variant="warning" className="bg-yellow-900 text-yellow-200 justify-center">
                      Warnings: {pageReport.insights_count["Needs Attention"]}
                    </Badge>
                    <Badge variant="success" className="bg-green-900 text-green-200 justify-center">
                      Good: {pageReport.insights_count["Good Practice"]}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {pageReport.error_citations.map((citation, citIndex) => (
                      <div
                        key={citIndex}
                        className={`p-3 rounded-md ${getSeverityColor(citation.section)}`}
                      >
                        {citation.insight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {reportType === "seo-reports" && (
        <div className="text-center text-gray-400 py-8">
          SEO Reports coming soon
        </div>
      )}

      {reportType === "performance-reports" && (
        <div className="text-center text-gray-400 py-8">
          Performance Reports coming soon
        </div>
      )}
    </div>
  );
};

export default ReportSection;