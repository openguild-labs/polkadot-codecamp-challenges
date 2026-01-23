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
      className="p-6 bg-background border-t"
      style={{ borderTopColor: "#3a3a3a" }}
    >
      <div className="flex gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={placeholder}
          className="flex-1 bg-card text-foreground placeholder:text-muted-foreground text-sm p-3 disabled:opacity-50 rounded-lg border transition-colors focus:outline-none focus:border-gray-500"
          style={{
            borderColor: "#3a3a3a",
            fontWeight: "400",
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          className="bg-primary text-primary-foreground px-5 py-3 font-semibold hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border"
          style={{
            borderColor: "#5a5a5a",
          }}
        >
          <Send size={18} strokeWidth={2} />
        </button>
      </div>

    </div>
  );
}
