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
  role: "user" | "ai";
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
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/get-settings")
      .then((res) => res.json())
      .then((data) => {
        setOpenAiModel(data.model);
        setTemperature(data.temperature);
        setPresencePenalty(data.presence_penalty);
        setVectorStores(data.vectorStores);
        setSelectedVectorStore(data.vectorStores[0] || "1");
        setPrompt(data.prompt);
      });
  }, []);

  const saveSettings = () => {
    fetch("/api/save-settings", {
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
      <Card className="w-full h-full max-w-3xl bg-gray-800 shadow-lg flex flex-col">
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between mb-4">
            <Button className="bg-blue-600 text-white" onClick={() => router.push("/business")}>
              View Businesses
            </Button>
            <h1 className="text-2xl font-bold text-white">Leaps AI ChatBot V.1.0</h1>
            <Button className="bg-gray-600 text-white" onClick={() => setSettingsOpen(true)}>
              <Settings size={18} />
            </Button>
          </div>
          <div className="h-96 flex flex-col">
            <div className="flex-1 flex-col overflow-y-auto space-y-4 bg-gray-900 p-4 rounded-lg">
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
              {loading && <div className="mr-auto rounded-lg bg-gray-700 p-3 text-white">AI is thinking...</div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="flex gap-1 mt-4 flex-shrink-0">
            <Input
              className="flex-1 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={() => {}} className="bg-blue-600 text-white hover:bg-blue-700">
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Settings Popup */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="flex w-[90vw] h-[70vh] bg-gray-800 p-6 rounded-lg">
          <div className="w-1/3 space-y-4 p-4 border-r border-gray-600">
            <DialogHeader>
              <DialogTitle>Chatbot Settings</DialogTitle>
            </DialogHeader>
            <Select value={openAiModel} onChange={(e) => setOpenAiModel(e.target.value)}>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
            </Select>
            <Slider value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} min={0.1} max={1} step={0.1} />
            <Slider value={presencePenalty} onChange={(e) => setPresencePenalty(parseFloat(e.target.value))} min={0.1} max={1} step={0.1} />
            <Select value={selectedVectorStore} onChange={(e) => setSelectedVectorStore(e.target.value)}>
              {vectorStores.map((store) => (
                <SelectItem key={store} value={store}>{store}</SelectItem>
              ))}
            </Select>
            <Button onClick={saveSettings} className="bg-blue-600 text-white w-full">Save Settings</Button>
          </div>
          <div className="w-2/3 p-4">
            <div className="h-full p-3 bg-gray-200 rounded-lg text-black overflow-auto">{prompt}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBot;
