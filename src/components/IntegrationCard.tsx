import React, { useState } from 'react';
import { Bot, Zap, ArrowRight, Check, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const platforms = [
  {
    name: 'Shopify',
    category: 'E-commerce',
    icon: '/platform-icons/shopify.svg',
    color: 'from-green-400 to-green-600',
    features: [
      'Product page optimization',
      'Collection page SEO',
      'Store navigation enhancement',
      'Meta tag automation'
    ]
  },
  {
    name: 'WordPress',
    category: 'CMS',
    icon: '/platform-icons/wordpress.svg',
    color: 'from-blue-400 to-blue-600',
    features: [
      'Content optimization',
      'Plugin compatibility',
      'Theme optimization',
      'Media optimization'
    ]
  },
  {
    name: 'Wix',
    category: 'Website Builder',
    icon: '/platform-icons/wix.svg',
    color: 'from-purple-400 to-purple-600',
    features: [
      'Page builder optimization',
      'Dynamic content SEO',
      'Site structure analysis',
      'Mobile optimization'
    ]
  },
  {
    name: 'Squarespace',
    category: 'Website Builder',
    icon: '/platform-icons/squarespace.svg',
    color: 'from-orange-400 to-orange-600',
    features: [
      'Template optimization',
      'Gallery SEO',
      'Blog optimization',
      'E-commerce enhancement'
    ]
  }
];

export const IntegrationCard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
            <Code className="w-4 h-4" />
            <span>Platform Integration</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Seamlessly Integrates With Your Platform
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI agents work with your existing website platform, providing deep integration and optimization without any platform migration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Selector */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <h3 className="text-white text-lg font-semibold mb-6">Supported Platforms</h3>
              
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPlatform.name === platform.name ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${platform.color} opacity-5`} />
                    <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                          <Globe className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{platform.name}</h4>
                          <p className="text-gray-400 text-sm">{platform.category}</p>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 ${
                        selectedPlatform.name === platform.name ? 'text-indigo-400' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integration Details */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white text-lg font-semibold">{selectedPlatform.name} Integration</h3>
                  <p className="text-gray-400 text-sm mt-1">Automated optimization for your platform</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-green-400 text-sm">Compatible</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Features List */}
                <div className="relative p-4 rounded-lg">
                  <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                  <div className="relative">
                    <h4 className="text-white font-medium mb-4">Optimization Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedPlatform.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Integration Steps */}
                <div className="relative p-4 rounded-lg">
                  <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                  <div className="relative">
                    <h4 className="text-white font-medium mb-4">Integration Process</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-indigo-400 text-sm">1</span>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">Connect your {selectedPlatform.name} website</p>
                          <p className="text-gray-500 text-sm">Simple one-click authorization</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-indigo-400 text-sm">2</span>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">AI analyzes your website structure</p>
                          <p className="text-gray-500 text-sm">Deep scanning of your content and setup</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-indigo-400 text-sm">3</span>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">Optimization begins automatically</p>
                          <p className="text-gray-500 text-sm">AI starts improving your site immediately</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 inline-flex items-center justify-center">
                  <Bot className="w-4 h-4 mr-2" />
                  Start Integration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationCard;