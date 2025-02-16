// components/layout/Footer/Footer.tsx
import Link from "next/link";
import { footerData } from "./data";

export const Footer = () => {
  const { company, resources, legal, social } = footerData;

  return (
    <footer className="bg-gray-900 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.text}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.text}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.text}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@scopelabs.ai" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  contact@scopelabs.ai
                </a>
              </li>
              <li>
                <a href="https://scopelabs.ai" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  scopelabs.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Scope Labs. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};