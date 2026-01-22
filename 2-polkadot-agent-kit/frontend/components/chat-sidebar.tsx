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
      className="w-full bg-white flex flex-col transition-all duration-300 overflow-hidden"
      style={{
        width: isOpen ? "16rem" : "4rem",
        borderRight: "3px solid #1a1a1a",
      }}
    >
      {/* Header with toggle button */}
      <div
        className="p-4 flex items-center justify-between"
        style={{
          borderBottom: "3px solid #1a1a1a",
        }}
      >
        {isOpen && (
          <div>
            <div className="flex items-center justify-center mb-2 gap-2">
              <img src="/og-logo.png" alt="Logo" className="h-8 w-auto" />
              <p className="ml-2 text-5xl font-bold">
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
            borderTop: "3px solid #1a1a1a",
          }}
        >
          <div className="flex justify-center items-center w-full">
            <div
              style={{
                border: "2px solid #1a1a1a",
                borderRadius: "4px 6px 5px 4px",
                fontWeight: "bold",
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
