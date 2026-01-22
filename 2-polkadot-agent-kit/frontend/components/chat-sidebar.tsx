"use client"

import { ConnectButton } from "@luno-kit/ui"
import { Plus, Trash2, ChevronLeft, ChevronRight, Pen } from "lucide-react"

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  return (
    <div
      className="w-full flex flex-col transition-all duration-300 overflow-hidden glass"
      style={{
        width: isOpen ? "16rem" : "4rem",
        background: "rgba(15, 11, 30, 0.8)",
        borderRight: "1px solid rgba(139, 92, 246, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header with toggle button */}
      <div
        className="p-5 flex items-center justify-between"
        style={{
          borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
        }}
      >
        {isOpen && (
          <div>
            <div className="flex items-center justify-center mb-2 gap-2">
              <img src="/og-logo.png" alt="Logo" className="h-8 w-auto" />
              <p 
                className="ml-2 text-3xl font-semibold"
                style={{
                  color: "#e8e6f3",
                  letterSpacing: "-0.02em",
                }}
              >
                Chat
              </p>
            </div>

          </div>
        )}
      </div>

      {/* Footer */}
      {isOpen && (
        <div
          className="p-5 space-y-2"
          style={{
            borderTop: "1px solid rgba(139, 92, 246, 0.2)",
          }}
        >
          <div className="flex justify-center items-center w-full">
            <div
              className="glass"
              style={{
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <ConnectButton
                chainStatus="none"
                displayPreference="name"
                className="text-sm p-2 hover:bg-secondary transition-colors"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
