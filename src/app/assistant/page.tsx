"use client";

import { useEffect, useRef, useState } from "react";
import { Message, useWebSocket } from "../websocket/WebSocketProvider";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { socket, connected, sendMessage } = useWebSocket();

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "chat" || data.type === "broadcast") {
        const newMessage: Message = {
          id: new Date(),
          text: data.content,
          sender: "computer",
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (err) {
      console.error("❌ Failed to parse message:", err);
    }
  };

  const handleSend = () => {
    if (!input.trim() || !connected) return;
    const newMessage: Message = {
      id: new Date(),
      text: input,
      sender: "user",
    };
    sendMessage(newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id.toISOString()}
            className={`max-w-sm rounded p-2 ${
              msg.sender === "user"
                ? "ml-auto bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="w-full rounded-xl bg-white p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message"
            className="flex-1 rounded border p-2"
          />
          <button
            onClick={handleSend}
            className={`ml-2 rounded px-4 py-2 text-white ${
              connected ? "bg-black" : "bg-gray-400"
            }`}
            disabled={!connected}
          >
            {connected ? "Send" : "Connecting..."}
          </button>
        </div>
      </div>
    </div>
  );
}
