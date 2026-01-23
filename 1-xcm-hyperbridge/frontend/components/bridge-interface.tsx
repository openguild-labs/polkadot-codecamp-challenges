"use client"

import { useState } from "react"
import Image from "next/image"
import { ChainSelector } from "./chain-selector"
import { TokenInput } from "./token-input"
import { StatusPanel } from "./status-panel"
import { BridgeButton } from "./bridge-button"
import { useBridge } from "@/hooks/useBridge"
import { useTracking } from "@/hooks/useTracking"

const createChain = (id: any, name: any, iconPath: any) => ({
  id,
  name,
  icon: (
    <Image
      src={`https://github.com/TalismanSociety/chaindata/raw/main/assets/chains/${iconPath}`}
      alt={name}
      width={28}
      height={28}
      unoptimized
    />
  ),
})

const chains = [
  createChain("97", "BNB Testnet", "56.svg"),
  createChain("11155111", "Sepolia", "1.svg"),
  createChain("dot", "Paseo", "polkadot.svg"),
]

export function BridgeInterface() {
  const [sourceChain, setSourceChain] = useState(chains[0])
  const [destChain, setDestChain] = useState(chains[1])
  const [amount, setAmount] = useState("")
  const [txProgress, setTxProgress] = useState(0)

  const { bridgeTokens, approveToken } = useBridge()
  const { trackStatus } = useTracking()

  const token = "0xA801da100bF16D07F668F4A49E1f71fc54D05177"
  const symbol = "USD.h"

  const handleBridge = async () => {
    setTxProgress(0)

    await approveToken({ token, amount })

    const hash = await bridgeTokens({
      token,
      symbol,
      amount,
      destChainId: destChain.id,
    })

    if (!hash) return

    const statusMap: Record<string, number> = {
      SOURCE_FINALIZED: 25,
      HYPERBRIDGE_DELIVERED: 50,
      HYPERBRIDGE_FINALIZED: 75,
      DESTINATION: 100,
      TIMED_OUT: 100,
    }

    trackStatus({
      commitmentHash: hash.commitment,
      onStatus: (s) => setTxProgress(statusMap[s] ?? 0),
    })
  }

  const swapChains = () => {
    setSourceChain(destChain)
    setDestChain(sourceChain)
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Bridge</h1>
            <span className="text-sm text-gray-500">Cross-chain transfer</span>
          </div>

          {/* FROM */}
          <ChainSelector
            chains={chains.filter(c => c.id !== destChain.id)}
            selectedChain={sourceChain}
            onSelect={setSourceChain}
            label="From"
          />

          {/* Swap */}
          <div className="flex justify-center">
            <button
              onClick={swapChains}
              className="w-10 h-10 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center text-lg"
            >
              ⇅
            </button>
          </div>

          {/* TO */}
          <ChainSelector
            chains={chains.filter(c => c.id !== sourceChain.id)}
            selectedChain={destChain}
            onSelect={setDestChain}
            label="To"
          />

          {/* AMOUNT */}
          <TokenInput
            amount={amount}
            onAmountChange={setAmount}
            sourceChain={sourceChain}
          />

          {/* ACTION */}
          <BridgeButton
            onClick={handleBridge}
            disabled={!amount || amount === "0"}
            isLoading={txProgress > 0 && txProgress < 100}
          />
        </div>
      </div>
    </div>
  )
}
