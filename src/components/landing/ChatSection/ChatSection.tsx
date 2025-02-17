import React, { useState, useEffect } from 'react';
import { Bot, Rocket, BrainCog, Sparkles, MessageSquare, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const agentTypes = [
  {
    id: 'seo',
    name: 'SEO Agent',
    icon: Rocket,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    description: 'Monitors and optimizes your search engine performance'
  },
  {
    id: 'content',
    name: 'Content Agent',
    icon: MessageSquare,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    description: 'Analyzes and enhances your content strategy'
  },
  {
    id: 'technical',
    name: 'Technical Agent',
    icon: BrainCog,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    description: 'Monitors website health and performance'
  }
];

const sampleChat = [
  {
    agent: 'seo',
    message: "I've detected a 15% increase in organic traffic opportunities. Would you like me to analyze the top-performing keywords?",
    time: "2 mins ago"
  },
  {
    agent: 'content',
    message: "Your latest blog post about AI integration is gaining traction. I suggest creating a follow-up piece about implementation strategies.",
    time: "5 mins ago"
  },
  {
    agent: 'technical',
    message: "Page load speed has improved by 22% after our recent optimizations. There are 3 more opportunities to enhance performance.",
    time: "12 mins ago"
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
          "I've identified new keyword opportunities in your market.",
          "Your competitor just published new content. Would you like an analysis?",
          "Mobile performance has improved by 8% after recent updates."
        ];
        newMessages.unshift({
          agent: randomAgent,
          message: updates[Math.floor(Math.random() * updates.length)],
          time: "Just now"
        });
        return newMessages.slice(0, 5);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
            <Bot className="w-4 h-4" />
            <span>AI Communication</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your AI Team Chat Hub
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay connected with your AI agents as they monitor, analyze, and optimize your website in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Selection */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <h3 className="text-white text-lg font-semibold mb-6">AI Agents</h3>
              
              <div className="space-y-4">
                {agentTypes.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <div
                      key={agent.id}
                      className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeAgent === agent.id ? 'ring-2 ring-indigo-500' : ''
                      }`}
                      onClick={() => setActiveAgent(agent.id)}
                    >
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className={`absolute inset-0 rounded-lg ${agent.bgColor} opacity-10`} />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                      <div className="relative flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${agent.bgColor}`}>
                          <Icon className={`w-5 h-5 ${agent.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{agent.name}</h4>
                          <p className="text-gray-400 text-sm">{agent.description}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 ${
                          activeAgent === agent.id ? agent.color : 'text-gray-600'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 inline-flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Deploy New Agent
                </Button>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Live Updates</h3>
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>

              <div className="space-y-4">
                {chatMessages.map((message, index) => {
                  const agent = agentTypes.find(a => a.id === message.agent)!;
                  const Icon = agent.icon;
                  return (
                    <div key={index} className="relative p-4 rounded-lg transition-all duration-200">
                      <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                      <div className={`absolute inset-0 rounded-lg ${agent.bgColor} opacity-5`} />
                      <div className="absolute inset-0 rounded-lg border border-gray-700/30" />
                      <div className="relative flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${agent.bgColor}`}>
                          <Icon className={`w-5 h-5 ${agent.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">{agent.name}</h4>
                            <span className="text-gray-500 text-sm">{message.time}</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;