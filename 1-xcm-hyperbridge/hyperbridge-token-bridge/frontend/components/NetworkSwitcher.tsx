"use client"

import { useMetaMask } from "@/hooks/useMetaMask"
import { SOURCE_CHAIN, DESTINATION_CHAIN } from "@/constants/chains"

export function NetworkSwitcher() {
  const { chainId, switchChain } = useMetaMask()
  
  const currentChainId = chainId ? parseInt(chainId, 16) : null
  const isOnSourceChain = currentChainId === SOURCE_CHAIN.chainIdNumber
  
  const handleSwitchToSourceChain = async () => {
    try {
      await switchChain(SOURCE_CHAIN.chainIdHex)
    } catch (error) {
      console.error("Failed to switch chain:", error)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: isOnSourceChain ? '#10b981' : '#ef4444' }}></div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Network Status</p>
          <p className="text-xs text-gray-600">
            {currentChainId ? (
              isOnSourceChain ? (
                <span className="text-green-600 font-medium">Connected to {SOURCE_CHAIN.shortName}</span>
              ) : (
                <span className="text-red-600 font-medium">Wrong network (ChainId: {currentChainId})</span>
              )
            ) : (
              <span className="text-gray-500">Not connected</span>
            )}
          </p>
        </div>
      </div>
      
      {currentChainId && !isOnSourceChain && (
        <button
          onClick={handleSwitchToSourceChain}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Switch to {SOURCE_CHAIN.shortName}
        </button>
      )}
    </div>
  )
}
