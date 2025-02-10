import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";

// Define a type for the message
interface Message {
  role: string;
  text: string;
}

const ChatBot = () => {
  // Use the Message type for the state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://leaps-scraper.onrender.com/generate_insight", {
        method: "POST",
        headers: { "Content-Type": "text/plain" }, // Set Content-Type to text/plain
        body: input, // Send the plain text input
      });
      const text = await response.text(); // Get the raw response text
console.log("Response:", text);
setMessages([...newMessages, { role: "bot", text: text }]);

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };    

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 w-full h-full">

    <Card className="w-full h-full max-w-3xl bg-gray-800 shadow-lg"> {/* Adjust width and height */}
      <CardContent className="p-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          AI ChatBot
        </h1>
  
        <div className="mb-4 h-[calc(100vh-200px)] space-y-4 overflow-y-auto rounded-lg bg-gray-900 p-4">
          {/* This div controls the message area */}
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
        </div>
  
        <div className="flex gap-1">
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
