"use client"

import { useState } from "react"
import Image from "next/image"
import { ChainSelector } from "./chain-selector"
import { TokenInput } from "./token-input"
import { StatusPanel } from "./status-panel"
import { BridgeButton } from "./bridge-button"
import { useBridge } from "@/hooks/useBridge"
import { useTracking } from "@/hooks/useTracking"

const createChain = (id: any, name: any, iconPath: any, color: any) => ({
  id,
  name,
  icon: (
    <Image
      src={`https://github.com/TalismanSociety/chaindata/raw/main/assets/chains/${iconPath}`}
      alt={name}
      width={40}
      height={40}
      className="inline-block align-middle"
      unoptimized
    />
  ),
  color,
});

const chains = [
  createChain("97", "BNB Chain Testnet", "56.svg", "from-yellow-300 to-amber-300"),
  createChain("11155111", "Ethereum Sepolia", "1.svg", "from-white-300 to-white-400"),
  createChain("dot", "Paseo", "polkadot.svg", "from-pink-400 to-pink-500"),
]

export function BridgeInterface() {
  const [sourceChain, setSourceChain] = useState(chains[0])
  const [destChain, setDestChain] = useState(chains[1])
  const [amount, setAmount] = useState("")
  const [txProgress, setTxProgress] = useState(0)
  const [txIntervalId, setTxIntervalId] = useState<NodeJS.Timeout | null>(null)
  const { bridgeTokens, approveToken } = useBridge();
  const {trackStatus} = useTracking();
  const token = "0xA801da100bF16D07F668F4A49E1f71fc54D05177";
  const symbol = "USD.h";

  const ensureDistinctChains = (newSource: any, newDest: any) => {
    if (newSource.id === newDest.id) {
      const autoReplace = chains.find((c) => c.id !== newSource.id) || chains[0]
      return autoReplace
    }
    return newDest
  }

  const handleBridge = async () => {
    if (txIntervalId) clearInterval(txIntervalId)
    setTxProgress(0)

    try {
      console.log(token, symbol, amount, destChain.id);

      await approveToken({
        token,
        amount,
      });

      const hash = await bridgeTokens({
        token,
        symbol,
        amount,
        destChainId: destChain.id,
      });

      if (hash) {
        const statusToProgress: Record<string, number> = {
          SOURCE_FINALIZED: 25,
          HYPERBRIDGE_DELIVERED: 50,
          HYPERBRIDGE_FINALIZED: 75,
          DESTINATION: 100,
          TIMED_OUT: 100,
        };
        const updateProgress = (status: string) => {
          setTxProgress(statusToProgress[status] ?? 0);
        };
        trackStatus({
          commitmentHash: hash.commitment,
          onStatus: updateProgress,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  const swapChains = () => {
    if (sourceChain.id !== destChain.id) {
      setSourceChain(destChain)
      setDestChain(sourceChain)
    }
  }

  return (
    <div className="relative">
      <div className="w-full max-w-2xl">
        <div
          className="bg-white rounded-3xl p-8 border-4 border-black shadow-xl"
          style={{ boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.15)" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <h1 className="text-5xl font-black text-black italic" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              BRIDGE
            </h1>
          </div>

          {/* Chain selectors */}
          <div className="flex items-end gap-4 mb-8">
            <div className="flex-1">
              <ChainSelector
                chains={chains.filter((c) => c.id !== destChain.id)}
                selectedChain={sourceChain}
                onSelect={(chain) => {
                  setSourceChain(chain)
                  setDestChain(ensureDistinctChains(chain, destChain))
                }}
                label="FROM"
              />
            </div>

            {/* Swap button */}
            <button
              onClick={swapChains}
              className="bg-yellow-300 border-3 border-black rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-yellow-400 transition-colors flex-shrink-0 mb-6"
            >
              ⇆
            </button>

            <div className="flex-1">
              <ChainSelector
                chains={chains.filter((c) => c.id !== sourceChain.id)}
                selectedChain={destChain}
                onSelect={(chain) => {
                  setDestChain(chain)
                  setSourceChain(ensureDistinctChains(chain, sourceChain))
                }}
                label="TO"
              />
            </div>
          </div>

          {/* Token input */}
          <div className="space-y-3 mb-8">
            <TokenInput amount={amount} onAmountChange={setAmount} sourceChain={sourceChain} />
          </div>

          {/* Status panel */}
          <StatusPanel estimatedTime="~2 min" fees="$2.45" progress={txProgress} />

          {/* Bridge button */}
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
