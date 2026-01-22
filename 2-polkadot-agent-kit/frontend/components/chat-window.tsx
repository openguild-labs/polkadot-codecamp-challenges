"use client"

import { AgentWrapper } from "@/app/agent/agent-wrapper"
import { Message } from "@/types/message"

interface ChatWindowProps {
  messages: Message[],
  agent: AgentWrapper
}

export default function ChatWindow({ messages, agent }: ChatWindowProps) {
  return (
    <div 
      className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col"
      style={{
        background: "#0f0b1e",
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #0f0b1e 0%, #0a0718 100%)
        `,
      }}
    >
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-6xl">✏️</div>
          <h1 
            className="text-4xl font-semibold"
            style={{
              color: "#e8e6f3",
              letterSpacing: "-0.02em",
            }}
          >
            Start a conversation
          </h1>
          <p 
            className="max-w-md text-base"
            style={{
              color: "rgba(232, 230, 243, 0.7)",
            }}
          >
            Ask me anything! I'm here to help with questions, ideas, and brainstorming.
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 text-sm glass`}
              style={{
                background: message.type === "user" 
                  ? "rgba(139, 92, 246, 0.15)" 
                  : "rgba(255, 255, 255, 0.05)",
                color: message.type === "user" ? "#c4b5fd" : "#e8e6f3",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs mt-3 opacity-60" style={{ color: "rgba(232, 230, 243, 0.6)" }}>{message.timestamp}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
