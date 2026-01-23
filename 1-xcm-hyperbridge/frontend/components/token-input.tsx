"use client"

import { useMetaMask } from "@/hooks/useWallet"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

const tokens = [
  {
    id: "usdh",
    name: "USD.h",
    address: "0xA801da100bF16D07F668F4A49E1f71fc54D05177",
    icon: (
      <img
        src="https://github.com/TalismanSociety/chaindata/raw/main/assets/tokens/usdc.svg"
        alt="USDC"
        className="w-7 h-7 inline-block align-middle"
      />
    ),
  },
  {
    id: "dot",
    name: "DOT",
    address: "",
    icon: (
      <img
        src="https://github.com/TalismanSociety/chaindata/raw/main/assets/tokens/dot.svg"
        alt="DOT"
        className="w-7 h-7 inline-block align-middle"
      />
    ),
  },
]

interface TokenInputProps {
  amount: string
  onAmountChange: (amount: string) => void
  sourceChain: { name: string }
}

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
]

export function TokenInput({ amount, onAmountChange }: TokenInputProps) {
  const { switchChain } = useMetaMask() 

  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [isOpen, setIsOpen] = useState(false)
  const [balance, setBalance] = useState("0")

  useEffect(() => {
    if (!window.ethereum) {
      console.warn("MetaMask not found")
      return
    }

    const fetchBalance = async () => {
      try {
        await switchChain("0x61")

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const userAddress = await signer.getAddress()

        if (!selectedToken.address) {
          setBalance("0")
          return
        }

        const contract = new ethers.Contract(
          selectedToken.address,
          ERC20_ABI,
          provider
        )

        const [rawBalance, decimals] = await Promise.all([
          contract.balanceOf(userAddress),
          contract.decimals(),
        ])

        setBalance(ethers.formatUnits(rawBalance, decimals))
      } catch (err) {
        console.error("Failed to fetch balance:", err)
        setBalance("0")
      }
    }

    fetchBalance()
  }, [selectedToken, switchChain])

  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-black uppercase">
        Amount
      </label>

      <div className="bg-gray-100 rounded-2xl p-4 border-3 border-black">
        <div className="flex gap-3">
          {/* Token selector */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border-3 border-black rounded-2xl px-4 py-3 flex items-center gap-2 font-bold text-black h-16"
            >
              <span className="text-2xl">{selectedToken.icon}</span>
              <span>{selectedToken.name}</span>
              <span className="text-lg">▼</span>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border-3 border-black rounded-2xl shadow-lg z-10">
                {tokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => {
                      setSelectedToken(token)
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 hover:bg-gray-100 flex items-center gap-2 font-bold border-b-2 border-black last:border-b-0"
                  >
                    <span className="text-2xl">{token.icon}</span>
                    <span>{token.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount input */}
          <div className="flex-1 flex items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-4xl font-black outline-none no-spinner"
            />
          </div>
        </div>

        <div className="flex justify-between mt-3 pt-3 border-t-2 border-black">
          <div className="text-sm font-bold text-black">
            Balance: {balance}
          </div>
        </div>
      </div>
    </div>
  )
}
