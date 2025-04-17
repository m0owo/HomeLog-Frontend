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
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bottomRef = useRef<HTMLDivElement>(null);
  const wsUrl = "ws://localhost:8765"; // Update with your WebSocket server URL

  const connectWebSocket = () => {
    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("Connected to WebSocket server");
        setConnected(true);
        setReconnecting(false);
        setReconnectAttempt(0);
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
        attemptReconnect();
      };

      return ws;
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      attemptReconnect();
      return null;
    }
  };

  const attemptReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    setReconnecting(true);
    const nextAttempt = reconnectAttempt + 1;
    setReconnectAttempt(nextAttempt);

    // Exponential backoff: 1s, 2s, 4s, 8s, etc. with a max of 30s
    const delay = Math.min(1000 * Math.pow(2, nextAttempt - 1), 30000);
    console.log(
      `Attempting to reconnect in ${delay}ms (attempt ${nextAttempt})`,
    );

    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, delay);
  };

  useEffect(() => {
    const ws = connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws) {
        ws.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="flex w-full flex-col">
      {reconnecting && (
        <div className="bg-yellow-500 p-2 text-center text-white">
          Connection lost. Reconnecting... (Attempt {reconnectAttempt})
        </div>
      )}
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

      <div className="w-full rounded-xl bg-white p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded p-2 focus:outline-none"
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
