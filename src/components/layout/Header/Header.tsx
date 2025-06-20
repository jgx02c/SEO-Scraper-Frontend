import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-gray-900/80 backdrop-blur-md py-2 border-b border-gray-700/50" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold text-white">Scope</span>
            <span className="text-indigo-400 font-medium">Labs</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};