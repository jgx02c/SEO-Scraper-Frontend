import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, WifiOff } from "lucide-react";
import { ComponentLoader } from "@/components/dashboard/shared/ComponentLoader";
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
import { api } from '@/api/dashboard-api';
import type { UserProfile } from '@/types/auth';

// Navigation data - could be moved to a separate file
const navigationData = {
  mainNavigation: [
    { id: "overview", label: "Overview", icon: "LayoutDashboard" },
    {
      id: "websites",
      label: "Websites",
      icon: "Radio",
      subItems: [
        { id: "website-list", label: "All Websites" },
        { id: "add-website", label: "Add Website" },
        { id: "website-management", label: "Manage Websites" }
      ]
    },
    {
      id: "scans",
      label: "Scans & Reports",
      icon: "Search",
      subItems: [
        { id: "scan-dashboard", label: "Scan Dashboard" },
        { id: "create-scan", label: "New Scan" },
        { id: "scan-history", label: "Scan History" },
        { id: "reports", label: "SEO Reports" }
      ]
    },
    {
      id: "competitor-lookup",
      label: "Competitor Analysis",
      icon: "BarChart2",
      subItems: [
        { id: "competitor-grid", label: "Competitor Overview" },
        { id: "competitor-details", label: "Detailed Analysis" },
        { id: "competitive-comparison", label: "Competitive Comparison" }
      ]
    },
    {
      id: "files",
      label: "Files & Data",
      icon: "Folder",
      subItems: [
        { id: "scraped-webpages", label: "Scraped Webpages" },
        { id: "competitor-data", label: "Competitor Data" },
        { id: "reports-documents", label: "Reports & Documents" }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "LineChart",
      subItems: [
        { id: "seo-performance", label: "SEO Performance" },
        { id: "user-behavior", label: "User Behavior" },
        { id: "historical-data", label: "Historical Data" }
      ]
    },
    {
      id: "traffic",
      label: "Traffic",
      icon: "Radio",
      subItems: [
        { id: "website-traffic", label: "Website Traffic" },
        { id: "social-traffic", label: "Social Media Traffic" },
        { id: "ads-performance", label: "Ads Performance" }
      ]
    },
    {
      id: "ads",
      label: "Advertisements",
      icon: "FileText",
      subItems: [
        { id: "my-ads", label: "My Ads" },
        { id: "competitor-ads", label: "Competitor Ads" }
      ]
    },
    {
      id: "ai",
      label: "AI Tools",
      icon: "Cpu",
      subItems: [
        { id: "ai-content-generation", label: "Content Generation" },
        { id: "ai-fixes", label: "AI Fixes" },
        { id: "alerts-monitoring", label: "Alerts & Monitoring" }
      ]
    },
    {
      id: "chat",
      label: "AI Assistant",
      icon: "MessageSquare"
    }
  ],
  userMenu: [
    { id: "profile", label: "Profile Settings", icon: "User" },
    { id: "billing", label: "Billing", icon: "CreditCard" },
    { id: "settings", label: "Account Settings", icon: "Settings" },
    { id: "help", label: "Help & Support", icon: "HelpCircle" },
    { id: "logout", label: "Sign Out", icon: "LogOut" }
  ]
};

const iconComponents = {
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
};

const InitialLoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-400 mx-auto" />
      <p className="text-gray-400">Loading dashboard...</p>
    </div>
  </div>
);

const AuthErrorFallback = ({ onRetry }: { onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 flex items-center justify-center">
    <div className="text-center space-y-4 max-w-md">
      <WifiOff className="h-12 w-12 text-red-400 mx-auto" />
      <h2 className="text-xl font-semibold text-white">Connection Issue</h2>
      <p className="text-gray-400">Unable to connect to the dashboard. Please check your connection and try again.</p>
      <Button onClick={onRetry} className="bg-indigo-600 hover:bg-indigo-700">
        Retry Connection
      </Button>
    </div>
  </div>
);

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [authError, setAuthError] = useState(false);

  const initializeDashboard = async () => {
    try {
      setIsInitializing(true);
      setAuthError(false);
      
      const { isAuthenticated, profile } = await api.checkAuth();
      
      if (!isAuthenticated) {
        router.push('/signin');
        return;
      }

      setUserProfile(profile!);
    } catch (error) {
      console.error('Dashboard initialization error:', error);
      setAuthError(true);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    initializeDashboard();
  }, [router]);

  const handleNavigation = (id: string, subItem?: string) => {
    setActiveTab(id);
    setActiveSubItem(subItem || null);
  };

  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/signin');
  };

  const handleRetryAuth = () => {
    initializeDashboard();
  };

  // Show loading only during initial auth check
  if (isInitializing) {
    return <InitialLoadingSkeleton />;
  }

  // Show auth error fallback
  if (authError) {
    return <AuthErrorFallback onRetry={handleRetryAuth} />;
  }

  // If no user profile, redirect to signin
  if (!userProfile) {
    router.push('/signin');
    return <InitialLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="px-6 py-4 flex justify-between items-center max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-bold text-white">Scope</span>
            <span className="text-indigo-400 font-medium">Labs</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">
              {userProfile.company}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full p-0 hover:bg-gray-800"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-full w-full rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {userProfile.name?.charAt(0) || userProfile.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-1 bg-gray-800 border-gray-700 text-gray-300">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">
                    {userProfile.name || userProfile.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-400">{userProfile.email || ''}</p>
                </div>
                {navigationData.userMenu.map((item) => {
                  const MenuIcon = iconComponents[item.icon as keyof typeof iconComponents];
                  return (
                    <DropdownMenuItem 
                      key={item.id}
                      className="px-4 py-2 text-sm hover:bg-gray-700/50 cursor-pointer"
                      onClick={item.id === 'logout' ? handleLogout : undefined}
                    >
                      <MenuIcon className="mr-2 h-4 w-4" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Side Navigation */}
        <nav className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur-xl py-6 px-3 space-y-1">
          {navigationData.mainNavigation.map((item) => {
            const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                    ${activeTab === item.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
                {item.subItems && activeTab === item.id && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavigation(item.id, subItem.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm
                          ${activeSubItem === subItem.id
                            ? 'text-indigo-400 bg-indigo-600/10'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
                        `}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
            <CardContent className="p-6">
              <ComponentLoader 
                activeTab={activeTab} 
                activeSubItem={activeSubItem}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;