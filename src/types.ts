// types/report.ts
export interface ErrorCitation {
    section: string;
    insight: string;
    webpage_url: string;
    filename?: string;
    business_id?: number;
  }
  
  export interface PageReport {
    website_url: string;
    insights_count: {
      "Immediate Action Required": number;
      "Needs Attention": number;
      "Good Practice": number;
    };
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
    insights_breakdown: { [key: string]: number };
    total_insights: number;
    page_reports: PageReport[];
  }