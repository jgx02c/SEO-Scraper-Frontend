import type { LucideIcon } from 'lucide-react';
import { 
  LayoutDashboard, 
  LineChart, 
  BarChart2, 
  FileText, 
  Folder, 
  Radio, 
  Search, 
  Cpu, 
  MessageSquare,
  User,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

export interface SubItem {
  id: string;
  label: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  subItems?: SubItem[];
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  role: string;
}

export const dummyUserProfile: UserProfile = {
  id: "1",
  name: "John Doe",
  email: "john@scopelabs.com",
  company: "Scope Labs",
  role: "Admin"
};

export const navigationData: {
  mainNavigation: NavigationItem[];
  userMenu: UserMenuItem[];
} = {
  mainNavigation: [
    { 
      id: "overview", 
      label: "Overview", 
      icon: LayoutDashboard 
    },
    {
      id: "traffic",
      label: "Traffic",
      icon: LineChart,
      subItems: [
        { id: "website-traffic", label: "Website Traffic" },
        { id: "social-traffic", label: "Social Media Traffic" },
        { id: "ads-performance", label: "Ads Performance" }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart2,
      subItems: [
        { id: "seo-performance", label: "SEO Performance" },
        { id: "user-behavior", label: "User Behavior" },
        { id: "historical-data", label: "Historical Data" }
      ]
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      subItems: [
        { id: "seo-reports", label: "SEO Reports" },
        { id: "traffic-reports", label: "Traffic Reports" },
        { id: "competitor-reports", label: "Competitor Reports" },
        { id: "ads-reports", label: "Ads Reports" }
      ]
    },
    {
      id: "files",
      label: "Files",
      icon: Folder,
      subItems: [
        { id: "scraped-webpages", label: "Scraped Webpages" },
        { id: "reports-documents", label: "Reports & Documents" },
        { id: "competitor-data", label: "Competitor Data" }
      ]
    },
    {
      id: "ads",
      label: "Ads",
      icon: Radio,
      subItems: [
        { id: "my-ads", label: "My Ads" },
        { id: "competitor-ads", label: "Competitor Ads" }
      ]
    },
    { 
      id: "competitor", 
      label: "Competitor Lookup", 
      icon: Search 
    },
    {
      id: "ai",
      label: "AI & Automation",
      icon: Cpu,
      subItems: [
        { id: "ai-fixes", label: "AI Fixes" },
        { id: "alerts-monitoring", label: "Alerts & Monitoring" },
        { id: "ai-content", label: "AI Content Generation" }
      ]
    },
    { 
      id: "chat", 
      label: "Chatbot", 
      icon: MessageSquare 
    }
  ],
  userMenu: [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "logout", label: "Sign Out", icon: LogOut }
  ]
};