import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu, X, ChevronDown, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { headerData } from './data';

interface DropdownItem {
  text: string;
  href: string;
}

interface DropdownMenuProps {
  items: DropdownItem[] | undefined;
  isOpen: boolean;
}

interface NavigationItem {
  text: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isOpen }) => {
  if (!items || !isOpen) return null;
  
  return (
    <div className="absolute top-full left-0 w-48 py-2 mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
      {items.map((item) => (
        <Link
          key={item.text}
          href={item.href}
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
};

export const Header: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { navigation, buttons } = headerData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (itemText: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      setOpenDropdown(itemText);
    }
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-gray-900/90 backdrop-blur-md py-2 border-b border-gray-800" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">Scope</span>
              <span className="text-indigo-400 font-medium hidden sm:inline">Labs</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item: NavigationItem) => (
              <div 
                key={item.text} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.text, !!item.dropdownItems)}
                onMouseLeave={handleMouseLeave}
              >
                {item.dropdownItems ? (
                  <div className="relative">
                    <div className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer">
                      <span>{item.text}</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    <DropdownMenu
                      items={item.dropdownItems}
                      isOpen={openDropdown === item.text}
                    />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors block"
                  >
                    {item.text}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href={buttons.signin.href}>
              <Button 
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                {buttons.signin.text}
              </Button>
            </Link>
            <Link href={buttons.signup.href}>
              <Button 
                variant="purple"
              >
                {buttons.signup.text}
              </Button>
            </Link>
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
              {navigation.map((item: NavigationItem) => (
                <div key={item.text}>
                  {item.dropdownItems ? (
                    <>
                      <div
                        onClick={() => setOpenDropdown(openDropdown === item.text ? null : item.text)}
                        className="w-full text-left flex items-center justify-between text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{item.text}</span>
                        <ChevronDown className={`w-4 h-4 transform transition-transform ${
                          openDropdown === item.text ? 'rotate-180' : ''
                        }`} />
                      </div>
                      {openDropdown === item.text && (
                        <div className="pl-4 space-y-1 mt-1">
                          {item.dropdownItems.map((subItem) => (
                            <Link
                              key={subItem.text}
                              href={subItem.href}
                              className="block text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
                            >
                              {subItem.text}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
                    >
                      {item.text}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link href={buttons.signin.href} className="block w-full">
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    {buttons.signin.text}
                  </Button>
                </Link>
                <Link href={buttons.signup.href} className="block w-full">
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-600 text-white"
                  >
                    {buttons.signup.text}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};