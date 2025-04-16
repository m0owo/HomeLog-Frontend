"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: Date;
  text: string;
  sender: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://localhost:8765"); // Update with your WebSocket server URL

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        if (data["type"] === "chat" || data["type"] === "broadcast") {
          console.log("Received message:", data.content);
          const newMessage: Message = {
            id: new Date(),
            text: data.content,
            sender: "computer",
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);

      // Try to reconnect
      setTimeout(() => {
        setConnected(true);
        setSocket(new WebSocket("ws://localhost:8765"));
      }, 1000);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSend = () => {
    if (!input.trim() || !socket || !connected) return;

    const newMessage: Message = {
      id: new Date(),
      text: input,
      sender: "user",
    };

    // Add message to UI
    setMessages((prev) => [...prev, newMessage]);

    // Send message to server
    socket.send(JSON.stringify({ text: input }));

    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex w-full flex-col border border-black">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id.toISOString()}
              className={`max-w-sm rounded p-2 ${
                msg.sender === "user"
                  ? "ml-auto self-end bg-gray-800 px-4 text-white"
                  : "w-fit bg-white px-4 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="w-full border-t bg-white p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded border p-2"
            placeholder="Type a message"
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
