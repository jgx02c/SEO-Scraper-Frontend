import React, { useState } from 'react';
import { Bot, ArrowRight, Check, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const platforms = [
  {
    name: 'Shopify',
    category: 'E-commerce',
    color: 'from-green-400 to-green-600',
    primaryFeature: 'Store Optimization',
    integrationTime: '2 min setup'
  },
  {
    name: 'WordPress',
    category: 'CMS',
    color: 'from-blue-400 to-blue-600',
    primaryFeature: 'Content Optimization',
    integrationTime: '1 min setup'
  },
  {
    name: 'Wix',
    category: 'Website Builder',
    color: 'from-purple-400 to-purple-600',
    primaryFeature: 'Site Builder Optimization',
    integrationTime: '2 min setup'
  },
  {
    name: 'Squarespace',
    category: 'Website Builder',
    color: 'from-orange-400 to-orange-600',
    primaryFeature: 'Template Optimization',
    integrationTime: '1 min setup'
  }
];

export const IntegrationCard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-6">
              <Code className="w-4 h-4 mr-2" />
              <span>Seamless Integration</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              One-Click Platform
              <br />
              Integration
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Connect your website in seconds, not hours. Our AI agents automatically 
              detect your platform and configure the optimal settings for your specific setup.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Zero Configuration Required</h3>
                  <p className="text-gray-400">Our AI automatically detects and configures optimal settings for your platform</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Instant Setup</h3>
                  <p className="text-gray-400">Get up and running in under 2 minutes with our guided integration process</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Platform-Specific Optimization</h3>
                  <p className="text-gray-400">Custom-tailored SEO strategies for your specific platform and setup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="relative group"
                  onMouseEnter={() => setIsHovering(platform.name)}
                  onMouseLeave={() => setIsHovering(null)}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className={`
                    relative overflow-hidden rounded-xl h-48 cursor-pointer
                    transition-all duration-300
                    ${selectedPlatform.name === platform.name ? 'ring-2 ring-indigo-500 scale-105' : ''}
                  `}>
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-5`} />
                    <div className="absolute inset-0 border border-gray-700/50" />
                    
                    <div className="relative p-6 h-full flex flex-col">
                      <div className={`
                        w-12 h-12 rounded-xl bg-gray-800 
                        flex items-center justify-center
                        transition-transform duration-300
                        ${isHovering === platform.name ? 'scale-110' : ''}
                      `}>
                        <Globe className={`
                          w-6 h-6 transition-colors duration-300
                          ${selectedPlatform.name === platform.name ? 'text-indigo-400' : 'text-gray-400'}
                        `} />
                      </div>

                      <div className="mt-auto">
                        <h3 className="text-white font-semibold text-lg mb-1">{platform.name}</h3>
                        <p className="text-gray-400 text-sm">{platform.primaryFeature}</p>
                        
                        <div className={`
                          flex items-center mt-3 transition-all duration-300
                          ${isHovering === platform.name ? 'opacity-100' : 'opacity-0'}
                        `}>
                          <div className="flex items-center space-x-2 text-green-400 text-sm">
                            <Check className="w-4 h-4" />
                            <span>{platform.integrationTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`
                        absolute top-6 right-6
                        transition-all duration-300
                        ${isHovering === platform.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                      `}>
                        <ArrowRight className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Integration Status */}
            <div className="relative overflow-hidden rounded-xl p-8">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedPlatform.color} opacity-5`} />
              <div className="absolute inset-0 border border-gray-700/50" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedPlatform.color} p-0.5`}>
                    <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPlatform.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      <span className="text-green-400 text-sm">Ready to Connect</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-500 inline-flex items-center justify-center"
                  size="lg"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Connect {selectedPlatform.name}
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