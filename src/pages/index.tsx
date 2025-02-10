import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";

interface Message {
  role: string;
  text: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 p-4">
      <Card className="w-full h-full max-w-3xl bg-gray-800 shadow-lg flex flex-col">
        <CardContent className="p-6 flex flex-col flex-grow">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Leaps AI ChatBot V.1.0
          </h1>

          {/* Message display area */}
          <div className="flex-grow overflow-y-auto space-y-4 bg-gray-900 p-4 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-right text-white"
                    : "mr-auto bg-gray-700 text-white"
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

          {/* Input area fixed at the bottom */}
          <div className="flex gap-1 mt-4 flex-shrink-0">
            <Input
              className="flex-1 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
