"use client"

import { AgentWrapper } from "@/app/agent/agent-wrapper"
import { Message } from "@/types/message"

interface ChatWindowProps {
  messages: Message[],
  agent: AgentWrapper
}

export default function ChatWindow({ messages, agent }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col bg-background">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-6xl">💬</div>
          <h1 className="text-3xl font-bold text-foreground">
            Start a conversation
          </h1>
          <p className="text-muted-foreground max-w-md">
            Ask me anything! I'm here to help with questions, ideas, and brainstorming.
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 rounded-lg border text-sm`}
              style={{
                background: message.type === "user" ? "#4a4a4a" : "#252525",
                color: message.type === "user" ? "#f0f0f0" : "#e0e0e0",
                borderColor: message.type === "user" ? "#5a5a5a" : "#3a3a3a",
                borderWidth: "1px",
              }}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <p className="text-xs mt-3 opacity-60">{message.timestamp}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
