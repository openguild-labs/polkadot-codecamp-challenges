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
        background: "#0a0e27",
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(0, 153, 255, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-6xl">✏️</div>
          <h1 
            className="text-3xl font-bold"
            style={{
              color: "#00ffff",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)",
            }}
          >
            Start a conversation
          </h1>
          <p 
            className="max-w-md"
            style={{
              color: "#66d9ff",
            }}
          >
            Ask me anything! I'm here to help with questions, ideas, and brainstorming.
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 font-bold text-sm`}
              style={{
                background: message.type === "user" ? "#001a33" : "#0d1229",
                color: message.type === "user" ? "#00ffff" : "#00d9ff",
                border: "2px solid #00ffff",
                borderRadius: message.type === "user" ? "8px 4px 6px 10px" : "4px 10px 8px 6px",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.4), 3px 3px 0px #00ffff",
                transform: `rotate(${-0.5 + (index % 2) * 1}deg)`,
              }}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs mt-2 opacity-70 mt-3" style={{ color: "#66d9ff" }}>{message.timestamp}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
