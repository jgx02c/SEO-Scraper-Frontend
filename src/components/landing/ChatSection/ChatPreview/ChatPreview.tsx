import React, { useState } from 'react';
import { MessageSquare, Bot, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Message, sampleMessages } from '../data';

export const ChatPreview = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Explicitly type the user message
    const userMessage: Message = {
      type: 'user', 
      message: input 
    };

    // Add user message
    const newMessages: Message[] = [
      ...messages,
      userMessage
    ];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        type: 'bot',
        message: "I'd be happy to help analyze that for you. Would you like me to provide specific recommendations?"
      };
      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      {/* Chat Header */}
      <div className="border-b border-gray-700 p-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          AI Health Assistant
        </h3>
      </div>
      
      {/* Chat Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
            {msg.type === 'bot' && (
              <Bot className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            )}
            <div className={`rounded-lg p-3 text-sm max-w-[80%] ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-200'
            }`}>
              {msg.message}
            </div>
            {msg.type === 'user' && (
              <MessageSquare className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your website's health..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          />
          <Button type="submit" size="icon" className="bg-blue-600 p-2 rounded-lg text-white h-10 w-10">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPreview;