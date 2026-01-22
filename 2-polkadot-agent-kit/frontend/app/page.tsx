"use client"

import { useEffect, useState } from "react"
import ChatSidebar from "@/components/chat-sidebar"
import ChatWindow from "@/components/chat-window"
import ChatInput from "@/components/chat-input"
import { Message } from "@/types/message"
import { AgentWrapper } from "./agent/agent-wrapper"
import AgentConnect from "@/components/agent-connect"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [agentInstance, setAgentInstance] = useState<AgentWrapper | null>(null)
  const [inputDisabled, setInputDisabled] = useState(false)
  const [msgId, setMsgId] = useState(0)

  // Send user message, get agent response, update chat
  const handleSendMessage = async (content: string) => {
    if (!agentInstance) return
    const userMsg: Message = {
      id: msgId,
      type: "user",
      content,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setMsgId((id) => id + 1)
    setInputDisabled(true)
    try {
      const agentReply = await agentInstance.ask(content)
      const agentMsg: Message = {
        id: msgId + 1,
        type: "assistant",
        content: agentReply.output,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, agentMsg])
      setMsgId((id) => id + 1)
    } catch (err) {
      const errorMsg: Message = {
        id: msgId + 1,
        type: "assistant",
        content: "Error: " + (err instanceof Error ? err.message : String(err)),
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, errorMsg])
      setMsgId((id) => id + 1)
    } finally {
      setInputDisabled(false)
    }
  }

  const handleAgentConnect = (agent: AgentWrapper) => {
    setAgentInstance(agent)
    setIsConnected(true)
  }

  const handleAgentDisconnect = () => {
    setIsConnected(false)
    setAgentInstance(null)
  }

  return (
    <div 
      className="flex h-screen overflow-hidden"
      style={{
        background: "#0f0b1e",
      }}
    >
      {!isConnected ? (
        <AgentConnect onConnect={handleAgentConnect} />
      ) : (
        <>
          {sidebarOpen && (
            <ChatSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          )}
          <div className="flex-1 flex flex-col">
            <ChatWindow messages={messages} agent={agentInstance!} />
            <ChatInput onSend={handleSendMessage} agent={agentInstance!} disabled={inputDisabled} />
          </div>
        </>
      )}
    </div>
  )
}
