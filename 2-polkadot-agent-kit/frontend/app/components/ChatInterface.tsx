"use client";

import { useState, useRef, useEffect } from "react";
import { useAccounts } from "@luno-kit/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const EXAMPLE_PROMPTS = [
  "Check my balance on Paseo Asset Hub",
  "Transfer 1 PAS from Paseo Asset Hub to Paseo",
  "Transfer 1 PAS to 138Jpv1we3DjZsUsRAMKo13CRPNHjgdR2xaw9i3ydTsQY2ZQ on Paseo Asset Hub",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { accounts } = useAccounts();
  const isConnected = accounts && accounts.length > 0;
  const isDisabled = isLoading || !isConnected;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 300000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error instanceof Error ? error.message : "Something went wrong"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">&#9889;</div>
            <div className="chat-empty-title">Polkadot AI Agent</div>
            <p className="chat-empty-subtitle">
              Transfer tokens, check balances, and manage assets across Polkadot chains
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chat-message chat-message-${msg.role}`}>
            <div className="chat-message-header">
              <div className="chat-message-avatar">
                {msg.role === "user" ? "Y" : "A"}
              </div>
              <div className="chat-message-label">
                {msg.role === "user" ? "You" : "Agent"}
              </div>
            </div>
            <div className="chat-message-content">{msg.content}</div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message chat-message-assistant">
            <div className="chat-message-header">
              <div className="chat-message-avatar">A</div>
              <div className="chat-message-label">Agent</div>
            </div>
            <div className="chat-message-content chat-loading">
              <div className="chat-loading-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              Processing your request...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-prompts-bar">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            disabled={isDisabled}
            className="chat-prompt-chip"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isConnected ? "Ask the agent to check balance, transfer tokens..." : "Connect your wallet to start..."}
          disabled={isDisabled}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="chat-send-btn"
        >
          &#8593;
        </button>
      </form>
    </div>
  );
}
