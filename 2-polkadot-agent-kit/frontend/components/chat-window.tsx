"use client";

import { AgentWrapper } from "@/app/agent/agent-wrapper";
import { Message } from "@/types/message";

interface ChatWindowProps {
  messages: Message[];
  agent: AgentWrapper;
}

export default function ChatWindow({ messages, agent }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col bg-sky-50">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-6xl">💬</div>
          <h1 className="text-3xl font-bold text-sky-800">
            Start a conversation
          </h1>
          <p className="text-sky-600 max-w-md">
            Ask me anything! I'm here to help with questions, ideas, and
            brainstorming.
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 font-bold text-sm`}
              style={{
                background: message.type === "user" ? "#7dd3fc" : "#e0f2fe",
                color: message.type === "user" ? "#0c4a6e" : "#075985",
                border: "2px solid #0369a1",
                borderRadius:
                  message.type === "user"
                    ? "8px 4px 6px 10px"
                    : "4px 10px 8px 6px",
                boxShadow: "3px 3px 0px #0369a1",
                transform: `rotate(${-0.5 + (index % 2) * 1}deg)`,
              }}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </p>
              <p className="text-xs mt-2 opacity-70 mt-3">
                {message.timestamp}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
