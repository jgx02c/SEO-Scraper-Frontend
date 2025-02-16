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
import { NavigationItem, UserMenuItem, UserProfile } from './types';

// Dummy data (you might want to move this to a separate JSON file later)
const navigationData = {
  userProfile: {
    id: "1",
    name: "John Doe",
    email: "john@scopelabs.com",
    company: "Scope Labs",
    role: "Admin"
  },
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

export const parseNavigationData = () => {
  return {
    mainNavigation: navigationData.mainNavigation,
    userMenu: navigationData.userMenu
  };
};

export const dummyUserProfile = navigationData.userProfile;

// Suppress Next.js page warning by exporting a dummy component
export default function DummyComponent() {
  return null;
}