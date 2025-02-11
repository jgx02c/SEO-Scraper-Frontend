import React, { useState, useEffect, useRef } from "react";
import { Send, Settings, Plus, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectItem } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/router";

interface Message {
  role: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  lastUpdated: string;
}

interface SettingsResponse {
  data: {
    _id: string;
    model: string;
    temperature: number;
    presence_penalty: number;
    vectorStore: string;
    prompt: string;
    updatedAt: string;
  };
  timestamp: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Settings state without defaults
  const [openAiModel, setOpenAiModel] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
  const [presencePenalty, setPresencePenalty] = useState<number>(0);
  const [selectedVectorStore, setSelectedVectorStore] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  
  const [settingsError, setSettingsError] = useState(false);
  const [conversationsError, setConversationsError] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadConversations();
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setSettingsError(false);
      const response = await fetch("https://leaps-scraper.onrender.com/settings/get_settings");
      
      if (!response.ok) throw new Error('Failed to load settings');
      
      const settingsResponse: SettingsResponse = await response.json();
      const settings = settingsResponse.data;
      
      setOpenAiModel(settings.model);
      setTemperature(settings.temperature);
      setPresencePenalty(settings.presence_penalty);
      setSelectedVectorStore(settings.vectorStore);
      setPrompt(settings.prompt);
      setSettingsLoaded(true);
      
    } catch (error) {
      console.error("Error loading settings:", error);
      setSettingsError(true);
    }
  };

  const loadConversations = async () => {
    try {
      setConversationsError(false);
      const response = await fetch("https://leaps-scraper.onrender.com/conversations/get_conversations");
      if (!response.ok) throw new Error('Failed to load conversations');
      const data = await response.json();
      setConversations(data.data || []);
    } catch (error) {
      console.error("Error loading conversations:", error);
      setConversationsError(true);
      setConversations([]);
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

  const saveConversation = async (conversationId: string, messages: Message[]) => {
    try {
      const response = await fetch("https://leaps-scraper.onrender.com/conversations/save_conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          messages
        }),
      });
      
      if (!response.ok) throw new Error('Failed to save conversation');
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  const saveSettings = async () => {
    try {
      const response = await fetch("https://leaps-scraper.onrender.com/settings/save_settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: openAiModel,
          temperature,
          presence_penalty: presencePenalty,
          vectorStore: selectedVectorStore,
          prompt,
        }),
      });

      if (!response.ok) throw new Error('Failed to save settings');
      setSettingsOpen(false);
      await loadSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toISOString();
    const newMessage: Message = { 
      role: "user", 
      text: input,
      timestamp 
    };

    let convId = currentConversationId;
    if (!convId) {
      convId = await createNewConversation();
    }

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://leaps-scraper.onrender.com/insights/generate_insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          vector_store: selectedVectorStore,
          model: openAiModel,
          temperature: temperature,
          presence_penalty: presencePenalty,
          system_prompt: prompt
        }),
      });

      if (!response.ok) throw new Error('Failed to generate insight');

      const responseData = await response.json();
      const botMessage: Message = {
        role: "bot",
        text: responseData.data,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      const updatedConversations = conversations.map(conv => {
        if (conv.id === convId) {
          return {
            ...conv,
            messages: finalMessages,
            lastUpdated: new Date().toISOString(),
            title: input.slice(0, 30) + "..."
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      await saveConversation(convId, finalMessages);

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (conversationId: string) => {
    try {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        setMessages(conversation.messages);
        setCurrentConversationId(conversationId);
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!settingsLoaded && !settingsError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-white">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-900 p-4">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 mr-4 rounded-lg flex flex-col">
        <div className="p-4 border-b border-gray-700 space-y-2">
          <Button 
            className="w-full bg-blue-600 text-white flex items-center justify-center gap-2"
            onClick={createNewConversation}
          >
            <Plus size={18} />
            New Chat
          </Button>
          {conversationsError && (
            <Alert variant="destructive" className="bg-red-900 border-red-800">
              <AlertDescription className="flex items-center justify-between">
                Failed to load chats
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadConversations}
                  className="ml-2"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
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
      <Card className="flex-1 bg-gray-800 shadow-lg flex flex-col">
        <CardContent className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between mb-4 flex-shrink-0">
            <Button className="bg-blue-600 text-white" onClick={() => router.push("/business")}>
              View Businesses
            </Button>
            <h1 className="text-2xl font-bold text-white">Leaps AI ChatBot V.1.0</h1>
            <Button className="bg-gray-600 text-white" onClick={() => setSettingsOpen(true)}>
              <Settings size={18} />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="flex-grow overflow-hidden flex flex-col min-h-0">
            <div className="flex-grow overflow-y-auto space-y-4 bg-gray-900 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[75%] rounded-lg p-3 ${
                    msg.role === "user" ? "ml-auto bg-blue-600 text-right text-white" : "mr-auto bg-gray-700 text-white"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className="text-xs opacity-50 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mr-auto rounded-lg bg-gray-700 p-3 text-white">
                  AI is thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Container */}
          <div className="flex gap-2 mt-4 flex-shrink-0">
            <Input
              className="flex-grow bg-gray-700 text-white placeholder-gray-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-blue-600 text-white hover:bg-blue-700">
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-gray-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-6">
            {/* Left Column - Controls */}
            <div className="w-1/2 space-y-4">
              <div className="space-y-2">
                <label>Model</label>
                <Select value={openAiModel} onValueChange={setOpenAiModel}>
                  <SelectItem value="gpt-4o-2024-08-06">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4-turbo-2024-04-09">GPT-4-Turbo</SelectItem>
                  <SelectItem value="gpt-4o-mini-2024-07-18">gpt-4o-mini</SelectItem>
                  <SelectItem value="o1-mini-2024-09-12">o1-mini</SelectItem>
                  <SelectItem value="o1-preview-2024-09-12">o1-preview</SelectItem>
                </Select>
              </div>

              <div className="space-y-2">
                <label>Temperature: {temperature}</label>
                <Slider 
                  value={temperature}
                  onValueChange={value => setTemperature(value)}
                  min={0} 
                  max={1} 
                  step={0.1} 
                />
              </div>

              <div className="space-y-2">
                <label>Presence Penalty: {presencePenalty}</label>
                <Slider 
                  value={presencePenalty}
                  onValueChange={value => setPresencePenalty(value)}
                  min={0} 
                  max={1} 
                  step={0.1} 
                />
              </div>

              <div className="space-y-2">
                <label>Vector Store</label>
                <Select value={selectedVectorStore} onValueChange={setSelectedVectorStore}>
                  <SelectItem value="leaps">Leaps</SelectItem>
                </Select>
              </div>

              <Button onClick={saveSettings} className="w-full bg-blue-600">
                Save Settings
              </Button>
            </div>

            {/* Right Column - System Prompt */}
            <div className="w-1/2 space-y-2">
              <label>System Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-[400px] min-h-[200px] bg-gray-700 rounded p-2 resize"
                style={{ resize: 'both' }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBot;