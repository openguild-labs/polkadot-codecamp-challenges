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
      className="p-6 glass"
      style={{ 
        background: "rgba(15, 11, 30, 0.8)",
        borderTop: "1px solid rgba(139, 92, 246, 0.2)",
        backdropFilter: "blur(10px)",
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
          className="flex-1 text-sm p-4 disabled:opacity-50"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            color: "#e8e6f3",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "12px",
            fontWeight: "400",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
            e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
            e.target.style.boxShadow = "none";
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="px-5 py-4 font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: disabled ? "rgba(139, 92, 246, 0.1)" : "#8b5cf6",
            color: disabled ? "rgba(232, 230, 243, 0.5)" : "#ffffff",
            borderRadius: "12px",
            border: "none",
            boxShadow: disabled ? "none" : "0 4px 16px rgba(139, 92, 246, 0.4)",
          }}
        >
          <Send size={18} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}
