import React from 'react';
import { ChatPreview } from './ChatPreview';
import { chatData } from './data';
import { LucideIcon } from 'lucide-react';

export const ChatSection = () => {
  const { title, description, features } = chatData;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              {title}
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg">
                {description}
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon as LucideIcon;
                  return (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <h3 className="text-white font-medium">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Column - Chat Preview */}
          <div className="relative">
            {/* Blue glow effect */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            {/* Chat interface */}
            <div className="relative z-10">
              <ChatPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;