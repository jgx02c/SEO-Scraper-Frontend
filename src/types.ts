// src/types/index.ts
export type InsightCategory = "Immediate Action Required" | "Needs Attention" | "Good Practice";

export interface ErrorCitation {
  section: InsightCategory;
  insight: string;
  webpage_url: string;
  filename?: string;
  business_id?: number;
}

export interface PageReport {
  website_url: string;
  insights_count: Record<InsightCategory, number>;
  error_citations: ErrorCitation[];
  filename?: string;
}

export interface Report {
  _id: string;
  business_id: number;
  report_date: string;
  insights_count: {
    "Good Practice": number;
    "Immediate Action Required": number;
    "Needs Attention": number;
  };
  insights_breakdown: Record<string, number>;
  total_insights: number;
  page_reports: PageReport[];
}