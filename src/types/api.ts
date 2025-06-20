export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ErrorCitation {
  id: string;
  message: string;
  severity: string;
  section?: string;
  insight?: string;
  webpage_url?: string;
  filename?: string;
  business_id?: number;
  [key: string]: unknown;
}

export interface SeoReportData {
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
    error_citations: ErrorCitation[];
  }>;
}

export interface OverviewResponse {
  success: boolean;
  data?: SeoReportData;
  error?: string;
}

export type AnalysisStatus = 'processing' | 'scanning' | 'generating_report' | 'completed' | 'error' | 'unknown' | 'crawling';

export interface AnalysisResponse {
  success: boolean;
  message?: string;
  url?: string;
  status?: AnalysisStatus;
  scan_status?: string;
  error?: string;
  error_message?: string;
  analysis_id?: string;
  pages_scanned?: number;
  total_pages?: number;
  current_step?: string;
  estimated_time_remaining?: number;
  progress_percentage?: number;
  report_generated?: boolean;
  last_updated?: string;
  isComplete?: boolean;
  website_id?: string;
  base_url?: string;
  pages_failed?: number;
  completed_at?: string;
}

export interface ScanStatus {
  pages_scanned: number;
  total_pages: number;
  current_step: string;
  estimated_time_remaining: number;
  progress_percentage: number;
}

export interface UserState {
  hasCompletedOnboarding: boolean;
  analysisStatus: string;
  websiteUrl?: string;
  [key: string]: unknown;
}

export type UserProfileResponse = ApiResponse<UserProfile>;

export type UserStateResponse = ApiResponse<UserState>;

// Imports from auth types
import type { UserProfile } from './auth'; 