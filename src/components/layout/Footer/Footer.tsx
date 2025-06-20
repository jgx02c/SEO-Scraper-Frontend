// components/layout/Footer/Footer.tsx
import { Activity } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Activity className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Scope</span>
          <span className="text-blue-600 font-medium">Labs</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Professional SEO analysis tools for better website performance.
        </p>
        
        {/* Copyright */}
        <div className="text-gray-500 text-sm">
          © 2025 Scope Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};