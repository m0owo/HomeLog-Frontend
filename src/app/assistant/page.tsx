"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: Date;
  text: string;
  sender: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: new Date(),
      text: "Test Tes Tes Tes Tes Tes Tes Tes Tes Tes Tes Tes Tes",
      sender: "user",
    },
    {
      id: new Date(),
      text: "Test",
      sender: "computer",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: new Date(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex w-full flex-col border border-black">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.map((msg) => (
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
        ))}
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
            className="ml-2 rounded bg-black px-4 py-2 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
