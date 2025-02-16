// components/layout/Header/Header.tsx
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react';
import { headerData } from "./data";

export const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigation, buttons } = headerData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-gray-900/90 backdrop-blur-md py-2 border-b border-gray-800" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Scope</span>
              <span className="text-indigo-400 font-medium hidden sm:inline">Labs</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link 
                key={item.text}
                href={item.href}
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={() => router.push(buttons.signin.href)} 
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {buttons.signin.text}
            </Button>
            <Button 
              onClick={() => router.push(buttons.signup.href)} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {buttons.signup.text}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-800 mt-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
                >
                  {item.text}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button 
                  onClick={() => router.push(buttons.signin.href)}
                  variant="ghost" 
                  className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  {buttons.signin.text}
                </Button>
                <Button 
                  onClick={() => router.push(buttons.signup.href)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {buttons.signup.text}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};