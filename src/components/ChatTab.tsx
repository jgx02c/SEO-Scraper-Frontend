// components/tabs/ChatTab.tsx
import { useState, useEffect, useRef } from "react";
import { Send, Settings, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectItem } from "@/components/ui/select";
import { chatApi } from "@/services/chatApi";
import { Message, Conversation, ChatSettings } from "@/types";

export const ChatTab = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    model: "",
    temperature: 0,
    presence_penalty: 0,
    vectorStore: "",
    prompt: ""
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadConversations();
    loadSettings();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadSettings = async () => {
    try {
      const settingsData = await chatApi.getSettings();
      setSettings(settingsData);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const loadConversations = async () => {
    try {
      const conversationsData = await chatApi.getConversations();
      setConversations(conversationsData);
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };

  const createNewConversation = async () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversation.id);
    setMessages([]);
    return newConversation.id;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      text: input,
      timestamp: new Date().toISOString()
    };

    let convId = currentConversationId;
    if (!convId) {
      convId = await createNewConversation();
    }

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatApi.generateInsight(input, settings);

      const botMessage: Message = {
        role: "bot",
        text: response,
        timestamp: new Date().toISOString()
      };

      const updatedMessages = [...messages, newMessage, botMessage];
      setMessages(updatedMessages);

      // Update conversation
      const updatedConversations = conversations.map(conv => {
        if (conv.id === convId) {
          return {
            ...conv,
            messages: updatedMessages,
            lastUpdated: new Date().toISOString(),
            title: input.slice(0, 30) + "..."
          };
        }
        return conv;
      });
      setConversations(updatedConversations);

      // Save conversation
      await chatApi.saveConversation(convId, updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setMessages(conversation.messages);
      setCurrentConversationId(conversationId);
    }
  };

  const saveSettings = async () => {
    try {
      await chatApi.saveSettings(settings);
      setSettingsOpen(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 mr-4 rounded-lg flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <Button 
            className="w-full bg-blue-600 text-white flex items-center justify-center gap-2"
            onClick={createNewConversation}
          >
            <Plus size={18} />
            New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 cursor-pointer hover:bg-gray-700 ${
                currentConversationId === conversation.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => loadConversation(conversation.id)}
            >
              <div className="text-white truncate">{conversation.title}</div>
              <div className="text-gray-400 text-sm">
                {new Date(conversation.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-gray-800 rounded-lg flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Leaps AI ChatBot</h2>
          <Button onClick={() => setSettingsOpen(true)} className="bg-gray-700">
            <Settings size={18} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] ${
                msg.role === "user" 
                  ? "ml-auto bg-blue-600 text-white" 
                  : "mr-auto bg-gray-700 text-white"
              } rounded-lg p-3`}
            >
              <div>{msg.text}</div>
              <div className="text-xs opacity-50 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-gray-700 text-white rounded-lg p-3">
              AI is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <Input
              className="flex-1 bg-gray-700 text-white"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-blue-600">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label>Model</label>
              <Select 
                value={settings.model} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, model: value }))}
              >
                <SelectItem value="gpt-4o-2024-08-06">GPT-4o</SelectItem>
                <SelectItem value="gpt-4-turbo-2024-04-09">GPT-4-Turbo</SelectItem>
                <SelectItem value="gpt-4o-mini-2024-07-18">gpt-4o-mini</SelectItem>
                <SelectItem value="o1-mini-2024-09-12">o1-mini</SelectItem>
                <SelectItem value="o1-preview-2024-09-12">o1-preview</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label>Temperature: {settings.temperature}</label>
              <Slider 
                value={[settings.temperature]}
                onValueChange={([value]) => setSettings(prev => ({ ...prev, temperature: value }))}
                min={0} 
                max={1} 
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <label>Vector Store</label>
              <Select 
                value={settings.vectorStore}
                onValueChange={(value) => setSettings(prev => ({ ...prev, vectorStore: value }))}
              >
                <SelectItem value="leaps">Leaps</SelectItem>
                <SelectItem value="leapsjson">Leaps Json</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label>System Prompt</label>
              <textarea 
                value={settings.prompt}
                onChange={(e) => setSettings(prev => ({ ...prev, prompt: e.target.value }))}
                className="w-full h-32 bg-gray-700 rounded p-2"
              />
            </div>

            <Button onClick={saveSettings} className="w-full bg-blue-600">
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};