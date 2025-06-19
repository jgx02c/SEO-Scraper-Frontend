// V2 Website API - Comprehensive SEO Scraper Backend Integration
import { getAuthHeader } from './auth-api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class WebsiteApiV2Error extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'WebsiteApiV2Error';
  }
}

const handleApiResponse = async (response: Response) => {
  let data;
  try {
    data = await response.json();
  } catch {
    throw new WebsiteApiV2Error(
      response.status,
      `Failed to parse response: ${response.statusText}`,
      'PARSE_ERROR'
    );
  }
  
  if (!response.ok) {
    const message = data.detail || data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
    throw new WebsiteApiV2Error(response.status, message, data.code, data);
  }
  
  return data;
};

// Types for V2 API
export interface Website {
  id: string;
  url: string;
  name: string;
  type: 'primary' | 'competitor';
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Snapshot {
  id: string;
  website_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  pages_scanned: number;
  total_pages: number;
  progress_percentage: number;
  report?: SEOReport;
}

export interface SEOReport {
  id: string;
  snapshot_id: string;
  seo_score: number;
  critical_issues: number;
  warnings: number;
  good_practices: number;
  page_reports: PageReport[];
  summary: {
    total_pages: number;
    avg_load_time: number;
    mobile_friendly: number;
    https_enabled: boolean;
  };
}

export interface PageReport {
  url: string;
  title: string;
  meta_description?: string;
  h1_tags: string[];
  issues: Issue[];
  seo_score: number;
  load_time: number;
}

export interface Issue {
  type: 'critical' | 'warning' | 'good_practice';
  category: string;
  message: string;
  recommendation?: string;
}

export interface ComparisonResult {
  id: string;
  baseline_snapshot_id: string;
  current_snapshot_id: string;
  changes: {
    improved_issues: Issue[];
    new_issues: Issue[];
    resolved_issues: Issue[];
    score_change: number;
  };
  created_at: string;
}

export interface CompetitiveAnalysis {
  primary_website: Website;
  competitors: Array<{
    website: Website;
    latest_snapshot: Snapshot;
    comparison_score: number;
  }>;
  summary: {
    ranking_position: number;
    better_than: number;
    worse_than: number;
    key_advantages: string[];
    improvement_areas: string[];
  };
}

export interface DashboardSummary {
  total_websites: number;
  total_snapshots: number;
  latest_scans: Snapshot[];
  critical_issues_count: number;
  avg_seo_score: number;
  recent_activity: Array<{
    type: 'scan_completed' | 'website_added' | 'comparison_made';
    message: string;
    timestamp: string;
  }>;
}

// Website Management API
export const websitesApi = {
  // List all websites
  async list(): Promise<Website[]> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.websites;
  },

  // Create new website
  async create(websiteData: {
    url: string;
    name: string;
    type: 'primary' | 'competitor';
  }): Promise<Website> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(websiteData)
    });
    const data = await handleApiResponse(response);
    return data.website;
  },

  // Get website details
  async get(websiteId: string): Promise<Website> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/${websiteId}`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.website;
  },

  // Update website
  async update(websiteId: string, updates: Partial<Website>): Promise<Website> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/${websiteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updates)
    });
    const data = await handleApiResponse(response);
    return data.website;
  },

  // Delete website
  async delete(websiteId: string): Promise<void> {
    await fetch(`${BASE_URL}/api/v2/websites/${websiteId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
  }
};

// Snapshot/Scan Management API
export const snapshotsApi = {
  // Create new snapshot
  async create(websiteId: string): Promise<Snapshot> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/snapshots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ website_id: websiteId })
    });
    const data = await handleApiResponse(response);
    return data.snapshot;
  },

  // List snapshots for website
  async listByWebsite(websiteId: string): Promise<Snapshot[]> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/${websiteId}/snapshots`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.snapshots;
  },

  // Get snapshot details with report
  async get(snapshotId: string): Promise<Snapshot> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/snapshots/${snapshotId}`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.snapshot;
  },

  // Get pages in snapshot
  async getPages(snapshotId: string): Promise<PageReport[]> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/snapshots/${snapshotId}/pages`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.pages;
  }
};

// Report & Comparison API
export const reportsApi = {
  // Compare two snapshots
  async compare(baselineSnapshotId: string, currentSnapshotId: string): Promise<ComparisonResult> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/compare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({
        baseline_snapshot_id: baselineSnapshotId,
        current_snapshot_id: currentSnapshotId
      })
    });
    const data = await handleApiResponse(response);
    return data.comparison;
  },

  // List comparisons for website
  async listComparisons(websiteId: string): Promise<ComparisonResult[]> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/${websiteId}/comparisons`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.comparisons;
  },

  // Get competitive analysis
  async getCompetitiveAnalysis(websiteId: string): Promise<CompetitiveAnalysis> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/${websiteId}/competitive-analysis`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.analysis;
  }
};

// Competitor Management API
export const competitorsApi = {
  // List all competitors
  async list(): Promise<Website[]> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/competitors`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.competitors;
  },

  // Add competitor
  async add(competitorData: {
    url: string;
    name: string;
  }): Promise<Website> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/competitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ ...competitorData, type: 'competitor' })
    });
    const data = await handleApiResponse(response);
    return data.competitor;
  }
};

// Dashboard & Analytics API
export const dashboardApi = {
  // Get dashboard summary
  async getSummary(): Promise<DashboardSummary> {
    const response = await fetch(`${BASE_URL}/api/v2/websites/dashboard/summary`, {
      headers: getAuthHeader()
    });
    const data = await handleApiResponse(response);
    return data.summary;
  }
};

// Main V2 API export
export const apiV2 = {
  websites: websitesApi,
  snapshots: snapshotsApi,
  reports: reportsApi,
  competitors: competitorsApi,
  dashboard: dashboardApi
}; 