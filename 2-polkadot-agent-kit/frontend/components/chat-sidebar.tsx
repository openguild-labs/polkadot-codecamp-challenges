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
      className="w-full flex flex-col transition-all duration-300 overflow-hidden"
      style={{
        width: isOpen ? "16rem" : "4rem",
        background: "#0a0e27",
        borderRight: "3px solid #00ffff",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
      }}
    >
      {/* Header with toggle button */}
      <div
        className="p-4 flex items-center justify-between"
        style={{
          borderBottom: "3px solid #00ffff",
        }}
      >
        {isOpen && (
          <div>
            <div className="flex items-center justify-center mb-2 gap-2">
              <img src="/og-logo.png" alt="Logo" className="h-8 w-auto" />
              <p 
                className="ml-2 text-5xl font-bold"
                style={{
                  color: "#00ffff",
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)",
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
          className="p-4 space-y-2"
          style={{
            borderTop: "3px solid #00ffff",
          }}
        >
          <div className="flex justify-center items-center w-full">
            <div
              style={{
                border: "2px solid #00ffff",
                borderRadius: "4px 6px 5px 4px",
                fontWeight: "bold",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
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
