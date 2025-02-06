import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./LiveTranscription.module.scss";
import { LOCAL_IP_ADDRESS } from "@/app/constants";

interface Sentence {
  text: string;
  speaker?: string; // Optional speaker
}

interface LiveTranscriptionProps {
  className?: string;
}

// Define colors for each speaker
const speakerColors: { [key: string]: string } = {
  speaker1: "lightblue",
  speaker2: "lightgreen",
  default: "lightgray",
};

export const LiveTranscription: React.FC<LiveTranscriptionProps> = ({
  className,
}) => {
  const [transcriptions, setTranscriptions] = useState<Sentence[]>([]);
  const [buffer, setBuffer] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(`${LOCAL_IP_ADDRESS}`, {
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    // Handle connection
    socket.on("connect", () => {
      setConnectionStatus("Connected");
      console.log("Connected to WebSocket server");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
      console.log("Disconnected from WebSocket server");
    });

    // Handle connection error
    socket.on("connect_error", (error: Error) => {
      setConnectionStatus("Connection Error");
      console.error("Connection Error:", error);
    });

    socket.on("transcription_buffer", (data: { buffer: string }) => {
      setBuffer(data.buffer);
    });

    socket.on("clear_buffer", () => {
      setBuffer(''); // Clear the buffer on the frontend
    });

    // Listen for transcription data
    socket.on("transcription_data", (data: { text: string, speaker?: string }) => {
      console.log("Received transcription data:", data.text);  // Debug: Log each received chunk
      setTranscriptions((prevTranscriptions) => {
        console.log("Previous transcriptions:", prevTranscriptions);  // Debug: Check existing state
        return [...prevTranscriptions, { text: data.text, speaker: data.speaker }];  // Add new transcription text with speaker
      });
    });

    return () => {
      if (socket) {
        console.log("Disconnecting from WebSocket server");
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className={`${styles.transcriptionBox} ${className}`}>
      <p>Connection Status: {connectionStatus}</p>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {transcriptions.map((sentence, index) => (
          <span
            key={index}
            style={{
              backgroundColor:
                speakerColors[sentence.speaker || "default"],
              display: "block",  // Ensure each sentence is on a new line
              margin: "2px 0",  // Optional: add margin between sentences
              padding: "2px",   // Optional: add padding for better readability
            }}
          >
            {sentence.text}
          </span>
        ))}
        <div>{buffer}</div>
      </div>
    </div>
  );
};
