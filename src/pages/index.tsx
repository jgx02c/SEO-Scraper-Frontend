import React, { useState, useEffect, useRef } from "react";
import { Send, Settings } from "lucide-react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/dialog";
import { Slider } from "@/components/slider";
import { Select, SelectItem } from "@/components/select";
import { useRouter } from "next/router";

// Define the message type
interface Message {
  role: string;
  text: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Explicitly define the state type
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openAiModel, setOpenAiModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  const [vectorStores, setVectorStores] = useState<string[]>([]);
  const [selectedVectorStore, setSelectedVectorStore] = useState("1");
  const [prompt, setPrompt] = useState("Default prompt");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://leaps-scraper.onrender.com/generate_insight", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: input,
      });
      const text = await response.text();
      console.log("Response:", text);
      setMessages([...newMessages, { role: "bot", text: text }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveSettings = () => {
    fetch("/https://leaps-scraper.onrender.com/save_settings", {
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
    setSettingsOpen(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 p-4">
    <Card className="w-full h-full max-w-6xl bg-gray-800 shadow-lg flex flex-col">
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
                {msg.text}
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
      {/* Settings Popup */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen} className="w-11/12 max-w-7xl">
        <DialogContent className="flex">
          <div className="w-1/4 space-y-4 p-4 border-r border-gray-600">
            <DialogHeader>
              <DialogTitle>Chatbot Settings</DialogTitle>
            </DialogHeader>
            <Select value={openAiModel} onChange={(e) => setOpenAiModel(e.target.value)}>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4o-mini">GPT-4o-Mini</SelectItem>
              <SelectItem value="gpt-3o">GPT-3.5</SelectItem>
            </Select>
            <div className="space-y-2">
              <label className="text-white text-sm">Temperature: {temperature}</label>
              <Slider value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} min={0.1} max={1} step={0.1} />
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm">Presence Penalty: {presencePenalty}</label>
              <Slider value={presencePenalty} onChange={(e) => setPresencePenalty(parseFloat(e.target.value))} min={0.1} max={1} step={0.1} />
            </div>
            <label className="text-white text-sm">Database: {selectedVectorStore}</label>
            <Select value={selectedVectorStore} onChange={(e) => setSelectedVectorStore(e.target.value)}>
              {vectorStores.map((store) => (
                <SelectItem key={store} value={store}>{store}</SelectItem>
              ))}
            </Select>
            <Button onClick={saveSettings} className="bg-blue-600 text-white w-full">Save Settings</Button>
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
