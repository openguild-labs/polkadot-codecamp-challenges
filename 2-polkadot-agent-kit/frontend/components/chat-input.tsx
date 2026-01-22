"use client";

import { AgentWrapper } from "@/app/agent/agent-wrapper";
import { usePolkadotAgent } from "@/hooks/usePolkadotAgent";
import { Send } from "lucide-react";
import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  agent: AgentWrapper
};

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask me anything...",
  agent
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;

    onSend(input);
    setInput("");
  };

  return (
    <div
      className="p-6"
      style={{ 
        background: "#0a0e27",
        borderTop: "3px solid #00ffff",
        boxShadow: "0 -5px 20px rgba(0, 255, 255, 0.2)",
      }}
    >
      <div className="flex gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={placeholder}
          className="flex-1 text-sm p-3 disabled:opacity-50"
          style={{
            background: "#0d1229",
            color: "#00ffff",
            border: "2px solid #00ffff",
            borderRadius: "5px 8px 6px 4px",
            fontWeight: "500",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="px-4 py-3 font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: disabled ? "#1a2342" : "#00ffff",
            color: disabled ? "#66d9ff" : "#0a0e27",
            borderRadius: "6px 4px 8px 5px",
            border: "2px solid #00ffff",
            boxShadow: disabled ? "none" : "0 0 15px rgba(0, 255, 255, 0.6), 3px 3px 0px #00ffff",
          }}
        >
          <Send size={18} strokeWidth={3} />
        </button>
      </div>

    </div>
  );
}
