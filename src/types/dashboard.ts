import { LucideIcon } from 'lucide-react';

export interface SubItem {
  id: string;
  label: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  subItems?: SubItem[];
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon: string;
}

export interface NavigationData {
  mainNavigation: NavigationItem[];
  userMenu: UserMenuItem[];
}

export interface DashboardData {
  userProfile: UserProfile;
  navigationData: NavigationData;
}

// types/dashboard.ts

export interface UserProfile {
  id?: string;
  email: string;
  name?: string;
  company?: string;
  role?: string;
  hasCompletedOnboarding: boolean;
  roles?: string[];
  website_url?: string;
}

export interface AnalysisState {
  status: string;
  websiteUrl?: string;
  pagesScanned?: number;
  totalPages?: number;
  currentStep?: string;
  estimatedTimeRemaining?: number;
  progressPercentage?: number;
  reportGenerated?: boolean;
  lastUpdated?: string;
  isComplete?: boolean;
}

export interface OverviewData {
  highlights: {
    total_score: number;
    accessibility_score: number;
    performance_score: number;
    seo_score: number;
    best_practices_score: number;
  };
  issues: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  recommendations: string[];
}