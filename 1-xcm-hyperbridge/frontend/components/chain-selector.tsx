"use client"

import { useState } from "react"

interface Chain {
  id: string
  name: string
  icon: any
  color: string
}

interface ChainSelectorProps {
  chains: Chain[]
  selectedChain: Chain
  onSelect: (chain: Chain) => void
  label: string
}

export function ChainSelector({ chains, selectedChain, onSelect, label }: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-black uppercase">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 hover:bg-gray-150 rounded-2xl p-4 border-3 border-black transition-all duration-200 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className={`text-3xl bg-gradient-to-br ${selectedChain.color} p-3 rounded-xl border-2 border-black`}>
            {selectedChain.icon}
          </div>
          <div className="text-left">
            <p className="font-black text-black text-lg">{selectedChain.name}</p>
          </div>
        </div>
        <span className="text-2xl group-hover:rotate-180 transition-transform">▼</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-80 mt-2 bg-white border-3 border-black rounded-2xl shadow-lg overflow-hidden">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => {
                onSelect(chain)
                setIsOpen(false)
              }}
              className="w-full p-4 hover:bg-gray-100 transition-colors flex items-center gap-3 border-b-2 border-black last:border-b-0"
            >
              <div className={`text-2xl bg-gradient-to-br ${chain.color} p-2 rounded-lg border-2 border-black`}>
                {chain.icon}
              </div>
              <span className="font-bold text-black text-base">{chain.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
