"use client";

import { useState } from "react";
import AgentConnect from "@/components/agent-connect";
import ChatWindow from "@/components/chat-window";
import { AgentWrapper } from "@/app/agent/agent-wrapper";
import { Message } from "@/types/message";

export default function Page() {
  const [agent, setAgent] = useState<AgentWrapper | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = (connectedAgent: AgentWrapper) => {
    setAgent(connectedAgent);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !agent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await agent.ask(input.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.output,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("[v0] Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, there was an error processing your message.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!agent) {
    return <AgentConnect onConnect={handleConnect} />;
  }

  return (
    <div className="flex flex-col h-screen bg-sky-50">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{
          background: "#e0f2fe",
          borderBottom: "2px solid #0369a1",
        }}
      >
        <h1 className="text-xl font-bold text-sky-800">Polkadot Agent Chat</h1>
        <button
          onClick={() => setAgent(null)}
          style={{
            background: "#f0f9ff",
            border: "2px solid #0369a1",
            borderRadius: "6px",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#0c4a6e",
            cursor: "pointer",
            boxShadow: "2px 2px 0px #0369a1",
          }}
        >
          Disconnect
        </button>
      </div>

      {/* Chat Window */}
      <ChatWindow messages={messages} agent={agent} />

      {/* Input Area */}
      <div
        className="p-4"
        style={{
          background: "#e0f2fe",
          borderTop: "2px solid #0369a1",
        }}
      >
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: "white",
              border: "2px solid #0369a1",
              borderRadius: "8px 4px 6px 8px",
              padding: "10px 14px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#0c4a6e",
              boxShadow: "3px 3px 0px #0369a1",
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            style={{
              background: isLoading || !input.trim() ? "#94a3b8" : "#38bdf8",
              border: "2px solid #0369a1",
              borderRadius: "4px 8px 6px 8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              color: isLoading || !input.trim() ? "#64748b" : "#0c4a6e",
              cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
              boxShadow: "3px 3px 0px #0369a1",
              opacity: isLoading || !input.trim() ? 0.6 : 1,
            }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-sky-200 border-t-sky-800 rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
