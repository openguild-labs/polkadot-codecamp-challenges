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
      className="p-6 bg-white"
      style={{ borderTop: "3px solid #1a1a1a" }}
    >
      <div className="flex gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={placeholder}
          className="flex-1 bg-white text-foreground placeholder:text-muted-foreground text-sm p-3 disabled:opacity-50"
          style={{
            border: "2px solid #1a1a1a",
            borderRadius: "5px 8px 6px 4px",
            fontWeight: "500",
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="bg-primary text-primary-foreground px-4 py-3 font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderRadius: "6px 4px 8px 5px",
            border: "2px solid #1a1a1a",
            boxShadow: "3px 3px 0px #1a1a1a",
          }}
        >
          <Send size={18} strokeWidth={3} />
        </button>
      </div>

    </div>
  );
}
