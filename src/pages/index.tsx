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

// Enhanced interfaces for type safety
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

const ChatBot = () => {
  // Existing state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openAiModel, setOpenAiModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  const [vectorStores, setVectorStores] = useState<string[]>([]);
  const [selectedVectorStore, setSelectedVectorStore] = useState("leaps");
  const [prompt, setPrompt] = useState("Default prompt");
  
  // Error states
  const [settingsError, setSettingsError] = useState(false);
  const [conversationsError, setConversationsError] = useState(false);

  // New state for conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
    loadSettings();
  }, []);

  const loadConversations = async () => {
    try {
      setConversationsError(false);
      const response = await fetch("https://leaps-scraper.onrender.com/conversations/get_conversations");
      if (!response.ok) throw new Error('Failed to load conversations');
      const data = await response.json();
      console.log('Conversations response:', data); // Debug log
      setConversations(data.data || []);
    } catch (error) {
      console.error("Error loading conversations:", error);
      setConversationsError(true);
      setConversations([]);
    }
  };

  const loadSettings = async () => {
    try {
      setSettingsError(false);
      const response = await fetch("https://leaps-scraper.onrender.com/settings/get_settings");
      
      if (response.ok) {
        const settings = await response.json();
        setOpenAiModel(settings.model);
        setTemperature(settings.temperature);
        setPresencePenalty(settings.presence_penalty);
        setSelectedVectorStore(settings.vectorStore);
        setPrompt(settings.prompt);
        
        if (settings.vectorStores && Array.isArray(settings.vectorStores)) {
          setVectorStores(settings.vectorStores);
        }
      } else {
        // If settings fail to load, use defaults and show error state
        setSettingsError(true);
        // Set default values
        setOpenAiModel("gpt-4");
        setTemperature(0.7);
        setPresencePenalty(0.5);
        setSelectedVectorStore("1");
        setPrompt("Default prompt");
        setVectorStores(["1", "2", "3"]); // Default vector stores
        console.error("Failed to load settings, using defaults");
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error loading settings:", error);
      setSettingsError(true);
      // Set the same default values
      setOpenAiModel("gpt-4");
      setTemperature(0.7);
      setPresencePenalty(0.5);
      setSelectedVectorStore("1");
      setPrompt("Default prompt");
      setVectorStores(["1", "2", "3"]); // Default vector stores
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

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSettingsOpen(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const createNewConversation = () => {
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
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toISOString();
    const newMessage: Message = { 
      role: "user", 
      text: input,
      timestamp 
    };

    // Create new conversation if none exists
    if (!currentConversationId) {
      createNewConversation();
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
          conversationId: currentConversationId,
          timestamp
        }),
      });

      const botResponse = await response.text();
      const botMessage: Message = {
        role: "bot",
        text: botResponse,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      // Update conversation in state
      const updatedConversations = conversations.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: finalMessages,
            lastUpdated: new Date().toISOString(),
            title: finalMessages[0].text.slice(0, 30) + "..."  // Set title to first message
          };
        }
        return conv;
      });

      setConversations(updatedConversations);

      // Save conversation to backend
      await saveConversation(currentConversationId!, finalMessages);

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveConversation = async (conversationId: string, messages: Message[]) => {
    try {
      await fetch("https://leaps-scraper.onrender.com/conversations/save_conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          messages
        }),
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
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

  // Existing useEffect for scroll behavior
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-blue-600 text-white hover:bg-blue-700">
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="flex">
          <div className="w-1/4 space-y-4 p-4 border-r border-gray-600">
            <DialogHeader>
              <DialogTitle>Chatbot Settings</DialogTitle>
            </DialogHeader>
            {settingsError && (
              <Alert variant="destructive" className="bg-red-900 border-red-800">
                <AlertDescription className="flex items-center justify-between">
                  Failed to load settings
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadSettings}
                    className="ml-2"
                  >
                    <RefreshCw size={16} className="mr-1" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            <Select value={openAiModel} onValueChange={setOpenAiModel}>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4o-mini">GPT-4o-Mini</SelectItem>
              <SelectItem value="gpt-3o">GPT-3.5</SelectItem>
            </Select>
            <div className="space-y-2">
              <label className="text-white text-sm">Temperature: {temperature}</label>
              <Slider 
                value={temperature} 
                onValueChange={setTemperature}
                min={0.1} 
                max={1} 
                step={0.1} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm">Presence Penalty: {presencePenalty}</label>
              <Slider 
                value={presencePenalty} 
                onValueChange={setPresencePenalty}
                min={0.1} 
                max={1} 
                step={0.1} 
              />
            </div>
            <Select value={selectedVectorStore} onValueChange={setSelectedVectorStore}>
              {vectorStores.map((store) => (
                <SelectItem key={store} value={store}>{store}</SelectItem>
              ))}
            </Select>
            <Button onClick={saveSettings} className="bg-blue-600 text-white w-full">
              Save Settings
            </Button>
          </div>
          <div className="w-3/4 p-4">
            <div className="h-full p-3 bg-gray-200 rounded-lg text-black overflow-auto">
              {prompt}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBot;