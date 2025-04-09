import React, { useState, useEffect } from 'react';
import { Bot, Rocket, BrainCog, Sparkles, MessageSquare, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const agentTypes = [
  {
    id: 'seo',
    name: 'SEO Agent',
    icon: Rocket,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    id: 'content',
    name: 'Content Agent',
    icon: MessageSquare,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  {
    id: 'technical',
    name: 'Technical Agent',
    icon: BrainCog,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  }
];

const sampleChat = [
  {
    agent: 'seo',
    message: "I've detected a 15% increase in organic traffic opportunities.",
    time: "2m ago"
  },
  {
    agent: 'content',
    message: "Your latest blog post is gaining traction. Suggested next steps ready.",
    time: "5m ago"
  },
  {
    agent: 'technical',
    message: "Page load speed improved by 22% after recent updates.",
    time: "12m ago"
  }
];

export const ChatSection = () => {
  const [activeAgent, setActiveAgent] = useState(agentTypes[0].id);
  const [chatMessages, setChatMessages] = useState(sampleChat);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatMessages(prev => {
        const newMessages = [...prev];
        const randomAgent = agentTypes[Math.floor(Math.random() * agentTypes.length)].id;
        const updates = [
          "New keyword opportunities detected.",
          "Competitor content analysis ready.",
          "Performance optimization completed."
        ];
        newMessages.unshift({
          agent: randomAgent,
          message: updates[Math.floor(Math.random() * updates.length)],
          time: "Just now"
        });
        return newMessages.slice(0, 3);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-6">
              <Bot className="w-4 h-4 mr-2" />
              <span>AI Communication</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              Your Personal
              <br />
              AI Strategy Team
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Connect with specialized AI agents that actively monitor, analyze, and optimize 
              your website. Get real-time insights and improvements.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Real-Time Insights</h3>
                  <p className="text-gray-400">Direct communication with AI agents</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Automated Optimization</h3>
                  <p className="text-gray-400">Continuous improvements and updates</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Specialized Agents</h3>
                  <p className="text-gray-400">Expert focus on key areas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Chat Interface */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold">AI Strategy Hub</h3>
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              {/* Agent Selection */}
              <div className="flex gap-2 mb-4">
                {agentTypes.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <button
                      key={agent.id}
                      className={`flex-1 relative p-2 rounded-lg transition-all duration-200 ${
                        activeAgent === agent.id ? 'ring-2 ring-indigo-500' : ''
                      }`}
                      onClick={() => setActiveAgent(agent.id)}
                    >
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className={`absolute inset-0 rounded-lg ${agent.bgColor} opacity-10`} />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                      <div className="relative flex items-center justify-center space-x-2">
                        <Icon className={`w-5 h-5 ${agent.color}`} />
                        <span className="text-white text-sm">{agent.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chat Messages */}
              <div className="space-y-3">
                {chatMessages.map((message, index) => {
                  const agent = agentTypes.find(a => a.id === message.agent)!;
                  const Icon = agent.icon;
                  return (
                    <div key={index} className="relative p-3 rounded-lg transition-all duration-200">
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className={`absolute inset-0 rounded-lg ${agent.bgColor} opacity-5`} />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                      <div className="relative flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${agent.bgColor}`}>
                          <Icon className={`w-4 h-4 ${agent.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-300 text-sm">{message.message}</p>
                          <span className="text-gray-500 text-xs">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="relative mt-4">
                <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                <div className="relative p-2 flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Ask your AI team..."
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none text-sm"
                  />
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500">
                    <Bot className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;