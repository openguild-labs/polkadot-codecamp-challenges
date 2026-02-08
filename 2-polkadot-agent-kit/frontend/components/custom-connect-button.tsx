"use client"

import { useConnect, useDisconnect, useAccounts, ConnectionStatus } from "@luno-kit/react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, ChevronDown, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function CustomConnectButton() {
  const { connectors, connect, connectAsync, status, isPending, error } = useConnect({
    onSuccess: () => {
      console.log("[CustomConnectButton] Connection successful!")
    },
    onError: (err) => {
      console.error("[CustomConnectButton] Connection error:", err)
    },
  })
  const { disconnect } = useDisconnect()
  const accountsData = useAccounts()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  // useAccounts returns { accounts: Account[], selectAccount: fn }
  const accounts = accountsData?.accounts ?? []
  const isConnected = status === ConnectionStatus.Connected && accounts.length > 0

  // Debug logging
  console.log("[CustomConnectButton] Status:", status)
  console.log("[CustomConnectButton] Accounts:", accounts)
  console.log("[CustomConnectButton] isConnected:", isConnected)
  console.log("[CustomConnectButton] isPending:", isPending)

  const handleConnect = async (connectorId: string) => {
    console.log("[CustomConnectButton] Attempting to connect with:", connectorId)
    setIsConnecting(true)
    setConnectionError(null)

    try {
      await connectAsync({ connectorId })
      console.log("[CustomConnectButton] connectAsync completed successfully")
    } catch (err: any) {
      console.error("[CustomConnectButton] connectAsync error:", err)
      setConnectionError(err?.message || "Connection failed")
    } finally {
      setIsConnecting(false)
    }
  }

  const isLoading = isPending || isConnecting

  if (isConnected) {
    return (
      <Button
        onClick={() => disconnect()}
        variant="outline"
        className="w-full justify-between gap-2 h-11 text-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500/50 hover:from-green-500/20 hover:to-emerald-500/20 transition-all"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <Wallet className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="truncate text-white font-medium">
            {accounts[0]?.name || "Connected"}
          </span>
        </div>
        <LogOut className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-full justify-between gap-2 h-11 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-500/50 transition-all"
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wallet className="w-4 h-4" />
              )}
              <span className="font-medium">
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-64 bg-zinc-900/95 backdrop-blur-xl border-white/10 shadow-2xl"
        >
          <div className="px-2 py-2">
            <p className="text-xs text-white/50 font-medium uppercase tracking-wide mb-2">
              Select Wallet
            </p>
          </div>
          <DropdownMenuSeparator className="bg-white/10" />
          {connectors.map((connector) => (
            <DropdownMenuItem
              key={connector.id}
              onClick={() => handleConnect(connector.id)}
              disabled={isLoading}
              className="cursor-pointer px-3 py-3 focus:bg-blue-500/20 focus:text-white rounded-md mx-1 my-0.5 transition-all"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 overflow-hidden">
                  {connector.icon ? (
                    <img src={connector.icon} alt={connector.name} className="w-5 h-5" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white">{connector.name}</div>
                  <div className="text-xs text-white/50">
                    {connector.ready ? "Detected" : "Not installed"}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          {connectors.length === 0 && (
            <div className="px-3 py-4 text-center text-sm text-white/50">
              No wallets detected
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Error display */}
      {(connectionError || error) && (
        <div className="text-xs text-red-400 px-2 py-1 bg-red-500/10 rounded border border-red-500/20">
          {connectionError || error?.message}
        </div>
      )}
    </div>
  )
}
