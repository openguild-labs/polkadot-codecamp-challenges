"use client"

import { useAccounts, useChain, useConnect, ConnectionStatus } from "@luno-kit/react"
import { Badge } from "@/components/ui/badge"
import { Wallet, Link2 } from "lucide-react"
import { CustomConnectButton } from "./custom-connect-button"
import { useEffect } from "react"

interface WalletInfoProps {
  collapsed?: boolean
}

export function WalletInfo({ collapsed = false }: WalletInfoProps) {
  const accountsData = useAccounts()
  const chainData = useChain()
  const { status, activeConnector } = useConnect()

  // useAccounts returns { accounts: Account[], selectAccount: fn }
  // useChain returns { chain: Chain, chainId: string }
  const accounts = accountsData?.accounts ?? []
  const chain = chainData?.chain

  const isConnected = status === ConnectionStatus.Connected && accounts.length > 0

  // Debug logging
  useEffect(() => {
    console.log("WalletInfo - Accounts:", accounts)
    console.log("WalletInfo - Chain:", chain)
    console.log("WalletInfo - Status:", status)
    console.log("WalletInfo - ActiveConnector:", activeConnector)
    console.log("WalletInfo - IsConnected:", isConnected)
  }, [accounts, chain, status, activeConnector, isConnected])

  if (collapsed) {
    return (
      <div className="p-2 relative z-[100]">
        <CustomConnectButton />
      </div>
    )
  }

  return (
    <div className="p-4 border-t border-white/10 relative z-[100]">
      <div className="mb-3">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Wallet Connection
        </h3>
        <CustomConnectButton />
      </div>

      {isConnected && (
        <div className="space-y-3 mt-4">
          {/* Connected Chain */}
          <div className="modern-form-section p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-white/80">Connected Chain</span>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs font-medium">
              {chain?.name || "Unknown"}
            </Badge>
          </div>

          {/* Accounts */}
          <div className="modern-form-section p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-white/80">
                Accounts ({accounts.length})
              </span>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {accounts.map((account, idx) => (
                <div
                  key={account.address || idx}
                  className="bg-white/5 hover:bg-white/10 rounded-lg p-2.5 text-xs border border-white/5 transition-colors"
                >
                  <div className="font-medium text-white truncate mb-1">
                    {account.name || `Account ${idx + 1}`}
                  </div>
                  <div className="text-white/50 font-mono text-[10px] truncate">
                    {account.address}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Connector */}
          {activeConnector && (
            <div className="modern-form-section p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-white/80">
                  Connected via
                </span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] font-medium">
                {activeConnector.name}
              </Badge>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
