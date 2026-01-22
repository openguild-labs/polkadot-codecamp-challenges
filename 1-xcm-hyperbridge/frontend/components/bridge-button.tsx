"use client"

import { ethers } from "ethers";
import bridgeAbi from "../abis/TokenBridge.json";
import { useMetaMask } from "@/hooks/useWallet";
import { useBridge } from "@/hooks/useBridge";

interface BridgeButtonProps {
  onClick: () => void
  disabled: boolean
  isLoading: boolean
}

export function BridgeButton({ onClick, disabled, isLoading }: BridgeButtonProps) {

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 border-3 border-black bg-yellow-300 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-1"
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <span className="animate-spin">⚡</span>
            <span className="text-black">BRIDGING...</span>
          </>
        ) : (
          <>
            <span className="text-black">BRIDGE NOW</span>
          </>
        )}
      </div>
    </button>
  )
}
