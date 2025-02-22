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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
}

export interface NavigationData {
  mainNavigation: NavigationItem[];
  userMenu: UserMenuItem[];
}

export interface DashboardData {
  userProfile: UserProfile;
  navigationData: NavigationData;
}